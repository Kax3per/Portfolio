import { useState } from 'react'
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Featured from "./components/ProjectsSection";
import AboutMe from './components/AboutMeSection';
import { LanguageProvider } from "./LanguageContext";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
    <LanguageProvider>
      <Navbar />
      <Hero />
      <AboutMe />
      <Featured />
      </LanguageProvider>


  
    </>
  )
}

export default App
