import Link from 'next/link';
import Head from 'next/head';
import EventList from '../components/events/events-list';
import { getFeaturedEvents } from '../helpers/api-util';

function HomePage(props) {
  const {events} = props

  return (
    <div>
      <Head>
        <title>Nextjs Events - Sample Test App</title>
        <meta 
          name="description"
          content="A sample nextjs app built by dev ose"
         />
      </Head>


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

