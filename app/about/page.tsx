import { Button } from '@/components/Button';
import { ConnectWithUs } from '@/components/ConnectWithUs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { TocNav } from '@/components/TocNav';
import { getTimelineEntries } from '@/lib/content';
import {
  CalendarDays,
  Globe2,
  Megaphone,
  Network,
  Shield,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

const executiveBoardMembers = [
  {
    name: 'Sébastien de Valeriola',
    affiliation: 'ICHEC, Free University of Brussels',
    roles: ['Chair'],
  },
  {
    name: 'Lorella Viola',
    affiliation: 'University of Luxembourg',
    roles: ['Event Coordinator', 'Communication Coordinator'],
  },
  {
    name: 'Elli Bleeker',
    affiliation: 'Huygens ING',
    roles: ['Event Coordinator', 'Communication Coordinator'],
  },
  {
    name: 'Wout Dillen',
    affiliation: 'Antwerp University',
    roles: ['Publication Coordinator'],
  },
  {
    name: 'A. Seza Doğruöz',
    affiliation: 'Ghent University',
    roles: ['Communication Coordinator', 'Secretary'],
  },
  {
    name: 'Joris van Zundert',
    affiliation: 'Huygens ING',
    roles: ['Communication Coordinator', 'Secretary'],
  },
  {
    name: 'Sally Chambers',
    affiliation: 'Ghent University',
    roles: ['Secretary'],
  },
  {
    name: 'Marijn Koolen',
    affiliation: 'Huygens ING',
    roles: ['Outgoing Chair', 'Facilitating role'],
  },
];

const steeringGroupMembers = [
  'A. Seza Doğruöz (Ghent University)',
  'Andrea Scharnhorst (DANS, KNAW)',
  'Dominique Longree (Université de Liège)',
  'Elli Bleeker (Huygens ING)',
  'Gerben Zaagsma (University of Luxembourg)',
  'Isabelle Gribomont (KBR)',
  'Joris van Zundert (Huygens ING)',
  'Julie Birkholz (KBR, Ghent University)',
  'Lars Wieneke (University of Luxembourg)',
  'Lorella Viola (University of Luxembourg)',
  'Margherita Fantoli (KU Leuven)',
  'Marijn Koolen (Huygens ING)',
  'Mike Kestemont (University of Antwerp)',
  'Sébastian de Valeriola (Université libre de Bruxelles)',
  'Steven Claeyssens (National Library of the Netherlands)',
  'Susan Aasman (University of Groningen)',
  'Suzan Verberne (Leiden University)',
  'Thomas Smits (University of Amsterdam)',
  'Tom Gheldof (KU Leuven)',
  'Tommaso Caselli (University of Groningen)',
  'Wout Dillen (University of Antwerp)',
];

const partners = [
  {
    name: 'European Association for Digital Humanities (EADH)',
    role: 'European umbrella organisation advancing digital humanities research, methods, and networking.',
    link: 'https://eadh.org',
    cta: 'Visit EADH',
  },
];

const involvement = [
  {
    title: 'Join the mailing list',
    copy: 'Receive calls for papers, registration announcements, and community updates.',
    link: 'https://groups.google.com/forum/#!forum/dh-benelux-mailinglist',
  },
  {
    title: 'Host or volunteer',
    copy: 'Propose to host a future conference or join a local organising committee.',
  },
  {
    title: 'Share research',
    copy: 'Submit to the annual conference, journal, or Zenodo community to keep outputs open.',
  },
  {
    title: 'Partner with us',
    copy: 'Heritage organisations and labs can co-design workshops and community projects.',
  },
];

const quickFacts = [
  {
    label: 'Region',
    value: 'Belgium · Netherlands · Luxembourg',
    icon: Globe2,
  },
  {
    label: 'Founded',
    value: 'Grassroots network since 2014',
    icon: CalendarDays,
  },
  {
    label: 'What we do',
    value: 'Annual conference, journal, and Zenodo community',
    icon: Megaphone,
  },
  {
    label: 'Who joins',
    value: 'Researchers, heritage professionals, students, and labs',
    icon: Users,
  },
  {
    label: 'Executive Board',
    value:
      'Volunteer Chair, event & communication coordinators, and secretaries',
    icon: Shield,
  },
  {
    label: 'Steering Group',
    value:
      '21 DH researchers advising across Belgium, Netherlands, and Luxembourg',
    icon: Network,
  },
];

export const metadata: Metadata = {
  title: 'About | BeNeLux',
  description:
    'Learn about DH BeNeLux as a volunteer-driven, non-profit network connecting digital humanities across Belgium, the Netherlands, and Luxembourg.',
  openGraph: {
    title: 'About DH BeNeLux',
    description:
      'Meet the DH BeNeLux community, governance, founding statement, and timeline.',
    url: '/about',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About DH BeNeLux',
    description:
      'Meet the DH BeNeLux community, governance, founding statement, and timeline.',
    images: ['/opengraph-image'],
  },
};

export default async function AboutPage() {
  const timelineEntries = await getTimelineEntries('about');
  const sortedExecutiveBoard = [...executiveBoardMembers].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  );
  const sortedSteeringGroup = [...steeringGroupMembers].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  );
  const tocItems = [
    { id: 'overview', label: 'About DH BeNeLux' },
    { id: 'founding', label: 'Founding statement' },
    { id: 'structure', label: 'Governance & partners' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'involved', label: 'Get involved' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow space-y-20 md:space-y-24">
        <section className="bg-teal-700 text-white py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-5">
              <h1 className="text-4xl font-merriweather font-bold md:text-5xl leading-tight">
                Volunteer-driven digital humanities network across Belgium, the
                Netherlands, and Luxembourg
              </h1>
              <p className="text-lg leading-relaxed text-teal-50/90">
                We connect researchers, heritage professionals, and students
                through an annual conference, open calls, and collaborative
                projects that keep DH practice inclusive and multilingual.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" variant="primaryOnDark">
                  <Link href="#timeline">View milestones</Link>
                </Button>
                <Button asChild size="lg" variant="secondaryOnDark">
                  <Link href="#involved">Meet the community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
              <div className="space-y-20">
                <section className="rounded-2xl border border-teal-200 bg-teal-50 shadow-sm p-6 md:p-7">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="space-y-2">
                      <h2 className="text-xl font-merriweather font-bold text-foreground">
                        DH BeNeLux at a Glance
                      </h2>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {quickFacts.map((fact) => (
                      <div
                        key={`quickfact-${fact.label}`}
                        className="rounded-xl border border-border bg-background p-4 shadow-sm flex gap-3"
                      >
                        <fact.icon className="h-8 w-8 text-primary" />
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {fact.label}
                          </p>
                          <p className="font-semibold text-foreground leading-snug">
                            {fact.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="overview" className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-2xl font-merriweather font-bold text-foreground">
                        About DH BeNeLux
                      </h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      DH BeNeLux is a volunteer-driven, non-profit network that
                      promotes digital humanities across Belgium, the
                      Netherlands, and Luxembourg. We foreground openness,
                      multilingual collaboration, and practical exchange between
                      universities, libraries, archives, and museums.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-sm font-semibold border border-teal-200">
                        Founded 2014
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-sm font-semibold border border-teal-200">
                        Belgium · Netherlands · Luxembourg
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-sm font-semibold border border-teal-200">
                        Volunteer-led network
                      </span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
                      <p className="font-semibold text-foreground">
                        Community-first
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Organised by volunteers with rotating leadership to stay
                        regionally balanced.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
                      <p className="font-semibold text-foreground">
                        Open by design
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Annual calls for papers, open proceedings, and a Zenodo
                        community keep outputs accessible.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="founding" className="space-y-4">
                  <div className="rounded-2xl border border-teal-700 bg-teal-700 text-white shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8 lg:p-10 space-y-8">
                      <div className="space-y-4 max-w-4xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal-100">
                          Founding statement
                        </p>
                        <h2 className="text-3xl font-merriweather font-bold leading-tight">
                          Keeping DH BeNeLux grassroots and open
                        </h2>
                        <div className="space-y-3 text-teal-50/90 leading-relaxed">
                          <p>
                            The Digital Humanities BeNeLux initiative started in
                            2014. It has the aim to bring Digital Humanities
                            (DH) researchers in Belgium, Luxembourg and the
                            Netherlands closer together, make DH research in
                            this region more visible, and foster collaboration.
                          </p>
                          <p>
                            DH BeNeLux organises annual conferences in order to
                            build a community of DH researchers that is open and
                            inclusive. We interpret “digital humanities”
                            broadly, covering all aspects of digital and
                            computational research and its practices in the
                            humanities and social sciences. The conference
                            should be open for participation by both early
                            career and senior researchers, and serve as a
                            helpful platform for early career researchers to
                            present and get feedback on their research.
                          </p>
                          <p>
                            The conference is hosted by a different institution
                            in the BeNeLux each year, with a group of volunteer
                            organisers responsible for local organisation,
                            programme committee and publicity. DH BeNeLux has a
                            large steering committee which includes DH
                            researchers representing all of the BeNeLux and all
                            of Humanities. The committee offers advice to the
                            conference organisers and decides on future
                            directions to achieve the long-term goals.
                          </p>
                          <p>
                            Although hosted in the BeNeLux, the conferences are
                            open to everyone interested in DH in- and outside
                            the BeNeLux. The language of communication is
                            English but the community strives for a situation
                            where participants can write and present their
                            papers in any of the official languages of the
                            BeNeLux. DH BeNeLux has become a Partner
                            Organisation of the European Association for Digital
                            Humanities (EADH) in order to promote the
                            conferences and embed DH BeNeLux in the wider
                            European DH community and to promote the EADH to the
                            BeNeLux DH community.
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="rounded-xl bg-white/10 border border-white/15 p-4 md:p-5 space-y-3 md:space-y-4 w-full">
                          <p className="text-sm font-semibold text-white">
                            What this means in practice
                          </p>
                          <ul className="space-y-2.5 text-sm text-teal-50/90 leading-relaxed">
                            <li className="flex items-start gap-3">
                              <span className="mt-1 h-2 w-2 rounded-full bg-teal-200" />
                              <span>
                                Hosts rotate yearly to stay regionally balanced
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="mt-1 h-2 w-2 rounded-full bg-teal-200" />
                              <span>
                                Broad DH scope welcomes diverse methods and
                                formats
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="mt-1 h-2 w-2 rounded-full bg-teal-200" />
                              <span>
                                Early career voices present alongside senior
                                peers
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="mt-1 h-2 w-2 rounded-full bg-teal-200" />
                              <span>
                                EADH partner linking BeNeLux to the wider DH
                                community
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="structure" className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-2xl font-merriweather font-bold text-foreground">
                        Governance & partners
                      </h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Together the Executive Board, Steering Group, and partners
                      keep DH BeNeLux balanced across Belgium, the Netherlands,
                      and Luxembourg, aligning strategy, inclusive programming,
                      and European collaboration.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-merriweather font-bold text-foreground">
                        Executive Board
                      </h3>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/50 text-primary border border-accent">
                        Strategy & governance
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Steers strategy, governance, and outreach; coordinates
                      events, communications, publications, and transparency
                      with rotating leadership across the region.
                    </p>
                    <div className="grid md:grid-cols-2 gap-5">
                      {sortedExecutiveBoard.map((member) => (
                        <div
                          key={`board-${member.name}`}
                          className="rounded-xl border border-border bg-background p-4 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">
                                {member.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {member.affiliation}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {member.roles.map((role) => (
                              <span
                                key={`role-${member.name}-${role}`}
                                className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border border-teal-300 bg-teal-50 text-teal-800"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-merriweather font-bold text-foreground">
                        Steering Group
                      </h3>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-foreground border border-border">
                        Advisory network
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Advises hosts, balances disciplines, and connects DH
                      centres, libraries, archives, and museums to keep the
                      programme inclusive across the region.
                    </p>
                    <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
                      <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground">
                        {sortedSteeringGroup.map((person) => (
                          <div
                            key={`steering-${person}`}
                            className="flex items-start gap-2"
                          >
                            <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                            <span className="leading-snug text-muted-foreground">
                              {person}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-merriweather font-bold text-foreground">
                        Partners
                      </h3>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                        Collaboration
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      {partners.map((partner) => (
                        <div
                          key={`partner-${partner.name}`}
                          className="rounded-xl border border-border bg-background p-4 flex flex-col gap-3 shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="font-semibold text-foreground">
                              {partner.name}
                            </h4>
                            {partner.link && (
                              <Button
                                asChild
                                size="sm"
                                variant="ghost"
                                className="h-8 px-2 text-primary"
                              >
                                <Link
                                  href={partner.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {partner.cta}
                                </Link>
                              </Button>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {partner.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section id="timeline" className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-2xl font-merriweather font-bold text-foreground">
                        Timeline highlights
                      </h2>
                    </div>
                  </div>
                  <Timeline entries={timelineEntries} showPapers={false} />
                </section>

                <section id="involved" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-2xl font-merriweather font-bold text-foreground">
                        How to get involved
                      </h2>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    {involvement.map((item) => (
                      <div
                        key={`involvement-${item.title}`}
                        className="rounded-xl border border-border bg-background p-4 flex flex-col gap-2 shadow-sm"
                      >
                        <h3 className="font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.copy}
                        </p>
                        {item.link && (
                          <Button
                            asChild
                            size="sm"
                            variant="secondary"
                            className="self-start"
                          >
                            <Link
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Join
                            </Link>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <TocNav items={tocItems} />
              </div>
            </div>
          </div>
        </section>

        <ConnectWithUs />
      </main>

      <Footer />
    </div>
  );
}
