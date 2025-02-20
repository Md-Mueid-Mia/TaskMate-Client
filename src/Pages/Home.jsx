import React from 'react';
import Navbar from '../Components/Navbar';
import TaskBoard from '../Components/TaskBoard';

const Home = () => {
    return (
        <div>
            <Navbar />
            <TaskBoard />
        </div>
    );
};

export default Home;