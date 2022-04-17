import { createClient } from "contentful";

export default function Index({ recipes }) {
  console.log(recipes);
  
  return <div className="recipeList">Recipe List</div>;
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_ACCESS_TOKEN,
  });

  const response = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: response.items
    }
  }
}
