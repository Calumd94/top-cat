import React from 'react';
import './App.css';


import { useState } from "react";
// import MovieShowCards from "./components/movieShowCards";

interface Result {
  name: string;
  relevance: number;
  type: string;
  id: number;
  year: number;
  result_type: string;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: string;
  image_url: string;
}

interface MovieOrShowResponse {
  results: Result[];
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [movieOrShowResponseResults, setMovieOrShowResponseResults] =
    useState<Result[]>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Construct the URL with query parameters
      const res = await fetch(
        `https://api.topcatapp.com/api/titles/${encodeURIComponent(inputValue)}`,
        // `http://localhost:8080/api/titles/${encodeURIComponent(inputValue)}`,
        {
          method: "GET",
        }
      );

      if (res.ok) {
        const data = await res.json();
        const movieOrShowResponse: MovieOrShowResponse = data;
        console.log("movieOrShowResponse.results:", movieOrShowResponse.results);
        console.log("movieOrShowResponse.results.length:", movieOrShowResponse.results.length);
        setApiResponse(data.message || "Success!");
        setMovieOrShowResponseResults(movieOrShowResponse.results);
      } else {
        setApiResponse("Error: Unable to fetch data from API");
      }
    } catch (error) {
      console.error("Error:", error);
      setApiResponse("Error: Network or server issue");
    }
  };

  return (
    <div className="container">
      <main className="main">
        <div className="content">
          <img
            src="/topcat-face.png"
            alt="TopCat logo"
            style={{ width: '11.25rem', height: '10rem' }}
          />
          <div className="flex">
            <form onSubmit={handleSubmit}>
              <label>Search a movie or TV show:</label>
              <div className="search-container">
                <input
                  className="search-bar"
                  id="search-bar"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="The Godfather"
                />
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
            {apiResponse && <p style={{ marginLeft: '1rem', marginTop: '2rem' }}>{apiResponse}</p>}
          </div>
          {/* {movieOrShowResponseResults &&
            <MovieShowCards movieOrShowResponseResults={movieOrShowResponseResults} />
          } */}
          {
            (movieOrShowResponseResults && movieOrShowResponseResults?.length <= 0) &&
            <p className="text-center mt-20"><b>oops! No movie or tv show found</b></p>
          }
        </div>
      </main>
    </div>
  );
}