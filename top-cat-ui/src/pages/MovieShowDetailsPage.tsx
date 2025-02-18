import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieShowDetails, Sources } from "../types/interfaces";


export default function MovieShowDetailsPage() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieShowDetails | null>(null);
    const [sortedData, setSortedData] = useState<Sources[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Sources; direction: "asc" | "desc" } | null>(null);

    useEffect(() => {
        if (id) {
            const fetchMovieDetails = async () => {
                const response = await fetch(`https://api.topcatapp.com/api/sources/${id}`);
                const data = await response.json();
                setMovieDetails(data);
                setSortedData(data.sources);
            };

            fetchMovieDetails();
        }
    }, [id]);

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


    if (!movieDetails) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="container">
            <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-none h-50 lg:h-auto lg:w-50 rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                    <img
                        src={movieDetails?.poster}
                        alt={movieDetails?.title}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{movieDetails?.title}</h1>
                    <p className="mt-2">{movieDetails?.plot_overview}</p>
                    <p className="mt-2">Type: {movieDetails?.type}</p>
                    <p className="mt-2">Released: {movieDetails?.year}</p>
                </div>
            </div>

            {sortedData && sortedData.length > 0 && (
                <div className="pt-10">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-blue-500">
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSort("name")}
                                >
                                    Name
                                </th>
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSort("type")}
                                >
                                    Type
                                </th>
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSort("region")}
                                >
                                    Region
                                </th>
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSort("format")}
                                >
                                    Format
                                </th>
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSort("price")}
                                >
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((item) => (
                                <tr
                                    key={`${item.source_id}-${item.region}-${item.type}-${item.format}`}
                                    className="select-none"
                                >
                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.region}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.format}</td>
                                    <td className="border border-gray-300 px-4 py-2">
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