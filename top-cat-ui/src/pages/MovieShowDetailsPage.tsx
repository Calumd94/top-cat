import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieShowDetails, Sources } from "../types/interfaces";


export default function MovieShowDetailsPage() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieShowDetails | null>(null);
    const [sortedData, setSortedData] = useState<Sources[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Sources; direction: "asc" | "desc" } | null>(null);
    const [uniqueRegionsArray, setUniqueRegionsArray] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        if (id) {
            const fetchMovieDetails = async () => {
                const response = await fetch(`https://api.topcatapp.com/api/sources/${id}`);
                // const response = await fetch(`http://localhost:8080/api/sources/${id}`); // Uncomment when running the back-end locally
                const data = await response.json();
                setMovieDetails(data);
                setSortedData(data.sources);
                // Ensure uniqueRegions is a Set<string> so we can remove duplicates
                const uniqueRegions = new Set<string>(data.sources.map((source: Sources) => source.region));
                const uniqueRegionsArray = Array.from(uniqueRegions);
                console.log(uniqueRegions);
                console.log(uniqueRegions.has('GB'));

                setUniqueRegionsArray(uniqueRegionsArray);
            };

            fetchMovieDetails();
        }
    }, [id]);

    useEffect(() => {
        setSelectedValue(uniqueRegionsArray?.includes('GB') ? 'GB' : uniqueRegionsArray[0] ?? '');
    }, [uniqueRegionsArray]);

    const handleSort = (key: keyof Sources) => {
        let direction: "asc" | "desc" = "asc";

        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sorted = [...sortedData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortedData(sorted);
        setSortConfig({ key, direction });
        console.log("Updated sortedData:", sorted);
    };

    const handleRegionDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };


    if (!movieDetails) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="details-container">
            <div>
                <div className="movie-show-poster">
                    <img
                        src={movieDetails?.poster}
                        alt={movieDetails?.title}
                    />
                </div>
                <div>
                    <h1>{movieDetails?.title}</h1>
                    <p>{movieDetails?.plot_overview}</p>
                    <p>Type: {movieDetails?.type}</p>
                    <p>Released: {movieDetails?.year}</p>
                </div>
            </div>

            {sortedData && sortedData.length > 0 && (
                <div>
                    <label htmlFor="region-dropdown">Region: </label>
                    <select
                        id="region-dropdown"
                        value={selectedValue}
                        onChange={handleRegionDropdownChange}
                        className="styled-dropdown"
                    >
                        {uniqueRegionsArray && uniqueRegionsArray.map((item) => (
                            <option key={item} value={`dropdown-option-${item}`}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("name")}>
                                    Name
                                </th>
                                <th onClick={() => handleSort("type")}>
                                    Type
                                </th>
                                <th onClick={() => handleSort("region")}>
                                    Region
                                </th>
                                <th onClick={() => handleSort("format")}>
                                    Format
                                </th>
                                <th onClick={() => handleSort("price")}>
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((item) => (
                                <tr key={`${item.source_id}-${item.region}-${item.type}-${item.format}`}>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.region}</td>
                                    <td>{item.format}</td>
                                    <td>
                                        {item.price ? item.price : "FREE with Subscription"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {sortedData && sortedData.length <= 0 && (
                <p className="mt-20">
                    <b>Not currently available on any streaming platform</b>
                </p>
            )}
        </div>
    );
}