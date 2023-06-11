import { devnetConfig } from "./config.devnet";
import { testnetConfig } from "./config.testnet";
import { useConfigStore } from "../store/contractStore";
import { useEffect } from "react";
import { ConfigStore } from "../types/contractTypes";

const useGetConfig = (net: "devnet" | "testnet"): void => {
    const { setConfig } = useConfigStore((state: ConfigStore) => state);

    useEffect(() => {
        const config = net === "devnet" ? devnetConfig : testnetConfig;
        setConfig(config);
    }, [setConfig, net]);
};

export default useGetConfig;
