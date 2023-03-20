import { AnimatedComponent } from "components/AnimatedComponent";
import { ModalForm } from "components/ModalForm";
import { useModal } from "context/ModalContext";
import { MatchAddForm } from "features/AuthPageLayout/forms/MatchAddForm";
import { IUser } from "interfaces/auth";
import { FaRupeeSign } from "react-icons/fa";

export const Profile = ({ user }: { user: IUser | undefined }) => {
    const { openModal } = useModal();

    return (
        <AnimatedComponent type="appear">
            <ModalForm title="Add Match">
                <MatchAddForm />
            </ModalForm>
            <div
                className={`relative w-full bg-cover bg-center bg-no-repeat p-8 pb-0`}
                style={{
                    backgroundImage: `url('${process.env.REACT_APP_IMAGE_URL}/teamBanners/${user?.winner?.shortname}.png')`,
                }}
            >
                <div className="items-between flex h-full max-w-[500px] flex-col justify-between rounded bg-gradient-to-tr from-black to-gray-700 p-2">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col items-start justify-center">
                            <div className="font-bold capitalize text-gray-500">
                                <span className="text-xl">{user?.name}</span>
                            </div>

                            <span className="inline-flex items-center text-4xl font-extrabold text-white md:mt-4 md:text-[3rem]">
                                #{user?.rank}
                                {user?.is_site_admin && (
                                    <button
                                        className="btn-orange ml-4 rounded px-2 py-1 text-sm"
                                        onClick={openModal}
                                    >
                                        + Match
                                    </button>
                                )}
                            </span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <img
                                src={`${process.env.REACT_APP_IMAGE_URL}/teamLogos/${user?.winner?.shortname}.png`}
                                className="h-16 w-16 sm:h-20 sm:w-20"
                                alt=""
                            />
                            <span className="text-sm text-yellow-600">
                                Doubles: {user?.doubles}
                            </span>
                        </div>
                    </div>

                    <div className="mx-auto mt-4 mb-2">
                        <span
                            className={`inline-flex items-center  font-extrabold ${
                                user?.amount && user.amount < 0
                                    ? "text-red-700"
                                    : "text-green-600"
                            }`}
                        >
                            <FaRupeeSign />
                            <span className="text-[3.5rem]">
                                {user?.amount.toFixed(2)}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </AnimatedComponent>
    );
};
