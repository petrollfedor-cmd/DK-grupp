'use client';

import { Typography, Row, Col, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const specializations = [
  'Фасадное остекление и облицовка',
  'Внутренние светопрозрачные конструкции',
  'Каменные и вентилируемые фасады',
  'Противопожарные двери и входные группы',
  'Стеклянные перегородки и ограждения',
  'Проектирование и расчёт фасадных систем',
];

const advantages = [
  {
    title: 'Работаем с лидерами рынка',
    text: 'Schüco, Alutech, Mastech — интегрируем лучшие профильные системы под задачу.',
  },
  {
    title: 'Цена в смете = цена в итоге',
    text: 'В 90% случаев итоговая стоимость не меняется. Без маркетинговых уловок.',
  },
  {
    title: 'Полный цикл под ключ',
    text: 'Проектирование → производство → монтаж → сервис. От Москвы до Камчатки.',
  },
  {
    title: 'Инженеры на всех этапах',
    text: 'Авторский надзор, техническая поддержка, расширенная гарантия на каждый элемент.',
  },
];

const stats = [
  { value: '90%', label: 'Сметы без изменений' },
  { value: 'полный цикл', label: 'от проекта до сдачи' },
  { value: 'вся Россия', label: 'география объектов' },
];

export default function AboutPage() {
  return (
    <main style={{ padding: '64px 120px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Вступление */}
      <Title level={2} style={{ fontSize: '32px', fontWeight: 600, marginBottom: '16px', color: '#1e3a5f' }}>
        ДК ГРУПП
      </Title>
      <Paragraph style={{ fontSize: '18px', lineHeight: '1.8', color: '#444', marginBottom: '40px' }}>
        Фасадные и светопрозрачные конструкции. 
        Проектируем, производим, монтируем. 
        Работаем с объектами любой сложности — от частных зданий до крупных коммерческих объектов.
      </Paragraph>

      <Divider style={{ borderColor: '#e0e0e0', marginBottom: '32px' }} />

      {/* Специализация */}
      <Row gutter={[64, 0]}>
        <Col span={10}>
          <Title level={3} style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#1e3a5f' }}>
            Направления работ
          </Title>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {specializations.map((spec, idx) => (
              <li
                key={idx}
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#444',
                  paddingLeft: '20px',
                  position: 'relative',
                  marginBottom: '10px',
                }}
              >
                <span style={{ position: 'absolute', left: 0, color: '#1e3a5f' }}>—</span>
                {spec}
              </li>
            ))}
          </ul>
        </Col>
        <Col span={14}>
          <Title level={3} style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#1e3a5f' }}>
            Почему с нами работают
          </Title>
          {advantages.map((adv, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <Title level={4} style={{ fontSize: '17px', fontWeight: 600, marginBottom: '6px', color: '#1e3a5f', marginTop: 0 }}>
                {adv.title}
              </Title>
              <Paragraph style={{ fontSize: '15px', lineHeight: '1.6', color: '#666', margin: 0 }}>
                {adv.text}
              </Paragraph>
            </div>
          ))}
        </Col>
      </Row>

      <Divider style={{ borderColor: '#e0e0e0', marginTop: '40px', marginBottom: '32px' }} />

      {/* Цифры */}
      <Row gutter={[48, 0]} style={{ marginBottom: '32px' }}>
        {stats.map((stat, idx) => (
          <Col key={idx} xs={24} md={8}>
            <div>
              <Text style={{ fontSize: '36px', fontWeight: 700, color: '#1e3a5f', display: 'block', marginBottom: '6px' }}>
                {stat.value}
              </Text>
              <Text style={{ fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {stat.label}
              </Text>
            </div>
          </Col>
        ))}
      </Row>

      {/* Миссия */}
      <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#444', fontStyle: 'italic', margin: 0 }}>
        Миссия «ДК ГРУПП» — быть надёжным партнёром в строительстве, превращая сложные задачи в успешные проекты.
        Мы реализуем не просто проекты — а доверие наших клиентов.
      </Paragraph>
    </main>
  );
}
