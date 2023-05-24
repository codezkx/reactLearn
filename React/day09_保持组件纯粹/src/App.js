import ScientistList from './ScientistList';
import RecipeList from './RecipeList'
export default function App() {
  console.log(RecipeList, 'RecipeList')
  return (
    <>
      <ScientistList />
      <RecipeList />
    </>
  )
}