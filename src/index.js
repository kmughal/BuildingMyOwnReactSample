import * as Dynamo from "./Dynamo/src";

/** @jsx Dynamo.createElement */
const element = () => {
  const [counter, setCounter] = Dynamo.useState(0);
  var style = {
    background: "pink",
    border: "1px solid yellow",
    padding: "10px 10px"
  };

  const textBoxStyle = {
    border: "1px solid gray",
    "border-radius": "5px 5px",
    padding: "5px 5px",
    color: "red"
  };
  const handleClick = event => {
    setCounter(c => c + 1);
  };

  return (
    <section>
      <h1>Application 1</h1>
      <h1 style={style}>Simple Counter Example:</h1>
      <p>
        This is a simple example. Using hooks!
        <span>This is a test</span>
      </p>
      <input style={textBoxStyle} type="text" value={counter} />
      <button onClick={handleClick}>Counter</button>
    </section>
  );
};

const timeElement = props => {
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

  return (
    <div>
      <h1>Digital Clock {dateTimeValue}</h1>
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

const container = document.getElementById("root");
Dynamo.render(element, container);

const timerContainer = document.getElementById("timer");
Dynamo.render(timeElement, timerContainer);
