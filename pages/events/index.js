import { useRouter } from "next/router"
import EventList from "../../components/events/events-list"
import EventSearch from "../../components/events/events-search"
import { getAllEvents } from "../../dummy-data"

function AllEventsPage(props) {
    const allEvents = getAllEvents()
    const router = useRouter();

    function onSearch(year, month) {
        const routeUrl = `/events/${year}/${month}`
        router.push(routeUrl)
    }

    return (
        <>
            
            <EventSearch onSearch={onSearch}/>
            <EventList events={allEvents} />
            
        </>
    )
}



export default AllEventsPage

