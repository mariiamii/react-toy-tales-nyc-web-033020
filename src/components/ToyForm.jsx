import React, { Component } from 'react'

class ToyForm extends Component {
  
  state = {
    name: '',
    image: ''
  }

  handleChange = event => {this.setState({ [event.target.name]: event.target.value })}

  handleSubmit = event => {
    event.preventDefault()

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(newToy => {
      this.props.addNewToy(newToy)
    })
  }

  render() {
    const { name, image } = this.state

    return (
      <div className="container" onSubmit={this.handleSubmit}>
        <form className="add-toy-form">
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={name} onChange={this.handleChange}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={image} onChange={this.handleChange}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    )
  }

}

export default ToyForm
