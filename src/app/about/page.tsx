"use client"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LenisProvider } from '@/components/LenisProvider'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <LenisProvider>
      <Header />
      <main className="pt-8">
        {/* Header Section */}
        <section className="px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              About Me
            </h1>
            <p className="text-sm sm:text-base mb-8 max-w-2xl mx-auto text-muted-foreground">
              Passionate frontend developer with 5+ years of experience creating beautiful, 
              functional web applications using modern technologies.
            </p>
            <Button>
              Download Resume
            </Button>
          </div>
        </section>

        {/* Skills Section */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-12">
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                { title: 'Backend', skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
                { title: 'Tools', skills: ['Git', 'Docker', 'Figma', 'VS Code'] },
              ].map((category) => (
                <div key={category.title} className="border p-6 rounded">
                  <h3 className="text-base font-semibold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-sm text-muted-foreground">{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-muted/20 px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-12">
              Experience
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: 'Senior Frontend Developer',
                  company: 'Tech Company',
                  period: '2022 - Present',
                  description: 'Leading frontend development for multiple projects using React and Next.js.'
                },
                {
                  title: 'Frontend Developer',
                  company: 'Startup Inc.',
                  period: '2020 - 2022',
                  description: 'Developed responsive web applications and improved user experience.'
                },
              ].map((job, index) => (
                <div key={index} className="border p-6 rounded">
                  <h3 className="text-base font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{job.company} • {job.period}</p>
                  <p className="text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LenisProvider>
  )
}