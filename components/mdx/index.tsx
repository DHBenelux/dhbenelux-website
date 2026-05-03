import { ReactNode } from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const icons = {
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <div
      className={`border-l-4 p-6 mb-8 rounded-r-lg shadow-sm ${styles[type]}`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex-1">
          {title && <div className="font-semibold mb-2 text-lg">{title}</div>}
          <div className="prose prose-sm max-w-none">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface QuoteProps {
  author?: string;
  source?: string;
  children: ReactNode;
}

export function Quote({ author, source, children }: QuoteProps) {
  return (
    <blockquote className="border-l-4 border-primary pl-8 py-6 my-8 bg-accent rounded-r-lg shadow-sm">
      <div className="relative">
        <svg
          className="absolute -top-2 -left-2 w-8 h-8 text-primary/30"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <div className="text-lg text-muted-foreground mb-4 italic font-medium leading-relaxed pl-6">
          {children}
        </div>
        {(author || source) && (
          <cite className="text-sm text-muted-foreground not-italic font-medium pl-6">
            {author && (
              <span className="font-semibold text-primary">{author}</span>
            )}
            {source && (
              <span className="text-muted-foreground">
                {author ? ', ' : ''}
                {source}
              </span>
            )}
          </cite>
        )}
      </div>
    </blockquote>
  );
}

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
}: ButtonProps) {
  const baseClasses =
    'btn no-underline inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  };

  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  const className = `${baseClasses} ${variants[variant]} ${sizes[size]}`.trim();

  return (
    <a href={href} className={className}>
      {children}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </a>
  );
}

interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function Image({
  src,
  alt,
  caption,
  width,
  height,
  className = '',
}: ImageProps) {
  return (
    <figure className="my-8 animate-fade-in">
      <div className="overflow-hidden rounded-xl shadow-medium">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-auto transition-transform duration-300 hover:scale-105 ${className}`}
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-sm text-gray-600 text-center italic bg-gray-50 py-2 px-4 rounded-lg">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface VideoProps {
  src: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function Video({ src, title, caption, width, height }: VideoProps) {
  return (
    <figure className="my-8 animate-fade-in">
      <div className="overflow-hidden rounded-xl shadow-medium">
        <video
          src={src}
          title={title}
          width={width}
          height={height}
          controls
          className="w-full h-auto"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      {caption && (
        <figcaption className="mt-4 text-sm text-gray-600 text-center italic bg-gray-50 py-2 px-4 rounded-lg">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  title?: string;
}

export function CodeBlock({ children, language, title }: CodeBlockProps) {
  return (
    <div className="my-8">
      {title && (
        <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-gray-700">
          {title}
          {language && <span className="text-gray-400 ml-2">({language})</span>}
        </div>
      )}
      <pre
        className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto ${
          title ? 'rounded-b-lg' : 'rounded-lg'
        }`}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

interface TableProps {
  children: ReactNode;
  caption?: string;
}

export function Table({ children, caption }: TableProps) {
  return (
    <div className="my-8 overflow-hidden rounded-lg shadow-medium">
      {caption && (
        <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
          {caption}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">{children}</table>
      </div>
    </div>
  );
}

export const mdxComponents = {
  Callout,
  Quote,
  Button,
  Image,
  Video,
  CodeBlock,
  Table,
};
