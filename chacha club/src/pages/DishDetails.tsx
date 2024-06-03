import { useParams } from "react-router-dom";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Divider from "@mui/material/Divider";
import {
  StyledDishCardDetails,
  StyledDishCardPrice,
} from "../components/DishCard/DishCardStyles";
import Header from "../components/Header/Header";
import IngredientsList from "../components/IngredientsList/IngredientsList";
import { Dish } from "../types/dish";
import ReviewList from "../components/ReviewList/ReviewList";
import CreateReviewForm from "../components/Forms/CreateReviewForm";
import useAuth from "../hooks/useAuth";

const DishDetails = ({ daily }: { daily?: boolean }) => {
  const { user } = useAuth();
  const [dish, setDish] = useState<Dish>({
    id: 0,
    name: "",
    image: "",
    weight: 0,
    price: 0,
    time_to_cook: 0,
    description: "",
    category_id: 0,
  });
  const { dishId } = useParams();

  useEffect(() => {
    console.log(dishId);

    window.scrollTo(0, 0);
    const fetchDish = async () => {
      try {
        let response;
        if (daily) {
          response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/dishes/daily-dish`
          );
        } else {
          response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/dishes?id=${dishId}`
          );
        }
        if (!response.ok) {
          throw new Error("Error fetching dish");
        }
        const data = await response.json();
        setDish(daily ? data : data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDish();
  }, [daily, dishId]);

  return (
    <Box minHeight={"100vh"}>
      <Header />
      <Grid container padding={"150px 150px 80px"} spacing={10}>
        <Grid item md={12} lg={6}>
          <Typography variant="h4" color={"#FFFFFF"} mb={3}>
            {dish.name}
          </Typography>

          <Box>
            <Box
              sx={{
                maxWidth: "100%",
                borderRadius: "10px",
              }}
              mb={3}
            >
              <img
                src={dish.image}
                alt={dish.name}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Box display={"flex"} justifyContent={"space-around"} mt={1}>
              <Box display={"flex"} alignItems={"center"}>
                <ScaleOutlinedIcon sx={{ color: "#FFFFFF" }} />
                <StyledDishCardDetails
                  variant="subtitle1"
                  color={"#FFFFFF"}
                  ml={1}
                >
                  {dish.weight} г
                </StyledDishCardDetails>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <StyledDishCardPrice variant="subtitle1" color={"#FFFFFF"}>
                  {dish.price} ₴
                </StyledDishCardPrice>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <AccessTimeOutlinedIcon sx={{ color: "#FFFFFF" }} />
                <StyledDishCardDetails
                  variant="subtitle1"
                  color={"#FFFFFF"}
                  ml={1}
                >
                  {dish.time_to_cook} хв
                </StyledDishCardDetails>
              </Box>
            </Box>

            <Box>
              <Divider
                sx={{
                  marginTop: "20px",
                  "&.MuiDivider-root::before": {
                    borderTop: "2px solid #8B2331",
                  },
                  "&.MuiDivider-root::after": {
                    borderTop: "2px solid #8B2331",
                  },
                }}
              >
                <Chip
                  label="Опис"
                  variant="filled"
                  sx={{
                    "&.MuiChip-root": {
                      backgroundColor: "#8B2331",
                      color: "#FFFFFF",
                      fontSize: "26px",
                      padding: "20px 20px",
                    },
                  }}
                />
              </Divider>

              <Typography variant="body1" color={"#FFFFFF"} mt={3}>
                {dish.description}
              </Typography>
            </Box>
            <Divider
              sx={{
                marginTop: "20px",
                "&.MuiDivider-root::before": {
                  borderTop: "2px solid #8B2331",
                },
                "&.MuiDivider-root::after": {
                  borderTop: "2px solid #8B2331",
                },
              }}
            >
              <Chip
                label="Інгрідієнти"
                variant="filled"
                sx={{
                  "&.MuiChip-root": {
                    backgroundColor: "#8B2331",
                    color: "#FFFFFF",
                    fontSize: "26px",
                    padding: "20px 20px",
                  },
                }}
              />
            </Divider>
            {dish.id && <IngredientsList dishId={dish.id.toString()} />}

            {!!user.id && (
              <>
                <Typography variant="h4" color={"#FFFFFF"} my={3}>
                  Залишити відгук
                </Typography>

                <CreateReviewForm dishId={dishId} />
              </>
            )}
          </Box>
        </Grid>
        <Grid item md={12} lg={6} width={"100%"}>
          <Box>
            <Divider
              sx={{
                marginTop: "20px",
                "&.MuiDivider-root::before": {
                  borderTop: "2px solid #8B2331",
                },
                "&.MuiDivider-root::after": {
                  borderTop: "2px solid #8B2331",
                },
              }}
            >
              <Chip
                label="Відгуки"
                variant="filled"
                sx={{
                  "&.MuiChip-root": {
                    backgroundColor: "#8B2331",
                    color: "#FFFFFF",
                    fontSize: "26px",
                    padding: "20px 20px",
                  },
                }}
              />
            </Divider>
            <ReviewList dishId={dishId} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DishDetails;
