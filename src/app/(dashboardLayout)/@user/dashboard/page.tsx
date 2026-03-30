import { redirect } from 'next/navigation'


const DashboardPage = () => {
  return redirect('/dashboard/userProfile')
}

export default DashboardPage
