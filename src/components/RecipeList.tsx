import type { Recipe } from "../types/recipe.model";

export default function RecipeList(recipes: Recipe[]) {

  return (
    <ul>
      {recipes.map((item: Recipe) => (
        <li key={item.id} onClick={() => console.log(item)}>
          {item.title}
        </li>
      ))}
    </ul>
  )
}