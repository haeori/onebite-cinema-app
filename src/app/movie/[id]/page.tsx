import { MovieDetail } from '@/components/movie/movie-detail';
import { MOVIE_API_URL } from '@/constants/movie-constants';
import { MovieInfo } from '@/types/movie-types';

export async function generateStaticParams() {
  const movies = await fetch(`${MOVIE_API_URL}/movie`).then(res => res.json());

  return movies.map((movie: MovieInfo) => ({
    id: String(movie.id),
  }));
}

export default async function Movie({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const movieDetailRes = await fetch(`${MOVIE_API_URL}/movie/${id}`, { cache: 'force-cache' });

  if (!movieDetailRes.ok) return <>영화 상세 조회 실패</>;

  const movieDetail = await movieDetailRes.json();

  return (
    <div>
      <MovieDetail movie={movieDetail} />
    </div>
  );
}
