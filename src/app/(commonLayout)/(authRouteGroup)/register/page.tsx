// import { SignupForm } from '@/components/authentication/RegisterForm'

import SignupForm from "@/components/authentication/RegisterForm";
import photo from "../../../../../public/backgroundPhoto.jpg";
interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}
const RegisterPage = async({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;
  return (
     <div
      className="flex min-h-svh w-full items-center justify-center  md:p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${photo.src})`, objectFit: "cover" }}
    >
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md  rounded-xl shadow-lg">
        <SignupForm redirectPath={redirectPath} />
      </div>
    </div>
  )
}

export default RegisterPage
