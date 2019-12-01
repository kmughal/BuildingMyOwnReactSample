import {
  getHookForCurrentItem,
  getMemoValue,
  getVirtualDomReference
} from "./workLoop";

const useState = intialValue => {
  const hook = getHookForCurrentItem(intialValue);
  return [hook.state, hook.callback];
};

const useMemo = (action, params) => {
  const memoValue = getMemoValue(action, params);
  return memoValue;
};

const useRef = initialValue => {
  const ref = getVirtualDomReference(initialValue);
  return ref;
};

export { useState, useMemo, useRef };
