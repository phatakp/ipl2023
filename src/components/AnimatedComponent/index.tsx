import { m, Variants } from "framer-motion";
import React from "react";

interface IAnimatedComponent {
    children: React.ReactNode;
    type?: "appear" | "slide";
}

const slideVariants: Variants = {
    offscreen: {
        x: 100,
        opacity: 0,
    },
    onscreen: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const appearVariants: Variants = {
    offscreen: {
        opacity: 0,
    },
    onscreen: {
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 1,
        },
    },
};

export const AnimatedComponent = ({
    children,
    type = "appear",
}: IAnimatedComponent) => {
    return (
        <m.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={type === "appear" ? appearVariants : slideVariants}
        >
            {children}
        </m.div>
    );
};
