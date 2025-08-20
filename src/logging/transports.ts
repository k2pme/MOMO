export interface LogRecord {
    ts: string;           // ISO
    level: "info" | "error" | "debug";
    msg: string;
    meta?: any;
}

export interface LogTransport {
    write: (r: LogRecord) => void | Promise<void>;
    flush?: () => Promise<void>;
}
