import {MongoClient} from 'mongodb'

async function handler(req, res) {
    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message:'Invalid email address. '})
            return;
        }
        const client = await MongoClient.connect('mongodb+srv://devose:LxQn52CqH5LezlL9@cluster0.hosmk.mongodb.net/eventsdb?retryWrites=true&w=majority')
        const db = client.db();
        await db.collection('emails').insertOne({email: userEmail})
        client.close()
        res.status(201).json({message:'Thanks for signing up'})
    }
}

export default handler