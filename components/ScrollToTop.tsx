'use client';

import { ArrowRight } from 'lucide-react';

export function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
      aria-label="Scroll to top"
    >
      <ArrowRight className="w-5 h-5 -rotate-90" />
    </button>
  );
}
