import platform from 'platform'

export type Platform = 'mac' | 'windows' | 'linux' | 'unknown'

interface GitHubRelease {
  tag_name: string
  assets: Array<{
    name: string
    browser_download_url: string
  }>
}

export function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'unknown'
  
  const os = platform.os?.family?.toLowerCase() || ''
  
  // Platform.js recognizes Mac as "OS X" or "macOS"
  if (os.includes('os x') || os.includes('macos') || os === 'darwin') {
    return 'mac'
  }
  
  // Windows family includes all Windows versions
  if (os.includes('windows')) {
    return 'windows'
  }
  
  // Linux family (excluding Android)
  if (os.includes('linux') || os.includes('ubuntu') || os.includes('debian') || os.includes('fedora')) {
    return 'linux'
  }
  
  return 'unknown'
}

export async function getLatestRelease(): Promise<GitHubRelease | null> {
  try {
    // First try to get the latest release
    let response = await fetch('https://api.github.com/repos/koraysels/rekordbox-library-fixer/releases/latest')
    
    // If no latest release (404), get all releases and use the first one
    if (!response.ok) {
      response = await fetch('https://api.github.com/repos/koraysels/rekordbox-library-fixer/releases')
      if (!response.ok) return null
      
      const releases = await response.json()
      if (!releases || releases.length === 0) return null
      
      // Return the first release (most recent)
      return releases[0]
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch latest release:', error)
    return null
  }
}

export async function getDownloadUrl(platform: Platform): Promise<string> {
  const release = await getLatestRelease()
  
  if (!release) {
    // Fallback to releases page if API fails
    return 'https://github.com/koraysels/rekordbox-library-fixer/releases'
  }

  // Find the appropriate asset based on platform
  const asset = release.assets.find(asset => {
    const name = asset.name.toLowerCase()
    switch (platform) {
      case 'mac':
        // Look for .dmg or -mac.zip files
        return name.endsWith('.dmg') || name.includes('-mac.zip')
      case 'windows':
        // Look for .exe or -win.zip files  
        return name.endsWith('.exe') || name.includes('-win.zip')
      case 'linux':
        // Look for .AppImage or .deb files
        return name.endsWith('.appimage') || name.endsWith('.deb')
      default:
        return false
    }
  })

  if (asset) {
    return asset.browser_download_url
  }

  // Fallback to releases page if no matching asset found
  return 'https://github.com/koraysels/rekordbox-library-fixer/releases'
}

export function getPlatformName(platform: Platform): string {
  switch (platform) {
    case 'mac':
      return 'macOS'
    case 'windows':
      return 'Windows'
    case 'linux':
      return 'Linux'
    default:
      return 'Download'
  }
}