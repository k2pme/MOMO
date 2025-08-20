import 'dotenv/config';
import { MtnMomoClient } from '../src/index.ts'; // ← fichier, pas dossier

async function main() {
    const momo = new MtnMomoClient();
    const req = await momo.collection.requestToPay(1000, '225478963', 'EUR');
    console.log('requestToPay =>', req);

    const status = await momo.collection.getStatus(req.referenceId);
    console.log('status =>', status);

    const bal = await momo.collection.getBalance();
    console.log('balance =>', bal);


    // 1) Transfert (Disbursement)
    const tr = await momo.disbursement.transfer(1500, '242060000001', 'EUR');
    console.log('disbursement.transfer =>', tr);

    // 2) Statut du transfert
    const st = await momo.disbursement.getStatus(tr.referenceId);
    console.log('disbursement.getStatus =>', st);
}
main().catch((e) => {
    console.error('Smoke test error:', e?.response?.data || e);
    process.exit(1);
});
