import { MOVIE_API_URL } from '@/constants/movie-constants';

import { MovieItem } from '@/components/movie/movie-item';
import { MovieInfo } from '@/types/movie-types';
import style from '@/styles/cinema-home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈',
  description: '다양한 영화 추천과 전체 영화 목록을 만나보세요',
  openGraph: {
    title: '한입시네마 - 홈',
    description: '다양한 영화 추천과 전체 영화 목록을 만나보세요',
  },
};

export default async function HomePage() {
  const [moviesRes, recommendMoviesRes] = await Promise.all([fetch(`${MOVIE_API_URL}/movie`, { cache: 'force-cache' }), fetch(`${MOVIE_API_URL}/movie/random`, { next: { revalidate: 3 } })]);

  if (!moviesRes.ok) return <div>전체 영화 목록 로딩에 실패하였습니다.</div>;
  if (!recommendMoviesRes.ok) return <div>추천 영화 목록 로딩에 실패하였습니다.</div>;

  const [movies, recommendMovies] = await Promise.all([moviesRes.json(), recommendMoviesRes.json()]);

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
