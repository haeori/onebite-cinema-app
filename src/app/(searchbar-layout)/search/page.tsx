import style from '@/styles/search.module.css';
import { MovieInfo } from '@/types/movie-types';
import { MovieItem } from '@/components/movie/movie-item';
import { MOVIE_API_URL } from '@/constants/movie-constants';
import { Metadata } from 'next';
import { isArrayNotEmpty } from '@/utils/movie-utils';
import { Suspense } from 'react';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';

export const dynamicParams = false;

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q: string }> }): Promise<Metadata> {
  const { q = '' } = await searchParams;

  return {
    title: q ? `"${q}" 검색 결과` : '검색',
    description: q ? `"${q}" 검색 결과를 확인하세요` : '영화를 검색해보세요',
    openGraph: {
      title: q ? `"${q}" 검색 결과 | 한입시네마` : '검색 | 한입시네마',
      description: q ? `"${q}" 검색 결과를 확인하세요` : '영화를 검색해보세요',
    },
  };
}

async function SearchResults({ q }: { q: string }) {
  const searchRes = await fetch(`${MOVIE_API_URL}/movie/search?q=${encodeURIComponent(q)}`, { cache: 'force-cache' });

  if (!searchRes.ok) return <div>오류가 발생했습니다...</div>;

  const searchedMovies: MovieInfo[] = await searchRes.json();

  return (
    <div className={style.searchContainer}>
      <h3 className={style.searchTitle}>검색 결과</h3>
      {isArrayNotEmpty(searchedMovies) ? (
        <div className={style.movieGrid}>
          {searchedMovies?.map((movie: MovieInfo) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={style.noResult}>검색 결과가 없습니다</div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q = '' } = await searchParams;

  return (
    <Suspense
      key={q}
      fallback={
        <div className={style.movieGrid}>
          <MovieListSkeleton count={5} />
        </div>
      }
    >
      <SearchResults q={q} />
    </Suspense>
  );
}
