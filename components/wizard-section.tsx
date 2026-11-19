import { Badge } from "@/components/ui/badge"
import { getAssetPath } from "@/lib/utils"

const steps = [
  {
    title: "Find moved tracks",
    description: "Tracks you moved get pointed at their new place. Only sure matches are changed; the rest are left for you to look at.",
  },
  {
    title: "Remove dead entries",
    description: "Entries whose file is gone and can't be found on any of your drives. A track on a drive that isn't plugged in is never touched.",
  },
  {
    title: "Merge duplicates",
    description: "Keeps the entry with the most cues and playlists. Extra copies of the file go to the Trash.",
  },
  {
    title: "Gather into one folder",
    description: "Files in Downloads, on the desktop or on old drives move into your music folder, and the library follows.",
  },
  {
    title: "Convert for your player",
    description: "Files your oldest CDJ can't load are converted to AIFF, keeping their cues, loops and playlists.",
  },
]

const shots = [
  { src: "/screenshots/wizard-moved-tracks.png", alt: "The wizard's step for tracks that moved, listing where each one was found", caption: "Each step shows what it will change" },
  { src: "/screenshots/wizard-duplicates.png", alt: "The wizard's duplicates step, listing which entries will be merged", caption: "You confirm it, or skip it" },
  { src: "/screenshots/wizard-done.png", alt: "The wizard's last screen, listing everything it changed", caption: "A summary at the end" },
]

export function WizardSection() {
  return (
    <section id="wizard" className="py-20 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="font-te-mono text-xs tracking-te-mono mb-4">NEW</Badge>
          <h2 className="text-3xl sm:text-4xl font-te-display font-bold mb-4 tracking-te-display">FIX MY LIBRARY</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-te-sans">
            Press one button and the app checks your whole library. Then it goes through what it found, one step at a
            time. Nothing changes until you confirm, and there's a backup before every step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start max-w-6xl mx-auto">
          <ol className="lg:col-span-2 space-y-6 lg:sticky lg:top-24">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="h-8 w-8 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-te-mono text-sm">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-te-display font-semibold tracking-te-display mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground font-te-sans">{step.description}</p>
                </div>
              </li>
            ))}
            <li className="text-sm text-muted-foreground font-te-sans pl-12">
              A step with nothing to do is skipped. Want one tool on its own? Switch to Advanced.
            </li>
          </ol>

          <div className="lg:col-span-3 space-y-6">
            {shots.map((shot) => (
              <figure key={shot.src} className="bg-card/50 backdrop-blur-sm border rounded-te-lg p-4">
                <img src={getAssetPath(shot.src)} alt={shot.alt} loading="lazy" className="w-full rounded-te border" />
                <figcaption className="text-sm text-muted-foreground mt-3 font-te-mono">{shot.caption}</figcaption>
              </figure>
            ))}
            <p className="text-xs text-muted-foreground font-te-mono text-center">Screenshots made with a made-up library.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
