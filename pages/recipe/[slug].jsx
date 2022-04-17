import { createClient } from "contentful";
import Image from "next/image";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_SPACE_ACCESS_TOKEN,
});

export default function Recipe({ recipe }) {
  console.log(recipe);

  const { cookingTime, featuredImage, ingredients, method, title } =
    recipe.fields;

  return (
    <div>
      <div className="banner">
        <Image
          height={featuredImage.fields.file.details.image.height}
          src={`https:${featuredImage.fields.file.url}`}
          width={featuredImage.fields.file.details.image.width}
        />
        <div>{title}</div>
      </div>
      <div className="info">
        <p>Takes about {cookingTime} mins to cook.</p>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { items } = await client.getEntries({ content_type: "recipe" });

  const paths = items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths, // paths: paths
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  return {
    props: {
      recipe: items[0],
    },
  };
}
