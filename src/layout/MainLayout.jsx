import React from 'react'
import { Outlet } from 'react-router-dom';
import TopBar from '../components/Topbar';
import SideBar from '../components/Sidebar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
       <TopBar />
        <div style={{ display: 'flex' }}>
            <SideBar />
            <main style={{ flex: 1, padding: '1rem' }}>
                <Outlet /> {/* This is where page content goes */}
                <Footer />
            </main>
            
        </div>
    </>
  )
}

export default MainLayout
