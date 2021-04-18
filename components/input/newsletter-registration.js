import { useContext, useRef, useState } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  
  const emailInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const notificationCtx = useContext(NotificationContext)

  

    
  function registrationHandler(event) {
    event.preventDefault();

    const payload ={
      email:  emailInputRef.current.value
    }
    console.log(payload)

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    setLoading(true)
    notificationCtx.showNotification({
      title:'Signing up...',
      message:'Register for newsletter',
      status:'pending'
    })
    fetch('/api/newsletter',{
      method:'POST',
      body: JSON.stringify(payload),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response) =>{
      if(response.ok){
        return response.json()
      }

      return response.json().then((data) => {
        setLoading(false)
        throw new Error(data.message || 'An error occured')
      })

    }).then((data) => {
      setLoading(false)
      console.log(data)
      emailInputRef.current.value = ''
      notificationCtx.showNotification({
        title:'Success!',
        message:'Registration Successful',
        status:'success'
      })
    }).catch(function(error) {
      setLoading(false)
      notificationCtx.showNotification({
        title:'Error!',
        message: error.message || 'Some error occured',
        status:'error'
      })
    });

  }


  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>{loading ? 'Signing Up...' : 'Register'}</button>
        </div>
      </form>
      <div>
      </div>
    </section>
  );
}

export default NewsletterRegistration;
