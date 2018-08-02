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

    let infoBox = new window.google.maps.InfoWindow({content: ""});
    controlledThis.setState({infoBox: infoBox});
    //Create markers on the map
    let markers = [];
    places.map((place) => {
      let marker = new window.google.maps.Marker({position: place.latlng, map: map, title: place.name, article: place.title});
      //Opening InfoWindow, add place name to InfoWindow
      marker.addListener('click', function() {
        if (controlledThis.state.windowIsOpened) {
          controlledThis.setState({infoBox: infoBox.close()});
          controlledThis.closeInfoWindow();
        }
        controlledThis.setState({
          infoBox: infoBox.open(marker.get('map'), marker)
        });
        controlledThis.setState({
          infoBox: infoBox.setContent(marker.title)
        });
        controlledThis.openInfoWindow(marker);


      });
      markers.push(marker);
    })
    //Trigger close window after clicking on the map
    controlledThis.setState({markers: markers});

    map.addListener('click', function() {
      controlledThis.setState({infoBox: infoBox.close()});
      controlledThis.closeInfoWindow()
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
      <nav>
        <div className="navbar">
          <h1>Neighbourhood map</h1>
        </div>
      </nav>

      <main className="main">

        <div className="listVIew">
          <SearchPlaces markers={this.state.markers} handleListItemClick={this.handleListItemClick}
        />

          <section className="FetchedImage">
            {this.state.windowIsOpened && <WikiImage marker={this.state.activeMarker.article} title={this.state.activeMarker.title}/>}
            {this.state.windowIsOpened && <WikiText marker={this.state.activeMarker.article} title={this.state.activeMarker.title} />}

          </section>

        </div>
        <div className="map" aria-labelledby="map" role="application">
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
