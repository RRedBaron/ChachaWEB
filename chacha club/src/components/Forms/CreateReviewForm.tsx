import { Formik, Form, Field } from "formik";
import { Box, Rating, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookie";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RootState } from "../../redux/store/store";

const CreateReviewForm = ({ dishId }: { dishId: string | undefined }) => {
  const [rating, setRating] = useState<number | null>(1);
  const [token, setToken] = useState<string>("");
  const { isVerified } = useAppSelector((state: RootState) => state.user.user);

  const handleSubmit = (values: any) => {
    let review = {
      rating: rating,
      comment: values.review,
      dish_id: +dishId,
      captchaToken: token,
    };
    if (isVerified) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify(review),
      }).then((response) => {
        if (response.ok) {
          toast.success("Ваш відгук успішно додано!");
        }
      });
    } else {
      console.log("isVerified", isVerified);

      toast.error("Підтвердіть свою пошту, щоб залишити відгук!");
    }
    // window.location.reload();
  };

  useEffect(() => {
    turnstile.render("#captcha-container", {
      sitekey: import.meta.env.VITE_SITE_KEY,
      callback: function (token) {
        setToken(token);
      },
    });
  }, []);

  return (
    <Box padding={2} border={"1px solid #8b2331"} borderRadius={2} mb={3}>
      <Rating
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "white",
          },
        }}
      />
      <Formik initialValues={{ review: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            margin="normal"
            required
            fullWidth
            id="review"
            label="Review"
            name="review"
            variant="outlined"
            multiline
            maxRows={3}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "white",
              },
              "&.MuiTextField-root": {
                color: "white!important",
                border: "1px solid #8b2331",
                borderRadius: "4px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& label": {
                color: "white",
              },
              "& label.Mui-focused": {
                color: "white",
              },
            }}
          />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              type="submit"
              variant="outlined"
              disabled={!token || !rating}
              sx={{
                color: "white",
                borderColor: "white",
                height: "40px",
                "&:hover": {
                  borderColor: "white",
                },
              }}
            >
              Відправити
            </Button>
            <div
              id="captcha-container"
              style={{ justifySelf: "flex-end", height: "65px" }}
            ></div>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default CreateReviewForm;
