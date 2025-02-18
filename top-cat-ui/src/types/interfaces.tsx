export interface Result {
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

export interface MovieOrShowResponse {
    results: Result[];
}

export interface Sources {
    source_id: number;
    name: string;
    type: string;
    region: string;
    ios_url: string;
    android_url: string;
    web_url: string;
    format: string;
    price: number;
    seasons: number;
    episodes: number;
}

export interface MovieShowDetails {
    id: number;
    title: string;
    original_title: string;
    plot_overview: string;
    type: string;
    runtime_minutes: number;
    year: number;
    end_year: number;
    release_date: string;
    imdb_id: string;
    tmdb_id: number;
    tmdb_type: string;
    genres: [],
    genre_names: [],
    user_rating: number;
    critic_score: number;
    us_rating: string;
    poster: string;
    backdrop: string;
    original_language: string;
    similar_titles: [],
    networks: [],
    network_names: [],
    trailer: string;
    trailer_thumbnail: string;
    relevance_percentile: number;
    sources: Sources[];
}