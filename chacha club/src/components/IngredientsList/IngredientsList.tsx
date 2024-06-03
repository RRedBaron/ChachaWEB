import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Ingredient } from "../../types/ingredient";

interface IngredientsListProps {
  dishId: string;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ dishId }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/dishes/${dishId}/ingredients`)
      .then((response) => response.json())
      .then((data) => setIngredients(data));
  }, [dishId]);

  return (
    <List>
      {ingredients.map((ingredient) => (
        <ListItem key={ingredient.id} sx={{ padding: 0 }}>
          <ListItemText sx={{ color: "#FFFFFF" }}>
            - {ingredient.name}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default IngredientsList;
