"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTransport = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
function ensureDir(dir) {
    if (!node_fs_1.default.existsSync(dir))
        node_fs_1.default.mkdirSync(dir, { recursive: true });
}
function todayName() {
    const d = new Date();
    const YYYY = d.getFullYear();
    const MM = String(d.getMonth() + 1).padStart(2, "0");
    const DD = String(d.getDate()).padStart(2, "0");
    return `${YYYY}-${MM}-${DD}.log`;
}
class FileTransport {
    constructor(dir) {
        this.dir = dir;
        ensureDir(dir);
    }
    write(r) {
        const file = node_path_1.default.join(this.dir, todayName());
        const line = JSON.stringify(r) + "\n";
        node_fs_1.default.appendFileSync(file, line, { encoding: "utf8" });
    }
}
exports.FileTransport = FileTransport;
