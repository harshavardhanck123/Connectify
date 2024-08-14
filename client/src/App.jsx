import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const App = () => {

    const [score, setScore] = useState({})
    const [playerScore, setPlayerScore] = useState([])
    const socket = io('http://localhost:3000');

    const connectSocket = () => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
    }

    useEffect(() => {
        connectSocket()
        socket.on('playerscores', (playerscores) => {
            setPlayerScore(playerscores);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('connect');
            socket.off('playerscores');
        };
    }, []);

    const handleInput = (e) => {
        let { name, value } = e.target
        let currentObj = { [name]: value }
        setScore((prev) => ({ ...prev, ...currentObj }))
    }

    

    const handleEmit = () => {
        socket.emit('scores', score);

    }

    
    


    return (
        <div>
            <h1>Multiplayer Dashboard</h1>
            <input type='text' placeholder='enter your name' className='field' onChange={handleInput} name='name'></input>
            <input type='text' placeholder='enter your score' className='field' onChange={handleInput} name='score'></input>

            <button onClick={handleEmit}>Publish Score</button>

            {playerScore.length>0?<table className="table">
               
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                {playerScore.map((playerScore,index)=>
                    <tr key={index}>
                        <td >{playerScore?.name}</td>
                        <td>{playerScore?.score}</td>
                        <td>{playerScore?.id}</td>
                    </tr>
                    )}
                </tbody>
            </table>:<></>}
        </div>
    );
}

export default App;
