import React, { Component } from 'react';
import './App.css';
import Feed from 'rss-to-json';
import { ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap';

class App extends Component {
  state = {
    episodes: [],
    shows: [],
    view: 'episodes'
  }

  componentDidMount() {
    Feed.load('http://amediocretime.libsyn.com/rss', (err, rss) => {
      this.setState({episodes: rss.items})
      const show = {
        title: rss.title,
        description: rss.description,
        image: rss.image,
        url: rss.url
      }
      this.setState({shows: [...this.state.shows, show]})
    });
  }

  renderListItems(view) {
    const { episodes, shows } = this.state;
    if (view === 'episodes') {
      return episodes.map(episode => (
        <ListGroupItem
          key={episode.created}
          href={episode.enclosures[0].url}>{episode.title}</ListGroupItem>
      ));
    } else if (view === 'shows') {
      return shows.map(show => (
        <ListGroupItem
          key={show.url}
          href={show.image}>{show.title}</ListGroupItem>
      ));
    }
  }

  toggleView = (e) => {
    const newView = e.target.id;
    this.setState({
      ...this.state,
      view: newView
    })
  }

  render() {
    const { view } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <ButtonGroup>
            <Button id="episodes" onClick={this.toggleView}>Episodes</Button>
            <Button id="shows" onClick={this.toggleView}>Shows</Button>
          </ButtonGroup>
        </header>
        <div className="App-intro">
          {this.renderListItems(view)}
        </div>
      </div>
    );
  }
}

export default App;
