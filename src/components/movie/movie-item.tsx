import Link from 'next/link';

import style from '@/styles/movie-item.module.css';

import { MovieInfo } from '@/types/movie-types';

type MovieItemProps = {
  movie: MovieInfo;
};

export const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <img className={style.moviePoster} src={movie.posterImgUrl} alt={movie.title} />
    </Link>
  );
};
