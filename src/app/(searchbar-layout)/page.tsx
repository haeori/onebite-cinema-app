import { MOVIE_API_URL } from '@/constants/movie-constants';

import { MovieItem } from '@/components/movie/movie-item';
import { MovieInfo } from '@/types/movie-types';
import style from '@/styles/cinema-home.module.css';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { delay } from '@/utils/movie-utils';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';

export const metadata: Metadata = {
  title: '홈',
  description: '다양한 영화 추천과 전체 영화 목록을 만나보세요',
  openGraph: {
    title: '한입시네마 - 홈',
    description: '다양한 영화 추천과 전체 영화 목록을 만나보세요',
  },
};

async function RecommendMovies() {
  await delay(300);
  const recommendMoviesRes = await fetch(`${MOVIE_API_URL}/movie/random`, { next: { revalidate: 3 } });

  if (!recommendMoviesRes.ok) return <div>추천 영화 목록 로딩에 실패하였습니다.</div>;

  const recommendMovies = await recommendMoviesRes.json();

  return recommendMovies?.map((movie: MovieInfo) => <MovieItem key={`recommend-movie-${movie.id}`} movie={movie} />);
}

async function Movies() {
  await delay(1000);
  const moviesRes = await fetch(`${MOVIE_API_URL}/movie`, { cache: 'force-cache' });

  if (!moviesRes.ok) return <div>전체 영화 목록 로딩에 실패하였습니다.</div>;

  const movies: MovieInfo[] = await moviesRes.json();

  return movies?.map(movie => <MovieItem key={`all-movie-${movie.id}`} movie={movie} />);
}

export default function HomePage() {
  return (
    <>
      <section className={style.movieSection}>
        <h3 className={style.sectionTitle}>추천 영화</h3>
        <div className={style.recommendMovieGrid}>
          <Suspense fallback={<MovieListSkeleton count={3} />}>
            <RecommendMovies />
          </Suspense>
        </div>
      </section>
      <section className={style.movieSection}>
        <h3 className={style.sectionTitle}>모든 영화</h3>
        <div className={style.allMovieGrid}>
          <Suspense fallback={<MovieListSkeleton count={10} />}>
            <Movies />
          </Suspense>
        </div>
      </section>
    </>
  );
}
