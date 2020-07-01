import React, { Component } from 'react'
import ToyContainer from './ToyContainer'

class ToyCard extends Component {

  handleDelete = (event) => {
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(resp => {
      this.props.deleteToy(this.props.toy.id)
    })
  }

  handleLike = (event) => {
    let updatedLikes = this.props.toy.likes + 1

    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({likes: updatedLikes})
    })
    .then(resp => resp.json())
    .then(updatedToy => {
      this.props.updateToyInArr(updatedToy)
    })
  }
  
  render() {
    const { name, image, likes } = this.props.toy

    return (
      <div className='card'>
        <h2>{name}</h2>
        <img src={image} alt={name} className='toy-avatar' />
        <p>{likes} Likes </p>
        <button className='like-btn' onClick={this.handleLike}>Like {'<3'}</button>
        <button className='del-btn' onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    )
  }

}

export default ToyCard
