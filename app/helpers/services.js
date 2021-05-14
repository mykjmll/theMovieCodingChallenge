import axios from 'axios';
import { BASE_URL, API_KEY, SEARCH_BASE_URL } from '../utils/constants';

export const getMovieList = async payload => {
  try {
    const response = await axios.get(
      `${BASE_URL}${payload}?api_key=${API_KEY}&language=en-US&page=1`,
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getMovieById = async payload => {
  try {
    const response = await axios.get(
      `${BASE_URL}${payload}?api_key=${API_KEY}&language=en-US`,
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const searchMovies = async query => {
  try {
    const response = await axios.get(
      `${SEARCH_BASE_URL}?api_key=${API_KEY}&query=${query}`,
    );
    return response;
  } catch (error) {
    return error;
  }
};
