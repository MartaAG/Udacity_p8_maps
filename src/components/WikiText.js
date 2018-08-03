import React, {Component} from 'react'

export class WikiText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: []
    }
  }
  componentDidMount() {
    this.fetchText();
  }
  componentDidUpdate(prevProps) {
    if (this.props.article !== prevProps.article) {
      this.fetchText();
    }
  }
  //catching errors based on  https://www.tjvantoll.com/2015/09/13/fetch-and-errors/

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}
  //fetching article from MediaWIki
  fetchText = () => {
    let thisComponent = this;
    fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&origin=*&exintro=&exsentences=5&explaintext=&titles=" + this.props.article, {})
    .then(this.handleErrors)
    .then(data => {
    //get first attribute from pages object
      for (var prop in data.query.pages) {
        let extract = data.query.pages[prop].extract
        if (extract.length !== 0) {
          this.setState({text: extract});
        } else {
          this.setState({text: "Sorry, there is no extract for this article"});
        }
        break;

      }
      //error handling
    }).catch(error =>
      {
          thisComponent.setState({text: "Error: " + error});
      }
    )
  }
  render() {

    return (<section className="overflow">

      <h2>{this.props.title}</h2>
      <p className="wiki">Text and photo provided by Wikipedia</p>
      <p className="bodytext">{this.state.text}</p>
    </section>)
  }
}

export default WikiText;
