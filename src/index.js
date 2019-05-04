import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//this is added by me
import './App.css';
import Parser from 'rss-parser';
let parser = new Parser();
//this is added by me



class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      feed: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount(){
    (async () => {
      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
      let feed = await parser.parseURL(CORS_PROXY+'https://9gag-rss.com/api/rss/get?code=9GAGAwesome&format=2');
      console.log(feed.title);
      this.setState({feed: feed.items});
      console.log(this.state.feed[0])
    })();
  }

  render(){
    const elements = this.state.feed.map(item => {
      console.log("elements= ",typeof item.content);
      return  <React.Fragment> {item.content} </React.Fragment>;
    });
    return (
      <div>
      <span dangerouslySetInnerHTML={{ __html: this.state.feed.map(player => "<p>"+player.title+"</p>"+player.content+"<br /><br /><br />").join('') }} />

      </div>

    )
  }
}

ReactDOM.render(<Home/>, document.getElementById('root'));
