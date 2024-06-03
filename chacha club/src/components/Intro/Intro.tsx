import { Box } from "@mui/material";
import {
  StyledIntro,
  StyledIntroTitle,
  IntroContentWrapper,
  StyledIntroButton,
} from "./IntroStyles.ts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const images = ["/assets/banner1.jpg", "/assets/banner4.jpg"];

const introWrapper = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const intro = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Intro = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight + 220,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={introWrapper}
      transition={{ duration: 1 }}
    >
      <StyledIntro
        component={"section"}
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <IntroContentWrapper>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={intro}
            transition={{ duration: 1 }}
          >
            <StyledIntroTitle textAlign={"center"} boxShadow={""} mt={20}>
              Чарівний світ грузинської культури в “Chacha club”
            </StyledIntroTitle>
          </motion.div>

          <Box sx={{ display: "flex", gap: "60px", margin: "0 auto" }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={intro}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <StyledIntroButton variant="contained" onClick={handleScroll}>
                Меню
              </StyledIntroButton>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={intro}
              transition={{ duration: 1, delay: 1 }}
            >
              <StyledIntroButton variant="contained">
                <Link to={"/dishes/daily-dish"}>Страва дня</Link>
              </StyledIntroButton>
            </motion.div>
          </Box>
        </IntroContentWrapper>
      </StyledIntro>
    </motion.div>
  );
};

export default Intro;
