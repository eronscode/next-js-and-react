import {MongoClient} from 'mongodb'



async function handler(req, res) {
    const eventID = req.query.eventid;
    const client = await MongoClient.connect('mongodb+srv://devose:LxQn52CqH5LezlL9@cluster0.hosmk.mongodb.net/eventsdb?retryWrites=true&w=majority')
    

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
        const db = client.db();
        const result = await db.collection('comments').insertOne(newComment);
        newComment.id = result.insertedId;
        res.status(201).json({message:'Added Comment', comment: newComment})
         
    }

    if(req.method === 'GET'){
        const db = client.db();
        const result = await db.collection('comments')
        .find()
        .sort({_id: -1})
        .toArray();
        res.status(201).json({comments: result})
    }

    client.close();
}

export default handler;