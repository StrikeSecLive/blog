import '../styles/globals.css';
import '../styles/mdx.css';
import Layout from '../components/Layout';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '../components/CodeBlock';

const components = {
  code: (props) => <CodeBlock {...props} />,
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
