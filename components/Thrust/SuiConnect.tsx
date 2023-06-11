import { ConnectButton, useWalletKit } from "@mysten/wallet-kit";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";

const SuiConnect = (): JSX.Element => {
    const { currentAccount, disconnect } = useWalletKit();

    return (
        <div id="sui-connect" className="ml-5">
            {currentAccount ? (
                <div className="flex items-center">
                    <Image
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="avatar"
                        src="/static/images/suiLogo.png"
                    />
                    <div>
                        {currentAccount.address.slice(0, 5)}...{currentAccount.address.slice(-5)}
                    </div>
                    <button
                        id="sui-disconnect"
                        className="text-gray-400 hover:text-blue-600 font-bold py-2 px-3 rounded-full"
                        onClick={(): Promise<void> => disconnect()}
                    >
                        <FiLogOut />
                    </button>
                </div>
            ) : (
                <ConnectButton connectText={"Connect Wallet"} />
            )}
        </div>
    );
};

export default SuiConnect;
