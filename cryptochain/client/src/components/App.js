import React, {Component, useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import logo from "../assets/logo.png"
import HeaderComponent from "./header"

class App extends Component {
    state = {walletInfo : {}}

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
        .then((response) =>  response.json())
        .then(json => this.setState({walletInfo: json}))
    }

  render() {
    const {address, balance} = this.state.walletInfo
    return (
        <div className="App">
            <HeaderComponent/>
            <br/>
            <div>Welcome to Blockchain Learning Academy</div>
            <br/>
            <div><Link to="/blocks">Blocks</Link></div>
            <div><Link to="/conduct-transaction">Conduct A Transaction</Link></div>
            <div><Link to="/transaction-pool">Transaction Pool</Link></div>
            <br/>
            <div className="walletInfo">
                <div>Address : {address}</div>
                <div>Balance: {balance}</div>
            </div>
        </div>
    )
  }
}

export default App