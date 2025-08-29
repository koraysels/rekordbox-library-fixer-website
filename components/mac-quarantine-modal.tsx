"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Terminal, AlertCircle, Download } from "lucide-react"
import { useState } from "react"

interface MacQuarantineModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinueDownload: () => void
}

export function MacQuarantineModal({ open, onOpenChange, onContinueDownload }: MacQuarantineModalProps) {
  const [copied, setCopied] = useState(false)
  const command = "xattr -cr /Applications/rekordbox-library-fixer.app"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-te-display text-xl">
            <AlertCircle className="h-5 w-5 text-accent" />
            macOS Security Notice
          </DialogTitle>
          <DialogDescription className="font-te-sans">
            Important information about running the app on macOS
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-te-sans">
              <strong>Why this extra step?</strong> As an independent developer, I'd need to pay Apple $99/year for a developer certificate. 
              Instead, I'm keeping this tool free and open-source. This means macOS will quarantine the app on first run.
              <br /><br />
              <strong>Don't be scared, I pinky swear it's safe.</strong> Ask ChatGPT if you like! 🤙
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-te-display font-semibold">After downloading, you'll need to:</h4>
            
            <ol className="space-y-3 font-te-sans text-sm">
              <li className="flex gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Move the app to your Applications folder</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Open Terminal (found in Applications → Utilities)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">3.</span>
                <div className="flex-1">
                  <span>Run this command to remove the quarantine:</span>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-md p-3 font-te-mono text-xs flex items-center justify-between">
                      <code>{command}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={copyToClipboard}
                        className="ml-2 h-6 px-2"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">4.</span>
                <span>The app will now run without security warnings!</span>
              </li>
            </ol>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Terminal className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm font-te-sans">
                <p className="font-semibold">What does this command do?</p>
                <p className="text-muted-foreground">
                  It removes the quarantine attribute that macOS adds to downloaded apps. 
                  This is completely safe for trusted open-source software.
                </p>
              </div>
            </div>
          </div>

          <Alert variant="default" className="border-primary/50">
            <Download className="h-4 w-4" />
            <AlertDescription className="font-te-sans">
              <strong>Alternative:</strong> You can also right-click the app, select "Open", and click "Open" in the dialog. 
              However, the Terminal command is more reliable.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onContinueDownload} className="font-te-mono">
            Continue Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}