import axios from 'axios'
import {wichtig} from '../utils/functions.js'

export interface Auth {
    apiKey: string;
    apiUser: string;
}

export interface AccessTokenParams {
    auth: Auth;
    subscriptionKey: string;
    cache?: string;
    root?: string;
}




export interface Body_ {

    amount : string,
    currency : string,
    externalId : string,
    payer: {
        partyIdType : "MSISDN",
        partyId : string
    },

    payerMessage : string,
    payeeNote : string
}

export interface RequestToPayParams{

    body ?: Body_,
    accessToken : string,
    subscriptionKey : string,
    env ?: string,
    cache ?: string,
    root ?: string,
    XReferenceId ?: ''
}

export interface Return {

    response : {}
}


export interface BodyCP{
    externalTransactionId : string,
    money: {
        amount : string,
        currency : string
    },
    customerReference : string,
    serviceProviderUserName : string
}


export interface CreatePayment{
    accessToken : string,
    subscriptionKey : string,
    env ?: string,
    body ?: BodyCP ,
    cache ?: string,
    root ?: string,
    XReferenceId ?: string

}


export interface getbalance{

    accessToken : string, 
    subscriptionKey : string, 
    env ?: string, 
    cache ?: string, 
    root ?: string
}


export interface getBasicInfo{
    accessToken : string, 
    subscriptionKey : string, 
    acountHolderMSISDN : string, 
    env ?: string,
    cache ?: string, 
    root ?: string
}


export interface requestTopayInfo{

    root ?: string 
    referenceId : string,
    accessToken : string,
    env ?: string,
    cache ?: string,
    subscriptionKey : string
}


export interface HolderAccount{

    root ?: string,
    accountHolderIdType : string,
    accountHolderId : string,
    accessToken : string,
    env ?: string,
    cache ?: string,
    subscriptionKey :string
}


export interface AccountBalanceCurrency{

    root ?: string,
    accessToken : string,
    env ?: string,
    cache ?: string,
    subscriptionKey : string,
    currency : string
}

// interface AccountBalance{

//     root ?: string,
//     accessToken : string,
//     env ?: string,
//     cache ?: string,
//     subscriptionKey : string
// }



export const collection = {

    createAccessToken : async (
        {
            auth, 
            subscriptionKey, 
            cache='no-cache', 
            root='https://sandbox.momodeveloper.mtn.com'
        } : AccessTokenParams) : Promise<Response>=>{

                
        const basic = wichtig.basicFormat(wichtig.bas64Encode(auth.apiUser, auth.apiKey));
        
        const headers = {

            'Authorization' : basic,
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        
        try{
            
            const rep = await axios.post(`${root}/collection/token/`,{}, {headers} )

            
            return rep.data ;


        }catch(err){

            console.log(err)
           throw err;
            
        }

    },

    requestToPay : async (
       { 
            accessToken,
            subscriptionKey,
            env='sandbox',
            body= {

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
            root='https://sandbox.momodeveloper.mtn.com',
            XReferenceId
        } : RequestToPayParams
        
        ) : Promise<Return>=>{

        
        const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Reference-Id' : XReferenceId ? XReferenceId : wichtig.generateUUID(),
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

    createPayment : async (
        {
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
            cache='no-cache',
            root='https://sandbox.momodeveloper.mtn.com',
            XReferenceId
        } : CreatePayment
        ) : Promise<Return>=>{


            const headers = {
                'Authorization' : wichtig.bearerFormat(accessToken),
                'X-Reference-Id' : XReferenceId ? XReferenceId : wichtig.generateUUID(),
                'X-Target-Environment' : env,
                'Content-Type' : 'application/json',
                'Cache-Control' : cache,
                'Ocp-Apim-Subscription-Key' : subscriptionKey,
            }


            try{

                const rep = await axios.post(`${root}/collection/v2_0/payment`, body, {headers});
    
                rep.data.XReferenceId = XReferenceId

                return rep.data
    
            }catch(err){
    
                throw err
    
            }



    },

    getAccountBalance  : async (
        {
            accessToken, 
            subscriptionKey, 
            env="sandbox", 
            cache = 'no-cache', 
            root='https://sandbox.momodeveloper.mtn.com'
        } : getbalance
    ) : Promise<Return>=>{


            const headers = {
                'Authorization' : wichtig.bearerFormat(accessToken),
                'X-Target-Environment' : env,
                'Content-Type' : 'application/json',
                'Cache-Control' : cache,
                'Ocp-Apim-Subscription-Key' : subscriptionKey,
            }


            try{

                const rep = await axios.get(`${root}/collection/v1_0/account/balance`, {headers});
    
                return rep.data;
                
    
            }catch(err){
    
               throw err
    
            }            


    },

    getBasicUserInfo : async (
        {
            accessToken, 
            subscriptionKey, 
            acountHolderMSISDN='00242064581139', 
            env='sandbox',
            cache = 'no-cache', 
            root='https://sandbox.momodeveloper.mtn.com'
        } : getBasicInfo
    
    ): Promise<Return>=>{

        const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }


        try{

            const rep = await axios.get(`${root}/collection/v1_0/accountholder/msisdn/${acountHolderMSISDN}/basicuserinfo`, {headers});

                return rep.data;


        }catch(err){

            throw err

        }    


    },

    getRequestToPayInfo : async ({
        root = 'https://sandbox.momodeveloper.mtn.com', 
        referenceId,
        accessToken,
        env='sandbox',
        cache='no-cache',
        subscriptionKey

    } : requestTopayInfo) : Promise<Return>=>{


        const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        try{

            const response = await axios.get(`${root}/collection/v1_0/requesttopay/${referenceId}`, {headers});

            return response.data

        }catch(e){

            throw e;
        }




    },

    getHolderAccountValidation : async ({
        root='https://sandbox.momodeveloper.mtn.com',
        accountHolderIdType,
        accountHolderId,
        accessToken,
        env='sandbox',
        cache='no-cache',
        subscriptionKey

    } : HolderAccount) : Promise<Return>=>{


        const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
        

        try{

            const response = await axios.get(`${root}/collection/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`, {headers});

            return response.data;


        }catch(e){

            
            throw e
        }

    },


    getAccountBalanceWithCurrency : async ({
        root='https://sandbox.momodeveloper.mtn.com',
        accessToken,
        env='sandbox',
        cache='no-cache',
        subscriptionKey,
        currency
    } : AccountBalanceCurrency) : Promise<Return>=>{

        const headers = {
            'Authorization' : wichtig.bearerFormat(accessToken),
            'X-Target-Environment' : env,
            'Content-Type' : 'application/json',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        try{

            console.warn(currency)
            const response = await axios.get(`${root}/collection/v1_0/account/balance/${currency}`, {headers});

            return response.data;


        }catch(e){

            throw e
        }
    },

}