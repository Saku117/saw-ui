!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("sawui",[],t):"object"==typeof exports?exports.sawui=t():e.sawui=t()}(self,(function(){return function(){"use strict";var e={d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:function(){return u}});var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Hello,"+e._s(e.name))])])};n._withStripped=!0;var o=function(e,t,n,o,r,i,a,f){var u,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=[],c._compiled=!0),c._scopeId="data-v-b1b71754",u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(e,t){return u.call(t),l(e,t)}}else{var s=c.beforeCreate;c.beforeCreate=s?[].concat(s,u):[u]}return{exports:e,options:c}}({name:"Hello",props:{name:{type:String,default:"Sas UI"}}},n);o.options.__file="packages/hello/src/index.vue";var r=o.exports;r.install=function(e){e.component(r.name,r)};var i=r;const a={Hello:i},f=function(e){Object.values(a).forEach((t=>{e.component(t.name,t)}))};"undefined"!=typeof window&&window.Vue&&f(window.Vue);var u={install:f,Hello:i};return t}()}));