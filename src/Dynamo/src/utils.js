export const utils = {
  isEvent(key) {
    return String(key || "").startsWith("on");
  },
  isNew(prev, next) {
    return key => String(prev[key]) !== String(next[key]);
  },
  isEventPresentInNewProps(key, prevProps, nextProps) {
    if (!utils.isEvent(key)) return false;
    if (!utils.isNew(prevProps, nextProps)(key)) return false;
    return key in nextProps;
  },
  isEventDifferent(prevProps, nextProps) {
    return key =>
      utils.isEvent(prevProps[key]) &&
      utils.isEvent(nextProps[key]) &&
      key in nextProps &&
      key in prevProps &&
      String(nextProps[key]) !== String(prevProps[key]);
  },
  isProperty(key) {
    return key !== "children" && !utils.isEvent(key);
  },
  isRemoved(next) {
    return key => !(key in next);
  }
};
