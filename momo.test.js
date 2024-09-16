const collection = require('./lib/products/collection')



test('test1', async ()=>{

    await collection.createAccessToken({apiKey : '9481875d16d84243936834c6f01badf4', apiUser : 'de1355f7-d09e-467d-a37e-b38a704cfd86'}, '42e819df23934e7799c45cc42cb275c4')
    await collection.createPayment("eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImRlMTM1NWY3LWQwOWUtNDY3ZC1hMzdlLWIzOGE3MDRjZmQ4NiIsImV4cGlyZXMiOiIyMDI0LTAyLTI2VDIxOjQzOjA3LjAxOSIsInNlc3Npb25JZCI6ImJhMjMzMTFiLWMxOGYtNDM4My05OGQ1LWYyYmNlZDFhYTZhMyJ9.By3_HqGlAoPx7nOFTjEmwxQQ78bANadIGMz1Um8bLI6cdsmrXVrYW5YnxwF9N_n42V1TBG15v9HHkaHJXbuzuMZOcVNjglJ9W346DaJo3M0CnJD76fpv-7gEBO2C5aeISP3cqxaQNSZvnaov1bkGv1ua6pIp31ELJrDOZfaLIiJyGm-y1qINrJJFyzKPIWjR-7dIFlO24AfACDZ3g0SIfNm4NKaokb1KHdC8hEhJx4BPKGMKliTdCnqoJs-7AcVIqN96TXSNJtoWIBcCLzKXsYWaA_PYOHI0q4SrMSBwF7JONEHS_fTREu6sZt7T7ccegUzPWnHUJcfplejz-DzHww",  '42e819df23934e7799c45cc42cb275c4');
    await collection.getAccountBalance("eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImRlMTM1NWY3LWQwOWUtNDY3ZC1hMzdlLWIzOGE3MDRjZmQ4NiIsImV4cGlyZXMiOiIyMDI0LTAyLTI2VDExOjAyOjEyLjc5MiIsInNlc3Npb25JZCI6ImRlNDFlM2Q1LWRjNWItNGQyYy05MDhmLTlhZmQ1Zjk1ODFlNiJ9.jiVXo63X74cuHgFTZzgduhfuvytw8FHKWSVqR0W_57onqAYBFum_v8Ri9C92cc33TMwgZ906p_RgTu5KSYO7C27oy0smp75omsbPdHFRuFHJ7JbaKzHm2BD6P9PaekjL9ywSBWR1MgGYT2duEqtb4y1yIkLQbwZ1HIfSRNtkiSjA0OiAC4LchFBCPag3huI6JJDdUUbdvhz_SnDDfrLWRw6WmibILihE7aVw6V8jbiQtRKX24015UhVy49-lPHJF1C9UMFzGg5FajXj7aikbZWc0WgpXz2YoFIiPcwLWi7yyt1eA9rIFYhPidnxf5bkDKW8r3LROJ2iL5LmJj6r_lQ",  '42e819df23934e7799c45cc42cb275c4');
    await collection.getBasicUserInfo("eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImRlMTM1NWY3LWQwOWUtNDY3ZC1hMzdlLWIzOGE3MDRjZmQ4NiIsImV4cGlyZXMiOiIyMDI0LTAyLTI2VDEyOjA2OjM5LjQ2NyIsInNlc3Npb25JZCI6ImJkMWU2ZGQyLTkyYTEtNGJlOS05ZDU3LWNjMGY5N2UzZjI5OSJ9.dRw6mjRGZlGroe_Mmhv617zpa4mmnjp-Pkv6EwhE8B93izIWDwKg-ukg7D08CGReFsAbvpThZ1sA8ZqymiTacX7ohcAbz6Yn5-5dQbJDuimx72cO10EY9vA-Zzbh1epiHUVsGL5gzZYH0fSwJExBy9wX0U-ggA4-X-mvKFFoG4AvJjHPuf5kg8E1vhQ0JoVXcWTSVf7XJYu92iQWejJ4JpjZ03YPWH0m4Y5cH3IG6fyNhYwpbZsxwF5ln7qP_OXHx8vkdRp40iDIxNGH0JzH3GTqjWXQaFmjv38zKoxLBxPhm8FWg937YDw8EPrEnnc6smodm2qnZeqv_uYaf3LUPg",  '42e819df23934e7799c45cc42cb275c4');


});