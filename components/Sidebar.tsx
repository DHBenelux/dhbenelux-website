import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Edit3, ExternalLink, Info, Mail, Rss, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const quickLinks = [
  { text: 'About DH BeNeLux', link: '/about', icon: <Info /> },
  { text: 'Our Board', link: '/board', icon: <Users /> },
  { text: 'DH BeNeLux Journal', link: '/journal', icon: <Edit3 /> },
  { text: 'News Archive', link: '/news-archive', icon: <Rss /> },
  { text: 'Contact Us', link: '/contact', icon: <Mail /> },
];

const currentConference: { name: string; link: string } | null = {
  name: 'DH BeNeLux Conference 2024',
  link: 'https://conference.dhbenelux.org',
};

export function Sidebar() {
  return (
    <aside className="lg:col-span-1 space-y-8 sticky top-28 self-start">
      {currentConference && (
        <Card className="bg-accent/50 border-accent shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-merriweather text-primary flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-primary" />
              Annual Conference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Stay updated with the {currentConference.name}.
            </p>
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link
                href={currentConference.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Conference Site
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card shadow-lg border-t-4 border-primary hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-merriweather text-card-foreground">
            Quick Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2.5">
            {quickLinks.map((item) => (
              <li key={`quick-link-${item.text}`}>
                <Link
                  href={item.link}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center group text-sm py-1"
                >
                  {React.cloneElement(item.icon, {
                    className:
                      'w-4 h-4 mr-3 text-primary/80 group-hover:text-primary transition-colors',
                  })}
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
