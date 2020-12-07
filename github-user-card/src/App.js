import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      followers: []
    }
  }

  // handleChanges = e => {
  //   this.setState({
  //     ...this.state,
  //     user: e.target.value
  //   })
  // }

  // fetchUsers = () => {
    

  componentDidMount() {
    axios.get('https://api.github.com/users/clarejackson')
    .then(res => {
      console.log(res);
      this.setState({
        ...this.state,
        user: res.data.name
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
  



  render() {
    return (
      <div>
        <h1>Github User Card</h1>
      </div>
    )
  }
}

export default App;
