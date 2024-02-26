const sandbox = require("./lib/products/userProvisioning");
const wichtig = require("./lib/utils/functions");
const { postUser } = require("./lib/utils/var");
const collection = require('./lib/products/collection')


test('test1', async ()=>{

    //await collection.createAccessToken({apiKey : '9481875d16d84243936834c6f01badf4', apiUser : 'de1355f7-d09e-467d-a37e-b38a704cfd86'}, '42e819df23934e7799c45cc42cb275c4')
    await collection.createPayment("eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImRlMTM1NWY3LWQwOWUtNDY3ZC1hMzdlLWIzOGE3MDRjZmQ4NiIsImV4cGlyZXMiOiIyMDI0LTAyLTI2VDExOjAyOjEyLjc5MiIsInNlc3Npb25JZCI6ImRlNDFlM2Q1LWRjNWItNGQyYy05MDhmLTlhZmQ1Zjk1ODFlNiJ9.jiVXo63X74cuHgFTZzgduhfuvytw8FHKWSVqR0W_57onqAYBFum_v8Ri9C92cc33TMwgZ906p_RgTu5KSYO7C27oy0smp75omsbPdHFRuFHJ7JbaKzHm2BD6P9PaekjL9ywSBWR1MgGYT2duEqtb4y1yIkLQbwZ1HIfSRNtkiSjA0OiAC4LchFBCPag3huI6JJDdUUbdvhz_SnDDfrLWRw6WmibILihE7aVw6V8jbiQtRKX24015UhVy49-lPHJF1C9UMFzGg5FajXj7aikbZWc0WgpXz2YoFIiPcwLWi7yyt1eA9rIFYhPidnxf5bkDKW8r3LROJ2iL5LmJj6r_lQ",  '42e819df23934e7799c45cc42cb275c4')
});