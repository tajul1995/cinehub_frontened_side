import { SignupForm } from '@/components/authentication/RegisterForm'

import photo from "../../../../../public/backgroundPhoto.jpg";
const RegisterPage = () => {
  return (
     <div
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${photo.src})` }}
    >
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <SignupForm />
      </div>
    </div>
  )
}

export default RegisterPage
