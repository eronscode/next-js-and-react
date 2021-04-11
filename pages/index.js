import Link from 'next/link';
import EventList from '../components/events/events-list';
import { getFeaturedEvents } from '../dummy-data';

function HomePage(props) {
  const featuredEvents = getFeaturedEvents();


  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  )
}
export default HomePage

