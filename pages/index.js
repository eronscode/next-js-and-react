import Link from 'next/link';
import Head from 'next/head';
import EventList from '../components/events/events-list';
import { getFeaturedEvents } from '../helpers/api-util';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
  const {events} = props

  return (
    <div>
      <Head>
        <title>Nextjs Events - Sample Test App</title>
        <meta 
          name="description"
          content="An events listing sample app built with next js"
         />
      </Head>

      <NewsletterRegistration />
      <EventList events={events} />
      
    </div>
  )
}

export async function getStaticProps(){
  const featuredEvents = await getFeaturedEvents();
  return{
    props:{
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage

