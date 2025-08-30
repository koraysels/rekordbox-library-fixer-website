"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Monitor, Apple, Terminal, Loader2 } from "lucide-react"
import { detectPlatform, getLatestRelease, type Platform } from "@/lib/platform"
import { MacQuarantineModal } from "./mac-quarantine-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface PlatformOption {
  platform: Platform
  name: string
  icon: React.ReactNode
  fileTypes: string[]
}

const platformOptions: PlatformOption[] = [
  {
    platform: 'mac',
    name: 'macOS',
    icon: <Apple className="h-4 w-4" />,
    fileTypes: ['.dmg', '-mac.zip']
  },
  {
    platform: 'windows',
    name: 'Windows',
    icon: <Monitor className="h-4 w-4" />,
    fileTypes: ['.exe', '-win.zip']
  },
  {
    platform: 'linux',
    name: 'Linux',
    icon: <Terminal className="h-4 w-4" />,
    fileTypes: ['.appimage', '.deb']
  }
]

export function PlatformSelector() {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>('unknown')
  const [showMacModal, setShowMacModal] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [releaseVersion, setReleaseVersion] = useState<string>('')

  useEffect(() => {
    setCurrentPlatform(detectPlatform())
    // Fetch the latest release version for display
    getLatestRelease().then(release => {
      if (release) {
        setReleaseVersion(release.tag_name)
      }
    })
  }, [])

  const handleDownload = async (platform: Platform) => {
    setSelectedPlatform(platform)
    
    if (platform === 'mac') {
      setShowMacModal(true)
    } else {
      await initiateDownload(platform)
    }
  }

  const initiateDownload = async (platform: Platform) => {
    setIsLoading(true)
    try {
      const release = await getLatestRelease()
      if (!release) {
        window.open('https://github.com/koraysels/rekordbox-library-fixer/releases', '_blank')
        return
      }

      // Find the appropriate asset
      const option = platformOptions.find(opt => opt.platform === platform)
      const asset = release.assets.find(asset => {
        const name = asset.name.toLowerCase()
        return option?.fileTypes.some(type => name.includes(type))
      })

      if (asset) {
        window.open(asset.browser_download_url, '_blank')
      } else {
        window.open('https://github.com/koraysels/rekordbox-library-fixer/releases', '_blank')
      }
      
      setShowMacModal(false)
    } catch (error) {
      console.error('Failed to download:', error)
      window.open('https://github.com/koraysels/rekordbox-library-fixer/releases', '_blank')
    } finally {
      setIsLoading(false)
    }
  }

  const otherPlatforms = platformOptions.filter(opt => opt.platform !== currentPlatform)

  // Don't show platform selector for mobile users
  if (currentPlatform === 'mobile') {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground font-te-mono">
        <span>Other platforms:</span>
        <div className="flex gap-2">
          {otherPlatforms.map((option) => (
            <Button
              key={option.platform}
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(option.platform)}
              disabled={isLoading}
              className="h-8 px-3 font-te-mono text-xs"
            >
              {isLoading && selectedPlatform === option.platform ? (
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                option.icon
              )}
              <span className="ml-1">{option.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="link" 
            size="sm" 
            className="text-xs text-muted-foreground font-te-mono hover:text-foreground"
          >
            All download options
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56">
          <div className="px-2 py-1.5 text-sm font-semibold font-te-display">
            Download {releaseVersion}
          </div>
          <DropdownMenuSeparator />
          {platformOptions.map((option) => (
            <DropdownMenuItem
              key={option.platform}
              onClick={() => handleDownload(option.platform)}
              disabled={isLoading}
              className="font-te-mono cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span>{option.name}</span>
                </div>
                {currentPlatform === option.platform && (
                  <span className="text-xs text-muted-foreground">detected</span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => window.open('https://github.com/koraysels/rekordbox-library-fixer/releases', '_blank')}
            className="font-te-mono cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span>View all releases</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MacQuarantineModal
        open={showMacModal}
        onOpenChange={setShowMacModal}
        onContinueDownload={() => initiateDownload(selectedPlatform || 'mac')}
      />
    </div>
  )
}