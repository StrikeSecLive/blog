
import React from 'react';
import Link from 'next/link';
import CodeBlock from './CodeBlock';

const A = (props) => {
  const href = props.href ?? '';
  const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{props.children}</a>
  ) : (
    <Link href={href}>{props.children}</Link>
  );
};

const Pre = (props) => <pre {...props} />;
const Img = (props) => <img {...props} />;

const MDXComponents = {
  a: A,
  pre: Pre,
  code: (props) => <CodeBlock {...props} />,
  img: Img,
};

export default MDXComponents;
