import "./styles.css";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState();
  const [cash, setCash] = useState();
  const [errorText, setErrorText] = useState("");
  const [denomination, setDenomination] = useState(Array(9).fill(0));

  const notes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];

  const calculateChange = (e) => {
    var change = cash - amount;
    let noteCounter = Array(9).fill(0);
    if (change < 0) {
      setErrorText("Cash given must not be less than the bill amount");
      setDenomination(Array(9).fill(0));
    } else {
      setErrorText("");
      for (let i = 0; i < 9; i++) {
        if (change >= notes[i]) {
          noteCounter[i] = Math.floor(change / notes[i]);
          change = change - noteCounter[i] * notes[i];
        }
      }
      setDenomination(noteCounter);
    }
  };

  const restrictToNumbers = (e) => {
    const re = /^[0-9.]*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (e.target.id === "amount") {
        setAmount(e.target.value);
      } else if (e.target.id === "cash") {
        setCash(e.target.value);
      }
    } else {
      if (e.target.id === "amount") {
        setAmount(0);
      } else if (e.target.id === "cash") {
        setCash(0);
      }
    }
  };

  return (
    <div className="App">
      <div className="app__title">What's the change?</div>
      <div className="app__subtitle">
        Enter the bill amount and cash given by the customer and know the
        denomination of notes to return
      </div>
      <input
        id="amount"
        value={amount}
        className="change__inputname change__input"
        placeholder="Bill Amount"
        onChange={restrictToNumbers}
      />
      <input
        id="cash"
        value={cash}
        className="change__inputname change__input"
        placeholder="Cash Given"
        onChange={restrictToNumbers}
      />
      <input
        type="submit"
        className="change__inputname change__submit"
        value="Calculate"
        onClick={calculateChange}
      />
      <div className="app__errorlabel">{errorText}</div>

      <div className="app__title">Return Change</div>

      <table className="change__table">
        <tr>
          <td className="change__table change__tablevalues">No of Notes</td>
          {denomination.map((e) => (
            <td
              className={
                "change__table change__tablevalues " +
                (e != 0 && "change__required")
              }
            >
              {e}
            </td>
          ))}
        </tr>
        <tr>
          <td className="change__table change__tablevalues">Note</td>
          {notes.map((e) => (
            <td className="change__table change__tablevalues">{e}</td>
          ))}
        </tr>
      </table>
      <div className="footer">
        Made by <a href="https://rohit.xyz">Rohit Gaur</a> with{" "}
        <i className="fab fa-react"></i> and <i className="fa fa-heart"></i>
      </div>
    </div>
  );
}

export default App;
