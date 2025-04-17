import './SearchInfoLoader.css'

export const SearchInfoLoader = () => {
  const count = 5;
  const skeletonItems = Array(count).fill(null);

  return (
    <>
      <ul className="skeleton-search">
        {skeletonItems.map((_, index) => (
          <li key={index} className="skeleton-search__item" aria-label="Loading..." />
        ))}
      </ul>
    </>
  );
};
