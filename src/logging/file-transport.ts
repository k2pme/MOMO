import fs from "node:fs";
import path from "node:path";
import { LogRecord, LogTransport } from "./transports.js";

function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function todayName() {
    const d = new Date();
    const YYYY = d.getFullYear();
    const MM = String(d.getMonth()+1).padStart(2,"0");
    const DD = String(d.getDate()).padStart(2,"0");
    return `${YYYY}-${MM}-${DD}.log`;
}

export class FileTransport implements LogTransport {
    constructor(private dir: string) { ensureDir(dir); }
    write(r: LogRecord) {
        const file = path.join(this.dir, todayName());
        const line = JSON.stringify(r) + "\n";
        fs.appendFileSync(file, line, { encoding: "utf8" });
    }
}
