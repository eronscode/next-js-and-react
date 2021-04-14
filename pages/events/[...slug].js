import { useRouter } from "next/router"
import EventList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import ButtonLink from "../../components/ui/ButtonLink";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";


function FilterdEventsPage(props) {
    const router = useRouter();
    // const filterData = router.query.slug
    
    
    // if(!filterData){
    //     return <p className="center">Loading...</p>
    // }

    // const year = filterData[0]
    // const month = filterData[1]

    // const numYear = +year;
    // const numMonth = +month;

    if(props.hasError
    ){
        return <>
            <ErrorAlert><p className="center">Invalid Url. Please check your url and try again</p></ErrorAlert>
            <div className="center">
                <ButtonLink link='/events'>Show all events</ButtonLink>
            </div>
        </>
    }

    const filteredEvents = props.events

    if(!filteredEvents || filteredEvents.length === 0) 
        return <>
            <ErrorAlert><p className='center'> No events found </p></ErrorAlert>
            <div className="center">
                <ButtonLink link='/events'>Show all events</ButtonLink>
            </div>
        </>


    const dateObj = new Date(props.date.year, props.date.month-1)
    return (
        <>
            <ResultsTitle date={dateObj}/>
            <EventList events={filteredEvents} />
        </>
    )
}

export async function getServerSideProps(context){
    const { params } = context;

    const filterData = params.slug
    

    const year = filterData[0]
    const month = filterData[1]

    const numYear = +year;
    const numMonth = +month;

    if(
        isNaN(numYear) || 
        isNaN(numMonth) || 
        numYear > 2040 ||
        numYear < 2020 ||
        numMonth < 1 ||
        numMonth > 12
    ){
        return {
            props:{
                hasError: true
            }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year:numYear, 
        month: numMonth
    });

    if(!filteredEvents || filteredEvents.length === 0) 
        return {
            props:{
                hasError: true
            }
        }

    return {
        props:{
            events: filteredEvents,
            date: {
                year: numYear, 
                month: numMonth
            }
        }
    }
}

export default FilterdEventsPage

