const { default: axios } = require("axios")
const wichtig = require("../utils/functions");


interface Auth {
    apiKey: string;
    apiUser: string;
}

interface AccessTokenParams {
    auth: Auth;
    subscriptionKey: string;
    cache?: string;
    root?: string;
}


interface TokenResponse {
    response : {}
}


interface Body {

    "amount": "1000",
    "currency": "EUR",
    "externalId": "1245",
    "payer": {
        "partyIdType": "MSISDN",
        "partyId": "225478963"
    },

    "payerMessage": "string",
    "payeeNote": "string"
}

interface RequestToPayParams{

    body : Body,
    accessToken : string,
    subscriptionKey : string,
    env ?: string,
    cache ?: string,
    root ?: string,
    XReferenceId : string
}


interface RequestToPayReturn {

    response : {}
}

const collection = {

    createAccessToken : async (
        {
            auth, 
            subscriptionKey, 
            cache='no-cache', 
            root='https://sandbox.momodeveloper.mtn.com'
        } : AccessTokenParams) : Promise<TokenResponse>=>{

        const basic = wichtig.basicFormat(wichtig.bas64Encode(auth.apiUser, auth.apiKey));


        console.log(basic)
        
        const headers = {

            'Authorization' : basic,//'Basic ZGUxMzU1ZjctZDA5ZS00NjdkLWEzN2UtYjM4YTcwNGNmZDg2Ojk0ODE4NzVkMTZkODQyNDM5MzY4MzRjNmYwMWJhZGY0',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        
        try{
            
            const rep = await axios.post(`${root}/collection/token/`,{}, {headers} )

            
            return rep.data ;
                

            


        }catch(err){

           throw err;
            
        }

    },

    requestToPay : async (
       { 
            accessToken,
            subscriptionKey,
            env='sandbox',
            body,
            cache = 'no-cache',
            root='https://sandbox.momodeveloper.mtn.com',
            XReferenceId
        } : RequestToPayParams
        
        ) : Promise<RequestToPayReturn>=>{

        
            if(!XReferenceId){

                const XReferenceId = wichtig.generateUUID()
            }

        const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Reference-Id' : XReferenceId,
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        try{

            const rep = await axios.post(`${root}/collection/v1_0/requesttopay`, body, {headers});

            rep.data.XReferenceId = XReferenceId

            return rep.data

        }catch(err){

            throw err

        }





    },

    // createPayment : async (
    //     accessToken,
    //     subscriptionKey,
    //     env='sandbox',
    //     body = {
    //         "externalTransactionId": "12345",
    //         "money": {
    //             "amount": "122",
    //             "currency": "EUR"
    //         },
    //         "customerReference": "661551442",
    //         "serviceProviderUserName": "ahio"
    //     },
    //     cache = 'no-cache',
    //     root='https://sandbox.momodeveloper.mtn.com'
    //     )=>{


    //         const headers = {
    //             'Authorization' : wichtig.bearerFormat(accessToken),
    //             'X-Reference-Id' : wichtig.generateUUID(),
    //             'X-Target-Environment' : env,
    //             'Content-Type' : 'application/json',
    //             'Cache-Control' : cache,
    //             'Ocp-Apim-Subscription-Key' : subscriptionKey,
    //         }


    //         try{

    //             const rep = await axios.post(`${root}/collection/v2_0/payment`, body, {headers});
    
    //             if(rep){
    //                 //console.info(rep)
    //                 return rep;
    //             }
    
    //         }catch(err){
    
    //             console.error(err);
    
    //         }



    // },

    // getAccountBalance  : async (accessToken, subscriptionKey, env="sandbox", cache = 'no-cache', root='https://sandbox.momodeveloper.mtn.com')=>{


    //         const headers = {
    //             'Authorization' : wichtig.bearerFormat(accessToken),
    //             'X-Target-Environment' : env,
    //             'Content-Type' : 'application/json',
    //             'Cache-Control' : cache,
    //             'Ocp-Apim-Subscription-Key' : subscriptionKey,
    //         }


    //         try{

    //             const rep = await axios.get(`${root}/collection/v1_0/account/balance`, {headers});
    
    //             if(rep){
    //                 return rep.data;
    //             }
    
    //         }catch(err){
    
    //             console.error(err);
    
    //         }            


    // },

    // getBasicUserInfo : async (accessToken, subscriptionKey, acountHolderMSISDN='00242064581139', env='sandbox', cache = 'no-cache', root='https://sandbox.momodeveloper.mtn.com')=>{

    //     const headers = {
    //         'Authorization' : wichtig.bearerFormat(accessToken),
    //         'X-Target-Environment' : env,
    //         'Content-Type' : 'application/json',
    //         'Cache-Control' : cache,
    //         'Ocp-Apim-Subscription-Key' : subscriptionKey,
    //     }


    //     try{

    //         const rep = await axios.get(`${root}/collection/v1_0/accountholder/msisdn/${acountHolderMSISDN}/basicuserinfo`, {headers});

    //         if(rep){
    //             //console.info(rep.data);
    //             return rep.data;

    //         }

    //     }catch(err){

    //         console.error(err);

    //     }    


    // },

    // getRequestToPayInfo : async ({
    //     root = 'https://sandbox.momodeveloper.mtn.com', 
    //     referenceId,
    //     accessToken,
    //     env='sandbox',
    //     cache='no-cache',
    //     subscriptionKey

    // })=>{


    //     const headers = {
    //         'Authorization' : wichtig.bearerFormat(accessToken),
    //         'X-Target-Environment' : env,
    //         'Content-Type' : 'application/json',
    //         'Cache-Control' : cache,
    //         'Ocp-Apim-Subscription-Key' : subscriptionKey,
    //     }

    //     try{

    //         const response = await axios.get(`${root}/collection/v1_0/requesttopay/${referenceId}`, {headers});

    //         return response.data

    //     }catch(e){

    //         throw e;
    //     }




    // },

    // getHolderAccountValidation : async ({
    //     root='https://sandbox.momodeveloper.mtn.com',
    //     accountHolderIdType,
    //     accountHolderId,
    //     accessToken,
    //     env='sandbox',
    //     cache='no-cache',
    //     subscriptionKey

    // })=>{


    //     const headers = {
    //         'Authorization' : wichtig.bearerFormat(accessToken),
    //         'X-Target-Environment' : env,
    //         'Content-Type' : 'application/json',
    //         'Cache-Control' : cache,
    //         'Ocp-Apim-Subscription-Key' : subscriptionKey,
    //     }
        

    //     try{

    //         const response = await axios.get(`${root}/collection/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`, {headers});

    //         return response.data;


    //     }catch(e){

            
    //         throw e
    //     }

    // },

    // getAccountBalance : async ({
    //     root='https://sandbox.momodeveloper.mtn.com',
    //     accessToken,
    //     env='sandbox',
    //     cache='no-cache',
    //     subscriptionKey
    // })=>{

    //     const headers = {
    //         'Authorization' : wichtig.bearerFormat(accessToken),
    //         'X-Target-Environment' : env,
    //         'Content-Type' : 'application/json',
    //         'Cache-Control' : cache,
    //         'Ocp-Apim-Subscription-Key' : subscriptionKey,
    //     }

    //     try{

    //         const response = await axios.get(`${root}/collection/v1_0/account/balance`, {headers});

    //         return response.data;


    //     }catch(e){

    //         throw e
    //     }
    // },

    // getAccountBalanceWithCurrency : async ({
    //     root='https://sandbox.momodeveloper.mtn.com',
    //     accessToken,
    //     env='sandbox',
    //     cache='no-cache',
    //     subscriptionKey,
    //     currency
    // })=>{

    //     const headers = {
    //         'Authorization' : wichtig.bearerFormat(accessToken),
    //         'X-Target-Environment' : env,
    //         'Content-Type' : 'application/json',
    //         'Cache-Control' : cache,
    //         'Ocp-Apim-Subscription-Key' : subscriptionKey,
    //     }

    //     try{

    //         console.warn(currency)
    //         const response = await axios.get(`${root}/collection/v1_0/account/balance/${currency}`, {headers});

    //         return response.data;


    //     }catch(e){

    //         throw e
    //     }
    // },

}

module.exports = collection;