import React from "react";
import { Review } from "../../types/review";
import {
  Card,
  CardContent,
  Rating,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { getCookie } from "../../utils/cookie";
import { toast } from "react-toastify";

interface ReviewCardProps {
  review: Review;
  deleteButton?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, deleteButton }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3001/reviews/${review.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then(() => {
        toast.success("Відгук успішно видалено");
      })
      .catch(() => {
        toast.error("Помилка при видаленні відгуку");
      });
  };

  return (
    <Card
      sx={{
        width: "100%",
        marginBottom: 5,
        backgroundColor: "#DDDDDD",
      }}
    >
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={1}
        >
          <Rating name="read-only" value={review.rating} readOnly />
          <Box display={"flex"} alignItems={"center"} gap={0.5}>
            <Typography
              variant="subtitle1"
              component="div"
              color={"gray"}
              fontSize={12}
            >
              {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
            {deleteButton && (
              <IconButton onClick={handleDelete}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        <Typography
          variant="subtitle1"
          component="div"
          fontWeight={"700"}
          mb={1}
        >
          {review.username}
        </Typography>

        <Typography variant="body1">{review.comment}</Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
