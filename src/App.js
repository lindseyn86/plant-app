import './App.css';
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const API_URL = 'https://666c475449dbc5d7145d6d4b.mockapi.io/plants'
  const [plants, setPlants] = useState([{}])

  const[newName, setNewName] = useState('')
  const[newLocation, setNewLocation] = useState('')
  const[newSpeciesName, setNewSpeciesName] = useState('')
  const[newSoilType, setNewSoilType] = useState('')

  const[updatedName, setUpdatedName] = useState('')
  const[updatedLocation, setUpdatedLocation] = useState('')
  const[updatedSpeciesName, setUpdatedSpeciesName] = useState('')
  const[updatedSoilType, setUpdatedSoilType] = useState('')

  function getPlants() {
    fetch(API_URL)
    .then(data => data.json())
    .then(data => setPlants(data))
  }
  useEffect(() => {
    getPlants()
  }, [])

  function deletePlant(id) {
    fetch(`${API_URL}/${id}`,{
      method: 'DELETE'
    }).then(() => getPlants())
  }

  function newPlant(e) {
    e.preventDefault()

    fetch(API_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: newName,
        location: newLocation,
        speciesName: newSpeciesName,
        soilType: newSoilType,
      })
    }).then(() => getPlants())
   }

  function updatePlant(e, plantObject) {
    e.preventDefault()

    let updatedPlantObject = {
      ...plantObject,
      name: updatedName,
      location: updatedLocation,
      speciesName: updatedSpeciesName,
      soilType: updatedSoilType,
    }

    fetch(`${API_URL}/${plantObject.id}`,{
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedPlantObject)
    }).then(() => getPlants())
   }

  return (
    <div className="App">
      <div className="plant-form">
        <form>
          <h3>
            Add a New Plant
          </h3>
          <label>Plant Name</label>
          <input onChange={(e) => setNewName(e.target.value)}placeholder="Plant Name"></input>
          <label>Plant Location</label>
          <input onChange={(e) => setNewLocation(e.target.value)}placeholder="Plant Location"></input>
          <label>Plant Species Name</label>
          <input onChange={(e) => setNewSpeciesName(e.target.value)}placeholder="Plant Species Name"></input>
          <label>Plant Soil Type</label>
          <input onChange={(e) => setNewSoilType(e.target.value)}placeholder="Plant Soil Type"></input>
          <button className="btn btn-green" onClick={(e) => newPlant(e)}>Submit Plant</button>
        </form>
      </div>
      {plants.map((plant, index) => 
        <div key={index} className="plant-info row">
          <div className="plant-details">
            <h3>{plant.name} Information</h3>
            <div className="row">
              <div className="col-2">
                <span><label>Plant Name:</label>{plant.name}</span>
              </div>
              <div className="col-2">
                <span><label>Species Name:</label> {plant.speciesName}</span>
              </div>
              <div className="col-2">
                <span><label>Location:</label> {plant.location}</span>
              </div>
              <div class="col-2">
                <span><label>Soil Type:</label> {plant.soilType}</span>
              </div>  
              <button className="btn btn-danger col-2" onClick={() => deletePlant(plant.id)}>Delete {plant.name}</button>          
            </div>

          </div>
          <div className="update-form">
            <form className="row">
              <h3>Update {plant.name}</h3>
            <div className="col-2">
              <span><label>Update Name</label>
              <input onChange={(e) => setUpdatedName(e.target.value)}placeholder="Plant Name"></input></span>
            </div>
            <div className="col-2">
              <span><label>Update Location</label>
              <input onChange={(e) => setUpdatedLocation(e.target.value)}placeholder="Plant Location"></input></span>
            </div>
            <div className="col-2">
            <span><label>Update Species Name</label>
            <input onChange={(e) => setUpdatedSpeciesName(e.target.value)}placeholder="Plant Species Name"></input></span>
            </div>
            <div className="col-2">
            <span><label>Update Soil Type</label>
            <input onChange={(e) => setUpdatedSoilType(e.target.value)}placeholder="Plant Soil Type"></input></span>
            </div>
            <button className="btn btn-green col-2" onClick={(e) => updatePlant(e, plant)}>Update {plant.name}</button>
            </form>
          </div>
          <div className="line"><hr/></div>
        </div>
      )}
    </div>
  );
}
export default App;