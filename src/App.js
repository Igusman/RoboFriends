import React from "react";
import CardList from "./CardList";
import SearchBox from './SearchBox';
import { robots } from './robots';
import './App.css'
import Scroll from './Scroll'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { return response.json() })
            .then(users => { this.setState({ robots: users }) })
            .catch(err => console.log(err))
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {

        const filterRobot = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if (this.state.robots.length === 0) {
            return <h1>LOADING</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className="f2">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filterRobot} />
                    </Scroll>
                </div>
            )
        }
    }
}

export default App