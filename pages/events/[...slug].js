import { useRouter } from "next/router"
import EventList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import ButtonLink from "../../components/ui/ButtonLink";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { getFilteredEvents } from "../../dummy-data";


function FilterdEventsPage(props) {
    const router = useRouter();
    const filterData = router.query.slug
    
    
    if(!filterData){
        return <p className="center">Loading...</p>
    }

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
        return <>
            <ErrorAlert><p className="center">Invalid Url. Please check your url and try again</p></ErrorAlert>
            <div className="center">
                <ButtonLink link='/events'>Show all events</ButtonLink>
            </div>
        </>
    }

    const filteredEvents = getFilteredEvents({
        year:numYear, 
        month: numMonth
    });

    if(!filteredEvents || filteredEvents.length === 0) 
        return <>
            <ErrorAlert><p className='center'> No events found </p></ErrorAlert>
            <div className="center">
                <ButtonLink link='/events'>Show all events</ButtonLink>
            </div>
        </>


    const dateObj = new Date(numYear, numMonth-1)
    return (
        <>
            <ResultsTitle date={dateObj}/>
            <EventList events={filteredEvents} />
        </>
    )
}

export default FilterdEventsPage

