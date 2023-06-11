import { Status } from "./contractTypes";

export interface UserObject {
    address: string;
    magicNumber: number;
    suiBalance: number;
    receiptIds: string[];
}

export interface UserStore extends UserObject {
    status: Status;
    setStatus: (_status: Status) => void;
    setUser: (_user: UserObject) => void;
}

export interface ModalStore {
    modalContent: string;
    isModalOpened: boolean;
    setShowModal: (_isModalOpened: boolean) => void;
    setModalContent: (_content: string) => void;
}

export interface TransactionStore {
    confirmed: boolean;
    disabled: boolean;
    setConfirmed: (_confirmed: boolean) => void;
    setDisabled: (_disabled: boolean) => void;
}
