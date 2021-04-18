import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  
  const emailInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage]= useState({type:'', message:''})

  

    
  function registrationHandler(event) {
    event.preventDefault();

    const payload ={
      email:  emailInputRef.current.value
    }
    console.log(payload)

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    setMessage({type:'',message:''})
    setLoading(true)
    fetch('/api/newsletter',{
      method:'POST',
      body: JSON.stringify(payload),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((data) => {
      setLoading(false)
      console.log(data)
      emailInputRef.current.value = ''
      setMessage({...message, type:'success', message: data.message})
    }).catch(function(error) {
      setMessage({...message, type:'error', message: 'An error occured'})
    });

  }

  console.log(message)

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
      <p style={{color: message.type === 'success'? 'green':'red'}}>{message.message}</p>
      </div>
    </section>
  );
}

export default NewsletterRegistration;
