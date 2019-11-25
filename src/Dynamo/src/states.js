import { getHookForCurrentItem } from "./workLoop";

const useState = (intialValue) => {
  const hook = getHookForCurrentItem(intialValue);
  return [hook.state, hook.callback];
};

export { useState };
