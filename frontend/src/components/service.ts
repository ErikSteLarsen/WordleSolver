import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Your Flask API base URL



  export const excludeLetter = async (letter: string) => {
    try {
        const response = await axios.post(`${API_URL}/exclude_letter`, { letter } );
        return response.data;
    } catch (error) {
        console.error('There was an error excluding the letter: ', error);
        throw error;
    }
  };

  export const includeLetter = async (letter: string) => {
    try {
      const response = await axios.post(`${API_URL}/include_letter`, { letter });
      return response.data;
    } catch (error) {
      console.error('There was an error including the letter: ', error);
      throw error;
    }
  };

  export const excludeLetterAtPosition = async (letter: string, position: number) => {
    try {
      const response = await axios.post(`${API_URL}/exclude_letter_at_position`, { letter, position });
      return response.data;
    } catch (error) {
      console.error('There was an error excluding the letter at position: ', error);
      throw error;
    }
  };

  export const includeLetterAtPosition = async (letter: string, position: number) => {
    try {
      const response = await axios.post(`${API_URL}/include_letter_at_position`, { letter, position });
      return response.data;
    } catch (error) {
      console.error('There was an error including the letter at position: ', error);
      throw error;
    }
  };
