import { useWalletKit } from "@mysten/wallet-kit";

import useGetConfig from "../backend/useGetConfig";
import useGetUserInfo from "../backend/useGetUserInfo";
import useGetContractInfo from "../backend/useGetContractInfo";

import { useContractStore } from "../store/contractStore";
import { useUserStore } from "../store/userStore";

import Thrust from "../components/Thrust";

const ThrustDapp = (): JSX.Element => {
    const { currentAccount } = useWalletKit();
    useGetConfig("testnet");

    useGetContractInfo();
    const dispenser = useContractStore();

    useGetUserInfo(currentAccount?.address, dispenser);
    const user = useUserStore();

    console.log("USER STORE: ", user);
    console.log("DISPENSER STORE: ", dispenser);

    return <Thrust />;
};

export default ThrustDapp;
