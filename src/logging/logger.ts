import { FileTransport } from "./file-transport.js";
import { MemoryTransport } from "./memory-transport.js";
import { LogRecord, LogTransport } from "./transports.js";

export class Logger {
    private transport: LogTransport;
    private levelOrder = { debug: 10, info: 20, error: 30 };
    private min = "info" as "info"|"error"|"debug";

    constructor(opts?: { dir?: string; level?: "info"|"error"|"debug"; transport?: "file"|"memory" }) {
        this.min = opts?.level || "info";
        const isNode = typeof process !== "undefined" && !!(process.versions as any)?.node;
        if (opts?.transport === "memory") this.transport = new MemoryTransport();
        else if (opts?.transport === "file") this.transport = new FileTransport(opts?.dir || "./logs");
        else this.transport = isNode ? new FileTransport(opts?.dir || "./logs") : new MemoryTransport();
    }

    private log(level: "info"|"error"|"debug", msg: string, meta?: any) {
        if (this.levelOrder[level] < this.levelOrder[this.min]) return;
        const rec: LogRecord = { ts: new Date().toISOString(), level, msg, meta };
        this.transport.write(rec);
    }

    info(msg: string, meta?: any)  { this.log("info",  msg, meta); }
    error(msg: string, meta?: any) { this.log("error", msg, meta); }
    debug(msg: string, meta?: any) { this.log("debug", msg, meta); }
}
