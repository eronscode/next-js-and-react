import {MongoClient} from 'mongodb'

async function connectDatabase() {
     const client = await MongoClient.connect('mongodb+srv://devose:LxQn52CqH5LezlL9@cluster0.hosmk.mongodb.net/eventsdb?retryWrites=true&w=majority')
     return client
}

async function insertDocument(client, document) {
    const db = client.db();
    const result = await db.collection('comments').insertOne(document);
    return result;
}

async function getDocuments(client) {
    const db = client.db();
    const documents = await db.collection('comments')
    .find()
    .sort({_id: -1})
    .toArray();

    return documents
}

async function handler(req, res) {
    const eventID = req.query.eventid;

    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({message:'Unable to connect to database'});
        return
    }
    
    

    if(req.method === 'POST'){
        const {email, name, text} = req.body;
        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            res.status(422).json({message:'Invalid Input'});
            return;
        }
        const newComment ={
            email,
            name,
            text,
            eventID
        }
        try {
            const result = insertDocument(client, newComment)
            newComment._id = result.insertedId;
            res.status(201).json({message:'Added Comment', comment: newComment})
        } catch (error) {
            res.status(500).json({message:'Unable to add comment'});
        }   
    }

    if(req.method === 'GET'){
        try {
            const result = await getDocuments(client)
            res.status(201).json({comments: result})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Unable to fetch comments'});
        } 
    }

    client.close();
}

export default handler;