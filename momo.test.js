const sandbox = require("./lib/products/userProvisioning");
const wichtig = require("./lib/utils/functions");
const { postUser } = require("./lib/utils/var");
const collection = require('./lib/products/collection')


test('test1', async ()=>{

    await collection.createAccessToken({apiKey : '9481875d16d84243936834c6f01badf4', apiUser : 'de1355f7-d09e-467d-a37e-b38a704cfd86'}, '42e819df23934e7799c45cc42cb275c4')
    collection.requestToPay()
});