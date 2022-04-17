import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  const { cookingTime, slug, thumbnail, title } = recipe.fields;

  return (
    <div className="card">
      <div className="featured">
        <Image
          height={thumbnail.fields.file.details.image.height}
          src={`https:${thumbnail.fields.file.url}`}
          width={thumbnail.fields.file.details.image.width}
        />
      </div>
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
