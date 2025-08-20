"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const file_transport_js_1 = require("./file-transport.js");
const memory_transport_js_1 = require("./memory-transport.js");
class Logger {
    constructor(opts) {
        this.levelOrder = { debug: 10, info: 20, error: 30 };
        this.min = "info";
        this.min = opts?.level || "info";
        const isNode = typeof process !== "undefined" && !!process.versions?.node;
        if (opts?.transport === "memory")
            this.transport = new memory_transport_js_1.MemoryTransport();
        else if (opts?.transport === "file")
            this.transport = new file_transport_js_1.FileTransport(opts?.dir || "./logs");
        else
            this.transport = isNode ? new file_transport_js_1.FileTransport(opts?.dir || "./logs") : new memory_transport_js_1.MemoryTransport();
    }
    log(level, msg, meta) {
        if (this.levelOrder[level] < this.levelOrder[this.min])
            return;
        const rec = { ts: new Date().toISOString(), level, msg, meta };
        this.transport.write(rec);
    }
    info(msg, meta) { this.log("info", msg, meta); }
    error(msg, meta) { this.log("error", msg, meta); }
    debug(msg, meta) { this.log("debug", msg, meta); }
}
exports.Logger = Logger;
