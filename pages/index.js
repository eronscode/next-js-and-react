import Link from 'next/link';

function index(props) {
  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        <li><Link href="/portfolio">Portfolio</Link></li>
        <li><Link href="/clients">Clients</Link></li>
        <li><Link href="/blog">Blog</Link></li>
      </ul>
    </div>
  )
}
export default index

