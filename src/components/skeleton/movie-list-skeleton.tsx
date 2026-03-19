import MovieItemSkeleton from './movie-item-skeleton';

export default function MovieListSkeleton({ count }: { count: number }) {
  return new Array(count).fill(0).map((_, i) => <MovieItemSkeleton key={`movie-item-skeleton-${i}`}></MovieItemSkeleton>);
}
