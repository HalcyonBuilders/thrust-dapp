import { useConfigStore, useContractStore } from "../store/contractStore";
import { useEffect } from "react";

const useGetContractInfo = async (): Promise<void> => {
    const { setContract, setStatus } = useContractStore((state) => state);
    const config = useConfigStore();

    const fetchAndStoreContract = async (): Promise<void> => {
        try {
            setStatus("pending");
            const object = await config.provider.getObject({
                id: config.contract,
                options: { showContent: true },
            });
            const contract = object.data?.content.fields;
            console.log(object);

            setContract({
                active: contract.active,
                startTimestamp: contract.start_timestamp,
                endTimestamp: contract.end_timestamp,
                price: contract.price,
                priceInCoins: contract.price_in_coins,
                balance: contract.balance,
                supply: contract.supply,
                left: contract.left,
                testNft: {
                    packageId: contract.test_nft.fields.package_id,
                    moduleName: contract.test_nft.fields.module_name,
                    structName: contract.test_nft.fields.struct_name,
                    generics: contract.test_nft.fields.generics[0],
                },
                testCoin: {
                    packageId: contract.test_coin.fields.package_id,
                    moduleName: contract.test_coin.fields.module_name,
                    structName: contract.test_coin.fields.struct_name,
                    generics: contract.test_coin.fields.generics[0],
                },
            });
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setStatus("success");
        }
    };

    useEffect(() => {
        fetchAndStoreContract();
    }, [setContract, config, setStatus]);
};

export default useGetContractInfo;
