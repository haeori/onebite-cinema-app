import Link from 'next/link';
import Image from 'next/image';

import style from '@/styles/movie-item.module.css';

import { MovieInfo } from '@/types/movie-types';

export const MovieItem = ({ movie }: { movie: MovieInfo }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Image className={style.moviePoster} src={movie.posterImgUrl} alt={`${movie.title} 영화의 포스터`} width={400} height={600} />
    </Link>
  );
};
