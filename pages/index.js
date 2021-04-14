import Link from 'next/link';
import EventList from '../components/events/events-list';
import { getFeaturedEvents } from '../helpers/api-util';

function HomePage(props) {
  const {events} = props

  return (
    <div>
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

