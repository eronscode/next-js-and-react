import EventList from "../../components/events/events-list"
import EventSearch from "../../components/events/events-search"
import { getAllEvents } from "../../dummy-data"

function AllEventsPage(props) {
    const allEvents = getAllEvents()

    return (
        <>
            
            <EventSearch/>
            <EventList events={allEvents} />
            
        </>
    )
}



export default AllEventsPage

