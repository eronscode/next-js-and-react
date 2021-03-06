import Head from 'next/head';
import {useRouter} from 'next/router'
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import Comments from '../../components/input/comments';
import ButtonLink from '../../components/ui/ButtonLink';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import { getAllEvents, getEventById, getFeaturedEvents } from '../../helpers/api-util';


function EventSinglePage(props) {
    const router = useRouter();
    // const eventId = router.query.eventid
    const {selectedEvent, hasError} = props;

    if (router.isFallback) {
        return <div>Loading...</div>
      }
    
    if(!selectedEvent || hasError){
        return <>
            <ErrorAlert><h4 className="center">Event Cannot be found!</h4></ErrorAlert>
            <div className="center">
                <ButtonLink link='/events'>Show all events</ButtonLink>
            </div>
        </>
    }

    const {id, title, date, location, image, description} = selectedEvent

    return (
        <>
            <Head>
                <title>{title} - Nextjs Events</title>
                <meta 
                name="description"
                content={`${title} - ${description}`}
                />
            </Head>
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
            <Comments eventId={id} />
        </>
    )
}

export async function getStaticProps(context){
    const eventId = context.params.eventid;

    const event = await getEventById(eventId)
    if(!event){
        return{
            props:{
                hasError: true
            }
        }
    }

    return{
        props:{
            selectedEvent: event
        },
        revalidate:1
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

