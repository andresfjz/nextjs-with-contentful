import Link from "next/link";

export default function RecipeCard({ recipe }) {
  const { cookingTime, slug, thumbnail, title } = recipe.fields;

  return (
    <div className="card">
      <div className="featured">{/* <img src="" alt="" /> */}</div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
          <p>Takes approx {cookingTime} mins to make</p>
        </div>
        <div className="actions">
          <Link href={`/recipe/${slug}`}>
            <a>Cook this</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
