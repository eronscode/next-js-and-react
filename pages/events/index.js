import { useRouter } from "next/router"
import Head from 'next/head';

import EventList from "../../components/events/events-list"
import EventSearch from "../../components/events/events-search"
import { getAllEvents } from "../../helpers/api-util";

function AllEventsPage(props) {
    const {events} = props
    const router = useRouter()

    function onSearch(year, month) {
        const routeUrl = `/events/${year}/${month}`
        router.push(routeUrl)
    }

    return (
        <>
        <Head>
            <title>Nextjs Events - Sample Test App</title>
            <meta 
            name="description"
            content="An events listing sample app built with next js"
            />
        </Head>
            
        <EventSearch onSearch={onSearch}/>
        <EventList events={events} />
            
        </>
    )
}

export async function getStaticProps(){
    const events = await getAllEvents();
    return{
      props:{
        events: events
      },
      revalidate: 60
    }
}  


export default AllEventsPage

