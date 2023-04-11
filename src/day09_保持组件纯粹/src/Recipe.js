import { ArrayNotEmpty } from './util';

export default function Recipe(props) {
  // 当数组不存在时需要处理
  let _ingredients = ArrayNotEmpty(props.ingredients) ? props.ingredients : [];
  const ingredientItems = _ingredients?.map(ingredient=> 
    <li key={ingredient}>
      {ingredient}
    </li>
  )
  return (
    <div>
      <h2>{props.name}</h2>
      <ul>
        {ingredientItems}
      </ul>
    </div> 
  )
}