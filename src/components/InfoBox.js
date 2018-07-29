import React, {Component} from 'react';

export class InfoBox extends Component {
  constructor() {
    super();
    this.state = {
      picture: [],

    }
  }
  componentDidUpdate() {
    //https://pl.wikipedia.org/wiki/Pomnik_Anonimowego_Przechodnia_we_Wroc%C5%82awiu
    fetch("https://pl.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&origin=*&pithumbsize=500&titles=" +"Wrocław", {}).then(response => {
      return response.json();
    }).then(data => {
      for (var prop in data.query.pages) {
        this.setState({picture: data.query.pages[prop].thumbnail.source});
        console.log(this.state.picture);
        break;
      }
    })

  }

  render() {
    let fuck = "fuck";
    return(
     <img src={this.state.picture} alt={fuck}/>
  )
  }

}
export default InfoBox;
