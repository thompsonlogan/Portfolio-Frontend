import { ArrowUpRight, FileText } from "lucide-react"
import { Reveal } from "./reveal"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
    </svg>
  )
}

interface ConnectSectionProps {
  githubUrl: string
  linkedinUrl: string
  onGithub: () => void
  onLinkedin: () => void
  onResume: () => void
}

export function ConnectSection({ githubUrl, linkedinUrl, onGithub, onLinkedin, onResume }: ConnectSectionProps) {
  const socials = [
    { name: "GitHub", handle: "@thompsonlogan", url: githubUrl, onClick: onGithub, Icon: GithubIcon },
    { name: "LinkedIn", handle: "@loganothompson", url: linkedinUrl, onClick: onLinkedin, Icon: LinkedinIcon },
  ]

  return (
    <section id="connect" className="pb-16 pt-8">
      <Reveal className="grid grid-cols-1 items-start gap-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <div className="font-mono text-xs tracking-[0.14em] text-muted-foreground">07 — CONTACT</div>
          <h2 className="mt-3.5 text-[clamp(40px,6vw,76px)] font-light leading-[0.95] tracking-[-0.035em]">
            Let's
            <br />
            connect.
          </h2>
          <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-muted-foreground">
            Always interested in new opportunities, collaborations, and good conversations about software.
          </p>
          <a
            href="mailto:thompsonlogan78@gmail.com"
            className="mt-7 inline-flex items-center gap-2.5 border-b border-brand pb-1 text-[clamp(18px,2.4vw,26px)] text-foreground transition-transform hover:-translate-y-0.5"
          >
            thompsonlogan78@gmail.com
            <ArrowUpRight className="h-[22px] w-[22px]" />
          </a>
        </div>

        <div>
          <div className="mb-4 font-mono text-xs text-muted-foreground">ELSEWHERE</div>
          <div className="flex flex-col gap-2.5">
            {socials.map(({ name, handle, url, onClick, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
                className="flex items-center gap-3.5 rounded-xl border border-border p-4.5 text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
              >
                <Icon className="h-5 w-5 shrink-0" />
                <div>
                  <div className="text-[15px]">{name}</div>
                  <div className="text-[12.5px] text-muted-foreground">{handle}</div>
                </div>
                <span className="flex-1" />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
            <button
              type="button"
              onClick={onResume}
              className="flex items-center gap-3.5 rounded-xl border border-border p-4.5 text-left text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
            >
              <FileText className="h-5 w-5 shrink-0" />
              <div>
                <div className="text-[15px]">Resume</div>
                <div className="text-[12.5px] text-muted-foreground">Download PDF</div>
              </div>
              <span className="flex-1" />
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
