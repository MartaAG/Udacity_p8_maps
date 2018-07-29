import React, { Component } from 'react';
import {InfoWindow, Marker} from 'google-maps-react';
import {places} from './data/places.js'

export class Place extends Component {


state = {
  showingInfoWindow: false,
  activeMarker: {}
};

  render() {
console.log(this.props.place);
    return (
      null
      );
  }
}

export default Place
