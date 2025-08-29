import { describe, it, expect, beforeAll } from 'vitest'
import { getLatestRelease, getDownloadUrl } from '../lib/platform'

/**
 * Integration tests that check actual GitHub download links
 * These tests make real HTTP requests to verify download URLs are accessible
 */
describe('Download Links Integration Tests', () => {
  let release: any = null

  beforeAll(async () => {
    // Fetch the actual latest release once for all tests
    release = await getLatestRelease()
  }, 30000) // 30 second timeout for API call

  it('should fetch a valid release from GitHub', () => {
    expect(release).toBeTruthy()
    expect(release).toHaveProperty('tag_name')
    expect(release).toHaveProperty('assets')
    expect(Array.isArray(release.assets)).toBe(true)
    expect(release.assets.length).toBeGreaterThan(0)
  })

  describe('Platform Download URLs', () => {
    const platforms: Array<'mac' | 'windows' | 'linux'> = ['mac', 'windows', 'linux']

    platforms.forEach(platform => {
      it(`should generate valid download URL for ${platform}`, async () => {
        const url = await getDownloadUrl(platform)
        
        expect(url).toBeTruthy()
        expect(url).toMatch(/^https:\/\//)
        
        // Check if it's a direct download link or fallback
        const isDirectDownload = url.includes('/download/')
        const isFallback = url.endsWith('/releases')
        
        expect(isDirectDownload || isFallback).toBe(true)
        
        if (isDirectDownload) {
          console.log(`✅ ${platform}: Direct download URL found`)
          console.log(`   ${url}`)
        } else {
          console.log(`⚠️  ${platform}: Fallback to releases page`)
          console.log(`   ${url}`)
        }
      }, 10000)

      it(`should return accessible URL for ${platform}`, async () => {
        const url = await getDownloadUrl(platform)
        
        // Skip accessibility check for fallback URLs
        if (url.endsWith('/releases')) {
          console.log(`⏭️  Skipping accessibility check for fallback URL`)
          return
        }

        // Check if the URL is accessible (using HEAD request)
        const response = await fetch(url, { 
          method: 'HEAD',
          redirect: 'follow'
        })
        
        expect(response.ok).toBe(true)
        expect(response.status).toBeGreaterThanOrEqual(200)
        expect(response.status).toBeLessThan(400)
        
        console.log(`✅ ${platform}: URL is accessible (Status: ${response.status})`)
      }, 15000) // 15 second timeout per URL check
    })
  })

  describe('Release Assets Validation', () => {
    it('should have expected asset types in release', () => {
      if (!release || !release.assets) {
        console.log('⏭️  No release data available')
        return
      }

      const assetNames = release.assets.map((a: any) => a.name.toLowerCase())
      
      // Check for at least one asset per platform
      const hasMacAsset = assetNames.some((name: string) => 
        name.endsWith('.dmg') || name.includes('-mac.zip')
      )
      const hasWindowsAsset = assetNames.some((name: string) => 
        name.endsWith('.exe') || name.includes('-win.zip')
      )
      const hasLinuxAsset = assetNames.some((name: string) => 
        name.endsWith('.appimage') || name.endsWith('.deb')
      )

      console.log('\nAsset Coverage:')
      console.log(`  macOS: ${hasMacAsset ? '✅' : '❌'}`)
      console.log(`  Windows: ${hasWindowsAsset ? '✅' : '❌'}`)
      console.log(`  Linux: ${hasLinuxAsset ? '✅' : '❌'}`)
      
      // At least one platform should have assets
      expect(hasMacAsset || hasWindowsAsset || hasLinuxAsset).toBe(true)
    })

    it('should have valid download URLs for all assets', () => {
      if (!release || !release.assets) {
        console.log('⏭️  No release data available')
        return
      }

      release.assets.forEach((asset: any) => {
        expect(asset).toHaveProperty('browser_download_url')
        expect(asset.browser_download_url).toMatch(/^https:\/\/github\.com/)
        expect(asset.browser_download_url).toContain('/releases/download/')
      })
    })
  })
})