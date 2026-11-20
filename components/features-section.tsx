import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Shield, RefreshCw, Database, Music, History, Eraser, Wand2, Usb, AudioWaveform, FolderInput } from "lucide-react"

const features = [
  {
    icon: Wand2,
    title: "Fix my library",
    description:
      "It checks your whole library and shows a short list of what's wrong. Then it goes through it one step at a time and you confirm each one: moved tracks, dead entries, duplicates, scattered files, and files your player can't load. Tracks it isn't sure about are left for you to look at.",
    badge: "New",
  },
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
    icon: Search,
    title: "Duplicate detection",
    description:
      "Finds duplicates by audio fingerprint, or by artist, title and length when the file is gone. It also tells you whether you have two copies of a file or two entries for one file, so you know if deleting frees any space.",
    badge: null,
  },
  {
    icon: RefreshCw,
    title: "Track relocation",
    description:
      "Finds the files behind the \"!\" tracks, thousands at a time if needed, and writes the new paths into master.db.",
    badge: null,
  },
  {
    icon: Eraser,
    title: "Remove dead entries",
    description:
      "Some entries point at a folder, at a path a bad import cut short, or at nothing. Those are removed from the collection and from every playlist. A track whose file is missing is only removed when nothing like it turns up on your drives.",
    badge: null,
  },
  {
    icon: Shield,
    title: "A backup before every change",
    description:
      "Each backup is checked against the original before anything gets written, so a half-copied one is caught instead of trusted. You can restore any of them from the app. Deleted files go to the Trash.",
    badge: null,
  },
  {
    icon: Music,
    title: "Listen before you decide",
    description:
      "Play any track from its row to hear which copy to keep. AIFF works too.",
    badge: null,
  },
  {
    icon: History,
    title: "Every change is logged",
    description:
      "History lists each change track by track, with the backup taken before it. TIDAL and Spotify tracks are labelled as streaming and never counted as missing.",
    badge: null,
  },
  {
    icon: FolderInput,
    title: "One music folder",
    description:
      "Tracks sitting in Downloads, on the desktop or on old drives are moved into your music folder, and the library follows. Nothing gets overwritten: if the same file is already there it's reused, and a different file with the same name gets a (2).",
    badge: null,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-te-display font-bold mb-4 tracking-te-display">WHAT IT DOES</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-te-sans">
            It works on the library rekordbox actually reads and makes a backup before every change. Start with the wizard. Advanced has each tool on its own page.
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
              Screenshots from the app
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
                  Relocating missing tracks
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border rounded-te-lg p-4">
                <img
                  src="https://github.com/koraysels/rekordbox-library-fixer/blob/main/screenshots/03-duplicate-detection.png?raw=true"
                  alt="Duplicate detection showing similar tracks grouped together"
                  className="w-full rounded-te border"
                />
                <p className="text-sm text-muted-foreground mt-3 font-te-mono">
                  Duplicates grouped into sets
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
                  The list of missing tracks
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border rounded-te-lg p-4">
                <img
                  src="https://github.com/koraysels/rekordbox-library-fixer/blob/main/screenshots/05-help-tutorial.png?raw=true"
                  alt="Help tutorial showing how to use the tools"
                  className="w-full rounded-te border"
                />
                <p className="text-sm text-muted-foreground mt-3 font-te-mono">
                  The built-in tutorial for XML libraries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
