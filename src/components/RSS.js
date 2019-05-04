import React from 'react';
import '../App.css';
import Parser from 'rss-parser';
let parser = new Parser();
//this is added by me



class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      feedTitle: '',
      feed: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount(props){//const navBar = document.querySelector('')
    (async () => {
      const url = this.props[0];
      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
      let feed = await parser.parseURL(CORS_PROXY+url);
      this.setState({feedTitle: feed.title});
      this.setState({feed: feed.items});
      const titleLst = this.state.feedTitle.split(' ');
      const title = titleLst[titleLst.length-1];
      const link = document.querySelector(`#${title}`);
      link.setAttribute('class', 'active');
    })();
  }

  render(){
    return (
      <div>
      <h1>{this.state.feedTitle}</h1>
      <span dangerouslySetInnerHTML={{ __html: this.state.feed.map(player => "<p>"+player.title+"</p>"+player.content+"<br /><br /><br />").join('') }} />

      </div>

    )
  }
}
export default Home;
