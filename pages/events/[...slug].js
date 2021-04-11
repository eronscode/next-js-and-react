import { useRouter } from "next/router"
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
        return <p className="center">Invalid Url. Please check your url and try again</p>
    }

    const filteredEvents = getFilteredEvents({
        year:numYear, 
        month: numMonth
    });

    if(!filteredEvents || filteredEvents.length === 0) 
        return <>
            <ErrorAlert><p className='center'> No events found </p></ErrorAlert>
            <ButtonLink link='/'>Show all events</ButtonLink>
        </>

    return (
        <div>
            <EventList events={filteredEvents} />
        </div>
    )
}

export default FilterdEventsPage

