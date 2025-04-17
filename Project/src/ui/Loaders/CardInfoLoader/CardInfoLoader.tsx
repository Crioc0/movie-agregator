import "./CardInfoLoader.css";

export const CardInfoLoader = () => {
  return (
    <div className="skeleton-info">
      <div className="skeleton-info__content">
        <div className="skeleton-info__title"></div>
        <div className="skeleton-info__text"></div>
        <div className="skeleton-info__command">
          <div className="skeleton-info__button"></div>
          <div className="skeleton-info__button"></div>
        </div>
      </div>
      <div className="skeleton-info__image"></div>
    </div>
  );
};
