import React, {Component} from 'react';
import './App.css';
import MapContainer from './components/MapContainer'
import {places} from './components/data/places.js'
// import {Image} from './components/fetchImage.js'

class App extends Component {
  render() {
    const style = {
      width: '50vw',
      height: '50vh'
    }
    return (<div className="App">
      <nav>
        <div className="navbar">

          <h1>Neighbourhood map</h1>
        </div>
      </nav>
      <main className="main">
        <div className="listVIew">
          <h2>And here will be a list</h2>
          <input type="text" placeholder="Search location"/>
          <ol>
            {places.map((place) => (<li key={place.id}>{place.name}</li>))}

          </ol>

        </div>

        <div className="map">
          <div style={style}>
            <MapContainer className="check" style={{
                width: '50vw',
                height: '50vh'
              }}/>
          </div>
        </div>
      </main>

    </div>);
  }
}

export default App;
