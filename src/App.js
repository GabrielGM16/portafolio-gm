import React from 'react';
import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import CurrentRoles from './components/CurrentRoles';
import Timeline from './components/Timeline';
import Cases from './components/Cases';
import Capabilities from './components/Capabilities';
import Credentials from './components/Credentials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Framer Motion anima por JS, así que la regla CSS de prefers-reduced-motion
// no lo alcanza: hay que decírselo explícitamente.
const App = () => (
  <MotionConfig reducedMotion="user">
    <Nav />
    <main id="contenido">
      <Hero />
      <CurrentRoles />
      <Timeline />
      <Cases />
      <Capabilities />
      <Credentials />
      <ContactSection />
    </main>
    <Footer />
  </MotionConfig>
);

export default App;
