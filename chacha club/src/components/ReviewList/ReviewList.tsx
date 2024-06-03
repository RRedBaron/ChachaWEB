import { useEffect, useState } from "react";
import { Review } from "../../types/review";
import { Box, Typography } from "@mui/material";
import ReviewCard from "../ReviewCard/ReviewCard";
import { useAppSelector } from "../../hooks/useAppSelector";

const ReviewList = ({ dishId }: { dishId: string | undefined }) => {
  const { id } = useAppSelector((state) => state.user.user);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    console.log("fetching reviews");

    fetch(`${import.meta.env.VITE_BACKEND_URL}/reviews?dish_id=${dishId}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error("Error fetching reviews");
        }
        response.json().then((data) => {
          setReviews(data);
        });
      }
    );
  }, [dishId, reviews]);

  return (
    <Box mt={3}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            deleteButton={review.user_id === id}
          />
        ))
      ) : (
        <Box>
          <Typography variant="h6" align="center" color={"white"} mt={3}>
            Відгуків поки немає. Будьте першими!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReviewList;
