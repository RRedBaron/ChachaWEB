import { Grid } from "@mui/material";
import DishCard from "../DishCard/DishCard";
import { useEffect } from "react";
import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchDishesByCategoryId } from "../../redux/slices/dishesSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface DishListProps {
  categoryId: number;
  limit: number;
  page: number;
}

const DishList: React.FC<DishListProps> = ({ categoryId, limit, page }) => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state) => {
    if (Array.isArray(state.dishes.dishes)) {
      return state.dishes.dishes;
    }
    return [state.dishes.dishes];
  });

  useEffect(() => {
    dispatch(fetchDishesByCategoryId({ categoryId, limit, page }));
  }, [categoryId, page, dispatch]);

  return (
    <AnimatePresence>
      <Grid container justifyContent={"center"} spacing={5} maxWidth={"1344px"}>
        {dishes.map((dish, index) => (
          <Grid item key={dish.id}>
            <Link to={`/dishes/${dish.id}`} style={{ textDecoration: "none" }}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, delay: index * 0.2 },
                  },
                }}
                className="item"
              >
                <DishCard dish={dish} />
              </motion.div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </AnimatePresence>
  );
};

export default DishList;
