import "./GenreCard.css";

type TGenre = {
  genre: string;
};

export const GenreCard = ({ genre }: TGenre) => {
  return (
    <div className="genre-card">
      <img
        className="genre-card__img"
        src={`/assets/${genre}.jpg`}
        alt={genre}
      />
      <p className="genre-card__descr">{genre}</p>
    </div>
  );
};
