'use client';

import AppBreadcrumbs from '@/components/AppBreadcrumbs';

export default function FireWindowsPage() {
  return (
    <main style={{ fontFamily: "'Lato', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .rubez-container { padding: 20px 16px !important; }
          .rubez-services-grid { grid-template-columns: 1fr !important; }
          .rubez-stats { flex-direction: column !important; gap: 20px !important; }
          .rubez-cta-content { flex-direction: column !important; gap: 32px !important; }
          .rubez-cta-text { max-width: 100% !important; }
          .rubez-cta-button { width: 100% !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .rubez-services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <AppBreadcrumbs />

      {/* Блок 1: Шапка — партнёрский статус */}
      <div style={{
        background: '#f5f7fa',
        padding: '40px 142px',
      }}>
        <div className="rubez-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#0b2b4a' }}>
                Партнёр
              </span>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#e31e24' }}>
                РУБЕЖ
              </span>
            </div>
            <div style={{
              background: '#e31e24',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600,
            }}>
              Официальный дилер
            </div>
          </div>
          <div style={{
            background: '#e8ecf1',
            padding: '10px 20px',
            borderRadius: '8px',
            display: 'inline-block',
          }}>
            <span style={{ fontSize: '15px', color: '#555', fontWeight: 500 }}>
              Прямой дилер · Прямые цены
            </span>
          </div>
        </div>
      </div>

      {/* Блок 2: О партнёре */}
      <div style={{
        padding: '60px 142px',
        background: '#fff',
      }}>
        <div className="rubez-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            gap: '60px',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#0b2b4a',
                margin: '0 0 8px 0',
              }}>
                ГК «Рубеж»
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#e31e24',
                margin: '0 0 20px 0',
                fontWeight: 500,
              }}>
                Проектирование и монтаж систем пожарной безопасности
              </p>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#444',
                margin: 0,
              }}>
                Мы являемся прямым дилером ГК «Рубеж» — одного из ведущих разработчиков и производителей
                решений в области пожарной автоматики. На нашем сайте вы можете заказать полный спектр услуг:
                от проектирования до сервисного обслуживания. Все работы выполняются с использованием оригинального
                оборудования и по прозрачной цене.
              </p>
            </div>
            <div className="rubez-stats" style={{
              display: 'flex',
              gap: '40px',
              flexShrink: 0,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#e31e24',
                  lineHeight: '1',
                }}>
                  28
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  marginTop: '8px',
                  fontWeight: 500,
                }}>
                  лет на рынке
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#e31e24',
                  lineHeight: '1',
                }}>
                  500+
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  marginTop: '8px',
                  fontWeight: 500,
                }}>
                  реализованных проектов
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Блок 3: Услуги */}
      <div style={{
        padding: '60px 142px',
        background: '#f5f7fa',
      }}>
        <div className="rubez-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#0b2b4a',
            margin: '0 0 12px 0',
            textAlign: 'center',
          }}>
            Услуги ГК «Рубеж»
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            margin: '0 0 40px 0',
            textAlign: 'center',
          }}>
            Комплексные решения «под ключ» для вашей безопасности
          </p>

          <div className="rubez-services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {/* Карточка 1 */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '28px',
              border: '1px solid #e0e0e0',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>📐</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#0b2b4a',
                margin: '0 0 12px 0',
              }}>
                3D-визуализация
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#555',
                margin: '0 0 16px 0',
              }}>
                Разрабатываем трехмерные модели при заказе изделий нашего производства и для
                стороннего исполнения. Новинка 2022 года.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#999',
                  fontWeight: 500,
                }}>
                  С 2022
                </span>
                <a href="#" style={{
                  fontSize: '14px',
                  color: '#e31e24',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}>
                  Подробнее →
                </a>
              </div>
            </div>

            {/* Карточка 2 */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '28px',
              border: '1px solid #e0e0e0',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>🌀</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#0b2b4a',
                margin: '0 0 12px 0',
              }}>
                Вентиляция и дымоудаление
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#555',
                margin: '0 0 16px 0',
              }}>
                Более 20 крупных проектов в СПб, Ленинградской области и Казани. Системы для
                любых типов объектов.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#999',
                  fontWeight: 500,
                }}>
                  10+ лет
                </span>
                <a href="#" style={{
                  fontSize: '14px',
                  color: '#e31e24',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}>
                  Подробнее →
                </a>
              </div>
            </div>

            {/* Карточка 3 */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '28px',
              border: '1px solid #e0e0e0',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>🧯</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#0b2b4a',
                margin: '0 0 12px 0',
              }}>
                Пожаротушение
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#555',
                margin: '0 0 16px 0',
              }}>
                Проектирование и монтаж систем с любым типом огнетушащего вещества. Полный
                комплекс работ, гарантия качества.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#999',
                  fontWeight: 500,
                }}>
                  С 2010
                </span>
                <a href="#" style={{
                  fontSize: '14px',
                  color: '#e31e24',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}>
                  Подробнее →
                </a>
              </div>
            </div>

            {/* Карточка 4 */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '28px',
              border: '1px solid #e0e0e0',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔔</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#0b2b4a',
                margin: '0 0 12px 0',
              }}>
                Пожарная сигнализация
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#555',
                margin: '0 0 16px 0',
              }}>
                Системы пожарной сигнализации и СОУЭ под ключ. Опыт работы с крупными
                строительными холдингами СЗФО.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#999',
                  fontWeight: 500,
                }}>
                  15+ лет
                </span>
                <a href="#" style={{
                  fontSize: '14px',
                  color: '#e31e24',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}>
                  Подробнее →
                </a>
              </div>
            </div>

            {/* Карточка 5 */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '28px',
              border: '1px solid #e0e0e0',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>🛡️</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#0b2b4a',
                margin: '0 0 12px 0',
              }}>
                Огнезащита
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#555',
                margin: '0 0 16px 0',
              }}>
                Более 500 заказов в Северо-Западном, Центральном и Южном федеральных округах.
                Работаем без посредников.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#999',
                  fontWeight: 500,
                }}>
                  500+ заказов
                </span>
                <a href="#" style={{
                  fontSize: '14px',
                  color: '#e31e24',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}>
                  Подробнее →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Блок 4: Преимущества и CTA */}
      <div style={{
        background: '#0b2b4a',
        padding: '60px 142px',
      }}>
        <div className="rubez-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="rubez-cta-content" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '60px',
            flexWrap: 'wrap',
          }}>
            <div className="rubez-cta-text" style={{
              flex: 1,
              minWidth: '300px',
            }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 24px 0',
              }}>
                Почему выбирают ГК «Рубеж»
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Собственное производство',
                  'Европейские стандарты',
                  'Разрешительная документация',
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#e31e24',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{
                      fontSize: '16px',
                      color: '#fff',
                      fontWeight: 500,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button className="rubez-cta-button" style={{
              background: '#e31e24',
              color: '#fff',
              border: 'none',
              padding: '18px 48px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#c41a20';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#e31e24';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </div>

      {/* Футер */}
      <div style={{
        padding: '20px 142px',
        background: '#f5f7fa',
        borderTop: '1px solid #e0e0e0',
      }}>
        <p style={{
          fontSize: '13px',
          color: '#999',
          margin: 0,
          textAlign: 'center',
        }}>
          Официальный дилер ГК «Рубеж» · Все услуги сопровождаются гарантией и полным пакетом документов.
        </p>
      </div>
    </main>
  );
}
