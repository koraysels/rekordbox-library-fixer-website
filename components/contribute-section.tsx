import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, GitPullRequest, Bug, Lightbulb } from "lucide-react"

export function ContributeSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-te-display tracking-te-display">Wanna Help?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            This is an open source project that could use your help. Whether you code, test, or just have ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-6">
              <GitPullRequest className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-te-display font-semibold mb-2 tracking-te-display">Contribute Code</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Fix bugs, add features, or improve the UI. Check out the open issues.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/koraysels/rekordbox-library-fixer/issues">View Issues</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Bug className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-te-display font-semibold mb-2 tracking-te-display">Report Bugs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Found something broken? Let us know so we can fix it.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/koraysels/rekordbox-library-fixer/issues/new">Report Bug</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-te-display font-semibold mb-2 tracking-te-display">Share Ideas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Got suggestions or feature requests? Open an issue to share your ideas.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/koraysels/rekordbox-library-fixer/issues/new">Suggest Feature</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button asChild>
            <a href="https://github.com/koraysels/rekordbox-library-fixer" className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
