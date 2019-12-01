import { utils } from "./utils";

const updateProperty = (dom, props) => {
  return name => {
    switch (name) {
      case "className":
        String(props[name])
          .split(" ")
          .forEach(c => dom.classList.add(c));
        break;
      case "style":
        const inlineStyleProps = props.style;
        Object.keys(inlineStyleProps).forEach(name => {
          dom["style"][name] = inlineStyleProps[name];
        });
        break;
      case "ref":
        props.ref.current = dom;
        break;

      default:
        dom[name] = props[name];
    }
  };
};

const applyProperties = (fiber, dom) => {
  const { props } = fiber;
  if (!props) return;

  Object.keys(props)
    .filter(utils.isProperty)
    .forEach(updateProperty(dom, props));
};

const applyEvents = (fiber, dom) => {
  const { props } = fiber;
  Object.keys(props)
    .filter(utils.isEvent)
    .forEach(name => {
      let eventName = name.replace("on", "").toLowerCase();
      dom.addEventListener(eventName, props[name]);
    });
};

const removeOldEvents = (dom, prevProps, nextProps) => {
  const { isEvent, isNew } = utils;
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
};

const removeOldProperties = (dom, prevProps, nextProps) => {
  const { isProperty, isRemoved } = utils;
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isRemoved(prevProps, nextProps))
    .forEach(name => {
      dom[name] = "";
    });
};

const applyNewProperties = (dom, prevProps, nextProps) => {
  const { isProperty, isNew } = utils;
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(updateProperty(dom, nextProps));
};

const applyNewEvents = (dom, prevProps, nextProps) => {
  const { isEvent, isNew } = utils;
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
};

const createDom = fiber => {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  applyProperties(fiber, dom);
  applyEvents(fiber, dom);
  return dom;
};

const updateDom = (dom, prevProps, nextProps) => {
  removeOldEvents(dom, prevProps, nextProps);
  removeOldProperties(dom, prevProps, nextProps);
  applyNewEvents(dom, prevProps, nextProps);
  applyNewProperties(dom, prevProps, nextProps);
};

export {
  applyProperties,
  applyEvents,
  removeOldEvents,
  removeOldProperties,
  applyNewEvents,
  applyNewProperties,
  updateDom,
  createDom
};
