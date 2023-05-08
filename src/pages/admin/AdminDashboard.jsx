import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
            <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <div className="card w-75 p-2">
                    <h4>Admin Name: <strong>{auth?.user?.name}</strong></h4>
                    <h4>Admin Email: <strong>{auth?.user?.email}</strong></h4>
                    <h4>Admin contact: <strong>{auth?.user?.phone}</strong></h4>
                </div>
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard