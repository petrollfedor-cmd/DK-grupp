'use client';

import { useEffect, useState } from 'react';

interface FigmaChild {
  id: string;
  name: string;
  type: string;
  dimensions?: { width: number; height: number };
  styles?: any;
  layout?: any;
  text?: string;
  textStyle?: any;
}

interface FigmaAnalysis {
  nodeId: string;
  name: string;
  type: string;
  dimensions: { width: number; height: number };
  position: { x: number; y: number };
  children: FigmaChild[];
  layoutInfo?: any;
  styles: {
    colors: Array<{ id: string; hex: string; name: string }>;
    fonts: Array<{ family: string; sizes: number[] }>;
  };
}

export default function FigmaViewer() {
  const [analysis, setAnalysis] = useState<FigmaAnalysis | null>(null);
  const [selectedElement, setSelectedElement] = useState<FigmaChild | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/figma-data.json')
      .then((res) => res.json())
      .then((data) => {
        setAnalysis(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load analysis:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ fontSize: '18px', color: '#666' }}>Загрузка данных макета...</div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ fontSize: '24px', marginBottom: '12px', color: '#23365e' }}>Анализ не найден</h2>
          <p style={{ color: '#666' }}>Запустите: <code style={{ backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>npm run figma-analyze</code></p>
        </div>
      </div>
    );
  }

  const uniqueTypes = Array.from(new Set(analysis.children.map((c) => c.type)));
  const filteredChildren = filterType === 'ALL' ? analysis.children : analysis.children.filter((c) => c.type === filterType);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      {/* Левая панель - список элементов */}
      <div style={{ width: '400px', borderRight: '1px solid #e0e0e0', overflow: 'auto', padding: '16px', backgroundColor: '#fafafa' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#23365e' }}>{analysis.name}</h2>
        
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
          <div>📐 {analysis.dimensions.width} × {analysis.dimensions.height}px</div>
          <div>📍 ({analysis.position.x}, {analysis.position.y})</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '14px', marginRight: '8px', fontWeight: '500' }}>Фильтр:</label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ padding: '6px 12px', fontSize: '14px', borderRadius: '6px', border: '1px solid #ddd' }}
          >
            <option value="ALL">Все ({analysis.children.length})</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type} ({analysis.children.filter((c) => c.type === type).length})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredChildren.map((child) => (
            <div
              key={child.id}
              onClick={() => setSelectedElement(child)}
              style={{
                padding: '12px',
                border: selectedElement?.id === child.id ? '2px solid #23365e' : '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: selectedElement?.id === child.id ? '#e8f0ff' : '#fff',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px', color: '#23365e' }}>
                {child.name || 'Без имени'}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                {child.type} • {child.id}
              </div>
              {child.dimensions && (
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {child.dimensions.width} × {child.dimensions.height}px
                </div>
              )}
              {child.text && (
                <div style={{ fontSize: '12px', color: '#23365e', marginTop: '4px', fontStyle: 'italic' }}>
                  &quot;{child.text.substring(0, 40)}{child.text.length > 40 ? '...' : ''}&quot;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Правая панель - детали */}
      <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: '#fff' }}>
        {selectedElement ? (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#23365e' }}>{selectedElement.name}</h2>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
              ID: {selectedElement.id} • Тип: {selectedElement.type}
            </div>

            {/* Размеры */}
            {selectedElement.dimensions && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#23365e' }}>📐 Размеры</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Ширина</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#23365e' }}>{selectedElement.dimensions.width}px</div>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Высота</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#23365e' }}>{selectedElement.dimensions.height}px</div>
                  </div>
                </div>
              </div>
            )}

            {/* Стили */}
            {selectedElement.styles && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#23365e' }}>🎨 Стили</h3>
                
                {selectedElement.styles.fills && selectedElement.styles.fills.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Заливка:</div>
                    {selectedElement.styles.fills.map((fill: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        {fill.color && (
                          <div 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              backgroundColor: fill.color,
                              border: '1px solid #ddd',
                              borderRadius: '6px',
                            }}
                          />
                        )}
                        <span style={{ fontSize: '13px', color: '#333' }}>
                          {fill.color || fill.type} {fill.opacity ? `(${Math.round(fill.opacity * 100)}%)` : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedElement.styles.strokes && selectedElement.styles.strokes.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#666' }}>Обводка:</div>
                    {selectedElement.styles.strokes.map((stroke: any, idx: number) => (
                      <div key={idx} style={{ fontSize: '13px', marginBottom: '8px', color: '#333' }}>
                        {stroke.color && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div 
                              style={{ 
                                width: '24px', 
                                height: '24px', 
                                backgroundColor: stroke.color,
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                              }}
                            />
                            <span>Цвет: {stroke.color}</span>
                          </div>
                        )}
                        {stroke.weight && <div>Толщина: {stroke.weight}px</div>}
                      </div>
                    ))}
                  </div>
                )}

                {selectedElement.styles.cornerRadius && (
                  <div style={{ fontSize: '13px', marginBottom: '8px', color: '#333' }}>
                    Радиус скругления: <strong>{selectedElement.styles.cornerRadius}px</strong>
                  </div>
                )}

                {selectedElement.styles.opacity && (
                  <div style={{ fontSize: '13px', color: '#333' }}>
                    Прозрачность: {Math.round(selectedElement.styles.opacity * 100)}%
                  </div>
                )}
              </div>
            )}

            {/* Текст */}
            {selectedElement.textStyle && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#23365e' }}>📝 Текст</h3>
                {selectedElement.textStyle.family && (
                  <div style={{ fontSize: '13px', marginBottom: '4px', color: '#333' }}>
                    Шрифт: <strong>{selectedElement.textStyle.family}</strong>
                  </div>
                )}
                {selectedElement.textStyle.size && (
                  <div style={{ fontSize: '13px', marginBottom: '4px', color: '#333' }}>
                    Размер: <strong>{selectedElement.textStyle.size}px</strong>
                  </div>
                )}
                {selectedElement.textStyle.weight && (
                  <div style={{ fontSize: '13px', color: '#333' }}>
                    Насыщенность: <strong>{selectedElement.textStyle.weight}</strong>
                  </div>
                )}
                {selectedElement.text && (
                  <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Содержимое:</div>
                    <div style={{ fontSize: '14px', color: '#333' }}>{selectedElement.text}</div>
                  </div>
                )}
              </div>
            )}

            {/* Layout */}
            {selectedElement.layout && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#23365e' }}>🔧 Layout</h3>
                {selectedElement.layout.layoutMode && (
                  <div style={{ fontSize: '13px', marginBottom: '4px', color: '#333' }}>
                    Режим: <strong>{selectedElement.layout.layoutMode}</strong>
                  </div>
                )}
                {selectedElement.layout.itemSpacing !== undefined && (
                  <div style={{ fontSize: '13px', marginBottom: '4px', color: '#333' }}>
                    Отступ между элементами: <strong>{selectedElement.layout.itemSpacing}px</strong>
                  </div>
                )}
                {(selectedElement.layout.paddingLeft !== undefined || selectedElement.layout.paddingTop !== undefined) && (
                  <div style={{ fontSize: '13px', marginBottom: '4px', color: '#333' }}>
                    Паддинги: <strong>{selectedElement.layout.paddingTop || 0}/{selectedElement.layout.paddingRight || 0}/{selectedElement.layout.paddingBottom || 0}/{selectedElement.layout.paddingLeft || 0}</strong>
                  </div>
                )}
                {selectedElement.layout.justifyContent && (
                  <div style={{ fontSize: '13px', marginBottom: '4px', color: '#333' }}>
                    Justify: <strong>{selectedElement.layout.justifyContent}</strong>
                  </div>
                )}
                {selectedElement.layout.alignItems && (
                  <div style={{ fontSize: '13px', color: '#333' }}>
                    Align: <strong>{selectedElement.layout.alignItems}</strong>
                  </div>
                )}
              </div>
            )}

            {/* Изображение */}
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#23365e' }}>🖼️ Изображение</h3>
              <img 
                src={`/figma/${selectedElement.id}.png`} 
                alt={selectedElement.name}
                style={{ maxWidth: '100%', maxHeight: '400px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#999', marginTop: '100px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👈</div>
            <div style={{ fontSize: '18px' }}>Выберите элемент из списка слева</div>
          </div>
        )}

        {/* Цветовая палитра */}
        {analysis && (
          <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e0e0e0' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#23365e' }}>🎨 Цветовая палитра макета</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {analysis.styles.colors.map((color, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div 
                    style={{ 
                      width: '64px', 
                      height: '64px', 
                      backgroundColor: color.hex,
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      marginBottom: '4px',
                    }}
                  />
                  <div style={{ fontSize: '11px', color: '#666', fontFamily: 'monospace' }}>{color.hex}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
