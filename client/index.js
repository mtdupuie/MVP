import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import LastTen from './components/LastTen.jsx'
import PlayersList from './components/PlayersList.jsx'
import LoginScreen from './components/LoginScreen.jsx'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginAlert: '',
      loginAlertStatus: false,
      loginStatus: false,
      currentBalance: 100,
      lastTenCrashes: [],
      activeUsers: [],
      username: '',
      password: '',
      loginId: null,
      crashSec: 1,
      crashMs: 0,
      targetSec: 0,
      targetMs: 0,
      timeBegan: null,
      started: null,
      countDownStarted: null,
      countDown: 6,
      lastWinLost: [],
      lastWinLostBool: [],
      betValue: 0,
      betValueInput: '',
      gameActive: false,
      alertMessage: '',
      crash: false,
      crashAlert: false,
      gotOutNum: 0,
      gotOut: false,
      betPlaced: false,
      alert: false,
      allowGetOut: true,
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
    this.startCountDown = this.startCountDown.bind(this)
  }

  /*
   *  Top 10 stuff
  */
  updateLastTen = (sec, ms) => {
    const newNum = Number(`${sec}.${ms}`);
    const array = this.state.lastTenCrashes;
    if (this.state.lastTenCrashes.length < 10) {
      array.unshift(newNum)
      this.setState({ lastTenCrashes: array });
    } else {
      array.pop();
      array.unshift(newNum);
      this.setState({ lastTenCrashes: array });
    }
    axios.post(`/results`, { result: newNum })
      .then((response) => {
        var result = response;
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getFirstTen = () => {
    axios.get('/results')
      .then((results) => {
        const data = [];
        results.data.forEach(result => {
          data.push(Number(result.result))
        })
        this.setState({ lastTenCrashes: data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  /*
   *  Random numbers
   */
  getRandomNumbers = () => {
    var randomNum = Math.random();
    if (randomNum < 0.66) {
      this.setState({ targetSec: Math.floor(Math.random() * (14 - 2 + 1) + 2), targetMs: Math.floor(Math.random() * (960 - 0 + 1) + 0) })
    } else {
      this.setState({ targetSec: 1, targetMs: 200 })
    }
  }

  /*
   * Handle win lost board
   */
  winLoss = (bool, num) => {
    var newArray1 = this.state.lastWinLost
    var newArray2 = this.state.lastWinLostBool
    if (this.state.lastTenCrashes.length < 16) {
      newArray1.unshift(num);
      newArray2.unshift(bool);
      this.setState({ lastWinLost: newArray1, lastWinLostBool: newArray2 });
    } else {
      newArray1.pop();
      newArray2.pop();
      newArray1.unshift(num);
      newArray2.unshift(bool);
      this.setState({ lastWinLost: newArray1, lastWinLostBool: newArray2 });
    }
  }

  /*
   *  Countdown functions
  */
  startCountDown = () => {
    this.state.countDownStarted = setInterval(this.runCountDown, 1000)
  }

  runCountDown = () => {
    if (this.state.countDown === 0) {
      clearInterval(this.state.countDownStarted);
      this.setState({ countDown: 6 })
      this.startGame();
    }
    this.setState({ countDown: this.state.countDown - 1 })
  }

  startGame = () => {
    this.setState({timeBegan: new Date(), gameActive: true, crashAlert: false, gotOut: false, alert: false, betValueInput: ''})
    this.state.started = setInterval(this.clockRunning, 10);
  }

  resestGame = () => {
    this.setState({ crashSec: 1 , crashMs: 0, timeBegan: null, start: null, allowGetOut: true, betPlaced:false })
  }

  clockRunning = () => {
    if (this.state.crashSec === this.state.targetSec && (this.state.crashMs > this.state.targetMs) && (this.state.crashMs < 9999)) {
      this.setState({ allowGetOut: false })
      clearInterval(this.state.started);
      if (this.state.betPlaced && !this.state.gotOut) {
        this.winLoss(false, Number(this.state.betValue).toLocaleString(undefined, { minimumFractionDigits: 2 } ))
      }
      this.updateLastTen(this.state.crashSec, this.state.crashMs);
      setTimeout(() => {
        this.setState({ gameActive: false })
        this.resestGame();
        this.getRandomNumbers();
        this.startCountDown();
      }, 3000)
    }
    const currentTime = new Date()
    const timeElapsed = new Date(currentTime - this.state.timeBegan)
    this.setState({ crashSec: timeElapsed.getUTCSeconds() + 1, crashMs: timeElapsed.getUTCMilliseconds() })
  }

  /*
  *  Forms and buttons
  */
  handleChangeBetValue = (e) => {
    this.setState({ betValueInput: e.target.value })
  }

  submitBet = () => {
    if (this.state.betValueInput === '' && !this.state.betPlaced) {
      this.setState({ alertMessage: 'You need to enter a bet!', alert: true, betValueInput: '' })
    } else if (!Number(this.state.betValueInput) && !this.state.betPlaced) {
      this.setState({ alertMessage: 'Please enter a valid number!', alert: true, betValueInput: '' })
    } else if (this.state.betValueInput > this.state.currentBalance && !this.state.betPlaced) {
      this.setState({ alertMessage: 'You dont have enough points!', alert: true, betValueInput: '' })
      } else {
        if (!this.state.betPlaced) {
        this.setState({ betValue: this.state.betValueInput, betValueInput: '', betPlaced: true, alertMessage: 'You have placed a bet!', alert: false });
        setTimeout(()=> {
          this.setState({ currentBalance: this.state.currentBalance - this.state.betValue, betValueInput: '' });
        }, 100)
        }
      }
  }

  handleChangeUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  submitGitOut = () => {
    if (this.state.betPlaced && this.state.allowGetOut) {
      if (this.state.crashSec >= 2 && this.state.gameActive && !this.state.gotOut) {
        var tempNum = (this.state.betValue * Number(`${this.state.crashSec}.${this.state.crashMs}`))
        var toAdd = tempNum + this.state.currentBalance;
        this.setState({ currentBalance: Number(toAdd.toFixed(2)), crashAlert: true, gotOutNum: Number(`${this.state.crashSec}.${this.state.crashMs}`), gotOut: true, betValue: 0, betPlaced: false})
        this.winLoss(true, tempNum.toLocaleString(undefined, { minimumFractionDigits: 2 } ));
        setTimeout(() => {
          axios.put(`/addPoints`, { id: this.state.loginId, points: this.state.currentBalance})
          .then((results) => {
            var result = results;
          })
          .catch((error) => {
            console.log(error);
          })
        }, 100)
      }
    }
  }

  /*
  *  Login in and Sign up functions
  */
  submitLogin = () => {
    axios.get(`/login/${this.state.username}`)
      .then((result) => {
        if(this.state.password === result.data[0].password) {
          this.setState({ loginStatus: 'success', currentBalance: Number(result.data[0].points), loginId: result.data[0].id})
          setTimeout(() => {
            this.setState({ loginStatus: true })
          }, 1500)
        } else {
          this.setState({ loginAlert: 'You have entered and incorrect username or password', loginAlertStatus: true })
        }
      })
  }

  submitSignUp = () => {
    axios.post(`/signUp`, {
      username: this.state.username,
      password: this.state.password,
      points: 100
    })
    .then((result) => {
      console.log(result.data)
      if (!result.data) {
        this.setState({ loginAlert: 'Username is already taken', loginAlertStatus: true })
      } else {
        this.setState({ loginStatus: 'success' })
        setTimeout(() => {
          this.setState({ loginStatus: true })
        }, 1500)
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  componentDidMount = () => {
    let msg = `%c Hi 👋! Welcome to my site!`;
    let styles= [
    `font-size: 12px`,
    `font-family: monospace`,
    `background: white`,
    `display: inline-block`,
    `color: black`,
    `padding: 8px 19px`,
    `border: 1px dashed;`
    ].join(`;`)
    let stylesArray= [
      `background-size: cover`,
      `color: #fff`,
      `padding: 10px 20px`,
      `line-height: 35px`,
      `width : 70px`,
      `height : 70px`,
      `border : 5px solid black` ].join(`;`)
    console.log(msg, styles);
    console.log(`%c Having Fun!?`, stylesArray);
    this.getFirstTen();
    this.getRandomNumbers();
    this.startCountDown();
  }

  renderView = () => {
    if (this.state.loginStatus === false) {
      return (
        <LoginScreen
          username={this.state.username}
          password={this.state.password}
          loginAlert={this.state.loginAlert}
          loginAlertStatus={this.state.loginAlertStatus}
          submitLogin={this.submitLogin}
          submitSignUp={this.submitSignUp}
          handleUsername={this.handleChangeUsername}
          handlePassword={this.handleChangePassword} />
      )
    } else if (this.state.loginStatus === 'success') {
      return (
        <div className="login-plate">
            <div className="welcome">WELCOME</div>
        </div>
      )
    } else {
      return (
        // <div className="app-plate-container"></div>
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
                    {this.state.gameActive === true ?
                    <div className="chart">{this.state.crashSec}.{this.state.crashMs}x</div>
                    :
                    <div className="chart">
                    <div className="chartText">The next</div>
                    <div className="chartText">round starts</div>
                    <div className="chartText">in {this.state.countDown}!</div>
                    </div>
                    }
                  </div>
                </div>
                <div className="playersSection">
                  <div className="playersContainer">
                    <PlayersList
                      username={this.state.username}
                      lastWinLost={this.state.lastWinLost}
                      lastWinLostBool={this.state.lastWinLostBool} />
                  </div>
                </div>
              </div>
              <div className="playerInput">
                <div className="betAmountContainer">
                  <input className="betAmount" placeholder="Place your bet!" value={this.state.betValueInput} onChange={this.handleChangeBetValue}></input>
                  {this.state.alert ?
                  <div className="betAlert">{this.state.alertMessage}</div>
                  :
                  null}
                  {this.state.betPlaced ?
                  <div className="betAlert" style={{color: 'green'}}>{this.state.alertMessage}</div>
                  :
                  null}
                </div>
                <div className="betButtonContainer">
                  {this.state.gameActive ?
                  <button className="betButton" onClick={() => {this.submitGitOut()}}>GIT OUT!</button>
                  :
                  <button className="betButton" onClick={() => {this.submitBet()}}>Bet!</button>
                  }
                  {this.state.crashAlert ?
                  <div className="getOutAlert">You got out at {this.state.gotOutNum.toFixed(2)}x</div>
                  :
                  null
                  }
                </div>
                <div className="currentBalanceContainer">
                  <div className="currentBalance">Balance: {(this.state.currentBalance).toLocaleString(undefined, { minimumFractionDigits: 2 } )}</div>
                </div>
                {/* <div className="overallContainer">
                  <div className="overall">+/- on the day</div>
                </div> */}
              </div>
            </div>
          </div>
      )
    }
  }

  render () {
    return (
      this.renderView()
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));