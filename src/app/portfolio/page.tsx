"use client"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LenisProvider } from '@/components/LenisProvider'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'

export default function PortfolioPage() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.',
      image: '/api/placeholder/600/400',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team features.',
      image: '/api/placeholder/600/400',
      tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with location-based forecasts and interactive maps.',
      image: '/api/placeholder/600/400',
      tech: ['Vue.js', 'D3.js', 'Weather API', 'CSS3'],
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'Blog Platform',
      description: 'Modern blog platform with markdown support and content management system.',
      image: '/api/placeholder/600/400',
      tech: ['Gatsby', 'GraphQL', 'Contentful', 'Styled Components'],
      github: 'https://github.com',
      live: 'https://example.com'
    }
  ]

  return (
    <LenisProvider>
      <Header />
      <main className="pt-8">
        {/* Header Section */}
        <section className="px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              My Portfolio
            </h1>
            <p className="text-sm sm:text-base mb-8 max-w-2xl mx-auto text-muted-foreground">
              A collection of projects I&apos;ve worked on, showcasing my skills in frontend development, 
              UI/UX design, and modern web technologies.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-12">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <div className="p-6">
                    <h3 className="text-base font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-1 bg-muted text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-muted/20 px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6">
              Let&apos;s Work Together
            </h2>
            <p className="text-sm sm:text-base mb-8 text-muted-foreground">
              Interested in collaborating on a project? I&apos;d love to hear from you.
            </p>
            <Button asChild>
              <a href="/contact">Get In Touch</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </LenisProvider>
  )
}