import {createContext, useEffect, useState} from 'react';

const NotificationContext = createContext({
    notification:null,
    showNotification: function(){},
    hideNotification: function(){},
})


export function NotificationContextProvider(props){

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if(notification && (notification.status === 'success' || notification.status == 'error')){
            const timer = setTimeout(() =>{
                setNotification(null)
            }, 3000) 

            return ()=>{
                clearTimeout(timer)
            }
        }

        
    },[notification])

    function showNotificationHandler(notificationData) {
        setNotification(notificationData)
    }

    function hideNotificationHandler(notificationData) {
        setNotification(null)
    }

    const context = {
        notification: notification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return(
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}


export default NotificationContext;