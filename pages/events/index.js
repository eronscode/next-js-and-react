import EventList from "../../components/events/events-list"
import { getAllEvents } from "../../dummy-data"

function AllEventsPage(props) {
    const allEvents = getAllEvents()

    return (
        <>
            <div>
                <EventList events={allEvents} />
            </div>
        </>
    )
}



export default AllEventsPage

