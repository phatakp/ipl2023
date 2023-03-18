import { AnimatedComponent } from "components/AnimatedComponent";
import { SliderChevron } from "components/SliderChevron";
import { useLoader } from "hooks/useLoader";
import { useMatches } from "hooks/useMatches";
import { IMatch } from "interfaces/matches";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { MatchCarouselItem } from "./MatchCarouselItem";

export const MatchCarousel = () => {
    const { isLoading, isError, error, data: matches } = useMatches();
    const { setLoader } = useLoader();

    useEffect(() => {
        setLoader(isLoading);
    }, [isLoading]);

    if (isError) {
        const message =
            (error as any)?.response?.data?.errors?.[0].detail ??
            "Internal Server Error";
        toast.error(message);
        return null;
    }

    let lastNum = matches
        ?.filter((match: IMatch) => match.scheduled)
        ?.sort((a: IMatch, b: IMatch) => a.num - b.num)?.[0]?.num;
    if (lastNum && lastNum > 3) lastNum = lastNum - 2;
    else lastNum = 0;

    const carousel = matches
        ?.filter((match: IMatch) => match.num > lastNum)
        .sort((a: IMatch, b: IMatch) => a.num - b.num);

    return (
        <AnimatedComponent type="slide">
            <div className="bg-darkblack my-4">
                <div className="relative flex items-center">
                    <SliderChevron direction="left" />

                    <div
                        id="slider"
                        className="container relative mx-auto overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
                    >
                        {carousel?.map((item: IMatch) => (
                            <MatchCarouselItem key={item.id} match={item} />
                        ))}
                    </div>

                    <SliderChevron direction="right" />
                </div>
            </div>
        </AnimatedComponent>
    );
};
