import { AnimatedComponent } from "components/AnimatedComponent";
import { MatchCarousel } from "features/DashboardPage/MatchCarousel";
import { TeamStandings } from "features/DashboardPage/TeamStandings";
import { TeamCircle } from "features/HomePage/TeamCircle";

export const HomePage = () => {
    return (
        <AnimatedComponent type="slide">
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3">
                <TeamCircle />
                <TeamStandings />
                <div className="md:col-span-3">
                    <MatchCarousel />
                </div>
            </div>
        </AnimatedComponent>
    );
};
