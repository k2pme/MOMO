import { LogRecord, LogTransport } from "./transports.js";

export class MemoryTransport implements LogTransport {
    private buf: LogRecord[] = [];
    write(r: LogRecord) { this.buf.push(r); }
    dump(): LogRecord[] { return [...this.buf]; }
}
