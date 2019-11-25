import { startWorkLoop } from "./workLoop";

const render = (element, container) => {
  const wipRoot = {
    isFunctionalComponent: element instanceof Function,
    dom: container,
    props: {
      children: [element]
    },
    alternate: null,
    hooks: null,
    componentName: element.name
  };

  wipRoot.alternate = wipRoot;
  startWorkLoop(wipRoot);
};

export default render;
