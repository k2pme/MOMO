const {default: axios} = require('axios')
const wichtig = require('./../utils/functions');


const disbursement = {

    createAccessToken : async ({
        auth, 
        subscriptionKey, 
        cache='no-cache', 
        root='https://sandbox.momodeveloper.mtn.com'
        
    })=>{


        const basic = wichtig.basicFormat(wichtig.bas64Encode(auth.apiUser, auth.apiKey));

        
        const headers = {

            'Authorization' : basic,//'Basic ZGUxMzU1ZjctZDA5ZS00NjdkLWEzN2UtYjM4YTcwNGNmZDg2Ojk0ODE4NzVkMTZkODQyNDM5MzY4MzRjNmYwMWJhZGY0',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        
        try{
            
            const rep = await axios.post(`${root}/disbursement/token/`,{}, {headers} )

            
            return rep.data ;
                

            


        }catch(err){

            console.log(err)
           throw err;
            
        }

    },


    depositV2 : async (
        { 
            accessToken,
            subscriptionKey,
            env='sandbox',
            body = {

                "amount": "string",
                "currency": "string",
                "externalId": "string",
                "payee": {
                    "partyIdType": "MSISDN",
                    "partyId": "string"
                },
                "payerMessage": "string",
                "payeeNote": "string"
                
            },
            cache = 'no-cache',
            root='https://sandbox.momodeveloper.mtn.com',
            XReferenceId,
            XCallbackUrl
         })=>{
 
         
            //  if(!XReferenceId){
 
            //      const XReferenceId = wichtig.generateUUID()
            //  }
 
         const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Reference-Id' : XReferenceId,
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
            'X-Callback-Url' : XCallbackUrl

         }
 
         try{
 
             const rep = await axios.post(`${root}/disbursement/v2_0/deposit`, body, {headers});
 
             rep.data.XReferenceId = XReferenceId
 
             return rep.data
 
         }catch(err){
            
            console.log(err)
             throw err
 
         }
 
 
 
 
 
    },

    Transfer : async (
        { 
            accessToken,
            subscriptionKey,
            env='sandbox',
            body = {
                "amount": "12000",
                "currency": "EUR",
                "externalId": "12345",
                "payee": {
                    "partyIdType": "MSISDN",
                    "partyId": "242068541193"
                },
                "payerMessage": "string",
                "payeeNote": "string"
            },
            cache = 'no-cache',
            root='https://sandbox.momodeveloper.mtn.com',
            XReferenceId,
            XCallbackUrl
        })=>{
 
         
            //  if(!XReferenceId){
 
            //      const XReferenceId = wichtig.generateUUID()
            //  }
 
         const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Reference-Id' : XReferenceId ? XReferenceId : wichtig.generateUUID(),
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
            'X-Callback-Url' : XCallbackUrl

         }
 
         try{
 
             const rep = await axios.post(`${root}/disbursement/v1_0/transfer`, body, {headers});
 

             return rep.data
 
         }catch(err){
 
             throw err
 
         }
 
 
 
 
 
    },


}


module.exports = disbursement;



