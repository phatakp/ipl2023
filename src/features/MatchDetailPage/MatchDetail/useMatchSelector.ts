import { useState } from "react";

export const useMatchSelector = (initial?: boolean) => {
    const [statsPage, setStatsPage] = useState(!!initial);

    const setPageToStats = () => setStatsPage(true);
    const setPageToPredictions = () => setStatsPage(false);

    return { statsPage, setPageToStats, setPageToPredictions };
};
