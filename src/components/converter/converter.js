import { useRef } from "react"
import "./converter.css"

function Converter() {
    let result = 0;
    let input1 = useRef()
    let input2 = useRef()
    let select1 = useRef()
    let select2 = useRef()

    async function getData(from, to) {
        return await fetch("https://v6.exchangerate-api.com/v6/d830031915e98e4f358a90a3/latest/" + from)
            .then(response => response.json())
            .then(response => result = response.conversion_rates[to])

    }

    function changeValue(e) {
        let changedElement = e.target.id
        let input1Value = input1.current.value
        let input2Value = input2.current.value

        if (changedElement === "input1" && input1Value.length > 0) {
            getData(select1.current.value, select2.current.value)
            input2.current.value = (result * input1Value).toFixed(2)
        }
        else if (changedElement === "input2" && input2Value.length > 0) {
            getData(select2.current.value, select1.current.value)
            input1.current.value = (result * input2Value).toFixed(2)
        }
        else if (changedElement === "select1" && input1Value.length > 0) {
            getData(select1.current.value, select2.current.value)
                .then(r => {
                    input2.current.value = (result * input1Value).toFixed(2)
                })

        } else if (changedElement === "select2" && input2Value.length > 0) {
            getData(select1.current.value, select2.current.value)
                .then(r => {
                    input2.current.value = (result * input1Value).toFixed(2)
                })
        } else {
            input1.current.value = NaN
            input2.current.value = NaN
        }
    }

    return (
        <div className="converter">

            <input id="input1" onChange={changeValue} ref={input1} style={{ float: "left" }} type="number" min="0" pattern="^\d*(\.\d{0,2})?$"></input>
            <input id="input2" onChange={changeValue} ref={input2} style={{ float: "right" }} type="number" min="0"></input>

            <select id="select1" onChange={changeValue} ref={select1} style={{ float: "left", marginLeft: "110px" }}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
                <option value="PLN">PLN</option>
            </select>

            <select id="select2" onChange={changeValue} ref={select2} style={{ float: "right", marginRight: "110px" }}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
                <option value="PLN">PLN</option>
            </select>

            <div className="equal">=</div>
        </div>
    )
}

export default Converter



