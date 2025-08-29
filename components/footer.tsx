import { Github, Coffee } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🎧</span>
              </div>
              <span className="font-bold text-xl">Rekordbox Library Fixer</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              A free, open-source tool to help DJs clean up their Rekordbox libraries. Made by DJs, for DJs.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/koraysels/rekordbox-library-fixer"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
              <a
                href="https://ko-fi.com/koraysels"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Coffee className="h-5 w-5" />
                Support
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/koraysels/rekordbox-library-fixer/releases"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/koraysels/rekordbox-library-fixer#-quick-start"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/koraysels/rekordbox-library-fixer/blob/main/CHANGELOG.md"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/koraysels/rekordbox-library-fixer/issues"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Report Bug
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/koraysels/rekordbox-library-fixer/discussions"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/koraysels/rekordbox-library-fixer#-faq"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Rekordbox Library Fixer. Licensed under custom non-commercial license.
          </p>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">Made with ❤️ for the DJ community</p>
        </div>
      </div>
    </footer>
  )
}
