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
//handling search
    let filteredPlaces = this.props.markers.filter((marker) => {
     if (marker.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1)
     {marker.setVisible(true);
       return true;}
       else {
        marker.setVisible(false);
        return false;}
    })

    return (<div>

      <input
        type="text"
        placeholder="Search by name"
        aria-labelledby="filter"
        value={this.props.query}
        onChange={(event) => this.updateQuery(event.target.value)}/>

      <div className="Placelist">
        <ul>
          {filteredPlaces.map((place) => <li onClick={this.props.handleListItemClick.bind(this,place)} key={place.title}>{place.title}</li>)}
        </ul>
      </div>
    </div>)
  }
}

export default SearchPlaces;
