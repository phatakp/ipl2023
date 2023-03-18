import { SharedLayout } from "components/SharedLayout";
import { AuthPageLayout } from "features/AuthPageLayout";
import { FormContainer } from "features/AuthPageLayout/FormContainer";
import { RequireAuth } from "features/AuthPageLayout/RequireAuth";
import { DashboardPage } from "features/DashboardPage";
import { HomePage } from "features/HomePage";
import { MatchDetailPage } from "features/MatchDetailPage";
import { MatchListPage } from "features/MatchListPage";
import { RulesPage } from "features/RulesPage";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<SharedLayout />}>
                <Route index element={<HomePage />} />
                <Route path="rules" element={<RulesPage />} />

                <Route path="matches">
                    <Route index element={<MatchListPage />} />
                    <Route element={<RequireAuth />}>
                        <Route path=":matchNum" element={<MatchDetailPage />} />
                    </Route>
                </Route>

                <Route element={<RequireAuth />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                </Route>

                <Route path="auth" element={<AuthPageLayout />}>
                    <Route path="login" element={<FormContainer />} />
                    <Route path="register" element={<FormContainer />} />
                    <Route path="validate-user" element={<FormContainer />} />
                    <Route path="reset-password" element={<FormContainer />} />
                    <Route path="logout" element={<HomePage />} />
                    <Route element={<RequireAuth />}>
                        <Route
                            path="change-password"
                            element={<FormContainer />}
                        />
                        <Route
                            path="change-winner"
                            element={<FormContainer />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
