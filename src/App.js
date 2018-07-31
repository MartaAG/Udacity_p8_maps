import React, {Component} from 'react';
import './App.css';
import {places} from './components/data/places.js'
import WikiImage from './components/WikiImage.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      map: '',
      activeMarker: {},
      picture: '',
      windowIsOpened: false
    };
  }
  componentDidMount() {
    window.initMap = this.initMap;
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&callback=initMap')
  }

  initMap = () => {
    let controlledThis = this;
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {
        lat: 51.098767,
        lng: 17.036519
      }
    })

    this.setState({map});

    var infowindow = new window.google.maps.InfoWindow({content: ""});

    //Create markers on the map
    let markers = [];
    places.map((place) => {
      let marker = new window.google.maps.Marker({position: place.latlng, map: map, title: place.name, article: place.title});

      //Opening infoWindow, add place name to InfoWindow
      marker.addListener('click', function() {
        infowindow.open(map, marker);
        infowindow.setContent(marker.title)
        controlledThis.openInfoWindow(marker);
      });
      markers.push(marker);

    })
    //Trigger close window after clicking on the map
    controlledThis.setState({markers: markers});
    map.addListener('click', function() {
      controlledThis.closeInfoWindow()
    })
  }

  //Opening photo below the list
  openInfoWindow = (marker) => {
    this.setState({activeMarker: marker, windowIsOpened: true});
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
     setTimeout(function(){ marker.setAnimation(null); }, 1000);
  }

  //click on the map triggers closing photo
  closeInfoWindow = () => {
      this.setState({activeMarker: {}, windowIsOpened: false})
  }

  render() {
    return (<div className="App">
      <nav>
        <div className="navbar">
          <h1>Neighbourhood map</h1>
        </div>
      </nav>

      <main className="main">

        <div className="listVIew">

          <div className="Filteroption">
            <h2>Filter location</h2>
            <input type="text" placeholder="Search"/>
          </div>

          <div className="Placelist">
            <ul>
              {
                this.state.markers.map((marker) => (<li onClick={() => window.google.maps.event.trigger(marker, 'click', {})
} key={marker.title}>{marker.title}</li>))
              }
            </ul>
          </div>

          <div className="FetchedImage">
            {this.state.windowIsOpened && <WikiImage marker={this.state.activeMarker.article}/>}
          </div>

        </div>
        <div className="map">
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
