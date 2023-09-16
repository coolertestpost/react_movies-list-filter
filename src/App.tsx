/* eslint-disable */

import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');

  { /* eslint-disable-next-line max-len */ }

  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([...moviesFromServer]);

  const filterMovies = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (!event.target.value) {
      setVisibleMovies([...moviesFromServer]);

      return;
    }

    setVisibleMovies([...moviesFromServer].filter((movie) => {
      const movieDescription = movie.description.toLowerCase();
      const movieTitle = movie.title.toLowerCase();

      const q = event.target.value.toLowerCase().trim();

      if (!q) {
        return;
      }

      { /* eslint-disable-next-line max-len */ }

      return movieDescription.match(new RegExp(q, 'g'))?.length || movieTitle.match(new RegExp(q, 'g'))?.length;
    }));
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={filterMovies}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">
        Sidebar goes here
      </div>
    </div>
  );
};
