import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../styles/global.scss';
import Layout from '../containers/Layout';
import Login from '../containers/Login';
import ValidateOwner from '../containers/ValidateOwner'; 
import CreateVehicle from '../containers/CreateVehicle';
import CreateAdmin from '../containers/CreateAdmin';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import DailyCheck from '../containers/DailyCheck';
import ChecksListAdmin from './../containers/ChecksListAdmin';


export const App = () => {
    return (
        <BrowserRouter>
            <Layout>    
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />}/>
                    <Route path='/validate-owner' element={<ValidateOwner />}/>
                    <Route path='/create-vehicle' element={<CreateVehicle />}/>
                    <Route path='/create-admin' element={<CreateAdmin />}/>
                    <Route path='/daily-check' element={<DailyCheck />}/>
                    <Route path='/checks-list' element={<ChecksListAdmin />}/>
                    <Route path='*' element={<NotFound />}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}