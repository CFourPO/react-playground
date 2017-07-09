var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {
  
	return (
		<div className="col-5">
			{_.range(props.numberOfStars).map((i) => 
      	<i key={i} className="fa fa-star"></i>
      )}
		</div>
	)
}

const Button = (props) => {
	let button;
  switch(props.answerIsCorrect)	{
  	case true:
    	button =
        <button className="btn btn-success"
                onClick={props.acceptAnswer}>
          <i className="fa fa-check"></i>
        </button>
    	break;
    case false:
    	button =
        <button className="btn btn-danger">
          <i className="fa fa-times"></i>
        </button>
    	break;
    default:
    	button = 
        <button className="btn" 
                onClick={props.checkAnswer}
                disabled={props.selectedNumbers.length==0}>
        =
        </button>
  }
	return (
		<div className="col-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning btn-sm"
              disabled={props.numberOfRedraws == 0}
              onClick={props.redraw}>
        <i className="fa fa-refresh"></i>&nbsp;{props.numberOfRedraws}
      </button>
		</div>
	)
}

const Answer = (props) => {
	return (
		<div className="col-5">
			{props.selectedNumbers.map((number, i) => 
      	<span key={i}
              onClick={() => props.deselectNumber(number)}>{number}</span>
      )}
		</div>
	)
}

const Numbers = (props) => {
	const numberClassName = (number) => {
  	if (props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected'
    } else if (props.usedNumbers.indexOf(number) >= 0) {
    	return 'used'
    }
  }
	return (
		<div className="card text-center">
			<div>
        {Numbers.list.map((number, i) => 
        	<span key={i} className={numberClassName(number)}
                onClick={() => props.selectNumber(number)}>{number}</span>
        )}
      </div>
		</div>
	)
}

const DoneStatus = (props) => {
	return (
		<div className="text-center">
			<h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary"
              onClick={props.resetGame}>Play Again!</button>
		</div>
	)
}

Numbers.list = _.range(1,10);

class Game extends React.Component {

	static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  
	static initialState = () => ({
  	numberOfStars: Game.randomNumber(),
  	selectedNumbers: [],  
    usedNumbers: [],
    answerIsCorrect: null,
    numberOfRedraws: 3,
    doneStatus: null
  });
  
  state = Game.initialState();
  
  resetGame = () => this.setState(Game.initialState());
  
  selectNumber = (clickedNumber) => {
  	if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  }

  deselectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers
      													.filter(num => num !== clickedNumber)
    }));
  }
    
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: 
      	(prevState.selectedNumbers
      					.reduce((sum, val) => sum + val, 0) == prevState.numberOfStars)
    }));
  }
  
  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
  		numberOfStars: Game.randomNumber()
    }), this.updateDoneStatus);
  }
  
  redraw = () => {
  	if (this.state.numberOfRedraws === 0) { return; }
    this.setState(prevState => ({
    	numberOfRedraws: prevState.numberOfRedraws - 1,
      numberOfStars: Game.randomNumber(),
      selectedNumbers: []
    }), this.updateDoneStatus);
  }
  
  possibleSolutions = ({numberOfStars, usedNumbers}) => {
  	const possibleNumbers = _.range(1, 10).filter(num => 
    	usedNumbers.indexOf(num) === -1
    ); 
    
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }
  
  updateDoneStatus = () => {
  	this.setState(prevState => {
    	if (this.state.usedNumbers.length === 9) {
      	return {doneStatus: "Done! Nice!"};
      }
      if (prevState.numberOfRedraws === 0 && !this.possibleSolutions(prevState)) {
      	return {doneStatus: "Game Over!"};
      }
    });
	}
  
	render() {
  	const {
    	usedNumbers,
    	selectedNumbers,
      numberOfStars,
      numberOfRedraws,
      answerIsCorrect,
      doneStatus } = this.state;
      
		return (
			<div className="container">
				<h3>Play Nine!</h3>
        <hr />
				<div className="row">
          <Stars numberOfStars={numberOfStars}/>
				  <Button selectedNumbers={selectedNumbers}
                  checkAnswer={this.checkAnswer}
                  acceptAnswer={this.acceptAnswer}
                  numberOfRedraws={numberOfRedraws}
                  redraw={this.redraw}
                  answerIsCorrect={answerIsCorrect}/>
				  <Answer selectedNumbers={selectedNumbers}
                  deselectNumber={this.deselectNumber}/>
        </div>
        <br />
        { doneStatus ? 
        	<DoneStatus doneStatus={doneStatus}
                      resetGame={this.resetGame}/> :
          <Numbers usedNumbers={usedNumbers}
                 selectedNumbers={selectedNumbers}
                 selectNumber={this.selectNumber} /> }
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<Game />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);