import {render} from "./Dynamo/src";
import { CounterExample } from "./components/counter-example";
import { ClockExample } from "./components/clock-example";

const counterContainer = document.getElementById("counter-example");
render(CounterExample, counterContainer);

const clockContainer = document.getElementById("clock-example");
render(ClockExample, clockContainer);
