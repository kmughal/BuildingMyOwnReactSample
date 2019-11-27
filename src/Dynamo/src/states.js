import { getHookForCurrentItem, getMemoValue } from "./workLoop";

const useState = intialValue => {
  const hook = getHookForCurrentItem(intialValue);
  return [hook.state, hook.callback];
};

const useMemo = (action, params) => {
  const memoValue = getMemoValue(action, params);
  return memoValue;
};

export { useState, useMemo };
