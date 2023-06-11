import { JsonRpcProvider, devnetConnection } from "@mysten/sui.js";
import { Config } from "../types/contractTypes";

const provider = new JsonRpcProvider(devnetConnection);

// ---------- Objects IDs ----------

const net = "devnet";

const package_id = "0x963aa152ca6e179565849b3e2267a407cedcae4afab100329a54ab440aecaac9";

const contract = "0x94db597bb6a9850acfc01f709d4e09783f91c0661a4ca3eb3d978e5e7afedc60";

export const devnetConfig: Config = { net, provider, package_id, contract };
