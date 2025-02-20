import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieOrShowResponse, Result } from "../types/interfaces";
// import MovieShowCards from "./components/movieShowCards";

export default function Home() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [movieOrShowResponseResults, setMovieOrShowResponseResults] =
        useState<Result[]>();
    const envRef = useRef<string>(""); // Initialize with an empty string

    useEffect(() => {
        envRef.current = process.env.ENV || "dev"; // Default to dev if not set
        console.log(`Running in ${envRef.current} mode`);
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Construct the URL with query parameters
            const res = await fetch(
                `https://api.topcatapp.com/api/titles/${encodeURIComponent(inputValue)}`,
                // `http://localhost:8080/api/titles/${encodeURIComponent(inputValue)}`, // Uncomment when running the back-end locally
                {
                    method: "GET",
                }
            );

            if (res.ok) {
                const data = await res.json();
                const movieOrShowResponse: MovieOrShowResponse = data;
                setApiResponse(data?.message);
                setMovieOrShowResponseResults(movieOrShowResponse?.results);
                if (movieOrShowResponse?.results?.length > 0) {
                    navigate("/titles-page", { state: { results: movieOrShowResponse?.results } });
                }
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
                    <div>
                        <form onSubmit={handleSubmit} className='form'>
                            <label>Search a movie or TV show</label>
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
                    {
                        (movieOrShowResponseResults && movieOrShowResponseResults?.length <= 0) &&
                        <p className="text-center mt-20"><b>oops! No movie or tv show found</b></p>
                    }
                </div>
            </main>
        </div>
    );
}