"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryTransport = void 0;
class MemoryTransport {
    constructor() {
        this.buf = [];
    }
    write(r) { this.buf.push(r); }
    dump() { return [...this.buf]; }
}
exports.MemoryTransport = MemoryTransport;
