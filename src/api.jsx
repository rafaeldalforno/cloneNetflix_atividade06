import axios from 'axios';

// const API_KEY = '203dd822d15a1f865449d36d87bcb080';
const API_KEY = 'ae2002c85c5bbff8e3e6b9c99e677356';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    try {
        const response = await axios.get(`${API_BASE}${endpoint}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        return null;
    }
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais Netflix',
                items: await basicFetch(`/discover/tv?with_networks=213&language=pt-BR&api_key=${API_KEY}&include_adult=false`),
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?api_key=${API_KEY}&language=pt-BR&include_adult=false`),
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}&include_adult=false`),
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}&include_adult=false`),
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}&include_adult=false`),
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}&include_adult=false`),
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}&include_adult=false`),
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}&include_adult=false`),
            },
        ]
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                default:
                    info = null;
                    break;
            }
        }
        return info;
    },

    searchMoviesOrTv: async (query) => {
        const results = [];

        const movieResults = await basicFetch(`/search/movie?query=${encodeURIComponent(query)}&language=pt-BR&api_key=${API_KEY}`);
        if (movieResults && movieResults.results) {
            results.push(...movieResults.results);
        }

        const tvResults = await basicFetch(`/search/tv?query=${encodeURIComponent(query)}&language=pt-BR&api_key=${API_KEY}`);
        if (tvResults && tvResults.results) {
            results.push(...tvResults.results);
        }

        return results;
    }
}