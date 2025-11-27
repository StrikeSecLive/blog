import Link from 'next/link';
import '../styles/button.css';

export default function VisitBlogLink() {
  return (
    <Link href="/blog">
      Visit Blog
    </Link>
  );
}
