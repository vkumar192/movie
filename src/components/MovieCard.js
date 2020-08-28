import React from "react";
import { MovieControls } from "./MovieControls";

export const MovieCard = ({ movie, type }) => {
  return (
    <div className="movie-card">
      <div className="overlay"></div>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://images.wallpapersden.com/image/download/ms-dhoni-untold-story-hd-wallpaper_39349_1280x720.jpg"}
        alt={`${movie.Title} Poster`}
      />
      <MovieControls type={type} movie={movie} />
    </div>
  );
};
