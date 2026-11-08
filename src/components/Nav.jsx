import { profile } from '../data'
const links = [['About', '#about'], ['Stack', '#stack'], ['Projects', '#projects'], ['Contact', '#contact']]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/70 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-lg font-bold text-white">sd<span className="text-accent">.</span></a>
        <ul className="flex items-center gap-4 text-xs sm:gap-8 sm:text-sm">
          {links.map(([l, h]) => (
            <li key={h} className={l === 'About' ? 'hidden sm:block' : ''}>
              <a href={h} className="text-mute transition-colors hover:text-accent">{l}</a>
            </li>
          ))}
          <li><a href={profile.github} target="_blank" rel="noopener noreferrer" className="hidden text-mute hover:text-accent sm:block">GitHub</a></li>
        </ul>
      </nav>
    </header>
  )
}
