import { socialsContent, githubPreviewData } from '../content/socials';
import { Github, Instagram, Linkedin, Mail, ExternalLink, GitBranch, Star, Code2, CheckCircle2 } from 'lucide-react';

export default function SocialsAndGithubSection() {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'GitHub': return Github;
      case 'Instagram': return Instagram;
      case 'LinkedIn': return Linkedin;
      case 'Direct Mail': return Mail;
      default: return ExternalLink;
    }
  };

  return (
    <section
      id="socials"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/80 bg-[#0c0c0e] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#ff3b30] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff3b30]" />
              SECTOR 09 // OPEN SOURCE TELEMETRY & NETWORK
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-zinc-100 uppercase">
              GITHUB & <span className="text-zinc-500">PRESENCE</span>
            </h2>
          </div>

          <div className="text-xs font-mono-code text-zinc-400 max-w-sm">
            Real code repos, verified public communication channels, and build logs.
          </div>
        </div>

        {/* GitHub Live Preview Hub */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#121216]/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-display font-bold text-zinc-100">
                    github.com/{githubPreviewData.username}
                  </h3>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs font-mono-code text-zinc-400">
                  {githubPreviewData.bio}
                </p>
              </div>
            </div>

            <a
              id="github-profile-link"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              data-interactive="true"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-mono-code uppercase transition-all cursor-pointer shadow"
            >
              <span>OPEN GITHUB PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#ff3b30]" />
            </a>
          </div>

          {/* Language Breakdown Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-code text-zinc-400">
              <span>PRIMARY CODEBASE LANGUAGES</span>
              <span>18 PUBLIC REPOSITORIES</span>
            </div>

            <div className="h-2.5 w-full bg-zinc-900 rounded-full overflow-hidden flex">
              {githubPreviewData.topLanguages.map((lang, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${lang.percent}%`,
                    backgroundColor: lang.color,
                  }}
                  title={`${lang.name}: ${lang.percent}%`}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              {githubPreviewData.topLanguages.map((lang, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs font-mono-code text-zinc-300">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span>
                    {lang.name} <span className="text-zinc-500">({lang.percent}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pinned Repositories Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {githubPreviewData.pinnedRepos.map((repo, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code text-zinc-200 font-bold">
                    <span className="truncate">{repo.name}</span>
                    <GitBranch className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                  <p className="text-xs font-sans text-zinc-400 line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono-code text-zinc-500">
                  <span>{repo.language}</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-400" /> {repo.stars}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Accounts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
          {socialsContent.map((soc) => {
            const Icon = getIcon(soc.platform);
            return (
              <a
                key={soc.platform}
                id={`social-link-${soc.platform.toLowerCase().replace(/\s+/g, '-')}`}
                href={soc.url}
                target={soc.url.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                data-interactive="true"
                className="p-5 rounded-2xl border border-zinc-800/80 bg-[#121216]/60 hover:bg-zinc-800/40 hover:border-zinc-700 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </div>

                  <div>
                    <h4 className="text-sm font-display font-bold text-zinc-100">
                      {soc.platform}
                    </h4>
                    <p className="text-xs font-mono-code text-[#ff3b30]">
                      {soc.handle}
                    </p>
                  </div>

                  <p className="text-xs font-sans text-zinc-400 line-clamp-2 leading-relaxed">
                    {soc.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
