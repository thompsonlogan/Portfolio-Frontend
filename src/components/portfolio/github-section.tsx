import { GitFork, Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useGithubLanguages, useGithubPinned, useGithubProfile, useGithubRepos } from "@/queries/github-queries"
import { GITHUB_HANDLE } from "@/data/portfolio"
import type { GithubRepoResponse } from "@/services/generated"
import { Reveal } from "./reveal"
import { ContributionGraph } from "./contribution-graph"

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  "C#": "#178600",
  Python: "#3572a5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  "Jupyter Notebook": "#da5b0b",
  PLpgSQL: "#336790",
}

function langColor(name: string, i: number): string {
  return LANG_COLORS[name] ?? ["#5b8def", "#7c6cf0", "#34c98b", "#e5e5e5", "#f59e0b", "#ef4444"][i % 6]
}

function StatCard({ value, label, loading }: { value: string | number; label: string; loading: boolean }) {
  return (
    <div className="rounded-2xl border border-border p-5.5">
      {loading ? (
        <Skeleton className="h-10 w-16" />
      ) : (
        <div className="text-[40px] font-semibold leading-none tracking-[-0.03em]">{value}</div>
      )}
      <div className="mt-2.5 font-mono text-[11.5px] text-muted-foreground">{label}</div>
    </div>
  )
}

function RepoCard({ repo, onOpen }: { repo: GithubRepoResponse; onOpen: () => void }) {
  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onOpen}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-[color-mix(in_srgb,var(--card)_45%,transparent)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong"
    >
      <div className="flex items-center gap-2">
        <span className="truncate text-[15px] font-medium">{repo.name}</span>
        {repo.isPinned && (
          <Badge variant="outline" className="rounded-full border-brand px-2 py-0 font-mono text-[10px] text-brand">
            pinned
          </Badge>
        )}
      </div>
      <p className="line-clamp-2 min-h-[2.6em] text-[13.5px] leading-relaxed text-muted-foreground">
        {repo.description || "No description provided."}
      </p>
      <div className="mt-auto flex items-center gap-4 border-t border-border pt-3 font-mono text-[11.5px] text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColor(repo.language, 0) }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />
          {repo.forks}
        </span>
      </div>
    </a>
  )
}

interface GithubSectionProps {
  onGithub: () => void
}

export function GithubSection({ onGithub }: GithubSectionProps) {
  const profile = useGithubProfile()
  const repos = useGithubRepos()
  const pinned = useGithubPinned()
  const languages = useGithubLanguages()

  const p = profile.data
  const langs = (languages.data ?? []).slice(0, 8)
  const langTotal = langs.reduce((sum, l) => sum + (l.percent ?? 0), 0) || 1

  // Prefer pinned repos; fall back to top repos by stars (API already sorts).
  const featured = (pinned.data && pinned.data.length > 0 ? pinned.data : (repos.data ?? []).filter((r) => !r.isFork)).slice(0, 6)

  return (
    <section id="stats" className="pb-28 pt-8">
      <Reveal className="mb-10">
        <div className="font-mono text-xs tracking-[0.14em] text-muted-foreground">05 — ACTIVITY</div>
        <h2 className="mt-3.5 text-[clamp(34px,4.4vw,52px)] font-light tracking-[-0.03em]">On GitHub</h2>
      </Reveal>

      <Reveal className="mb-6 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <StatCard value={p?.publicRepos ?? 0} label="REPOSITORIES" loading={profile.isLoading} />
        <StatCard value={p?.totalStars ?? 0} label="STARS EARNED" loading={profile.isLoading} />
        <StatCard value={p?.followers ?? 0} label="FOLLOWERS" loading={profile.isLoading} />
        <StatCard value={languages.data?.length ?? 0} label="LANGUAGES" loading={languages.isLoading} />
      </Reveal>

      {/* contribution graph */}
      <Reveal className="mb-6">
        <ContributionGraph />
      </Reveal>

      {/* language breakdown */}
      <Reveal className="mb-6">
        <div className="rounded-2xl border border-border bg-[color-mix(in_srgb,var(--card)_55%,transparent)] p-5.5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[13px] text-muted-foreground">Language breakdown across public repos</span>
            <span className="font-mono text-[11px] text-muted-foreground">@{GITHUB_HANDLE}</span>
          </div>
          {languages.isLoading ? (
            <Skeleton className="h-3 w-full rounded-full" />
          ) : langs.length > 0 ? (
            <>
              <div className="flex h-3 w-full overflow-hidden rounded-full">
                {langs.map((l, i) => (
                  <div
                    key={l.language}
                    title={`${l.language} ${(l.percent ?? 0).toFixed(1)}%`}
                    style={{ width: `${((l.percent ?? 0) / langTotal) * 100}%`, background: langColor(l.language ?? "", i) }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {langs.map((l, i) => (
                  <span key={l.language} className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColor(l.language ?? "", i) }} />
                    <span className="text-foreground">{l.language}</span>
                    {(l.percent ?? 0).toFixed(1)}%
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-[13px] text-muted-foreground">Language data will appear once the GitHub sync runs.</p>
          )}
        </div>
      </Reveal>

      {/* repos grid */}
      <Reveal>
        {repos.isLoading || pinned.isLoading ? (
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[150px] rounded-2xl" />
            ))}
          </div>
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((repo) => (
              <RepoCard key={repo.id} repo={repo} onOpen={onGithub} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border p-8 text-center text-[14px] text-muted-foreground">
            Repositories will appear here once the backend GitHub sync has run.
          </div>
        )}
      </Reveal>
    </section>
  )
}
