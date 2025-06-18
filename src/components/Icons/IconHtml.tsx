// IconHtml.tsx

// 图标库预览
import * as Icons from './Icons';
import React from 'react';

const iconEntries = Object.entries(Icons).filter(
  ([key, value]) =>
    typeof value === 'function' && key.endsWith('Icon')
);

const IconsMap = Object.fromEntries(iconEntries);
export const IconHtml: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>📦 图标库预览</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
        {Object.entries(IconsMap).map(([name, IconComponent]) => (
          <div key={name} style={{ textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>
              <IconComponent />
            </div>
            <div style={{ fontSize: '14px', color: '#555' }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>{name}.tsx</div>
          </div>
        ))}
      </div>
    </div>
  );
};