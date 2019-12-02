import * as Dynamo from "../Dynamo/src"

/** @jsx Dynamo.createElement */
export const CounterExample = () => {
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
  const textbox = Dynamo.useRef(null);

  const handleClick = e => {
    setCounter(c => c + 1);
  };

  const alertTextBoxValue = _ => {
    console.log(textbox.current.value, "value");
    return false;
  };

  return (
    <div>
      <h1>Application 1</h1>
      <h1 style={style}>Simple Counter Example:</h1>
      <p>
        This is a simple example. Using hooks!
        <span>This is a test</span>
      </p>
      <input ref={textbox} style={textBoxStyle} type="text" value={counter} />
      <button onClick={handleClick}>Counter</button>
      <button onClick={alertTextBoxValue}>An example of useRef</button>
    </div>
  );
};
