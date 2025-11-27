import Link from 'next/link';
import styles from '../styles/button.module.css';

export default function VisitBlogButton() {
  return (
    <Link href="/blog" className={styles.btnPrimary}>
      Visit Blog
    </Link>
  );
}
