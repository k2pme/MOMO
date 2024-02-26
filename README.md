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
    

## Usage 

After having all dependances by downloading them with npm install, otherwase they can be had from package.json, and be registred to [MTN MOMO web site](https://momodeveloper.mtn.com/)

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
        

####       createAccessToken() => {}
This function is used to create an access token which can then be used to authorize and authenticate towards the other end-points of the API.

####            parameters :
**required :**
auth : for Autorization, provide an dict({key : 'value'}) within
            ~apikey(string) : your api key generate from user provisionning
            ~apiUser(string) : your user id in UUID4 format.
subscriptionKey :  your Ocp-Apim-Subscription-Key

no-required :
    cache(string) : your cache option; default : 'no-cache'
    root(string) : your uri's root; default : 'https://sandbox.momodeveloper.mtn.com'


example :
```javascript
const collection = require('mtnmomo');
const myfunc : async ()=>{
    const rep = await collection.createAccessToken({apiKey : '9481875d16d84243936834c6f01badf6', apiUser : 'de1355f7-d09e-467d-a37e-b38a704cfd87'}, '42e819df23934e7799c45cc42cb275c4');

    if(rep){
        console.info(rep);
    }

};
```


