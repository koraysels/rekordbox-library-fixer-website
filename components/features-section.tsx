import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Shield, RefreshCw, Database, Music, History, KeyRound, Eraser } from "lucide-react"

const features = [
  {
    icon: Database,
    title: "Writes Into Rekordbox",
    description:
      "Cleans rekordbox's own master.db. An XML import can add and update tracks but never remove one, so fixes made through XML never reach your collection.",
    badge: "New",
  },
  {
    icon: Search,
    title: "Duplicate Detection",
    description:
      "Finds duplicates by audio fingerprint, falling back to artist, title and length when a file is gone. Tells apart several entries for one file and genuinely duplicated files.",
    badge: null,
  },
  {
    icon: RefreshCw,
    title: "Track Relocation",
    description:
      'Finds the files behind the "!" tracks again, thousands at a time, and writes the new paths back into your library — including straight into master.db.',
    badge: null,
  },
  {
    icon: Eraser,
    title: "Clear Out The Dead Weight",
    description:
      "Entries pointing at a folder, at a path cut short by a bad import, or at nothing at all — found and removed from the collection and every playlist. Files that are simply gone are opt-in, because relocating them is usually the better answer.",
    badge: null,
  },
  {
    icon: Shield,
    title: "Backed Up, Every Time",
    description:
      "A backup before every change, checked against the original so a truncated copy is refused rather than trusted, and restorable from the app. Files go to the system trash, never straight to deletion.",
    badge: null,
  },
  {
    icon: Music,
    title: "Listen Before You Decide",
    description:
      "Play, pause, seek and set the volume from any track row, so you can hear which copy to keep without leaving the app. AIFF included.",
    badge: null,
  },
  {
    icon: History,
    title: "Nothing Happens Silently",
    description:
      "Every change is recorded with per-track detail and the backup it came from. Streaming tracks are labelled and never treated as damage — and never counted as missing.",
    badge: null,
  },
  {
    icon: KeyRound,
    title: "No Key To Hunt Down",
    description:
      "Rekordbox encrypts its database. The app ships no key: it shows the one-line command for your platform that prints it on your own machine, from an open-source package you can read.",
    badge: "New",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-te-display font-bold mb-4 tracking-te-display">WHAT IT DOES</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-te-sans">
            Cleans up the collection rekordbox actually reads, with a backup before every change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group hover:shadow-lg transition-shadow rounded-te-lg"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-12 w-12 rounded-te bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  {feature.badge && (
                    <Badge
                      variant={feature.badge === "New" ? "default" : "secondary"}
                      className="text-xs font-te-mono tracking-te-mono"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-te-display tracking-te-display">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-te-sans">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-te-display font-bold mb-4 tracking-te-display">SEE IT IN ACTION</h3>
            <p className="text-muted-foreground font-te-sans">
              Screenshots from the actual application showing the tools at work
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border rounded-te-lg p-4">
                <img
                  src="https://github.com/koraysels/rekordbox-library-fixer/blob/main/screenshots/04-track-relocation.png?raw=true"
                  alt="Track relocation tool showing found matches"
                  className="w-full rounded-te border"
                />
                <p className="text-sm text-muted-foreground mt-3 font-te-mono">
                  The track relocation tool finding and fixing missing files
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border rounded-te-lg p-4">
                <img
                  src="https://github.com/koraysels/rekordbox-library-fixer/blob/main/screenshots/03-duplicate-detection.png?raw=true"
                  alt="Duplicate detection showing similar tracks grouped together"
                  className="w-full rounded-te border"
                />
                <p className="text-sm text-muted-foreground mt-3 font-te-mono">
                  Duplicate detection finding similar tracks in your library
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border rounded-te-lg p-4">
                <img
                  src="https://github.com/koraysels/rekordbox-library-fixer/blob/main/screenshots/01-main-interface.png?raw=true"
                  alt="Main interface showing library analysis tools"
                  className="w-full rounded-te border"
                />
                <p className="text-sm text-muted-foreground mt-3 font-te-mono">
                  Clean, simple interface focused on getting the job done
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border rounded-te-lg p-4">
                <img
                  src="https://github.com/koraysels/rekordbox-library-fixer/blob/main/screenshots/05-help-tutorial.png?raw=true"
                  alt="Help tutorial showing how to use the tools"
                  className="w-full rounded-te border"
                />
                <p className="text-sm text-muted-foreground mt-3 font-te-mono">
                  Built-in help and tutorials to get you started quickly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
