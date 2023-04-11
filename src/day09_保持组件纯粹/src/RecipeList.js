import Fragment from 'react';
import { recipes } from './data';
import Recipe  from './Recipe';

export default function RecipeList() {
  return (
    <>
      <h1>菜谱</h1>
      {recipes.map(recipe => 
        <Recipe
          {...recipe}
          key={recipe.id}
        />
      )}
    </>
  )
}