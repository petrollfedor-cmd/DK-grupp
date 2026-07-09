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
      const validFiles = newFiles.filter(file => {
        const validTypes = ['image/jpeg','image/png','image/gif','image/webp','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf'];
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

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formatted = digits.startsWith('8') ? '7' + digits.slice(1) : digits;
    if (!formatted.startsWith('7')) formatted = '7' + formatted;
    if (formatted.length > 11) formatted = formatted.slice(0, 11);
    if (formatted.length === 0) return '+7 (';
    if (formatted.length === 1) return `+7 (${formatted.slice(1)}`;
    if (formatted.length <= 4) return `+7 (${formatted.slice(1)}`;
    if (formatted.length <= 7) return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4)}`;
    if (formatted.length <= 9) return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7)}`;
    return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7, 9)}-${formatted.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const validateForm = () => {
    const newErrors: {fio?: string; phone?: string; request?: string} = {};
    const fioInput = (document.querySelector('input[placeholder="ФИО:"]') as HTMLInputElement);
    if (!fioInput?.value.trim()) newErrors.fio = 'Введите ФИО';
    else if (fioInput.value.trim().split(' ').length < 2) newErrors.fio = 'Введите фамилию и имя';
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 11) newErrors.phone = 'Введите корректный номер телефона';
    const requestInput = (document.querySelector('textarea[placeholder="Ваш запрос:"]') as HTMLTextAreaElement);
    if (!requestInput?.value.trim()) newErrors.request = 'Опишите ваш запрос';
    else if (requestInput.value.trim().length < 10) newErrors.request = 'Запрос должен быть не менее 10 символов';
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
    <>
      <style>{`
        @media (max-width: 768px) {
          .calc-modal-overlay {
            align-items: flex-end !important;
          }
          .calc-modal-inner {
            border-radius: 16px 16px 0 0 !important;
            max-height: 85vh !important;
            max-width: 380px !important;
            margin: 0 auto !important;
          }
          .calc-modal-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .calc-modal-photo { display: none !important; }
          .calc-modal-title { font-size: 18px !important; margin-bottom: 12px !important; padding-right: 24px !important; }
          .calc-modal-grid input,
          .calc-modal-grid textarea {
            padding: 12px 14px !important;
            font-size: 16px !important;
          }
          .calc-modal-submit-btn {
            padding: 12px 24px !important;
            font-size: 14px !important;
            width: 100% !important;
          }
          .calc-modal-close-btn {
            top: 8px !important;
            right: 8px !important;
            font-size: 24px !important;
          }
        }
      `}</style>

      <div
        className="calc-modal-overlay"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 0,
        }}
        onClick={onClose}
      >
        <div
          className="calc-modal-inner"
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="calc-modal-close-btn"
            style={{
              position: 'absolute',
              top: '12px', right: '12px',
              background: 'none', border: 'none',
              fontSize: '28px', cursor: 'pointer',
              color: '#666', padding: 0, lineHeight: 1, zIndex: 10,
            }}
          >×</button>

          <div className="calc-modal-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px', marginBottom: '32px' }}>
            <div className="calc-modal-photo">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '485/418', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#e0e0e0' }}>
                <NextImage src="/figma/346:162.png" alt="Фото" fill style={{ objectFit: 'cover' }} loading="lazy" quality={80} />
              </div>
            </div>

            <div>
              <h2 className="calc-modal-title" style={{ margin: '0 0 20px 0', fontFamily: 'Lato, sans-serif', fontSize: '22px', fontWeight: 600, color: '#23365E' }}>
                Получить расчёт вашего объекта:
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input type="text" placeholder="ФИО:" required style={{ width: '100%', padding: '12px 16px', fontSize: '15px', fontFamily: 'Lato, sans-serif', border: `2px solid ${errors.fio ? '#ff4444' : '#23365E'}`, borderRadius: '4px', boxSizing: 'border-box' }} />
                {errors.fio && <div style={{ color: '#ff4444', fontSize: '12px' }}>{errors.fio}</div>}

                <input type="tel" placeholder="Телефон:" value={phone} onChange={handlePhoneChange} required style={{ width: '100%', padding: '12px 16px', fontSize: '15px', fontFamily: 'Lato, sans-serif', border: `2px solid ${errors.phone ? '#ff4444' : '#23365E'}`, borderRadius: '4px', boxSizing: 'border-box' }} />
                {errors.phone && <div style={{ color: '#ff4444', fontSize: '12px' }}>{errors.phone}</div>}

                <textarea placeholder="Ваш запрос:" required rows={4} style={{ width: '100%', padding: '12px 16px', fontSize: '15px', fontFamily: 'Lato, sans-serif', border: `2px solid ${errors.request ? '#ff4444' : '#23365E'}`, borderRadius: '4px', resize: 'vertical', boxSizing: 'border-box' }} />
                {errors.request && <div style={{ color: '#ff4444', fontSize: '12px' }}>{errors.request}</div>}

                <div>
                  <div style={{ marginBottom: '8px', fontFamily: 'Lato, sans-serif', fontSize: '14px', color: '#333', fontWeight: 500 }}>Прикрепить файлы (фото, Word, PDF):</div>
                  <input ref={fileInputRef} type="file" multiple accept="image/*,.doc,.docx,.pdf" onChange={handleFileChange} style={{ fontSize: '14px' }} />
                  {files.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                      {files.map((file, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#f5f7fb', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{getFileIcon(file.type)}</span>
                            <div>
                              <div style={{ fontSize: '13px', color: '#333', fontWeight: 500 }}>{file.name}</div>
                              <div style={{ fontSize: '12px', color: '#999' }}>{formatFileSize(file.size)}</div>
                            </div>
                          </div>
                          <button type="button" onClick={() => handleRemoveFile(index)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#999', padding: 0 }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right', marginTop: '4px' }}>
                  <button type="submit" className="calc-modal-submit-btn" style={{ padding: '12px 36px', fontSize: '15px', fontFamily: 'Lato, sans-serif', fontWeight: 600, color: '#23365e', backgroundColor: '#d9d9d9', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Отправить заявку</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
