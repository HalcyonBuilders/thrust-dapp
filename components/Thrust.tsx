import { useEffect } from "react";
import { useModalStore } from "../store/userStore";

// import Interactions from './Thrust/Interactions';
// import Connection from './Thrust/Connection/Connection';
// import Inventory from './Thrust/Inventory';
// import BatchStatus from './Thrust/BatchStatus';
import ResultModal from "./Thrust/Utils/ResultModal";
import { ModalStore } from "../types/userTypes";

const Thrust = (): JSX.Element => {
    const { isModalOpened } = useModalStore((state: ModalStore) => state);

    // Disable scrolling while modal is opened
    useEffect(() => {
        if (isModalOpened) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpened]);

    return (
        <div className="relative h-[300vh] w-full p-0">
            <div className="heroHeader sticky top-0 z-20 h-[110vh]">{isModalOpened && <ResultModal />}</div>
        </div>
    );
};

export default Thrust;
