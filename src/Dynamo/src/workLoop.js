import { performUnitOfWork, commitRoot } from "./reconciler";

let currentRoot = null;
let wipRoot = null;
let nextUnitOfWork = null;
let elements = [];
let addElement = wipRoot => {
  //elements.push({ [wipRoot.componentName]: createElement(wipRoot) });
  elements.push(createElement(wipRoot));
  return elements;
};
let createElement = wipRoot => {
  return {
    alternate: wipRoot,
    currentRoot: wipRoot,
    wipRoot: wipRoot,
    nextUnitOfWork: wipRoot
  };
};

const _workIsCompleted = work => {
  currentRoot = work;
  wipRoot = null;
};

let elementIndex = 0;
const getNextUnitOfWork = () => {
  if (elementIndex < elements.length) {
    return elements[elementIndex++];
  }
  return null;
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
    _workIsCompleted(commitRoot(wipRoot));
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
  return elements.filter(filterByName);
};

const getHookForCurrentItem = initialValue => {
  const search = selectWipByComponentName(elements, wipRoot.componentName);

  if (search.length > 0) {
    var result = search[0];
    result.nextUnitOfWork.hook = result.nextUnitOfWork.hook || {};
    result.nextUnitOfWork.hook.state =
      result.nextUnitOfWork.hook.state || initialValue;

    let hack = false; // this needs to be fixed.
    result.nextUnitOfWork.hook.callback = action => {
      if (!hack) {
        result.nextUnitOfWork.hook.state = action(
          result.nextUnitOfWork.hook.state
        );
        setNextUnitOfWorkFromCurrentWip(result.nextUnitOfWork);
      }
      hack = true;
    };

    return result.nextUnitOfWork.hook;
  }

  return [0, () => {}];
};

const setNextUnitOfWorkFromCurrentWip = currentRoot => {
  nextUnitOfWork = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
    isFunctionalComponent: true,
    hook: currentRoot.hook,
    componentName: currentRoot.componentName
  };
  wipRoot = nextUnitOfWork;
};

export {
  startWorkLoop,
  setNextUnitOfWorkFromCurrentWip,
  getHookForCurrentItem
};
