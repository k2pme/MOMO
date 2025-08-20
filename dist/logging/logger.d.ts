export declare class Logger {
    private transport;
    private levelOrder;
    private min;
    constructor(opts?: {
        dir?: string;
        level?: "info" | "error" | "debug";
        transport?: "file" | "memory";
    });
    private log;
    info(msg: string, meta?: any): void;
    error(msg: string, meta?: any): void;
    debug(msg: string, meta?: any): void;
}
