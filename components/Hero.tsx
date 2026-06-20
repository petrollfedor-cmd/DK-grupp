'use client';

import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface HeroProps {
  imageUrl?: string;
  title: string;
  description?: string;
}

export default function Hero({ imageUrl, title, description }: HeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        height: '550px',
        background: `url('${imageUrl || '/placeholder-hero.jpg'}') center/cover`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))' }} />
      
      <div
        className="hero-description-box"
        style={{
          position: 'absolute',
          top: '380px',
          left: '142px',
          width: '780px',
          height: '213px',
          padding: '32px',
          borderRadius: '5px',
          background: 'linear-gradient(97.13deg, rgba(218, 229, 239, 0.2) 47.02%, rgba(68, 89, 132, 0.2) 78.23%, rgba(18, 19, 33, 0.2) 98.57%)',
          border: '1px solid rgba(255, 255, 255, 0.39)',
          zIndex: 10,
        }}
      >
        <p
          style={{
            color: '#fff',
            margin: 0,
            fontFamily: 'Lato',
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '1.4',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
