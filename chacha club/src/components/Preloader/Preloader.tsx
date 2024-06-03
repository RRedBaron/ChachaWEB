import { motion } from "framer-motion";

const Preloader = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <motion.div
      initial={{ opacity: 1 }} // начальное состояние - прозрачный
      animate={{ opacity: isLoading ? 1 : 0 }} // анимация появления и исчезновения
      transition={{ duration: 0.5 }} // длительность анимации
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/preloader-bg.jpg')",
        backgroundSize: "cover",
        zIndex: 999,
      }}
    ></motion.div>
  ) : null;
};

export default Preloader;
