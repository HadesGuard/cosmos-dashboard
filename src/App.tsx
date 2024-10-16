import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { ROUTES } from "./constants/routes";
import SignIn from "./views/SignIn";
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import Loading from "./components/Loading";

const App = () => {
  useEffect(() => {
    localStorage.setItem("themeMode", "dark");
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
