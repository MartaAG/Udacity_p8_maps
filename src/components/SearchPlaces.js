import React, {Component} from 'react'

export class SearchPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      places: [],
      filteredPlaces: []
    }
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()});
  }

  render() {

    let filteredPlaces = this.props.markers.filter((place) => {
      return (place.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1)
    })
    return (<div>
      <input type="text" placeholder="Search by name" value={this.props.query} onChange={(event) => this.updateQuery(event.target.value)}/>
      <div className="Placelist">
        <ul>
          {filteredPlaces.map((place) => <li onClick={() => window.google.maps.event.trigger(place, 'click', {})} key={place.title}>{place.title}</li>)}
        </ul>
      </div>
    </div>)
  }
}

export default SearchPlaces;
