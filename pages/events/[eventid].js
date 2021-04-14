import {useRouter} from 'next/router'
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ButtonLink from '../../components/ui/ButtonLink';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import { getAllEvents, getEventById, getFeaturedEvents } from '../../helpers/api-util';


function EventSinglePage(props) {
    // const router = useRouter();
    // const eventId = router.query.eventid
    const {selectedEvent} = props
    
    if(!selectedEvent){
        return <>
            <ErrorAlert><h4 className="center">Event Cannot be found!</h4></ErrorAlert>
            <div className="center">
                <ButtonLink link='/events'>Show all events</ButtonLink>
            </div>
        </>
    }

    const {title, date, location, image, description} = selectedEvent

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

export async function getStaticProps(context){
    const eventId = context.params.eventid;

    const event = await getEventById(eventId)
    return{
        props:{
            selectedEvent: event
        },
        revalidate:30
    }
}

export async function getStaticPaths(){
    
    const data = await getFeaturedEvents()
    const FilteredPaths = data.map(event => ({params:{eventid: event.id}}))

    return{
        paths: FilteredPaths,
        fallback: true
    }
}

export default EventSinglePage

