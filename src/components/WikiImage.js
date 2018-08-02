import React, {Component} from 'react';

export class WikiImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: ''
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
//fetching image from MediaWiki
  fetchImage() {
    let thisComponent = this;
    fetch("https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&origin=*&pithumbsize=500&titles=" + this.props.article, {}).then(response => {
      return response.json();
    }).then(data => {

      for (var prop in data.query.pages) {
        if (data.query.pages[prop].thumbnail) {
          this.setState({picture: data.query.pages[prop].thumbnail.source});
        } else {
          this.setState({picture: ""});
        }
        break;
      }
      //error handling
    }).catch(function(error) {
      let pageError = 'Parsing failed ' + error;
      thisComponent.setState({text: pageError});
    })
  }
  render() {
    return (
      <img
      className="Photo"
      src={this.state.picture}
      alt={"Photo of " + this.props.title}
      style={{
        maxWidth: '100%'
      }}/>)
  }

}
export default WikiImage;
