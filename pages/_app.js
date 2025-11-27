import '../styles/globals.css';
import Layout from '../components/Layout';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '../components/CodeBlock';

const components = {
  pre: (props) => <CodeBlock {...props} />, // ✅ Wrap <pre> so Prism markup stays intact
};

export default function App({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  );
}
