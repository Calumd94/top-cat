import { useLocation, useNavigate } from "react-router-dom";
import { Result } from "../types/interfaces";


export default function TitlesPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const movieOrShowResponseResults = location.state?.results || []; // Get passed data, default to empty array if missing

    const handleMovieShowCardClick = (item: Result) => {
        navigate(`/movieShowDetailsPage/${item.id}`);
    };

    return (
        <div className="titles-card-container">
                {movieOrShowResponseResults && movieOrShowResponseResults.length > 0 &&
                    movieOrShowResponseResults.map((item: Result) => (
                        <button key={item.id} onClick={() => handleMovieShowCardClick(item)} className="title-card">
                            <div className="">
                                <div className="">
                                    <img
                                        src={item.image_url}
                                        alt={`${item.name} movie poster`}
                                        className=""
                                    />
                                </div>
                                <div className="">
                                    <div className="mb-8">
                                        <div className="text-gray-900 font-bold text-xl mb-2">
                                            {item.name}
                                        </div>
                                        <p className="text-gray-700 text-base">
                                            {item.type}
                                        </p>
                                        <p className="text-gray-700 text-base">
                                            {item.year}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
        </div>
    );
}