'use client';

import { Card, Typography, Avatar } from 'antd';

const { Paragraph, Text } = Typography;

interface ProjectCardProps {
  image: string;
  title: string;
  location: string;
  description: string;
  date: string;
  authorAvatar?: string;
}

export default function ProjectCard({
  image,
  title,
  location,
  description,
  date,
  authorAvatar,
}: ProjectCardProps) {
  return (
    <Card
      hoverable
      style={{ borderRadius: '8px', overflow: 'hidden' }}
      cover={
        <div
          style={{
            height: '200px',
            background: `url('${image}') center/cover`,
            position: 'relative',
          }}
        />
      }
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
        {authorAvatar && <Avatar src={authorAvatar} />}
        <div style={{ flex: 1 }}>
          <Text strong>{title}</Text>
          <Paragraph style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#999' }}>
            {location}
          </Paragraph>
        </div>
      </div>
      <Paragraph style={{ fontSize: '14px', marginBottom: '8px' }}>{description}</Paragraph>
      <Text style={{ fontSize: '12px', color: '#999' }}>Дата сдачи: {date}</Text>
    </Card>
  );
}
