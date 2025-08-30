"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { MacQuarantineModal } from "./mac-quarantine-modal"
import { MobileNotice } from "./mobile-notice"
import { detectPlatform, getDownloadUrl, getPlatformName, type Platform } from "@/lib/platform"

interface DownloadButtonProps {
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline" | "secondary" | "ghost"
  className?: string
  showIcon?: boolean
}

export function DownloadButton({ 
  size = "default", 
  variant = "default", 
  className = "",
  showIcon = true 
}: DownloadButtonProps) {
  const [platform, setPlatform] = useState<Platform>('unknown')
  const [showMacModal, setShowMacModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Only run on client side to avoid hydration mismatches
    setMounted(true)
    const detectedPlatform = detectPlatform()
    setPlatform(detectedPlatform)
  }, [])

  const handleDownloadClick = async () => {
    if (platform === 'mac') {
      setShowMacModal(true)
    } else {
      await initiateDownload()
    }
  }

  const initiateDownload = async () => {
    setIsLoading(true)
    try {
      const url = await getDownloadUrl(platform)
      window.open(url, '_blank')
      setShowMacModal(false)
    } catch (error) {
      console.error('Failed to get download URL:', error)
      // Fallback to releases page
      window.open('https://github.com/koraysels/rekordbox-library-fixer/releases', '_blank')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state until platform is detected
  if (!mounted) {
    return (
      <Button 
        size={size} 
        variant={variant}
        disabled={false}
        className={`font-te-mono tracking-te-mono ${className}`}
      >
        {showIcon && <Download className="h-5 w-5 mr-2" />}
        Download
      </Button>
    )
  }

  const buttonText = `Download for ${getPlatformName(platform)}`

  // Show mobile notice instead of download button for mobile users
  if (platform === 'mobile') {
    return <MobileNotice size={size} className={className} />
  }

  return (
    <>
      <Button 
        size={size} 
        variant={variant}
        onClick={handleDownloadClick}
        disabled={isLoading}
        className={`font-te-mono tracking-te-mono ${className}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {showIcon && <Download className="h-5 w-5 mr-2" />}
            {buttonText}
          </>
        )}
      </Button>

      <MacQuarantineModal
        open={showMacModal}
        onOpenChange={setShowMacModal}
        onContinueDownload={initiateDownload}
      />
    </>
  )
}