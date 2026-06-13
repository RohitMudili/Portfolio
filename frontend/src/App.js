import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import AchievementsEducation from "./components/AchievementsEducation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import { Toaster } from "./components/ui/toaster";
import { useLenis } from "./lib/motion";

function App() {
  useLenis();
  return (
    <div className="App">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <AchievementsEducation />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
