import Link from 'next/link';

function ClientMainPage(props) {
    
    const clientData = [
        {id:'david',name:'david butter'},
        {id:'john',name:'john mark'}
    ]
    return (
        <div>
            <h1>CLients main Page</h1>
            <ul>
                {clientData.map((item) => (
                    <li key={item.id}>
                        <Link href={`/clients/${item.id}`}>{item.name}</Link> 
                    </li>
                ))}
                <h2>Alternative way to add  links</h2>
                {clientData.map((item) => (
                    <li key={item.id}>
                        <Link href={{
                            pathname: 'clients/[id]',
                            query:{id: item.id }
                        }}>{item.name}</Link> 
                    </li>
                ))}
            </ul>
        </div>
    )
}



export default ClientMainPage

