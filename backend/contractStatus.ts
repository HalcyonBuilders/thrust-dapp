import { Batch, ContractStore } from "../types/contractTypes";

export const msToDayHourMinSec = (
    timestamp: number
): { days: string; hours: string; minutes: string; seconds: string } => {
    // Calculate days, hours, minutes, and seconds
    const cSeconds = Math.floor(timestamp / 1000);
    const cMinutes = Math.floor(cSeconds / 60);
    const cHours = Math.floor(cMinutes / 60);
    const days = Math.floor(cHours / 24).toString();
    // Calculate remaining hours, minutes, and seconds
    const hours = (cHours % 24 < 10 ? "0" + (cHours % 24) : cHours % 24).toString();
    const minutes = (cMinutes % 60 < 10 ? "0" + (cMinutes % 60) : cMinutes % 60).toString();
    const seconds = (cSeconds % 60 < 10 ? "0" + (cSeconds % 60) : cSeconds % 60).toString();

    return { days, hours, minutes, seconds };
};

const current_timestamp = new Date().getTime();

export const getBatchOrNot = (contract: ContractStore): Batch => {
    if (
        contract.active &&
        contract.left > 0 &&
        contract.startTimestamp < current_timestamp &&
        contract.endTimestamp > current_timestamp &&
        contract.priceInCoins === 100000000000000
    ) {
        return Batch.Sui;
    } else if (
        contract.active &&
        contract.left > 0 &&
        contract.startTimestamp < current_timestamp &&
        contract.endTimestamp > current_timestamp &&
        contract.price === 100000000000000
    ) {
        return Batch.Coin;
    } else {
        return Batch.Closed;
    }
};
