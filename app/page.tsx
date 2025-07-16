'use client';

import Hero from '@/components/Hero';
import AboutPreview from '@/components/AboutPreview';
import ProjectsPreview from '@/components/ProjectsPreview';
import ContactPreview from '@/components/ContactPreview';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="bg-zinc-950 text-white">
      <Hero />
      <AboutPreview />
      <ProjectsPreview />
      <ContactPreview />
      <Footer />
      {/* <ProjectsPreview />
       */}
    </main>
  );
}
