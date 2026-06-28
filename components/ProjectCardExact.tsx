'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProjectCardExactProps {
  image: string;
  icon?: string;
  title: string;
  description?: React.ReactNode;
  maxHeight?: number;
}

export default function ProjectCardExact({
  image,
  icon,
  title,
  description,
  maxHeight = 280,
}: ProjectCardExactProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="project-card-wrapper">
      <div
        onClick={isMobile ? (e) => {
          if ((e.target as HTMLElement).closest('.project-card-arrow-btn')) return;
          setIsOpen(!isOpen);
        } : undefined}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '790 / 450',
          minHeight: '200px',
          maxHeight: `${maxHeight}px`,
          overflow: 'hidden',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
        onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
        onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />

        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '0',
            right: '0',
            width: '100%',
            minHeight: 'clamp(70px, 12vw, 110px)',
            background: isHovered
              ? 'linear-gradient(135deg, rgba(62, 77, 109, 0.85) 0%, rgba(35, 54, 94, 0.9) 50%, rgba(3, 17, 48, 0.95) 100%)'
              : 'linear-gradient(135deg, rgba(62, 77, 109, 0.3) 0%, rgba(35, 54, 94, 0.35) 50%, rgba(3, 17, 48, 0.4) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 'clamp(12px, 2vw, 20px) clamp(20px, 3vw, 28px)',
            boxSizing: 'border-box',
            backdropFilter: 'blur(4px)',
            transition: 'max-height 0.3s ease',
            maxHeight: isHovered ? 'none' : 'clamp(70px, 12vw, 110px)',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: '100%',
              letterSpacing: '0%',
              textShadow: '0 4px 4px rgba(0, 0, 0, 0.5)',
              width: '100%',
              textAlign: 'left',
            }}
          >
            {title}
          </h3>

          {!isMobile && description && (
            <div
              style={{
                marginTop: '12px',
                fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 'clamp(13px, 1.8vw, 15px)',
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: 1.5,
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.3s ease',
                maxHeight: '300px',
                overflow: 'auto',
                width: '100%',
                textAlign: 'left',
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>

      {isOpen && description && (
        <div
          className="project-card-below"
          style={{
            display: 'block',
            padding: '16px',
            paddingTop: '40px',
            background: 'linear-gradient(135deg, rgba(62, 77, 109, 0.85) 0%, rgba(35, 54, 94, 0.9) 50%, rgba(3, 17, 48, 0.95) 100%)',
            borderRadius: '8px',
            marginTop: '4px',
            position: 'relative',
            maxHeight: '60vh',
            overflowY: 'auto',
          }}
        >
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3
            style={{
              margin: '0 0 12px 0',
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: '1.2',
            }}
          >
            {title}
          </h3>
          <div
            style={{
              fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.6,
            }}
          >
            {description}
          </div>
        </div>
      )}
    </div>
  );
}
