# MOMO

momo is an electronic wallet of MTN, use this package to easely access to MTN MOMO API in sandbox and in live 

## Setup

  from github :
```bash
git clone https://github.com/k2pme/MOMO.git
```
```bash
cd MOMO && npm install 
```
        

 form npm :
```bash
npm install mtnmomo
```
    

# Usage 

After having all dependances by downloading them with npm install, otherwase they can be had from package.json, and be registred to [MTN MOMO web site](https://momodeveloper.mtn.com/)

# Mains functions

- sandbox User Provisioning : [reach][URL#L10]
- collection : [reach][URL#L55]   

createAccessToken => json ;  
createPayment => json ;    
requestToPay => json ;  
getAcountBalance => json ;  
getBasicUserinfo => json ;  



###     Dir structure

        Projects/MTN_momo/
        ├── lib
        │   ├── products
        |   |   ├── collection.js
        |   |   ├── userProvisioning.js
        │   └── utils
        |       ├── fonctions.js
        ├── .gitignore
        ├── index.js
        ├──LICENSE
        ├──momo.test.js
        ├──package-lock.json
        ├──package.json 

###   Collection

collection is a MTN MOMO API product it is able to remote collection of bills, fees or taxes.  
> Ressources : [Collection](https://momodeveloper.mtn.com/API-collections#api=collection)

###     userProvisioning 
Useful for sandbox  user, you can ``POST`` your apiUser and your apikey or ``GET``
>Ressource : [sandbox User Provisioning](https://momodeveloper.mtn.com/API-collections#api=sandbox-provisioning-api&operation=post-v1_0-apiuser)
        

###   parameters :
**required :**  
*auth* : for Autorization, provide an dict({key : 'value'}) within  
>apikey(string) : your api key generate from user provisionning  
 apiUser(string) : your user id in UUID4 format.  

*subscriptionKey(string)* :  your Ocp-Apim-Subscription-Key  
*uuid(string)* : an UUID4  
*accessToken(string)* : your token create with ``POST CreateAccessToken``   

**no-required :**
    *cache(string)* : your cache option; ``default : 'no-cache'``  
    *root(string)* : your uri's root; ``default : 'https://sandbox.momodeveloper.mtn.com'``    
    *body* : useful in some case, provide yours in json object format in live session ``{'key' : 'value'}``  
    *env* : for X-Target-Environment, ``default : 'sandbox'`` 




example :
```javascript
const collection = require('mtnmomo');
const myfunc : async ()=>{
    const rep = await collection.createAccessToken({apiKey : '9481875d16d84243936834c6f01badf6', apiUser : 'de1355f7-d09e-467d-a37e-b38a704cfd87'}, '42e819df23934e7799c45cc42cb275c4');

    if(rep){
        console.info(rep);
    }

}

const 
;
```


