'use client';

interface RequisitesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const requisites = [
  <div key="company" style={{ textAlign: 'center', fontWeight: 700, fontSize: '18px', marginBottom: '12px', color: '#23365E' }}>
    ООО «ДК ГРУПП»
  </div>,
  <div key="inn" style={{ textAlign: 'center', marginBottom: '8px' }}>
    (ИНН 6316285360, КПП 631601001, ОГРН 1236300027776)
  </div>,
  <div key="account" style={{ textAlign: 'center', marginBottom: '8px' }}>
    р/сч 40702810010001506418 Банк АО "ТИНЬКОФФ БАНК"
  </div>,
  <div key="bank" style={{ textAlign: 'center', marginBottom: '8px' }}>
    ИНН банка 7710140679 БИК банка 044525974
  </div>,
  <div key="correspondent" style={{ textAlign: 'center', marginBottom: '8px' }}>
    Корреспондентский счет банка 30101810145250000974
  </div>,
  <div key="bank-address" style={{ textAlign: 'center', marginBottom: '12px' }}>
    Юридический адрес банка
  </div>,
  <div key="bank-address-line" style={{ textAlign: 'center', marginBottom: '12px' }}>
    Москва, 127287, ул. Хуторская 2-я, д. 38А, стр. 26
  </div>,
  <div key="company-address" style={{ textAlign: 'center' }}>
    Адрес местонахождения: Юридический адрес организации:
  </div>,
  <div key="company-address-line" style={{ textAlign: 'center' }}>
    443080, РОССИЯ, САМАРСКАЯ ОБЛАСТЬ, Г.О. САМАРА, ВН.Р-Н ОКТЯБРЬСКИЙ, Г САМАРА, ПР-КТ КАРЛА МАРКСА, Д. 192, ОФИС 713
  </div>,
];

export default function RequisitesModal({ isOpen, onClose }: RequisitesModalProps) {
  const handleDownload = () => {
    window.open('/documents/Реквизиты ДК ГРУПП.docx', '_blank');
  };

  if (!isOpen) return null;

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
          maxWidth: '600px',
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

        <h2
          style={{
            margin: '0 0 24px 0',
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '24px',
            fontWeight: 600,
            color: '#23365E',
          }}
        >
        </h2>

        <div style={{
          fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '15px',
          lineHeight: '1.8',
          color: '#444',
          marginBottom: '24px',
        }}>
          {requisites}
        </div>

        <button
          onClick={handleDownload}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: '#23365E',
            borderRadius: '6px',
            color: '#fff',
            border: 'none',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1e2f4f')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#23365E')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Скачать реквизиты (.docx)
        </button>
      </div>
    </div>
  );
}
