'use client';

import { useState, useRef } from 'react';
import NextImage from 'next/image';

interface CalculationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalculationModal({ isOpen, onClose }: CalculationModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{fio?: string; phone?: string; request?: string}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Фильтруем только допустимые типы
      const validFiles = newFiles.filter(file => {
        const validTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/pdf'
        ];
        return validTypes.includes(file.type);
      });
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.includes('word')) return '📄';
    if (type === 'application/pdf') return '📕';
    return '📎';
  };

  // Маска для телефона: +7 (___) ___-__-__
  const formatPhone = (value: string) => {
    // Удаляем всё кроме цифр
    const digits = value.replace(/\D/g, '');
    
    // Если начинается с 8, заменяем на 7
    let formatted = digits.startsWith('8') ? '7' + digits.slice(1) : digits;
    
    // Если не начинается с 7, добавляем 7
    if (!formatted.startsWith('7')) {
      formatted = '7' + formatted;
    }
    
    // Ограничиваем 11 цифрами
    if (formatted.length > 11) {
      formatted = formatted.slice(0, 11);
    }
    
    // Форматируем: +7 (___) ___-__-__
    if (formatted.length === 0) {
      return '+7 (';
    } else if (formatted.length === 1) {
      return `+7 (${formatted.slice(1)}`;
    } else if (formatted.length <= 4) {
      return `+7 (${formatted.slice(1)}`;
    } else if (formatted.length <= 7) {
      return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4)}`;
    } else if (formatted.length <= 9) {
      return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7)}`;
    } else {
      return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7, 9)}-${formatted.slice(9, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const validateForm = () => {
    const newErrors: {fio?: string; phone?: string; request?: string} = {};
    const fioInput = (document.querySelector('input[placeholder="ФИО:"]') as HTMLInputElement);

    // Валидация ФИО
    if (!fioInput?.value.trim()) {
      newErrors.fio = 'Введите ФИО';
    } else if (fioInput.value.trim().split(' ').length < 2) {
      newErrors.fio = 'Введите фамилию и имя';
    }

    // Валидация телефона
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    // Валидация запроса
    const requestInput = (document.querySelector('textarea[placeholder="Ваш запрос:"]') as HTMLTextAreaElement);
    if (!requestInput?.value.trim()) {
      newErrors.request = 'Опишите ваш запрос';
    } else if (requestInput.value.trim().length < 10) {
      newErrors.request = 'Запрос должен быть не менее 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      setFiles([]);
      setPhone('');
      setErrors({});
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '40px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#666',
            padding: '0',
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          ×
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px', marginBottom: '32px' }}>
          {/* Левая колонка - Фото */}
          <div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '485 / 418',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: '#e0e0e0',
              }}
            >
              <NextImage
                src="/figma/346:162.png"
                alt="Каска на чертежах"
                fill
                style={{ objectFit: 'cover' }}
                loading="lazy"
                quality={80}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.style.display = 'flex';
                  e.currentTarget.parentElement!.style.alignItems = 'center';
                  e.currentTarget.parentElement!.style.justifyContent = 'center';
                  e.currentTarget.parentElement!.style.color = '#999';
                  e.currentTarget.parentElement!.textContent = 'Фото';
                }}
              />
            </div>
          </div>

          {/* Правая колонка - Заголовок и форма */}
          <div>
            <h2
              style={{
                margin: '0 0 24px 0',
                fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '26px',
                fontWeight: 600,
                color: '#23365E',
                paddingRight: '30px',
              }}
            >
              Получить расчёт вашего объекта:
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Поле ФИО */}
              <div>
                <input
                  type="text"
                  placeholder="ФИО:"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '15px',
                    fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                    border: `2px solid ${errors.fio ? '#ff4444' : '#23365E'}`,
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    color: '#000',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.fio && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.fio}
                  </div>
                )}
              </div>

              {/* Поле Телефон */}
              <div>
                <input
                  type="tel"
                  placeholder="Телефон:"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '15px',
                    fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                    border: `2px solid ${errors.phone ? '#ff4444' : '#23365E'}`,
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    color: '#000',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.phone && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Поле Ваш запрос */}
              <div>
                <textarea
                  placeholder="Ваш запрос:"
                  required
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '15px',
                    fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                    border: `2px solid ${errors.request ? '#ff4444' : '#23365E'}`,
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    color: '#000',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
                {errors.request && (
                  <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
                    {errors.request}
                  </div>
                )}
              </div>

              {/* Загрузка файлов */}
              <div>
                <div
                  style={{
                    marginBottom: '12px',
                    fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    color: '#333',
                    fontWeight: 500,
                  }}
                >
                  Прикрепить файлы (фото, Word, PDF):
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.doc,.docx,.pdf"
                  onChange={handleFileChange}
                  style={{
                    marginBottom: '12px',
                    fontSize: '14px',
                    fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                />

                {/* Список файлов */}
                {files.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          backgroundColor: '#f5f7fb',
                          borderRadius: '4px',
                          border: '1px solid #e0e0e0',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '18px' }}>{getFileIcon(file.type)}</span>
                          <div>
                            <div style={{ fontSize: '13px', color: '#333', fontWeight: 500 }}>
                              {file.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#999' }}>
                              {formatFileSize(file.size)}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: '#999',
                            padding: '0',
                            lineHeight: 1,
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Кнопка отправки */}
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '14px 40px',
                    fontSize: '16px',
                    fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 600,
                    color: '#23365e',
                    backgroundColor: '#d9d9d9',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#c0c0c0';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#d9d9d9';
                  }}
                >
                  Отправить заявку
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
