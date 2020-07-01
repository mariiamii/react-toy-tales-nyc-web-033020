import React from 'react'
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  let arrayOfToyComponents = props.toys.map(toy => {
    return <ToyCard key={toy.id} toy={toy} deleteToy={props.deleteToy} updateToyInArr={props.updateToyInArr}/>
  })
  
  return (
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {arrayOfToyComponents}
    </div>
  )
}

export default ToyContainer
