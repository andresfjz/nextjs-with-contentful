import { createClient } from "contentful";
import RecipeCard from "components/RecipeCard";

export default function Index({ recipes }) {
  console.log(recipes);

  return (
    <div className="recipeList">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_ACCESS_TOKEN,
  });

  const response = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: response.items,
    },
  };
}
