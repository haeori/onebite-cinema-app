import MovieDetailModal from '@/components/common/movie-detail-modal';
import MoviePage from '@/app/movie/[id]/page';

export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <MovieDetailModal>
      <MoviePage {...props} />
    </MovieDetailModal>
  );
}
