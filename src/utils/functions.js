const {v4: uuidv4} = require('uuid');




module.exports = wichtig = {

    bas64Encode : (apiUser, apiKey)=>{

        var bytes = Buffer.from(`${apiUser}:${apiKey}`, 'utf-8');
        return Buffer.from(bytes).toString('base64');
    },

    bearerFormat : (b64token)=>{

        return `Bearer ${b64token}`;
    },

    basicFormat : (b64token)=>{

        return `Basic ${b64token}`;
    },

    generateUUID : ()=>{

        return uuidv4();
    },
    

}