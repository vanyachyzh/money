import { useEffect, useState } from "react"
import "./header.css"
function Header() {

    let [eur, setEur] = useState(0)
    let [usd, setUsd] = useState(0)
    let [pln, setPln] = useState(0)

    useEffect(() => {
        fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
            .then(r => r.json())
            .then(r => {
                setEur((r[32].rate).toFixed(2))
                setUsd((r[25].rate).toFixed(2))
                setPln((r[33].rate).toFixed(2))
            })
    }, [])

    return (
        <header>
            <div className="currentValue"> <img src={require('./../../img/eu-flag.webp')}/> EUR: {eur}</div>
            <div className="currentValue"> <img src={require('./../../img/uk-flag.webp')}/> USD: {usd}</div>
            <div className="currentValue"> <img src={require('./../../img/pl-flag.webp')}/>PLN: {pln}</div>
        </header>
    )
}

export default Header
