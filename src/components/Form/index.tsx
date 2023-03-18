import { Spinner } from "components/Spinner";
import React from "react";
interface IForm {
    title?: string;
    isLoading: boolean;
    onFormSubmit: (e: React.FormEvent) => void;
    children: React.ReactNode;
}

export const Form = ({ title, isLoading, onFormSubmit, children }: IForm) => {
    return (
        <form
            className="z-20 mx-auto max-w-lg  md:min-h-[300px]"
            onSubmit={onFormSubmit}
        >
            {/* <h2 className="mb-4 text-center text-3xl font-bold uppercase text-gray-800">
                {title}
            </h2> */}
            <div className="flex flex-col items-center justify-center space-y-6">
                {children}
                <button
                    type="submit"
                    className="btn-orange my-8 rounded-full px-6 py-1"
                >
                    {isLoading ? (
                        <div className="mx-auto">
                            <Spinner />
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
        </form>
    );
};
