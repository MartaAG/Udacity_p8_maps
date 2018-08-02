import React, {Component} from 'react';
import './index.css';
import {places} from './components/data/places.js'
import WikiImage from './components/WikiImage.js'
import SearchPlaces from './components/SearchPlaces.js'
import WikiText from './components/WikiText.js'

class App extends Component {
  state = {
    markers: [],
    map: '',
    activeMarker: {},
    windowIsOpened: false,
    infoBox: {},
    placeInfo: {}
  };

  componentDidMount() {
    //init map
    window.initMap = this.initMap;
    loadJS('https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places&callback=initMap')
  }

  initMap = () => {
    let thisMap = this;
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {
        lat: 51.109491,
        lng: 17.052547
      }
    })

    this.setState({map});

    let infoBox = new window.google.maps.InfoWindow({content: ""});
    thisMap.setState({infoBox: infoBox});
    //Create markers on the map
    let markers = [];
    places.forEach((place) => {
      let marker = new window.google.maps.Marker({position: place.latlng, map: map, title: place.name, article: place.title});
      //Opening InfoWindow, add place name to InfoWindow
      marker.addListener('click', function() {
        if (thisMap.state.windowIsOpened) {
          thisMap.setState({infoBox: infoBox.close()});
          thisMap.closeInfoWindow();
        }
        thisMap.setState({
          infoBox: infoBox.open(marker.get('map'), marker)
        });
        thisMap.setState({
          infoBox: infoBox.setContent(marker.title)
        });
        thisMap.openInfoWindow(marker);


      });
      markers.push(marker);
    })

    thisMap.setState({markers: markers});

    map.addListener('click', function() {
      thisMap.setState({infoBox: infoBox.close()});
      thisMap.closeInfoWindow()
    })
  }

  //Opening photo below the list
  openInfoWindow = (marker) => {
    this.setState({activeMarker: marker, windowIsOpened: true});
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    setTimeout(function() {
      marker.setAnimation(null);
    }, 1000);

  }

  //click on the map triggers closing photo
  closeInfoWindow = () => {
    this.setState({activeMarker: {}, windowIsOpened: false})
  }

  handleListItemClick = (marker) => {
    window.google.maps.event.trigger(marker, 'click', {})
  }

  render() {
    return (<div className="App">
      <header>
        <div className="head">
          <h1>Wrocław Neighbourhood Map</h1>
        </div>
      </header>

      <main className="main">

        <div className="listVIew">
          <SearchPlaces
            markers={this.state.markers} handleListItemClick={this.handleListItemClick}
        />

      <aside>
            {this.state.windowIsOpened && <WikiImage article={this.state.activeMarker.article} title={this.state.activeMarker.title}/>}
            {this.state.windowIsOpened && <WikiText article={this.state.activeMarker.article} title={this.state.activeMarker.title} />}
          </aside>

        </div>
        <div
          className="map"
          aria-labelledby="map"
          role="application">
          <div id="map"></div>
        </div>
      </main>

    </div>);
  }
}

export default App;

function loadJS(src) {
  var ref = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement("script");

  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}
