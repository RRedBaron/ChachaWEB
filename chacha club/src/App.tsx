import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "styled-components";
import theme from "./theme.ts";
import Footer from "./components/Footer/Footer.tsx";
import DishDetails from "./pages/DishDetails.tsx";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import useAuth from "./hooks/useAuth.ts";
import EmailVerified from "./pages/EmailVerified.tsx";
import Preloader from "./components/Preloader/Preloader.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound.tsx";

document.body.style.backgroundColor = theme.palette.primary.main;

const App = () => {
  const { user, loading } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Preloader isLoading={loading} />
      <ToastContainer
        style={{ maxWidth: "45vw" }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dishes/:dishId" element={<DishDetails />} />
        <Route path="/dishes/daily-dish" element={<DishDetails daily />} />
        <Route
          path="/signup"
          element={user.id ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route
          path="/login"
          element={user.id ? <Navigate to={"/"} /> : <SignIn />}
        />
        <Route path="/verify/:token" element={<EmailVerified />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </ThemeProvider>
  );
};

export default App;
