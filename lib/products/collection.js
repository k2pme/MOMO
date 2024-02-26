const { default: axios } = require("axios")
const wichtig = require("../utils/functions")



const collection = {

    createAccessToken : async (auth = {apiKey : '', apiUser : ''}, subscriptionKey, cache='no-cache', root='https://sandbox.momodeveloper.mtn.com')=>{

        const basic = wichtig.basicFormat(wichtig.bas64Encode(auth.apiUser, auth.apiKey));
        console.log(basic)
        const headers = {

            'Authorization' : basic,//'Basic ZGUxMzU1ZjctZDA5ZS00NjdkLWEzN2UtYjM4YTcwNGNmZDg2Ojk0ODE4NzVkMTZkODQyNDM5MzY4MzRjNmYwMWJhZGY0',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        try{
            
            const rep = await axios.post(`${root}/collection/token/`,{}, {headers} )

            if(rep){
                console.log(rep.data);
                return rep.data ;
                

            }
        }catch(err){

            console.error(err);
            
        }

    },

    requestToPay : async (
        accessToken,
        subscriptionKey,
        env='sandbox',
        body = {
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
        cache = 'no-cache',
        root='https://sandbox.momodeveloper.mtn.com'
        )=>{

        
        const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Reference-Id' : wichtig.generateUUID(),
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        try{

            const rep = await axios.post(`${root}/collection/v1_0/requesttopay`, body, {headers});

            if(rep){
                console.log(rep)
            }

        }catch(err){

            console.error(err);

        }





    },


    createPayment : async (
        accessToken,
        subscriptionKey,
        env='sandbox',
        body = {
            "externalTransactionId": "12345",
            "money": {
                "amount": "122",
                "currency": "EUR"
            },
            "customerReference": "661551442",
            "serviceProviderUserName": "ahio"
        },
        cache = 'no-cache',
        root='https://sandbox.momodeveloper.mtn.com'
        )=>{


            const headers = {
                'Authorization' : wichtig.bearerFormat(accessToken),
                'X-Reference-Id' : wichtig.generateUUID(),
                'X-Target-Environment' : env,
                'Content-Type' : 'application/json',
                'Cache-Control' : cache,
                'Ocp-Apim-Subscription-Key' : subscriptionKey,
            }


            try{

                const rep = await axios.post(`${root}/collection/v2_0/payment`, body, {headers});
    
                if(rep){
                    //console.info(rep)
                    return rep;
                }
    
            }catch(err){
    
                console.error(err);
    
            }



    },

    getAccountBalance  : async (accessToken, subscriptionKey, env="sandbox", cache = 'no-cache', root='https://sandbox.momodeveloper.mtn.com')=>{


            const headers = {
                'Authorization' : wichtig.bearerFormat(accessToken),
                'X-Target-Environment' : env,
                'Content-Type' : 'application/json',
                'Cache-Control' : cache,
                'Ocp-Apim-Subscription-Key' : subscriptionKey,
            }


            try{

                const rep = await axios.get(`${root}/collection/v1_0/account/balance`, {headers});
    
                if(rep){
                    return rep.data;
                }
    
            }catch(err){
    
                console.error(err);
    
            }            


    },

    getBasicUserInfo : async (accessToken, subscriptionKey, acountHolderMSISDN='00242064581139', env='sandbox', cache = 'no-cache', root='https://sandbox.momodeveloper.mtn.com')=>{

        const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }


        try{

            const rep = await axios.get(`${root}/collection/v1_0/accountholder/msisdn/${acountHolderMSISDN}/basicuserinfo`, {headers});

            if(rep){
                //console.info(rep.data);
                return rep.data;

            }

        }catch(err){

            console.error(err);

        }    


    }
}

module.exports = collection;