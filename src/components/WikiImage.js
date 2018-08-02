import React, {Component} from 'react';

export class WikiImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: []
    }
  }
  componentDidMount() {
    this.fetchImage();
  }
  componentDidUpdate(prevProps) {
    if (this.props.marker !== prevProps.marker) {
      this.fetchImage();
    }
  }

  fetchImage() {
    let controlledThis = this;
    fetch("https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&origin=*&pithumbsize=500&titles=" + this.props.marker, {}).then(response => {
      return response.json();
    }).then(data => {

      for (var prop in data.query.pages) {
        if (data.query.pages[prop].thumbnail) {
          this.setState({picture: data.query.pages[prop].thumbnail.source});
        }
        break;
      }
      //error handling
    }).catch(function(error) {
      let pageError = 'Parsing failed ' + error;
      controlledThis.setState({text: pageError});
    })
  }
  render() {
    return (<img src={this.state.picture} alt={"Photo of " + this.props.title} style={{
        maxWidth: '100%'
      }}/>)
  }

}
export default WikiImage;
