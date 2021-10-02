const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const AssistantV2 = require('ibm-watson/assistant/v2.js');
const {IamAuthenticator} = require('ibm-watson/auth/index.js');

dotenv.config();

const port = 8000 || process.env.PORT;
const app = express();

//use express.json() for sending JSON response
app.use(express.json())

//use cors for connecting with your react app
app.use(cors());

const authenticator = new IamAuthenticator({apikey:"PsWjY9ivh0kPhFH4JhPMe7BzJPgk73QaNfYuiwNSfyW7"});
const assistant = new AssistantV2({
    version: '2018-09-19',
    authenticator: authenticator,
    serviceUrl: "https://api.us-south.assistant.watson.cloud.ibm.com"
})

//Recevie request 
app.get('/',async(req, res) => {
    try{
        const session = await assistant.createSession({assistantId:"31009601-570d-47e8-a996-c2440a886ffd"});
        res.json(session['result']);
    }
    catch(err){
        res.status(400).json({message:'unable to create session key'});
        console.log(err);
    }
})

app.post('/message',async(req, res) => {

    var payload = {
        assistantId: "31009601-570d-47e8-a996-c2440a886ffd",
        sessionId: req.headers.session_id,
        input:{
            message_type: 'text',
            text: req.body.input
        }
    } 

    try{
        const message = await assistant.message(payload);
        res.status(200).json(message['result']);
    }
    catch(err){
        res.status(400).json({message:'unable to get message from bot'});
        console.log(err);
    }
})


//listen to the port 8000
app.listen(port, ()=> console.log(`Server Running at the port ${port}`))