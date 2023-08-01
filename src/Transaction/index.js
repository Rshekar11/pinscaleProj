import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import Headers from "../Headers"
import Navigation from "../Navigation"
import formatDate from "./helpers"
import useTransactionStore from "../store/useTransaction"


const Transaction = () => {
    const {transactions} =useTransactionStore();
    const [transact, setTransact] = useState([""])
    const cookie = Cookies.get('id')
    const response = async (url) => {
        const data = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                "x-hasura-role": "user",
                "x-hasura-user-id": cookie
            }
        })
        const dat = await data.json()
        // console.log(dat)
        const { transactions } = dat
        console.log('',transactions)
        //localStorage.setItem('transactions', JSON.stringify(transactions));
        setTransact(transactions)
    }

    useEffect(() => {
        const url = "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=10&offset=2"
        response(url)
    }, [])
useEffect(()=>{
    console.log('transactions',transactions)
},[transactions])
    return (
        <>
            <div style={{ display: "flex" }} >
                <div>
                    <Headers />
                </div>
                <div>
                    <Navigation />
                    <div style={{ marginLeft: "38px", display: "flex" }}>
                        <h1 style={{ marginLeft: "38px" }}>All Transactions</h1>
                        <Link to="/credit"> <h1 style={{ marginLeft: "38px" }}>Credit</h1></Link>
                      <Link to="/debit"><h1 style={{ marginLeft: "38px" }}>Debit</h1></Link>  
                    </div>
                    <div style={{ marginLeft: "78px", width: "1160px" }}>
                        <table>
                            <tr style={{ width: "100%", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <th>Transaction Name</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                {transact.map(each => {
                                    const { amount, transaction_name, category, date,type } = each
                                    return (
                                        <div style={{width:"100%",display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                            <td style={{marginRight:"98px"}}>{transaction_name}</td>
                                            <td style={{marginRight:"98px"}}>{category}</td>
                                            <td style={{marginRight:"98px"}}>{formatDate(date)}</td>
                                            <td style={{marginRight:"98px"}}>
                                                <span style={{color: type==='credit' ? 'green' : 'red'}}>{type==='credit' ? "+ $":'- $'} {amount}</span>
                                            </td>
                                        </div>)
                                })}

                            </tr>

                        </table>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Transaction