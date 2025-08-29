import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Github, Star } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Image src={getAssetPath("/icons/128x128.png")} alt="Rekordbox Library Fixer" width={128} height={128} className="rounded-te-lg" />
          </div>

          <Badge variant="secondary" className="mb-6 font-te-mono text-xs tracking-te-mono">
            FREE & OPEN SOURCE
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-te-display font-bold text-balance mb-6 tracking-te-display">
            REKORDBOX LIBRARY FIXER
          </h1>

          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto font-te-sans">
            A collection of tools to help clean up your Rekordbox DJ library. Find duplicates, relocate missing tracks,
            and organize your music collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-6 font-te-mono tracking-te-mono">
              <a
                href="https://github.com/koraysels/rekordbox-library-fixer/releases/latest"
                className="flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                DOWNLOAD
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg px-8 py-6 bg-transparent font-te-mono tracking-te-mono"
            >
              <a href="https://github.com/koraysels/rekordbox-library-fixer" className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                SOURCE CODE
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground font-te-mono">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-accent fill-current" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-accent rounded-full"></span>
              <span>Cross Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-accent rounded-full"></span>
              <span>No Registration</span>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-te-xl blur-xl"></div>
              <div className="relative bg-card/80 backdrop-blur-sm border rounded-te-xl p-6">
                <img
                  src="https://raw.githubusercontent.com/koraysels/rekordbox-library-fixer/main/screenshots/04-track-relocation.png"
                  alt="Track relocation tool in action"
                  className="w-full rounded-te-lg shadow-lg"
                />
                <p className="text-sm text-muted-foreground mt-4 font-te-mono">
                  Relocate missing tracks and fix your library automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
