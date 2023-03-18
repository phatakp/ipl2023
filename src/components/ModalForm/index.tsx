import { useModal } from "context/ModalContext";
import React from "react";

export const ModalForm = ({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) => {
    const { showModal, closeModal } = useModal();
    return (
        // <!-- Main modal -->
        <div
            id="staticModal"
            data-modal-backdrop="static"
            tabIndex={-1}
            aria-hidden="true"
            className={`top-24 z-50 h-[calc(100%-1rem)] w-full overflow-y-auto overflow-x-hidden border-2 p-4 md:left-[5%] lg:left-[20%] ${
                showModal ? "fixed" : "hidden"
            }`}
        >
            <div className="relative h-full w-full max-w-2xl md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative rounded-lg bg-white shadow">
                    {/* <!-- Modal header --> */}
                    <div className="bg-darkblue flex items-start justify-between rounded-t border-b border-gray-600 p-4">
                        <h3 className="bg-darkblue text-xl font-semibold text-white">
                            {title}
                        </h3>
                        <button
                            type="button"
                            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="staticModal"
                            onClick={closeModal}
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div
                        className="space-y-6 bg-cover bg-center bg-no-repeat p-6"
                        style={{
                            backgroundImage: `url('${process.env.REACT_APP_IMAGE_URL}/scheduleBg.jpg')`,
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
    // return (
    //     <Modal
    //         show={showModal}
    //         size="lg"
    //         popup={true}
    //         onClose={closeModal}
    //         className="bg-darkblue"
    //     >
    //         <Modal.Header className="bg-gradient-to-r from-black to-gray-700 text-white" />
    //         <Modal.Body className="bg-gradient-to-r from-black to-gray-700">
    //             {children}
    //         </Modal.Body>
    //     </Modal>
    // );
};
