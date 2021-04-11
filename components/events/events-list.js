import EventItem from "./event-item"

function EventList(props) {
    const {events} = props
    return (
        <ul>
            {events.map(event => <EventItem key={event.id} {...event} />)}
        </ul>

        
    )
}


export default EventList

