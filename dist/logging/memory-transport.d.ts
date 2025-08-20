import { LogRecord, LogTransport } from "./transports.js";
export declare class MemoryTransport implements LogTransport {
    private buf;
    write(r: LogRecord): void;
    dump(): LogRecord[];
}
