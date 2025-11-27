
// components/MDXComponents.js
import React from 'react';
import Link from 'next/link';
import CodeBlock from './CodeBlock';

const A = (props) => {
  const href = props.href ?? '';
  const isExternal = typeof href === 'string' && href.startsWith('http');
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {props.children}
      </a>
    );
  }
  return <Link href={href} {...props}>{props.children}</Link>;
};

const Pre = (props) => <CodeBlock {...props} />;

const Img = (props) => <img {...props} />;

const MDXComponents = {
  a: A,
  pre: Pre,
  code: (props) => <CodeBlock {...props} />,
  img: Img,
};

export default MDXComponents;
