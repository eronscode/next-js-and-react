import { useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../ui/Notification";
import MainHeader from "./main-header";


function Layout(props) {
    const notificationCtx = useContext(NotificationContext);
    const {notification} = notificationCtx;
    return (
        <>
            <MainHeader />
            <main>
                {props.children}
            </main>
            {notification && <Notification
                title={notification.title}
                status={notification.status}
                message={notification.message}
            />}
        </>
    )
}


export default Layout

