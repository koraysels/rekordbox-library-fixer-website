import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Alex Rodriguez",
    role: "Club DJ",
    content: "Finally! This tool saved me hours of manual cleanup. Found 200+ duplicates in my 15,000 track library.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Wedding DJ",
    content: "The track relocation feature is a game-changer. No more broken links when I reorganize my music folders.",
    rating: 5,
  },
  {
    name: "Mike Thompson",
    role: "Radio DJ",
    content: "Simple, fast, and it actually works. Best part? It's completely free with no hidden catches.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by DJs Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't just take our word for it. Here's what fellow DJs are saying about the tool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">"{testimonial.content}"</blockquote>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
