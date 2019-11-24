import {setNextUnitOfWorkFromCurrentWip} from "./workLoop";

let _state = "not defined";
const useState = intialValue => {
  if (_state === "not defined") _state = intialValue;

  const _setState = action => {
    _state = action(_state);
    setNextUnitOfWorkFromCurrentWip();
  };
  return [_state, _setState];
};

export { useState };
