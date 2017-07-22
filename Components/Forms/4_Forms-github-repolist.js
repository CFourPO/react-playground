const Card = props => {
  return (
    <div style={{float: 'left', width: '100%'}}>
      <img width="75" src={props.avatar_url} style={{float: 'left'}}/>
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
          {props.name}
        </div>
        <div>
          {props.company}
        </div>
        <div>
          <a href="#" onClick={() => props.selectUser(props.repos_url)}>
            View Repos
          </a>
        </div>
      </div>
    </div>
  );
};

const CardList = props => {
  return (
    <div style={{float: 'left', width: '50%'}}>
      {props.cards.map(card =>
        <Card selectUser={props.selectUser} {...card} />,
      )}
    </div>
  );
};

const RepoList = props => {
  return (
    <div style={{height: '300px', position: 'relative', float: 'right', margin: 0, padding: 0, width: '50%'}}>
      <ul style={{margin: 0, padding: 0}}>
      {props.repos.map(repo =>
        <li>
          <a href={repo.html_url} className="list-item" target="_blank">{repo.name}</a>
        </li>
      )}
      </ul>
    </div>
  );
};

class Form extends React.Component {
  state = {
    userName: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userName}`)
      .then(response => {
        this.props.onSubmit(response.data);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="Github Username"
        />
        <button class="btn btn-primary" type="submit">
          Add Card
        </button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: [],
    repos: [],
  };

  addNewCard = cardInfo => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo),
    }));
  };

  selectUser = reposUrl => {
    axios.get(reposUrl).then(response => {
      this.setState(prevState => ({
        repos: response.data
      }));
    });
  };

  render() {
    return (
      <div style={{height: '400px'}}>
          <Form onSubmit={this.addNewCard} />
          <CardList cards={this.state.cards} selectUser={this.selectUser} />
          <RepoList repos={this.state.repos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
