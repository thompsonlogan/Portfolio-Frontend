import { Reveal } from "./reveal"

const STATS = [
  { value: "4+", label: "YEARS SHIPPING" },
  { value: "5", label: "LANGUAGES" },
  { value: "∞", label: "SIDE PROJECTS" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-28">
      <Reveal className="grid grid-cols-1 items-start gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
        <div>
          <div className="font-mono text-xs tracking-[0.14em] text-muted-foreground">01 — ABOUT</div>
          <h2 className="mt-3.5 text-[clamp(34px,4.4vw,52px)] font-light leading-[1.02] tracking-[-0.03em]">
            A bit about
            <br />
            how I work.
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-[clamp(18px,2.1vw,23px)] font-light leading-relaxed text-foreground text-pretty">
            I'm a full-stack software engineer based in Wisconsin with 4+ years building cloud-native applications end to
            end — from the React interfaces people actually touch down to the ASP.NET APIs and PostgreSQL schemas behind them.
          </p>
          <p className="max-w-[60ch] text-base leading-relaxed text-muted-foreground text-pretty">
            I care about the unglamorous parts: clean data models, fast feedback loops, tests that mean something, and
            shipping features that feel obvious in hindsight. When I'm not at work, I build my own products — most
            recently <span className="text-foreground">Fitlytics</span>, a fitness analytics platform — to keep learning
            the whole stack, not just my slice of it.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-9">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-semibold tracking-[-0.02em]">{stat.value}</div>
                <div className="mt-0.5 font-mono text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
