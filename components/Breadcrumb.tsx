'use client';

import { Breadcrumb } from 'antd';

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const breadcrumbWrapperStyle: React.CSSProperties = {
  padding: '12px 24px',
  background: '#f5f7fb',
  height: '44px',
  minHeight: '44px',
  maxHeight: '44px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  transition: 'none',
  animation: 'none',
};

const breadcrumbStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  lineHeight: '20px',
  fontSize: '14px',
  height: '20px',
  minHeight: '20px',
  maxHeight: '20px',
  transition: 'none',
  animation: 'none',
};

export default function AppBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <div style={breadcrumbWrapperStyle}>
      <Breadcrumb
        style={breadcrumbStyle}
        items={items.map((item) => ({
          title: item.href ? <a href={item.href}>{item.title}</a> : item.title,
        }))}
      />
    </div>
  );
}
