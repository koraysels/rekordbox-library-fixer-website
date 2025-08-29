import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Github, Heart } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-te-display tracking-te-display">Give It a Try</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              If you're dealing with duplicate tracks or missing files in Rekordbox, this might help. It's free and open
              source.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <a
                  href="https://github.com/koraysels/rekordbox-library-fixer/releases/latest"
                  className="flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6 bg-transparent">
                <a href="https://github.com/koraysels/rekordbox-library-fixer" className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  View Source
                </a>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground">
              <span>Free & Open Source</span>
              <span>No Registration</span>
              <span>Works Offline</span>
              <span>Cross Platform</span>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                Built by{" "}
                <a href="https://github.com/koraysels" className="text-primary hover:underline">
                  @koraysels
                </a>{" "}
                <Heart className="h-4 w-4 text-red-500 fill-current" /> because messy libraries are frustrating
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
