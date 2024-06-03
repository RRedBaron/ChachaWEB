import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { StyledTabList, StyledTab } from "./CategoryTabsStyles";
import DishList from "../DishList/DishList";
import { useAppSelector } from "../../hooks/useAppSelector";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchDishesByCategoryId } from "../../redux/slices/dishesSlice";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const CategoryTabs = () => {
  const [limit, setLimit] = useState(6);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState("1");
  const [pages, setPages] = useState(1);

  const handleChange = (event, newValue) => {
    setCategory(parseInt(newValue));
    setPage("1");
  };

  const handlePageChange = (event, value) => {
    setPage(value.toString());
  };

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (category !== null) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/categories/size/${category}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setPages(Math.ceil(data.size / limit));
        });
    }
  }, [category, limit]);

  useEffect(() => {
    if (category !== null) {
      dispatch(
        fetchDishesByCategoryId({
          categoryId: category,
        })
      );
    }
  }, [category]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      flex={1}
    >
      {category !== null && (
        <TabContext value={category.toString()}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <StyledTabList
              TabIndicatorProps={{ style: { backgroundColor: "#8B2331" } }}
              aria-label="Category Tabs"
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              centered
            >
              {categories.map((category) => (
                <StyledTab
                  key={category.id}
                  label={category.name}
                  value={category.id.toString()}
                />
              ))}
            </StyledTabList>
          </Box>
          {categories.map((category) => (
            <TabPanel key={category.id} value={category.id.toString()}>
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="container"
                style={{ width: "100%" }}
              >
                <DishList
                  categoryId={category.id}
                  limit={limit}
                  page={parseInt(page)}
                />
              </motion.div>
            </TabPanel>
          ))}
        </TabContext>
      )}
      <Stack spacing={2} justifyContent="center" alignItems="center" mt={2}>
        <Pagination
          onChange={handlePageChange}
          size="large"
          count={pages}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#FFFFFF",
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#8B2331",
              color: "#FFFFFF",
            },
            "& .MuiPaginationItem-page.Mui-selected:hover": {
              backgroundColor: "#8B2331",
              color: "#FFFFFF",
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default CategoryTabs;
