'use client';

import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import Link from 'next/link';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';

const { Title, Paragraph } = Typography;

interface NewsItem {
  id: number;
  date: string;
  title: string;
  description: string;
  images: string[];
  tag: string;
}

const tagColors: Record<string, string> = {
  'Проекты': '#c0392b',
  'Компания': '#23365E',
  'События': '#27ae60',
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.data)) {
          setNews(data.data);
        }
      })
      .catch(err => console.error('Failed to load news:', err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <main style={{ fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .news-card:hover .news-card-image img {
          transform: scale(1.03);
        }
        .news-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeInUp 0.3s ease;
        }
        .news-modal-content {
          background: #fff;
          border-radius: 16px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .news-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          z-index: 10;
        }
        @media (max-width: 768px) {
          .news-hero {
            padding: 32px 0 24px !important;
          }
          .news-hero-title {
            font-size: 22px !important;
          }
          .news-hero-subtitle {
            font-size: 14px !important;
          }
          .news-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 0 16px !important;
          }
          .news-card-image img {
            aspect-ratio: 16/10 !important;
          }
          .news-card-content {
            padding: 16px !important;
          }
          .news-card-title {
            font-size: 17px !important;
          }
          .news-card-text {
            font-size: 14px !important;
            display: -webkit-box;
            -webkit-line-clamp: 3 !important;
          }
          .news-card-footer {
            font-size: 12px !important;
          }
          .news-section {
            padding: 24px 0 !important;
          }
          .news-section-title {
            font-size: 22px !important;
          }
          .news-more-btn {
            padding: 14px 32px !important;
            font-size: 15px !important;
          }
          .news-empty {
            padding: 40px 16px !important;
          }
          .news-empty-text {
            font-size: 16px !important;
          }
          .news-modal-content {
            border-radius: 12px !important;
            margin: 10px;
          }
          .news-modal-gallery img {
            height: 250px !important;
          }
          .news-modal-body {
            padding: 20px 16px !important;
          }
          .news-modal-title {
            font-size: 20px !important;
          }
          .news-modal-text {
            font-size: 14px !important;
          }
        }
        @media (hover: none) and (pointer: coarse) {
          .news-card {
            transition: none !important;
          }
          .news-card:hover {
            transform: none !important;
            box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important;
          }
          .news-card-image img {
            transition: none !important;
          }
        }
      `}</style>

      {/* Хлебные крошки */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px 0' }}>
        <AppBreadcrumbs />
      </div>

      {/* Hero */}
      <section className="news-hero" style={{
        padding: '48px 0 40px',
        background: 'linear-gradient(135deg, #eef2f7 0%, #d9e2ec 100%)',
        borderBottom: '1px solid #e0e4e8',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={2} className="news-hero-title" style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 700,
            color: '#1a3a5c',
            marginBottom: '12px',
            marginTop: 0,
            lineHeight: '1.2',
          }}>
            Новостная лента
          </Title>
          <Paragraph className="news-hero-subtitle" style={{
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: '#555',
            lineHeight: '1.6',
            maxWidth: '700px',
            marginBottom: 0,
          }}>
            Следите за последними событиями, завершёнными проектами и новостями компании «ДК ГРУПП»
          </Paragraph>
        </div>
      </section>

      {/* Сетка новостей */}
      <section className="news-section" style={{ padding: '40px 0', background: '#f4f7fa' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Paragraph style={{ fontSize: '16px', color: '#999' }}>Загрузка новостей...</Paragraph>
            </div>
          ) : news.length === 0 ? (
            <div className="news-empty" style={{ textAlign: 'center', padding: '60px 0' }}>
              <Paragraph className="news-empty-text" style={{ fontSize: '18px', color: '#999' }}>
                Новости пока не добавлены
              </Paragraph>
            </div>
          ) : (
            <div className="news-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px',
            }}>
              {news.map((item) => (
                <div
                  key={item.id}
                  className="news-card"
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedNews(item)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Изображения */}
                  <div className="news-card-image" style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    background: '#d0d9e3',
                  }}>
                    {item.images.length === 1 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s',
                        }}
                      />
                    ) : item.images.length === 2 ? (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        height: '100%',
                      }}>
                        {item.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ))}
                      </div>
                    ) : item.images.length >= 3 ? (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gridTemplateRows: '1fr 1fr',
                        height: '100%',
                      }}>
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          style={{
                            gridRow: '1 / 3',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <img
                          src={item.images[1]}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <img
                          src={item.images[2]}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                        fontSize: '14px',
                      }}>
                        Нет фото
                      </div>
                    )}
                  </div>

                  {/* Контент */}
                  <div className="news-card-content" style={{ padding: '20px' }}>
                    {/* Тег */}
                    {item.tag && (
                      <span style={{
                        display: 'inline-block',
                        background: tagColors[item.tag] || '#23365E',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        padding: '3px 10px',
                        borderRadius: '50px',
                        marginBottom: '10px',
                      }}>
                        {item.tag}
                      </span>
                    )}
                    <h3 className="news-card-title" style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#1a3a5c',
                      marginBottom: '8px',
                      marginTop: 0,
                      lineHeight: '1.3',
                    }}>
                      {item.title}
                    </h3>
                    <p className="news-card-text" style={{
                      fontSize: '14px',
                      color: '#555',
                      lineHeight: '1.5',
                      margin: '0 0 14px 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {item.description}
                    </p>
                    <div className="news-card-footer" style={{
                      fontSize: '13px',
                      color: '#999',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#999" strokeWidth="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="#999" strokeWidth="2"/>
                      </svg>
                      {formatDate(item.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Модальное окно новости */}
      {selectedNews && (
        <div className="news-modal-overlay" onClick={() => setSelectedNews(null)}>
          <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="news-modal-close" onClick={() => setSelectedNews(null)}>
              ✕
            </button>

            {/* Галерея */}
            {selectedNews.images.length > 0 && (
              <div className="news-modal-gallery" style={{
                display: selectedNews.images.length === 1
                  ? 'block'
                  : selectedNews.images.length === 2
                    ? 'grid'
                    : 'grid',
                gridTemplateColumns: selectedNews.images.length === 2
                  ? '1fr 1fr'
                  : '1fr 1fr',
                gridTemplateRows: selectedNews.images.length === 3
                  ? '1fr 1fr'
                  : 'auto',
                gap: '2px',
                maxHeight: '350px',
                overflow: 'hidden',
              }}>
                {selectedNews.images.length === 1 ? (
                  <img
                    src={selectedNews.images[0]}
                    alt={selectedNews.title}
                    style={{
                      width: '100%',
                      height: '350px',
                      objectFit: 'cover',
                    }}
                  />
                ) : selectedNews.images.length === 2 ? (
                  selectedNews.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={selectedNews.title}
                      style={{
                        width: '100%',
                        height: '175px',
                        objectFit: 'cover',
                      }}
                    />
                  ))
                ) : (
                  <>
                    <img
                      src={selectedNews.images[0]}
                      alt={selectedNews.title}
                      style={{
                        gridRow: '1 / 3',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <img
                      src={selectedNews.images[1]}
                      alt={selectedNews.title}
                      style={{
                        width: '100%',
                        height: '175px',
                        objectFit: 'cover',
                      }}
                    />
                    <img
                      src={selectedNews.images[2]}
                      alt={selectedNews.title}
                      style={{
                        width: '100%',
                        height: '175px',
                        objectFit: 'cover',
                      }}
                    />
                  </>
                )}
              </div>
            )}

            {/* Тело */}
            <div className="news-modal-body" style={{ padding: '24px' }}>
              {selectedNews.tag && (
                <span style={{
                  display: 'inline-block',
                  background: tagColors[selectedNews.tag] || '#23365E',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  marginBottom: '12px',
                }}>
                  {selectedNews.tag}
                </span>
              )}
              <h2 className="news-modal-title" style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#1a3a5c',
                marginBottom: '8px',
                marginTop: 0,
                lineHeight: '1.3',
              }}>
                {selectedNews.title}
              </h2>
              <div style={{
                fontSize: '13px',
                color: '#999',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#999" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="#999" strokeWidth="2"/>
                </svg>
                {formatDate(selectedNews.date)}
              </div>
              <Paragraph style={{
                fontSize: '15px',
                color: '#444',
                lineHeight: '1.7',
                marginBottom: 0,
              }}>
                {selectedNews.description}
              </Paragraph>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
