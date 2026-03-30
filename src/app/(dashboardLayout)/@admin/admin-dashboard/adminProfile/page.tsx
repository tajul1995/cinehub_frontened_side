import AdminProfileCard from '@/components/dashboardCollection/adminProfile'
import { getUserInfo } from '@/services/auth.service'
import React from 'react'

const AdminProfilePage =async () => {
     const res = await getUserInfo()
  return (
    <div>
      <AdminProfileCard user={res} />
    </div>
  )
}

export default AdminProfilePage
