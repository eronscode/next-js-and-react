import Link from "next/link"


function EventItem(props) {
    const {title, image, date, location, id} = props;
    const transformedDate = new Date(date).toDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const transFormedAddress = location.replace(', ', '\n');
    const explorelink = `/events/${id}`

    return (
        <li>
            <img src={'/'+image} alt={title} />
            <div>
                <div>
                    <h2>{title}</h2>
                    <div>
                        <time>{transformedDate}</time>
                    </div>
                    <div>
                        <address>{transFormedAddress}</address>
                    </div>
                </div>
                <div>
                    <Link href={explorelink}>Explore Event</Link>
                </div>
            </div>
        </li>
    )
}


export default EventItem

