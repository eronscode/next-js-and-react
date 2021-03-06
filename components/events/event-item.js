import Image from 'next/image';
import { useState } from 'react';
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import ButtonLink from "../ui/ButtonLink";
import classes from './event-item.module.css'

function EventItem(props) {
    const [isImageReady, setIsImageReady] = useState(false)
    const {title, image, date, location, id} = props;
    const transformedDate = new Date(date).toDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const transFormedAddress = location.replace(', ', '\n');
    const explorelink = `/events/${id}`;

    const onLoadCallBack = (e)=>{
        setIsImageReady(true)
        typeof onLoad === "function" && onLoad(e)
    }

    return (
        <li className={classes.item}>
            {!isImageReady && 'loading image...'}
            <Image onLoad={onLoadCallBack} src={'/'+image} alt={title} width={260}  height={160}/>
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon/>
                        <time>{transformedDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon/>
                        <address>{transFormedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <ButtonLink link={explorelink}><span>Explore Event</span><span className={classes.icon}><ArrowRightIcon/> </span></ButtonLink>
                </div>
            </div>
        </li>
    )
}


export default EventItem

