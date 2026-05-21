import { getNewsposts } from '@/lib/content';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export async function generateStaticParams() {
  const posts = await getNewsposts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface OpenGraphImageProps {
  params: Promise<{ slug: string }>;
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const posts = await getNewsposts();
  const post = posts.find((item) => item.slug === slug);

  const title = post?.title ?? 'DH BeNeLux News';
  const category = post?.category ?? 'News';
  const dateLabel = post?.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Latest update';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px',
        background:
          'linear-gradient(150deg, #042f2e 0%, #0f766e 48%, #2dd4bf 100%)',
        color: '#ecfeff',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            background: 'rgba(255, 255, 255, 0.14)',
            padding: '10px 18px',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {category}
        </div>
        <div style={{ fontSize: 22, color: 'rgba(236, 254, 255, 0.88)' }}>
          {dateLabel}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          maxWidth: '95%',
        }}
      >
        <div
          style={{
            fontSize: 66,
            lineHeight: 1.08,
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.2,
            color: 'rgba(236, 254, 255, 0.9)',
          }}
        >
          Digital Humanities BeNeLux
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
