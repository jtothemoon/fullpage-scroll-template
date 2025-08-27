"use client"

export function ContactSection() {
  return (
    <section className="h-dvh bg-primary/10 flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Get In Touch
        </h2>
        <p className="text-sm sm:text-base mb-8 text-muted-foreground">
          Let&apos;s work together on your next project
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            Send Email
          </button>
          <button className="px-4 py-2 border border-primary/30 rounded bg-background/80 backdrop-blur-sm hover:bg-primary/5 transition-colors">
            View Resume
          </button>
        </div>
      </div>
    </section>
  )
}