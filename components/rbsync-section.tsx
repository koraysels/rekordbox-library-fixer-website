import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Download, ListMusic, WifiOff, Search, ShieldCheck } from "lucide-react"

const points = [
  {
    icon: WifiOff,
    title: "Play your Spotify sets offline",
    description:
      "DJing from Spotify needs internet. rbsync rebuilds the playlists you curate there inside rekordbox, filled with the tracks you already own locally.",
  },
  {
    icon: Search,
    title: "Matched against your own collection",
    description:
      "Every Spotify track is matched against what is in rekordbox. You get a coverage figure per playlist and a wantlist of what you are missing.",
  },
  {
    icon: ListMusic,
    title: "You choose what syncs",
    description:
      "Nothing is selected by default and nothing is written until you press Apply on a plan you have seen. Removals are opt-in, so tracks you added by hand survive.",
  },
  {
    icon: ShieldCheck,
    title: "The same care with your library",
    description:
      "Writes straight into master.db, never XML. Rekordbox must be closed, a verified backup is taken before every write, and each sync lands as one transaction or not at all.",
  },
]

export function RbsyncSection() {
  return (
    <section id="rbsync" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-te-mono uppercase tracking-te-mono text-muted-foreground mb-3">
            Also from the same workshop
          </p>
          <h2 className="text-3xl sm:text-4xl font-te-display font-bold mb-4 tracking-te-display">
            RBSYNC — SPOTIFY PLAYLISTS INTO REKORDBOX
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-te-sans">
            A separate free, open-source app. Take the playlists you build on Spotify and rebuild
            them in rekordbox from the music you already have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {points.map((point, index) => (
            <Card key={index} className="rounded-te-lg">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-te bg-primary/10 flex items-center justify-center mb-4">
                  <point.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-te-display font-semibold mb-2 tracking-te-display">{point.title}</h3>
                <p className="text-sm text-muted-foreground font-te-sans">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild className="font-te-mono tracking-te-mono">
            <a
              href="https://github.com/koraysels/spotify-rekordbox-sync/releases"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              DOWNLOAD RBSYNC
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild className="bg-transparent font-te-mono tracking-te-mono">
            <a
              href="https://github.com/koraysels/spotify-rekordbox-sync"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              SOURCE CODE
            </a>
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground font-te-mono mt-6 max-w-2xl mx-auto">
          macOS and Windows. Connecting Spotify needs a free developer app of your own — about
          three minutes, once; rbsync walks you through it on first launch.
        </p>
      </div>
    </section>
  )
}
