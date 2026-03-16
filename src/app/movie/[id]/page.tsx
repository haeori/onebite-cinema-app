import { MovieDetail } from '@/components/movie/movie-detail';
import { MOVIE_API_URL } from '@/constants/movie-constants';

export default async function Movie({ params }: { params: { id: string } }) {
  const { id } = params;

  const movieDetailRes = await fetch(`${MOVIE_API_URL}/movie/${id}`);

  if (!movieDetailRes.ok) return <>영화 상세 조회 실패</>;

  const movieDetail = await movieDetailRes.json();

  return (
    <div>
      <MovieDetail movie={movieDetail} />
    </div>
  );
}
