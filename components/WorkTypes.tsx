'use client';

import { Card, Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const workTypes = [
  {
    image: '/figma/249:437.png',
    title: 'Цельностеклянные перегородки',
    description: 'Элегантные перегородки для офисов и коммерческих помещений.',
  },
  {
    image: '/figma/251:99.png',
    title: 'Стеклянные лестничные ограждения',
    description: 'Безопасные и прозрачные конструкции для лестниц.',
  },
  {
    image: '/figma/255:45.png',
    title: 'Остекление лифтовых шахт',
    description: 'Комплексное светопрозрачное остекление шахт и холлов.',
  },
  {
    image: '/figma/261:11.png',
    title: 'Противопожарные окна и витражи',
    description: 'Надёжные противопожарные системы для фасадов и внутренних зон.',
  },
];

export default function WorkTypes() {
  return (
    <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
        Типы работ
      </Title>
      <Row gutter={[24, 24]}>
        {workTypes.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <Card
              hoverable
              cover={
                <div
                  style={{
                    height: '200px',
                    background: `url('${item.image}') center/cover`,
                  }}
                />
              }
              style={{ borderRadius: '12px', overflow: 'hidden' }}
            >
              <Title level={4} style={{ marginBottom: '12px' }}>
                {item.title}
              </Title>
              <Paragraph style={{ color: '#666' }}>{item.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
