import { getLatestRelease, getDownloadUrl } from '../lib/platform'

const TIMEOUT = 10000 // 10 seconds timeout for API calls

interface TestResult {
  platform: string
  url: string
  status: number
  success: boolean
  error?: string
}

async function checkUrl(url: string): Promise<{ status: number; success: boolean }> {
  try {
    // Use HEAD request to check if URL exists without downloading the file
    const response = await fetch(url, { 
      method: 'HEAD',
      redirect: 'follow'
    })
    return {
      status: response.status,
      success: response.ok
    }
  } catch (error) {
    return {
      status: 0,
      success: false
    }
  }
}

async function testDownloadLinks(): Promise<void> {
  console.log('🔍 Testing download links for all platforms...\n')
  
  const results: TestResult[] = []
  const platforms: Array<'mac' | 'windows' | 'linux'> = ['mac', 'windows', 'linux']
  
  // First, check if we can get the latest release
  console.log('📦 Fetching latest release information...')
  const release = await getLatestRelease()
  
  if (!release) {
    console.error('❌ Failed to fetch release information from GitHub API')
    process.exit(1)
  }
  
  console.log(`✅ Found release: ${release.tag_name}`)
  console.log(`📋 Total assets: ${release.assets.length}\n`)
  
  // List all available assets
  console.log('Available assets:')
  release.assets.forEach(asset => {
    console.log(`  - ${asset.name} (${(asset.size / 1024 / 1024).toFixed(2)} MB)`)
  })
  console.log('')
  
  // Test each platform
  for (const platform of platforms) {
    console.log(`Testing ${platform}...`)
    
    try {
      const url = await getDownloadUrl(platform)
      
      if (!url) {
        results.push({
          platform,
          url: 'none',
          status: 0,
          success: false,
          error: 'No URL returned'
        })
        continue
      }
      
      // Check if it's a fallback URL
      if (url.includes('/releases') && !url.includes('/download/')) {
        console.log(`  ⚠️  Platform ${platform}: Fallback to releases page`)
        results.push({
          platform,
          url,
          status: 200,
          success: false,
          error: 'No direct download link found (fallback to releases page)'
        })
        continue
      }
      
      // Check if the URL is accessible
      const { status, success } = await checkUrl(url)
      
      results.push({
        platform,
        url,
        status,
        success
      })
      
      if (success) {
        console.log(`  ✅ Platform ${platform}: ${url.split('/').pop()} (Status: ${status})`)
      } else {
        console.log(`  ❌ Platform ${platform}: Failed to access URL (Status: ${status})`)
      }
      
    } catch (error) {
      results.push({
        platform,
        url: 'error',
        status: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      console.log(`  ❌ Platform ${platform}: ${error}`)
    }
  }
  
  // Summary
  console.log('\n📊 Test Summary:')
  console.log('================')
  
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  results.forEach(result => {
    const icon = result.success ? '✅' : '❌'
    const file = result.url.split('/').pop() || 'N/A'
    console.log(`${icon} ${result.platform.padEnd(10)} - ${file}`)
    if (result.error) {
      console.log(`   Error: ${result.error}`)
    }
  })
  
  console.log('\n' + '='.repeat(50))
  console.log(`Total: ${results.length} platforms tested`)
  console.log(`Success: ${successful}`)
  console.log(`Failed: ${failed}`)
  
  // Exit with error if any tests failed
  if (failed > 0) {
    console.error('\n❌ Some download links are not working!')
    process.exit(1)
  } else {
    console.log('\n✅ All download links are working!')
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testDownloadLinks().catch(error => {
    console.error('Test failed:', error)
    process.exit(1)
  })
}

export { testDownloadLinks }