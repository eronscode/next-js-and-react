import Layout from '../components/layout/layout'
import Notification from '../components/ui/Notification'
import { NotificationContextProvider } from '../store/notification-context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <NotificationContextProvider>
    <Layout>
      <Component {...pageProps} />
      <Notification
        title=""
        status=""
        message=""
      />
  </Layout>
  </NotificationContextProvider>
  
}

export default MyApp
