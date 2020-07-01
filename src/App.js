import React from 'react'
import './App.css'
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import data from './data'


class App extends React.Component{
  
  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toysData => this.setState({ toys: toysData }))
  }

  addNewToy = (newToy) => this.setState({ toys: [...this.state.toys, newToy] })

  deleteToy = (deletedToyId) => {
    let copyOfToys = this.state.toys.filter(toy => {
      return toy.id !== deletedToyId
    })
    this.setState({ toys: copyOfToys })
  }

  updateToyInArr = (updatedToy) => {
    let copyOfToys = this.state.toys.map(toy => {
      if (toy.id === updatedToy.id) {
        return updatedToy
      } else {
        return toy
      }
    })
    this.setState({ toys: copyOfToys }) 
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render() {
    const { display, toys } = this.state

    return (
      <>
        <Header/>
        { display
            ?
          <ToyForm addNewToy={this.addNewToy} />
            :
          null
        }
        <div className='buttonContainer'>
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={toys} deleteToy={this.deleteToy} updateToyInArr={this.updateToyInArr}/>
      </>
    )
  }

}

export default App

/* 
Deliverable (GET): hook up the data from the 'db.json' file to your React components & render ToyCard components on the pg
1. App comp: set initial state; state = {toys: []}
2. App comp: define componentDidMount() w/ GET request
3. App comp, render(): pass toys prop to ToyContainer comp
4. ToyContainer comp: pass props as an arg in fn comp
5. ToyContainer comp: map over toys prop & create a ToyCard w/ all attributes (including key)
6. ToyCard comp: import ToyContainer
7. ToyCard comp: destructure attributes (const { name, image, likes } = this.props)
8. ToyCard comp, render(): pass in the attributes

Deliverable (POST): build out the functionality for the ToyForm & render a new ToyCard for the toy that you created
1. ToyForm comp: set initial state; state = {name: '', image: ''}
2. ToyForm comp, render(): add value={this.state.name} to both inputs
3. ToyForm comp, render(): add onChange={this.handleChange} to both inputs
4. ToyForm comp, render(): add onSubmit={this.handleSubmit} to div
5. ToyForm comp: define handleChange = event => {this.setState({[event.target.name]: event.target.value})}
6. ToyForm comp: define handleSubmit w/ POST request
7. App comp: define addNewToy = (newToy) => {this.setState({toys: [...this.state.toys, newToy]})} //definition
8. App comp, render(): pass addNewToy as a prop; <ToyForm addNewToy={this.addNewToy} />
9. ToyForm comp, handleSubmit: in the 2nd .then: .then(newToy => {this.props.addNewToy(newToy)}) //invocation

Deliverable (DELETE): when you click on the `Donate to Goodwill` btn, the ToyCard that you clicked on should be removed from the DOM as well as the backend
1. ToyCard comp: add onClick={this.handleDelete} to delete btn
2. ToyCard comp: define handleDelete w/ DELETE request
3. App comp: define deleteToy = (deletedToyId) => {} //definition
4. App comp, render(): pass deleteToy={this.deleteToy} as a prop to ToyContainer
5. ToyCard comp, handleDelete: in the 2nd .then: .then(resp => {this.props.deleteToy(this.props.toy.id)}) //invocation

Deliverable (PATCH): Clicking on the button should increase the number of likes on the DOM as well as the backend
1. ToyCard comp: add onClick={this.handleLike} to like btn
2. ToyCard comp: define handleLike w/ PATCH request
3. App comp: define updateToyInArr w/ updatedToy = (updatedToy) => {} //definition
4. App comp, render(): pass updateToyInArr={this.updateToyInArr} as a prop to ToyContainer
5.  ToyCard comp, handleLike: in the 2nd .then: .then(resp => {this.props.updateToyInArr(updatedToy)}) //invocation
*/
