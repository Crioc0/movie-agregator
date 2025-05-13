import { ChangeEventHandler, useState } from "react";
import { TMovie } from "../../types/Movie";
import styles from "./Search.module.scss";
import SearchLogo from "../../assets/search.svg";
import { useQuery } from "@tanstack/react-query";
import { getMovieByTitle } from "../../api/movies";
import { Link } from "react-router";
import { Raiting } from "../Raiting/Raiting";

import { SearchLoader } from "./SearchLoader/SearchLoader";

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
    <>
      <div className={styles.inputContainer}>
        <img className={styles.logo} src={SearchLogo} alt="" />
        <input
          className={styles.input}
          type="text"
          value={filter}
          onChange={handleChangeFilter}
        />

        {filter !== "" &&
          (moviesQuerry.isLoading ? (
            <SearchLoader />
          ) : (
            <ul className={styles.movieList}>
              {moviesQuerry.data.length !== 0 ? (
                moviesQuerry.data.map((item: TMovie) => {
                  return (
                    <>
                      <li className={styles.movieItem}>
                        <Link
                          onClick={() => setFilter("")}
                          className="link"
                          to={`../movie/${item.id}`}
                        >
                          <div
                            className="movie-card"
                            style={{ display: "flex" }}
                          >
                            <img
                              className={styles.img}
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
    </>
  );
};
