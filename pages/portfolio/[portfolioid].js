import {useRouter} from 'next/router';

function portfolioid(props) {
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <h1>Portfolio Dynamic page</h1>
            
        </div>
    )
}


export default portfolioid

