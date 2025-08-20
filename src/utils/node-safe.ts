export const isNode = () => typeof process !== "undefined" && !!(process.versions as any)?.node;
