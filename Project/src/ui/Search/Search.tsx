import { ChangeEventHandler, useState } from "react";
import { TMovie } from "../../types/Movie";
import "./Search.css";
import SearchLogo from "../../assets/search.svg";
import { useQuery } from "@tanstack/react-query";
import { getMovieByTitle } from "../../api/movies";
import { Link } from "react-router";
import { Raiting } from "../Raiting/Raiting";

import { SearchInfoLoader } from "../Loaders/SearchInfoLoader/SearchInfoLoader";



export const Search = () => {
  const [filter, setFilter] = useState("");
  const moviesQuerry = useQuery({
    queryKey: ["movies", filter],
    queryFn: () => getMovieByTitle(filter),
  });

  const handleChangeFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div className="search-block">
      <div className="input-block">
        <img className="input-block__logo" src={SearchLogo} alt="" />
        <input
          className="input-block__input"
          type="text"
          value={filter}
          onChange={handleChangeFilter}
        />
      </div>

      {filter !== "" &&
        (moviesQuerry.isLoading ? (
          <SearchInfoLoader />
        ) : (
          <ul className="filter-movie-list">
            {moviesQuerry.data.length !== 0 ? (
              moviesQuerry.data.map((item: TMovie) => {
                return (
                  <>
                    <li className="filter-movie-list__item">
                      <Link
                        onClick={() => setFilter("")}
                        className="link"
                        to={`../movie/${item.id}`}
                      >
                        <div className="movie-card" style={{ display: "flex" }}>
                          <img
                            className="movie-card__img"
                            style={{ width: 40, height: 52 }}
                            src={item.posterUrl}
                            alt=""
                          />
                          <div>
                            <Raiting size="small" movie={item} />
                          </div>
                        </div>
                      </Link>
                    </li>
                  </>
                );
              })
            ) : (
              <li>Ничего не найдено</li>
            )}
          </ul>
        ))}
    </div>
  );
};
