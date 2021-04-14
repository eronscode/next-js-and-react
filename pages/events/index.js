import { useRouter } from "next/router"
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

