'use client';

import { Typography, Row, Col } from 'antd';
import {
  BulbOutlined,
  BarChartOutlined,
  FileTextOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const benefits = [
  {
    icon: <BulbOutlined style={{ fontSize: '32px', color: '#1e3a5f' }} />,
    title: 'Разработка концепций',
    description: 'Разработка идей и концепций для новых строительных проектов.',
  },
  {
    icon: <BarChartOutlined style={{ fontSize: '32px', color: '#1e3a5f' }} />,
    title: 'Маркетинговое обоснование',
    description: 'Исследование рынка и технико-экономическое обоснование.',
  },
  {
    icon: <FileTextOutlined style={{ fontSize: '32px', color: '#1e3a5f' }} />,
    title: 'Проектная документация',
    description: 'Подготовка проектной документации и получение разрешений.',
  },
  {
    icon: <SafetyOutlined style={{ fontSize: '32px', color: '#1e3a5f' }} />,
    title: 'Контроль качества',
    description: 'Технический контроль и управление проектом до сдачи.',
  },
];

export default function About() {
  return (
    <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
        О компании
      </Title>
      <Paragraph style={{ fontSize: '16px', marginBottom: '48px', textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
        «ДК ГРУПП» — строительная компания, выступающая в роли генерального подрядчика и проектировщика на российском рынке. Мы предоставляем комплексные услуги на всех этапах строительного процесса.
      </Paragraph>
      <Row gutter={[24, 24]}>
        {benefits.map((benefit, idx) => (
          <Col xs={24} sm={12} md={6} key={idx}>
            <div style={{ textAlign: 'center' }}>
              {benefit.icon}
              <Title level={4} style={{ marginTop: '16px' }}>
                {benefit.title}
              </Title>
              <Paragraph style={{ fontSize: '14px', color: '#666' }}>
                {benefit.description}
              </Paragraph>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
}
