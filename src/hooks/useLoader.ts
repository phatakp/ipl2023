import { useState } from "react";

export const useLoader = () => {
    const [loading, setLoading] = useState(false);
    const setLoader = (value: boolean) => setLoading(value);

    return { loading, setLoader };
};
