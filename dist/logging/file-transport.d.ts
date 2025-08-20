import { LogRecord, LogTransport } from "./transports.js";
export declare class FileTransport implements LogTransport {
    private dir;
    constructor(dir: string);
    write(r: LogRecord): void;
}
