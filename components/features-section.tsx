import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Database, Usb, AudioWaveform } from "lucide-react"

const features = [
  {
    icon: Usb,
    title: "Check your USB stick",
    description:
      "Half your playlists empty on the CDJ? Rekordbox skips any track it can't read during a sync and doesn't tell you. Plug in the stick and the app lists, per playlist, which tracks didn't make it and why: a drive that wasn't plugged in, a file that's gone, or a streaming track. It only reads the stick.",
    badge: "New",
  },
  {
    icon: AudioWaveform,
    title: "Convert for older players",
    description:
      "Pick the oldest player you use, say a CDJ-2000, and you get a list of every track it can't load: FLAC, ALAC, 32-bit or 96 kHz files. Convert them to AIFF, WAV or MP3. The library entry moves to the new file, so cues, loops, beatgrids and playlists stay put.",
    badge: null,
  },
  {
    icon: Database,
    title: "Writes into rekordbox",
    description:
      "It edits rekordbox's own master.db. An XML import can add and update tracks but can't remove one, so cleaning up through XML never reaches your collection.",
    badge: null,
  },
  {
    icon: Shield,
    title: "A backup before every change",
    description:
      "Each backup is checked against the original before anything gets written. History lists every change track by track, and you can restore any backup from the app. Deleted files go to the Trash.",
    badge: null,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-secondary/30 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-te-display font-bold mb-4 tracking-te-display">MORE IN THE APP</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-te-sans">
            Switch to Advanced to use each tool on its own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="relative overflow-hidden group hover:shadow-lg transition-shadow rounded-te-lg"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-12 w-12 rounded-te bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  {feature.badge && (
                    <Badge variant="default" className="text-xs font-te-mono tracking-te-mono">
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
      </div>
    </section>
  )
}
