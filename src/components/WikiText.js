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
    if (this.props.marker !== prevProps.marker) {
      this.fetchText();
    }
  }
  fetchText = () => {
    let controlledThis = this;
    fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&origin=*&exintro=&explaintext=&titles=" + this.props.title, {}).then(response => {
      return response.json();
    }).then(data => {
      for (var prop in data.query.pages) {
        let extract = data.query.pages[prop].extract
        if (extract.length !== 0) {
          this.setState({text: extract});
        } else {
          this.setState({text: "Sorry, there is no extract for this article"});
        }
        break;

      }
    }).catch(function(error) {
      let pageError = 'Parsing failed ' + error;
      controlledThis.setState({text: pageError});
    })

  }
  render() {

    return (<section className="overflow">
      <h2>{this.props.title}</h2>
      <h4>Provided by Wikipedia</h4>
      <p>{this.state.text}</p>
    </section>)
  }
}

export default WikiText;
