import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Hero from './components/Hero'
import FeaturedWork from './components/FeaturedWork'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ParticleField from './components/ParticleField'

function App() {
  return (
    <Router>
      <CustomCursor />
      <ScrollProgress />
      <ParticleField />
      <Navbar />
      <main>
        <Hero />
        <FeaturedWork />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </Router>
  )
}

export default App
