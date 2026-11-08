import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { profile } from './data'

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-line py-8 text-center text-xs text-mute">
        © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS and Framer Motion.
      </footer>
    </>
  )
}
