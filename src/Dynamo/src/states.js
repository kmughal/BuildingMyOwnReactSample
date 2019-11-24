import {
  setNextUnitOfWorkFromCurrentWip,
  runHookForCurrentWip
} from "./workLoop";

const useState = intialValue => {
  const state = runHookForCurrentWip(intialValue);
  const _setState = action => {
    setNextUnitOfWorkFromCurrentWip(action, state);
  };
  return [state, _setState];
};

export { useState };
