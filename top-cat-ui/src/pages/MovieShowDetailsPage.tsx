import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieShowDetails, Sources } from "../types/interfaces";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Used for icons: https://mui.com/material-ui/material-icons/?query=arrow

export default function MovieShowDetailsPage() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieShowDetails | null>(null);
    const [sourcesData, setSourcesData] = useState<Sources[]>([]);
    const [sourcesDataByRegion, setSourcesDataByRegion] = useState<Sources[]>([]);
    const [sortedData, setSortedData] = useState<Sources[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Sources; direction: "asc" | "desc" } | null>(null);
    const [uniqueRegionsArray, setUniqueRegionsArray] = useState<string[]>([]);
    const [uniqueRegionsArraySorted, setUniqueRegionsArraySorted] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        if (id) {
            const fetchMovieDetails = async () => {
                const response = await fetch(`https://api.topcatapp.com/api/sources/${id}`);
                // const response = await fetch(`http://localhost:8080/api/sources/${id}`); // Uncomment when running the back-end locally
                const data = await response.json();
                setMovieDetails(data);
                setSourcesData(data.sources);
                console.log(data.sources);
                // Ensure uniqueRegions is a Set<string> so we can remove duplicates
                const uniqueRegions = new Set<string>(data.sources.map((source: Sources) => source.region));
                const uniqueRegionsArray = Array.from(uniqueRegions);
                setUniqueRegionsArray(uniqueRegionsArray);
            };

            fetchMovieDetails();
        }
    }, [id]);

    useEffect(() => {
        if (uniqueRegionsArray?.includes('GB')) {
            const sortedRegions = [...uniqueRegionsArray].sort((a, b) => {
                if (a === 'GB') return -1; // 'GB' comes first
                if (b === 'GB') return 1;
                return 0;
            });
            setUniqueRegionsArraySorted(sortedRegions);
            setSelectedValue('GB');
        } else if (uniqueRegionsArray.length > 0) {
            setSelectedValue(uniqueRegionsArray[0]);
        }
    }, [uniqueRegionsArray]);

    useEffect(() => {
        const updatedData = [...sourcesData].filter(function (item) {
            return item.region === selectedValue;
        });
        setSourcesDataByRegion(updatedData);
        // handleSort(sortConfig?.key);
        setSortConfig(null);
        setSortedData(updatedData);
    }, [selectedValue, sourcesData]);

    const handleSort = (key: keyof Sources) => {
        let direction: "asc" | "desc" = "asc";

        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sorted = [...sourcesDataByRegion].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortedData(sorted);
        setSortConfig({ key, direction });
        // console.log("Updated sortedData:", sorted);
        // console.log("Updated sortConfig:", { key, direction });
    };

    const handleRegionDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const updatedData = [...sourcesData].filter(function (item) {
            return item.region === event.target.value;
        });
        setSourcesDataByRegion(updatedData);
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
                <div className="table-info">
                    <label htmlFor="region-dropdown">Region: </label>
                    <select
                        id="region-dropdown"
                        value={selectedValue}
                        onChange={handleRegionDropdownChange}
                        className="styled-dropdown"
                    >
                        {uniqueRegionsArraySorted && uniqueRegionsArraySorted.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("name")}>
                                    Name
                                    {(sortConfig?.key === "name" && sortConfig?.direction === "asc") &&
                                        <KeyboardArrowUpIcon fontSize="small" />
                                    }
                                    {(sortConfig?.key === "name" && sortConfig?.direction === "desc") &&
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    }
                                </th>
                                <th onClick={() => handleSort("type")}>
                                    Type
                                    {(sortConfig?.key === "type" && sortConfig?.direction === "asc") &&
                                        <KeyboardArrowUpIcon fontSize="small" />
                                    }
                                    {(sortConfig?.key === "type" && sortConfig?.direction === "desc") &&
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    }
                                </th>
                                <th onClick={() => handleSort("region")}>
                                    Region
                                </th>
                                <th onClick={() => handleSort("format")}>
                                    Format
                                    {(sortConfig?.key === "format" && sortConfig?.direction === "asc") &&
                                        <KeyboardArrowUpIcon fontSize="small" />
                                    }
                                    {(sortConfig?.key === "format" && sortConfig?.direction === "desc") &&
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    }
                                </th>
                                <th onClick={() => handleSort("price")}>
                                    Price
                                    {(sortConfig?.key === "price" && sortConfig?.direction === "asc") &&
                                        <KeyboardArrowUpIcon fontSize="small" />
                                    }
                                    {(sortConfig?.key === "price" && sortConfig?.direction === "desc") &&
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    }
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

            {sourcesData && sourcesData.length <= 0 && (
                <div>
                    <p>
                        <b>Not currently available on any streaming platform</b>
                    </p>
                </div>
            )}
        </div>
    );
}