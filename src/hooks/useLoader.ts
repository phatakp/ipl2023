import { useCallback, useState } from "react";

export const useLoader = () => {
    const [loading, setLoading] = useState(false);
    const setLoader = useCallback((value: boolean) => setLoading(value), []);

    return { loading, setLoader };
};
