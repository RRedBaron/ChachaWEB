import Card from "@mui/material/Card";
import { Box, CardActionArea, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Dish } from "../../types/dish";
import React from "react";
import {
  StyledDishCardTitle,
  StyledDishCardPrice,
  StyledDishCardDetails,
} from "./DishCardStyles";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

interface DishCardProps {
  dish: Dish;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  return (
    <Card
      sx={{
        width: "360px",
        height: "350px",
        transition: "transform 0.5s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="240" image={dish.image} alt="Dish" />
        <CardContent sx={{ padding: "10px 30px", backgroundColor: "#DDDDDD" }}>
          <StyledDishCardTitle>{dish.name}</StyledDishCardTitle>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <ScaleOutlinedIcon sx={{ color: "#000000" }} />
              <StyledDishCardDetails
                variant="subtitle1"
                color={"#000000"}
                ml={1}
              >
                {dish.weight} г
              </StyledDishCardDetails>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <StyledDishCardPrice variant="subtitle1" color={"#8B2331"}>
                {dish.price} ₴
              </StyledDishCardPrice>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <AccessTimeOutlinedIcon sx={{ color: "#000000" }} />
              <StyledDishCardDetails
                variant="subtitle1"
                color={"#000000"}
                ml={1}
              >
                {dish.time_to_cook} хв
              </StyledDishCardDetails>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DishCard;
