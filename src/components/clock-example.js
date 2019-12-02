import * as Dynamo from "../Dynamo/src";

var c = 1;
/** @jsx Dynamo.createElement */
export const ClockExample = props => {
  const [dateTimeValue, setDateTime] = Dynamo.useState(new Date().toString());
  setInterval(() => {
    setDateTime(() => new Date().toString());
  }, 1000);

  const [counter, setCounter] = Dynamo.useState(0);
  const [square, setSquare] = Dynamo.useState(2);

  const style = {
    border: "4px solid red",
    padding: "10px 10px",
    "margin-top": "10px"
  };
  const buttonStyle1 = {
    "background-color": "#4CAF50",
    border: "none",
    color: "white",
    padding: "15px 32px",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    "font-size": "16px"
  };

  c++;
  const r = Dynamo.useMemo(() => {
    return 1 + 1;
  }, [c % 2 == 0]);

  return (
    <div style={style}>
      <p>Memo:{r}</p>
      <h1 className="a b c">Digital Clock {dateTimeValue}</h1>
      <button
        style={buttonStyle1}
        onClick={() => {
          setCounter(c => c + 1);
        }}
      >
        + {counter}
      </button>
     <br/>  <br/>
      <button className="myButton"
        onClick={() => {
          setSquare(c => c * 2);
        }}
      >
        Click
      </button>
      Square:{square}
    </div>
  );
};
