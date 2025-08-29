"use client"

import { useState } from "react"
import { Menu, X, ExternalLink } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/utils"
import { DownloadButton } from "./download-button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src={getAssetPath("/icons/32x32.png")} alt="Rekordbox Library Fixer" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-xl text-foreground font-te-display tracking-te-display">
              Rekordbox Library Fixer
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a
              href="https://github.com/koraysels/rekordbox-library-fixer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              GitHub <ExternalLink className="h-3 w-3" />
            </a>
            <DownloadButton />
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a
                href="https://github.com/koraysels/rekordbox-library-fixer"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                GitHub <ExternalLink className="h-3 w-3" />
              </a>
              <DownloadButton className="w-fit" />
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
