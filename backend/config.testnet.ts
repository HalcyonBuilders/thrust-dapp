import { JsonRpcProvider, Connection } from "@mysten/sui.js";
import { Config } from "../types/contractTypes";

export const testnetConnection = new Connection({
    // fullnode: "https://fullnode.testnet.sui.io",
    fullnode: "https://sui-testnet-endpoint.blockvision.org",
    // fullnode: "https://sui-testnet.nodeinfra.com/",
    faucet: "",
});

const net = "testnet";

const provider = new JsonRpcProvider(testnetConnection);

// ---------- Objects IDs ----------

// test
// const package_id = "0x3f7724c72a7fec2996c1dd5bbbf8e13d59532e396c3c1eb9f0413505cfcf6629";
// const dispenser = "0x7b4b9db80e7416aae9d24fe3065deecb8963ad6a64a67af1265625b1a82f47b3";

// main
const package_id = "0x98c8b10337a98bc3f844253a6075e6db911948880346b989f6650364a09f76f0";
const contract = "0x3811685776bedf4af159128144edd470e7ba28a3878c6884bfe5c83ee4dda635";

export const testnetConfig: Config = { net, provider, package_id, contract };
