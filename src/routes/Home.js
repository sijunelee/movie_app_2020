import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],

  };

  getMovies = async ()=>{ //getMovies 함수는 시간이 필요하고( 이 함수는 비동기라서 기다려야 해),
    const { 
      data: {
        data: {movies},
       },
      } = await (await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating')); //axios.get의 실행을 기다려줘(axios.get()의 실행완료를 기다렸다가 끝나면 진행해줘.)
    this.setState({movies, isLoading: false}); //ES6에서 축약가능
  };
//movies = await axios.get('https://yts-proxy.now.sh/list_movies.json')).data.data.movies와 동일 : ES6의 구조분해할당


  componentDidMount() {
    //영화 데이터 로딩
    this.getMovies();
  };


  render() {
    const {isLoading, movies} = this.state;
    return (
      <section className="container">
        {isLoading?(
          <div className="loader">
            <span className="loader__text">'Loading...'</span>
          </div>
          ):(
          <div className="movies">
            {movies.map((movie)=>      
            (<Movie 
              key={movie.id} 
              id={movie.id} 
              year={movie.year} 
              title={movie.title} 
              summary={movie.summary} 
              poster={movie.medium_cover_image}
              genres={movie.genres}
              />)
            )}
          
          </div>
        )}
      </section>
    );
  }
}

export default Home;
