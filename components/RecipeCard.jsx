import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  const { cookingTime, slug, thumbnail, title } = recipe.fields;

  return (
    <>
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

      <style jsx>{`
        .actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }

        .actions a {
          background: #f01b29;
          color: #fff;
          padding: 16px 24px;
          text-decoration: none;
          transition: background 0.1s;
        }

        .actions a:hover {
          background: #bb0c17;
        }

        .card {
          transform: rotateZ(-1deg);
        }

        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          left: -10px;
          margin: 0;
          position: relative;
          top: -40px;
        }

        .info {
          padding: 16px;
        }

        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }

        .info p {
          color: #777;
          margin: 0;
        }
      `}</style>
    </>
  );
}
