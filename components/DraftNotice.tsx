import { AlertCircle } from 'lucide-react';

export function DraftNotice() {
  return (
    <aside
      aria-label="Draft website notice"
      className="border-b border-teal-200 bg-teal-50 text-teal-950"
    >
      <div className="container mx-auto flex items-start gap-3 px-4 py-3 text-sm leading-6 sm:px-6 lg:px-8">
        <AlertCircle
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0 text-teal-700"
        />
        <p>
          <strong className="font-bold">Draft website:</strong> this site is
          under active construction and community review before public launch.
          Content may change as the DH BeNeLux community reviews it.
        </p>
      </div>
    </aside>
  );
}
