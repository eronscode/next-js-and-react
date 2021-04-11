import {userRouter} from 'next/router';

function portfolioid(props) {
    const router = userRouter();
    console.log(router.pathname)
    return (
        <div>
            <h1>Portfolio Dynamic page</h1>
            
        </div>
    )
}


export default portfolioid

