import uuid4 from 'uuid4';
import utf8 from 'utf8'
import base64 from 'base-64'



export const wichtig = {

    bas64Encode : (apiUser : string, apiKey : string):string=>{

        var bytes = utf8.encode(`${apiUser}:${apiKey}`);
        return base64.encode(bytes);
    },

    bearerFormat : (b64token : string):string=>{

        return `Bearer ${b64token}`;
    },

    basicFormat : (b64token : string):string=>{

        return `Basic ${b64token}`;
    },

    generateUUID : ():string=>{

        return uuid4();
    },
    

}
