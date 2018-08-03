import React, {Component} from 'react';

export class WikiImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      error: 'None'
    }
  }
  componentDidMount() {
    this.fetchImage();
  }
  componentDidUpdate(prevProps) {
    if (this.props.article !== prevProps.article) {
      this.fetchImage();
    }
  }
  //catching errors based on  https://www.tjvantoll.com/2015/09/13/fetch-and-errors/

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}
//fetching image from MediaWiki
  fetchImage() {
    let thisComponent = this;
    fetch("https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&origin=*&pithumbsize=500&titles=" +
    this.props.article, {})
    .then(this.handleErrors)
    .then(data => {
//get first attribute from pages object
      for (var prop in data.query.pages) {
        if (data.query.pages[prop].thumbnail) {
          this.setState({picture: data.query.pages[prop].thumbnail.source});
        } else {
          this.setState({picture: ""});
        }
        break;
      }
      //error handling
    }).catch(error =>
      {
          thisComponent.setState({error: "Error: " + error});
      }
    )
  }
  render() {
    return (
      <Image error = {this.state.error} title={this.props.title} picture={this.state.picture}/>
    )
  }

}
function Image(props){
  const error = props.error;
  if (error === 'None'){
    return   <img
      className="Photo"
      src={props.picture}
      alt={"Photo of " + props.title}
      style={{
        maxWidth: '100%'
      }}/>;
  } else {
      return  <p  style={{
          fontWeight: 'bold',
          borderStyle: 'solid',
          padding: '5px',
          backgroundColor: 'lightgrey'
        }}>Sorry, this photo is not available</p>
  }
}
export default WikiImage;
