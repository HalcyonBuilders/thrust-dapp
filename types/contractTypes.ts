/* eslint-disable no-unused-vars */
import { JsonRpcProvider } from "@mysten/sui.js";

export type Status = "pending" | "success" | "error";

export interface Config {
    net: "devnet" | "testnet";
    provider: JsonRpcProvider;
    package_id: string;
    contract: string;
}

export interface ConfigStore extends Config {
    setConfig: (_config: Config) => void;
}

export interface Nft {
    data: {
        digest: string;
        objectId: string;
        type: string;
        version: string;
    };
}

export interface StructTag {
    packageId: string;
    moduleName: string;
    structName: string;
    generics: string;
}

export interface ContractObject {
    active: boolean;
    startTimestamp: number;
    endTimestamp: number;
    price: number;
    priceInCoins: number;
    balance: number;
    supply: number;
    left: number;
    testNft: StructTag;
    testCoin: StructTag;
}

export interface ContractStore extends ContractObject {
    status: Status;
    setStatus: (_status: Status) => void;
    setContract: (_contract: ContractObject) => void;
}

export enum Batch {
    Sui,
    Coin,
    Closed,
}
