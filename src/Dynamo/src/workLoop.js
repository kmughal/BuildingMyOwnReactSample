import { performUnitOfWork, commitRoot } from "./reconciler";

let currentRoot = null;
let wipRoot = null;
let nextUnitOfWork = null;

let elements = [];
let addElement = componentName => {
  elements.push({ [componentName]: createElement() });
  return elements;
};
let createElement = () => {
  return { currentRoot: null, wipRoot: null, nextUnitOfWork: null };
};

const _workIsCompleted = work => {
  currentRoot = work;
  wipRoot = null;
};

const workLoop = deadline => {
  let shouldYield = false;
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
  requestIdleCallback(workLoop);
};

const setNextUnitOfWorkFromCurrentWip = (action, state) => {
  nextUnitOfWork = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
    isFunctionalComponent: true,
    hook: { action, state }
  };
  wipRoot = nextUnitOfWork;
  console.log(wipRoot);
};

const runHookForCurrentWip = intialState => {
  if (nextUnitOfWork.hook && nextUnitOfWork.hook.action) {
    const newState = nextUnitOfWork.hook.action(
      nextUnitOfWork.hook.state || intialState
    );
    nextUnitOfWork.hook = {
      action: nextUnitOfWork.hook.action,
      state: newState
    };
    return nextUnitOfWork.hook.state;
  }
  return intialState;
};

export { startWorkLoop, setNextUnitOfWorkFromCurrentWip, runHookForCurrentWip };
