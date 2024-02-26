# MOMO

Momo is an electronic wallet by MTN. Use this package to easily access the MTN MOMO API in sandbox and in live environments.     


- [How set it up](#setup)
- [Usage](#usage)
- [Functions](#mains-functions)
- [Examples](#examples)


## Setup

- From GitHub :
```bash
git clone https://github.com/k2pme/MOMO.git   
cd MOMO    
```
        

- With npm :
```bash
npm install mtnmomocollection
```
>Or do you wanna test ?   

```bash
git clone https://github.com/k2pme/MOMO.git   
cd MOMO 
npm install
npm test 
```   
After that, edit the [Test File](./momo.test.js).
See an exemple below.

# Usage 

After installing all dependencies using npm install, you can register at the [MTN MOMO web site](https://momodeveloper.mtn.com/)

# Functions

- sandbox User Provisioning  
- collection :     

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

collection is an MTN MOMO API product used for remote collection of bills, fees or taxes.  
> Ressources : [Collection](https://momodeveloper.mtn.com/API-collections#api=collection)

###     userProvisioning 
Useful for sandbox  users, you can ``POST`` your apiUser and your apikey or ``GET``
>Ressource : [sandbox User Provisioning](https://momodeveloper.mtn.com/API-collections#api=sandbox-provisioning-api&operation=post-v1_0-apiuser)
        

###   parameters :
- **required :**  
    * *auth* :   
        for Autorization, provide an object({key : 'value'}) within  
        >   apikey(string) : your api key generate from user provisionning  
            apiUser(string) : your user ID in UUID4 format.  

    * *subscriptionKey(string)* :    
        your Ocp-Apim-Subscription-Key  
    * *uuid(string)* :   
        an UUID4  
    * *accessToken(string)* :   
        your token create with ``POST CreateAccessToken``   

- **not required :**  
    * *cache(string)* :   
        your cache option;   
        ``default : 'no-cache'``  
    * *root(string)* :   
        your root URI;  
        ``default : 'https://sandbox.momodeveloper.mtn.com'``    
    * *body* :   
        useful in some cases, provide yours in json object format in live session   
        ``{'key' : 'value'}``   
    * *env* :   
        for X-Target-Environment;
        ``default : 'sandbox'``  .




## Examples :

 - Test programe 
```javascript
const {collection} = require('mtnmomocollection');


test('test1', async ()=>{

    const auth = {
        apiKey : '9481875d16d84243936834c6f01badf6', 
        apiUser : 'de1355f7-d09e-467d-a37e-b38a704cfd87'
    };

    const subscriptionKey = '42e819df23934e7799c45cc42cb275c4';

    const rep = await collection.createAccessToken(auth, subscriptionKey);

    if(rep){
        console.info(rep);
    }

});
```
- Create an access token
```javascript
const {collection} = require('mtnmomocollection');


const myfunc : async ()=>{

    const auth = {
        apiKey : '9481875d16d84243936834c6f01badf6', 
        apiUser : 'de1355f7-d09e-467d-a37e-b38a704cfd87'
    };

    const subscriptionKey = '42e819df23934e7799c45cc42cb275c4';

    const rep = await collection.createAccessToken(auth, subscriptionKey);

    if(rep){
        console.info(rep);
    }

}

myfunc();
;
```
## Licence   

This project is licensed under the [LICENSE](./LICENSE)

## Contributions 

It would be so amazing to collaborate with your, Please reach out to me via my [email](cmantsila0@gmail.com) :-)

## Author

Clodlin MANTSILA  
* github : @k2pme  
* email : cmantsila0@gmail.com  



