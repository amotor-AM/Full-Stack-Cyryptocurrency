import React, {Component} from "react"
import Transaction from "./Transaction"
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import history from "../history"

const POLL_INTERVAL_MS = 10000

class TransactionPool extends Component {
    state = {transactionPoolMap: {}}

    fetchMineTransactions = () => {
        fetch(`${document.location.origin}/api/mine-transactions`).then(response => {
            if(response.status === 200) {
                alert("successfully mined transactions")
                history.push("/blocks")
            } else {
                alert("Mine transactions block request did not complete successfully")
            }
        })
    }

    fetchTransactionPoolMap = () => {
        fetch(`${document.location.origin}/api/transaction-pool-map`).then(response => response.json()).then(json => {
            this.setState({transactionPoolMap: json})
        })
    }

    componentDidMount() {
        this.fetchTransactionPoolMap()

        this.fetchPoolMapInterval = setInterval(() => this.fetchTransactionPoolMap(), POLL_INTERVAL_MS)
    }

    componentWillUnmount() {
        clearInterval(this.fetchPoolMapInterval)
    }

    render() {
        return (
            <div className="Transaction-Pool">
                <div>
                    <Link to="/">Home</Link>
                </div>
                <h3>Transaction Pool</h3>
                {
                    Object.values(this.state.transactionPoolMap).map(transaction => {
                        return (
                            <div key={transaction.id}>
                                <hr/>
                                <Transaction transaction={transaction}/>
                            </div>
                        )
                    })
                }
                <hr/>
                <Button bsStyle="danger" onClick={this.fetchMineTransactions}>Mine Transactions</Button>
            </div>
        )
    }
}

export default TransactionPool