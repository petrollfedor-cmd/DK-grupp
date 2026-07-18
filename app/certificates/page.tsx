'use client';

import { useState, useEffect } from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface Certificate {
  filename: string;
  name: string;
  category: 'windows' | 'facade' | 'doors' | 'other';
}

const categoryNames: Record<string, { title: string; icon: string }> = {
  sro: { title: '🏗 Допуски СРО', icon: '🏗' },
  iso: { title: '📋 Системы менеджмента ISO', icon: '📋' },
  fire: { title: '🔥 Пожарная безопасность', icon: '🔥' },
  windows: { title: '🪟 Окна', icon: '🪟' },
  facade: { title: '🏢 Витражи и фасады', icon: '🏢' },
  doors: { title: '🚪 Двери', icon: '🚪' },
  other: { title: '📄 Прочие сертификаты', icon: '📄' },
};

export default function CertificatesPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/petrollfedor-cmd/DK-grupp/main/data/certificates.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCertificates(data);
        }
      })
      .catch(err => console.error('Failed to load certificates:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = (filename: string) => {
    window.open(`/documents/certificates/${filename}`, '_blank');
  };

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  // Группируем сертификаты по категориям в правильном порядке
  const groupedCertificates = certificates.reduce((acc, cert) => {
    if (!acc[cert.category]) {
      acc[cert.category] = [];
    }
    acc[cert.category].push(cert);
    return acc;
  }, {} as Record<string, Certificate[]>);

  // Порядок категорий как в боте
  const categoryOrder = ['sro', 'iso', 'fire', 'windows', 'facade', 'doors', 'other'];

  if (loading) {
    return (
      <div style={{ padding: '40px 142px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <Title level={2} style={{ fontFamily: 'Lato, sans-serif', fontSize: '32px', fontWeight: 600, color: '#23365E' }}>
          Загрузка...
        </Title>
      </div>
    );
  }

  return (
    <div className="cert-main" style={{ padding: '40px 142px', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`
        @media (max-width: 768px) {
          .cert-main {
            padding: 24px 16px !important;
          }
          .cert-title {
            font-size: 24px !important;
          }
          .cert-item {
            padding: 12px !important;
          }
          .cert-item-name {
            font-size: 14px !important;
          }
        }
      `}</style>

      {/* Заголовок */}
      <Title level={2} className="cert-title" style={{ fontFamily: 'Lato, sans-serif', fontSize: '32px', fontWeight: 600, color: '#23365E', marginBottom: '16px', textAlign: 'center' }}>
        Сертификаты и документы
      </Title>
      <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#666', textAlign: 'center', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
        Наша компания имеет все необходимые сертификаты и допуски для выполнения строительных работ любой сложности
      </Paragraph>

      {/* Категории сертификатов */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categoryOrder.map((catId) => {
          const catInfo = categoryNames[catId];
          const certs = groupedCertificates[catId] || [];
          const isOpen = openCategory === catId;
          return (
            <div
              key={catId}
              style={{
                borderColor: '#23365E',
                borderRadius: '8px',
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}
            >
              <div
                onClick={() => toggleCategory(catId)}
                style={{
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: isOpen ? '#f5f7fb' : '#fff',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => {
                  if (!isOpen) e.currentTarget.style.backgroundColor = '#f5f7fb';
                }}
                onMouseOut={(e) => {
                  if (!isOpen) e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E' }}>
                  {catInfo.title}
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#999', marginLeft: '8px' }}>
                    ({certs.length})
                  </span>
                </span>
                <span style={{
                  fontSize: '20px',
                  color: '#23365E',
                  transition: 'transform 0.2s',
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  fontWeight: 'bold',
                }}>›</span>
              </div>
              <div style={{
                maxHeight: isOpen ? '1000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 20px 16px' }}>
                  {certs.map((cert, idx) => (
                    <div
                      key={idx}
                      className="cert-item"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        backgroundColor: '#f5f7fb',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onClick={() => handleDownload(cert.filename)}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#e8edf5';
                        e.currentTarget.style.borderColor = '#23365E';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(35, 54, 94, 0.15)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f5f7fb';
                        e.currentTarget.style.borderColor = '#e0e0e0';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#23365E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 15L12 12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="cert-item-name" style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#23365E', fontWeight: 500 }}>
                          {cert.name}
                        </span>
                      </div>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(35, 54, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke="#23365E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 10L12 15L17 10" stroke="#23365E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 15V3" stroke="#23365E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Футер секция */}
      <div style={{ marginTop: '48px', textAlign: 'center', padding: '32px', backgroundColor: '#f5f7fb', borderRadius: '8px' }}>
        <Title level={5} style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', fontWeight: 600, color: '#23365E', marginBottom: '12px' }}>
          Не нашли нужный документ?
        </Title>
        <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#666', marginBottom: '20px' }}>
          Свяжитесь с нами, и мы предоставим необходимые сертификаты
        </Paragraph>
        <a
          href="mailto:info@dkfasad.ru"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            fontFamily: 'Lato, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#fff',
            backgroundColor: '#23365E',
            borderRadius: '6px',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1a2a4a')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#23365E')}
        >
          Написать нам
        </a>
      </div>
    </div>
  );
}
