import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Skeleton from "components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_SPACE_ACCESS_TOKEN,
});

export default function Recipe({ recipe }) {
  if (!recipe) return <Skeleton />;

  const { cookingTime, featuredImage, ingredients, method, title } =
    recipe.fields;

  return (
    <>
      <div>
        <div className="banner">
          <Image
            height={featuredImage.fields.file.details.image.height}
            src={`https:${featuredImage.fields.file.url}`}
            width={featuredImage.fields.file.details.image.width}
          />
          <h2>{title}</h2>
        </div>
        <div className="info">
          <p>Takes about {cookingTime} mins to cook.</p>
          <h3>Ingredients:</h3>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="method">
          <h3>Method:</h3>
          <div>{documentToReactComponents(method)}</div>
        </div>
      </div>

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }

        .banner {
          display: grid;
          place-content: center;
        }

        .banner h2 {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          display: inline-block;
          left: -10px;
          margin: 0;
          padding: 20px;
          position: relative;
          top: -60px;
          transform: rotateZ(-1deg);
        }
      `}</style>
    </>
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
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      recipe: items[0],
    },
    revalidate: 1,
  };
}
