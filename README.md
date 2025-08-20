# MOMO

This package provides a **modern and simple SDK** for the **MTN Mobile Money (MoMo) API**, supporting both **sandbox** and **production** environments.

- ✅ Automatic provisioning (`apiUser` / `apiKey`) if not already provided
- ✅ OAuth token caching per product (30 minutes)
- ✅ Supports all 3 products: **Collection**, **Disbursement**, **Remittance**
- ✅ Auto generation of `X-Reference-Id` (UUID v4)
- ✅ Daily logs (`./logs/YYYY-MM-DD.log`)
- ✅ Works with **Node.js** (CommonJS & ESM)
- ✅ Can also be used in the **browser** with a custom transport (proxy through your backend)

---


- [How install it](#Installation)
- [Usage](#usage)
- [Functions](#mains-functions)
- [Examples](#examples)


## Installation

- From source :
```bash
git clone https://github.com/k2pme/MOMO.git   
cd MOMO 
npm install
npm run build
npm pack
# then install the .tgz in your Node project   
```
        
- With npm :
```bash
npm i mtnapimomo
```

# Configuration (.env)

Create a `.env` file:

```dotenv
# MTN endpoints
MTN_API_BASE_URL=https://sandbox.momodeveloper.mtn.com
MTN_API_ENVIRONMENT=sandbox

# Callback host required for provisioning (hostname only, no http/https)
MTN_URL_CALLBACK=callback.yourdomain.com

# Subscription Keys (from MTN Developer Portal)
MTN_COLLECTION_SUBSCRIPTION_KEY=xxxxxxxxxxxxxxxx
MTN_DISBURSEMENT_SUBSCRIPTION_KEY=yyyyyyyyyyyyyy
MTN_REMITTANCE_SUBSCRIPTION_KEY=zzzzzzzzzzzzzz

# (Optional) bypass provisioning if you already have apiUser/apiKey
# MTN_COLLECTION_API_USER=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# MTN_COLLECTION_API_KEY=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
# MTN_DISBURSEMENT_API_USER=...
# MTN_DISBURSEMENT_API_KEY=...
# MTN_REMITTANCE_API_USER=...
# MTN_REMITTANCE_API_KEY=...

# Logs
MOMO_LOG_DIR=./logs
MOMO_LOG_LEVEL=info

```

# Usage (Generic JavaScript Example)

```javascript
async function main() {
  const momo = new MtnMomoClient();

  // --- COLLECTION ---
  const req = await momo.collection.requestToPay(1000, '242060000000', 'XAF');
  console.log('requestToPay =>', req);

  const status = await momo.collection.getStatus(req.referenceId);
  console.log('status =>', status);

  const balance = await momo.collection.getBalance();
  console.log('collection balance =>', balance);

  // --- DISBURSEMENT ---
  const disb = await momo.disbursement.transfer(1500, '242060000001', 'XAF');
  console.log('disbursement.transfer =>', disb);

  const dStatus = await momo.disbursement.getStatus(disb.referenceId);
  console.log('disbursement status =>', dStatus);

  // --- REMITTANCE ---
  const rem = await momo.remittance.cashTransfer(2000, '242060000002', 'XAF');
  console.log('remittance.cashTransfer =>', rem);

  const rStatus = await momo.remittance.getTransferStatus(rem.referenceId);
  console.log('remittance status =>', rStatus);

  const rBalance = await momo.remittance.getAccountBalance();
  console.log('remittance balance =>', rBalance);
}

main().catch((e) => {
  console.error('MoMo test error:', e?.response?.data || e);
  process.exit(1);
});
```

# Available Functions

## Collection

- `requestToPay(amount, msisdn, currency?)`

- `getStatus(referenceId)`

- `getBalance()`

- `validateAccount(msisdn)`

## Disbursement

- `transfer(amount, msisdn, currency?)`

- `getStatus(referenceId)`

## Remittance

- `cashTransfer(amount, msisdn, currency?)`

- `getTransferStatus(referenceId)`

- `getAccountBalance()`


# Logs

Every action is logged automatically.
Logs are written to `./logs/YYYY-MM-DD.log`.

Example log line:

```json
{"ts":"2025-08-20T16:32:07.900Z","level":"info","msg":"[Collection:RequestToPay] Success","meta":{"ref":"...","amount":"1000","currency":"XAF","phone":"242060000000"}}
```

###   Collection

collection is an MTN MOMO API product used for remote collection of bills, fees or taxes.  
> Ressources : [Collection](https://momodeveloper.mtn.com/API-collections#api=collection)

###     userProvisioning 
Useful for sandbox  users, you can ``POST`` your apiUser and your apikey or ``GET``
>Ressource : [sandbox User Provisioning](https://momodeveloper.mtn.com/API-collections#api=sandbox-provisioning-api&operation=post-v1_0-apiuser)


> More ? See these videos   
    [![Part 1](https://i.ytimg.com/an_webp/YcjFS-x1k6U/mqdefault_6s.webp?du=3000&sqp=CPfE9K4G&rs=AOn4CLBN06CmTX_M6m4jW09JSFcAMMybSw)](https://www.youtube.com/watch?v=YcjFS-x1k6U)   
    [![Part 2](https://i.ytimg.com/an_webp/YcjFS-x1k6U/mqdefault_6s.webp?du=3000&sqp=CPfE9K4G&rs=AOn4CLBN06CmTX_M6m4jW09JSFcAMMybSw)](https://www.youtube.com/watch?v=Dx4MPR4yONQ&t=762s)   

## Licence   

This project is licensed under the [LICENSE](./LICENSE)


## Author
* github : @k2pme  
