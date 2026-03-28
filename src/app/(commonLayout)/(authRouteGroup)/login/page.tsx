import LoginForm from '@/components/modules/Auth/LoginFrom'
import React from 'react'
interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}
const LoginPage =async ({ searchParams }: LoginParams) => {
   const params = await searchParams;
  const redirectPath = params.redirect;
  return (
    <div>
      <LoginForm redirectPath={redirectPath}></LoginForm>
    </div>
  )
}

export default LoginPage
