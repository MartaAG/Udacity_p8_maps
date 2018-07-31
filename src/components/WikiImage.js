import React, {Component} from 'react';

export class WikiImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: [],

    }
  }
  componentDidMount() {
    //https://pl.wikipedia.org/wiki/Pomnik_Anonimowego_Przechodnia_we_Wroc%C5%82awiu
    fetch("https://pl.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&origin=*&pithumbsize=500&titles=" + this.props.marker, {}).then(response => {
      return response.json();
    }).then(data => {

      for (var prop in data.query.pages) {
        if(data.query.pages[prop].thumbnail){
        this.setState({picture: data.query.pages[prop].thumbnail.source});
        }
        break;
      }
    })
  }


  render() {
    return(
     <img src={this.state.picture} alt="Loading..."
       style={{maxWidth: '100%' }}
       />
  )
  }

}
export default WikiImage;
