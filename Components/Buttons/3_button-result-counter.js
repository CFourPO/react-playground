class Button extends React.Component {
	
  // handleClick = () => {
  // 	this.setState((prevState) => ({
  // 		counter: prevState.counter + 1
  //   }))
  // }
  
	render() {
  	return (
    	<button onClick={this.props.onClickFunction}>
        +1
      </button>
    )
  }
}

const Result = (props) => {
	return (
  	<div>{props.myResult}</div>
  )
}

class App extends React.Component {
	
  state = { counter: 0 };
  
  incrementCounter = () => {
    this.setState((prevState) => ({
        counter: prevState.counter + 1
    }));
  }

	render() {
		return (
    	<div>
        <Button onClickFunction={this.incrementCounter} />
        <Result myResult={this.state.counter}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);