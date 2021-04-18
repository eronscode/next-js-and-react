function handler(req, res) {
    const eventID = req.query.eventId;

    if(req.method === 'POST'){
        const {email, name, text} = req.body;
        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            res.status(422).json({message:'Invalid Input'});
            return;
        }

        const newComment ={
            id: new Date().toISOString(),
            email,
            name,
            text,
        }
        res.status(201).json({message:'Added Comment', comment: newComment})
         
    }

    if(req.method === 'GET'){
        
    }
}

export default handler;