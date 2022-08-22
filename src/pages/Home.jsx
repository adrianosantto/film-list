//useState para gerenciar o estado dos filmes useEffect para chamada da API quando a página carregar
import { useState, useEffect } from "react";
import MoviesCard from "../components/MovieCard";

import './MoviesGrid.css';



//'import.meta.env.VITE_API' importar direto do arquivo .ENV
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  //gerenciar estado do filmes, os filmes mais bem avaliado primeiro 
  const [ topMovies, setTopMovies] = useState([]);
  //função para chamar a API
  const getTopRatedMovies = async (url) => {

    const res = await fetch(url);

    const data  = await res.json();
    
    setTopMovies(data.results);
  };

  useEffect(() => {

    const getTopRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    getTopRatedMovies(getTopRatedUrl);
  }, []);
  return (
    <div className="container">
      <h2 className="title">Melhores Filmes</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando..</p>}
        {topMovies.length > 0 && topMovies.map((movie) => <MoviesCard key={movie.id} movie={movie}/>)}
      </div>


    </div>
  );
};

export default Home