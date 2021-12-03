import React from 'react';
import ReactDOM from 'react-dom';
import LastTen from './components/LastTen.jsx'
import PlayersList from './components/PlayersList.jsx'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      betValueInput: '',
      betValue: 0,
      currentBalance: 100,
      lastTenCrashes: [100.00,0.00,5.00,0.00,5.00,0.00,0.00,6.00,0.00,0.00]
    }
  }

  handleChange = (e) => {
    this.setState({ betValueInput: e.target.value })
    console.log(this.state.betValueInput)
  }

  submitBet = () => {
    console.log(Number(this.state.betValueInput))
    if (this.state.betValueInput === '') {
      alert('You need enter a bet!')
    } else if (!Number(this.state.betValueInput)) {
      alert('Please enter a valid number')
    } else if (this.state.betValueInput > this.state.currentBalance) {
        alert('You dont have enough points')
      } else {
        this.setState({ betValue: this.state.betValueInput, betValueInput: '' })
        this.setState({ currentBalance: this.state.currentBalance - this.state.betValue })
      }
  }

  render () {
    console.log(this.state.lastTenCrashes)
    return (
      <div className="app-plate">
        <div className="app-conainter">
          <div className="titleContainer">
            <h1 className="title">Hack In Or Git Out!</h1>
          </div>
          <div className="lastTenSection">
            <LastTen
              lastTenCrashes={this.state.lastTenCrashes} />
          </div>
          <div className="centerContainer">
            <div className="chartSection">
              <div className="chartContainer">
                <div className="chart">Corki is that guy</div>
              </div>
            </div>
            <div className="playersSection">
              <div className="playersContainer">
                <PlayersList />
              </div>
            </div>
          </div>
          <div className="playerInput">
            <div className="betAmountContainer">
              <input className="betAmount" placeholder="Place your bet!" value={this.state.betValueInput} onChange={this.handleChange}></input>
            </div>
            <div className="betButtonContainer">
              <button className="betButton" onClick={() => {this.submitBet()}}>Bet!</button>
            </div>
            <div className="currentBalanceContainer">
              <div className="currentBalance">Current Balance: {this.state.currentBalance} points</div>
            </div>
            <div className="overallContainer">
              <div className="overall">+/- on the day</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));