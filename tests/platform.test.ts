import { describe, it, expect, beforeEach, vi } from 'vitest'
import { detectPlatform, getLatestRelease, getDownloadUrl, getPlatformName } from '../lib/platform'

// Mock release data based on actual GitHub API response
const mockRelease = {
  tag_name: 'v0.0.5-alpha',
  assets: [
    {
      name: 'Rekordbox.Library.Fixer-0.0.5-alpha-arm64.dmg',
      browser_download_url: 'https://github.com/koraysels/rekordbox-library-fixer/releases/download/v0.0.5-alpha/Rekordbox.Library.Fixer-0.0.5-alpha-arm64.dmg'
    },
    {
      name: 'Rekordbox.Library.Fixer-0.0.5-alpha-arm64-mac.zip',
      browser_download_url: 'https://github.com/koraysels/rekordbox-library-fixer/releases/download/v0.0.5-alpha/Rekordbox.Library.Fixer-0.0.5-alpha-arm64-mac.zip'
    },
    {
      name: 'Rekordbox.Library.Fixer-0.0.5-alpha-ia32-win.zip',
      browser_download_url: 'https://github.com/koraysels/rekordbox-library-fixer/releases/download/v0.0.5-alpha/Rekordbox.Library.Fixer-0.0.5-alpha-ia32-win.zip'
    },
    {
      name: 'Rekordbox.Library.Fixer-0.0.5-alpha-arm64.AppImage',
      browser_download_url: 'https://github.com/koraysels/rekordbox-library-fixer/releases/download/v0.0.5-alpha/Rekordbox.Library.Fixer-0.0.5-alpha-arm64.AppImage'
    },
    {
      name: 'rekordbox-library-manager_0.0.5-alpha_arm64.deb',
      browser_download_url: 'https://github.com/koraysels/rekordbox-library-fixer/releases/download/v0.0.5-alpha/rekordbox-library-manager_0.0.5-alpha_arm64.deb'
    }
  ]
}

describe('Platform Detection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock platform.js library
    vi.doMock('platform', () => ({
      default: {
        os: {
          family: 'OS X'
        }
      }
    }))
  })

  it('should detect OS X/macOS', () => {
    vi.doMock('platform', () => ({
      default: { os: { family: 'OS X' } }
    }))
    expect(detectPlatform()).toBe('mac')
  })

  it('should detect macOS', () => {
    vi.doMock('platform', () => ({
      default: { os: { family: 'macOS' } }
    }))
    expect(detectPlatform()).toBe('mac')
  })

  it('should detect Windows', () => {
    vi.doMock('platform', () => ({
      default: { os: { family: 'Windows' } }
    }))
    expect(detectPlatform()).toBe('windows')
  })

  it('should detect Windows Server', () => {
    vi.doMock('platform', () => ({
      default: { os: { family: 'Windows Server 2008 R2 / 7' } }
    }))
    expect(detectPlatform()).toBe('windows')
  })

  it('should detect Linux', () => {
    vi.doMock('platform', () => ({
      default: { os: { family: 'Linux' } }
    }))
    expect(detectPlatform()).toBe('linux')
  })

  it('should detect Ubuntu', () => {
    vi.doMock('platform', () => ({
      default: { os: { family: 'Ubuntu' } }
    }))
    expect(detectPlatform()).toBe('linux')
  })

  it('should detect Debian', () => {
    vi.doMock('platform', () => ({
      default: { os: { family: 'Debian' } }
    }))
    expect(detectPlatform()).toBe('linux')
  })

  it('should return unknown for mobile platforms', () => {
    vi.doMock('platform', () => ({
      default: { os: { family: 'iOS' } }
    }))
    expect(detectPlatform()).toBe('unknown')
  })
})

describe('GitHub Release Fetching', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('should fetch latest release successfully', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockRelease
    })

    const release = await getLatestRelease()
    
    expect(release).toEqual(mockRelease)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/koraysels/rekordbox-library-fixer/releases/latest'
    )
  })

  it('should fallback to all releases if no latest release', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 404
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockRelease]
      })

    const release = await getLatestRelease()
    
    expect(release).toEqual(mockRelease)
    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenNthCalledWith(2,
      'https://api.github.com/repos/koraysels/rekordbox-library-fixer/releases'
    )
  })

  it('should return null if no releases found', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 404
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => []
      })

    const release = await getLatestRelease()
    
    expect(release).toBeNull()
  })
})

describe('Download URL Generation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockRelease
    })
  })

  it('should return correct download URL for macOS', async () => {
    const url = await getDownloadUrl('mac')
    
    expect(url).toBe('https://github.com/koraysels/rekordbox-library-fixer/releases/download/v0.0.5-alpha/Rekordbox.Library.Fixer-0.0.5-alpha-arm64.dmg')
  })

  it('should return correct download URL for Windows', async () => {
    const url = await getDownloadUrl('windows')
    
    expect(url).toBe('https://github.com/koraysels/rekordbox-library-fixer/releases/download/v0.0.5-alpha/Rekordbox.Library.Fixer-0.0.5-alpha-ia32-win.zip')
  })

  it('should return correct download URL for Linux', async () => {
    const url = await getDownloadUrl('linux')
    
    expect(url).toBe('https://github.com/koraysels/rekordbox-library-fixer/releases/download/v0.0.5-alpha/Rekordbox.Library.Fixer-0.0.5-alpha-arm64.AppImage')
  })

  it('should fallback to releases page if no matching asset', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ...mockRelease, assets: [] })
    })

    const url = await getDownloadUrl('mac')
    
    expect(url).toBe('https://github.com/koraysels/rekordbox-library-fixer/releases')
  })

  it('should fallback to releases page if API fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('API Error'))

    const url = await getDownloadUrl('mac')
    
    expect(url).toBe('https://github.com/koraysels/rekordbox-library-fixer/releases')
  })
})

describe('Platform Name Formatting', () => {
  it('should return correct platform names', () => {
    expect(getPlatformName('mac')).toBe('macOS')
    expect(getPlatformName('windows')).toBe('Windows')
    expect(getPlatformName('linux')).toBe('Linux')
    expect(getPlatformName('unknown')).toBe('Download')
  })
})