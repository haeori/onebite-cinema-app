import Link from 'next/link';
import Image from 'next/image';

import style from '@/styles/movie-detail.module.css';

import { MovieInfo } from '@/types/movie-types';

type MovieDetailProps = {
  movie: MovieInfo;
};

// 영화 상세 페이지
export default function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <>
      <div className={style.container}>
        {/* 영화 포스터 */}
        <div className={style.posterContainer}>
          <Image
            src={movie.posterImgUrl}
            alt={`${movie.title} 영화 포스터`}
            width={400}
            height={600}
            className={style.poster}
          />
        </div>

        {/* 영화 정보 */}
        <div className={style.infoContainer}>
          {/* 제목 & 개봉일 */}
          <div className={style.titleSection}>
            <h1 className={style.title}>{movie.title}</h1>
            <p className={style.releaseDate}>{movie.releaseDate}</p>
          </div>

          {/* 부제목 */}
          <p className={style.subTitle}>{movie.subTitle}</p>

          {/* 메타데이터 (장르, 상영시간, 배급사) */}
          <div className={style.metadata}>
            <div className={style.genre}>
              {movie.genres.map((genre, index) => (
                <span key={index} className={style.genreTag}>
                  {genre}
                </span>
              ))}
            </div>
            <span className={style.separator}>|</span>
            <span>{movie.runtime}분</span>
            <span className={style.separator}>|</span>
            <span>{movie.company}</span>
          </div>

          {/* 설명 */}
          <div className={style.description}>{movie.description}</div>

          {/* 영화 목록으로 돌아가기 버튼 */}
          <div className={style.buttonContainer}>
            <Link href="/" className={style.backButton}>
              영화 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
