import '../styles/globals.css';
import Layout from '../components/Layout';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '../components/CodeBlock';

// Map <pre> to our CodeBlock so Prism/rehype markup stays intact
const components = {
  pre: (props) => <CodeBlock {...props} />,
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
