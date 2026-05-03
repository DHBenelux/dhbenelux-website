import { Button } from '@/components/Button';
import { BookOpen, Mail, Rss } from 'lucide-react';
import Link from 'next/link';

export function ConnectWithUs() {
  return (
    <section
      id="connect-with-us"
      className="bg-teal-700 text-white py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-merriweather font-bold mb-8">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div key="general-inquiries" className="flex flex-col items-center">
            <Mail className="w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2">General Enquiries</h3>
            <p className="mb-2 grow">Questions about DH BeNeLux:</p>
            <a
              href="mailto:info@dhbenelux.org"
              className="font-medium hover:text-white underline mt-auto"
            >
              info@dhbenelux.org
            </a>
          </div>
          <div key="stay-updated" className="flex flex-col items-center">
            <Rss className="w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Updates</h3>
            <p className="mb-2 grow">Subscribe to our mailing list:</p>
            <Button asChild variant="primaryOnDark" className="mt-auto">
              <Link
                href="https://groups.google.com/forum/#!forum/dh-benelux-mailinglist"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Mailing List
              </Link>
            </Button>
          </div>
          <div key="follow-us" className="flex flex-col items-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 mb-3"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Social Media</h3>
            <p className="mb-2 grow">Follow us on Twitter:</p>
            <Button asChild variant="primaryOnDark" className="mt-auto">
              <Link
                href="https://twitter.com/dhbenelux"
                target="_blank"
                rel="noopener noreferrer"
              >
                @dhbenelux
              </Link>
            </Button>
          </div>
          <div key="contribute-journal" className="flex flex-col items-center">
            <BookOpen className="w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Journal Submissions</h3>
            <p className="mb-2 grow">Submit your research:</p>
            <Button asChild variant="primaryOnDark" className="mt-auto">
              <Link
                href="https://journal.dhbenelux.org/submission/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submission Guidelines
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
