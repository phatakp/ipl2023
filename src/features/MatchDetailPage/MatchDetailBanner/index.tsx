import { AnimatedComponent } from "components/AnimatedComponent";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import React from "react";

export const MatchDetailBanner = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { width } = useWindowDimensions();
    const img =
        width < 600
            ? `url('${process.env.REACT_APP_IMAGE_URL}/hero-bg-mobile.jpg')`
            : `url('${process.env.REACT_APP_IMAGE_URL}/hero-bg.jpg')`;

    return (
        <AnimatedComponent>
            <div
                className={`relative w-screen bg-cover bg-center bg-no-repeat p-2`}
                style={{ backgroundImage: img }}
            >
                <div className="mx-auto text-center text-white lg:container">
                    {children}
                </div>
            </div>
        </AnimatedComponent>
    );
};
