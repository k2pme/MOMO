
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

export interface Return {

    response : {}
}

export interface bodyDeposit{

    amount: string,
    currency: string,
    externalId: string,
    payee : {
        partyIdType : "MSISDN",
        partyId : string
    },
    payerMessage : string,
    payeeNote : string
    
}


export interface DepositData{

    accessToken : string,
    subscriptionKey : string,
    env ?: string,
    body ?: bodyDeposit
    cache ?: string,
    root ?: string,
    XReferenceId : string
}

export interface TransfertBody{
    "amount": "12000",
    "currency": "EUR",
    "externalId": "12345",
    "payee": {
        "partyIdType": "MSISDN",
        "partyId": "242068541193"
    },
    "payerMessage": "string",
    "payeeNote": "string"
}

export interface TransfertData{

    accessToken : string,
    subscriptionKey : string,
    env ?: string,
    body ?: TransfertBody,
    cache ?: string,
    root ?: string,
    XReferenceId : string

}

export const disbursement = {

    createAccessToken : async ({
        auth, 
        subscriptionKey, 
        cache='no-cache', 
        root='https://sandbox.momodeveloper.mtn.com'
    } : AccessTokenParams) : Promise<Return>=>{

        const basic = wichtig.basicFormat(wichtig.bas64Encode(auth.apiUser, auth.apiKey));


        console.log(basic)
        
        const headers = {

            'Authorization' : basic,//'Basic ZGUxMzU1ZjctZDA5ZS00NjdkLWEzN2UtYjM4YTcwNGNmZDg2Ojk0ODE4NzVkMTZkODQyNDM5MzY4MzRjNmYwMWJhZGY0',
            'Cache-Control' : cache,
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }

        
        try{
            
            const rep = await axios.post(`${root}/disbursement/token/`,{}, {headers} )

            
            return rep.data ;
                

            


        }catch(err){

           throw err;
            
        }

    },


    deposit : async (
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
            XReferenceId
         } : DepositData
         
    ) : Promise<Return>=>{
 
         
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
            XReferenceId
        } : TransfertData
         
    ) : Promise<Return>=>{
 
         
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
         }
 
         try{
 
             const rep = await axios.post(`${root}/disbursement/v1_0/transfer`, body, {headers});
 
             rep.data.XReferenceId = XReferenceId

             console.log(rep.data)
             return rep.data
 
         }catch(err){
 
             throw err
 
         }
 
 
 
 
 
    },


}



module.exports = disbursement;


