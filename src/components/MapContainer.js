import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import {places} from './data/places.js'
import {InfoBox} from './InfoBox.js'
import {Marker} from './Marker.js'

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) => this.setState({activeMarker: marker, selectedPlace: props, showingInfoWindow: true});

  onInfoWindowClose = () => this.setState({activeMarker: null, showingInfoWindow: false});

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({activeMarker: null, showingInfoWindow: false});
    };
    // <InfoBox marker={this.state.activeMarker} onClose={this.onInfoWindowClose} visible={this.state.showingInfoWindow}>
      // </InfoBox>
  render() {
    if (!this.props.loaded)
      return <div >
        Loading...
      </div>;
    return (<Map className="map" google={this.props.google} onClick={this.onMapClicked} initialCenter={{
        lat: 51.108923,
        lng: 17.030182
      }} zoom={14}>
      {
        places.map((place) => {

          // TODO pass this.props.google to marker
          return (<Marker map = {this.props.google} onClick={this.onMarkerClick} key={place.id} title={place.title} name={place.name} position={place.latlng}/>)
        })
      }


        <div>
          <h2>
            {this.state.selectedPlace.name}
          </h2>

        </div>

    </Map>);
  }
}
export default GoogleApiWrapper({apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo")})(MapContainer)
