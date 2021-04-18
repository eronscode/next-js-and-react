import Layout from '../components/layout/layout'
import Notification from '../components/ui/Notification'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Layout>
      <Component {...pageProps} />
      <Notification
        title=""
        status=""
        message=""
      />
  </Layout>
}

export default MyApp
