import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_SPACE_ACCESS_TOKEN,
});

export default function Recipe({ recipe }) {
  console.log(recipe);

  return <div>Recipe Details</div>;
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
