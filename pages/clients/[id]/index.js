import { useRouter } from "next/router"


function ClientsProjectsPage(props) {

    const router = useRouter();

    console.lo

    function loadProjectsHandler() {
        router.push(`/clients/${router.query.id}/somewhere`)
    }

    return (
        <div>
            <h1>Clients Projects Page</h1>
            <button onClick={loadProjectsHandler}>Load Client Projects</button>
        </div>
    )
}



export default ClientsProjectsPage

