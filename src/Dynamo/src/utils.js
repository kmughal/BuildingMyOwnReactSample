export const utils = {
  isEvent(key) {
    return key.startsWith("on");
  },
  isNew(prev, next) {
    return key => prev[key] !== next[key];
  },
  isProperty(key) {
    return (
      key !== "children" && !utils.isEvent(key) && !utils.isInLineStyle(key)
    );
  },
  isRemoved(next) {
    return key => !(key in next);
  },
  isInLineStyle(key) {
    return key === "style";
  }
};
