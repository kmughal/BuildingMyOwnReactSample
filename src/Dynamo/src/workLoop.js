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

const setNextUnitOfWorkFromCurrntWip = () => {
  nextUnitOfWork = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
    isFunctionalComponent: true
  };
  wipRoot = nextUnitOfWork;
  console.log(wipRoot);
};

export { startWorkLoop, setNextUnitOfWorkFromCurrntWip };
