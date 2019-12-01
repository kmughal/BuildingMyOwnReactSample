import { performUnitOfWork, commitRoot } from "./reconciler";

let currentRoot = null;
let wipRoot = null;
let nextUnitOfWork = null;
const elements = [];

const addElement = wipRoot => {
  elements.push(createElement(wipRoot));
  return elements;
};

const createElement = wipRoot => {
  return {
    alternate: wipRoot,
    currentRoot: wipRoot,
    wipRoot: wipRoot,
    nextUnitOfWork: wipRoot
  };
};

const workIsComplete = work => {
  currentRoot = work;
  wipRoot = null;
};

let elementIndex = 0;
const getNextUnitOfWork = () => {
  return elementIndex < elements.length ? elements[elementIndex++] : null;
};

const setNextUnitOfWorkAndWipRoot = () => {
  if (wipRoot === null) {
    let element = getNextUnitOfWork();

    if (element !== null) {
      if (element.nextUnitOfWork) nextUnitOfWork = element.nextUnitOfWork;
      if (element.wipRoot) wipRoot = element.wipRoot;
      if (element.currentRoot) currentRoot = element.currentRoot;
    }
  }
};

const workLoop = deadline => {
  let shouldYield = false;
  setNextUnitOfWorkAndWipRoot();
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    workIsComplete(commitRoot(wipRoot));
  }
  requestIdleCallback(workLoop);
};

const startWorkLoop = rootObject => {
  wipRoot = rootObject;
  nextUnitOfWork = wipRoot;
  addElement(rootObject);
  console.log(elements);
  requestIdleCallback(workLoop);
};

const selectWipByComponentName = (elements, componentName) => {
  const filterByName = e => e.currentRoot.componentName === componentName;
  var result = elements.filter(filterByName);
  return result.length > 0 ? result[0] : null;
};

const propertyPresent = (nameOfProperty, object) => {
  return nameOfProperty in object;
};


const initialzePropertyIfNotPresent = (nameOfProperty, object) => {
  if (!propertyPresent(nameOfProperty,object)) object[nameOfProperty] = -1;
}

const didHookRan = hook => {
  return propertyPresent("ran", hook);
};

const resetHookRanFlagIfPresent = hooks => {
  hooks.filter(didHookRan).forEach(hook => {
    delete hook.ran;
  });
};

const createHookIfNotPresent = (nextUnitOfWork, initialValue) => {
  if (nextUnitOfWork.hooks[nextUnitOfWork.currentHookIndex])
    return nextUnitOfWork.hooks[nextUnitOfWork.currentHookIndex];

  var result = createNewHook(initialValue);
  nextUnitOfWork.hooks.push(result);
  return result;

  function createNewHook(initialValue) {
    var newHookReturned = {};
    newHookReturned.state = initialValue;

    newHookReturned.callback = action => {
      if (didHookRan(newHookReturned)) return;

      const newState = action(newHookReturned.state);
      if (newHookReturned.state === newState) {
        return;
      }
      newHookReturned.state = newState;
      setNextUnitOfWorkFromCurrentWip(nextUnitOfWork);
      newHookReturned.ran = true;
    };
    return newHookReturned;
  }
};

const getHook = (nextUnitOfWork, initialValue) => {
  nextUnitOfWork.hooks = nextUnitOfWork.hooks || [];

  initialzePropertyIfNotPresent("currentHookIndex", nextUnitOfWork);

  nextUnitOfWork.currentHookIndex++;
  const hook = createHookIfNotPresent(nextUnitOfWork, initialValue);
  return hook;
};

const getHookForCurrentItem = initialValue => {
  const result = selectWipByComponentName(elements, wipRoot.componentName);
  if (!result) throw new Error("Failed to find the component!");
  const newHook = getHook(result.nextUnitOfWork, initialValue);
  resetHookRanFlagIfPresent(result.nextUnitOfWork.hooks);
  return newHook;
};

const getMemo = (nextUnitOfWork, action, params) => {
  nextUnitOfWork.memos = nextUnitOfWork.memos || [];
  initialzePropertyIfNotPresent("currentMemoIndex", nextUnitOfWork)
  nextUnitOfWork.currentMemoIndex++;
  let memo = nextUnitOfWork.memos[nextUnitOfWork.currentMemoIndex];
  if (!memo) {
    memo = {
      action,
      params,
      previousActionResult: null,
      previousParams: null
    };
    nextUnitOfWork.memos.push(memo);
  }
  return memo;
};

const computeMemo = (memo, action, params) => {
  const previousParamsInString = JSON.stringify(memo.previousParams);
  const newParamsInString = JSON.stringify(params);

  if (previousParamsInString === newParamsInString) return;

  memo.previousActionResult = action(params);
  memo.previousParams = params;
};

const getMemoValue = (action, params, componentName) => {
  const component = selectWipByComponentName(elements, wipRoot.componentName);
  if (!component) throw new Error("Fail to select ", componentName);

  if (!params || params.length === 0) {
    return action();
  }
  const memo = getMemo(component.nextUnitOfWork, action, params);
  computeMemo(memo, action, params);
  return memo.previousActionResult;
};

const resetcurrentHookIndex = () => {
  elements.forEach(element => {
    element.nextUnitOfWork.currentHookIndex = -1;
    element.nextUnitOfWork.currentMemoIndex = -1;
    element.nextUnitOfWork.currentReferenceIndex = -1;
  });
};

const getVirtualDomReference = (initialValue) => {
  const currentElement = selectWipByComponentName(elements, wipRoot.componentName);
  initialzePropertyIfNotPresent("currentReferenceIndex",currentElement.nextUnitOfWork);
  currentElement.nextUnitOfWork.currentReferenceIndex++;
  return {} || initialValue;
};

const setNextUnitOfWorkFromCurrentWip = currentRoot => {
  nextUnitOfWork = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
    isFunctionalComponent: true,
    hook: currentRoot.hook,
    hooks: currentRoot.hooks,
    componentName: currentRoot.componentName
  };
  wipRoot = nextUnitOfWork;
  resetcurrentHookIndex();
};

export {
  startWorkLoop,
  setNextUnitOfWorkFromCurrentWip,
  getHookForCurrentItem,
  getMemoValue,
  getVirtualDomReference
};
