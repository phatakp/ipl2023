import { useWindowDimensions } from "hooks/useWindowDimensions";

export const SliderChevron = ({
    direction,
}: {
    direction: "left" | "right";
}) => {
    const { width } = useWindowDimensions();
    return (
        <img
            onClick={() => slide(direction, width)}
            className={`absolute ${direction}-0 z-10 cursor-pointer rounded-full p-4 hover:bg-pink-600`}
            src={`${process.env.REACT_APP_IMAGE_URL}/${direction}-chevron.svg`}
        />
    );
};

const slide = (direction: "left" | "right", width: number) => {
    const slider = document.getElementById("slider");
    if (direction === "left") {
        slider!.scrollLeft = slider!.scrollLeft - width;
    } else {
        slider!.scrollLeft = slider!.scrollLeft + width;
    }
};
