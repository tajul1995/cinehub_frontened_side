// import MovieDetailsCard from '@/components/modules/movies/MovieDetails';
import MovieDetailsCard from '@/components/modules/movies/MovieDetails';


const SingleMoviePage = async({
  params
}: {
  params: Promise<{ id: string }>}) => {
  const { id } = await params
  const res = await fetch(
    `http://localhost:5000/api/v1/createMovie/${id}`
  );
  const data=  await res.json();
  // console.log(data.data,"single movie data");
  const movie = data.data
  
  return (
    <div>
      <MovieDetailsCard movie={movie} />
    </div>
  )
}

export default SingleMoviePage
