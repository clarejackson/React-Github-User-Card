import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      followers:[]
    }
  }

  handleChanges = e => {
    this.setState({
      ...this.state,
      user: e.target.value
    })
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/clarejackson')
    .then(res => {
      console.log(res);
      this.setState({
        ...this.state,
        user: res.data.login
      })
    })
    .catch(err => console.log(err));

    axios.get('https://api.github.com/users/clarejackson/followers')
    .then(res => {
      console.log(res)
      this.setState({
        ...this.state,
        followers: res.data
      })
    })
    .catch(res => console.log(res))
  }

  fetchUsers = () => {
    axios.get(`https://api.github.com/users/${this.state.user}`)
    .then(res => {
      this.setState({
        ...this.state,
        user: res.data.login
      })
    })
    .catch(res => console.log(res))

    axios.get(`https://api.github.com/users/${this.state.user}/followers`)
    .then(res => {
      console.log(typeof res.data)
      this.setState({
        ...this.state,
        followers: res.data
      })
    })
    .catch(res => console.log(res))
    .finally(() => this.setState({user: ''}))
  }
  

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      console.log('user has changed')
    }
  }
  
  render() {
    return (
      <div>
        <h1>Github User Card</h1>
        <input
        placeholder='username'
        value={this.state.user}
        type='text'
        onChange={this.handleChanges}
        />
        <button onClick={this.fetchUsers}>Submit Username</button>
        <p>{this.state.user}</p>
        {this.state.followers.map(follower => {
          return <p>{follower.login}</p>
        })}
      </div>
    )
  }
}

export default App;
