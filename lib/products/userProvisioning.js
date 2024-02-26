const uuid4 = require('uuid4');
const axios = require('axios');


const userProvisioning = {

    postUser : async (uuid = uuid4(), 
                    subscriptionKey, 
                    cache='no-cache',
                    body = {'providerCallbackHost' : "string"},
                    root='https://sandbox.momodeveloper.mtn.com'
                    )=>{
    
        const headers = { 
            'Cache-Control': cache, 
            'Ocp-Apim-Subscription-Key': subscriptionKey, 
            'Content-Type': 'application/json', 
            'X-Reference-Id': uuid,
          };
    
          try{
                const rep = await axios.post(`${root}/v1_0/apiuser`, body, {headers});
    
                if(rep){

                    return rep.config.headers['X-Reference-Id']
                }
    
          }catch(err){
            console.error(err)
          }
        
        
        
    
    },

    getUser : async (uuid,subscriptionKey, cache='no-cache', root='https://sandbox.momodeveloper.mtn.com')=>{

        const headers = {
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        try{

            const rep = await axios.get(`${root}/v1_0/apiuser/${uuid}`, {headers})
            if(rep){
                console.log(rep.data);
            }
        }catch(err){
            console.err(err)
        }
    },



    postApiKey : async (uuid, subscriptionKey, cache='no-cache', root='https://sandbox.momodeveloper.mtn.com') => {

        const headers = {
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        }

        try{

            const rep = await axios.post(`${root}/v1_0/apiuser/${uuid}/apikey`,{}, {headers});

            if(rep){

                console.log(rep.data)
            }
        }catch(err){

            console.error(err)
        }

    }



    

}

module.exports = userProvisioning;