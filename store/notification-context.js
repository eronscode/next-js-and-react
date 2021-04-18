import {createContext, useState} from 'react';

const NotificationContext = createContext({
    notification:null,
    showNotification: function(){},
    hideNotification: function(){},
})


export function NotificationContextProvider(props){

    const [notification, setNotification] = useState(null);

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