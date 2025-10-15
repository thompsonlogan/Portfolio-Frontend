import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  useAddGithubVisitMutation,
  useAddLinkedinVisitMutation,
  useAddResumeDownloadMutation,
  useAddVisitMutation,
} from "../mutations/analytics-mutations"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  const resumeDownloadUrl = import.meta.env.VITE_RESUME_DOWNLOAD_URL

  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  const currentYear = new Date().getFullYear()
  const addVisitMutation = useAddVisitMutation()
  const addGithubVisitMutation = useAddGithubVisitMutation()
  const addLinkedinVisitMutation = useAddLinkedinVisitMutation()
  const addResumeDownloadMutation = useAddResumeDownloadMutation()

  const source = useMemo(() => {
    return new URLSearchParams(window.location.search).get("source") ?? "unknown"
  }, [])

  // TODO: remove
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (source && addVisitMutation.mutate) {
      addVisitMutation.mutate({ source })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleResumeDownload = () => {
    addResumeDownloadMutation.mutate({ source })
  }

  const handleGithubClicked = () => {
    addGithubVisitMutation.mutate({ source })
  }

  const handleLinkedinClicked = () => {
    addLinkedinVisitMutation.mutate({ source })
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "education", "skills", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el
          }}
          className="min-h-screen flex flex-col items-center justify-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full max-w-4xl">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / {currentYear}</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Logan
                  <br />
                  <span className="text-muted-foreground">Thompson</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Full-stack Software Engineer with 3+ years of experience building cloud-native applications using{" "}
                  <span className="text-foreground">TypeScript</span>, <span className="text-foreground">React</span>,
                  and <span className="text-foreground">C#</span>. Passionate about developing scalable, user-focused
                  solutions and delivering end-to-end features that bring ideas to life.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Wisconsin</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Software Engineer</div>
                  <div className="text-muted-foreground">@ Yahara Software</div>
                  <div className="text-xs text-muted-foreground">March 2024 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["TypeScript", "React", "C#", ".NET", "Entity Framework", "PostgreSQL"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Centered Resume Button */}
          <div className="mt-12">
            <a
              href={resumeDownloadUrl}
              download
              onClick={handleResumeDownload}
              className="px-8 py-3 border border-border rounded-xl text-sm font-medium text-foreground
                 hover:bg-accent hover:text-accent-foreground hover:shadow-md
                 transition-all duration-300"
            >
              Download Resume
            </a>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2021 — {currentYear}</div>
            </div>

            {/* Jobs */}
            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "March 2024 - Present",
                  role: "Software Engineer",
                  company: "Yahara Software",
                  description: "Built performat backend APIs and frontend interfaces for scalable applications.",
                  tech: ["TypeScript", "React", "C#"],
                },
                {
                  year: "May 2022 - March 2024",
                  role: "Software Engineer",
                  company: "Elutions",
                  description: "Maintained SCADA systems, automated builds, and delivered reliable software updates.",
                  tech: ["React", "JavaScript", "C#", "C++", "Python"],
                },
                {
                  year: "May 2021 - May 2022",
                  role: "Salesforce Developer",
                  company: "Emelar Consulting",
                  description:
                    "Developed custom Salesforce solutions, automated processes, and supported client success.",
                  tech: ["JavaScript", "Java", "Python"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  {/* Left column: role, company, description, tech */}
                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>

                    {/* Tech chips with borders */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs border border-border/50 rounded-md text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right column: year */}
                  <div className="lg:col-span-6 flex flex-col items-end mt-2 lg:mt-0">
                    <div className="text-sm sm:text-base font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500 whitespace-nowrap">
                      {job.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <a
                href={resumeDownloadUrl}
                download
                onClick={handleResumeDownload}
                className="px-6 py-3 border border-border rounded-xl text-sm font-medium text-foreground
               hover:bg-accent hover:text-accent-foreground hover:shadow-md
               transition-all duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>

        <section
          id="education"
          ref={(el) => {
            sectionsRef.current[2] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Education & Certifications</h2>
              <div className="text-sm text-muted-foreground font-mono">2022 — 2025</div>
            </div>

            {/* Education & Certifications */}
            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "AWS Certified Cloud Practitioner",
                  company: "Amazon Web Services",
                  description: "",
                },
                {
                  year: "2022",
                  role: "University of Wisconsin–Platteville",
                  company: "B.S. in Software Engineering",
                  description: "",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  {/* Left column: title + org */}
                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{item.role}</h3>
                      <div className="text-muted-foreground">{item.company}</div>
                    </div>
                    {item.description && (
                      <p className="text-muted-foreground leading-relaxed max-w-lg">{item.description}</p>
                    )}
                  </div>

                  {/* Right column: year */}
                  <div className="lg:col-span-6 flex flex-col items-end mt-2 lg:mt-0">
                    <div className="text-sm sm:text-base font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500 whitespace-nowrap">
                      {item.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          ref={(el) => {
            sectionsRef.current[3] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Skills & Tools</h2>
              <div className="text-sm text-muted-foreground font-mono">Full-Stack Development</div>
            </div>

            {/* Skills grid */}
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {/* Languages */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-medium">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["C#", "TypeScript", "JavaScript", "Python", "Java"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs border border-border/50 rounded-md text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-medium">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {[".NET Core", "ASP.NET Web API", "Entity Framework Core"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs border border-border/50 rounded-md text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frontend */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-medium">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "React Query", "React Hook Form", "Tailwind CSS", "Material UI"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs border border-border/50 rounded-md text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testing */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-medium">Testing</h3>
                <div className="flex flex-wrap gap-2">
                  {["NSubstitute", "Vitest", "Jest", "React Testing Library"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs border border-border/50 rounded-md text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Databases */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-medium">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {["PostgreSQL", "DynamoDB"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs border border-border/50 rounded-md text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cloud & DevOps */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-medium">Cloud & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {["AWS (S3, Lambda, ECS)", "Docker"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs border border-border/50 rounded-md text-muted-foreground group-hover:border-muted-foreground/50 transition-colors duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[4] = el
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology.
                </p>

                <div className="space-y-4">
                  <Link
                    to="/"
                    href="mailto:thompsonlogan78@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">thompsonlogan78@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "GitHub",
                    handle: "@thompsonlogan",
                    url: "https://github.com/thompsonlogan",
                    onclick: handleGithubClicked,
                  },
                  {
                    name: "LinkedIn",
                    handle: "@loganothompson",
                    url: "https://www.linkedin.com/in/loganothompson/",
                    onclick: handleLinkedinClicked,
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    onClick={social.onclick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© {currentYear} Logan Thompson. All rights reserved.</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
