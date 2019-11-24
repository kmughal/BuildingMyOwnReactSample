import { utils } from "./utils";

const applyProperties = (fiber, dom) => {
  const { props } = fiber;
  Object.keys(props)
    .filter(utils.isProperty)
    .forEach(name => {
      dom[name] = props[name];
    });
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

const applyInlineStyle = (fiber, dom) => {
  const { props } = fiber;
  if (!props) return;
  const inlineStyleProps = props.style;
  if (inlineStyleProps) {
    Object.keys(inlineStyleProps).forEach(name => {
      dom["style"][name] = inlineStyleProps[name];
    });
  }
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

const applyNewEvents = (dom, prevProps, nextProps) => {
  const { isProperty, isNew } = utils;
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name];
    });
};

const applyNewProperties = (dom, prevProps, nextProps) => {
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
  applyInlineStyle(fiber, dom);
  return dom;
};

const updateDom = (dom, prevProps, nextProps) => {
  removeOldEvents(dom, prevProps, nextProps);
  removeOldProperties(dom, prevProps, nextProps);
  applyNewEvents(dom, prevProps, nextProps);
  applyNewProperties(dom, prevProps, nextProps);
  applyInlineStyle(dom, nextProps);
};

export {
  applyProperties,
  applyEvents,
  applyInlineStyle,
  removeOldEvents,
  removeOldProperties,
  applyNewEvents,
  applyNewProperties,
  updateDom,
  createDom
};
