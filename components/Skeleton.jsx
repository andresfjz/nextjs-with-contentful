export default function Skeleton() {
  return (
    <>
      <div className="skeleton">
        <div className="bannerSkeleton"></div>
        <div className="headerSkeleton"></div>
        <div className="contentSkeleton"></div>
        <div className="contentSkeleton"></div>
        <div className="contentSkeleton"></div>
      </div>

      <style jsx>{`
        .skeleton {
          margin: 20px auto;
          max-width: 1200px;
        }

        .skeleton > div {
          background: #dbcc1a;
          border-radius: 4px;
          margin: 20px 0;
        }

        .bannerSkeleton {
          padding: 12% 0;
        }

        .headerSkeleton {
          max-width: 500px;
          padding: 15px 0;
        }

        .contentSkeleton {
          max-width: 1000px;
          padding: 8px 0;
        }
      `}</style>
    </>
  );
}
