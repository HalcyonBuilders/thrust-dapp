import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { UserObject, UserStore, ModalStore, TransactionStore } from "../types/userTypes";
import { Status } from "../types/contractTypes";

export const useUserStore = create<UserStore>((set) => ({
    status: "pending",
    address: "",
    magicNumber: 0,
    suiBalance: 0,
    receiptIds: [],
    setStatus: (status: Status): void =>
        set({
            status,
        }),
    setUser: (user: UserObject): void =>
        set({
            status: "success",
            address: user.address,
            magicNumber: user.magicNumber,
            suiBalance: user.suiBalance,
            receiptIds: user.receiptIds,
        }),
    shallow,
}));

export const useModalStore = create<ModalStore>((set) => ({
    modalContent: "",
    isModalOpened: false,
    setShowModal: (isModalOpened: boolean): void =>
        set({
            isModalOpened,
        }),
    setModalContent: (modalContent: string): void =>
        set({
            modalContent,
        }),
    shallow,
}));

export const useTransactionStore = create<TransactionStore>((set) => ({
    confirmed: false,
    disabled: false,
    setConfirmed: (confirmed: boolean): void =>
        set({
            confirmed,
        }),
    setDisabled: (disabled: boolean): void =>
        set({
            disabled,
        }),
    shallow,
}));
