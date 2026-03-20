export type MovieInfo = {
  id: number;
  title: string;
  releaseDate: string;
  company: string;
  genres: string[];
  subTitle: string;
  description: string;
  runtime: number;
  posterImgUrl: string;
};

export type ReviewData = {
  id: number;
  movieId: number;
  author: string;
  content: string;
  createdAt: string;
};
