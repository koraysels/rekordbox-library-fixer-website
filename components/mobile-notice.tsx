"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Smartphone, Monitor, ExternalLink } from "lucide-react"

interface MobileNoticeProps {
  size?: "default" | "sm" | "lg"
  className?: string
}

export function MobileNotice({ size = "default", className = "" }: MobileNoticeProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Alert className="border-muted-foreground/50">
        <Smartphone className="h-4 w-4" />
        <AlertDescription className="font-te-sans">
          <strong>📱 Desktop Application</strong><br />
          Rekordbox Library Fixer is a desktop application for Windows, macOS, and Linux. 
          It requires access to your local Rekordbox library files to function properly.
        </AlertDescription>
      </Alert>
      
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Monitor className="h-5 w-5" />
          <span className="font-te-mono text-sm">Use on your computer to manage your DJ library</span>
        </div>
        
        <Button 
          variant="outline" 
          size={size}
          asChild
          className="font-te-mono tracking-te-mono"
        >
          <a 
            href="https://github.com/koraysels/rekordbox-library-fixer" 
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </a>
        </Button>
        
        <p className="text-xs text-muted-foreground font-te-mono max-w-sm mx-auto">
          Bookmark this page and visit from your Windows, Mac, or Linux computer to download
        </p>
      </div>
    </div>
  )
}