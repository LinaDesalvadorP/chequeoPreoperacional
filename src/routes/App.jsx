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
import Owners from '../containers/Owners';
import Taxis from './../containers/Taxis';
import Dashboard from './../containers/Dashboard';
import Welcome from './../containers/Welcome';
import SuccessfulRegistration from './../containers/SuccessfulRegistration';
import CreateQuestions from '../containers/CreateQuestions';


export const App = () => {
    return (
        <BrowserRouter>
            <Layout>    
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />}/>
                    <Route path='/daily-check' element={<DailyCheck />}/>
                    <Route path='/admins' element={<CreateAdmin />}/>
                    <Route path='/owners' element={<Owners/>}/>
                    <Route path='/validate-owner' element={<ValidateOwner />}/>
                    <Route path='/taxis' element={<Taxis />}/>
                    <Route path='/create-vehicle' element={<CreateVehicle />}/>
                    <Route path='/questions' element={<CreateQuestions />}/>
                    <Route path='/checks' element={<ChecksListAdmin />}/>
                    <Route path='/dashboard' element={<Dashboard />}/>
                    <Route path='/welcome' element={<Welcome />}/>
                    <Route path='/successful-registration' element={<SuccessfulRegistration />}/>
                    <Route path='*' element={<NotFound />}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}