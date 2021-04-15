import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import useSWR from 'swr'
import EventList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import ButtonLink from "../../components/ui/ButtonLink";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";


function FilterdEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState()
    const router = useRouter();
    const filterData = router.query.slug;

    const {data, error} = useSWR('https://afroshop-81fe8.firebaseio.com/events.json');

    useEffect(() => {
        if(data){
            const events = [];
            for(const key in data){
                events.push({
                    id:key,
                    ...data[key]
                })
            }
            setLoadedEvents(events)
        }
    },[data])

    let pageHeadData = (
        <Head>
            <title>Filtered Events  </title>
            <meta 
            name="description"
            content={`Filtered events`}
            />
        </Head>
    )
    
    if(!loadedEvents){
        return <>
        {pageHeadData}
        <p className="center">Loading...</p>
        </>
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
        numMonth > 12 ||
        error
    ){
        return <>
            {pageHeadData}
            <ErrorAlert><p className="center">Invalid Url. Please check your url and try again</p></ErrorAlert>
            <div className="center">
                <ButtonLink link='/events'>Show all events</ButtonLink>
            </div>
        </>
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

    if(!filteredEvents || filteredEvents.length === 0) 
        return <>
            {pageHeadData}
            <ErrorAlert><p className='center'> No events found </p></ErrorAlert>
            <div className="center">
                <ButtonLink link='/events'>Show all events</ButtonLink>
            </div>
        </>
  

    const dateObj = new Date(numYear, numMonth-1);

    pageHeadData = (
        <Head>
            <title>Filtered Events for {numYear}/{numMonth} </title>
            <meta 
            name="description"
            content={`All events for ${numYear}/${numMonth}`}
            />
        </Head>
    )

    return (
        <>
            {pageHeadData}
            <ResultsTitle date={dateObj}/>
            <EventList events={filteredEvents} />
        </>
    )
}

// export async function getServerSideProps(context){
//     const { params } = context;

//     const filterData = params.slug
    

//     const year = filterData[0]
//     const month = filterData[1]

//     const numYear = +year;
//     const numMonth = +month;

//     if(
//         isNaN(numYear) || 
//         isNaN(numMonth) || 
//         numYear > 2040 ||
//         numYear < 2020 ||
//         numMonth < 1 ||
//         numMonth > 12
//     ){
//         return {
//             props:{
//                 hasError: true
//             }
//         }
//     }

//     const filteredEvents = await getFilteredEvents({
//         year:numYear, 
//         month: numMonth
//     });

//     if(!filteredEvents || filteredEvents.length === 0) 
//         return {
//             props:{
//                 hasError: true
//             }
//         }

//     return {
//         props:{
//             events: filteredEvents,
//             date: {
//                 year: numYear, 
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilterdEventsPage

