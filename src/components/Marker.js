import React from 'react'



export class Marker extends React.Component {

  componentDidMount() {
  }

  render() {
    if (!this.props.google) {
      return null
    }

    this.marker = new this.props.google.maps.Marker({map: this.props.map,
      position: this.props.position,
      title: this.props.title});

    return null;
  }
}

export default Marker
