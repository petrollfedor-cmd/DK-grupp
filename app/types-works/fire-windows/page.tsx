'use client';

import { Typography } from 'antd';
import NextImage from 'next/image';

const { Title, Paragraph } = Typography;

export default function FireWindowsPage() {
  return (
    <main style={{ padding: '40px 142px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Хлебные крошки */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a
          href="/"
          style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            color: '#23365E',
            textDecoration: 'none',
          }}
        >
          Главная
        </a>
        <span style={{ color: '#23365E', opacity: 0.5 }}>/</span>
        <a
          href="/types-works"
          style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            color: '#23365E',
            textDecoration: 'none',
          }}
        >
          Типы работ
        </a>
        <span style={{ color: '#23365E', opacity: 0.5 }}>/</span>
        <span style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          color: '#23365E',
          opacity: 0.6,
        }}>
          Противопожарные окна и витражи
        </span>
      </div>

      {/* Заголовок */}
      <h2 style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '28px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '16px',
      }}>
        Противопожарные окна и витражи
      </h2>

      {/* Описание */}
      <div style={{ display: 'flex', gap: '32px', marginBottom: '40px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <Paragraph style={{
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#444',
            marginBottom: 0,
          }}>
            Противопожарные окна и витражи — это элементы архитектурного остекления, обеспечивающие надежную защиту
            от распространения огня и дыма. Эти конструкции сочетают высокую огнестойкость и эстетичный внешний вид, что
            позволяет использовать их в зданиях с повышенными требованиями к безопасности и дизайну. Противопожарные
            окна и витражи могут быть выполнены как в «глухом» варианте, так и с элементами открывания, что обеспечивает
            дополнительную функциональность и удобство эксплуатации.
          </Paragraph>
        </div>
        <div style={{
          width: '380px',
          height: '260px',
          borderRadius: '8px',
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}>
          <img
            src="/figma/12:77.png"
            alt="Противопожарные окна и витражи"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            loading="lazy"
          />
        </div>
      </div>

      {/* EI9 90 */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '16px',
      }}>
        Светопрозрачные перегородки, ограждения, фасады, зенитные фонари с пределом огнестойкости до EI9 90
      </Title>
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '32px',
      }}>
        Это универсальные элементы строительных конструкций, которые обеспечивают не только огнестойкость до EI9 90,
        но и эстетическое оформление помещений. Такие конструкции используются для создания безопасных и светлых пространств
        в коммерческих и общественных зданиях. Они выполняются из высокопрочного закаленного стекла или триплекса, что
        гарантирует надежную защиту и долговечность. Светопрозрачные перегородки и ограждения эффективно зонизируют
        пространство, а фасады и зенитные фонари добавляют архитектурную выразительность и функциональность.
      </Paragraph>

      {/* Противопожарные двери */}
      <Title level={3} style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        color: '#23365E',
        marginBottom: '16px',
      }}>
        Противопожарные остекленные двери
      </Title>
      <Paragraph style={{
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#444',
        marginBottom: '32px',
      }}>
        Противопожарные остекленные двери — это современные защитные конструкции, которые обеспечивают огнестойкость
        и безопасность в различных зданиях. Эти двери сочетают в себе прочность и прозрачность, что позволяет сохранять
        видимость и светопроницание, обеспечивая при этом надежную защиту от огня. Противопожарные остекленные двери
        изготавливаются из закаленного стекла и огнестойких материалов, что делает их идеальными для использования в
        офисных зданиях, торговых центрах, образовательных учреждениях и других объектах, где важны безопасность и эстетика.
      </Paragraph>
    </main>
  );
}
