import { useEffect } from "react";
import Intro from "../components/Intro/Intro";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import Menu from "../components/Menu/Menu";
import Header from "../components/Header/Header";
import About from "../components/About/About";
import { useAppSelector } from "../hooks/useAppSelector";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isVerified } = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Intro />
      <About />
      <Menu />
    </>
  );
};

export default Home;
