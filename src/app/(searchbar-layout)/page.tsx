import { MOVIE_API_URL } from '@/constants/movie-constants';

import { MovieItem } from '@/components/movie/movie-item';
import { MovieInfo } from '@/types/movie-types';
import style from '@/styles/cinema-home.module.css';

export default async function HomePage() {
  const moviesRes = await fetch(`${MOVIE_API_URL}/movie`);
  const recommendMoviesRes = await fetch(`${MOVIE_API_URL}/movie/random`);

  if (!moviesRes.ok) return <div>전체 영화 목록 로딩 실패</div>;
  if (!recommendMoviesRes.ok) return <div>추천 영화 목록 로딩 실패</div>;

  const movies: MovieInfo[] = await moviesRes.json();
  const recommendMovies: MovieInfo[] = await recommendMoviesRes.json();

  return (
    <>
      <section className={style.movieSection}>
        <h3 className={style.sectionTitle}>추천 영화</h3>
        <div className={style.recommendMovieGrid}>
          {recommendMovies?.map((movie: MovieInfo) => (
            <MovieItem key={`recommend-movie-${movie.id}`} movie={movie} />
          ))}
        </div>
      </section>
      <section className={style.movieSection}>
        <h3 className={style.sectionTitle}>모든 영화</h3>
        <div className={style.allMovieGrid}>
          {movies?.map((movie: MovieInfo) => (
            <MovieItem key={`all-movie-${movie.id}`} movie={movie} />
          ))}
        </div>
      </section>
    </>
  );
}
