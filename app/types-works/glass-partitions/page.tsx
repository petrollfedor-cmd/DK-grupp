'use client';

import { Typography, Row, Col, Card, Table, Tabs, Tag } from 'antd';
import { useState, useEffect } from 'react';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// Данные для карусели
const carouselImages = [
  '/figma/sibir-arena.png',
  '/figma/pink-facade.png',
];

// Данные для дизайнерских решений
const designSolutions = [
  { title: 'Зеркала бесконечности', desc: 'Входные порталы с эффектом глубины' },
  { title: 'Светящиеся панели', desc: 'Стеновые панели-лайтбоксы' },
  { title: 'Радиусные потолки', desc: 'С интеграцией LED-подсветки' },
  { title: 'Арт-объекты', desc: 'Металлические люстры и скульптуры' },
  { title: 'Фасады с сеткой', desc: 'Цветные решения в разных оттенках' },
  { title: 'Облицовка колонн', desc: 'Сотовыми панелями ALUDECORE' },
];

export default function GlassPartitionsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Данные для таблицы характеристик ALUDECORE
  const aludecoreColumns = [
    { title: 'Параметр', dataIndex: 'param', key: 'param', width: '40%' },
    { title: 'Значение', dataIndex: 'value', key: 'value' },
  ];

  const aludecoreData = [
    { key: '1', param: 'Размеры плоских панелей', value: 'до 12 000 × 2 000 мм' },
    { key: '2', param: 'Размеры криволинейных', value: 'до 9 000 × 2 000 мм' },
    { key: '3', param: 'Толщина', value: '20 мм и более' },
    { key: '4', param: 'Материал лица', value: 'алюминий, сталь, оцинковка, нержавейка' },
    { key: '5', param: 'Покрытие', value: 'PVDF-окраска (защита от выгорания и коррозии)' },
    { key: '6', param: 'Производственная мощность', value: 'до 25 000 м²/мес' },
  ];

  // Данные для таблицы производственных возможностей
  const productionColumns = [
    { title: 'Материал', dataIndex: 'material', key: 'material', width: '30%' },
    { title: 'Что можем', dataIndex: 'capability', key: 'capability' },
  ];

  const productionData = [
    { key: '1', material: 'Стекло', capability: 'Резка до 19 мм, триплекс любых форматов, УФ-печать, смарт-плёнки, закалка' },
    { key: '2', material: 'Металл', capability: 'Лазерная резка до 9000×2000 мм, 5-осевая фрезеровка 3D-деталей, гибка с точностью ±0,1 мм, сварка' },
    { key: '3', material: 'Панели', capability: 'Плоские до 12 м, радиусные до 9 м, колонны высотой до 9 м' },
    { key: '4', material: 'Покрытия', capability: 'PVDF, порошковая и жидкая окраска, любые цвета и текстуры' },
  ];

  // Данные для задач
  const tasks = [
    {
      icon: '🏢',
      title: 'Создать эффектный фасад, который выделит здание',
      materials: 'Триплекс с сеткой (яркие цвета) + архитектурная LED-подсветка',
      effect: 'Фасад становится арт-объектом, днём — графический рисунок, ночью — световая инсталляция. При этом изнутри сохраняется комфортное естественное освещение.',
    },
    {
      icon: '🔒',
      title: 'Зонировать пространство с возможностью мгновенной приватности',
      materials: 'Smart-стекло (перегородки или двери)',
      effect: 'Один клик — и прозрачный офис становится изолированным кабинетом для переговоров. Без штор, жалюзи и громоздких конструкций.',
    },
    {
      icon: '🏛',
      title: 'Облицевать криволинейные поверхности (колонны, арки, радиусные фасады)',
      materials: 'Алюминиевые сотовые панели ALUDECORE (гнутые и радиусные)',
      effect: 'Бесшовная облицовка колонн или фасадов любой сложности. Минимальный радиус гиба — от 260 мм, высота элементов — до 9 000 мм.',
    },
    {
      icon: '💡',
      title: 'Сделать лёгкий и долговечный потолок с регулируемым светом',
      materials: 'Сотовые панели ALUDECORE для подвесных потолков',
      effect: 'Панели настолько лёгкие, что их можно сдвигать вручную по рельсам, меняя освещённость зала. Идеально для музеев, галерей, выставочных пространств.',
    },
    {
      icon: '🎨',
      title: 'Интерьерные акценты и арт-объекты',
      materials: 'Декоративный триплекс с УФ-печатью или тканевым наполнением + скрытая подсветка',
      effect: '«Парящие» стены, светящиеся панно, зеркала бесконечности — индивидуальные элементы, которые создают уникальную атмосферу.',
    },
    {
      icon: '🪟',
      title: 'Крупные светопрозрачные конструкции (остекление, витрины, панорамные окна)',
      materials: 'Крупноформатные стеклопакеты (до 3 000 мм в диаметре и более) с использованием Sentryglas',
      effect: 'Максимальное остекление без частых стыков, высокая ударопрочность и безопасность.',
    },
  ];

  return (
    <main style={{ padding: isMobile ? '24px 16px' : '40px 142px', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`
        @media (max-width: 768px) {
          .gp-carousel {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .gp-carousel-photos {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .gp-carousel-photos > div {
            aspect-ratio: 4/3 !important;
          }
          .gp-card {
            margin-bottom: 16px !important;
          }
          .gp-table {
            font-size: 14px !important;
          }
          .gp-table th,
          .gp-table td {
            padding: 12px 8px !important;
          }
        }
      `}</style>

      <AppBreadcrumbs />

      {/* Введение */}
      <Title level={2} style={{ fontFamily: 'Lato, sans-serif', fontSize: isMobile ? '24px' : '28px', fontWeight: 600, color: '#23365E', marginBottom: '24px' }}>
        Продукция ведущих российских технопарков
      </Title>
      <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '48px' }}>
        Мы предлагаем продукцию ведущего российского технопарка «Современные решения» — комплексные материалы для фасадов, интерьеров и остекления. В нашем портфеле — технологии, прошедшие апробацию в крупнейших проектах страны. Ниже — ключевые группы продуктов, которые мы поставляем и помогаем внедрять.
      </Paragraph>

      {/* Блок 1: ALUDECORE */}
      <div style={{ marginBottom: '64px' }}>
        <Title level={3} style={{ fontFamily: 'Lato, sans-serif', fontSize: '24px', fontWeight: 600, color: '#23365E', marginBottom: '24px' }}>
          1. Алюминиевые сотовые панели ALUDECORE
        </Title>
        <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '24px' }}>
          Что это: Крупноформатные панели с сотовым сердечником из алюминия. Идеально ровная поверхность при минимальном весе (в 2–3 раза легче массивных плит).
        </Paragraph>

        {/* Фото */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', gap: '20px', maxWidth: '1000px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {carouselImages.slice(0, isMobile ? 1 : 2).map((img, idx) => (
              <div key={idx} style={{ flex: 1, minWidth: isMobile ? '100%' : '200px', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <img src={img} alt={`ALUDECORE ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Характеристики */}
        <Title level={4} style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E', marginBottom: '16px' }}>
          Характеристики:
        </Title>
        <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
          <Table
            columns={aludecoreColumns}
            dataSource={aludecoreData}
            pagination={false}
            size="middle"
            className="gp-table"
            style={{ fontFamily: 'Lato, sans-serif' }}
          />
        </div>

        {/* Где применяется */}
        <Title level={4} style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E', marginBottom: '16px' }}>
          Где применяется:
        </Title>
        <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
          <Col span={isMobile ? 24 : 8}>
            <Card className="gp-card" bordered style={{ borderColor: '#23365E' }}>
              <Title level={5} style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', fontWeight: 600, color: '#23365E', marginBottom: '8px' }}>
                Фасады
              </Title>
              <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: 0 }}>
                Вентилируемые фасады, облицовка, козырьки, входные группы
              </Paragraph>
            </Card>
          </Col>
          <Col span={isMobile ? 24 : 8}>
            <Card className="gp-card" bordered style={{ borderColor: '#23365E' }}>
              <Title level={5} style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', fontWeight: 600, color: '#23365E', marginBottom: '8px' }}>
                Интерьеры
              </Title>
              <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: 0 }}>
                Потолки, колонны, стеновые панели, перегородки, лифтовые кабины
              </Paragraph>
            </Card>
          </Col>
          <Col span={isMobile ? 24 : 8}>
            <Card className="gp-card" bordered style={{ borderColor: '#23365E' }}>
              <Title level={5} style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', fontWeight: 600, color: '#23365E', marginBottom: '8px' }}>
                Сложные формы
              </Title>
              <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: 0 }}>
                Радиусные, криволинейные, треугольные элементы
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Преимущества */}
        <Title level={4} style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E', marginBottom: '16px' }}>
          Ключевые преимущества:
        </Title>
        <Row gutter={[16, 16]}>
          <Col span={isMobile ? 24 : 8}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '24px' }}>⚖️</span>
              <div>
                <Text strong style={{ fontFamily: 'Lato, sans-serif', color: '#23365E' }}>Лёгкость</Text>
                <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: '4px 0 0' }}>
                  Снижает нагрузку на несущие конструкции
                </Paragraph>
              </div>
            </div>
          </Col>
          <Col span={isMobile ? 24 : 8}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '24px' }}>🔗</span>
              <div>
                <Text strong style={{ fontFamily: 'Lato, sans-serif', color: '#23365E' }}>Бесшовность</Text>
                <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: '4px 0 0' }}>
                  Возможность создания бесшовных поверхностей (минимум стыков)
                </Paragraph>
              </div>
            </div>
          </Col>
          <Col span={isMobile ? 24 : 8}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <div>
                <Text strong style={{ fontFamily: 'Lato, sans-serif', color: '#23365E' }}>Устойчивость</Text>
                <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: '4px 0 0' }}>
                  К погодным условиям и механическим повреждениям
                </Paragraph>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Блок 2: Private Glass */}
      <div style={{ marginBottom: '64px' }}>
        <Title level={3} style={{ fontFamily: 'Lato, sans-serif', fontSize: '24px', fontWeight: 600, color: '#23365E', marginBottom: '24px' }}>
          2. Инновационное стекло Private Glass / Magic Glass
        </Title>
        <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '32px' }}>
          Продукция под брендом Private Glass — это высокотехнологичные стеклянные решения для фасадов и интерьеров.
        </Paragraph>

        {/* 2.1 Smart-стекло */}
        <Card style={{ marginBottom: '24px', borderColor: '#23365E', borderRadius: '8px' }}>
          <Title level={4} style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E', marginBottom: '12px' }}>
            2.1. Smart-стекло (с переменной прозрачностью)
          </Title>
          <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '12px' }}>
            <Text strong>Что это:</Text> Стекло, которое мгновенно меняет прозрачность по команде (прозрачное ↔ матовое).
          </Paragraph>
          <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '12px' }}>
            <Text strong>Где применяется:</Text> Переговорные комнаты, медицинские кабинеты, офисные перегородки, фасады.
          </Paragraph>
          <Tag color="blue" style={{ fontFamily: 'Lato, sans-serif' }}>Дополнительно: может работать как проекционный экран</Tag>
        </Card>

        {/* 2.2 Триплекс с сеткой */}
        <Card style={{ marginBottom: '24px', borderColor: '#23365E', borderRadius: '8px' }}>
          <Title level={4} style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E', marginBottom: '12px' }}>
            2.2. Триплекс с металлизированной сеткой
          </Title>
          <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '12px' }}>
            <Text strong>Что это:</Text> Многослойное стекло, внутри которого интегрирована сетка с цветным покрытием или УФ-печатью.
          </Paragraph>
          <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '12px' }}>
            <Text strong>Особенность:</Text> Снаружи — яркий цветной фасад, изнутри — естественный свет без искажения спектра.
          </Paragraph>
          <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '12px' }}>
            <Text strong>Где применяется:</Text> Фасадное остекление, витрины, входные группы, декоративные перегородки.
          </Paragraph>
          <Tag color="green" style={{ fontFamily: 'Lato, sans-serif' }}>Защита: блокирует до 99% УФ-излучения, осколки держатся на сетке</Tag>
        </Card>

        {/* 2.3 Декоративный триплекс */}
        <Card style={{ marginBottom: '24px', borderColor: '#23365E', borderRadius: '8px' }}>
          <Title level={4} style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E', marginBottom: '12px' }}>
            2.3. Декоративный триплекс (PG Decor)
          </Title>
          <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '12px' }}>
            <Text strong>Что это:</Text> Стекло с любым наполнением внутри: ткань, деревянный шпон, металл, УФ-печать, природные материалы.
          </Paragraph>
          <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '12px' }}>
            <Text strong>Где применяется:</Text> Стеновые панели, лайтбоксы, перегородки, двери.
          </Paragraph>
          <Row gutter={[16, 8]}>
            <Col span={isMobile ? 24 : 8}>
              <Tag color="purple" style={{ fontFamily: 'Lato, sans-serif' }}>Безопасность</Tag>
            </Col>
            <Col span={isMobile ? 24 : 8}>
              <Tag color="purple" style={{ fontFamily: 'Lato, sans-serif' }}>Устойчивость к чистке</Tag>
            </Col>
            <Col span={isMobile ? 24 : 8}>
              <Tag color="purple" style={{ fontFamily: 'Lato, sans-serif' }}>Полная кастомизация</Tag>
            </Col>
          </Row>
        </Card>

        {/* 2.4 Обогреваемое стекло */}
        <Card style={{ borderColor: '#23365E', borderRadius: '8px' }}>
          <Title level={4} style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E', marginBottom: '12px' }}>
            2.4. Обогреваемое стекло (Private Glass WARM)
          </Title>
          <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '12px' }}>
            <Text strong>Что это:</Text> Стекло со встроенной системой снеготаяния и антиобледенения.
          </Paragraph>
          <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '12px' }}>
            <Text strong>Где применяется:</Text> Козырьки, навесы, входные группы, открытые террасы.
          </Paragraph>
        </Card>
      </div>

      {/* Страница 2: Типовые задачи */}
      <div style={{ marginBottom: '64px' }}>
        <Title level={3} style={{ fontFamily: 'Lato, sans-serif', fontSize: '24px', fontWeight: 600, color: '#23365E', marginBottom: '24px' }}>
          Решения для типовых задач
        </Title>
        <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '32px' }}>
          Как мы решаем задачи с помощью этих материалов
        </Paragraph>

        <Row gutter={[24, 24]}>
          {tasks.map((task, idx) => (
            <Col key={idx} span={isMobile ? 24 : 12}>
              <Card hoverable style={{ borderColor: '#23365E', borderRadius: '8px', height: '100%' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{task.icon}</span>
                  <Title level={5} style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', fontWeight: 600, color: '#23365E', margin: 0 }}>
                    Задача {idx + 1}: {task.title}
                  </Title>
                </div>
                <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', lineHeight: '1.7', color: '#444', marginBottom: '8px' }}>
                  <Text strong>Материалы:</Text> {task.materials}
                </Paragraph>
                <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', lineHeight: '1.7', color: '#444', margin: 0 }}>
                  <Text strong>Эффект:</Text> {task.effect}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Страница 3: Производственные возможности */}
      <div style={{ marginBottom: '64px' }}>
        <Title level={3} style={{ fontFamily: 'Lato, sans-serif', fontSize: '24px', fontWeight: 600, color: '#23365E', marginBottom: '24px' }}>
          Производственные возможности для заказа
        </Title>
        <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '32px' }}>
          Благодаря партнёрству с технопарком, мы имеем доступ к полному циклу производства:
        </Paragraph>

        <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
          <Col span={isMobile ? 24 : 8}>
            <Card bordered style={{ borderColor: '#23365E', borderRadius: '8px', height: '100%' }}>
              <Title level={5} style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', fontWeight: 600, color: '#23365E', marginBottom: '8px' }}>
                📐 Проектирование
              </Title>
              <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: 0 }}>
                Разработка нестандартных решений
              </Paragraph>
            </Card>
          </Col>
          <Col span={isMobile ? 24 : 8}>
            <Card bordered style={{ borderColor: '#23365E', borderRadius: '8px', height: '100%' }}>
              <Title level={5} style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', fontWeight: 600, color: '#23365E', marginBottom: '8px' }}>
                🔧 Обработка
              </Title>
              <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: 0 }}>
                Резка, гибка, фрезеровка, сварка, окраска
              </Paragraph>
            </Card>
          </Col>
          <Col span={isMobile ? 24 : 8}>
            <Card bordered style={{ borderColor: '#23365E', borderRadius: '8px', height: '100%' }}>
              <Title level={5} style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', fontWeight: 600, color: '#23365E', marginBottom: '8px' }}>
                🏭 Сборка
              </Title>
              <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: 0 }}>
                Готовые изделия «под ключ» для монтажа
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Таблица возможностей */}
        <Title level={4} style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E', marginBottom: '16px' }}>
          Технические возможности:
        </Title>
        <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
          <Table
            columns={productionColumns}
            dataSource={productionData}
            pagination={false}
            size="middle"
            className="gp-table"
            style={{ fontFamily: 'Lato, sans-serif' }}
          />
        </div>

        {/* Объёмы */}
        <Title level={4} style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px', fontWeight: 600, color: '#23365E', marginBottom: '16px' }}>
          Объёмы производства:
        </Title>
        <Row gutter={[16, 16]}>
          <Col span={isMobile ? 24 : 12}>
            <Tag color="blue" style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', padding: '8px 16px' }}>
              Стекло — до 20 000 м²/мес
            </Tag>
          </Col>
          <Col span={isMobile ? 24 : 12}>
            <Tag color="blue" style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', padding: '8px 16px' }}>
              Панели — до 25 000 м²/мес
            </Tag>
          </Col>
        </Row>
      </div>

      {/* Блок: Дизайнерские решения */}
      <div style={{ marginBottom: '64px' }}>
        <Title level={3} style={{ fontFamily: 'Lato, sans-serif', fontSize: '24px', fontWeight: 600, color: '#23365E', marginBottom: '24px' }}>
          Примеры дизайнерских решений
        </Title>
        <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '32px' }}>
          Из доступных материалов
        </Paragraph>

        <Row gutter={[16, 16]}>
          {designSolutions.map((solution, idx) => (
            <Col key={idx} span={isMobile ? 24 : 8}>
              <Card hoverable style={{ borderRadius: '8px', height: '100%' }}>
                <div style={{ height: '150px', borderRadius: '4px', marginBottom: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {idx === 0 ? (
                    <img src="/figma/mirror.jpg" alt="Зеркала бесконечности" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : idx === 1 ? (
                    <img src="/figma/lightbox.jpg" alt="Светящиеся панели" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : idx === 2 ? (
                    <img src="/figma/ceiling.jpg" alt="Радиусные потолки" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : idx === 3 ? (
                    <img src="/figma/art.jpg" alt="Арт-объекты" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : idx === 4 ? (
                    <img src="/figma/facade-grid.jpg" alt="Фасады с сеткой" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : idx === 5 ? (
                    <img src="/figma/columns.jpg" alt="Облицовка колонн" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '48px' }}>🖼️</span>
                  )}
                </div>
                <Title level={5} style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', fontWeight: '600', color: '#23365E', marginBottom: '4px' }}>
                  {solution.title}
                </Title>
                <Paragraph style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#444', margin: 0 }}>
                  {solution.desc}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </main>
  );
}
