'use client';

import Image from 'next/image';
import { useState } from 'react';

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

  return (
    <div
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Изображение проекта */}
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

      {/* Иконка в левом верхнем углу (круглая) */}
      {icon && (
        <div
          style={{
            position: 'absolute',
            top: 'clamp(12px, 2vw, 20px)',
            left: 'clamp(12px, 2vw, 20px)',
            width: 'clamp(32px, 5vw, 48px)',
            height: 'clamp(32px, 5vw, 48px)',
            borderRadius: '50%',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          <Image
            src={icon}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Тёмная плашка с названием - видима всегда */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          left: 'auto',
          width: 'clamp(280px, 40vw, 550px)',
          minHeight: 'clamp(70px, 12vw, 110px)',
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(62, 77, 109, 0.85) 0%, rgba(35, 54, 94, 0.9) 50%, rgba(3, 17, 48, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(62, 77, 109, 0.3) 0%, rgba(35, 54, 94, 0.35) 50%, rgba(3, 17, 48, 0.4) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(12px, 2vw, 20px) clamp(20px, 3vw, 28px)',
          boxSizing: 'border-box',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div style={{ width: '100%' }}>
          {/* Название проекта */}
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
            }}
          >
            {title}
          </h3>

          {/* Описание - появляется только при ховере */}
          {description && (
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
                maxHeight: isHovered ? '200px' : '0',
                overflow: 'hidden',
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
