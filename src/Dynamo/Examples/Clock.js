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
  c++;
  const r = Dynamo.useMemo(() => {
    return 1 + 1;
  }, [c % 2 == 0]);

  return (
    <div style={style}>
      <p>Memo:{r}</p>
      <h1 className="a b c">Digital Clock {dateTimeValue}</h1>
      <button
        onClick={() => {
          setCounter(c => c + 1);
        }}
      >
        Click
      </button>
      Counter:{counter}
      <button
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
