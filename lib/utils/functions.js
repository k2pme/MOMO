const base64 = require('base-64');
const uuid4 = require('uuid4');
const axios = require('axios');
const utf8 = require('utf8')

const wichtig = {

    bas64Encode : (apiUser, apiKey)=>{

        var bytes = utf8.encode(`${apiUser}:${apiKey}`);
        return base64.encode(bytes);
    },

    bearerFormat : (b64token)=>{

        return `Bearer ${b64token}`;
    },

    basicFormat : (b64token)=>{

        return `Basic ${b64token}`;
    },

    generateUUID : ()=>{

        return uuid4();
    },
    

}

module.exports = wichtig;