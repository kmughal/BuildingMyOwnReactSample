(this["webpackJsonpreact-temp"]=this["webpackJsonpreact-temp"]||[]).push([[0],[function(t,n,e){t.exports=e(1)},function(t,n,e){"use strict";function r(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var e=[],r=!0,o=!1,i=void 0;try{for(var c,l=t[Symbol.iterator]();!(r=(c=l.next()).done)&&(e.push(c.value),!n||e.length!==n);r=!0);}catch(u){o=!0,i=u}finally{try{r||null==l.return||l.return()}finally{if(o)throw i}}return e}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}e.r(n);var o={isEvent:function(t){return t.startsWith("on")},isNew:function(t,n){return function(e){return t[e]!==n[e]}},isProperty:function(t){return"children"!==t&&!o.isEvent(t)&&!o.isInLineStyle(t)},isRemoved:function(t){return function(n){return!(n in t)}},isInLineStyle:function(t){return"style"===t}},i=function(t,n){var e=t.props;if(e){var r=e.style;r&&Object.keys(r).forEach((function(t){n.style[t]=r[t]}))}},c=function(t){var n="TEXT_ELEMENT"===t.type?document.createTextNode(""):document.createElement(t.type);return function(t,n){var e=t.props;Object.keys(e).filter(o.isProperty).forEach((function(t){n[t]=e[t]}))}(t,n),function(t,n){var e=t.props;Object.keys(e).filter(o.isEvent).forEach((function(t){var r=t.replace("on","").toLowerCase();n.addEventListener(r,e[t])}))}(t,n),i(t,n),n},l=function(t,n,e){!function(t,n,e){var r=o.isEvent,i=o.isNew;Object.keys(n).filter(r).filter((function(t){return!(t in e)||i(n,e)(t)})).forEach((function(e){var r=e.toLowerCase().substring(2);t.removeEventListener(r,n[e])}))}(t,n,e),function(t,n,e){var r=o.isProperty,i=o.isRemoved;Object.keys(n).filter(r).filter(i(n,e)).forEach((function(n){t[n]=""}))}(t,n,e),function(t,n,e){var r=o.isProperty,i=o.isNew;Object.keys(e).filter(r).filter(i(n,e)).forEach((function(n){t[n]=e[n]}))}(t,n,e),function(t,n,e){var r=o.isEvent,i=o.isNew;Object.keys(e).filter(r).filter(i(n,e)).forEach((function(n){var r=n.toLowerCase().substring(2);t.addEventListener(r,e[n])}))}(t,n,e),i(t,e)},u=[],a=function(t,n){for(var e=0,r=t.alternate&&t.alternate.child,o=null;e<n.length||null!=r;){var i=n[e],c=null,l=r&&i&&i.type==r.type;l&&(c={type:r.type,props:i.props,dom:r.dom,parent:t,alternate:r,effectTag:"UPDATE"}),i&&!l&&(c={type:i.type,props:i.props,dom:null,parent:t,alternate:null,effectTag:"PLACEMENT"}),r&&!l&&(r.effectTag="DELETION",u.push(r)),r&&(r=r.sibling),0===e?t.child=c:i&&(o.sibling=c),o=c,e++}},f=function(t){if(t.isFunctionalComponent?function(t){t;var n=t.props.children[0]();a(t,n.props.children)}(t):function(t){t.dom||(t.dom=c(t)),a(t,t.props.children)}(t),t.child)return t.child;for(var n=t;n;){if(n.sibling)return n.sibling;n=n.parent}},p=function t(n){if(n){for(var e=n.parent;!e.dom;)e=e.parent;var r=e.dom;"PLACEMENT"===n.effectTag&&null!=n.dom?r.appendChild(n.dom):"UPDATE"===n.effectTag&&null!=n.dom?l(n.dom,n.alternate.props,n.props):"DELETION"===n.effectTag&&function t(n,e){n.dom?e.removeChild(n.dom):t(n.child,e)}(n,r),t(n.child),t(n.sibling)}},s=null,d=null,m=[],h=function(t){return{alternate:t,currentRoot:t,wipRoot:t,nextUnitOfWork:t}},v=0,y=function(){if(null===s){var t=v<m.length?m[v++]:null;null!==t&&(t.nextUnitOfWork&&(d=t.nextUnitOfWork),t.wipRoot&&(s=t.wipRoot),t.currentRoot&&t.currentRoot)}},b=function t(n){var e,r=!1;for(y();d&&!r;)d=f(d),r=n.timeRemaining()<1;!d&&s&&(e=s,u.forEach(p),p(e.child),console.log("work to be commited for:",e.child),e,s=null),requestIdleCallback(t)},g=function(t){var n;d=s=t,n=t,m.push(h(n)),console.log(m),requestIdleCallback(b)},k=function(t){d={dom:t.dom,props:t.props,alternate:t,isFunctionalComponent:!0,hook:t.hook,componentName:t.componentName},s=d},E=function(t,n){var e={isFunctionalComponent:t instanceof Function,dom:n,props:{children:[t]},alternate:null,hooks:null,componentName:t.name};e.alternate=e,g(e)};function O(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function x(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function w(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?x(e,!0).forEach((function(n){O(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):x(e).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}var T=function(t){return{type:"TEXT_ELEMENT",props:{nodeValue:t,children:[]}}},j=function(t,n){for(var e=arguments.length,r=new Array(e>2?e-2:0),o=2;o<e;o++)r[o-2]=arguments[o];return{type:t,props:w({},n,{children:r.map((function(t){return"object"===typeof t?t:T(t)}))})}},C=function(t){var n=function(t){var n,e,r=(n=m,e=s.componentName,n.filter((function(t){return t.currentRoot.componentName===e})));if(r.length>0){var o=r[0];o.nextUnitOfWork.hook=o.nextUnitOfWork.hook||{},o.nextUnitOfWork.hook.state=o.nextUnitOfWork.hook.state||t;var i=!1;return o.nextUnitOfWork.hook.callback=function(t){i||(o.nextUnitOfWork.hook.state=t(o.nextUnitOfWork.hook.state),k(o.nextUnitOfWork)),i=!0},o.nextUnitOfWork.hook}return[0,function(){}]}(t);return[n.state,n.callback]};E((function(){var t=r(C(0),2),n=t[0],e=t[1];return j("section",null,j("h1",null,"Application 1"),j("h1",{style:{background:"pink",border:"1px solid yellow",padding:"10px 10px"}},"Simple Counter Example:"),j("p",null,"This is a simple example. Using hooks!",j("span",null,"This is a test")),j("input",{style:{border:"1px solid gray","border-radius":"5px 5px",padding:"5px 5px",color:"red"},type:"text",value:n}),j("button",{onClick:function(t){e((function(t){return t+1}))}},"Counter"))}),document.getElementById("root")),E((function(t){var n=r(C((new Date).toString()),2),e=n[0],o=n[1];setInterval((function(){o((function(){return(new Date).toString()}))}),1e3);var i=r(C(0),2);i[0],i[1];return j("div",null,j("h1",null,"Digital Clock"),j("div",{style:{border:"4px solid red",padding:"10px 10px","margin-top":"10px"}},"Current Time:",e))}),document.getElementById("timer"))}],[[0,1]]]);
//# sourceMappingURL=main.f8218849.chunk.js.map