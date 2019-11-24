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

  return (
    <section>
      
      <h1 style={style}>Simple Counter Example:</h1>
      <p>
        This is a simple example. Using hooks!
        <span>This is a test</span>
      </p>
      <input style={textBoxStyle} type="text" value={counter} />
      <button
        onClick={() => {
          setCounter(c => c + 1);
        }}
      >
        Counter
      </button>
    </section>
  );
};




const timeElement = (props) => {
 // const [dateTimeValue, setDateTime] = Dynamo.useState(new Date().toString());
  // setInterval(() => {
  //   setDateTime(() => new Date().toString());
  // },1000);
  
  return (
    <div>
     Current Date:{2}
    </div>
  );
};

const container = document.getElementById("root");
Dynamo.render(element, container);