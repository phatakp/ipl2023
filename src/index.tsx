import { domAnimation, LazyMotion } from "framer-motion";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { AppContext } from "./context";
import "./index.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            staleTime: 10 * 1000,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AppContext>
                        <LazyMotion features={domAnimation}>
                            <App />
                        </LazyMotion>
                    </AppContext>
                </BrowserRouter>
            </QueryClientProvider>
        </CookiesProvider>
    </React.StrictMode>
);
