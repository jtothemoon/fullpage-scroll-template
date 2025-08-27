"use client"

export function AboutSection() {
  return (
    <section className="h-dvh bg-muted flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          About Me
        </h2>
        <p className="text-sm sm:text-base mb-6 text-muted-foreground">
          Passionate developer with expertise in modern web technologies
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="border p-4 rounded bg-background/80 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Frontend</h3>
            <p className="text-sm text-muted-foreground">React, Next.js, TypeScript</p>
          </div>
          <div className="border p-4 rounded bg-background/80 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Design</h3>
            <p className="text-sm text-muted-foreground">Figma, Tailwind CSS</p>
          </div>
          <div className="border p-4 rounded bg-background/80 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Backend</h3>
            <p className="text-sm text-muted-foreground">Node.js, Python</p>
          </div>
        </div>
      </div>
    </section>
  )
}