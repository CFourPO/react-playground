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

let data = [
	{ name: "Chris Pomerville",
    avatar_url: "https://avatars0.githubusercontent.com/u/7713603?v=3",
    company: "null" },
  { name: "Chris Pomerville",
    avatar_url: "https://avatars0.githubusercontent.com/u/7713603?v=3",
    company: "null" },
];

const CardList = (props) => {
	return (
  	<div>
      {props.cards.map(card => <Card {...card} /> )}
    </div>
  );
}

ReactDOM.render(<CardList cards={data}/>, mountNode);