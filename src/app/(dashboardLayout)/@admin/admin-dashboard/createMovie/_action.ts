export interface IPerson {
  name: string;
  role: string;
}

export interface IMovie {
  id: string;
  movieName: string;
  type: string;
  price: number;
  categories: string[];
  poster: string;
  trailerUrl: string;
  videoUrl: string;
  rating: number;
  duration: number;
  publishedYear: number;
  story: string;
  cast: IPerson[];
  directors: IPerson[];
  producers: IPerson[];
}

export const createMovies = async (movie: IMovie) => {
  const res = await fetch("http://localhost:5000/api/v1/createMovie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!res.ok) {
    throw new Error("Failed to create movie");
  }

  return res.json(); // ✅ important
};
// import { createMovies, IMovie } from "@/app/(dashboardLayout)/@admin/admin-dashboard/createMovie/_action";