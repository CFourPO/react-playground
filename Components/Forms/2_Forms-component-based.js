const Card = (props) => {
  return (
    <div>
      <img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  )
}



const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card {...card} /> )}
    </div>
  );
}

class Form extends React.Component {

	state = {
  	userName: ''
  }
  
	handleSubmit = (event) => {
  	event.preventDefault();
    console.log("Accessing userNameInput: ", this.userNameInput.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
          value={this.state.userName}
          onChange={(event) => this.setState({userName: event.target.value})}
          placeholder="Github Username" />
        <button type="submit">Add Card</button>
      </form>
    )
  }
}

class App extends React.Component {
  state = {
    cards: [
      { name: "Chris Pomerville",
       avatar_url: "https://avatars0.githubusercontent.com/u/7713603?v=3",
       company: "null" },
      { name: "Chris Pomerville",
       avatar_url: "https://avatars0.githubusercontent.com/u/7713603?v=3",
       company: "null" }
    ]
  }
  
	render() {
  return (
    <div>
      <Form />
      <CardList cards={this.state.cards}/>
    </div>
  )
}
}

ReactDOM.render(<App />, mountNode);