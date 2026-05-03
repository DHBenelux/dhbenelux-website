import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-merriweather font-bold text-stone-800 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-merriweather font-semibold text-stone-700 mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-merriweather font-semibold text-stone-600 mb-3 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-stone-600 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-stone-600">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 text-stone-600">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1">{children}</li>,
    a: ({ href, children }) => {
      const isExternal = typeof href === 'string' && href.startsWith('http');
      return (
        <a
          href={href}
          className="text-teal-600 hover:text-teal-700 underline"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-teal-200 pl-4 italic text-stone-500 my-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-stone-100 px-2 py-1 rounded text-sm font-mono text-stone-700">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-stone-100 p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    ...components,
  };
}
