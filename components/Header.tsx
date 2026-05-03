'use client';

import { Button } from '@/components/Button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/Sheet';
import { Menu, Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/conferences', label: 'Conferences' },
  {
    href: 'https://journal.dhbenelux.org',
    label: 'Journal',
    external: true,
  },
  { href: '/news', label: 'News' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Digital Humanities BeNeLux Logo"
              width={160}
              height={50}
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                variant="ghost"
                asChild
                key={`nav-${link.href}`}
                className="text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Link
                  href={link.href}
                  target={link.external ? '_blank' : '_self'}
                  rel={link.external ? 'noopener noreferrer' : ''}
                >
                  {link.label}
                </Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors"
              asChild
            >
              <Link href="/search">
                <Search className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Link
                href="https://twitter.com/dhbenelux"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                {/* Added example Twitter link */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-full p-0 shadow-none rounded-none"
                title="Main navigation"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-end h-20 px-4 sm:px-6 lg:px-8 container mx-auto">
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close menu"
                      >
                        <X className="w-6 h-6" />
                      </Button>
                    </SheetClose>
                  </div>

                  <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 pb-4 gap-4 container mx-auto w-full">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="flex-1"
                        asChild
                      >
                        <Link href="/search">
                          <Search className="w-5 h-5" />
                          <span className="sr-only">Search</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="flex-1"
                      >
                        <Link
                          href="https://twitter.com/dhbenelux"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                            aria-hidden="true"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span className="sr-only">Twitter</span>
                        </Link>
                      </Button>
                    </div>

                    <nav className="flex-1 flex flex-col items-center justify-center space-y-2 text-center">
                      {navLinks.map((link) => (
                        <SheetClose asChild key={`mobile-nav-${link.href}`}>
                          <Link
                            href={link.href}
                            target={link.external ? '_blank' : '_self'}
                            rel={link.external ? 'noopener noreferrer' : ''}
                            className="block rounded-lg px-3 py-2 text-foreground hover:bg-accent hover:text-accent-foreground transition"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
