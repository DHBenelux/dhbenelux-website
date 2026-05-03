'use client';

import { Compass, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  label: string;
}

function tocLinkClasses(activeId: string, id: string) {
  return `inline-flex items-center gap-2 transition-colors ${
    activeId === id
      ? 'text-primary font-semibold'
      : 'text-muted-foreground hover:text-primary'
  }`;
}

function TocNavList({
  items,
  activeId,
  compact,
  onSelect,
}: {
  items: TocItem[];
  activeId: string;
  compact?: boolean;
  onSelect?: (id: string) => void;
}) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={`toc-${item.id}`}>
          <a
            href={`#${item.id}`}
            className={tocLinkClasses(activeId, item.id)}
            onClick={() => onSelect?.(item.id)}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeId === item.id ? 'bg-primary' : 'bg-border'
              }`}
              aria-hidden
            />
            <span className={compact ? 'truncate' : ''}>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TocNav({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;

    const itemIds = new Set(items.map((i) => i.id));
    const syncFromHash = () => {
      const raw = window.location.hash;
      const hashId = raw.startsWith('#') ? raw.slice(1) : raw;

      setActiveId((prev) => {
        if (hashId && itemIds.has(hashId)) return hashId;
        if (itemIds.has(prev)) return prev;
        return items[0]?.id ?? '';
      });
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [items]);

  if (!items.length) return null;

  return (
    <>
      <nav className="sticky top-24 bg-card border border-border rounded-xl p-4 shadow-sm hidden lg:block">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          On this page
        </h3>
        <TocNavList
          items={items}
          activeId={activeId}
          onSelect={(id) => {
            setActiveId(id);
            setOpen(false);
          }}
        />
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle on-page navigation"
        className="fixed bottom-6 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg transition hover:translate-y-[-1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="h-5 w-5" /> : <Compass className="h-5 w-5" />}
        <span className="sr-only">On this page</span>
      </button>

      {open && (
        <div className="fixed bottom-24 left-4 right-4 z-40 max-w-md mx-auto lg:hidden">
          <div className="rounded-xl border border-border bg-white shadow-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                On this page
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <TocNavList
              items={items}
              activeId={activeId}
              compact
              onSelect={(id) => {
                setActiveId(id);
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
