import style from '@/styles/search.module.css';
import { MovieInfo } from '@/types/movie-types';
import { MovieItem } from '@/components/movie/movie-item';
import { MOVIE_API_URL } from '@/constants/movie-constants';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q = '' } = await searchParams;

  const searchRes = await fetch(`${MOVIE_API_URL}/movie/search?q=${encodeURIComponent(q)}`, { cache: 'force-cache' });

  if (!searchRes.ok) return <div>오류가 발생했습니다...</div>;

  const searchedMovies: MovieInfo[] = await searchRes.json();

  return (
    <>
      <div className={style.searchContainer}>
        <h3 className={style.searchTitle}>검색 결과</h3>
        <div className={style.movieGrid}>
          {searchedMovies?.map((movie: MovieInfo) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
