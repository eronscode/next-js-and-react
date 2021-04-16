import Image from 'next/image';
import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';
import { useState } from 'react';

function EventLogistics(props) {
  
  const [isImageReady, setIsImageReady] = useState(false)
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = address.replace(', ', '\n');
  const onLoadCallBack = (e)=>{
    setIsImageReady(true)
    typeof onLoad === "function" && onLoad(e)
  }

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        {!isImageReady && <p>loading image...</p>}
        <Image onLoad={onLoadCallBack} src={`/${image}`} alt={imageAlt} width={400} height={400} />
        
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
