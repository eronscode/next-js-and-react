import {useRouter} from 'next/router'
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import { getEventById } from "../../dummy-data";


function EventSinglePage(props) {
    const router = useRouter();
    const eventId = router.query.eventid
    const singleEvent = getEventById(eventId)
    
    if(!singleEvent){
        return <h4>Event Cannot be found!</h4>
    }

    const {title, date, location, image, description} = singleEvent

    return (
        <>
            <EventSummary title={title} />
            <EventLogistics 
                date={date}
                address={location}
                image={image}
                imageAlt={title}
            /> 
            <EventContent>
                <p>{description}</p>
            </EventContent>
        </>
    )
}

export default EventSinglePage

