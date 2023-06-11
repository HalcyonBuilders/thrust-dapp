import { useWalletKit } from "@mysten/wallet-kit";
import { SuiEvent, SuiTransactionBlockResponse, TransactionBlock } from "@mysten/sui.js";
import { useConfigStore } from "../store/contractStore";
import { useModalStore } from "../store/userStore";

import { Config } from "../types/contractTypes";

export const useSendTx = (): {
    buyNfts: () => Promise<void>;
    handleResult: (result: SuiTransactionBlockResponse, config: Config) => Promise<void>;
} => {
    const { signTransactionBlock } = useWalletKit();
    const config = useConfigStore((state) => state);
    const { setModalContent, setShowModal } = useModalStore((state) => state);

    const buyNfts = async (): Promise<void> => {
        try {
            const tx = new TransactionBlock();
            tx.moveCall({
                target: `${config.package_id}::bottles::buy_random_bottle`,
                typeArguments: [],
                arguments: [
                    tx.object(config.contract),
                    tx.gas,
                    tx.object("0x0000000000000000000000000000000000000000000000000000000000000006"),
                ],
            });

            const signedTx = await signTransactionBlock({
                transactionBlock: tx,
            });

            return await config.provider.executeTransactionBlock({
                transactionBlock: signedTx.transactionBlockBytes,
                signature: signedTx.signature,
                requestType: "WaitForLocalExecution",
                options: {
                    showEffects: true,
                    showEvents: true,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleResult = async (result: SuiTransactionBlockResponse, config: Config): Promise<void> => {
        if (!result) {
            console.log("Tx canceled");
        } else {
            if (result.effects.status.status !== "success") {
                // Show error
                console.log(`https://explorer.sui.io/txblock/${result.digest}?network=${config.net}`);
            } else {
                const receivedEvent = result.events.find(
                    (evt: SuiEvent) => evt.type === `${config.package_id}::thrust::NftsPurchase`
                );

                console.log(receivedEvent.parsedJson);
                // Update local state
                setModalContent("Purchase Successful");
                setShowModal(true);
            }
        }
    };

    return { buyNfts, handleResult };
};
