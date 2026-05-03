import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Button, Callout, CodeBlock, Image, Quote, Table, Video } from './mdx';

interface MDXContentProps {
  content: string;
}

const components = {
  Callout,
  Quote,
  Button,
  Image,
  Video,
  CodeBlock,
  Table,
};

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-stone dark:prose-invert prose-headings:font-merriweather prose-a:text-primary hover:prose-a:text-primary/80">
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
