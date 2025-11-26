
// components/MDXComponents.js
import React from 'react';

const A = (props) => {
  const isExternal = typeof props.href === 'string' && props.href.startsWith('http');
  return (
    <a
      {...props}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{ color: '#2563eb' }}
    />
  );
};

const Pre = (props) => (
  <pre
    {...props}
    style={{
      background: '#0b1021',
      color: '#e6edf3',
      padding: '1rem',
      borderRadius: '8px',
      overflowX: 'auto',
    }}
  />
);

const Img = (props) => (
  <img {...props} style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />
);

const MDXComponents = {
  a: A,
  pre: Pre,
  img: Img,
};

export default MDXComponents;
