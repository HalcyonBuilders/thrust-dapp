import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { ContractObject, ContractStore, Config, ConfigStore, Status } from "../types/contractTypes";
import { testnetConfig } from "../backend/config.testnet";

export const useConfigStore = create<ConfigStore>((set) => ({
    net: testnetConfig.net,
    provider: testnetConfig.provider,
    package_id: testnetConfig.package_id,
    contract: testnetConfig.contract,
    setConfig: (config: Config): void =>
        set({
            net: config.net,
            provider: config.provider,
            package_id: config.package_id,
            contract: config.contract,
        }),
}));

export const useContractStore = create<ContractStore>((set) => ({
    status: "pending",
    active: false,
    startTimestamp: 0,
    endTimestamp: 0,
    price: 0,
    priceInCoins: 0,
    balance: 0,
    supply: 0,
    left: 0,
    testNft: {
        packageId: "",
        moduleName: "",
        structName: "",
        generics: "",
    },
    testCoin: {
        packageId: "",
        moduleName: "",
        structName: "",
        generics: "",
    },
    setStatus: (status: Status): void =>
        set({
            status,
        }),
    setContract: (contract: ContractObject): void =>
        set({
            status: "success",
            active: contract.active,
            startTimestamp: Number(contract.startTimestamp),
            endTimestamp: Number(contract.endTimestamp),
            price: Number(contract.price),
            priceInCoins: Number(contract.priceInCoins),
            balance: Number(contract.balance),
            supply: Number(contract.supply),
            left: Number(contract.left),
            testNft: contract.testNft,
            testCoin: contract.testCoin,
        }),
    shallow,
}));
