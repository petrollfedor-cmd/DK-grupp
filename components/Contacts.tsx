'use client';

import { Typography, Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function Contacts() {
  return (
    <section style={{ padding: '60px 24px', background: '#f5f7fb', maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={12}>
          <Title level={2}>Контакты</Title>
          <Paragraph>
            Обсудите ваш проект с менеджером и получите расчёт стоимости работ.
          </Paragraph>
          <div style={{ marginTop: '32px' }}>
            <div style={{ marginBottom: '16px' }}>
              <PhoneOutlined style={{ marginRight: '8px', color: '#ff5722' }} />
              <Text>+7 (911) 999-49-95</Text>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <MailOutlined style={{ marginRight: '8px', color: '#ff5722' }} />
              <a href="mailto:info@dkfasad.ru" style={{ color: 'inherit', textDecoration: 'none' }}>info@dkfasad.ru</a>
            </div>
            <div>
              <EnvironmentOutlined style={{ marginRight: '8px', color: '#ff5722' }} />
              <Text>443080, Россия, обл. Самарская, г. Самара, пр. Карла Маркса, д.192, оф.713</Text>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div
            style={{
              width: '100%',
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?mode=search&text=Самара%20проспект%20Карла%20Маркса%20192&z=17"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="Яндекс.Карта - Офис компании"
              style={{ border: 0 }}
            />
          </div>
        </Col>
      </Row>
    </section>
  );
}
