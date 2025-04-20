import React, { useEffect, useState } from "react";
import CardList from "../component/CardList";
import SearchBox from '../component/SearchBox';
import './App.css'
import Scroll from '../component/Scroll'

function App() {

    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users))

    }, [])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filterRobot = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())

    })

    return !robots.length ?
        <h1>LOADING</h1>
        :
        (
            <div className="tc">
                <h1 className="f2">RoboFriends</h1>
                <button onClick={() => setCount(count + 1)}>Clicked {count}</button>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <CardList robots={filterRobot} />
                </Scroll>
            </div>
        )

}


export default App