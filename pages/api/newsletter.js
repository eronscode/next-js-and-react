import {MongoClient} from 'mongodb'

async function connectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://devose:LxQn52CqH5LezlL9@cluster0.hosmk.mongodb.net/eventsdb?retryWrites=true&w=majority')
    return client;
}

async function insertDocument(client, document) {
    const db = client.db();
    await db.collection('emails').insertOne(document)
}

async function handler(req, res) {
    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message:'Invalid email address. '})
            return;
        }
        let client;

        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({message:'Unable to connect to database'});
            return
        }
        
        try {
            await insertDocument(client, {email: userEmail})
            client.close();
        } catch (error) {
            res.status(500).json({message:'Inserting Data failed'});
            return
        }
        
        res.status(201).json({message:'Thanks for signing up'})
    }
}

export default handler