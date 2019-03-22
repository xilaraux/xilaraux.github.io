const LIMIT = 25;
const QUERY = '16bit';
const API_KEY = 'o8ydBpi3rwtN119CgxWnZuI8F3BuWPC8';
const REQUEST_END = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${QUERY}&limit=${LIMIT}&offset=0&rating=G&lang=en`;

export const requestImage = () => {
  return fetch(REQUEST_END)
    .then((data) => data.json())
    .then((json) => {
      return selectGIF(json);
    });
};

function selectGIF(data) {
  const randIndex = ~~(Math.random() * 10 + 25) % 25;
  return data.data[randIndex].images.looping.mp4;
}
