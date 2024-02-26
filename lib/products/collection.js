const { default: axios } = require("axios")
const wichtig = require("../utils/functions")



const collection = {

    createAccessToken : async (auth = {apiKey : '', apiUser : ''}, subscriptionKey, cache='no-cache')=>{

        const basic = wichtig.basicFormat(wichtig.bas64Encode(auth.apiUser, auth.apiKey));
        console.log(basic)
        const headers = {

            'Authorization' : basic,//'Basic ZGUxMzU1ZjctZDA5ZS00NjdkLWEzN2UtYjM4YTcwNGNmZDg2Ojk0ODE4NzVkMTZkODQyNDM5MzY4MzRjNmYwMWJhZGY0',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        try{
            
            const rep = await axios.post(`https://sandbox.momodeveloper.mtn.com/collection/token/`,{}, {headers} )

            if(rep){

                return rep.data ;
            }
        }catch(err){

            console.error(err);
            
        }

    },

    requestToPay : async (body = {
            "amount": "1000",
            "currency": "EUR",
            "externalId": "1245",
            "payer": {
                "partyIdType": "MSISDN",
                "partyId": "225478963"
            },
            "payerMessage": "string",
            "payeeNote": "string"
        },
        accessToken,
        env='sandbox',
        subscriptionKey,
        cache = 'no-cache')=>{

        
        const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Reference-Id' : wichtig.generateUUID(),
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        try{

            const rep = await axios.post(`https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay`, body, {headers});

            if(rep){
                console.log(rep.data)
            }

        }catch(err){

            console.error(err);

        }





    }
}

module.exports = collection;