import { useConfigStore } from "../store/contractStore";
import { useUserStore } from "../store/userStore";
import { BCS, getSuiMoveConfig, BcsWriter } from "@mysten/bcs";
import { useEffect } from "react";
import { ContractStore, Nft } from "../types/contractTypes";
import { PaginatedObjectsResponse, SuiObjectResponse } from "@mysten/sui.js";

const NFT_REGEX = /^(0x[a-f0-9]{63,64})::([a-zA-Z]{1,})::([a-zA-Z]{1,})$/;

const useGetUserInfo = (address: string | undefined, contract: ContractStore): void => {
    const bcs = new BCS(getSuiMoveConfig());
    const { setUser, setStatus } = useUserStore((state) => state);
    const config = useConfigStore();

    const computeMagicNumber = (addr: string): number => {
        const bcsWriter: BcsWriter = bcs.ser(BCS.ADDRESS, addr);
        const bytes: Uint8Array = bcsWriter.toBytes();
        return bytes[30] * bytes[31];
    };

    const getReceiptsForAddress = async (addr: string): Promise<string[]> => {
        let hasNextPage = true;
        let nextCursor = null;
        const nfts: Nft[] = [];

        while (hasNextPage) {
            const objects: PaginatedObjectsResponse = await config.provider.getOwnedObjects({
                owner: addr,
                cursor: nextCursor,
                options: { showType: true },
            });

            objects.data?.forEach((obj: SuiObjectResponse) => {
                if (obj.data?.type?.match(NFT_REGEX)) {
                    nfts.push(obj);
                }
            });
            hasNextPage = objects.hasNextPage;
            nextCursor = objects.nextCursor;
        }

        const filtered = nfts.filter((nft) => nft.data.type.match(`${config.package_id}::thrust::Receipt`));
        const mapped = filtered.map((nft) => nft.data.objectId);
        return mapped;
    };

    const getSuiBalance = async (addr: string): Promise<number> => {
        const suiBalance = await config.provider.getBalance({
            owner: addr,
        });

        return Number(suiBalance.totalBalance);
    };

    useEffect(() => {
        const fetchStoreUserInfo = async (addr: string): Promise<void> => {
            try {
                setStatus("pending");
                const magicNumber = computeMagicNumber(addr);
                const receiptIds = await getReceiptsForAddress(addr);
                const suiBalance = await getSuiBalance(addr);

                setUser({
                    address: addr,
                    magicNumber,
                    suiBalance,
                    receiptIds,
                });
            } catch (error) {
                console.error(error);
                setStatus("error");
            } finally {
                setStatus("success");
            }
        };

        if (address && contract.status === "success") {
            fetchStoreUserInfo(address);
        }
    }, [contract.status, address]);
};

export default useGetUserInfo;
