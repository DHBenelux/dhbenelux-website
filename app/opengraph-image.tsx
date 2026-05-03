import { ImageResponse } from 'next/og';

export const alt = 'Digital Humanities BeNeLux';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
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
          'linear-gradient(135deg, #134e4a 0%, #0f766e 45%, #14b8a6 100%)',
        color: '#f8fafc',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          alignItems: 'center',
          border: '2px solid rgba(255, 255, 255, 0.75)',
          borderRadius: '9999px',
          padding: '10px 20px',
          fontSize: 24,
          letterSpacing: 0.8,
        }}
      >
        DH BeNeLux
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            fontSize: 78,
            lineHeight: 1.05,
            fontWeight: 700,
            maxWidth: '90%',
          }}
        >
          Digital Humanities BeNeLux
        </div>
        <div
          style={{
            fontSize: 34,
            lineHeight: 1.2,
            color: 'rgba(248, 250, 252, 0.9)',
          }}
        >
          Conferences, journal, and community updates across Belgium, the
          Netherlands, and Luxembourg.
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
