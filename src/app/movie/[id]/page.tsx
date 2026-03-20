import { Metadata } from 'next';

import MovieDetail from '@/components/movie/movie-detail';
import ReviewList from '@/components/review/review-list';
import ReviewEditor from '@/components/review/review-editor';

import { MOVIE_API_URL } from '@/constants/movie-constants';

import { MovieInfo } from '@/types/movie-types';

export async function generateStaticParams() {
  const movies = await fetch(`${MOVIE_API_URL}/movie`).then(res => res.json());

  return movies.map((movie: MovieInfo) => ({
    id: String(movie.id),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const movieDetailRes = await fetch(`${MOVIE_API_URL}/movie/${id}`, { cache: 'force-cache' });

  if (!movieDetailRes.ok) {
    return {
      title: '영화를 찾을 수 없습니다',
    };
  }

  const movie: MovieInfo = await movieDetailRes.json();

  return {
    title: movie.title,
    description: movie.description || `${movie.title}의 상세 정보를 확인하세요`,
    openGraph: {
      title: `${movie.title} | 한입시네마`,
      description: movie.description || `${movie.title}의 상세 정보를 확인하세요`,
      images: movie.posterImgUrl
        ? [
            {
              url: movie.posterImgUrl,
              width: 500,
              height: 750,
              alt: movie.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${movie.title} | 한입시네마`,
      description: movie.description || `${movie.title}의 상세 정보를 확인하세요`,
      images: movie.posterImgUrl ? [movie.posterImgUrl] : undefined,
    },
  };
}

export default async function Movie({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const movieDetailRes = await fetch(`${MOVIE_API_URL}/movie/${id}`, { cache: 'force-cache' });

  if (!movieDetailRes.ok) return <>영화 상세 조회 실패</>;

  const movieDetail = await movieDetailRes.json();

  return (
    <div>
      <MovieDetail movie={movieDetail} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
