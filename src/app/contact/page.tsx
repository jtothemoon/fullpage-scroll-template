"use client"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LenisProvider } from '@/components/LenisProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <LenisProvider>
      <Header />
      <main className="pt-8">
        {/* Header Section */}
        <section className="px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-sm sm:text-base mb-8 max-w-2xl mx-auto text-muted-foreground">
              Have a project in mind or want to discuss opportunities? 
              I&apos;d love to hear from you. Let&apos;s create something amazing together.
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-6">Send a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </Label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </Label>
                    <Input 
                      id="subject" 
                      placeholder="Project Inquiry" 
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell me about your project..." 
                      className="w-full min-h-32"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">contact@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-sm text-muted-foreground">
                        San Francisco, CA<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2">Response Time</h3>
                  <p className="text-sm text-muted-foreground">
                    I typically respond to messages within 24 hours. 
                    For urgent matters, feel free to reach out via phone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/20 px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "What&apos;s your typical project timeline?",
                  answer: "Project timelines vary depending on scope and complexity. Small projects typically take 2-4 weeks, while larger applications can take 2-3 months."
                },
                {
                  question: "Do you work with clients remotely?",
                  answer: "Yes, I work with clients worldwide. I&apos;m experienced in remote collaboration and use modern tools to ensure smooth communication."
                },
                {
                  question: "What technologies do you specialize in?",
                  answer: "I specialize in React, Next.js, TypeScript, and modern CSS frameworks. I also have experience with Node.js and various databases."
                }
              ].map((faq, index) => (
                <div key={index} className="border p-6 rounded-lg">
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
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