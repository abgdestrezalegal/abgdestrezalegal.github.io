var Pd=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},ry=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],o=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{let s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Cd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],o=i+1<n.length,c=o?n[i+1]:0,u=i+2<n.length,h=u?n[i+2]:0,f=s>>2,m=(s&3)<<4|c>>4,w=(c&15)<<2|h>>6,R=h&63;u||(R=64,o||(w=64)),r.push(t[f],t[m],t[w],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Pd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ry(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let h=i<n.length?t[n.charAt(i)]:64;++i;let m=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||h==null||m==null)throw new Ga;let w=s<<2|c>>4;if(r.push(w),h!==64){let R=c<<4&240|h>>2;if(r.push(R),m!==64){let D=h<<6&192|m;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Ga=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},iy=function(n){let e=Pd(n);return Cd.encodeByteArray(e,!0)},$a=function(n){return iy(n).replace(/\./g,"")},Ha=function(n){try{return Cd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function sy(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var oy=()=>sy().__FIREBASE_DEFAULTS__,ay=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},cy=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Ha(n[1]);return e&&JSON.parse(e)},us=()=>{try{return oy()||ay()||cy()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},kd=n=>{var e,t;return(t=(e=us())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]};var Wa=()=>{var n;return(n=us())===null||n===void 0?void 0:n.config},Qa=n=>{var e;return(e=us())===null||e===void 0?void 0:e[`_${n}`]};var cs=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Dd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ae())}function uy(){var n;let e=(n=us())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Nd(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Od(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function xd(){let n=ae();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ja(){return!uy()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Mn(){try{return typeof indexedDB=="object"}catch{return!1}}function ls(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}function Vd(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}var ly="FirebaseError",Oe=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ly,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,qe.prototype.create)}},qe=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?hy(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Oe(i,c,r)}};function hy(n,e){return n.replace(dy,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var dy=/\{\$([^}]+)}/g;function Ld(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function At(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],o=e[i];if(Rd(s)&&Rd(o)){if(!At(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function Rd(n){return n!==null&&typeof n=="object"}function Fn(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Un(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function qn(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Md(n,e){let t=new Ka(n,e);return t.subscribe.bind(t)}var Ka=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");fy(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=za),i.error===void 0&&(i.error=za),i.complete===void 0&&(i.complete=za);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function fy(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function za(){}var Yb=4*60*60*1e3;function Z(n){return n&&n._delegate?n._delegate:n}var me=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Xt="[DEFAULT]";var Ya=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new cs;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(my(e))try{this.getOrInitializeService({instanceIdentifier:Xt})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Xt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xt){return this.instances.has(e)}getOptions(e=Xt){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,o]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:py(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Xt){return this.component?this.component.multipleInstances?e:Xt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function py(n){return n===Xt?void 0:n}function my(n){return n.instantiationMode==="EAGER"}var hs=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Ya(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var gy=[],W;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(W||(W={}));var _y={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},yy=W.INFO,wy={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Iy=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=wy[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},St=class{constructor(e){this.name=e,this._logLevel=yy,this._logHandler=Iy,this._userLogHandler=null,gy.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?_y[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}};var vy=(n,e)=>e.some(t=>n instanceof t),Fd,Ud;function Ey(){return Fd||(Fd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ty(){return Ud||(Ud=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var qd=new WeakMap,Za=new WeakMap,Bd=new WeakMap,Xa=new WeakMap,tc=new WeakMap;function by(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(He(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&qd.set(t,n)}).catch(()=>{}),tc.set(e,n),e}function Ay(n){if(Za.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Za.set(n,e)}var ec={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Za.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Bd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return He(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jd(n){ec=n(ec)}function Sy(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(ds(this),e,...t);return Bd.set(r,e.sort?e.sort():[e]),He(r)}:Ty().includes(n)?function(...e){return n.apply(ds(this),e),He(qd.get(this))}:function(...e){return He(n.apply(ds(this),e))}}function Ry(n){return typeof n=="function"?Sy(n):(n instanceof IDBTransaction&&Ay(n),vy(n,Ey())?new Proxy(n,ec):n)}function He(n){if(n instanceof IDBRequest)return by(n);if(Xa.has(n))return Xa.get(n);let e=Ry(n);return e!==n&&(Xa.set(n,e),tc.set(e,n)),e}var ds=n=>tc.get(n);function Zt(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(n,e),c=He(o);return r&&o.addEventListener("upgradeneeded",u=>{r(He(o.result),u.oldVersion,u.newVersion,He(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}function fs(n,{blocked:e}={}){let t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",r=>e(r.oldVersion,r)),He(t).then(()=>{})}var Py=["get","getKey","getAll","getAllKeys","count"],Cy=["put","add","delete","clear"],nc=new Map;function zd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(nc.get(e))return nc.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Cy.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Py.includes(t)))return;let s=async function(o,...c){let u=this.transaction(o,i?"readwrite":"readonly"),h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),i&&u.done]))[0]};return nc.set(e,s),s}jd(n=>({...n,get:(e,t,r)=>zd(e,t)||n.get(e,t,r),has:(e,t)=>!!zd(e,t)||n.has(e,t)}));var ic=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ky(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function ky(n){let e=n.getComponent();return e?.type==="VERSION"}var sc="@firebase/app",Gd="0.10.5";var en=new St("@firebase/app"),Dy="@firebase/app-compat",Ny="@firebase/analytics-compat",Oy="@firebase/analytics",xy="@firebase/app-check-compat",Vy="@firebase/app-check",Ly="@firebase/auth",My="@firebase/auth-compat",Fy="@firebase/database",Uy="@firebase/database-compat",qy="@firebase/functions",By="@firebase/functions-compat",jy="@firebase/installations",zy="@firebase/installations-compat",Gy="@firebase/messaging",Ky="@firebase/messaging-compat",$y="@firebase/performance",Hy="@firebase/performance-compat",Wy="@firebase/remote-config",Qy="@firebase/remote-config-compat",Jy="@firebase/storage",Yy="@firebase/storage-compat",Xy="@firebase/firestore",Zy="@firebase/vertexai-preview",ew="@firebase/firestore-compat",tw="firebase",nw="10.12.2";var oc="[DEFAULT]",rw={[sc]:"fire-core",[Dy]:"fire-core-compat",[Oy]:"fire-analytics",[Ny]:"fire-analytics-compat",[Vy]:"fire-app-check",[xy]:"fire-app-check-compat",[Ly]:"fire-auth",[My]:"fire-auth-compat",[Fy]:"fire-rtdb",[Uy]:"fire-rtdb-compat",[qy]:"fire-fn",[By]:"fire-fn-compat",[jy]:"fire-iid",[zy]:"fire-iid-compat",[Gy]:"fire-fcm",[Ky]:"fire-fcm-compat",[$y]:"fire-perf",[Hy]:"fire-perf-compat",[Wy]:"fire-rc",[Qy]:"fire-rc-compat",[Jy]:"fire-gcs",[Yy]:"fire-gcs-compat",[Xy]:"fire-fst",[ew]:"fire-fst-compat",[Zy]:"fire-vertex","fire-js":"fire-js",[tw]:"fire-js-all"};var ps=new Map,iw=new Map,ac=new Map;function Kd(n,e){try{n.container.addComponent(e)}catch(t){en.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Fe(n){let e=n.name;if(ac.has(e))return en.debug(`There were multiple attempts to register component ${e}.`),!1;ac.set(e,n);for(let t of ps.values())Kd(t,n);for(let t of iw.values())Kd(t,n);return!0}function Ze(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function We(n){return n.settings!==void 0}var sw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Rt=new qe("app","Firebase",sw);var cc=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new me("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Rt.create("app-deleted",{appName:this._name})}};var Pt=nw;function Qd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:oc,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Rt.create("bad-app-name",{appName:String(i)});if(t||(t=Wa()),!t)throw Rt.create("no-options");let s=ps.get(i);if(s){if(At(t,s.options)&&At(r,s.config))return s;throw Rt.create("duplicate-app",{appName:i})}let o=new hs(i);for(let u of ac.values())o.addComponent(u);let c=new cc(t,r,o);return ps.set(i,c),c}function Bn(n=oc){let e=ps.get(n);if(!e&&n===oc&&Wa())return Qd();if(!e)throw Rt.create("no-app",{appName:n});return e}function we(n,e,t){var r;let i=(r=rw[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),en.warn(c.join(" "));return}Fe(new me(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var ow="firebase-heartbeat-database",aw=1,jr="firebase-heartbeat-store",rc=null;function Jd(){return rc||(rc=Zt(ow,aw,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(jr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Rt.create("idb-open",{originalErrorMessage:n.message})})),rc}async function cw(n){try{let t=(await Jd()).transaction(jr),r=await t.objectStore(jr).get(Yd(n));return await t.done,r}catch(e){if(e instanceof Oe)en.warn(e.message);else{let t=Rt.create("idb-get",{originalErrorMessage:e?.message});en.warn(t.message)}}}async function $d(n,e){try{let r=(await Jd()).transaction(jr,"readwrite");await r.objectStore(jr).put(e,Yd(n)),await r.done}catch(t){if(t instanceof Oe)en.warn(t.message);else{let r=Rt.create("idb-set",{originalErrorMessage:t?.message});en.warn(r.message)}}}function Yd(n){return`${n.name}!${n.options.appId}`}var uw=1024,lw=30*24*60*60*1e3,uc=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new lc(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Hd();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let c=new Date(o.date).valueOf();return Date.now()-c<=lw}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Hd(),{heartbeatsToSend:r,unsentEntries:i}=hw(this._heartbeatsCache.heartbeats),s=$a(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function Hd(){return new Date().toISOString().substring(0,10)}function hw(n,e=uw){let t=[],r=n.slice();for(let i of n){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Wd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Wd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var lc=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Mn()?ls().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await cw(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return $d(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return $d(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function Wd(n){return $a(JSON.stringify({version:2,heartbeats:n})).length}function dw(n){Fe(new me("platform-logger",e=>new ic(e),"PRIVATE")),Fe(new me("heartbeat",e=>new uc(e),"PRIVATE")),we(sc,Gd,n),we(sc,Gd,"esm2017"),we("fire-js","")}dw("");var fw="firebase",pw="10.12.2";we(fw,pw,"app");var Xd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Zd={};var Ct,hc;(function(){var n;function e(I,g){function y(){}y.prototype=g.prototype,I.D=g.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(v,E,b){for(var _=Array(arguments.length-2),ut=2;ut<arguments.length;ut++)_[ut-2]=arguments[ut];return g.prototype[E].apply(v,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,g,y){y||(y=0);var v=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)v[E]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(E=0;16>E;++E)v[E]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=I.g[0],y=I.g[1],E=I.g[2];var b=I.g[3],_=g+(b^y&(E^b))+v[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=b+(E^g&(y^E))+v[1]+3905402710&4294967295,b=g+(_<<12&4294967295|_>>>20),_=E+(y^b&(g^y))+v[2]+606105819&4294967295,E=b+(_<<17&4294967295|_>>>15),_=y+(g^E&(b^g))+v[3]+3250441966&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(b^y&(E^b))+v[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(E^g&(y^E))+v[5]+1200080426&4294967295,b=g+(_<<12&4294967295|_>>>20),_=E+(y^b&(g^y))+v[6]+2821735955&4294967295,E=b+(_<<17&4294967295|_>>>15),_=y+(g^E&(b^g))+v[7]+4249261313&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(b^y&(E^b))+v[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(E^g&(y^E))+v[9]+2336552879&4294967295,b=g+(_<<12&4294967295|_>>>20),_=E+(y^b&(g^y))+v[10]+4294925233&4294967295,E=b+(_<<17&4294967295|_>>>15),_=y+(g^E&(b^g))+v[11]+2304563134&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(b^y&(E^b))+v[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(E^g&(y^E))+v[13]+4254626195&4294967295,b=g+(_<<12&4294967295|_>>>20),_=E+(y^b&(g^y))+v[14]+2792965006&4294967295,E=b+(_<<17&4294967295|_>>>15),_=y+(g^E&(b^g))+v[15]+1236535329&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(E^b&(y^E))+v[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^E&(g^y))+v[6]+3225465664&4294967295,b=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(b^g))+v[11]+643717713&4294967295,E=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(E^b))+v[0]+3921069994&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^b&(y^E))+v[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^E&(g^y))+v[10]+38016083&4294967295,b=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(b^g))+v[15]+3634488961&4294967295,E=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(E^b))+v[4]+3889429448&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^b&(y^E))+v[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^E&(g^y))+v[14]+3275163606&4294967295,b=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(b^g))+v[3]+4107603335&4294967295,E=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(E^b))+v[8]+1163531501&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^b&(y^E))+v[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^E&(g^y))+v[2]+4243563512&4294967295,b=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(b^g))+v[7]+1735328473&4294967295,E=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(E^b))+v[12]+2368359562&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(y^E^b)+v[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^E)+v[8]+2272392833&4294967295,b=g+(_<<11&4294967295|_>>>21),_=E+(b^g^y)+v[11]+1839030562&4294967295,E=b+(_<<16&4294967295|_>>>16),_=y+(E^b^g)+v[14]+4259657740&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^b)+v[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^E)+v[4]+1272893353&4294967295,b=g+(_<<11&4294967295|_>>>21),_=E+(b^g^y)+v[7]+4139469664&4294967295,E=b+(_<<16&4294967295|_>>>16),_=y+(E^b^g)+v[10]+3200236656&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^b)+v[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^E)+v[0]+3936430074&4294967295,b=g+(_<<11&4294967295|_>>>21),_=E+(b^g^y)+v[3]+3572445317&4294967295,E=b+(_<<16&4294967295|_>>>16),_=y+(E^b^g)+v[6]+76029189&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^b)+v[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^E)+v[12]+3873151461&4294967295,b=g+(_<<11&4294967295|_>>>21),_=E+(b^g^y)+v[15]+530742520&4294967295,E=b+(_<<16&4294967295|_>>>16),_=y+(E^b^g)+v[2]+3299628645&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(E^(y|~b))+v[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~E))+v[7]+1126891415&4294967295,b=g+(_<<10&4294967295|_>>>22),_=E+(g^(b|~y))+v[14]+2878612391&4294967295,E=b+(_<<15&4294967295|_>>>17),_=y+(b^(E|~g))+v[5]+4237533241&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~b))+v[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~E))+v[3]+2399980690&4294967295,b=g+(_<<10&4294967295|_>>>22),_=E+(g^(b|~y))+v[10]+4293915773&4294967295,E=b+(_<<15&4294967295|_>>>17),_=y+(b^(E|~g))+v[1]+2240044497&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~b))+v[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~E))+v[15]+4264355552&4294967295,b=g+(_<<10&4294967295|_>>>22),_=E+(g^(b|~y))+v[6]+2734768916&4294967295,E=b+(_<<15&4294967295|_>>>17),_=y+(b^(E|~g))+v[13]+1309151649&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~b))+v[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~E))+v[11]+3174756917&4294967295,b=g+(_<<10&4294967295|_>>>22),_=E+(g^(b|~y))+v[2]+718787259&4294967295,E=b+(_<<15&4294967295|_>>>17),_=y+(b^(E|~g))+v[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+b&4294967295}r.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var y=g-this.blockSize,v=this.B,E=this.h,b=0;b<g;){if(E==0)for(;b<=y;)i(this,I,b),b+=this.blockSize;if(typeof I=="string"){for(;b<g;)if(v[E++]=I.charCodeAt(b++),E==this.blockSize){i(this,v),E=0;break}}else for(;b<g;)if(v[E++]=I[b++],E==this.blockSize){i(this,v),E=0;break}}this.h=E,this.o+=g},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var y=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=y&255,y/=256;for(this.u(I),I=Array(16),g=y=0;4>g;++g)for(var v=0;32>v;v+=8)I[y++]=this.g[g]>>>v&255;return I};function s(I,g){var y=c;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=g(I)}function o(I,g){this.h=g;for(var y=[],v=!0,E=I.length-1;0<=E;E--){var b=I[E]|0;v&&b==g||(y[E]=b,v=!1)}this.g=y}var c={};function u(I){return-128<=I&&128>I?s(I,function(g){return new o([g|0],0>g?-1:0)}):new o([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return k(h(-I));for(var g=[],y=1,v=0;I>=y;v++)g[v]=I/y|0,y*=4294967296;return new o(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return k(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(g,8)),v=m,E=0;E<I.length;E+=8){var b=Math.min(8,I.length-E),_=parseInt(I.substring(E,E+b),g);8>b?(b=h(Math.pow(g,b)),v=v.j(b).add(h(_))):(v=v.j(y),v=v.add(h(_)))}return v}var m=u(0),w=u(1),R=u(16777216);n=o.prototype,n.m=function(){if(O(this))return-k(this).m();for(var I=0,g=1,y=0;y<this.g.length;y++){var v=this.i(y);I+=(0<=v?v:4294967296+v)*g,g*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(O(this))return"-"+k(this).toString(I);for(var g=h(Math.pow(I,6)),y=this,v="";;){var E=H(y,g).g;y=z(y,E.j(g));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=E,D(y))return b+v;for(;6>b.length;)b="0"+b;v=b+v}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function O(I){return I.h==-1}n.l=function(I){return I=z(this,I),O(I)?-1:D(I)?0:1};function k(I){for(var g=I.g.length,y=[],v=0;v<g;v++)y[v]=~I.g[v];return new o(y,~I.h).add(w)}n.abs=function(){return O(this)?k(this):this},n.add=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],v=0,E=0;E<=g;E++){var b=v+(this.i(E)&65535)+(I.i(E)&65535),_=(b>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);v=_>>>16,b&=65535,_&=65535,y[E]=_<<16|b}return new o(y,y[y.length-1]&-2147483648?-1:0)};function z(I,g){return I.add(k(g))}n.j=function(I){if(D(this)||D(I))return m;if(O(this))return O(I)?k(this).j(k(I)):k(k(this).j(I));if(O(I))return k(this.j(k(I)));if(0>this.l(R)&&0>I.l(R))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,y=[],v=0;v<2*g;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var E=0;E<I.g.length;E++){var b=this.i(v)>>>16,_=this.i(v)&65535,ut=I.i(E)>>>16,Tr=I.i(E)&65535;y[2*v+2*E]+=_*Tr,j(y,2*v+2*E),y[2*v+2*E+1]+=b*Tr,j(y,2*v+2*E+1),y[2*v+2*E+1]+=_*ut,j(y,2*v+2*E+1),y[2*v+2*E+2]+=b*ut,j(y,2*v+2*E+2)}for(v=0;v<g;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=g;v<2*g;v++)y[v]=0;return new o(y,0)};function j(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function U(I,g){this.g=I,this.h=g}function H(I,g){if(D(g))throw Error("division by zero");if(D(I))return new U(m,m);if(O(I))return g=H(k(I),g),new U(k(g.g),k(g.h));if(O(g))return g=H(I,k(g)),new U(k(g.g),g.h);if(30<I.g.length){if(O(I)||O(g))throw Error("slowDivide_ only works with positive integers.");for(var y=w,v=g;0>=v.l(I);)y=Y(y),v=Y(v);var E=G(y,1),b=G(v,1);for(v=G(v,2),y=G(y,2);!D(v);){var _=b.add(v);0>=_.l(I)&&(E=E.add(y),b=_),v=G(v,1),y=G(y,1)}return g=z(I,E.j(g)),new U(E,g)}for(E=m;0<=I.l(g);){for(y=Math.max(1,Math.floor(I.m()/g.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),b=h(y),_=b.j(g);O(_)||0<_.l(I);)y-=v,b=h(y),_=b.j(g);D(b)&&(b=w),E=E.add(b),I=z(I,_)}return new U(E,I)}n.A=function(I){return H(this,I).h},n.and=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)&I.i(v);return new o(y,this.h&I.h)},n.or=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)|I.i(v);return new o(y,this.h|I.h)},n.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)^I.i(v);return new o(y,this.h^I.h)};function Y(I){for(var g=I.g.length+1,y=[],v=0;v<g;v++)y[v]=I.i(v)<<1|I.i(v-1)>>>31;return new o(y,I.h)}function G(I,g){var y=g>>5;g%=32;for(var v=I.g.length-y,E=[],b=0;b<v;b++)E[b]=0<g?I.i(b+y)>>>g|I.i(b+y+1)<<32-g:I.i(b+y);return new o(E,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,hc=Zd.Md5=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Ct=Zd.Integer=o}).apply(typeof Xd<"u"?Xd:typeof self<"u"?self:typeof window<"u"?window:{});var ms=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},dt={};var dc,fc,jn,pc,zr,gs,mc,gc,_c;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,d){return a==Array.prototype||a==Object.prototype||(a[l]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ms=="object"&&ms];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(a,l){if(l)e:{var d=r;a=a.split(".");for(var p=0;p<a.length-1;p++){var T=a[p];if(!(T in d))break e;d=d[T]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}function s(a,l){a instanceof String&&(a+="");var d=0,p=!1,T={next:function(){if(!p&&d<a.length){var S=d++;return{value:l(S,a[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(a){return a||function(){return s(this,function(l,d){return d})}});var o=o||{},c=this||self;function u(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function h(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,d){return a.call.apply(a.bind,arguments)}function m(a,l,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,p),a.apply(l,T)}}return function(){return a.apply(l,arguments)}}function w(a,l,d){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,w.apply(null,arguments)}function R(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function D(a,l){function d(){}d.prototype=l.prototype,a.aa=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,T,S){for(var x=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)x[ne-2]=arguments[ne];return l.prototype[T].apply(p,x)}}function O(a){let l=a.length;if(0<l){let d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function k(a,l){for(let d=1;d<arguments.length;d++){let p=arguments[d];if(u(p)){let T=a.length||0,S=p.length||0;a.length=T+S;for(let x=0;x<S;x++)a[T+x]=p[x]}else a.push(p)}}class z{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function j(a){return/^[\s\xa0]*$/.test(a)}function U(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function H(a){return H[" "](a),a}H[" "]=function(){};var Y=U().indexOf("Gecko")!=-1&&!(U().toLowerCase().indexOf("webkit")!=-1&&U().indexOf("Edge")==-1)&&!(U().indexOf("Trident")!=-1||U().indexOf("MSIE")!=-1)&&U().indexOf("Edge")==-1;function G(a,l,d){for(let p in a)l.call(d,a[p],p,a)}function I(a,l){for(let d in a)l.call(void 0,a[d],d,a)}function g(a){let l={};for(let d in a)l[d]=a[d];return l}let y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(a,l){let d,p;for(let T=1;T<arguments.length;T++){p=arguments[T];for(d in p)a[d]=p[d];for(let S=0;S<y.length;S++)d=y[S],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function E(a){var l=1;a=a.split(":");let d=[];for(;0<l&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function b(a){c.setTimeout(()=>{throw a},0)}function _(){var a=ya;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class ut{constructor(){this.h=this.g=null}add(l,d){let p=Tr.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Tr=new z(()=>new T_,a=>a.reset());class T_{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let br,Ar=!1,ya=new ut,Sh=()=>{let a=c.Promise.resolve(void 0);br=()=>{a.then(b_)}};var b_=()=>{for(var a;a=_();){try{a.h.call(a.g)}catch(d){b(d)}var l=Tr;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}Ar=!1};function vt(){this.s=this.s,this.C=this.C}vt.prototype.s=!1,vt.prototype.ma=function(){this.s||(this.s=!0,this.N())},vt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Te(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}Te.prototype.h=function(){this.defaultPrevented=!0};var A_=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{let d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return a}();function Sr(a,l){if(Te.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(Y){e:{try{H(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:S_[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Sr.aa.h.call(this)}}D(Sr,Te);var S_={2:"touch",3:"pen",4:"mouse"};Sr.prototype.h=function(){Sr.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Rr="closure_listenable_"+(1e6*Math.random()|0),R_=0;function P_(a,l,d,p,T){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=T,this.key=++R_,this.da=this.fa=!1}function Ki(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function $i(a){this.src=a,this.g={},this.h=0}$i.prototype.add=function(a,l,d,p,T){var S=a.toString();a=this.g[S],a||(a=this.g[S]=[],this.h++);var x=Ia(a,l,p,T);return-1<x?(l=a[x],d||(l.fa=!1)):(l=new P_(l,this.src,S,!!p,T),l.fa=d,a.push(l)),l};function wa(a,l){var d=l.type;if(d in a.g){var p=a.g[d],T=Array.prototype.indexOf.call(p,l,void 0),S;(S=0<=T)&&Array.prototype.splice.call(p,T,1),S&&(Ki(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Ia(a,l,d,p){for(var T=0;T<a.length;++T){var S=a[T];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==p)return T}return-1}var va="closure_lm_"+(1e6*Math.random()|0),Ea={};function Rh(a,l,d,p,T){if(p&&p.once)return Ch(a,l,d,p,T);if(Array.isArray(l)){for(var S=0;S<l.length;S++)Rh(a,l[S],d,p,T);return null}return d=Sa(d),a&&a[Rr]?a.K(l,d,h(p)?!!p.capture:!!p,T):Ph(a,l,d,!1,p,T)}function Ph(a,l,d,p,T,S){if(!l)throw Error("Invalid event type");var x=h(T)?!!T.capture:!!T,ne=ba(a);if(ne||(a[va]=ne=new $i(a)),d=ne.add(l,d,p,x,S),d.proxy)return d;if(p=C_(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)A_||(T=x),T===void 0&&(T=!1),a.addEventListener(l.toString(),p,T);else if(a.attachEvent)a.attachEvent(Dh(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function C_(){function a(d){return l.call(a.src,a.listener,d)}let l=k_;return a}function Ch(a,l,d,p,T){if(Array.isArray(l)){for(var S=0;S<l.length;S++)Ch(a,l[S],d,p,T);return null}return d=Sa(d),a&&a[Rr]?a.L(l,d,h(p)?!!p.capture:!!p,T):Ph(a,l,d,!0,p,T)}function kh(a,l,d,p,T){if(Array.isArray(l))for(var S=0;S<l.length;S++)kh(a,l[S],d,p,T);else p=h(p)?!!p.capture:!!p,d=Sa(d),a&&a[Rr]?(a=a.i,l=String(l).toString(),l in a.g&&(S=a.g[l],d=Ia(S,d,p,T),-1<d&&(Ki(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete a.g[l],a.h--)))):a&&(a=ba(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Ia(l,d,p,T)),(d=-1<a?l[a]:null)&&Ta(d))}function Ta(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Rr])wa(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(Dh(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=ba(l))?(wa(d,a),d.h==0&&(d.src=null,l[va]=null)):Ki(a)}}}function Dh(a){return a in Ea?Ea[a]:Ea[a]="on"+a}function k_(a,l){if(a.da)a=!0;else{l=new Sr(l,this);var d=a.listener,p=a.ha||a.src;a.fa&&Ta(a),a=d.call(p,l)}return a}function ba(a){return a=a[va],a instanceof $i?a:null}var Aa="__closure_events_fn_"+(1e9*Math.random()>>>0);function Sa(a){return typeof a=="function"?a:(a[Aa]||(a[Aa]=function(l){return a.handleEvent(l)}),a[Aa])}function be(){vt.call(this),this.i=new $i(this),this.M=this,this.F=null}D(be,vt),be.prototype[Rr]=!0,be.prototype.removeEventListener=function(a,l,d,p){kh(this,a,l,d,p)};function De(a,l){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new Te(l,a);else if(l instanceof Te)l.target=l.target||a;else{var T=l;l=new Te(p,a),v(l,T)}if(T=!0,d)for(var S=d.length-1;0<=S;S--){var x=l.g=d[S];T=Hi(x,p,!0,l)&&T}if(x=l.g=a,T=Hi(x,p,!0,l)&&T,T=Hi(x,p,!1,l)&&T,d)for(S=0;S<d.length;S++)x=l.g=d[S],T=Hi(x,p,!1,l)&&T}be.prototype.N=function(){if(be.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var d=a.g[l],p=0;p<d.length;p++)Ki(d[p]);delete a.g[l],a.h--}}this.F=null},be.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},be.prototype.L=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Hi(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,S=0;S<l.length;++S){var x=l[S];if(x&&!x.da&&x.capture==d){var ne=x.listener,ye=x.ha||x.src;x.fa&&wa(a.i,x),T=ne.call(ye,p)!==!1&&T}}return T&&!p.defaultPrevented}function Nh(a,l,d){if(typeof a=="function")d&&(a=w(a,d));else if(a&&typeof a.handleEvent=="function")a=w(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(a,l||0)}function Oh(a){a.g=Nh(()=>{a.g=null,a.i&&(a.i=!1,Oh(a))},a.l);let l=a.h;a.h=null,a.m.apply(null,l)}class D_ extends vt{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Oh(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Pr(a){vt.call(this),this.h=a,this.g={}}D(Pr,vt);var xh=[];function Vh(a){G(a.g,function(l,d){this.g.hasOwnProperty(d)&&Ta(l)},a),a.g={}}Pr.prototype.N=function(){Pr.aa.N.call(this),Vh(this)},Pr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ra=c.JSON.stringify,N_=c.JSON.parse,O_=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Pa(){}Pa.prototype.h=null;function Lh(a){return a.h||(a.h=a.i())}function Mh(){}var Cr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ca(){Te.call(this,"d")}D(Ca,Te);function ka(){Te.call(this,"c")}D(ka,Te);var Wt={},Fh=null;function Wi(){return Fh=Fh||new be}Wt.La="serverreachability";function Uh(a){Te.call(this,Wt.La,a)}D(Uh,Te);function kr(a){let l=Wi();De(l,new Uh(l))}Wt.STAT_EVENT="statevent";function qh(a,l){Te.call(this,Wt.STAT_EVENT,a),this.stat=l}D(qh,Te);function Ne(a){let l=Wi();De(l,new qh(l,a))}Wt.Ma="timingevent";function Bh(a,l){Te.call(this,Wt.Ma,a),this.size=l}D(Bh,Te);function Dr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},l)}function Nr(){this.g=!0}Nr.prototype.xa=function(){this.g=!1};function x_(a,l,d,p,T,S){a.info(function(){if(a.g)if(S)for(var x="",ne=S.split("&"),ye=0;ye<ne.length;ye++){var X=ne[ye].split("=");if(1<X.length){var Ae=X[0];X=X[1];var Se=Ae.split("_");x=2<=Se.length&&Se[1]=="type"?x+(Ae+"="+X+"&"):x+(Ae+"=redacted&")}}else x=null;else x=S;return"XMLHTTP REQ ("+p+") [attempt "+T+"]: "+l+`
`+d+`
`+x})}function V_(a,l,d,p,T,S,x){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+T+"]: "+l+`
`+d+`
`+S+" "+x})}function On(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+M_(a,d)+(p?" "+p:"")})}function L_(a,l){a.info(function(){return"TIMEOUT: "+l})}Nr.prototype.info=function(){};function M_(a,l){if(!a.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var T=p[1];if(Array.isArray(T)&&!(1>T.length)){var S=T[0];if(S!="noop"&&S!="stop"&&S!="close")for(var x=1;x<T.length;x++)T[x]=""}}}}return Ra(d)}catch{return l}}var Qi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},jh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Da;function Ji(){}D(Ji,Pa),Ji.prototype.g=function(){return new XMLHttpRequest},Ji.prototype.i=function(){return{}},Da=new Ji;function Et(a,l,d,p){this.j=a,this.i=l,this.l=d,this.R=p||1,this.U=new Pr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new zh}function zh(){this.i=null,this.g="",this.h=!1}var Gh={},Na={};function Oa(a,l,d){a.L=1,a.v=es(lt(l)),a.m=d,a.P=!0,Kh(a,null)}function Kh(a,l){a.F=Date.now(),Yi(a),a.A=lt(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),sd(d.i,"t",p),a.C=0,d=a.j.J,a.h=new zh,a.g=Td(a.j,d?l:null,!a.m),0<a.O&&(a.M=new D_(w(a.Y,a,a.g),a.O)),l=a.U,d=a.g,p=a.ca;var T="readystatechange";Array.isArray(T)||(T&&(xh[0]=T.toString()),T=xh);for(var S=0;S<T.length;S++){var x=Rh(d,T[S],p||l.handleEvent,!1,l.h||l);if(!x)break;l.g[x.key]=x}l=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),kr(),x_(a.i,a.u,a.A,a.l,a.R,a.m)}Et.prototype.ca=function(a){a=a.target;let l=this.M;l&&ht(a)==3?l.j():this.Y(a)},Et.prototype.Y=function(a){try{if(a==this.g)e:{let Se=ht(this.g);var l=this.g.Ba();let Ln=this.g.Z();if(!(3>Se)&&(Se!=3||this.g&&(this.h.h||this.g.oa()||dd(this.g)))){this.J||Se!=4||l==7||(l==8||0>=Ln?kr(3):kr(2)),xa(this);var d=this.g.Z();this.X=d;t:if($h(this)){var p=dd(this.g);a="";var T=p.length,S=ht(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Qt(this),Or(this);var x="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,a+=this.h.i.decode(p[l],{stream:!(S&&l==T-1)});p.length=0,this.h.g+=a,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=d==200,V_(this.i,this.u,this.A,this.l,this.R,Se,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,ye=this.g;if((ne=ye.g?ye.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(ne)){var X=ne;break t}}X=null}if(d=X)On(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Va(this,d);else{this.o=!1,this.s=3,Ne(12),Qt(this),Or(this);break e}}if(this.P){d=!0;let $e;for(;!this.J&&this.C<x.length;)if($e=F_(this,x),$e==Na){Se==4&&(this.s=4,Ne(14),d=!1),On(this.i,this.l,null,"[Incomplete Response]");break}else if($e==Gh){this.s=4,Ne(15),On(this.i,this.l,x,"[Invalid Chunk]"),d=!1;break}else On(this.i,this.l,$e,null),Va(this,$e);if($h(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Se!=4||x.length!=0||this.h.h||(this.s=1,Ne(16),d=!1),this.o=this.o&&d,!d)On(this.i,this.l,x,"[Invalid Chunked Response]"),Qt(this),Or(this);else if(0<x.length&&!this.W){this.W=!0;var Ae=this.j;Ae.g==this&&Ae.ba&&!Ae.M&&(Ae.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),Ba(Ae),Ae.M=!0,Ne(11))}}else On(this.i,this.l,x,null),Va(this,x);Se==4&&Qt(this),this.o&&!this.J&&(Se==4?wd(this.j,this):(this.o=!1,Yi(this)))}else ty(this.g),d==400&&0<x.indexOf("Unknown SID")?(this.s=3,Ne(12)):(this.s=0,Ne(13)),Qt(this),Or(this)}}}catch{}finally{}};function $h(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function F_(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?Na:(d=Number(l.substring(d,p)),isNaN(d)?Gh:(p+=1,p+d>l.length?Na:(l=l.slice(p,p+d),a.C=p+d,l)))}Et.prototype.cancel=function(){this.J=!0,Qt(this)};function Yi(a){a.S=Date.now()+a.I,Hh(a,a.I)}function Hh(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Dr(w(a.ba,a),l)}function xa(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Et.prototype.ba=function(){this.B=null;let a=Date.now();0<=a-this.S?(L_(this.i,this.A),this.L!=2&&(kr(),Ne(17)),Qt(this),this.s=2,Or(this)):Hh(this,this.S-a)};function Or(a){a.j.G==0||a.J||wd(a.j,a)}function Qt(a){xa(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,Vh(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function Va(a,l){try{var d=a.j;if(d.G!=0&&(d.g==a||La(d.h,a))){if(!a.K&&La(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var T=p;if(T[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)ss(d),rs(d);else break e;qa(d),Ne(18)}}else d.za=T[1],0<d.za-d.T&&37500>T[2]&&d.F&&d.v==0&&!d.C&&(d.C=Dr(w(d.Za,d),6e3));if(1>=Jh(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Yt(d,11)}else if((a.K||d.g==a)&&ss(d),!j(l))for(T=d.Da.g.parse(l),l=0;l<T.length;l++){let X=T[l];if(d.T=X[0],X=X[1],d.G==2)if(X[0]=="c"){d.K=X[1],d.ia=X[2];let Ae=X[3];Ae!=null&&(d.la=Ae,d.j.info("VER="+d.la));let Se=X[4];Se!=null&&(d.Aa=Se,d.j.info("SVER="+d.Aa));let Ln=X[5];Ln!=null&&typeof Ln=="number"&&0<Ln&&(p=1.5*Ln,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;let $e=a.g;if($e){let as=$e.g?$e.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(as){var S=p.h;S.g||as.indexOf("spdy")==-1&&as.indexOf("quic")==-1&&as.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Ma(S,S.h),S.h=null))}if(p.D){let ja=$e.g?$e.g.getResponseHeader("X-HTTP-Session-Id"):null;ja&&(p.ya=ja,ie(p.I,p.D,ja))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var x=a;if(p.qa=Ed(p,p.J?p.ia:null,p.W),x.K){Yh(p.h,x);var ne=x,ye=p.L;ye&&(ne.I=ye),ne.B&&(xa(ne),Yi(ne)),p.g=x}else _d(p);0<d.i.length&&is(d)}else X[0]!="stop"&&X[0]!="close"||Yt(d,7);else d.G==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?Yt(d,7):Ua(d):X[0]!="noop"&&d.l&&d.l.ta(X),d.v=0)}}kr(4)}catch{}}var U_=class{constructor(a,l){this.g=a,this.map=l}};function Wh(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Qh(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Jh(a){return a.h?1:a.g?a.g.size:0}function La(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Ma(a,l){a.g?a.g.add(l):a.h=l}function Yh(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Wh.prototype.cancel=function(){if(this.i=Xh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let a of this.g.values())a.cancel();this.g.clear()}};function Xh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(let d of a.g.values())l=l.concat(d.D);return l}return O(a.i)}function q_(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var l=[],d=a.length,p=0;p<d;p++)l.push(a[p]);return l}l=[],d=0;for(p in a)l[d++]=a[p];return l}function B_(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var l=[];a=a.length;for(var d=0;d<a;d++)l.push(d);return l}l=[],d=0;for(let p in a)l[d++]=p;return l}}}function Zh(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var d=B_(a),p=q_(a),T=p.length,S=0;S<T;S++)l.call(void 0,p[S],d&&d[S],a)}var ed=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function j_(a,l){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),T=null;if(0<=p){var S=a[d].substring(0,p);T=a[d].substring(p+1)}else S=a[d];l(S,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Jt(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Jt){this.h=a.h,Xi(this,a.j),this.o=a.o,this.g=a.g,Zi(this,a.s),this.l=a.l;var l=a.i,d=new Lr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),td(this,d),this.m=a.m}else a&&(l=String(a).match(ed))?(this.h=!1,Xi(this,l[1]||"",!0),this.o=xr(l[2]||""),this.g=xr(l[3]||"",!0),Zi(this,l[4]),this.l=xr(l[5]||"",!0),td(this,l[6]||"",!0),this.m=xr(l[7]||"")):(this.h=!1,this.i=new Lr(null,this.h))}Jt.prototype.toString=function(){var a=[],l=this.j;l&&a.push(Vr(l,nd,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Vr(l,nd,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Vr(d,d.charAt(0)=="/"?K_:G_,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Vr(d,H_)),a.join("")};function lt(a){return new Jt(a)}function Xi(a,l,d){a.j=d?xr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Zi(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function td(a,l,d){l instanceof Lr?(a.i=l,W_(a.i,a.h)):(d||(l=Vr(l,$_)),a.i=new Lr(l,a.h))}function ie(a,l,d){a.i.set(l,d)}function es(a){return ie(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function xr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Vr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,z_),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function z_(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var nd=/[#\/\?@]/g,G_=/[#\?:]/g,K_=/[#\?]/g,$_=/[#\?@]/g,H_=/#/g;function Lr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Tt(a){a.g||(a.g=new Map,a.h=0,a.i&&j_(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Lr.prototype,n.add=function(a,l){Tt(this),this.i=null,a=xn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function rd(a,l){Tt(a),l=xn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function id(a,l){return Tt(a),l=xn(a,l),a.g.has(l)}n.forEach=function(a,l){Tt(this),this.g.forEach(function(d,p){d.forEach(function(T){a.call(l,T,p,this)},this)},this)},n.na=function(){Tt(this);let a=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){let T=a[p];for(let S=0;S<T.length;S++)d.push(l[p])}return d},n.V=function(a){Tt(this);let l=[];if(typeof a=="string")id(this,a)&&(l=l.concat(this.g.get(xn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)l=l.concat(a[d])}return l},n.set=function(a,l){return Tt(this),this.i=null,a=xn(this,a),id(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function sd(a,l,d){rd(a,l),0<d.length&&(a.i=null,a.g.set(xn(a,l),O(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let a=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];let S=encodeURIComponent(String(p)),x=this.V(p);for(p=0;p<x.length;p++){var T=S;x[p]!==""&&(T+="="+encodeURIComponent(String(x[p]))),a.push(T)}}return this.i=a.join("&")};function xn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function W_(a,l){l&&!a.j&&(Tt(a),a.i=null,a.g.forEach(function(d,p){var T=p.toLowerCase();p!=T&&(rd(this,p),sd(this,T,d))},a)),a.j=l}function Q_(a,l){let d=new Nr;if(c.Image){let p=new Image;p.onload=R(bt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=R(bt,d,"TestLoadImage: error",!1,l,p),p.onabort=R(bt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=R(bt,d,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function J_(a,l){let d=new Nr,p=new AbortController,T=setTimeout(()=>{p.abort(),bt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(S=>{clearTimeout(T),S.ok?bt(d,"TestPingServer: ok",!0,l):bt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),bt(d,"TestPingServer: error",!1,l)})}function bt(a,l,d,p,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),p(d)}catch{}}function Y_(){this.g=new O_}function X_(a,l,d){let p=d||"";try{Zh(a,function(T,S){let x=T;h(T)&&(x=Ra(T)),l.push(p+S+"="+encodeURIComponent(x))})}catch(T){throw l.push(p+"type="+encodeURIComponent("_badmap")),T}}function Mr(a){this.l=a.Ub||null,this.j=a.eb||!1}D(Mr,Pa),Mr.prototype.g=function(){return new ts(this.l,this.j)},Mr.prototype.i=function(a){return function(){return a}}({});function ts(a,l){be.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(ts,be),n=ts.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,Ur(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Fr(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ur(this)),this.g&&(this.readyState=3,Ur(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;od(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function od(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Fr(this):Ur(this),this.readyState==3&&od(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Fr(this))},n.Qa=function(a){this.g&&(this.response=a,Fr(this))},n.ga=function(){this.g&&Fr(this)};function Fr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ur(a)}n.setRequestHeader=function(a,l){this.u.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Ur(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ts.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function ad(a){let l="";return G(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function Fa(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=ad(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ie(a,l,d))}function oe(a){be.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(oe,be);var Z_=/^https?$/i,ey=["POST","PUT"];n=oe.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Da.g(),this.v=this.o?Lh(this.o):Lh(Da),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(S){cd(this,S);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var T in p)d.set(T,p[T]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let S of p.keys())d.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),T=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(ey,l,void 0))||p||T||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[S,x]of d)this.g.setRequestHeader(S,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{hd(this),this.u=!0,this.g.send(a),this.u=!1}catch(S){cd(this,S)}};function cd(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,ud(a),ns(a)}function ud(a){a.A||(a.A=!0,De(a,"complete"),De(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,De(this,"complete"),De(this,"abort"),ns(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ns(this,!0)),oe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ld(this):this.bb())},n.bb=function(){ld(this)};function ld(a){if(a.h&&typeof o<"u"&&(!a.v[1]||ht(a)!=4||a.Z()!=2)){if(a.u&&ht(a)==4)Nh(a.Ea,0,a);else if(De(a,"readystatechange"),ht(a)==4){a.h=!1;try{let x=a.Z();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=x===0){var T=String(a.D).match(ed)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),p=!Z_.test(T?T.toLowerCase():"")}d=p}if(d)De(a,"complete"),De(a,"success");else{a.m=6;try{var S=2<ht(a)?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.Z()+"]",ud(a)}}finally{ns(a)}}}}function ns(a,l){if(a.g){hd(a);let d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||De(a,"ready");try{d.onreadystatechange=p}catch{}}}function hd(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function ht(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<ht(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),N_(l)}};function dd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function ty(a){let l={};a=(a.g&&2<=ht(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(j(a[p]))continue;var d=E(a[p]);let T=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();let S=l[T]||[];l[T]=S,S.push(d)}I(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function qr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function fd(a){this.Aa=0,this.i=[],this.j=new Nr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=qr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=qr("baseRetryDelayMs",5e3,a),this.cb=qr("retryDelaySeedMs",1e4,a),this.Wa=qr("forwardChannelMaxRetries",2,a),this.wa=qr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Wh(a&&a.concurrentRequestLimit),this.Da=new Y_,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=fd.prototype,n.la=8,n.G=1,n.connect=function(a,l,d,p){Ne(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Ed(this,null,this.W),is(this)};function Ua(a){if(pd(a),a.G==3){var l=a.U++,d=lt(a.I);if(ie(d,"SID",a.K),ie(d,"RID",l),ie(d,"TYPE","terminate"),Br(a,d),l=new Et(a,a.j,l),l.L=2,l.v=es(lt(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=Td(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Yi(l)}vd(a)}function rs(a){a.g&&(Ba(a),a.g.cancel(),a.g=null)}function pd(a){rs(a),a.u&&(c.clearTimeout(a.u),a.u=null),ss(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function is(a){if(!Qh(a.h)&&!a.s){a.s=!0;var l=a.Ga;br||Sh(),Ar||(br(),Ar=!0),ya.add(l,a),a.B=0}}function ny(a,l){return Jh(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Dr(w(a.Ga,a,l),Id(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;let T=new Et(this,this.j,a),S=this.o;if(this.S&&(S?(S=g(S),v(S,this.S)):S=this.S),this.m!==null||this.O||(T.H=S,S=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=gd(this,T,l),d=lt(this.I),ie(d,"RID",a),ie(d,"CVER",22),this.D&&ie(d,"X-HTTP-Session-Id",this.D),Br(this,d),S&&(this.O?l="headers="+encodeURIComponent(String(ad(S)))+"&"+l:this.m&&Fa(d,this.m,S)),Ma(this.h,T),this.Ua&&ie(d,"TYPE","init"),this.P?(ie(d,"$req",l),ie(d,"SID","null"),T.T=!0,Oa(T,d,null)):Oa(T,d,l),this.G=2}}else this.G==3&&(a?md(this,a):this.i.length==0||Qh(this.h)||md(this))};function md(a,l){var d;l?d=l.l:d=a.U++;let p=lt(a.I);ie(p,"SID",a.K),ie(p,"RID",d),ie(p,"AID",a.T),Br(a,p),a.m&&a.o&&Fa(p,a.m,a.o),d=new Et(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),l&&(a.i=l.D.concat(a.i)),l=gd(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Ma(a.h,d),Oa(d,p,l)}function Br(a,l){a.H&&G(a.H,function(d,p){ie(l,p,d)}),a.l&&Zh({},function(d,p){ie(l,p,d)})}function gd(a,l,d){d=Math.min(a.i.length,d);var p=a.l?w(a.l.Na,a.l,a):null;e:{var T=a.i;let S=-1;for(;;){let x=["count="+d];S==-1?0<d?(S=T[0].g,x.push("ofs="+S)):S=0:x.push("ofs="+S);let ne=!0;for(let ye=0;ye<d;ye++){let X=T[ye].g,Ae=T[ye].map;if(X-=S,0>X)S=Math.max(0,T[ye].g-100),ne=!1;else try{X_(Ae,x,"req"+X+"_")}catch{p&&p(Ae)}}if(ne){p=x.join("&");break e}}}return a=a.i.splice(0,d),l.D=a,p}function _d(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;br||Sh(),Ar||(br(),Ar=!0),ya.add(l,a),a.v=0}}function qa(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Dr(w(a.Fa,a),Id(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,yd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Dr(w(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ne(10),rs(this),yd(this))};function Ba(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function yd(a){a.g=new Et(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=lt(a.qa);ie(l,"RID","rpc"),ie(l,"SID",a.K),ie(l,"AID",a.T),ie(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&ie(l,"TO",a.ja),ie(l,"TYPE","xmlhttp"),Br(a,l),a.m&&a.o&&Fa(l,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=es(lt(l)),d.m=null,d.P=!0,Kh(d,a)}n.Za=function(){this.C!=null&&(this.C=null,rs(this),qa(this),Ne(19))};function ss(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function wd(a,l){var d=null;if(a.g==l){ss(a),Ba(a),a.g=null;var p=2}else if(La(a.h,l))d=l.D,Yh(a.h,l),p=1;else return;if(a.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var T=a.B;p=Wi(),De(p,new Bh(p,d)),is(a)}else _d(a);else if(T=l.s,T==3||T==0&&0<l.X||!(p==1&&ny(a,l)||p==2&&qa(a)))switch(d&&0<d.length&&(l=a.h,l.i=l.i.concat(d)),T){case 1:Yt(a,5);break;case 4:Yt(a,10);break;case 3:Yt(a,6);break;default:Yt(a,2)}}}function Id(a,l){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*l}function Yt(a,l){if(a.j.info("Error code "+l),l==2){var d=w(a.fb,a),p=a.Xa;let T=!p;p=new Jt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Xi(p,"https"),es(p),T?Q_(p.toString(),d):J_(p.toString(),d)}else Ne(2);a.G=0,a.l&&a.l.sa(l),vd(a),pd(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ne(2)):(this.j.info("Failed to ping google.com"),Ne(1))};function vd(a){if(a.G=0,a.ka=[],a.l){let l=Xh(a.h);(l.length!=0||a.i.length!=0)&&(k(a.ka,l),k(a.ka,a.i),a.h.i.length=0,O(a.i),a.i.length=0),a.l.ra()}}function Ed(a,l,d){var p=d instanceof Jt?lt(d):new Jt(d);if(p.g!="")l&&(p.g=l+"."+p.g),Zi(p,p.s);else{var T=c.location;p=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var S=new Jt(null);p&&Xi(S,p),l&&(S.g=l),T&&Zi(S,T),d&&(S.l=d),p=S}return d=a.D,l=a.ya,d&&l&&ie(p,d,l),ie(p,"VER",a.la),Br(a,p),p}function Td(a,l,d){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new oe(new Mr({eb:d})):new oe(a.pa),l.Ha(a.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function bd(){}n=bd.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function os(){}os.prototype.g=function(a,l){return new Ue(a,l)};function Ue(a,l){be.call(this),this.g=new fd(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!j(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!j(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Vn(this)}D(Ue,be),Ue.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ue.prototype.close=function(){Ua(this.g)},Ue.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Ra(a),a=d);l.i.push(new U_(l.Ya++,a)),l.G==3&&is(l)},Ue.prototype.N=function(){this.g.l=null,delete this.j,Ua(this.g),delete this.g,Ue.aa.N.call(this)};function Ad(a){Ca.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(let d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}D(Ad,Ca);function Sd(){ka.call(this),this.status=1}D(Sd,ka);function Vn(a){this.g=a}D(Vn,bd),Vn.prototype.ua=function(){De(this.g,"a")},Vn.prototype.ta=function(a){De(this.g,new Ad(a))},Vn.prototype.sa=function(a){De(this.g,new Sd)},Vn.prototype.ra=function(){De(this.g,"b")},os.prototype.createWebChannel=os.prototype.g,Ue.prototype.send=Ue.prototype.o,Ue.prototype.open=Ue.prototype.m,Ue.prototype.close=Ue.prototype.close,_c=dt.createWebChannelTransport=function(){return new os},gc=dt.getStatEventTarget=function(){return Wi()},mc=dt.Event=Wt,gs=dt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Qi.NO_ERROR=0,Qi.TIMEOUT=8,Qi.HTTP_ERROR=6,zr=dt.ErrorCode=Qi,jh.COMPLETE="complete",pc=dt.EventType=jh,Mh.EventType=Cr,Cr.OPEN="a",Cr.CLOSE="b",Cr.ERROR="c",Cr.MESSAGE="d",be.prototype.listen=be.prototype.K,jn=dt.WebChannel=Mh,fc=dt.FetchXmlHttpFactory=Mr,oe.prototype.listenOnce=oe.prototype.L,oe.prototype.getLastError=oe.prototype.Ka,oe.prototype.getLastErrorCode=oe.prototype.Ba,oe.prototype.getStatus=oe.prototype.Z,oe.prototype.getResponseJson=oe.prototype.Oa,oe.prototype.getResponseText=oe.prototype.oa,oe.prototype.send=oe.prototype.ea,oe.prototype.setWithCredentials=oe.prototype.Ha,dc=dt.XhrIo=oe}).apply(typeof ms<"u"?ms:typeof self<"u"?self:typeof window<"u"?window:{});var ef="@firebase/firestore";var ge=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};ge.UNAUTHENTICATED=new ge(null),ge.GOOGLE_CREDENTIALS=new ge("google-credentials-uid"),ge.FIRST_PARTY=new ge("first-party-uid"),ge.MOCK_USER=new ge("mock-user");var _r="10.12.1";var dn=new St("@firebase/firestore");function Hn(){return dn.logLevel}function C(n,...e){if(dn.logLevel<=W.DEBUG){let t=e.map(wl);dn.debug(`Firestore (${_r}): ${n}`,...t)}}function ue(n,...e){if(dn.logLevel<=W.ERROR){let t=e.map(wl);dn.error(`Firestore (${_r}): ${n}`,...t)}}function ni(n,...e){if(dn.logLevel<=W.WARN){let t=e.map(wl);dn.warn(`Firestore (${_r}): ${n}`,...t)}}function wl(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function L(n="Unexpected state"){let e=`FIRESTORE (${_r}) INTERNAL ASSERTION FAILED: `+n;throw ue(e),new Error(e)}function q(n,e){n||L()}function M(n,e){return n}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},N=class extends Oe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Qe=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var bc=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Ac=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ge.UNAUTHENTICATED))}shutdown(){}};var Sc=class{constructor(e){this.t=e,this.currentUser=ge.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve(),s=new Qe;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Qe,e.enqueueRetryable(()=>i(this.currentUser))};let o=()=>{let u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){let u=this.t.getImmediate({optional:!0});u?c(u):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Qe)}},0),o()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(q(typeof r.accessToken=="string"),new bc(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string"),new ge(e)}},Rc=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=ge.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},Pc=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Rc(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ge.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Cc=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},kc=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=s=>{s.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let o=s.token!==this.R;return this.R=s.token,C("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(q(typeof t.token=="string"),this.R=t.token,new Cc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}};function mw(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var Ss=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=mw(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function K(n,e){return n<e?-1:n>e?1:0}function nr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function np(n){return n+"\0"}var le=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var B=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new le(0,0))}static max(){return new n(new le(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Rs=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&L(),r===void 0?r=e.length-t:r>e.length-t&&L(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},te=class n extends Rs{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},gw=/^[_a-zA-Z][_a-zA-Z0-9]*$/,pe=class n extends Rs{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return gw.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var V=class n{constructor(e){this.path=e}static fromPath(e){return new n(te.fromString(e))}static fromName(e){return new n(te.fromString(e).popFirst(5))}static empty(){return new n(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new te(e.slice()))}};var rr=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};function Dc(n){return n.fields.find(e=>e.kind===2)}function nn(n){return n.fields.filter(e=>e.kind!==2)}rr.UNKNOWN_ID=-1;var Zn=class{constructor(e,t){this.fieldPath=e,this.kind=t}};var ri=class n{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new n(0,Ke.min())}};function rp(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=B.fromTimestamp(r===1e9?new le(t+1,0):new le(t,r));return new Ke(i,V.empty(),e)}function ip(n){return new Ke(n.readTime,n.key,-1)}var Ke=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(B.min(),V.empty(),-1)}static max(){return new n(B.max(),V.empty(),-1)}};function Il(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=V.comparator(n.documentKey,e.documentKey),t!==0?t:K(n.largestBatchId,e.largestBatchId))}var sp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Ps=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function zt(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==sp)throw n;C("LocalStore","Unexpectedly lost primary lease")}var A=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},u=>r(u))}),o=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,o=new Array(s),c=0;for(let u=0;u<s;u++){let h=u;t(e[h]).next(f=>{o[h]=f,++c,c===s&&r(o)},f=>i(f))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};var Cs=class n{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new Qe,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new ln(e,t.error)):this.V.resolve()},this.transaction.onerror=r=>{let i=vl(r.target.error);this.V.reject(new ln(e,i))}}static open(e,t,r,i){try{return new n(t,e.transaction(i,r))}catch(s){throw new ln(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(C("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){let e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){let t=this.transaction.objectStore(e);return new Oc(t)}},ir=class n{constructor(e,t,r){this.name=e,this.version=t,this.p=r,n.S(ae())===12.2&&ue("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return C("SimpleDb","Removing database:",e),rn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Mn())return!1;if(n.C())return!0;let e=ae(),t=n.S(e),r=0<t&&t<10,i=op(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static C(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.v)==="YES"}static F(e,t){return e.store(t)}static S(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||(C("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{let i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{let o=s.target.result;t(o)},i.onblocked=()=>{r(new ln(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{let o=s.target.error;o.name==="VersionError"?r(new N(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new N(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new ln(e,o))},i.onupgradeneeded=s=>{C("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);let o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{C("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){let s=t==="readonly",o=0;for(;;){++o;try{this.db=await this.M(e);let c=Cs.open(this.db,e,s?"readonly":"readwrite",r),u=i(c).next(h=>(c.g(),h)).catch(h=>(c.abort(h),A.reject(h))).toPromise();return u.catch(()=>{}),await c.m,u}catch(c){let u=c,h=u.name!=="FirebaseError"&&o<3;if(C("SimpleDb","Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}};function op(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}var Nc=class{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return rn(this.B.delete())}},ln=class extends N{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}};function Gt(n){return n.name==="IndexedDbTransactionError"}var Oc=class{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(C("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(C("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),rn(r)}add(e){return C("SimpleDb","ADD",this.store.name,e,e),rn(this.store.add(e))}get(e){return rn(this.store.get(e)).next(t=>(t===void 0&&(t=null),C("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return C("SimpleDb","DELETE",this.store.name,e),rn(this.store.delete(e))}count(){return C("SimpleDb","COUNT",this.store.name),rn(this.store.count())}U(e,t){let r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){let s=i.getAll(r.range);return new A((o,c)=>{s.onerror=u=>{c(u.target.error)},s.onsuccess=u=>{o(u.target.result)}})}{let s=this.cursor(r),o=[];return this.W(s,(c,u)=>{o.push(u)}).next(()=>o)}}G(e,t){let r=this.store.getAll(e,t===null?void 0:t);return new A((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}j(e,t){C("SimpleDb","DELETE ALL",this.store.name);let r=this.options(e,t);r.H=!1;let i=this.cursor(r);return this.W(i,(s,o,c)=>c.delete())}J(e,t){let r;t?r=e:(r={},t=e);let i=this.cursor(r);return this.W(i,t)}Y(e){let t=this.cursor({});return new A((r,i)=>{t.onerror=s=>{let o=vl(s.target.error);i(o)},t.onsuccess=s=>{let o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}W(e,t){let r=[];return new A((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{let c=o.target.result;if(!c)return void i();let u=new Nc(c),h=t(c.primaryKey,c.value,u);if(h instanceof A){let f=h.catch(m=>(u.done(),A.reject(m)));r.push(f)}u.isDone?i():u.K===null?c.continue():c.continue(u.K)}}).next(()=>A.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}};function rn(n){return new A((e,t)=>{n.onsuccess=r=>{let i=r.target.result;e(i)},n.onerror=r=>{let i=vl(r.target.error);t(i)}})}var tf=!1;function vl(n){let e=ir.S(ae());if(e>=12.2&&e<13){let t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){let r=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return tf||(tf=!0,setTimeout(()=>{throw r},0)),r}}return n}var xc=class{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){C("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{C("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Gt(t)?C("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await zt(t)}await this.X(6e4)})}},Vc=class{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){let r=new Set,i=t,s=!0;return A.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return C("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(c=>{i-=c,r.add(o)});s=!1})).next(()=>t-i)}ne(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{let o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(c=>(C("IndexBackfiller",`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}re(e,t){let r=e;return t.changes.forEach((i,s)=>{let o=ip(s);Il(o,r)>0&&(r=o)}),new Ke(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}};var Pe=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};Pe.oe=-1;function Ao(n){return n==null}function ii(n){return n===0&&1/n==-1/0}function ap(n){return typeof n=="number"&&Number.isInteger(n)&&!ii(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function Ve(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=nf(e)),e=_w(n.get(t),e);return nf(e)}function _w(n,e){let t=e,r=n.length;for(let i=0;i<r;i++){let s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function nf(n){return n+""}function et(n){let e=n.length;if(q(e>=2),e===2)return q(n.charAt(0)===""&&n.charAt(1)===""),te.emptyPath();let t=e-2,r=[],i="";for(let s=0;s<e;){let o=n.indexOf("",s);switch((o<0||o>t)&&L(),n.charAt(o+1)){case"":let c=n.substring(s,o),u;i.length===0?u=c:(i+=c,u=i,i=""),r.push(u);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:L()}s=o+2}return new te(r)}var rf=["userId","batchId"];function vs(n,e){return[n,Ve(e)]}function cp(n,e,t){return[n,Ve(e),t]}var yw={},ww=["prefixPath","collectionGroup","readTime","documentId"],Iw=["prefixPath","collectionGroup","documentId"],vw=["collectionGroup","readTime","prefixPath","documentId"],Ew=["canonicalId","targetId"],Tw=["targetId","path"],bw=["path","targetId"],Aw=["collectionId","parent"],Sw=["indexId","uid"],Rw=["uid","sequenceNumber"],Pw=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Cw=["indexId","uid","orderedDocumentKey"],kw=["userId","collectionPath","documentId"],Dw=["userId","collectionPath","largestBatchId"],Nw=["userId","collectionGroup","largestBatchId"],up=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],Ow=[...up,"documentOverlays"],lp=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],hp=lp,dp=[...hp,"indexConfiguration","indexState","indexEntries"],xw=dp;var si=class extends Ps{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}};function _e(n,e){let t=M(n);return ir.F(t._e,e)}function sf(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function En(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function fp(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var se=class n{constructor(e,t){this.comparator=e,this.root=t||nt.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,nt.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,nt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Xn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Xn(this.root,e,this.comparator,!1)}getReverseIterator(){return new Xn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Xn(this.root,e,this.comparator,!0)}},Xn=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},nt=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=s??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();let e=this.left.check();if(e!==this.right.check())throw L();return e+(this.isRed()?0:1)}};nt.EMPTY=null,nt.RED=!0,nt.BLACK=!1;nt.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(e,t,r,i,s){return this}insert(e,t,r){return new nt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var re=class n{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ks(this.data.getIterator())}getIteratorFrom(e){return new ks(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},ks=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};function zn(n){return n.hasNext()?n.getNext():void 0}var Be=class n{constructor(e){this.fields=e,e.sort(pe.comparator)}static empty(){return new n([])}unionWith(e){let t=new re(pe.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return nr(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Ds=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var ve=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Ds("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};ve.EMPTY_BYTE_STRING=new ve("");var Vw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function pt(n){if(q(!!n),typeof n=="string"){let e=0,t=Vw.exec(n);if(q(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ce(n.seconds),nanos:ce(n.nanos)}}function ce(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Vt(n){return typeof n=="string"?ve.fromBase64String(n):ve.fromUint8Array(n)}function El(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Tl(n){let e=n.mapValue.fields.__previous_value__;return El(e)?Tl(e):e}function oi(n){let e=pt(n.mapValue.fields.__local_write_time__.timestampValue);return new le(e.seconds,e.nanos)}var Lc=class{constructor(e,t,r,i,s,o,c,u,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h}},sr=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var Ot={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Es={nullValue:"NULL_VALUE"};function fn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?El(n)?4:pp(n)?9007199254740991:10:L()}function rt(n,e){if(n===e)return!0;let t=fn(n);if(t!==fn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return oi(n).isEqual(oi(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=pt(i.timestampValue),c=pt(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Vt(i.bytesValue).isEqual(Vt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ce(i.geoPointValue.latitude)===ce(s.geoPointValue.latitude)&&ce(i.geoPointValue.longitude)===ce(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ce(i.integerValue)===ce(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=ce(i.doubleValue),c=ce(s.doubleValue);return o===c?ii(o)===ii(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return nr(n.arrayValue.values||[],e.arrayValue.values||[],rt);case 10:return function(i,s){let o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(sf(o)!==sf(c))return!1;for(let u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!rt(o[u],c[u])))return!1;return!0}(n,e);default:return L()}}function ai(n,e){return(n.values||[]).find(t=>rt(t,e))!==void 0}function Lt(n,e){if(n===e)return 0;let t=fn(n),r=fn(e);if(t!==r)return K(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,e.booleanValue);case 2:return function(s,o){let c=ce(s.integerValue||s.doubleValue),u=ce(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return of(n.timestampValue,e.timestampValue);case 4:return of(oi(n),oi(e));case 5:return K(n.stringValue,e.stringValue);case 6:return function(s,o){let c=Vt(s),u=Vt(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){let c=s.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){let f=K(c[h],u[h]);if(f!==0)return f}return K(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){let c=K(ce(s.latitude),ce(o.latitude));return c!==0?c:K(ce(s.longitude),ce(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,o){let c=s.values||[],u=o.values||[];for(let h=0;h<c.length&&h<u.length;++h){let f=Lt(c[h],u[h]);if(f)return f}return K(c.length,u.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,o){if(s===Ot.mapValue&&o===Ot.mapValue)return 0;if(s===Ot.mapValue)return 1;if(o===Ot.mapValue)return-1;let c=s.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){let w=K(u[m],f[m]);if(w!==0)return w;let R=Lt(c[u[m]],h[f[m]]);if(R!==0)return R}return K(u.length,f.length)}(n.mapValue,e.mapValue);default:throw L()}}function of(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return K(n,e);let t=pt(n),r=pt(e),i=K(t.seconds,r.seconds);return i!==0?i:K(t.nanos,r.nanos)}function or(n){return Mc(n)}function Mc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=pt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Vt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return V.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Mc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let o of r)s?s=!1:i+=",",i+=`${o}:${Mc(t.fields[o])}`;return i+"}"}(n.mapValue):L()}function ci(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Fc(n){return!!n&&"integerValue"in n}function ui(n){return!!n&&"arrayValue"in n}function af(n){return!!n&&"nullValue"in n}function cf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Ts(n){return!!n&&"mapValue"in n}function Jr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return En(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Jr(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Jr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function pp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}function Lw(n){return"nullValue"in n?Es:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?ci(sr.empty(),V.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?{mapValue:{}}:L()}function Mw(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?ci(sr.empty(),V.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?{mapValue:{}}:"mapValue"in n?Ot:L()}function uf(n,e){let t=Lt(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function lf(n,e){let t=Lt(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}var xe=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ts(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Jr(t)}setAll(e){let t=pe.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){let u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Jr(o):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());Ts(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return rt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Ts(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){En(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(Jr(this.value))}};function mp(n){let e=[];return En(n.fields,(t,r)=>{let i=new pe([t]);if(Ts(r)){let s=mp(r.mapValue).fields;if(s.length===0)e.push(i);else for(let o of s)e.push(i.child(o))}else e.push(i)}),new Be(e)}var Ie=class n{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new n(e,0,B.min(),B.min(),B.min(),xe.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,B.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,B.min(),B.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,B.min(),B.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Mt=class{constructor(e,t){this.position=e,this.inclusive=t}};function hf(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],o=n.position[i];if(s.field.isKeyField()?r=V.comparator(V.fromName(o.referenceValue),t.key):r=Lt(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function df(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!rt(n.position[t],e.position[t]))return!1;return!0}var pn=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function Fw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var Ns=class{},Q=class n extends Ns{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Bc(e,t,r):t==="array-contains"?new Gc(e,r):t==="in"?new Os(e,r):t==="not-in"?new Kc(e,r):t==="array-contains-any"?new $c(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new jc(e,r):new zc(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Lt(t,this.value)):t!==null&&fn(this.value)===fn(t)&&this.matchesComparison(Lt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},ee=class n extends Ns{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new n(e,t)}matches(e){return ar(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function ar(n){return n.op==="and"}function Uc(n){return n.op==="or"}function bl(n){return gp(n)&&ar(n)}function gp(n){for(let e of n.filters)if(e instanceof ee)return!1;return!0}function qc(n){if(n instanceof Q)return n.field.canonicalString()+n.op.toString()+or(n.value);if(bl(n))return n.filters.map(e=>qc(e)).join(",");{let e=n.filters.map(t=>qc(t)).join(",");return`${n.op}(${e})`}}function _p(n,e){return n instanceof Q?function(r,i){return i instanceof Q&&r.op===i.op&&r.field.isEqual(i.field)&&rt(r.value,i.value)}(n,e):n instanceof ee?function(r,i){return i instanceof ee&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&_p(o,i.filters[c]),!0):!1}(n,e):void L()}function yp(n,e){let t=n.filters.concat(e);return ee.create(t,n.op)}function wp(n){return n instanceof Q?function(t){return`${t.field.canonicalString()} ${t.op} ${or(t.value)}`}(n):n instanceof ee?function(t){return t.op.toString()+" {"+t.getFilters().map(wp).join(" ,")+"}"}(n):"Filter"}var Bc=class extends Q{constructor(e,t,r){super(e,t,r),this.key=V.fromName(r.referenceValue)}matches(e){let t=V.comparator(e.key,this.key);return this.matchesComparison(t)}},jc=class extends Q{constructor(e,t){super(e,"in",t),this.keys=Ip("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},zc=class extends Q{constructor(e,t){super(e,"not-in",t),this.keys=Ip("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Ip(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>V.fromName(r.referenceValue))}var Gc=class extends Q{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return ui(t)&&ai(t.arrayValue,this.value)}},Os=class extends Q{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&ai(this.value.arrayValue,t)}},Kc=class extends Q{constructor(e,t){super(e,"not-in",t)}matches(e){if(ai(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!ai(this.value.arrayValue,t)}},$c=class extends Q{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!ui(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ai(this.value.arrayValue,r))}};var Hc=class{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.ue=null}};function Wc(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Hc(n,e,t,r,i,s,o)}function mn(n){let e=M(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>qc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Ao(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>or(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>or(r)).join(",")),e.ue=t}return e.ue}function Si(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Fw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!_p(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!df(n.startAt,e.startAt)&&df(n.endAt,e.endAt)}function xs(n){return V.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Vs(n,e){return n.filters.filter(t=>t instanceof Q&&t.field.isEqual(e))}function ff(n,e,t){let r=Es,i=!0;for(let s of Vs(n,e)){let o=Es,c=!0;switch(s.op){case"<":case"<=":o=Lw(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=Es}uf({value:r,inclusive:i},{value:o,inclusive:c})<0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){let o=t.position[s];uf({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function pf(n,e,t){let r=Ot,i=!0;for(let s of Vs(n,e)){let o=Ot,c=!0;switch(s.op){case">=":case">":o=Mw(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=Ot}lf({value:r,inclusive:i},{value:o,inclusive:c})>0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){let o=t.position[s];lf({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}var Ft=class{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function vp(n,e,t,r,i,s,o,c){return new Ft(n,e,t,r,i,s,o,c)}function So(n){return new Ft(n)}function mf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ep(n){return n.collectionGroup!==null}function Yr(n){let e=M(n);if(e.ce===null){e.ce=[];let t=new Set;for(let s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new re(pe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new pn(s,r))}),t.has(pe.keyField().canonicalString())||e.ce.push(new pn(pe.keyField(),r))}return e.ce}function ze(n){let e=M(n);return e.le||(e.le=Uw(e,Yr(n))),e.le}function Uw(n,e){if(n.limitType==="F")return Wc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new pn(i.field,s)});let t=n.endAt?new Mt(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Mt(n.startAt.position,n.startAt.inclusive):null;return Wc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Qc(n,e){let t=n.filters.concat([e]);return new Ft(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ls(n,e,t){return new Ft(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ro(n,e){return Si(ze(n),ze(e))&&n.limitType===e.limitType}function Tp(n){return`${mn(ze(n))}|lt:${n.limitType}`}function Wn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>wp(i)).join(", ")}]`),Ao(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>or(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>or(i)).join(",")),`Target(${r})`}(ze(n))}; limitType=${n.limitType})`}function Ri(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):V.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of Yr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,u){let h=hf(o,c,u);return o.inclusive?h<=0:h<0}(r.startAt,Yr(r),i)||r.endAt&&!function(o,c,u){let h=hf(o,c,u);return o.inclusive?h>=0:h>0}(r.endAt,Yr(r),i))}(n,e)}function bp(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ap(n){return(e,t)=>{let r=!1;for(let i of Yr(n)){let s=qw(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function qw(n,e,t){let r=n.field.isKeyField()?V.comparator(e.key,t.key):function(s,o,c){let u=o.data.field(s),h=c.data.field(s);return u!==null&&h!==null?Lt(u,h):L()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return L()}}var it=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){En(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return fp(this.inner)}size(){return this.innerSize}};var Bw=new se(V.comparator);function je(){return Bw}var Sp=new se(V.comparator);function Wr(...n){let e=Sp;for(let t of n)e=e.insert(t.key,t);return e}function Rp(n){let e=Sp;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function tt(){return Xr()}function Pp(){return Xr()}function Xr(){return new it(n=>n.toString(),(n,e)=>n.isEqual(e))}var jw=new se(V.comparator),zw=new re(V.comparator);function $(...n){let e=zw;for(let t of n)e=e.add(t);return e}var Gw=new re(K);function Al(){return Gw}function Cp(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ii(e)?"-0":e}}function kp(n){return{integerValue:""+n}}function Kw(n,e){return ap(e)?kp(e):Cp(n,e)}var cr=class{constructor(){this._=void 0}};function $w(n,e,t){return n instanceof gn?function(i,s){let o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&El(s)&&(s=Tl(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):n instanceof Ut?Np(n,e):n instanceof qt?Op(n,e):function(i,s){let o=Dp(i,s),c=gf(o)+gf(i.Pe);return Fc(o)&&Fc(i.Pe)?kp(c):Cp(i.serializer,c)}(n,e)}function Hw(n,e,t){return n instanceof Ut?Np(n,e):n instanceof qt?Op(n,e):t}function Dp(n,e){return n instanceof _n?function(r){return Fc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var gn=class extends cr{},Ut=class extends cr{constructor(e){super(),this.elements=e}};function Np(n,e){let t=xp(e);for(let r of n.elements)t.some(i=>rt(i,r))||t.push(r);return{arrayValue:{values:t}}}var qt=class extends cr{constructor(e){super(),this.elements=e}};function Op(n,e){let t=xp(e);for(let r of n.elements)t=t.filter(i=>!rt(i,r));return{arrayValue:{values:t}}}var _n=class extends cr{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function gf(n){return ce(n.integerValue||n.doubleValue)}function xp(n){return ui(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var Jc=class{constructor(e,t){this.field=e,this.transform=t}};function Ww(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Ut&&i instanceof Ut||r instanceof qt&&i instanceof qt?nr(r.elements,i.elements,rt):r instanceof _n&&i instanceof _n?rt(r.Pe,i.Pe):r instanceof gn&&i instanceof gn}(n.transform,e.transform)}var Yc=class{constructor(e,t){this.version=e,this.transformResults=t}},Ce=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function bs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var ur=class{};function Vp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new yn(n.key,Ce.none()):new Bt(n.key,n.data,Ce.none());{let t=n.data,r=xe.empty(),i=new re(pe.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Ye(n.key,r,new Be(i.toArray()),Ce.none())}}function Qw(n,e,t){n instanceof Bt?function(i,s,o){let c=i.value.clone(),u=yf(i.fieldTransforms,s,o.transformResults);c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Ye?function(i,s,o){if(!bs(i.precondition,s))return void s.convertToUnknownDocument(o.version);let c=yf(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(Lp(i)),u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Zr(n,e,t,r){return n instanceof Bt?function(s,o,c,u){if(!bs(s.precondition,o))return c;let h=s.value.clone(),f=wf(s.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ye?function(s,o,c,u){if(!bs(s.precondition,o))return c;let h=wf(s.fieldTransforms,u,o),f=o.data;return f.setAll(Lp(s)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(s,o,c){return bs(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function Jw(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=Dp(r.transform,i||null);s!=null&&(t===null&&(t=xe.empty()),t.set(r.field,s))}return t||null}function _f(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&nr(r,i,(s,o)=>Ww(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Bt=class extends ur{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Ye=class extends ur{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function Lp(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function yf(n,e,t){let r=new Map;q(n.length===t.length);for(let i=0;i<t.length;i++){let s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,Hw(o,c,t[i]))}return r}function wf(n,e,t){let r=new Map;for(let i of n){let s=i.transform,o=t.data.field(i.field);r.set(i.field,$w(s,o,e))}return r}var yn=class extends ur{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Ms=class extends ur{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var li=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&Qw(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=Zr(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=Zr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=Pp();return this.mutations.forEach(i=>{let s=e.get(i.key),o=s.overlayedDocument,c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;let u=Vp(o,c);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(B.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),$())}isEqual(e){return this.batchId===e.batchId&&nr(this.mutations,e.mutations,(t,r)=>_f(t,r))&&nr(this.baseMutations,e.baseMutations,(t,r)=>_f(t,r))}},Xc=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){q(e.mutations.length===r.length);let i=function(){return jw}(),s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new n(e,t,r,i)}};var hi=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var Zc=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var he,J;function Yw(n){switch(n){default:return L();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function Mp(n){if(n===void 0)return ue("GRPC error has no .code"),P.UNKNOWN;switch(n){case he.OK:return P.OK;case he.CANCELLED:return P.CANCELLED;case he.UNKNOWN:return P.UNKNOWN;case he.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case he.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case he.INTERNAL:return P.INTERNAL;case he.UNAVAILABLE:return P.UNAVAILABLE;case he.UNAUTHENTICATED:return P.UNAUTHENTICATED;case he.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case he.NOT_FOUND:return P.NOT_FOUND;case he.ALREADY_EXISTS:return P.ALREADY_EXISTS;case he.PERMISSION_DENIED:return P.PERMISSION_DENIED;case he.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case he.ABORTED:return P.ABORTED;case he.OUT_OF_RANGE:return P.OUT_OF_RANGE;case he.UNIMPLEMENTED:return P.UNIMPLEMENTED;case he.DATA_LOSS:return P.DATA_LOSS;default:return L()}}(J=he||(he={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";var If=null;function Xw(){return new TextEncoder}var Zw=new Ct([4294967295,4294967295],0);function vf(n){let e=Xw().encode(n),t=new hc;return t.update(e),new Uint8Array(t.digest())}function Ef(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Ct([t,r],0),new Ct([i,s],0)]}var eu=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new cn(`Invalid padding: ${t}`);if(r<0)throw new cn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new cn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new cn(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Ct.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(Ct.fromNumber(r)));return i.compare(Zw)===1&&(i=new Ct([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;let t=vf(e),[r,i]=Ef(t);for(let s=0;s<this.hashCount;s++){let o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new n(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ie===0)return;let t=vf(e),[r,i]=Ef(t);for(let s=0;s<this.hashCount;s++){let o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},cn=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var di=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,fi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(B.min(),i,new se(K),je(),$())}},fi=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,$(),$(),$())}};var er=class{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}},Fs=class{constructor(e,t){this.targetId=e,this.me=t}},Us=class{constructor(e,t,r=ve.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},qs=class{constructor(){this.fe=0,this.ge=bf(),this.pe=ve.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}Ce(){let e=$(),t=$(),r=$();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:L()}}),new fi(this.pe,this.ye,e,t,r)}ve(){this.we=!1,this.ge=bf()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}},tu=class{constructor(e){this.Le=e,this.Be=new Map,this.ke=je(),this.qe=Tf(),this.Qe=new se(K)}Ke(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{let r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.ve(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:L()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){let t=e.targetId,r=e.me.count,i=this.Je(t);if(i){let s=i.target;if(xs(s))if(r===0){let o=new V(s.path);this.Ue(t,o,Ie.newNoDocument(o,B.min()))}else q(r===1);else{let o=this.Ye(t);if(o!==r){let c=this.Ze(e),u=c?this.Xe(c,e,o):1;if(u!==0){this.je(t);let h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}If?.et(function(f,m,w,R,D){var O,k,z,j,U,H;let Y={localCacheCount:f,existenceFilterCount:m.count,databaseId:w.database,projectId:w.projectId},G=m.unchangedNames;return G&&(Y.bloomFilter={applied:D===0,hashCount:(O=G?.hashCount)!==null&&O!==void 0?O:0,bitmapLength:(j=(z=(k=G?.bits)===null||k===void 0?void 0:k.bitmap)===null||z===void 0?void 0:z.length)!==null&&j!==void 0?j:0,padding:(H=(U=G?.bits)===null||U===void 0?void 0:U.padding)!==null&&H!==void 0?H:0,mightContain:I=>{var g;return(g=R?.mightContain(I))!==null&&g!==void 0&&g}}),Y}(o,e.me,this.Le.tt(),c,u))}}}}Ze(e){let t=e.me.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,o,c;try{o=Vt(r).toUint8Array()}catch(u){if(u instanceof Ds)return ni("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new eu(o,i,s)}catch(u){return ni(u instanceof cn?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){let r=this.Le.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){let t=new Map;this.Be.forEach((s,o)=>{let c=this.Je(o);if(c){if(s.current&&xs(c.target)){let u=new V(c.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,Ie.newNoDocument(u,e))}s.be&&(t.set(o,s.Ce()),s.ve())}});let r=$();this.qe.forEach((s,o)=>{let c=!0;o.forEachWhile(u=>{let h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));let i=new di(e,t,this.Qe,this.ke,r);return this.ke=je(),this.qe=Tf(),this.Qe=new se(K),i}$e(e,t){if(!this.ze(e))return;let r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;let i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){let t=this.Ge(e).Ce();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new qs,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new re(K),this.qe=this.qe.insert(e,t)),t}ze(e){let t=this.Je(e)!==null;return t||C("WatchChangeAggregator","Detected inactive target",e),t}Je(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new qs),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}};function Tf(){return new se(V.comparator)}function bf(){return new se(V.comparator)}var eI={asc:"ASCENDING",desc:"DESCENDING"},tI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nI={and:"AND",or:"OR"},nu=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function ru(n,e){return n.useProto3Json||Ao(e)?e:{value:e}}function lr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Fp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function rI(n,e){return lr(n,e.toTimestamp())}function Le(n){return q(!!n),B.fromTimestamp(function(t){let r=pt(t);return new le(r.seconds,r.nanos)}(n))}function Sl(n,e){return iu(n,e).canonicalString()}function iu(n,e){let t=function(i){return new te(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Up(n){let e=te.fromString(n);return q(Wp(e)),e}function Bs(n,e){return Sl(n.databaseId,e.path)}function hn(n,e){let t=Up(e);if(t.get(1)!==n.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new V(jp(t))}function qp(n,e){return Sl(n.databaseId,e)}function Bp(n){let e=Up(n);return e.length===4?te.emptyPath():jp(e)}function su(n){return new te(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function jp(n){return q(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Af(n,e,t){return{name:Bs(n,e),fields:t.value.mapValue.fields}}function iI(n,e,t){let r=hn(n,e.name),i=Le(e.updateTime),s=e.createTime?Le(e.createTime):B.min(),o=new xe({mapValue:{fields:e.fields}}),c=Ie.newFoundDocument(r,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function sI(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(q(f===void 0||typeof f=="string"),ve.fromBase64String(f||"")):(q(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ve.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){let f=h.code===void 0?P.UNKNOWN:Mp(h.code);return new N(f,h.message||"")}(o);t=new Us(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=hn(n,r.document.name),s=Le(r.document.updateTime),o=r.document.createTime?Le(r.document.createTime):B.min(),c=new xe({mapValue:{fields:r.document.fields}}),u=Ie.newFoundDocument(i,s,o,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new er(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=hn(n,r.document),s=r.readTime?Le(r.readTime):B.min(),o=Ie.newNoDocument(i,s),c=r.removedTargetIds||[];t=new er([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=hn(n,r.document),s=r.removedTargetIds||[];t=new er([],s,i,null)}else{if(!("filter"in e))return L();{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,o=new Zc(i,s),c=r.targetId;t=new Fs(c,o)}}return t}function js(n,e){let t;if(e instanceof Bt)t={update:Af(n,e.key,e.value)};else if(e instanceof yn)t={delete:Bs(n,e.key)};else if(e instanceof Ye)t={update:Af(n,e.key,e.data),updateMask:hI(e.fieldMask)};else{if(!(e instanceof Ms))return L();t={verify:Bs(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){let c=o.transform;if(c instanceof gn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ut)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof qt)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof _n)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw L()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:rI(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:L()}(n,e.precondition)),t}function ou(n,e){let t=e.currentDocument?function(s){return s.updateTime!==void 0?Ce.updateTime(Le(s.updateTime)):s.exists!==void 0?Ce.exists(s.exists):Ce.none()}(e.currentDocument):Ce.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let u=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME"),u=new gn;else if("appendMissingElements"in c){let f=c.appendMissingElements.values||[];u=new Ut(f)}else if("removeAllFromArray"in c){let f=c.removeAllFromArray.values||[];u=new qt(f)}else"increment"in c?u=new _n(o,c.increment):L();let h=pe.fromServerFormat(c.fieldPath);return new Jc(h,u)}(n,i)):[];if(e.update){e.update.name;let i=hn(n,e.update.name),s=new xe({mapValue:{fields:e.update.fields}});if(e.updateMask){let o=function(u){let h=u.fieldPaths||[];return new Be(h.map(f=>pe.fromServerFormat(f)))}(e.updateMask);return new Ye(i,s,o,t,r)}return new Bt(i,s,t,r)}if(e.delete){let i=hn(n,e.delete);return new yn(i,t)}if(e.verify){let i=hn(n,e.verify);return new Ms(i,t)}return L()}function oI(n,e){return n&&n.length>0?(q(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?Le(i.updateTime):Le(s);return o.isEqual(B.min())&&(o=Le(s)),new Yc(o,i.transformResults||[])}(t,e))):[]}function zp(n,e){return{documents:[qp(n,e.path)]}}function Gp(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=qp(n,i);let s=function(h){if(h.length!==0)return Hp(ee.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let o=function(h){if(h.length!==0)return h.map(f=>function(w){return{field:Qn(w.field),direction:cI(w.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let c=ru(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:i}}function Kp(n){let e=Bp(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){q(r===1);let f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(m){let w=$p(m);return w instanceof ee&&bl(w)?w.getFilters():[w]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(w=>function(D){return new pn(Jn(D.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(w))}(t.orderBy));let c=null;t.limit&&(c=function(m){let w;return w=typeof m=="object"?m.value:m,Ao(w)?null:w}(t.limit));let u=null;t.startAt&&(u=function(m){let w=!!m.before,R=m.values||[];return new Mt(R,w)}(t.startAt));let h=null;return t.endAt&&(h=function(m){let w=!m.before,R=m.values||[];return new Mt(R,w)}(t.endAt)),vp(e,i,o,s,c,"F",u,h)}function aI(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function $p(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Jn(t.unaryFilter.field);return Q.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=Jn(t.unaryFilter.field);return Q.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=Jn(t.unaryFilter.field);return Q.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let o=Jn(t.unaryFilter.field);return Q.create(o,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(n):n.fieldFilter!==void 0?function(t){return Q.create(Jn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ee.create(t.compositeFilter.filters.map(r=>$p(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return L()}}(t.compositeFilter.op))}(n):L()}function cI(n){return eI[n]}function uI(n){return tI[n]}function lI(n){return nI[n]}function Qn(n){return{fieldPath:n.canonicalString()}}function Jn(n){return pe.fromServerFormat(n.fieldPath)}function Hp(n){return n instanceof Q?function(t){if(t.op==="=="){if(cf(t.value))return{unaryFilter:{field:Qn(t.field),op:"IS_NAN"}};if(af(t.value))return{unaryFilter:{field:Qn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(cf(t.value))return{unaryFilter:{field:Qn(t.field),op:"IS_NOT_NAN"}};if(af(t.value))return{unaryFilter:{field:Qn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Qn(t.field),op:uI(t.op),value:t.value}}}(n):n instanceof ee?function(t){let r=t.getFilters().map(i=>Hp(i));return r.length===1?r[0]:{compositeFilter:{op:lI(t.op),filters:r}}}(n):L()}function hI(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Wp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var hr=class n{constructor(e,t,r,i,s=B.min(),o=B.min(),c=ve.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var zs=class{constructor(e){this.ct=e}};function dI(n,e){let t;if(e.document)t=iI(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){let r=V.fromSegments(e.noDocument.path),i=In(e.noDocument.readTime);t=Ie.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return L();{let r=V.fromSegments(e.unknownDocument.path),i=In(e.unknownDocument.version);t=Ie.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){let s=new le(i[0],i[1]);return B.fromTimestamp(s)}(e.readTime)),t}function Sf(n,e){let t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Gs(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:Bs(s,o.key),fields:o.data.value.mapValue.fields,updateTime:lr(s,o.version.toTimestamp()),createTime:lr(s,o.createTime.toTimestamp())}}(n.ct,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:wn(e.version)};else{if(!e.isUnknownDocument())return L();r.unknownDocument={path:t.path.toArray(),version:wn(e.version)}}return r}function Gs(n){let e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function wn(n){let e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function In(n){let e=new le(n.seconds,n.nanoseconds);return B.fromTimestamp(e)}function sn(n,e){let t=(e.baseMutations||[]).map(s=>ou(n.ct,s));for(let s=0;s<e.mutations.length-1;++s){let o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){let c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}let r=e.mutations.map(s=>ou(n.ct,s)),i=le.fromMillis(e.localWriteTimeMs);return new li(e.batchId,i,t,r)}function Qr(n){let e=In(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?In(n.lastLimboFreeSnapshotVersion):B.min(),r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){return q(s.documents.length===1),ze(So(Bp(s.documents[0])))}(n.query):function(s){return ze(Kp(s))}(n.query),new hr(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,ve.fromBase64String(n.resumeToken))}function Qp(n,e){let t=wn(e.snapshotVersion),r=wn(e.lastLimboFreeSnapshotVersion),i;i=xs(e.target)?zp(n.ct,e.target):Gp(n.ct,e.target)._t;let s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:mn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Jp(n){let e=Kp({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ls(e,e.limit,"L"):e}function yc(n,e){return new hi(e.largestBatchId,ou(n.ct,e.overlayMutation))}function Rf(n,e){let t=e.path.lastSegment();return[n,Ve(e.path.popLast()),t]}function Pf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:wn(r.readTime),documentKey:Ve(r.documentKey.path),largestBatchId:r.largestBatchId}}var au=class{getBundleMetadata(e,t){return Cf(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:In(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return Cf(e).put(function(i){return{bundleId:i.id,createTime:wn(Le(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return kf(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:Jp(s.bundledQuery),readTime:In(s.readTime)}}(r)})}saveNamedQuery(e,t){return kf(e).put(function(i){return{name:i.name,readTime:wn(Le(i.readTime)),bundledQuery:i.bundledQuery}}(t))}};function Cf(n){return _e(n,"bundles")}function kf(n){return _e(n,"namedQueries")}var Ks=class n{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){let r=t.uid||"";return new n(e,r)}getOverlay(e,t){return Gr(e).get(Rf(this.userId,t)).next(r=>r?yc(this.serializer,r):null)}getOverlays(e,t){let r=tt();return A.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){let i=[];return r.forEach((s,o)=>{let c=new hi(t,o);i.push(this.ht(e,c))}),A.waitFor(i)}removeOverlaysForBatchId(e,t,r){let i=new Set;t.forEach(o=>i.add(Ve(o.getCollectionPath())));let s=[];return i.forEach(o=>{let c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Gr(e).j("collectionPathOverlayIndex",c))}),A.waitFor(s)}getOverlaysForCollection(e,t,r){let i=tt(),s=Ve(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Gr(e).U("collectionPathOverlayIndex",o).next(c=>{for(let u of c){let h=yc(this.serializer,u);i.set(h.getKey(),h)}return i})}getOverlaysForCollectionGroup(e,t,r,i){let s=tt(),o,c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Gr(e).J({index:"collectionGroupOverlayIndex",range:c},(u,h,f)=>{let m=yc(this.serializer,h);s.size()<i||m.largestBatchId===o?(s.set(m.getKey(),m),o=m.largestBatchId):f.done()}).next(()=>s)}ht(e,t){return Gr(e).put(function(i,s,o){let[c,u,h]=Rf(s,o.mutation.key);return{userId:s,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:js(i.ct,o.mutation)}}(this.serializer,this.userId,t))}};function Gr(n){return _e(n,"documentOverlays")}var ft=class{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(ce(e.integerValue));else if("doubleValue"in e){let r=ce(e.doubleValue);isNaN(r)?this.Et(t,13):(this.Et(t,15),ii(r)?t.dt(0):t.dt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Et(t,20),typeof r=="string"&&(r=pt(r)),t.At(`${r.seconds||""}`),t.dt(r.nanos||0)}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(Vt(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Et(t,45),t.dt(r.latitude||0),t.dt(r.longitude||0)}else"mapValue"in e?pp(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):L()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let r=e.fields||{};this.Et(t,55);for(let i of Object.keys(r))this.Rt(i,t),this.It(r[i],t)}wt(e,t){let r=e.values||[];this.Et(t,50);for(let i of r)this.It(i,t)}gt(e,t){this.Et(t,37),V.fromName(e).path.forEach(r=>{this.Et(t,60),this.St(r,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}};ft.bt=new ft;function fI(n){if(n===0)return 8;let e=0;return!(n>>4)&&(e+=4,n<<=4),!(n>>6)&&(e+=2,n<<=2),!(n>>7)&&(e+=1),e}function Df(n){let e=64-function(r){let i=0;for(let s=0;s<8;++s){let o=fI(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}var cu=class{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Dt(e){let t=e[Symbol.iterator](),r=t.next();for(;!r.done;)this.Ct(r.value),r=t.next();this.vt()}Ft(e){let t=e[Symbol.iterator](),r=t.next();for(;!r.done;)this.Mt(r.value),r=t.next();this.xt()}Ot(e){for(let t of e){let r=t.charCodeAt(0);if(r<128)this.Ct(r);else if(r<2048)this.Ct(960|r>>>6),this.Ct(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ct(480|r>>>12),this.Ct(128|63&r>>>6),this.Ct(128|63&r);else{let i=t.codePointAt(0);this.Ct(240|i>>>18),this.Ct(128|63&i>>>12),this.Ct(128|63&i>>>6),this.Ct(128|63&i)}}this.vt()}Nt(e){for(let t of e){let r=t.charCodeAt(0);if(r<128)this.Mt(r);else if(r<2048)this.Mt(960|r>>>6),this.Mt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Mt(480|r>>>12),this.Mt(128|63&r>>>6),this.Mt(128|63&r);else{let i=t.codePointAt(0);this.Mt(240|i>>>18),this.Mt(128|63&i>>>12),this.Mt(128|63&i>>>6),this.Mt(128|63&i)}}this.xt()}Lt(e){let t=this.Bt(e),r=Df(t);this.kt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}qt(e){let t=this.Bt(e),r=Df(t);this.kt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}Qt(){this.Kt(255),this.Kt(255)}$t(){this.Ut(255),this.Ut(255)}reset(){this.position=0}seed(e){this.kt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Wt(){return this.buffer.slice(0,this.position)}Bt(e){let t=function(s){let o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Ct(e){let t=255&e;t===0?(this.Kt(0),this.Kt(255)):t===255?(this.Kt(255),this.Kt(0)):this.Kt(t)}Mt(e){let t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(e)}vt(){this.Kt(0),this.Kt(1)}xt(){this.Ut(0),this.Ut(1)}Kt(e){this.kt(1),this.buffer[this.position++]=e}Ut(e){this.kt(1),this.buffer[this.position++]=~e}kt(e){let t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);let i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}},uu=class{constructor(e){this.Gt=e}ft(e){this.Gt.Dt(e)}At(e){this.Gt.Ot(e)}dt(e){this.Gt.Lt(e)}Tt(){this.Gt.Qt()}},lu=class{constructor(e){this.Gt=e}ft(e){this.Gt.Ft(e)}At(e){this.Gt.Nt(e)}dt(e){this.Gt.qt(e)}Tt(){this.Gt.$t()}},on=class{constructor(){this.Gt=new cu,this.zt=new uu(this.Gt),this.jt=new lu(this.Gt)}seed(e){this.Gt.seed(e)}Ht(e){return e===0?this.zt:this.jt}Wt(){return this.Gt.Wt()}reset(){this.Gt.reset()}};var an=class n{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Jt(){let e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new n(this.indexId,this.documentKey,this.arrayValue,r)}};function kt(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=Nf(n.arrayValue,e.arrayValue),t!==0?t:(t=Nf(n.directionalValue,e.directionalValue),t!==0?t:V.comparator(n.documentKey,e.documentKey)))}function Nf(n,e){for(let t=0;t<n.length&&t<e.length;++t){let r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}var $s=class{constructor(e){this.Yt=new re((t,r)=>pe.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.Zt=e.orderBy,this.Xt=[];for(let t of e.filters){let r=t;r.isInequality()?this.Yt=this.Yt.add(r):this.Xt.push(r)}}get en(){return this.Yt.size>1}tn(e){if(q(e.collectionGroup===this.collectionId),this.en)return!1;let t=Dc(e);if(t!==void 0&&!this.nn(t))return!1;let r=nn(e),i=new Set,s=0,o=0;for(;s<r.length&&this.nn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Yt.size>0){let c=this.Yt.getIterator().getNext();if(!i.has(c.field.canonicalString())){let u=r[s];if(!this.rn(c,u)||!this.sn(this.Zt[o++],u))return!1}++s}for(;s<r.length;++s){let c=r[s];if(o>=this.Zt.length||!this.sn(this.Zt[o++],c))return!1}return!0}on(){if(this.en)return null;let e=new re(pe.comparator),t=[];for(let r of this.Xt)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Zn(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Zn(r.field,0))}for(let r of this.Zt)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Zn(r.field,r.dir==="asc"?0:1)));return new rr(rr.UNKNOWN_ID,this.collectionId,t,ri.empty())}nn(e){for(let t of this.Xt)if(this.rn(t,e))return!0;return!1}rn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;let r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}sn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}};function Yp(n){var e,t;if(q(n instanceof Q||n instanceof ee),n instanceof Q){if(n instanceof Os){let i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>Q.create(n.field,"==",s)))||[];return ee.create(i,"or")}return n}let r=n.filters.map(i=>Yp(i));return ee.create(r,n.op)}function pI(n){if(n.getFilters().length===0)return[];let e=fu(Yp(n));return q(Xp(e)),hu(e)||du(e)?[e]:e.getFilters()}function hu(n){return n instanceof Q}function du(n){return n instanceof ee&&bl(n)}function Xp(n){return hu(n)||du(n)||function(t){if(t instanceof ee&&Uc(t)){for(let r of t.getFilters())if(!hu(r)&&!du(r))return!1;return!0}return!1}(n)}function fu(n){if(q(n instanceof Q||n instanceof ee),n instanceof Q)return n;if(n.filters.length===1)return fu(n.filters[0]);let e=n.filters.map(r=>fu(r)),t=ee.create(e,n.op);return t=Hs(t),Xp(t)?t:(q(t instanceof ee),q(ar(t)),q(t.filters.length>1),t.filters.reduce((r,i)=>Rl(r,i)))}function Rl(n,e){let t;return q(n instanceof Q||n instanceof ee),q(e instanceof Q||e instanceof ee),t=n instanceof Q?e instanceof Q?function(i,s){return ee.create([i,s],"and")}(n,e):Of(n,e):e instanceof Q?Of(e,n):function(i,s){if(q(i.filters.length>0&&s.filters.length>0),ar(i)&&ar(s))return yp(i,s.getFilters());let o=Uc(i)?i:s,c=Uc(i)?s:i,u=o.filters.map(h=>Rl(h,c));return ee.create(u,"or")}(n,e),Hs(t)}function Of(n,e){if(ar(e))return yp(e,n.getFilters());{let t=e.filters.map(r=>Rl(n,r));return ee.create(t,"or")}}function Hs(n){if(q(n instanceof Q||n instanceof ee),n instanceof Q)return n;let e=n.getFilters();if(e.length===1)return Hs(e[0]);if(gp(n))return n;let t=e.map(i=>Hs(i)),r=[];return t.forEach(i=>{i instanceof Q?r.push(i):i instanceof ee&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ee.create(r,n.op)}var pu=class{constructor(){this._n=new pi}addToCollectionParentIndex(e,t){return this._n.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this._n.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(Ke.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(Ke.min())}updateCollectionGroup(e,t,r){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}},pi=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new re(te.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new re(te.comparator)).toArray()}};var _s=new Uint8Array(0),mu=class{constructor(e,t){this.databaseId=t,this.an=new pi,this.un=new it(r=>mn(r),(r,i)=>Si(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.an.has(t)){let r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.an.add(t)});let s={collectionId:r,parent:Ve(i)};return xf(e).put(s)}return A.resolve()}getCollectionParents(e,t){let r=[],i=IDBKeyRange.bound([t,""],[np(t),""],!1,!0);return xf(e).U(i).next(s=>{for(let o of s){if(o.collectionId!==t)break;r.push(et(o.parent))}return r})}addFieldIndex(e,t){let r=Kr(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;let s=r.add(i);if(t.indexState){let o=Kn(e);return s.next(c=>{o.put(Pf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){let r=Kr(e),i=Kn(e),s=Gn(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){let t=Kr(e),r=Gn(e),i=Kn(e);return t.j().next(()=>r.j()).next(()=>i.j())}createTargetIndexes(e,t){return A.forEach(this.cn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){let s=new $s(r).on();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){let r=Gn(e),i=!0,s=new Map;return A.forEach(this.cn(t),o=>this.ln(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=$(),c=[];return A.forEach(s,(u,h)=>{C("IndexedDbIndexManager",`Using index ${function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map(H=>`${H.fieldPath}:${H.kind}`).join(",")}`}(u)} to execute ${mn(t)}`);let f=function(U,H){let Y=Dc(H);if(Y===void 0)return null;for(let G of Vs(U,Y.fieldPath))switch(G.op){case"array-contains-any":return G.value.arrayValue.values||[];case"array-contains":return[G.value]}return null}(h,u),m=function(U,H){let Y=new Map;for(let G of nn(H))for(let I of Vs(U,G.fieldPath))switch(I.op){case"==":case"in":Y.set(G.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return Y.set(G.fieldPath.canonicalString(),I.value),Array.from(Y.values())}return null}(h,u),w=function(U,H){let Y=[],G=!0;for(let I of nn(H)){let g=I.kind===0?ff(U,I.fieldPath,U.startAt):pf(U,I.fieldPath,U.startAt);Y.push(g.value),G&&(G=g.inclusive)}return new Mt(Y,G)}(h,u),R=function(U,H){let Y=[],G=!0;for(let I of nn(H)){let g=I.kind===0?pf(U,I.fieldPath,U.endAt):ff(U,I.fieldPath,U.endAt);Y.push(g.value),G&&(G=g.inclusive)}return new Mt(Y,G)}(h,u),D=this.hn(u,h,w),O=this.hn(u,h,R),k=this.Pn(u,h,m),z=this.In(u.indexId,f,D,w.inclusive,O,R.inclusive,k);return A.forEach(z,j=>r.G(j,t.limit).next(U=>{U.forEach(H=>{let Y=V.fromSegments(H.documentKey);o.has(Y)||(o=o.add(Y),c.push(Y))})}))}).next(()=>c)}return A.resolve(null)})}cn(e){let t=this.un.get(e);return t||(e.filters.length===0?t=[e]:t=pI(ee.create(e.filters,"and")).map(r=>Wc(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.un.set(e,t),t)}In(e,t,r,i,s,o,c){let u=(t!=null?t.length:1)*Math.max(r.length,s.length),h=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){let w=t?this.Tn(t[m/h]):_s,R=this.En(e,w,r[m%h],i),D=this.dn(e,w,s[m%h],o),O=c.map(k=>this.En(e,w,k,!0));f.push(...this.createRange(R,D,O))}return f}En(e,t,r,i){let s=new an(e,V.empty(),t,r);return i?s:s.Jt()}dn(e,t,r,i){let s=new an(e,V.empty(),t,r);return i?s.Jt():s}ln(e,t){let r=new $s(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(let c of s)r.tn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2,i=this.cn(t);return A.forEach(i,s=>this.ln(e,s).next(o=>{o?r!==0&&o.fields.length<function(u){let h=new re(pe.comparator),f=!1;for(let m of u.filters)for(let w of m.getFlattenedFilters())w.field.isKeyField()||(w.op==="array-contains"||w.op==="array-contains-any"?f=!0:h=h.add(w.field));for(let m of u.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}An(e,t){let r=new on;for(let i of nn(e)){let s=t.data.field(i.fieldPath);if(s==null)return null;let o=r.Ht(i.kind);ft.bt.Pt(s,o)}return r.Wt()}Tn(e){let t=new on;return ft.bt.Pt(e,t.Ht(0)),t.Wt()}Rn(e,t){let r=new on;return ft.bt.Pt(ci(this.databaseId,t),r.Ht(function(s){let o=nn(s);return o.length===0?0:o[o.length-1].kind}(e))),r.Wt()}Pn(e,t,r){if(r===null)return[];let i=[];i.push(new on);let s=0;for(let o of nn(e)){let c=r[s++];for(let u of i)if(this.Vn(t,o.fieldPath)&&ui(c))i=this.mn(i,o,c);else{let h=u.Ht(o.kind);ft.bt.Pt(c,h)}}return this.fn(i)}hn(e,t,r){return this.Pn(e,t,r.position)}fn(e){let t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Wt();return t}mn(e,t,r){let i=[...e],s=[];for(let o of r.arrayValue.values||[])for(let c of i){let u=new on;u.seed(c.Wt()),ft.bt.Pt(o,u.Ht(t.kind)),s.push(u)}return s}Vn(e,t){return!!e.filters.find(r=>r instanceof Q&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){let r=Kr(e),i=Kn(e);return(t?r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.U()).next(s=>{let o=[];return A.forEach(s,c=>i.get([c.indexId,this.uid]).next(u=>{o.push(function(f,m){let w=m?new ri(m.sequenceNumber,new Ke(In(m.readTime),new V(et(m.documentKey)),m.largestBatchId)):ri.empty(),R=f.fields.map(([D,O])=>new Zn(pe.fromServerFormat(D),O));return new rr(f.indexId,f.collectionGroup,R,w)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{let s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:K(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){let i=Kr(e),s=Kn(e);return this.gn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(c=>A.forEach(c,u=>s.put(Pf(u.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){let r=new Map;return A.forEach(t,(i,s)=>{let o=r.get(i.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(r.set(i.collectionGroup,c),A.forEach(c,u=>this.pn(e,i,u).next(h=>{let f=this.yn(s,u);return h.isEqual(f)?A.resolve():this.wn(e,s,u,h,f)}))))})}Sn(e,t,r,i){return Gn(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.Rn(r,t.key),documentKey:t.key.path.toArray()})}bn(e,t,r,i){return Gn(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.Rn(r,t.key),t.key.path.toArray()])}pn(e,t,r){let i=Gn(e),s=new re(kt);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.Rn(r,t)])},(o,c)=>{s=s.add(new an(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}yn(e,t){let r=new re(kt),i=this.An(t,e);if(i==null)return r;let s=Dc(t);if(s!=null){let o=e.data.field(s.fieldPath);if(ui(o))for(let c of o.arrayValue.values||[])r=r.add(new an(t.indexId,e.key,this.Tn(c),i))}else r=r.add(new an(t.indexId,e.key,_s,i));return r}wn(e,t,r,i,s){C("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);let o=[];return function(u,h,f,m,w){let R=u.getIterator(),D=h.getIterator(),O=zn(R),k=zn(D);for(;O||k;){let z=!1,j=!1;if(O&&k){let U=f(O,k);U<0?j=!0:U>0&&(z=!0)}else O!=null?j=!0:z=!0;z?(m(k),k=zn(D)):j?(w(O),O=zn(R)):(O=zn(R),k=zn(D))}}(i,s,kt,c=>{o.push(this.Sn(e,t,r,c))},c=>{o.push(this.bn(e,t,r,c))}),A.waitFor(o)}gn(e){let t=1;return Kn(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>kt(o,c)).filter((o,c,u)=>!c||kt(o,u[c-1])!==0);let i=[];i.push(e);for(let o of r){let c=kt(o,e),u=kt(o,t);if(c===0)i[0]=e.Jt();else if(c>0&&u<0)i.push(o),i.push(o.Jt());else if(u>0)break}i.push(t);let s=[];for(let o=0;o<i.length;o+=2){if(this.Dn(i[o],i[o+1]))return[];let c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,_s,[]],u=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,_s,[]];s.push(IDBKeyRange.bound(c,u))}return s}Dn(e,t){return kt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Vf)}getMinOffset(e,t){return A.mapArray(this.cn(t),r=>this.ln(e,r).next(i=>i||L())).next(Vf)}};function xf(n){return _e(n,"collectionParents")}function Gn(n){return _e(n,"indexEntries")}function Kr(n){return _e(n,"indexConfiguration")}function Kn(n){return _e(n,"indexState")}function Vf(n){q(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){let i=n[r].indexState.offset;Il(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new Ke(e.readTime,e.documentKey,t)}var Lf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ge=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};function Zp(n,e,t){let r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId),c=0,u=r.J({range:o},(f,m,w)=>(c++,w.delete()));s.push(u.next(()=>{q(c===1)}));let h=[];for(let f of t.mutations){let m=cp(e,f.key.path,t.batchId);s.push(i.delete(m)),h.push(f.key)}return A.waitFor(s).next(()=>h)}function Ws(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw L();e=n.noDocument}return JSON.stringify(e).length}Ge.DEFAULT_COLLECTION_PERCENTILE=10,Ge.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ge.DEFAULT=new Ge(41943040,Ge.DEFAULT_COLLECTION_PERCENTILE,Ge.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ge.DISABLED=new Ge(-1,0,0);var Qs=class n{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Cn={}}static lt(e,t,r,i){q(e.uid!=="");let s=e.isAuthenticated()?e.uid:"";return new n(s,t,r,i)}checkEmpty(e){let t=!0,r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Dt(e).J({index:"userMutationsIndex",range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){let s=Yn(e),o=Dt(e);return o.add({}).next(c=>{q(typeof c=="number");let u=new li(c,t,r,i),h=function(R,D,O){let k=O.baseMutations.map(j=>js(R.ct,j)),z=O.mutations.map(j=>js(R.ct,j));return{userId:D,batchId:O.batchId,localWriteTimeMs:O.localWriteTime.toMillis(),baseMutations:k,mutations:z}}(this.serializer,this.userId,u),f=[],m=new re((w,R)=>K(w.canonicalString(),R.canonicalString()));for(let w of i){let R=cp(this.userId,w.key.path,c);m=m.add(w.key.path.popLast()),f.push(o.put(h)),f.push(s.put(R,yw))}return m.forEach(w=>{f.push(this.indexManager.addToCollectionParentIndex(e,w))}),e.addOnCommittedListener(()=>{this.Cn[c]=u.keys()}),A.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return Dt(e).get(t).next(r=>r?(q(r.userId===this.userId),sn(this.serializer,r)):null)}vn(e,t){return this.Cn[t]?A.resolve(this.Cn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){let i=r.keys();return this.Cn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]),s=null;return Dt(e).J({index:"userMutationsIndex",range:i},(o,c,u)=>{c.userId===this.userId&&(q(c.batchId>=r),s=sn(this.serializer,c)),u.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),r=-1;return Dt(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Dt(e).U("userMutationsIndex",t).next(r=>r.map(i=>sn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){let r=vs(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Yn(e).J({range:i},(o,c,u)=>{let[h,f,m]=o,w=et(f);if(h===this.userId&&t.path.isEqual(w))return Dt(e).get(m).next(R=>{if(!R)throw L();q(R.userId===this.userId),s.push(sn(this.serializer,R))});u.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new re(K),i=[];return t.forEach(s=>{let o=vs(this.userId,s.path),c=IDBKeyRange.lowerBound(o),u=Yn(e).J({range:c},(h,f,m)=>{let[w,R,D]=h,O=et(R);w===this.userId&&s.path.isEqual(O)?r=r.add(D):m.done()});i.push(u)}),A.waitFor(i).next(()=>this.Fn(e,r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=vs(this.userId,r),o=IDBKeyRange.lowerBound(s),c=new re(K);return Yn(e).J({range:o},(u,h,f)=>{let[m,w,R]=u,D=et(w);m===this.userId&&r.isPrefixOf(D)?D.length===i&&(c=c.add(R)):f.done()}).next(()=>this.Fn(e,c))}Fn(e,t){let r=[],i=[];return t.forEach(s=>{i.push(Dt(e).get(s).next(o=>{if(o===null)throw L();q(o.userId===this.userId),r.push(sn(this.serializer,o))}))}),A.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return Zp(e._e,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.Mn(t.batchId)}),A.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}Mn(e){delete this.Cn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return A.resolve();let r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Yn(e).J({range:r},(s,o,c)=>{if(s[0]===this.userId){let u=et(s[1]);i.push(u)}else c.done()}).next(()=>{q(i.length===0)})})}containsKey(e,t){return em(e,this.userId,t)}xn(e){return tm(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}};function em(n,e,t){let r=vs(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r),o=!1;return Yn(n).J({range:s,H:!0},(c,u,h)=>{let[f,m,w]=c;f===e&&m===i&&(o=!0),h.done()}).next(()=>o)}function Dt(n){return _e(n,"mutations")}function Yn(n){return _e(n,"documentMutations")}function tm(n){return _e(n,"mutationQueues")}var dr=class n{constructor(e){this.On=e}next(){return this.On+=2,this.On}static Nn(){return new n(0)}static Ln(){return new n(-1)}};var gu=class{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Bn(e).next(t=>{let r=new dr(t.highestTargetId);return t.highestTargetId=r.next(),this.kn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Bn(e).next(t=>B.fromTimestamp(new le(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Bn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Bn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.kn(e,i)))}addTargetData(e,t){return this.qn(e,t).next(()=>this.Bn(e).next(r=>(r.targetCount+=1,this.Qn(t,r),this.kn(e,r))))}updateTargetData(e,t){return this.qn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>$n(e).delete(t.targetId)).next(()=>this.Bn(e)).next(r=>(q(r.targetCount>0),r.targetCount-=1,this.kn(e,r)))}removeTargets(e,t,r){let i=0,s=[];return $n(e).J((o,c)=>{let u=Qr(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))}).next(()=>A.waitFor(s)).next(()=>i)}forEachTarget(e,t){return $n(e).J((r,i)=>{let s=Qr(i);t(s)})}Bn(e){return Mf(e).get("targetGlobalKey").next(t=>(q(t!==null),t))}kn(e,t){return Mf(e).put("targetGlobalKey",t)}qn(e,t){return $n(e).put(Qp(this.serializer,t))}Qn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Bn(e).next(t=>t.targetCount)}getTargetData(e,t){let r=mn(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]),s=null;return $n(e).J({range:i,index:"queryTargetsIndex"},(o,c,u)=>{let h=Qr(c);Si(t,h.target)&&(s=h,u.done())}).next(()=>s)}addMatchingKeys(e,t,r){let i=[],s=Nt(e);return t.forEach(o=>{let c=Ve(o.path);i.push(s.put({targetId:r,path:c})),i.push(this.referenceDelegate.addReference(e,r,o))}),A.waitFor(i)}removeMatchingKeys(e,t,r){let i=Nt(e);return A.forEach(t,s=>{let o=Ve(s.path);return A.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){let r=Nt(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){let r=IDBKeyRange.bound([t],[t+1],!1,!0),i=Nt(e),s=$();return i.J({range:r,H:!0},(o,c,u)=>{let h=et(o[1]),f=new V(h);s=s.add(f)}).next(()=>s)}containsKey(e,t){let r=Ve(t.path),i=IDBKeyRange.bound([r],[np(r)],!1,!0),s=0;return Nt(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,c],u,h)=>{o!==0&&(s++,h.done())}).next(()=>s>0)}ot(e,t){return $n(e).get(t).next(r=>r?Qr(r):null)}};function $n(n){return _e(n,"targets")}function Mf(n){return _e(n,"targetGlobal")}function Nt(n){return _e(n,"targetDocuments")}function Ff([n,e],[t,r]){let i=K(n,t);return i===0?K(e,r):i}var _u=class{constructor(e){this.Kn=e,this.buffer=new re(Ff),this.$n=0}Un(){return++this.$n}Wn(e){let t=[e,this.Un()];if(this.buffer.size<this.Kn)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();Ff(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},yu=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Gn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.zn(6e4)}stop(){this.Gn&&(this.Gn.cancel(),this.Gn=null)}get started(){return this.Gn!==null}zn(e){C("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Gn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Gn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Gt(t)?C("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await zt(t)}await this.zn(3e5)})}},wu=class{constructor(e,t){this.jn=e,this.params=t}calculateTargetCount(e,t){return this.jn.Hn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Pe.oe);let r=new _u(t);return this.jn.forEachTarget(e,i=>r.Wn(i.sequenceNumber)).next(()=>this.jn.Jn(e,i=>r.Wn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Lf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Lf):this.Yn(e,t))}getCacheSize(e){return this.jn.getCacheSize(e)}Yn(e,t){let r,i,s,o,c,u,h,f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(s=m,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(h=Date.now(),Hn()<=W.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}};function mI(n,e){return new wu(n,e)}var Iu=class{constructor(e,t){this.db=e,this.garbageCollector=mI(this,t)}Hn(e){let t=this.Zn(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}Zn(e){let t=0;return this.Jn(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Jn(e,t){return this.Xn(e,(r,i)=>t(i))}addReference(e,t,r){return ys(e,r)}removeReference(e,t,r){return ys(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return ys(e,t)}er(e,t){return function(i,s){let o=!1;return tm(i).Y(c=>em(i,c,s).next(u=>(u&&(o=!0),A.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){let r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[],s=0;return this.Xn(e,(o,c)=>{if(c<=t){let u=this.er(e,o).next(h=>{if(!h)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,B.min()),Nt(e).delete(function(m){return[0,Ve(m.path)]}(o))))});i.push(u)}}).next(()=>A.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return ys(e,t)}Xn(e,t){let r=Nt(e),i,s=Pe.oe;return r.J({index:"documentTargetsIndex"},([o,c],{path:u,sequenceNumber:h})=>{o===0?(s!==Pe.oe&&t(new V(et(i)),s),s=h,i=u):s=Pe.oe}).next(()=>{s!==Pe.oe&&t(new V(et(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}};function ys(n,e){return Nt(n).put(function(r,i){return{targetId:0,path:Ve(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}var Js=class{constructor(){this.changes=new it(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ie.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?A.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var vu=class{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return tn(e).put(r)}removeEntry(e,t,r){return tn(e).delete(function(s,o){let c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Gs(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.tr(e,r)))}getEntry(e,t){let r=Ie.newInvalidDocument(t);return tn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only($r(t))},(i,s)=>{r=this.nr(t,s)}).next(()=>r)}rr(e,t){let r={size:0,document:Ie.newInvalidDocument(t)};return tn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only($r(t))},(i,s)=>{r={document:this.nr(t,s),size:Ws(s)}}).next(()=>r)}getEntries(e,t){let r=je();return this.ir(e,t,(i,s)=>{let o=this.nr(i,s);r=r.insert(i,o)}).next(()=>r)}sr(e,t){let r=je(),i=new se(V.comparator);return this.ir(e,t,(s,o)=>{let c=this.nr(s,o);r=r.insert(s,c),i=i.insert(s,Ws(o))}).next(()=>({documents:r,_r:i}))}ir(e,t,r){if(t.isEmpty())return A.resolve();let i=new re(Bf);t.forEach(u=>i=i.add(u));let s=IDBKeyRange.bound($r(i.first()),$r(i.last())),o=i.getIterator(),c=o.getNext();return tn(e).J({index:"documentKeyIndex",range:s},(u,h,f)=>{let m=V.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&Bf(c,m)<0;)r(c,null),c=o.getNext();c&&c.isEqual(m)&&(r(c,h),c=o.hasNext()?o.getNext():null),c?f.$($r(c)):f.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){let o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Gs(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return tn(e).U(IDBKeyRange.bound(c,u,!0)).next(h=>{s?.incrementDocumentReadCount(h.length);let f=je();for(let m of h){let w=this.nr(V.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);w.isFoundDocument()&&(Ri(t,w)||i.has(w.key))&&(f=f.insert(w.key,w))}return f})}getAllFromCollectionGroup(e,t,r,i){let s=je(),o=qf(t,r),c=qf(t,Ke.max());return tn(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,c,!0)},(u,h,f)=>{let m=this.nr(V.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);s=s.insert(m.key,m),s.size===i&&f.done()}).next(()=>s)}newChangeBuffer(e){return new Eu(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Uf(e).get("remoteDocumentGlobalKey").next(t=>(q(!!t),t))}tr(e,t){return Uf(e).put("remoteDocumentGlobalKey",t)}nr(e,t){if(t){let r=dI(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(B.min())))return r}return Ie.newInvalidDocument(e)}};function nm(n){return new vu(n)}var Eu=class extends Js{constructor(e,t){super(),this.ar=e,this.trackRemovals=t,this.ur=new it(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){let t=[],r=0,i=new re((s,o)=>K(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{let c=this.ur.get(s);if(t.push(this.ar.removeEntry(e,s,c.readTime)),o.isValidDocument()){let u=Sf(this.ar.serializer,o);i=i.add(s.path.popLast());let h=Ws(u);r+=h-c.size,t.push(this.ar.addEntry(e,s,u))}else if(r-=c.size,this.trackRemovals){let u=Sf(this.ar.serializer,o.convertToNoDocument(B.min()));t.push(this.ar.addEntry(e,s,u))}}),i.forEach(s=>{t.push(this.ar.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.ar.updateMetadata(e,r)),A.waitFor(t)}getFromCache(e,t){return this.ar.rr(e,t).next(r=>(this.ur.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.ar.sr(e,t).next(({documents:r,_r:i})=>(i.forEach((s,o)=>{this.ur.set(s,{size:o,readTime:r.get(s).readTime})}),r))}};function Uf(n){return _e(n,"remoteDocumentGlobal")}function tn(n){return _e(n,"remoteDocumentsV14")}function $r(n){let e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function qf(n,e){let t=e.documentKey.path.toArray();return[n,Gs(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Bf(n,e){let t=n.path.toArray(),r=e.path.toArray(),i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=K(t[s],r[s]),i)return i;return i=K(t.length,r.length),i||(i=K(t[t.length-2],r[r.length-2]),i||K(t[t.length-1],r[r.length-1]))}var Tu=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var Ys=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Zr(r.mutation,i,Be.empty(),le.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,$()).next(()=>r))}getLocalViewOfDocuments(e,t,r=$()){let i=tt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=Wr();return s.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){let r=tt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,$()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=je(),o=Xr(),c=function(){return Xr()}();return t.forEach((u,h)=>{let f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof Ye)?s=s.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Zr(f.mutation,h,f.mutation.getFieldMask(),le.now())):o.set(h.key,Be.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var m;return c.set(h,new Tu(f,(m=o.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){let r=Xr(),i=new se((o,c)=>o-c),s=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(let c of o)c.keys().forEach(u=>{let h=t.get(u);if(h===null)return;let f=r.get(u)||Be.empty();f=c.applyToLocalView(h,f),r.set(u,f);let m=(i.get(c.batchId)||$()).add(u);i=i.insert(c.batchId,m)})}).next(()=>{let o=[],c=i.getReverseIterator();for(;c.hasNext();){let u=c.getNext(),h=u.key,f=u.value,m=Pp();f.forEach(w=>{if(!s.has(w)){let R=Vp(t.get(w),r.get(w));R!==null&&m.set(w,R),s=s.add(w)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return A.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return V.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ep(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):A.resolve(tt()),c=-1,u=s;return o.next(h=>A.forEach(h,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next(w=>{u=u.insert(f,w)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,$())).next(f=>({batchId:c,changes:Rp(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new V(t)).next(r=>{let i=Wr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,o=Wr();return this.indexManager.getCollectionParents(e,s).next(c=>A.forEach(c,u=>{let h=function(m,w){return new Ft(w,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((m,w)=>{o=o.insert(m,w)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((u,h)=>{let f=h.getKey();o.get(f)===null&&(o=o.insert(f,Ie.newInvalidDocument(f)))});let c=Wr();return o.forEach((u,h)=>{let f=s.get(u);f!==void 0&&Zr(f.mutation,h,Be.empty(),le.now()),Ri(t,h)&&(c=c.insert(u,h))}),c})}};var bu=class{constructor(e){this.serializer=e,this.cr=new Map,this.lr=new Map}getBundleMetadata(e,t){return A.resolve(this.cr.get(t))}saveBundleMetadata(e,t){return this.cr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Le(i.createTime)}}(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.lr.get(t))}saveNamedQuery(e,t){return this.lr.set(t.name,function(i){return{name:i.name,query:Jp(i.bundledQuery),readTime:Le(i.readTime)}}(t)),A.resolve()}};var Au=class{constructor(){this.overlays=new se(V.comparator),this.hr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){let r=tt();return A.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),A.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.hr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.hr.delete(r)),A.resolve()}getOverlaysForCollection(e,t,r){let i=tt(),s=t.length+1,o=new V(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){let u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return A.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new se((h,f)=>h-f),o=this.overlays.getIterator();for(;o.hasNext();){let h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=tt(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}let c=tt(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=i)););return A.resolve(c)}ht(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let o=this.hr.get(i.largestBatchId).delete(r.key);this.hr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new hi(t,r));let s=this.hr.get(t);s===void 0&&(s=$(),this.hr.set(t,s)),this.hr.set(t,s.add(r.key))}};var mi=class{constructor(){this.Pr=new re(de.Ir),this.Tr=new re(de.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(e,t){let r=new de(e,t);this.Pr=this.Pr.add(r),this.Tr=this.Tr.add(r)}dr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ar(new de(e,t))}Rr(e,t){e.forEach(r=>this.removeReference(r,t))}Vr(e){let t=new V(new te([])),r=new de(t,e),i=new de(t,e+1),s=[];return this.Tr.forEachInRange([r,i],o=>{this.Ar(o),s.push(o.key)}),s}mr(){this.Pr.forEach(e=>this.Ar(e))}Ar(e){this.Pr=this.Pr.delete(e),this.Tr=this.Tr.delete(e)}gr(e){let t=new V(new te([])),r=new de(t,e),i=new de(t,e+1),s=$();return this.Tr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){let t=new de(e,0),r=this.Pr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},de=class{constructor(e,t){this.key=e,this.pr=t}static Ir(e,t){return V.comparator(e.key,t.key)||K(e.pr,t.pr)}static Er(e,t){return K(e.pr,t.pr)||V.comparator(e.key,t.key)}};var Su=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.yr=1,this.wr=new re(de.Ir)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let o=new li(s,t,r,i);this.mutationQueue.push(o);for(let c of i)this.wr=this.wr.add(new de(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Sr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.br(r),s=i<0?0:i;return A.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?-1:this.yr-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new de(t,0),i=new de(t,Number.POSITIVE_INFINITY),s=[];return this.wr.forEachInRange([r,i],o=>{let c=this.Sr(o.pr);s.push(c)}),A.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new re(K);return t.forEach(i=>{let s=new de(i,0),o=new de(i,Number.POSITIVE_INFINITY);this.wr.forEachInRange([s,o],c=>{r=r.add(c.pr)})}),A.resolve(this.Dr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;V.isDocumentKey(s)||(s=s.child(""));let o=new de(new V(s),0),c=new re(K);return this.wr.forEachWhile(u=>{let h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(c=c.add(u.pr)),!0)},o),A.resolve(this.Dr(c))}Dr(e){let t=[];return e.forEach(r=>{let i=this.Sr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){q(this.Cr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.wr;return A.forEach(t.mutations,i=>{let s=new de(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.wr=r})}Mn(e){}containsKey(e,t){let r=new de(t,0),i=this.wr.firstAfterOrEqual(r);return A.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}Cr(e,t){return this.br(e)}br(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Sr(e){let t=this.br(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Ru=class{constructor(e){this.vr=e,this.docs=function(){return new se(V.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.vr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return A.resolve(r?r.document.mutableCopy():Ie.newInvalidDocument(t))}getEntries(e,t){let r=je();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ie.newInvalidDocument(i))}),A.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=je(),o=t.path,c=new V(o.child("")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){let{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Il(ip(f),r)<=0||(i.has(f.key)||Ri(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return A.resolve(s)}getAllFromCollectionGroup(e,t,r,i){L()}Fr(e,t){return A.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Pu(this)}getSize(e){return A.resolve(this.size)}},Pu=class extends Js{constructor(e){super(),this.ar=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.ar.addEntry(e,i)):this.ar.removeEntry(r)}),A.waitFor(t)}getFromCache(e,t){return this.ar.getEntry(e,t)}getAllFromCache(e,t){return this.ar.getEntries(e,t)}};var Cu=class{constructor(e){this.persistence=e,this.Mr=new it(t=>mn(t),Si),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.Or=0,this.Nr=new mi,this.targetCount=0,this.Lr=dr.Nn()}forEachTarget(e,t){return this.Mr.forEach((r,i)=>t(i)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.Or)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Or&&(this.Or=t),A.resolve()}qn(e){this.Mr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Lr=new dr(t),this.highestTargetId=t),e.sequenceNumber>this.Or&&(this.Or=e.sequenceNumber)}addTargetData(e,t){return this.qn(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.qn(t),A.resolve()}removeTargetData(e,t){return this.Mr.delete(t.target),this.Nr.Vr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.Mr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Mr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),A.waitFor(s).next(()=>i)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){let r=this.Mr.get(t)||null;return A.resolve(r)}addMatchingKeys(e,t,r){return this.Nr.dr(t,r),A.resolve()}removeMatchingKeys(e,t,r){this.Nr.Rr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),A.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Nr.Vr(t),A.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Nr.gr(t);return A.resolve(r)}containsKey(e,t){return A.resolve(this.Nr.containsKey(t))}};var Xs=class{constructor(e,t){this.Br={},this.overlays={},this.kr=new Pe(0),this.qr=!1,this.qr=!0,this.referenceDelegate=e(this),this.Qr=new Cu(this),this.indexManager=new pu,this.remoteDocumentCache=function(i){return new Ru(i)}(r=>this.referenceDelegate.Kr(r)),this.serializer=new zs(t),this.$r=new bu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Au,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Br[e.toKey()];return r||(r=new Su(t,this.referenceDelegate),this.Br[e.toKey()]=r),r}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(e,t,r){C("MemoryPersistence","Starting transaction:",e);let i=new ku(this.kr.next());return this.referenceDelegate.Ur(),r(i).next(s=>this.referenceDelegate.Wr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Gr(e,t){return A.or(Object.values(this.Br).map(r=>()=>r.containsKey(e,t)))}},ku=class extends Ps{constructor(e){super(),this.currentSequenceNumber=e}},Zs=class n{constructor(e){this.persistence=e,this.zr=new mi,this.jr=null}static Hr(e){return new n(e)}get Jr(){if(this.jr)return this.jr;throw L()}addReference(e,t,r){return this.zr.addReference(r,t),this.Jr.delete(r.toString()),A.resolve()}removeReference(e,t,r){return this.zr.removeReference(r,t),this.Jr.add(r.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.Jr.add(t.toString()),A.resolve()}removeTarget(e,t){this.zr.Vr(t.targetId).forEach(i=>this.Jr.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Jr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ur(){this.jr=new Set}Wr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Jr,r=>{let i=V.fromPath(r);return this.Yr(e,i).next(s=>{s||t.removeEntry(i,B.min())})}).next(()=>(this.jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yr(e,t).next(r=>{r?this.Jr.delete(t.toString()):this.Jr.add(t.toString())})}Kr(e){return 0}Yr(e,t){return A.or([()=>A.resolve(this.zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gr(e,t)])}};var Du=class{constructor(e){this.serializer=e}O(e,t,r,i){let s=new Cs("createOrUpgrade",t);r<1&&i>=1&&(function(u){u.createObjectStore("owner")}(e),function(u){u.createObjectStore("mutationQueues",{keyPath:"userId"}),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",rf,{unique:!0}),u.createObjectStore("documentMutations")}(e),jf(e),function(u){u.createObjectStore("remoteDocuments")}(e));let o=A.resolve();return r<3&&i>=3&&(r!==0&&(function(u){u.deleteObjectStore("targetDocuments"),u.deleteObjectStore("targets"),u.deleteObjectStore("targetGlobal")}(e),jf(e)),o=o.next(()=>function(u){let h=u.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return h.put("targetGlobalKey",f)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(u,h){return h.store("mutations").U().next(f=>{u.deleteObjectStore("mutations"),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",rf,{unique:!0});let m=h.store("mutations"),w=f.map(R=>m.put(R));return A.waitFor(w)})}(e,s))),o=o.next(()=>{(function(u){u.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.Xr(s))),r<6&&i>=6&&(o=o.next(()=>(function(u){u.createObjectStore("remoteDocumentGlobal")}(e),this.ei(s)))),r<7&&i>=7&&(o=o.next(()=>this.ti(s))),r<8&&i>=8&&(o=o.next(()=>this.ni(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.ri(s))),r<11&&i>=11&&(o=o.next(()=>{(function(u){u.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(u){u.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(u){let h=u.createObjectStore("documentOverlays",{keyPath:kw});h.createIndex("collectionPathOverlayIndex",Dw,{unique:!1}),h.createIndex("collectionGroupOverlayIndex",Nw,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(u){let h=u.createObjectStore("remoteDocumentsV14",{keyPath:ww});h.createIndex("documentKeyIndex",Iw),h.createIndex("collectionGroupIndex",vw)}(e)).next(()=>this.ii(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.si(e,s))),r<15&&i>=15&&(o=o.next(()=>function(u){u.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),u.createObjectStore("indexState",{keyPath:Sw}).createIndex("sequenceNumberIndex",Rw,{unique:!1}),u.createObjectStore("indexEntries",{keyPath:Pw}).createIndex("documentKeyIndex",Cw,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),o}ei(e){let t=0;return e.store("remoteDocuments").J((r,i)=>{t+=Ws(i)}).next(()=>{let r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}Xr(e){let t=e.store("mutationQueues"),r=e.store("mutations");return t.U().next(i=>A.forEach(i,s=>{let o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next(c=>A.forEach(c,u=>{q(u.userId===s.userId);let h=sn(this.serializer,u);return Zp(e,s.userId,h).next(()=>{})}))}))}ti(e){let t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{let s=[];return r.J((o,c)=>{let u=new te(o),h=function(m){return[0,Ve(m)]}(u);s.push(t.get(h).next(f=>f?A.resolve():(m=>t.put({targetId:0,path:Ve(m),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>A.waitFor(s))})}ni(e,t){e.createObjectStore("collectionParents",{keyPath:Aw});let r=t.store("collectionParents"),i=new pi,s=o=>{if(i.add(o)){let c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:Ve(u)})}};return t.store("remoteDocuments").J({H:!0},(o,c)=>{let u=new te(o);return s(u.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,c,u],h)=>{let f=et(c);return s(f.popLast())}))}ri(e){let t=e.store("targets");return t.J((r,i)=>{let s=Qr(i),o=Qp(this.serializer,s);return t.put(o)})}ii(e,t){let r=t.store("remoteDocuments"),i=[];return r.J((s,o)=>{let c=t.store("remoteDocumentsV14"),u=function(m){return m.document?new V(te.fromString(m.document.name).popFirst(5)):m.noDocument?V.fromSegments(m.noDocument.path):m.unknownDocument?V.fromSegments(m.unknownDocument.path):L()}(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(h))}).next(()=>A.waitFor(i))}si(e,t){let r=t.store("mutations"),i=nm(this.serializer),s=new Xs(Zs.Hr,this.serializer.ct);return r.U().next(o=>{let c=new Map;return o.forEach(u=>{var h;let f=(h=c.get(u.userId))!==null&&h!==void 0?h:$();sn(this.serializer,u).keys().forEach(m=>f=f.add(m)),c.set(u.userId,f)}),A.forEach(c,(u,h)=>{let f=new ge(h),m=Ks.lt(this.serializer,f),w=s.getIndexManager(f),R=Qs.lt(f,this.serializer,w,s.referenceDelegate);return new Ys(i,R,m,w).recalculateAndSaveOverlaysForDocumentKeys(new si(t,Pe.oe),u).next()})})}};function jf(n){n.createObjectStore("targetDocuments",{keyPath:Tw}).createIndex("documentTargetsIndex",bw,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",Ew,{unique:!0}),n.createObjectStore("targetGlobal")}var wc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Nu=class n{constructor(e,t,r,i,s,o,c,u,h,f,m=16){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.oi=s,this.window=o,this.document=c,this._i=h,this.ai=f,this.ui=m,this.kr=null,this.qr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ci=null,this.inForeground=!1,this.li=null,this.hi=null,this.Pi=Number.NEGATIVE_INFINITY,this.Ii=w=>Promise.resolve(),!n.D())throw new N(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Iu(this,i),this.Ti=t+"main",this.serializer=new zs(u),this.Ei=new ir(this.Ti,this.ui,new Du(this.serializer)),this.Qr=new gu(this.referenceDelegate,this.serializer),this.remoteDocumentCache=nm(this.serializer),this.$r=new au,this.window&&this.window.localStorage?this.di=this.window.localStorage:(this.di=null,f===!1&&ue("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ai().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,wc);return this.Ri(),this.Vi(),this.mi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Qr.getHighestSequenceNumber(e))}).then(e=>{this.kr=new Pe(e,this._i)}).then(()=>{this.qr=!0}).catch(e=>(this.Ei&&this.Ei.close(),Promise.reject(e)))}fi(e){return this.Ii=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ei.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.oi.enqueueAndForget(async()=>{this.started&&await this.Ai()}))}Ai(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>ws(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.gi(e).next(t=>{t||(this.isPrimary=!1,this.oi.enqueueRetryable(()=>this.Ii(!1)))})}).next(()=>this.pi(e)).next(t=>this.isPrimary&&!t?this.yi(e).next(()=>!1):!!t&&this.wi(e).next(()=>!0))).catch(e=>{if(Gt(e))return C("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return C("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.oi.enqueueRetryable(()=>this.Ii(e)),this.isPrimary=e})}gi(e){return Hr(e).get("owner").next(t=>A.resolve(this.Si(t)))}bi(e){return ws(e).delete(this.clientId)}async Di(){if(this.isPrimary&&!this.Ci(this.Pi,18e5)){this.Pi=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{let r=_e(t,"clientMetadata");return r.U().next(i=>{let s=this.vi(i,18e5),o=i.filter(c=>s.indexOf(c)===-1);return A.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.di)for(let t of e)this.di.removeItem(this.Fi(t.clientId))}}mi(){this.hi=this.oi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ai().then(()=>this.Di()).then(()=>this.mi()))}Si(e){return!!e&&e.ownerId===this.clientId}pi(e){return this.ai?A.resolve(!0):Hr(e).get("owner").next(t=>{if(t!==null&&this.Ci(t.leaseTimestampMs,5e3)&&!this.Mi(t.ownerId)){if(this.Si(t)&&this.networkEnabled)return!0;if(!this.Si(t)){if(!t.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,wc);return!1}}return!(!this.networkEnabled||!this.inForeground)||ws(e).U().next(r=>this.vi(r,5e3).find(i=>{if(this.clientId!==i.clientId){let s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&C("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.qr=!1,this.xi(),this.hi&&(this.hi.cancel(),this.hi=null),this.Oi(),this.Ni(),await this.Ei.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{let t=new si(e,Pe.oe);return this.yi(t).next(()=>this.bi(t))}),this.Ei.close(),this.Li()}vi(e,t){return e.filter(r=>this.Ci(r.updateTimeMs,t)&&!this.Mi(r.clientId))}Bi(){return this.runTransaction("getActiveClients","readonly",e=>ws(e).U().next(t=>this.vi(t,18e5).map(r=>r.clientId)))}get started(){return this.qr}getMutationQueue(e,t){return Qs.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new mu(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Ks.lt(this.serializer,e)}getBundleCache(){return this.$r}runTransaction(e,t,r){C("IndexedDbPersistence","Starting transaction:",e);let i=t==="readonly"?"readonly":"readwrite",s=function(u){return u===16?xw:u===15?dp:u===14?hp:u===13?lp:u===12?Ow:u===11?up:void L()}(this.ui),o;return this.Ei.runTransaction(e,i,s,c=>(o=new si(c,this.kr?this.kr.next():Pe.oe),t==="readwrite-primary"?this.gi(o).next(u=>!!u||this.pi(o)).next(u=>{if(!u)throw ue(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.oi.enqueueRetryable(()=>this.Ii(!1)),new N(P.FAILED_PRECONDITION,sp);return r(o)}).next(u=>this.wi(o).next(()=>u)):this.ki(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ki(e){return Hr(e).get("owner").next(t=>{if(t!==null&&this.Ci(t.leaseTimestampMs,5e3)&&!this.Mi(t.ownerId)&&!this.Si(t)&&!(this.ai||this.allowTabSynchronization&&t.allowTabSynchronization))throw new N(P.FAILED_PRECONDITION,wc)})}wi(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Hr(e).put("owner",t)}static D(){return ir.D()}yi(e){let t=Hr(e);return t.get("owner").next(r=>this.Si(r)?(C("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):A.resolve())}Ci(e,t){let r=Date.now();return!(e<r-t)&&(!(e>r)||(ue(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Ri(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.li=()=>{this.oi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ai()))},this.document.addEventListener("visibilitychange",this.li),this.inForeground=this.document.visibilityState==="visible")}Oi(){this.li&&(this.document.removeEventListener("visibilitychange",this.li),this.li=null)}Vi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.ci=()=>{this.xi();let t=/(?:Version|Mobile)\/1[456]/;Ja()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.oi.enterRestrictedMode(!0),this.oi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.ci))}Ni(){this.ci&&(this.window.removeEventListener("pagehide",this.ci),this.ci=null)}Mi(e){var t;try{let r=((t=this.di)===null||t===void 0?void 0:t.getItem(this.Fi(e)))!==null;return C("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return ue("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}xi(){if(this.di)try{this.di.setItem(this.Fi(this.clientId),String(Date.now()))}catch(e){ue("Failed to set zombie client id.",e)}}Li(){if(this.di)try{this.di.removeItem(this.Fi(this.clientId))}catch{}}Fi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}};function Hr(n){return _e(n,"owner")}function ws(n){return _e(n,"clientMetadata")}function rm(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}var Ou=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.qi=r,this.Qi=i}static Ki(e,t){let r=$(),i=$();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var xu=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var eo=class{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=function(){return Ja()?8:op(ae())>0?6:4}()}initialize(e,t){this.zi=e,this.indexManager=t,this.$i=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ji(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Hi(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;let o=new xu;return this.Ji(e,t,o).next(c=>{if(s.result=c,this.Ui)return this.Yi(e,t,o,c.size)})}).next(()=>s.result)}Yi(e,t,r,i){return r.documentReadCount<this.Wi?(Hn()<=W.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",Wn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),A.resolve()):(Hn()<=W.DEBUG&&C("QueryEngine","Query:",Wn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Gi*i?(Hn()<=W.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",Wn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ze(t))):A.resolve())}ji(e,t){if(mf(t))return A.resolve(null);let r=ze(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Ls(t,null,"F"),r=ze(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let o=$(...s);return this.zi.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{let h=this.Zi(t,c);return this.Xi(t,h,o,u.readTime)?this.ji(e,Ls(t,null,"F")):this.es(e,h,t,u)}))})))}Hi(e,t,r,i){return mf(t)||i.isEqual(B.min())?A.resolve(null):this.zi.getDocuments(e,r).next(s=>{let o=this.Zi(t,s);return this.Xi(t,o,r,i)?A.resolve(null):(Hn()<=W.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Wn(t)),this.es(e,o,t,rp(i,-1)).next(c=>c))})}Zi(e,t){let r=new re(Ap(e));return t.forEach((i,s)=>{Ri(e,s)&&(r=r.add(s))}),r}Xi(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ji(e,t,r){return Hn()<=W.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",Wn(t)),this.zi.getDocumentsMatchingQuery(e,t,Ke.min(),r)}es(e,t,r,i){return this.zi.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}};var Vu=class{constructor(e,t,r,i){this.persistence=e,this.ts=t,this.serializer=i,this.ns=new se(K),this.rs=new it(s=>mn(s),Si),this.ss=new Map,this.os=e.getRemoteDocumentCache(),this.Qr=e.getTargetCache(),this.$r=e.getBundleCache(),this._s(r)}_s(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ys(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ns))}};function im(n,e,t,r){return new Vu(n,e,t,r)}async function sm(n,e){let t=M(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t._s(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let o=[],c=[],u=$();for(let h of i){o.push(h.batchId);for(let f of h.mutations)u=u.add(f.key)}for(let h of s){c.push(h.batchId);for(let f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(h=>({us:h,removedBatchIds:o,addedBatchIds:c}))})})}function gI(n,e){let t=M(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.os.newChangeBuffer({trackRemovals:!0});return function(c,u,h,f){let m=h.batch,w=m.keys(),R=A.resolve();return w.forEach(D=>{R=R.next(()=>f.getEntry(u,D)).next(O=>{let k=h.docVersions.get(D);q(k!==null),O.version.compareTo(k)<0&&(m.applyToRemoteDocument(O,h),O.isValidDocument()&&(O.setReadTime(h.commitVersion),f.addEntry(O)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(u,m))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=$();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function om(n){let e=M(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Qr.getLastRemoteSnapshotVersion(t))}function _I(n,e){let t=M(n),r=e.snapshotVersion,i=t.ns;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let o=t.os.newChangeBuffer({trackRemovals:!0});i=t.ns;let c=[];e.targetChanges.forEach((f,m)=>{let w=i.get(m);if(!w)return;c.push(t.Qr.removeMatchingKeys(s,f.removedDocuments,m).next(()=>t.Qr.addMatchingKeys(s,f.addedDocuments,m)));let R=w.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?R=R.withResumeToken(ve.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,r)),i=i.insert(m,R),function(O,k,z){return O.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=3e8?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(w,R,f)&&c.push(t.Qr.updateTargetData(s,R))});let u=je(),h=$();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),c.push(yI(s,o,e.documentUpdates).next(f=>{u=f.cs,h=f.ls})),!r.isEqual(B.min())){let f=t.Qr.getLastRemoteSnapshotVersion(s).next(m=>t.Qr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(f)}return A.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(t.ns=i,s))}function yI(n,e,t){let r=$(),i=$();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=je();return t.forEach((c,u)=>{let h=s.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(B.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):C("LocalStore","Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),{cs:o,ls:i}})}function wI(n,e){let t=M(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function to(n,e){let t=M(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Qr.getTargetData(r,e).next(s=>s?(i=s,A.resolve(i)):t.Qr.allocateTargetId(r).next(o=>(i=new hr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Qr.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.ns.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.ns=t.ns.insert(r.targetId,r),t.rs.set(e,r.targetId)),r})}async function fr(n,e,t){let r=M(n),i=r.ns.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Gt(o))throw o;C("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.ns=r.ns.remove(e),r.rs.delete(i.target)}function Lu(n,e,t){let r=M(n),i=B.min(),s=$();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,f){let m=M(u),w=m.rs.get(f);return w!==void 0?A.resolve(m.ns.get(w)):m.Qr.getTargetData(h,f)}(r,o,ze(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Qr.getMatchingKeysForTargetId(o,c.targetId).next(u=>{s=u})}).next(()=>r.ts.getDocumentsMatchingQuery(o,e,t?i:B.min(),t?s:$())).next(c=>(um(r,bp(e),c),{documents:c,hs:s})))}function am(n,e){let t=M(n),r=M(t.Qr),i=t.ns.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>r.ot(s,e).next(o=>o?o.target:null))}function cm(n,e){let t=M(n),r=t.ss.get(e)||B.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.os.getAllFromCollectionGroup(i,e,rp(r,-1),Number.MAX_SAFE_INTEGER)).then(i=>(um(t,e,i),i))}function um(n,e,t){let r=n.ss.get(e)||B.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.ss.set(e,r)}function zf(n,e){return`firestore_clients_${n}_${e}`}function Gf(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Ic(n,e){return`firestore_targets_${n}_${e}`}var no=class n{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Es(e,t,r){let i=JSON.parse(r),s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new N(i.error.code,i.error.message))),o?new n(e,t,i.state,s):(ue("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}ds(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}},ei=class n{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Es(e,t){let r=JSON.parse(t),i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new N(r.error.code,r.error.message))),s?new n(e,r.state,i):(ue("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}ds(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}},ro=class n{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Es(e,t){let r=JSON.parse(t),i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=Al();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=ap(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new n(e,s):(ue("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}},Mu=class n{constructor(e,t){this.clientId=e,this.onlineState=t}static Es(e){let t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new n(t.clientId,t.onlineState):(ue("SharedClientState",`Failed to parse online state: ${e}`),null)}},gi=class{constructor(){this.activeTargetIds=Al()}As(e){this.activeTargetIds=this.activeTargetIds.add(e)}Rs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ds(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}},ti=class{constructor(e,t,r,i,s){this.window=e,this.oi=t,this.persistenceKey=r,this.Vs=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.fs=this.gs.bind(this),this.ps=new se(K),this.started=!1,this.ys=[];let o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.ws=zf(this.persistenceKey,this.Vs),this.Ss=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.ps=this.ps.insert(this.Vs,new gi),this.bs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Ds=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Cs=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.vs=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.Fs=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.fs)}static D(e){return!(!e||!e.localStorage)}async start(){let e=await this.syncEngine.Bi();for(let r of e){if(r===this.Vs)continue;let i=this.getItem(zf(this.persistenceKey,r));if(i){let s=ro.Es(r,i);s&&(this.ps=this.ps.insert(s.clientId,s))}}this.Ms();let t=this.storage.getItem(this.vs);if(t){let r=this.xs(t);r&&this.Os(r)}for(let r of this.ys)this.gs(r);this.ys=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ss,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Ns(this.ps)}isActiveQueryTarget(e){let t=!1;return this.ps.forEach((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.Ls(e,"pending")}updateMutationState(e,t,r){this.Ls(e,t,r),this.Bs(e)}addLocalQueryTarget(e){let t="not-current";if(this.isActiveQueryTarget(e)){let r=this.storage.getItem(Ic(this.persistenceKey,e));if(r){let i=ei.Es(e,r);i&&(t=i.state)}}return this.ks.As(e),this.Ms(),t}removeLocalQueryTarget(e){this.ks.Rs(e),this.Ms()}isLocalQueryTarget(e){return this.ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Ic(this.persistenceKey,e))}updateQueryState(e,t,r){this.qs(e,t,r)}handleUserChange(e,t,r){t.forEach(i=>{this.Bs(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Qs(e)}notifyBundleLoaded(e){this.Ks(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.fs),this.removeItem(this.ws),this.started=!1)}getItem(e){let t=this.storage.getItem(e);return C("SharedClientState","READ",e,t),t}setItem(e,t){C("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){C("SharedClientState","REMOVE",e),this.storage.removeItem(e)}gs(e){let t=e;if(t.storageArea===this.storage){if(C("SharedClientState","EVENT",t.key,t.newValue),t.key===this.ws)return void ue("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.oi.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.bs.test(t.key)){if(t.newValue==null){let r=this.$s(t.key);return this.Us(r,null)}{let r=this.Ws(t.key,t.newValue);if(r)return this.Us(r.clientId,r)}}else if(this.Ds.test(t.key)){if(t.newValue!==null){let r=this.Gs(t.key,t.newValue);if(r)return this.zs(r)}}else if(this.Cs.test(t.key)){if(t.newValue!==null){let r=this.js(t.key,t.newValue);if(r)return this.Hs(r)}}else if(t.key===this.vs){if(t.newValue!==null){let r=this.xs(t.newValue);if(r)return this.Os(r)}}else if(t.key===this.Ss){let r=function(s){let o=Pe.oe;if(s!=null)try{let c=JSON.parse(s);q(typeof c=="number"),o=c}catch(c){ue("SharedClientState","Failed to read sequence number from WebStorage",c)}return o}(t.newValue);r!==Pe.oe&&this.sequenceNumberHandler(r)}else if(t.key===this.Fs){let r=this.Js(t.newValue);await Promise.all(r.map(i=>this.syncEngine.Ys(i)))}}}else this.ys.push(t)})}}get ks(){return this.ps.get(this.Vs)}Ms(){this.setItem(this.ws,this.ks.ds())}Ls(e,t,r){let i=new no(this.currentUser,e,t,r),s=Gf(this.persistenceKey,this.currentUser,e);this.setItem(s,i.ds())}Bs(e){let t=Gf(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Qs(e){let t={clientId:this.Vs,onlineState:e};this.storage.setItem(this.vs,JSON.stringify(t))}qs(e,t,r){let i=Ic(this.persistenceKey,e),s=new ei(e,t,r);this.setItem(i,s.ds())}Ks(e){let t=JSON.stringify(Array.from(e));this.setItem(this.Fs,t)}$s(e){let t=this.bs.exec(e);return t?t[1]:null}Ws(e,t){let r=this.$s(e);return ro.Es(r,t)}Gs(e,t){let r=this.Ds.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return no.Es(new ge(s),i,t)}js(e,t){let r=this.Cs.exec(e),i=Number(r[1]);return ei.Es(i,t)}xs(e){return Mu.Es(e)}Js(e){return JSON.parse(e)}async zs(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Zs(e.batchId,e.state,e.error);C("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Hs(e){return this.syncEngine.Xs(e.targetId,e.state,e.error)}Us(e,t){let r=t?this.ps.insert(e,t):this.ps.remove(e),i=this.Ns(this.ps),s=this.Ns(r),o=[],c=[];return s.forEach(u=>{i.has(u)||o.push(u)}),i.forEach(u=>{s.has(u)||c.push(u)}),this.syncEngine.eo(o,c).then(()=>{this.ps=r})}Os(e){this.ps.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Ns(e){let t=Al();return e.forEach((r,i)=>{t=t.unionWith(i.activeTargetIds)}),t}},io=class{constructor(){this.no=new gi,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.no.As(e),this.ro[e]||"not-current"}updateQueryState(e,t,r){this.ro[e]=t}removeLocalQueryTarget(e){this.no.Rs(e)}isLocalQueryTarget(e){return this.no.activeTargetIds.has(e)}clearQueryState(e){delete this.ro[e]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(e){return this.no.activeTargetIds.has(e)}start(){return this.no=new gi,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Fu=class{io(e){}shutdown(){}};var so=class{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(e){this.uo.push(e)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){C("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.uo)e(0)}ao(){C("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.uo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Is=null;function vc(){return Is===null?Is=function(){return 268435456+Math.round(2147483648*Math.random())}():Is++,"0x"+Is.toString(16)}var II={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var Uu=class{constructor(e){this.lo=e.lo,this.ho=e.ho}Po(e){this.Io=e}To(e){this.Eo=e}Ao(e){this.Ro=e}onMessage(e){this.Vo=e}close(){this.ho()}send(e){this.lo(e)}mo(){this.Io()}fo(){this.Eo()}po(e){this.Ro(e)}yo(e){this.Vo(e)}};var Re="WebChannelConnection",qu=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.wo=r+"://"+t.host,this.So=`projects/${i}/databases/${s}`,this.bo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Do(){return!1}Co(t,r,i,s,o){let c=vc(),u=this.vo(t,r.toUriEncodedString());C("RestConnection",`Sending RPC '${t}' ${c}:`,u,i);let h={"google-cloud-resource-prefix":this.So,"x-goog-request-params":this.bo};return this.Fo(h,s,o),this.Mo(t,u,h,i).then(f=>(C("RestConnection",`Received RPC '${t}' ${c}: `,f),f),f=>{throw ni("RestConnection",`RPC '${t}' ${c} failed with error: `,f,"url: ",u,"request:",i),f})}xo(t,r,i,s,o,c){return this.Co(t,r,i,s,o)}Fo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+_r}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}vo(t,r){let i=II[t];return`${this.wo}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Mo(e,t,r,i){let s=vc();return new Promise((o,c)=>{let u=new dc;u.setWithCredentials(!0),u.listenOnce(pc.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case zr.NO_ERROR:let f=u.getResponseJson();C(Re,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case zr.TIMEOUT:C(Re,`RPC '${e}' ${s} timed out`),c(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case zr.HTTP_ERROR:let m=u.getStatus();if(C(Re,`RPC '${e}' ${s} failed with status:`,m,"response text:",u.getResponseText()),m>0){let w=u.getResponseJson();Array.isArray(w)&&(w=w[0]);let R=w?.error;if(R&&R.status&&R.message){let D=function(k){let z=k.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(z)>=0?z:P.UNKNOWN}(R.status);c(new N(D,R.message))}else c(new N(P.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new N(P.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{C(Re,`RPC '${e}' ${s} completed.`)}});let h=JSON.stringify(i);C(Re,`RPC '${e}' ${s} sending request:`,i),u.send(t,"POST",h,r,15)})}Oo(e,t,r){let i=vc(),s=[this.wo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=_c(),c=gc(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.xmlHttpFactory=new fc({})),this.Fo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;let f=s.join("");C(Re,`Creating RPC '${e}' stream ${i}: ${f}`,u);let m=o.createWebChannel(f,u),w=!1,R=!1,D=new Uu({lo:k=>{R?C(Re,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(w||(C(Re,`Opening RPC '${e}' stream ${i} transport.`),m.open(),w=!0),C(Re,`RPC '${e}' stream ${i} sending:`,k),m.send(k))},ho:()=>m.close()}),O=(k,z,j)=>{k.listen(z,U=>{try{j(U)}catch(H){setTimeout(()=>{throw H},0)}})};return O(m,jn.EventType.OPEN,()=>{R||(C(Re,`RPC '${e}' stream ${i} transport opened.`),D.mo())}),O(m,jn.EventType.CLOSE,()=>{R||(R=!0,C(Re,`RPC '${e}' stream ${i} transport closed`),D.po())}),O(m,jn.EventType.ERROR,k=>{R||(R=!0,ni(Re,`RPC '${e}' stream ${i} transport errored:`,k),D.po(new N(P.UNAVAILABLE,"The operation could not be completed")))}),O(m,jn.EventType.MESSAGE,k=>{var z;if(!R){let j=k.data[0];q(!!j);let U=j,H=U.error||((z=U[0])===null||z===void 0?void 0:z.error);if(H){C(Re,`RPC '${e}' stream ${i} received error:`,H);let Y=H.status,G=function(y){let v=he[y];if(v!==void 0)return Mp(v)}(Y),I=H.message;G===void 0&&(G=P.INTERNAL,I="Unknown error status: "+Y+" with message "+H.message),R=!0,D.po(new N(G,I)),m.close()}else C(Re,`RPC '${e}' stream ${i} received:`,j),D.yo(j)}}),O(c,mc.STAT_EVENT,k=>{k.stat===gs.PROXY?C(Re,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===gs.NOPROXY&&C(Re,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.fo()},0),D}};function lm(){return typeof window<"u"?window:null}function As(){return typeof document<"u"?document:null}function Po(n){return new nu(n,!0)}var oo=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.oi=e,this.timerId=t,this.No=r,this.Lo=i,this.Bo=s,this.ko=0,this.qo=null,this.Qo=Date.now(),this.reset()}reset(){this.ko=0}Ko(){this.ko=this.Bo}$o(e){this.cancel();let t=Math.floor(this.ko+this.Uo()),r=Math.max(0,Date.now()-this.Qo),i=Math.max(0,t-r);i>0&&C("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.qo=this.oi.enqueueAfterDelay(this.timerId,i,()=>(this.Qo=Date.now(),e())),this.ko*=this.Lo,this.ko<this.No&&(this.ko=this.No),this.ko>this.Bo&&(this.ko=this.Bo)}Wo(){this.qo!==null&&(this.qo.skipDelay(),this.qo=null)}cancel(){this.qo!==null&&(this.qo.cancel(),this.qo=null)}Uo(){return(Math.random()-.5)*this.ko}};var ao=class{constructor(e,t,r,i,s,o,c,u){this.oi=e,this.Go=r,this.zo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.jo=0,this.Ho=null,this.Jo=null,this.stream=null,this.Yo=new oo(e,t)}Zo(){return this.state===1||this.state===5||this.Xo()}Xo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.e_()}async stop(){this.Zo()&&await this.close(0)}t_(){this.state=0,this.Yo.reset()}n_(){this.Xo()&&this.Ho===null&&(this.Ho=this.oi.enqueueAfterDelay(this.Go,6e4,()=>this.r_()))}i_(e){this.s_(),this.stream.send(e)}async r_(){if(this.Xo())return this.close(0)}s_(){this.Ho&&(this.Ho.cancel(),this.Ho=null)}o_(){this.Jo&&(this.Jo.cancel(),this.Jo=null)}async close(e,t){this.s_(),this.o_(),this.Yo.cancel(),this.jo++,e!==4?this.Yo.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(ue(t.toString()),ue("Using maximum backoff delay to prevent overloading the backend."),this.Yo.Ko()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.__(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ao(t)}__(){}auth(){this.state=1;let e=this.a_(this.jo),t=this.jo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.jo===t&&this.u_(r,i)},r=>{e(()=>{let i=new N(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.c_(i)})})}u_(e,t){let r=this.a_(this.jo);this.stream=this.l_(e,t),this.stream.Po(()=>{r(()=>this.listener.Po())}),this.stream.To(()=>{r(()=>(this.state=2,this.Jo=this.oi.enqueueAfterDelay(this.zo,1e4,()=>(this.Xo()&&(this.state=3),Promise.resolve())),this.listener.To()))}),this.stream.Ao(i=>{r(()=>this.c_(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}e_(){this.state=5,this.Yo.$o(async()=>{this.state=0,this.start()})}c_(e){return C("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}a_(e){return t=>{this.oi.enqueueAndForget(()=>this.jo===e?t():(C("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Bu=class extends ao{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}l_(e,t){return this.connection.Oo("Listen",e,t)}onMessage(e){this.Yo.reset();let t=sI(this.serializer,e),r=function(s){if(!("targetChange"in s))return B.min();let o=s.targetChange;return o.targetIds&&o.targetIds.length?B.min():o.readTime?Le(o.readTime):B.min()}(e);return this.listener.h_(t,r)}P_(e){let t={};t.database=su(this.serializer),t.addTarget=function(s,o){let c,u=o.target;if(c=xs(u)?{documents:zp(s,u)}:{query:Gp(s,u)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Fp(s,o.resumeToken);let h=ru(s,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(B.min())>0){c.readTime=lr(s,o.snapshotVersion.toTimestamp());let h=ru(s,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);let r=aI(this.serializer,e);r&&(t.labels=r),this.i_(t)}I_(e){let t={};t.database=su(this.serializer),t.removeTarget=e,this.i_(t)}},ju=class extends ao{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s,this.T_=!1}get E_(){return this.T_}start(){this.T_=!1,this.lastStreamToken=void 0,super.start()}__(){this.T_&&this.d_([])}l_(e,t){return this.connection.Oo("Write",e,t)}onMessage(e){if(q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.T_){this.Yo.reset();let t=oI(e.writeResults,e.commitTime),r=Le(e.commitTime);return this.listener.A_(r,t)}return q(!e.writeResults||e.writeResults.length===0),this.T_=!0,this.listener.R_()}V_(){let e={};e.database=su(this.serializer),this.i_(e)}d_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>js(this.serializer,r))};this.i_(t)}};var zu=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.m_=!1}f_(){if(this.m_)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Co(e,t,r,i){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Co(e,iu(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new N(P.UNKNOWN,s.toString())})}xo(e,t,r,i,s){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.xo(e,iu(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(P.UNKNOWN,o.toString())})}terminate(){this.m_=!0,this.connection.terminate()}},Gu=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.g_=0,this.p_=null,this.y_=!0}w_(){this.g_===0&&(this.S_("Unknown"),this.p_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.p_=null,this.b_("Backend didn't respond within 10 seconds."),this.S_("Offline"),Promise.resolve())))}D_(e){this.state==="Online"?this.S_("Unknown"):(this.g_++,this.g_>=1&&(this.C_(),this.b_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.S_("Offline")))}set(e){this.C_(),this.g_=0,e==="Online"&&(this.y_=!1),this.S_(e)}S_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}b_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.y_?(ue(t),this.y_=!1):C("OnlineStateTracker",t)}C_(){this.p_!==null&&(this.p_.cancel(),this.p_=null)}};var Ku=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.v_=[],this.F_=new Map,this.M_=new Set,this.x_=[],this.O_=s,this.O_.io(o=>{r.enqueueAndForget(async()=>{Tn(this)&&(C("RemoteStore","Restarting streams for network reachability change."),await async function(u){let h=M(u);h.M_.add(4),await Pi(h),h.N_.set("Unknown"),h.M_.delete(4),await Co(h)}(this))})}),this.N_=new Gu(r,i)}};async function Co(n){if(Tn(n))for(let e of n.x_)await e(!0)}async function Pi(n){for(let e of n.x_)await e(!1)}function ko(n,e){let t=M(n);t.F_.has(e.targetId)||(t.F_.set(e.targetId,e),kl(t)?Cl(t):wr(t).Xo()&&Pl(t,e))}function pr(n,e){let t=M(n),r=wr(t);t.F_.delete(e),r.Xo()&&hm(t,e),t.F_.size===0&&(r.Xo()?r.n_():Tn(t)&&t.N_.set("Unknown"))}function Pl(n,e){if(n.L_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}wr(n).P_(e)}function hm(n,e){n.L_.xe(e),wr(n).I_(e)}function Cl(n){n.L_=new tu({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.F_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),wr(n).start(),n.N_.w_()}function kl(n){return Tn(n)&&!wr(n).Zo()&&n.F_.size>0}function Tn(n){return M(n).M_.size===0}function dm(n){n.L_=void 0}async function vI(n){n.N_.set("Online")}async function EI(n){n.F_.forEach((e,t)=>{Pl(n,e)})}async function TI(n,e){dm(n),kl(n)?(n.N_.D_(e),Cl(n)):n.N_.set("Unknown")}async function bI(n,e,t){if(n.N_.set("Online"),e instanceof Us&&e.state===2&&e.cause)try{await async function(i,s){let o=s.cause;for(let c of s.targetIds)i.F_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.F_.delete(c),i.L_.removeTarget(c))}(n,e)}catch(r){C("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await co(n,r)}else if(e instanceof er?n.L_.Ke(e):e instanceof Fs?n.L_.He(e):n.L_.We(e),!t.isEqual(B.min()))try{let r=await om(n.localStore);t.compareTo(r)>=0&&await function(s,o){let c=s.L_.rt(o);return c.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){let f=s.F_.get(h);f&&s.F_.set(h,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,h)=>{let f=s.F_.get(u);if(!f)return;s.F_.set(u,f.withResumeToken(ve.EMPTY_BYTE_STRING,f.snapshotVersion)),hm(s,u);let m=new hr(f.target,u,h,f.sequenceNumber);Pl(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){C("RemoteStore","Failed to raise snapshot:",r),await co(n,r)}}async function co(n,e,t){if(!Gt(e))throw e;n.M_.add(1),await Pi(n),n.N_.set("Offline"),t||(t=()=>om(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{C("RemoteStore","Retrying IndexedDB access"),await t(),n.M_.delete(1),await Co(n)})}function fm(n,e){return e().catch(t=>co(n,t,e))}async function yr(n){let e=M(n),t=jt(e),r=e.v_.length>0?e.v_[e.v_.length-1].batchId:-1;for(;AI(e);)try{let i=await wI(e.localStore,r);if(i===null){e.v_.length===0&&t.n_();break}r=i.batchId,SI(e,i)}catch(i){await co(e,i)}pm(e)&&mm(e)}function AI(n){return Tn(n)&&n.v_.length<10}function SI(n,e){n.v_.push(e);let t=jt(n);t.Xo()&&t.E_&&t.d_(e.mutations)}function pm(n){return Tn(n)&&!jt(n).Zo()&&n.v_.length>0}function mm(n){jt(n).start()}async function RI(n){jt(n).V_()}async function PI(n){let e=jt(n);for(let t of n.v_)e.d_(t.mutations)}async function CI(n,e,t){let r=n.v_.shift(),i=Xc.from(r,e,t);await fm(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await yr(n)}async function kI(n,e){e&&jt(n).E_&&await async function(r,i){if(function(o){return Yw(o)&&o!==P.ABORTED}(i.code)){let s=r.v_.shift();jt(r).t_(),await fm(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await yr(r)}}(n,e),pm(n)&&mm(n)}async function Kf(n,e){let t=M(n);t.asyncQueue.verifyOperationInProgress(),C("RemoteStore","RemoteStore received new credentials");let r=Tn(t);t.M_.add(3),await Pi(t),r&&t.N_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.M_.delete(3),await Co(t)}async function $u(n,e){let t=M(n);e?(t.M_.delete(2),await Co(t)):e||(t.M_.add(2),await Pi(t),t.N_.set("Unknown"))}function wr(n){return n.B_||(n.B_=function(t,r,i){let s=M(t);return s.f_(),new Bu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:vI.bind(null,n),To:EI.bind(null,n),Ao:TI.bind(null,n),h_:bI.bind(null,n)}),n.x_.push(async e=>{e?(n.B_.t_(),kl(n)?Cl(n):n.N_.set("Unknown")):(await n.B_.stop(),dm(n))})),n.B_}function jt(n){return n.k_||(n.k_=function(t,r,i){let s=M(t);return s.f_(),new ju(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:()=>Promise.resolve(),To:RI.bind(null,n),Ao:kI.bind(null,n),R_:PI.bind(null,n),A_:CI.bind(null,n)}),n.x_.push(async e=>{e?(n.k_.t_(),await yr(n)):(await n.k_.stop(),n.v_.length>0&&(C("RemoteStore",`Stopping write stream with ${n.v_.length} pending writes`),n.v_=[]))})),n.k_}var Hu=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Qe,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let o=Date.now()+r,c=new n(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Dl(n,e){if(ue("AsyncQueue",`${e}: ${n}`),Gt(n))return new N(P.UNAVAILABLE,`${e}: ${n}`);throw n}var uo=class n{constructor(e){this.comparator=e?(t,r)=>e(t,r)||V.comparator(t.key,r.key):(t,r)=>V.comparator(t.key,r.key),this.keyedMap=Wr(),this.sortedSet=new se(this.comparator)}static emptySet(e){return new n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var lo=class{constructor(){this.q_=new se(V.comparator)}track(e){let t=e.doc.key,r=this.q_.get(t);r?e.type!==0&&r.type===3?this.q_=this.q_.insert(t,e):e.type===3&&r.type!==1?this.q_=this.q_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.q_=this.q_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.q_=this.q_.remove(t):e.type===1&&r.type===2?this.q_=this.q_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):L():this.q_=this.q_.insert(t,e)}Q_(){let e=[];return this.q_.inorderTraversal((t,r)=>{e.push(r)}),e}},mr=class n{constructor(e,t,r,i,s,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,i,s){let o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new n(e,t,uo.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ro(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Wu=class{constructor(){this.K_=void 0,this.U_=[]}W_(){return this.U_.some(e=>e.G_())}},Qu=class{constructor(){this.queries=new it(e=>Tp(e),Ro),this.onlineState="Unknown",this.z_=new Set}};async function gm(n,e){let t=M(n),r=3,i=e.query,s=t.queries.get(i);s?!s.W_()&&e.G_()&&(r=2):(s=new Wu,r=e.G_()?0:1);try{switch(r){case 0:s.K_=await t.onListen(i,!0);break;case 1:s.K_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){let c=Dl(o,`Initialization of query '${Wn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.U_.push(e),e.j_(t.onlineState),s.K_&&e.H_(s.K_)&&Nl(t)}async function _m(n,e){let t=M(n),r=e.query,i=3,s=t.queries.get(r);if(s){let o=s.U_.indexOf(e);o>=0&&(s.U_.splice(o,1),s.U_.length===0?i=e.G_()?0:1:!s.W_()&&e.G_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function DI(n,e){let t=M(n),r=!1;for(let i of e){let s=i.query,o=t.queries.get(s);if(o){for(let c of o.U_)c.H_(i)&&(r=!0);o.K_=i}}r&&Nl(t)}function NI(n,e,t){let r=M(n),i=r.queries.get(e);if(i)for(let s of i.U_)s.onError(t);r.queries.delete(e)}function Nl(n){n.z_.forEach(e=>{e.next()})}var Ju,$f;($f=Ju||(Ju={})).J_="default",$f.Cache="cache";var ho=class{constructor(e,t,r){this.query=e,this.Y_=t,this.Z_=!1,this.X_=null,this.onlineState="Unknown",this.options=r||{}}H_(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new mr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Z_?this.ea(e)&&(this.Y_.next(e),t=!0):this.ta(e,this.onlineState)&&(this.na(e),t=!0),this.X_=e,t}onError(e){this.Y_.error(e)}j_(e){this.onlineState=e;let t=!1;return this.X_&&!this.Z_&&this.ta(this.X_,e)&&(this.na(this.X_),t=!0),t}ta(e,t){if(!e.fromCache||!this.G_())return!0;let r=t!=="Offline";return(!this.options.ra||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ea(e){if(e.docChanges.length>0)return!0;let t=this.X_&&this.X_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}na(e){e=mr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Z_=!0,this.Y_.next(e)}G_(){return this.options.source!==Ju.Cache}};var fo=class{constructor(e){this.key=e}},po=class{constructor(e){this.key=e}},Yu=class{constructor(e,t){this.query=e,this.la=t,this.ha=null,this.hasCachedResults=!1,this.current=!1,this.Pa=$(),this.mutatedKeys=$(),this.Ia=Ap(e),this.Ta=new uo(this.Ia)}get Ea(){return this.la}da(e,t){let r=t?t.Aa:new lo,i=t?t.Ta:this.Ta,s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1,u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{let w=i.get(f),R=Ri(this.query,m)?m:null,D=!!w&&this.mutatedKeys.has(w.key),O=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations),k=!1;w&&R?w.data.isEqual(R.data)?D!==O&&(r.track({type:3,doc:R}),k=!0):this.Ra(w,R)||(r.track({type:2,doc:R}),k=!0,(u&&this.Ia(R,u)>0||h&&this.Ia(R,h)<0)&&(c=!0)):!w&&R?(r.track({type:0,doc:R}),k=!0):w&&!R&&(r.track({type:1,doc:w}),k=!0,(u||h)&&(c=!0)),k&&(R?(o=o.add(R),s=O?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){let f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{Ta:o,Aa:r,Xi:c,mutatedKeys:s}}Ra(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.Ta;this.Ta=e.Ta,this.mutatedKeys=e.mutatedKeys;let o=e.Aa.Q_();o.sort((f,m)=>function(R,D){let O=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return O(R)-O(D)}(f.type,m.type)||this.Ia(f.doc,m.doc)),this.Va(r),i=i!=null&&i;let c=t&&!i?this.ma():[],u=this.Pa.size===0&&this.current&&!i?1:0,h=u!==this.ha;return this.ha=u,o.length!==0||h?{snapshot:new mr(this.query,e.Ta,s,o,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),fa:c}:{fa:c}}j_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ta:this.Ta,Aa:new lo,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{fa:[]}}ga(e){return!this.la.has(e)&&!!this.Ta.has(e)&&!this.Ta.get(e).hasLocalMutations}Va(e){e&&(e.addedDocuments.forEach(t=>this.la=this.la.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.la=this.la.delete(t)),this.current=e.current)}ma(){if(!this.current)return[];let e=this.Pa;this.Pa=$(),this.Ta.forEach(r=>{this.ga(r.key)&&(this.Pa=this.Pa.add(r.key))});let t=[];return e.forEach(r=>{this.Pa.has(r)||t.push(new po(r))}),this.Pa.forEach(r=>{e.has(r)||t.push(new fo(r))}),t}pa(e){this.la=e.hs,this.Pa=$();let t=this.da(e.documents);return this.applyChanges(t,!0)}ya(){return mr.fromInitialDocuments(this.query,this.Ta,this.mutatedKeys,this.ha===0,this.hasCachedResults)}},Xu=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Zu=class{constructor(e){this.key=e,this.wa=!1}},el=class{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Sa={},this.ba=new it(c=>Tp(c),Ro),this.Da=new Map,this.Ca=new Set,this.va=new se(V.comparator),this.Fa=new Map,this.Ma=new mi,this.xa={},this.Oa=new Map,this.Na=dr.Ln(),this.onlineState="Unknown",this.La=void 0}get isPrimaryClient(){return this.La===!0}};async function OI(n,e,t=!0){let r=Do(n),i,s=r.ba.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.ya()):i=await ym(r,e,t,!0),i}async function xI(n,e){let t=Do(n);await ym(t,e,!0,!1)}async function ym(n,e,t,r){let i=await to(n.localStore,ze(e)),s=i.targetId,o=t?n.sharedClientState.addLocalQueryTarget(s):"not-current",c;return r&&(c=await Ol(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&ko(n.remoteStore,i),c}async function Ol(n,e,t,r,i){n.Ba=(m,w,R)=>async function(O,k,z,j){let U=k.view.da(z);U.Xi&&(U=await Lu(O.localStore,k.query,!1).then(({documents:I})=>k.view.da(I,U)));let H=j&&j.targetChanges.get(k.targetId),Y=j&&j.targetMismatches.get(k.targetId)!=null,G=k.view.applyChanges(U,O.isPrimaryClient,H,Y);return tl(O,k.targetId,G.fa),G.snapshot}(n,m,w,R);let s=await Lu(n.localStore,e,!0),o=new Yu(e,s.hs),c=o.da(s.documents),u=fi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),h=o.applyChanges(c,n.isPrimaryClient,u);tl(n,t,h.fa);let f=new Xu(e,t,o);return n.ba.set(e,f),n.Da.has(t)?n.Da.get(t).push(e):n.Da.set(t,[e]),h.snapshot}async function VI(n,e,t){let r=M(n),i=r.ba.get(e),s=r.Da.get(i.targetId);if(s.length>1)return r.Da.set(i.targetId,s.filter(o=>!Ro(o,e))),void r.ba.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await fr(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&pr(r.remoteStore,i.targetId),gr(r,i.targetId)}).catch(zt)):(gr(r,i.targetId),await fr(r.localStore,i.targetId,!0))}async function LI(n,e){let t=M(n),r=t.ba.get(e),i=t.Da.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),pr(t.remoteStore,r.targetId))}async function MI(n,e,t){let r=Ml(n);try{let i=await function(o,c){let u=M(o),h=le.now(),f=c.reduce((R,D)=>R.add(D.key),$()),m,w;return u.persistence.runTransaction("Locally write mutations","readwrite",R=>{let D=je(),O=$();return u.os.getEntries(R,f).next(k=>{D=k,D.forEach((z,j)=>{j.isValidDocument()||(O=O.add(z))})}).next(()=>u.localDocuments.getOverlayedDocuments(R,D)).next(k=>{m=k;let z=[];for(let j of c){let U=Jw(j,m.get(j.key).overlayedDocument);U!=null&&z.push(new Ye(j.key,U,mp(U.value.mapValue),Ce.exists(!0)))}return u.mutationQueue.addMutationBatch(R,h,z,c)}).next(k=>{w=k;let z=k.applyToLocalDocumentSet(m,O);return u.documentOverlayCache.saveOverlays(R,k.batchId,z)})}).then(()=>({batchId:w.batchId,changes:Rp(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,u){let h=o.xa[o.currentUser.toKey()];h||(h=new se(K)),h=h.insert(c,u),o.xa[o.currentUser.toKey()]=h}(r,i.batchId,t),await Kt(r,i.changes),await yr(r.remoteStore)}catch(i){let s=Dl(i,"Failed to persist write");t.reject(s)}}async function wm(n,e){let t=M(n);try{let r=await _I(t.localStore,e);e.targetChanges.forEach((i,s)=>{let o=t.Fa.get(s);o&&(q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.wa=!0:i.modifiedDocuments.size>0?q(o.wa):i.removedDocuments.size>0&&(q(o.wa),o.wa=!1))}),await Kt(t,r,e)}catch(r){await zt(r)}}function Hf(n,e,t){let r=M(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.ba.forEach((s,o)=>{let c=o.view.j_(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){let u=M(o);u.onlineState=c;let h=!1;u.queries.forEach((f,m)=>{for(let w of m.U_)w.j_(c)&&(h=!0)}),h&&Nl(u)}(r.eventManager,e),i.length&&r.Sa.h_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function FI(n,e,t){let r=M(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Fa.get(e),s=i&&i.key;if(s){let o=new se(V.comparator);o=o.insert(s,Ie.newNoDocument(s,B.min()));let c=$().add(s),u=new di(B.min(),new Map,new se(K),o,c);await wm(r,u),r.va=r.va.remove(s),r.Fa.delete(e),Ll(r)}else await fr(r.localStore,e,!1).then(()=>gr(r,e,t)).catch(zt)}async function UI(n,e){let t=M(n),r=e.batch.batchId;try{let i=await gI(t.localStore,e);Vl(t,r,null),xl(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Kt(t,i)}catch(i){await zt(i)}}async function qI(n,e,t){let r=M(n);try{let i=await function(o,c){let u=M(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next(m=>(q(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);Vl(r,e,t),xl(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Kt(r,i)}catch(i){await zt(i)}}function xl(n,e){(n.Oa.get(e)||[]).forEach(t=>{t.resolve()}),n.Oa.delete(e)}function Vl(n,e,t){let r=M(n),i=r.xa[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.xa[r.currentUser.toKey()]=i}}function gr(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Da.get(e))n.ba.delete(r),t&&n.Sa.ka(r,t);n.Da.delete(e),n.isPrimaryClient&&n.Ma.Vr(e).forEach(r=>{n.Ma.containsKey(r)||Im(n,r)})}function Im(n,e){n.Ca.delete(e.path.canonicalString());let t=n.va.get(e);t!==null&&(pr(n.remoteStore,t),n.va=n.va.remove(e),n.Fa.delete(t),Ll(n))}function tl(n,e,t){for(let r of t)r instanceof fo?(n.Ma.addReference(r.key,e),BI(n,r)):r instanceof po?(C("SyncEngine","Document no longer in limbo: "+r.key),n.Ma.removeReference(r.key,e),n.Ma.containsKey(r.key)||Im(n,r.key)):L()}function BI(n,e){let t=e.key,r=t.path.canonicalString();n.va.get(t)||n.Ca.has(r)||(C("SyncEngine","New document in limbo: "+t),n.Ca.add(r),Ll(n))}function Ll(n){for(;n.Ca.size>0&&n.va.size<n.maxConcurrentLimboResolutions;){let e=n.Ca.values().next().value;n.Ca.delete(e);let t=new V(te.fromString(e)),r=n.Na.next();n.Fa.set(r,new Zu(t)),n.va=n.va.insert(t,r),ko(n.remoteStore,new hr(ze(So(t.path)),r,"TargetPurposeLimboResolution",Pe.oe))}}async function Kt(n,e,t){let r=M(n),i=[],s=[],o=[];r.ba.isEmpty()||(r.ba.forEach((c,u)=>{o.push(r.Ba(u,e,t).then(h=>{if((h||t)&&r.isPrimaryClient){let f=h&&!h.fromCache;r.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){i.push(h);let f=Ou.Ki(u.targetId,h);s.push(f)}}))}),await Promise.all(o),r.Sa.h_(i),await async function(u,h){let f=M(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>A.forEach(h,w=>A.forEach(w.qi,R=>f.persistence.referenceDelegate.addReference(m,w.targetId,R)).next(()=>A.forEach(w.Qi,R=>f.persistence.referenceDelegate.removeReference(m,w.targetId,R)))))}catch(m){if(!Gt(m))throw m;C("LocalStore","Failed to update sequence numbers: "+m)}for(let m of h){let w=m.targetId;if(!m.fromCache){let R=f.ns.get(w),D=R.snapshotVersion,O=R.withLastLimboFreeSnapshotVersion(D);f.ns=f.ns.insert(w,O)}}}(r.localStore,s))}async function jI(n,e){let t=M(n);if(!t.currentUser.isEqual(e)){C("SyncEngine","User change. New user:",e.toKey());let r=await sm(t.localStore,e);t.currentUser=e,function(s,o){s.Oa.forEach(c=>{c.forEach(u=>{u.reject(new N(P.CANCELLED,o))})}),s.Oa.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Kt(t,r.us)}}function zI(n,e){let t=M(n),r=t.Fa.get(e);if(r&&r.wa)return $().add(r.key);{let i=$(),s=t.Da.get(e);if(!s)return i;for(let o of s){let c=t.ba.get(o);i=i.unionWith(c.view.Ea)}return i}}async function GI(n,e){let t=M(n),r=await Lu(t.localStore,e.query,!0),i=e.view.pa(r);return t.isPrimaryClient&&tl(t,e.targetId,i.fa),i}async function KI(n,e){let t=M(n);return cm(t.localStore,e).then(r=>Kt(t,r))}async function $I(n,e,t,r){let i=M(n),s=await function(c,u){let h=M(c),f=M(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",m=>f.vn(m,u).next(w=>w?h.localDocuments.getDocuments(m,w):A.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await yr(i.remoteStore):t==="acknowledged"||t==="rejected"?(Vl(i,e,r||null),xl(i,e),function(c,u){M(M(c).mutationQueue).Mn(u)}(i.localStore,e)):L(),await Kt(i,s)):C("SyncEngine","Cannot apply mutation batch with id: "+e)}async function HI(n,e){let t=M(n);if(Do(t),Ml(t),e===!0&&t.La!==!0){let r=t.sharedClientState.getAllActiveQueryTargets(),i=await Wf(t,r.toArray());t.La=!0,await $u(t.remoteStore,!0);for(let s of i)ko(t.remoteStore,s)}else if(e===!1&&t.La!==!1){let r=[],i=Promise.resolve();t.Da.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(gr(t,o),fr(t.localStore,o,!0))),pr(t.remoteStore,o)}),await i,await Wf(t,r),function(o){let c=M(o);c.Fa.forEach((u,h)=>{pr(c.remoteStore,h)}),c.Ma.mr(),c.Fa=new Map,c.va=new se(V.comparator)}(t),t.La=!1,await $u(t.remoteStore,!1)}}async function Wf(n,e,t){let r=M(n),i=[],s=[];for(let o of e){let c,u=r.Da.get(o);if(u&&u.length!==0){c=await to(r.localStore,ze(u[0]));for(let h of u){let f=r.ba.get(h),m=await GI(r,f);m.snapshot&&s.push(m.snapshot)}}else{let h=await am(r.localStore,o);c=await to(r.localStore,h),await Ol(r,vm(h),o,!1,c.resumeToken)}i.push(c)}return r.Sa.h_(s),i}function vm(n){return vp(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function WI(n){return function(t){return M(M(t).persistence).Bi()}(M(n).localStore)}async function QI(n,e,t,r){let i=M(n);if(i.La)return void C("SyncEngine","Ignoring unexpected query state notification.");let s=i.Da.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{let o=await cm(i.localStore,bp(s[0])),c=di.createSynthesizedRemoteEventForCurrentChange(e,t==="current",ve.EMPTY_BYTE_STRING);await Kt(i,o,c);break}case"rejected":await fr(i.localStore,e,!0),gr(i,e,r);break;default:L()}}async function JI(n,e,t){let r=Do(n);if(r.La){for(let i of e){if(r.Da.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){C("SyncEngine","Adding an already active target "+i);continue}let s=await am(r.localStore,i),o=await to(r.localStore,s);await Ol(r,vm(s),o.targetId,!1,o.resumeToken),ko(r.remoteStore,o)}for(let i of t)r.Da.has(i)&&await fr(r.localStore,i,!1).then(()=>{pr(r.remoteStore,i),gr(r,i)}).catch(zt)}}function Do(n){let e=M(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=wm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=zI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=FI.bind(null,e),e.Sa.h_=DI.bind(null,e.eventManager),e.Sa.ka=NI.bind(null,e.eventManager),e}function Ml(n){let e=M(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=UI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=qI.bind(null,e),e}var _i=class{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=Po(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return im(this.persistence,new eo,e.initialUser,this.serializer)}createPersistence(e){return new Xs(Zs.Hr,this.serializer)}createSharedClientState(e){return new io}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};var mo=class extends _i{constructor(e,t,r){super(),this.Qa=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Qa.initialize(this,e),await Ml(this.Qa.syncEngine),await yr(this.Qa.remoteStore),await this.persistence.fi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}createLocalStore(e){return im(this.persistence,new eo,e.initialUser,this.serializer)}createGarbageCollectionScheduler(e,t){let r=this.persistence.referenceDelegate.garbageCollector;return new yu(r,e.asyncQueue,t)}createIndexBackfillerScheduler(e,t){let r=new Vc(t,this.persistence);return new xc(e.asyncQueue,r)}createPersistence(e){let t=rm(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Ge.withCacheSize(this.cacheSizeBytes):Ge.DEFAULT;return new Nu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,lm(),As(),this.serializer,this.sharedClientState,!!this.forceOwnership)}createSharedClientState(e){return new io}},nl=class extends mo{constructor(e,t){super(e,t,!1),this.Qa=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);let t=this.Qa.syncEngine;this.sharedClientState instanceof ti&&(this.sharedClientState.syncEngine={Zs:$I.bind(null,t),Xs:QI.bind(null,t),eo:JI.bind(null,t),Bi:WI.bind(null,t),Ys:KI.bind(null,t)},await this.sharedClientState.start()),await this.persistence.fi(async r=>{await HI(this.Qa.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}createSharedClientState(e){let t=lm();if(!ti.D(t))throw new N(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");let r=rm(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new ti(t,e.asyncQueue,r,e.clientId,e.initialUser)}},yi=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Hf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=jI.bind(null,this.syncEngine),await $u(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Qu}()}createDatastore(e){let t=Po(e.databaseInfo.databaseId),r=function(s){return new qu(s)}(e.databaseInfo);return function(s,o,c,u){return new zu(s,o,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new Ku(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Hf(this.syncEngine,t,0),function(){return so.D()?new so:new Fu}())}createSyncEngine(e,t){return function(i,s,o,c,u,h,f){let m=new el(i,s,o,c,u,h);return f&&(m.La=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e;await async function(r){let i=M(r);C("RemoteStore","RemoteStore shutting down."),i.M_.add(5),await Pi(i),i.O_.shutdown(),i.N_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate()}};var go=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ka(this.observer.next,e)}error(e){this.observer.error?this.Ka(this.observer.error,e):ue("Uncaught Error in snapshot listener:",e.toString())}$a(){this.muted=!0}Ka(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}};var rl=class{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=ge.UNAUTHENTICATED,this.clientId=Ss.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{C("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(C("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Qe;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=Dl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Ec(n,e){n.asyncQueue.verifyOperationInProgress(),C("FirestoreClient","Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await sm(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Qf(n,e){n.asyncQueue.verifyOperationInProgress();let t=await XI(n);C("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Kf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Kf(e.remoteStore,i)),n._onlineComponents=e}function YI(n){return n.name==="FirebaseError"?n.code===P.FAILED_PRECONDITION||n.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function XI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){C("FirestoreClient","Using user provided OfflineComponentProvider");try{await Ec(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!YI(t))throw t;ni("Error using user provided cache. Falling back to memory cache: "+t),await Ec(n,new _i)}}else C("FirestoreClient","Using default OfflineComponentProvider"),await Ec(n,new _i);return n._offlineComponents}async function Em(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(C("FirestoreClient","Using user provided OnlineComponentProvider"),await Qf(n,n._uninitializedComponentsProvider._online)):(C("FirestoreClient","Using default OnlineComponentProvider"),await Qf(n,new yi))),n._onlineComponents}function ZI(n){return Em(n).then(e=>e.syncEngine)}async function il(n){let e=await Em(n),t=e.eventManager;return t.onListen=OI.bind(null,e.syncEngine),t.onUnlisten=VI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=xI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=LI.bind(null,e.syncEngine),t}function ev(n,e,t={}){let r=new Qe;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,h){let f=new go({next:w=>{o.enqueueAndForget(()=>_m(s,m)),w.fromCache&&u.source==="server"?h.reject(new N(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(w)},error:w=>h.reject(w)}),m=new ho(c,f,{includeMetadataChanges:!0,ra:!0});return gm(s,m)}(await il(n),n.asyncQueue,e,t,r)),r.promise}function Tm(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Jf=new Map;function bm(n,e,t){if(!t)throw new N(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function tv(n,e,t,r){if(e===!0&&r===!0)throw new N(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Yf(n){if(!V.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Xf(n){if(V.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function No(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":L()}function Je(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=No(n);throw new N(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function nv(n,e){if(e<=0)throw new N(P.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}var _o=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}tv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Tm((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},wi=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new _o({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new _o(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Ac;switch(r.type){case"firstParty":return new Pc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Jf.get(t);r&&(C("ComponentProvider","Removing Datastore"),Jf.delete(t),r.terminate())}(this),Promise.resolve()}};var mt=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Me=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new xt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},xt=class n extends mt{constructor(e,t,r){super(e,t,So(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Me(this.firestore,null,new V(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function rv(n,e,...t){if(n=Z(n),bm("collection","path",e),n instanceof wi){let r=te.fromString(e,...t);return Xf(r),new xt(n,null,r)}{if(!(n instanceof Me||n instanceof xt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(te.fromString(e,...t));return Xf(r),new xt(n.firestore,null,r)}}function iv(n,e,...t){if(n=Z(n),arguments.length===1&&(e=Ss.newId()),bm("doc","path",e),n instanceof wi){let r=te.fromString(e,...t);return Yf(r),new Me(n,null,new V(r))}{if(!(n instanceof Me||n instanceof xt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(te.fromString(e,...t));return Yf(r),new Me(n.firestore,n instanceof xt?n.converter:null,new V(r))}}var sl=class{constructor(){this.iu=Promise.resolve(),this.su=[],this.ou=!1,this._u=[],this.au=null,this.uu=!1,this.cu=!1,this.lu=[],this.Yo=new oo(this,"async_queue_retry"),this.hu=()=>{let t=As();t&&C("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Yo.Wo()};let e=As();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.hu)}get isShuttingDown(){return this.ou}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pu(),this.Iu(e)}enterRestrictedMode(e){if(!this.ou){this.ou=!0,this.cu=e||!1;let t=As();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hu)}}enqueue(e){if(this.Pu(),this.ou)return new Promise(()=>{});let t=new Qe;return this.Iu(()=>this.ou&&this.cu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.su.push(e),this.Tu()))}async Tu(){if(this.su.length!==0){try{await this.su[0](),this.su.shift(),this.Yo.reset()}catch(e){if(!Gt(e))throw e;C("AsyncQueue","Operation failed with retryable error: "+e)}this.su.length>0&&this.Yo.$o(()=>this.Tu())}}Iu(e){let t=this.iu.then(()=>(this.uu=!0,e().catch(r=>{this.au=r,this.uu=!1;let i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw ue("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.uu=!1,r))));return this.iu=t,t}enqueueAfterDelay(e,t,r){this.Pu(),this.lu.indexOf(e)>-1&&(t=0);let i=Hu.createAndSchedule(this,e,t,r,s=>this.Eu(s));return this._u.push(i),i}Pu(){this.au&&L()}verifyOperationInProgress(){}async du(){let e;do e=this.iu,await e;while(e!==this.iu)}Au(e){for(let t of this._u)if(t.timerId===e)return!0;return!1}Ru(e){return this.du().then(()=>{this._u.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this._u)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.du()})}Vu(e){this.lu.push(e)}Eu(e){let t=this._u.indexOf(e);this._u.splice(t,1)}};function Zf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}var st=class extends wi{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=function(){return new sl}(),this._persistenceKey=i?.name||"[DEFAULT]"}_terminate(){return this._firestoreClient||Am(this),this._firestoreClient.terminate()}};function sv(n,e,t){t||(t="(default)");let r=Ze(n,"firestore");if(r.isInitialized(t)){let i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(At(s,e))return i;throw new N(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new N(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function Oo(n){return n._firestoreClient||Am(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function Am(n){var e,t,r;let i=n._freezeSettings(),s=function(c,u,h,f){return new Lc(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Tm(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new rl(n._authCredentials,n._appCheckCredentials,n._queue,s),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}var Ii=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(ve.fromBase64String(e))}catch(t){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(ve.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var vn=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var vi=class{constructor(e){this._methodName=e}};var Ei=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}};var ov=/^__.*__$/,ol=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ye(e,this.data,this.fieldMask,t,this.fieldTransforms):new Bt(e,this.data,t,this.fieldTransforms)}},yo=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Ye(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function Sm(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}var al=class n{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.mu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get fu(){return this.settings.fu}gu(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}pu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.wu(e),i}Su(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.mu(),i}bu(e){return this.gu({path:void 0,yu:!0})}Du(e){return Io(e,this.settings.methodName,this.settings.Cu||!1,this.path,this.settings.vu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}mu(){if(this.path)for(let e=0;e<this.path.length;e++)this.wu(this.path.get(e))}wu(e){if(e.length===0)throw this.Du("Document fields must not be empty");if(Sm(this.fu)&&ov.test(e))throw this.Du('Document fields cannot begin and end with "__"')}},cl=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Po(e)}Fu(e,t,r,i=!1){return new al({fu:e,methodName:t,vu:r,path:pe.emptyPath(),yu:!1,Cu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function xo(n){let e=n._freezeSettings(),t=Po(n._databaseId);return new cl(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Rm(n,e,t,r,i,s={}){let o=n.Fu(s.merge||s.mergeFields?2:0,e,t,i);Fl("Data must be an object, but it was:",o,r);let c=km(r,o),u,h;if(s.merge)u=new Be(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){let f=[];for(let m of s.mergeFields){let w=ul(e,m,t);if(!o.contains(w))throw new N(P.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Nm(f,w)||f.push(w)}u=new Be(f),h=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=o.fieldTransforms;return new ol(new xe(c),u,h)}var wo=class n extends vi{_toFieldTransform(e){if(e.fu!==2)throw e.fu===1?e.Du(`${this._methodName}() can only appear at the top level of your update data`):e.Du(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};function Pm(n,e,t,r){let i=n.Fu(1,e,t);Fl("Data must be an object, but it was:",i,r);let s=[],o=xe.empty();En(r,(u,h)=>{let f=Ul(e,u,t);h=Z(h);let m=i.Su(f);if(h instanceof wo)s.push(f);else{let w=Ci(h,m);w!=null&&(s.push(f),o.set(f,w))}});let c=new Be(s);return new yo(o,c,i.fieldTransforms)}function Cm(n,e,t,r,i,s){let o=n.Fu(1,e,t),c=[ul(e,r,t)],u=[i];if(s.length%2!=0)throw new N(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<s.length;w+=2)c.push(ul(e,s[w])),u.push(s[w+1]);let h=[],f=xe.empty();for(let w=c.length-1;w>=0;--w)if(!Nm(h,c[w])){let R=c[w],D=u[w];D=Z(D);let O=o.Su(R);if(D instanceof wo)h.push(R);else{let k=Ci(D,O);k!=null&&(h.push(R),f.set(R,k))}}let m=new Be(h);return new yo(f,m,o.fieldTransforms)}function av(n,e,t,r=!1){return Ci(t,n.Fu(r?4:3,e))}function Ci(n,e){if(Dm(n=Z(n)))return Fl("Unsupported field value:",e,n),km(n,e);if(n instanceof vi)return function(r,i){if(!Sm(i.fu))throw i.Du(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Du(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.yu&&e.fu!==4)throw e.Du("Nested arrays are not supported");return function(r,i){let s=[],o=0;for(let c of r){let u=Ci(c,i.bu(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=Z(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Kw(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=le.fromDate(r);return{timestampValue:lr(i.serializer,s)}}if(r instanceof le){let s=new le(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:lr(i.serializer,s)}}if(r instanceof Ei)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ii)return{bytesValue:Fp(i.serializer,r._byteString)};if(r instanceof Me){let s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Du(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Sl(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i.Du(`Unsupported field value: ${No(r)}`)}(n,e)}function km(n,e){let t={};return fp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):En(n,(r,i)=>{let s=Ci(i,e.pu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Dm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof le||n instanceof Ei||n instanceof Ii||n instanceof Me||n instanceof vi)}function Fl(n,e,t){if(!Dm(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=No(t);throw r==="an object"?e.Du(n+" a custom object"):e.Du(n+" "+r)}}function ul(n,e,t){if((e=Z(e))instanceof vn)return e._internalPath;if(typeof e=="string")return Ul(n,e);throw Io("Field path arguments must be of type string or ",n,!1,void 0,t)}var cv=new RegExp("[~\\*/\\[\\]]");function Ul(n,e,t){if(e.search(cv)>=0)throw Io(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new vn(...e.split("."))._internalPath}catch{throw Io(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Io(n,e,t,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new N(P.INVALID_ARGUMENT,c+n+u)}function Nm(n,e){return n.some(t=>t.isEqual(e))}var vo=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Me(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new ll(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Vo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},ll=class extends vo{data(){return super.data()}};function Vo(n,e){return typeof e=="string"?Ul(n,e):e instanceof vn?e._internalPath:e._delegate._internalPath}function Om(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var Ti=class{},bi=class extends Ti{};function uv(n,e,...t){let r=[];e instanceof Ti&&r.push(e),r=r.concat(t),function(s){let o=s.filter(u=>u instanceof hl).length,c=s.filter(u=>u instanceof Eo).length;if(o>1||o>0&&c>0)throw new N(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var Eo=class n extends bi{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return xm(e._query,t),new mt(e.firestore,e.converter,Qc(e._query,t))}_parse(e){let t=xo(e.firestore);return function(s,o,c,u,h,f,m){let w;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new N(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){tp(m,f);let R=[];for(let D of m)R.push(ep(u,s,D));w={arrayValue:{values:R}}}else w=ep(u,s,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||tp(m,f),w=av(c,o,m,f==="in"||f==="not-in");return Q.create(h,f,w)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function lv(n,e,t){let r=e,i=Vo("where",n);return Eo._create(i,r,t)}var hl=class n extends Ti{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ee.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i,c=s.getFlattenedFilters();for(let u of c)xm(o,u),o=Qc(o,u)}(e._query,t),new mt(e.firestore,e.converter,Qc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var dl=class n extends bi{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=function(i,s,o){if(i.startAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new pn(s,o)}(e._query,this._field,this._direction);return new mt(e.firestore,e.converter,function(i,s){let o=i.explicitOrderBy.concat([s]);return new Ft(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}};function hv(n,e="asc"){let t=e,r=Vo("orderBy",n);return dl._create(r,t)}var fl=class n extends bi{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new mt(e.firestore,e.converter,Ls(e._query,this._limit,this._limitType))}};function dv(n){return nv("limit",n),fl._create("limit",n,"F")}function ep(n,e,t){if(typeof(t=Z(t))=="string"){if(t==="")throw new N(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ep(e)&&t.indexOf("/")!==-1)throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(te.fromString(t));if(!V.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ci(n,new V(r))}if(t instanceof Me)return ci(n,t._key);throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${No(t)}.`)}function tp(n,e){if(!Array.isArray(n)||n.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function xm(n,e){let t=function(i,s){for(let o of i)for(let c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var pl=class{convertValue(e,t="none"){switch(fn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Vt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw L()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return En(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new Ei(ce(e.latitude),ce(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=Tl(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(oi(e));default:return null}}convertTimestamp(e){let t=pt(e);return new le(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=te.fromString(e);q(Wp(r));let i=new sr(r.get(1),r.get(3)),s=new V(r.popFirst(5));return i.isEqual(t)||ue(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function Vm(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var un=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},To=class extends vo{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new tr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Vo("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},tr=class extends To{data(e={}){return super.data(e)}},bo=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new un(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new tr(this._firestore,this._userDataWriter,r.key,r,new un(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{let u=new tr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new un(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let u=new tr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new un(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:fv(c.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function fv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}var Ai=class extends pl{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ii(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Me(this.firestore,null,t)}};function pv(n){n=Je(n,mt);let e=Je(n.firestore,st),t=Oo(e),r=new Ai(e);return Om(n._query),ev(t,n._query).then(i=>new bo(e,r,n,i))}function mv(n,e,t){n=Je(n,Me);let r=Je(n.firestore,st),i=Vm(n.converter,e,t);return Lo(r,[Rm(xo(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Ce.none())])}function gv(n,e,t,...r){n=Je(n,Me);let i=Je(n.firestore,st),s=xo(i),o;return o=typeof(e=Z(e))=="string"||e instanceof vn?Cm(s,"updateDoc",n._key,e,t,r):Pm(s,"updateDoc",n._key,e),Lo(i,[o.toMutation(n._key,Ce.exists(!0))])}function _v(n){return Lo(Je(n.firestore,st),[new yn(n._key,Ce.none())])}function yv(n,...e){var t,r,i;n=Z(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Zf(e[o])||(s=e[o],o++);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Zf(e[o])){let m=e[o];e[o]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let u,h,f;if(n instanceof Me)h=Je(n.firestore,st),f=So(n._key.path),u={next:m=>{e[o]&&e[o](wv(h,n,m))},error:e[o+1],complete:e[o+2]};else{let m=Je(n,mt);h=Je(m.firestore,st),f=m._query;let w=new Ai(h);u={next:R=>{e[o]&&e[o](new bo(h,w,m,R))},error:e[o+1],complete:e[o+2]},Om(n._query)}return function(w,R,D,O){let k=new go(O),z=new ho(R,k,D);return w.asyncQueue.enqueueAndForget(async()=>gm(await il(w),z)),()=>{k.$a(),w.asyncQueue.enqueueAndForget(async()=>_m(await il(w),z))}}(Oo(h),f,c,u)}function Lo(n,e){return function(r,i){let s=new Qe;return r.asyncQueue.enqueueAndForget(async()=>MI(await ZI(r),i,s)),s.promise}(Oo(n),e)}function wv(n,e,t){let r=t.docs.get(e._key),i=new Ai(n);return new To(n,i,e._key,r,new un(t.hasPendingWrites,t.fromCache),e.converter)}var ml=class{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=vv(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}};function Iv(n){return new ml(n)}var gl=class{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=new yi,this._offlineComponentProvider=new mo(this._onlineComponentProvider,e?.cacheSizeBytes,this.forceOwnership)}},_l=class{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=new yi,this._offlineComponentProvider=new nl(this._onlineComponentProvider,e?.cacheSizeBytes)}};function vv(n){return new gl(n?.forceOwnership)}function Ev(){return new _l}var yl=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=xo(e)}set(e,t,r){this._verifyNotCommitted();let i=Tc(e,this._firestore),s=Vm(i.converter,t,r),o=Rm(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Ce.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=Tc(e,this._firestore),o;return o=typeof(t=Z(t))=="string"||t instanceof vn?Cm(this._dataReader,"WriteBatch.update",s._key,t,r,i):Pm(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Ce.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=Tc(e,this._firestore);return this._mutations=this._mutations.concat(new yn(t._key,Ce.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function Tc(n,e){if((n=Z(n)).firestore!==e)throw new N(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function Tv(n){return Oo(n=Je(n,st)),new yl(n,e=>Lo(n,e))}(function(e,t=!0){(function(i){_r=i})(Pt),Fe(new me("firestore",(r,{instanceIdentifier:i,options:s})=>{let o=r.getProvider("app").getImmediate(),c=new st(new Sc(r.getProvider("auth-internal")),new kc(r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new sr(h.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),we(ef,"4.6.3",e),we(ef,"4.6.3","esm2017")})();function Mo(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Xm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Zm=Xm,eg=new qe("auth","Firebase",Xm());var zo=new St("@firebase/auth");function bv(n,...e){zo.logLevel<=W.WARN&&zo.warn(`Auth (${Pt}): ${n}`,...e)}function Uo(n,...e){zo.logLevel<=W.ERROR&&zo.error(`Auth (${Pt}): ${n}`,...e)}function Xe(n,...e){throw oh(n,...e)}function at(n,...e){return oh(n,...e)}function tg(n,e,t){let r=Object.assign(Object.assign({},Zm()),{[e]:t});return new qe("auth","Firebase",r).create(e,{appName:n.name})}function _t(n){return tg(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function oh(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return eg.create(n,...e)}function F(n,e,...t){if(!n)throw oh(e,...t)}function ot(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Uo(e),new Error(e)}function yt(n,e){n||ot(e)}function jl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Av(){return Lm()==="http:"||Lm()==="https:"}function Lm(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function Sv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Av()||Nd()||"connection"in navigator)?navigator.onLine:!0}function Rv(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var bn=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,yt(t>e,"Short delay should be less than long delay!"),this.isMobile=Dd()||Od()}get(){return Sv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function ah(n,e){yt(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Go=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ot("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ot("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ot("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Pv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Cv=new bn(3e4,6e4);function fe(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ee(n,e,t,r,i={}){return ng(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});let c=Fn(Object.assign({key:n.config.apiKey},o)).slice(1),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode),Go.fetch()(rg(n,n.config.apiHost,t,c),Object.assign({method:e,headers:u,referrerPolicy:"no-referrer"},s))})}async function ng(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},Pv),e);try{let i=new zl(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw ki(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let c=s.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ki(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ki(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw ki(n,"user-disabled",o);let f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw tg(n,f,h);Xe(n,f)}}catch(i){if(i instanceof Oe)throw i;Xe(n,"network-request-failed",{message:String(i)})}}async function Ht(n,e,t,r,i={}){let s=await Ee(n,e,t,r,i);return"mfaPendingCredential"in s&&Xe(n,"multi-factor-auth-required",{_serverResponse:s}),s}function rg(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?ah(n.config,i):`${n.config.apiScheme}://${i}`}function kv(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var zl=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(at(this.auth,"network-request-failed")),Cv.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function ki(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=at(n,e,r);return i.customData._tokenResponse=t,i}function Mm(n){return n!==void 0&&n.enterprise!==void 0}var Gl=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return kv(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function Dv(n,e){return Ee(n,"GET","/v2/recaptchaConfig",fe(n,e))}async function Nv(n,e){return Ee(n,"POST","/v1/accounts:delete",e)}async function ig(n,e){return Ee(n,"POST","/v1/accounts:lookup",e)}function Di(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function sg(n,e=!1){let t=Z(n),r=await t.getIdToken(e),i=ch(r);F(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Di(ql(i.auth_time)),issuedAtTime:Di(ql(i.iat)),expirationTime:Di(ql(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function ql(n){return Number(n)*1e3}function ch(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Uo("JWT malformed, contained fewer than 3 sections"),null;try{let i=Ha(t);return i?JSON.parse(i):(Uo("Failed to decode base64 JWT payload"),null)}catch(i){return Uo("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Fm(n){let e=ch(n);return F(e,"internal-error"),F(typeof e.exp<"u","internal-error"),F(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Oi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Oe&&Ov(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Ov({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Kl=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var xi=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Di(this.lastLoginAt),this.creationTime=Di(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Ko(n){var e;let t=n.auth,r=await n.getIdToken(),i=await Oi(n,ig(t,{idToken:r}));F(i?.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ag(s.providerUserInfo):[],c=xv(n.providerData,o),u=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!c?.length,f=u?h:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new xi(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,m)}async function og(n){let e=Z(n);await Ko(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function xv(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ag(n){return n.map(e=>{var{providerId:t}=e,r=Mo(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function Vv(n,e){let t=await ng(n,{},async()=>{let r=Fn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=rg(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Go.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Lv(n,e){return Ee(n,"POST","/v2/accounts:revokeToken",fe(n,e))}var Ni=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken<"u","internal-error"),F(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Fm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){F(e.length!==0,"internal-error");let t=Fm(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(F(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await Vv(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new n;return r&&(F(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(F(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(F(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return ot("not implemented")}};function $t(n,e){F(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var vr=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Mo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Kl(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new xi(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Oi(this,this.stsTokenManager.getToken(this.auth,e));return F(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return sg(this,e)}reload(){return og(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ko(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(We(this.auth.app))return Promise.reject(_t(this.auth));let e=await this.getIdToken();return await Oi(this,Nv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,c,u,h,f;let m=(r=t.displayName)!==null&&r!==void 0?r:void 0,w=(i=t.email)!==null&&i!==void 0?i:void 0,R=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,D=(o=t.photoURL)!==null&&o!==void 0?o:void 0,O=(c=t.tenantId)!==null&&c!==void 0?c:void 0,k=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,z=(h=t.createdAt)!==null&&h!==void 0?h:void 0,j=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:U,emailVerified:H,isAnonymous:Y,providerData:G,stsTokenManager:I}=t;F(U&&I,e,"internal-error");let g=Ni.fromJSON(this.name,I);F(typeof U=="string",e,"internal-error"),$t(m,e.name),$t(w,e.name),F(typeof H=="boolean",e,"internal-error"),F(typeof Y=="boolean",e,"internal-error"),$t(R,e.name),$t(D,e.name),$t(O,e.name),$t(k,e.name),$t(z,e.name),$t(j,e.name);let y=new n({uid:U,auth:e,email:w,emailVerified:H,displayName:m,isAnonymous:Y,photoURL:D,phoneNumber:R,tenantId:O,stsTokenManager:g,createdAt:z,lastLoginAt:j});return G&&Array.isArray(G)&&(y.providerData=G.map(v=>Object.assign({},v))),k&&(y._redirectEventId=k),y}static async _fromIdTokenResponse(e,t,r=!1){let i=new Ni;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ko(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];F(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?ag(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,c=new Ni;c.updateFromIdToken(r);let u=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new xi(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(u,h),u}};var Um=new Map;function gt(n){yt(n instanceof Function,"Expected a class definition");let e=Um.get(n);return e?(yt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Um.set(n,e),e)}var $o=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};$o.type="NONE";var $l=$o;function qo(n,e,t){return`firebase:${n}:${e}:${t}`}var Ho=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=qo(this.userKey,i.apiKey,s),this.fullPersistenceKey=qo("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?vr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(gt($l),e,r);let i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h),s=i[0]||gt($l),o=qo(r,e.config.apiKey,e.name),c=null;for(let h of t)try{let f=await h._get(o);if(f){let m=vr._fromJSON(e,f);h!==s&&(c=m),s=h;break}}catch{}let u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new n(s,e,r):(s=u[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new n(s,e,r))}};function qm(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(lg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(cg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(dg(e))return"Blackberry";if(fg(e))return"Webos";if(uh(e))return"Safari";if((e.includes("chrome/")||ug(e))&&!e.includes("edge/"))return"Chrome";if(hg(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function cg(n=ae()){return/firefox\//i.test(n)}function uh(n=ae()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ug(n=ae()){return/crios\//i.test(n)}function lg(n=ae()){return/iemobile/i.test(n)}function hg(n=ae()){return/android/i.test(n)}function dg(n=ae()){return/blackberry/i.test(n)}function fg(n=ae()){return/webos/i.test(n)}function da(n=ae()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Mv(n=ae()){var e;return da(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Fv(){return xd()&&document.documentMode===10}function pg(n=ae()){return da(n)||hg(n)||fg(n)||dg(n)||/windows phone/i.test(n)||lg(n)}function Uv(){try{return!!(window&&window!==window.top)}catch{return!1}}function mg(n,e=[]){let t;switch(n){case"Browser":t=qm(ae());break;case"Worker":t=`${qm(ae())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Pt}/${r}`}var Hl=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((o,c)=>{try{let u=e(s);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function qv(n,e={}){return Ee(n,"GET","/v2/passwordPolicy",fe(n,e))}var Bv=6,Wl=class{constructor(e){var t,r,i,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Bv,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,c;let u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Ql=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Wo(this),this.idTokenSubscription=new Wo(this),this.beforeStateQueue=new Hl(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=eg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=gt(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ho.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await ig(this,{idToken:e}),r=await vr._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(We(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&u?.user&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ko(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Rv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(We(this.app))return Promise.reject(_t(this));let t=e?Z(e):null;return t&&F(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return We(this.app)?Promise.reject(_t(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return We(this.app)?Promise.reject(_t(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(gt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await qv(this),t=new Wl(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new qe("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Lv(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&gt(e)||this._popupRedirectResolver;F(t,this,"argument-error"),this.redirectPersistenceManager=await Ho.create(this,[gt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let u=e.addObserver(t,r,i);return()=>{o=!0,u()}}else{let u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=mg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&bv(`Error while retrieving App Check token: ${t.error}`),t?.token}};function wt(n){return Z(n)}var Wo=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Md(t=>this.observer=t)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var fa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function jv(n){fa=n}function gg(n){return fa.loadJS(n)}function zv(){return fa.recaptchaEnterpriseScript}function Gv(){return fa.gapiScript}function _g(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var Kv="recaptcha-enterprise",$v="NO_RECAPTCHA",Jl=class{constructor(e){this.type=Kv,this.auth=wt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{Dv(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let h=new Gl(u);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function i(s,o,c){let u=window.grecaptcha;Mm(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(h=>{o(h)}).catch(()=>{o($v)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(c=>{if(!t&&Mm(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=zv();u.length!==0&&(u+=c),gg(u).then(()=>{i(c,s,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}};async function Bm(n,e,t,r=!1){let i=new Jl(n),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Qo(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await Bm(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let o=await Bm(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}function yg(n,e){let t=Ze(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(At(s,e??{}))return i;Xe(i,"already-initialized")}return t.initialize({options:e})}function Hv(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(gt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function wg(n,e,t){let r=wt(n);F(r._canInitEmulator,r,"emulator-config-failed"),F(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!t?.disableWarnings,s=Ig(e),{host:o,port:c}=Wv(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Qv()}function Ig(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Wv(n){let e=Ig(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:jm(r.substr(s.length+1))}}else{let[s,o]=r.split(":");return{host:s,port:jm(o)}}}function jm(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Qv(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var An=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ot("not implemented")}_getIdTokenResponse(e){return ot("not implemented")}_linkToIdToken(e,t){return ot("not implemented")}_getReauthenticationResolver(e){return ot("not implemented")}};async function Jv(n,e){return Ee(n,"POST","/v1/accounts:signUp",e)}async function Yv(n,e){return Ht(n,"POST","/v1/accounts:signInWithPassword",fe(n,e))}async function vg(n,e){return Ee(n,"POST","/v1/accounts:sendOobCode",fe(n,e))}async function Xv(n,e){return vg(n,e)}async function Zv(n,e){return vg(n,e)}async function eE(n,e){return Ht(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}async function tE(n,e){return Ht(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}var Vi=class n extends An{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Qo(e,t,"signInWithPassword",Yv);case"emailLink":return eE(e,{email:this._email,oobCode:this._password});default:Xe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Qo(e,r,"signUpPassword",Jv);case"emailLink":return tE(e,{idToken:t,email:this._email,oobCode:this._password});default:Xe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Ir(n,e){return Ht(n,"POST","/v1/accounts:signInWithIdp",fe(n,e))}var nE="http://localhost",Sn=class n extends An{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Xe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Mo(t,["providerId","signInMethod"]);if(!r||!i)return null;let o=new n(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return Ir(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,Ir(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Ir(e,t)}buildRequest(){let e={requestUri:nE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Fn(t)}return e}};async function rE(n,e){return Ee(n,"POST","/v1/accounts:sendVerificationCode",fe(n,e))}async function iE(n,e){return Ht(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e))}async function sE(n,e){let t=await Ht(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e));if(t.temporaryProof)throw ki(n,"account-exists-with-different-credential",t);return t}var oE={USER_NOT_FOUND:"user-not-found"};async function aE(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Ht(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,t),oE)}var Li=class n extends An{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return iE(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return sE(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return aE(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function cE(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function uE(n){let e=Un(qn(n)).link,t=e?Un(qn(e)).deep_link_id:null,r=Un(qn(n)).deep_link_id;return(r?Un(qn(r)).link:null)||r||t||e||n}var Jo=class n{constructor(e){var t,r,i,s,o,c;let u=Un(qn(e)),h=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,m=cE((i=u.mode)!==null&&i!==void 0?i:null);F(h&&f&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=f,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=uE(e);try{return new n(t)}catch{return null}}};var Rn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Vi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Jo.parseLink(t);return F(r,"argument-error"),Vi._fromEmailAndCode(e,r.code,r.tenantId)}};Rn.PROVIDER_ID="password";Rn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Rn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Yo=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var Pn=class extends Yo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Mi=class n extends Pn{constructor(){super("facebook.com")}static credential(e){return Sn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Mi.FACEBOOK_SIGN_IN_METHOD="facebook.com";Mi.PROVIDER_ID="facebook.com";var Fi=class n extends Pn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Sn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};Fi.GOOGLE_SIGN_IN_METHOD="google.com";Fi.PROVIDER_ID="google.com";var Ui=class n extends Pn{constructor(){super("github.com")}static credential(e){return Sn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Ui.GITHUB_SIGN_IN_METHOD="github.com";Ui.PROVIDER_ID="github.com";var qi=class n extends Pn{constructor(){super("twitter.com")}static credential(e,t){return Sn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};qi.TWITTER_SIGN_IN_METHOD="twitter.com";qi.PROVIDER_ID="twitter.com";async function lE(n,e){return Ht(n,"POST","/v1/accounts:signUp",fe(n,e))}var Er=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await vr._fromIdTokenResponse(e,r,i),o=zm(r);return new n({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=zm(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function zm(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Yl=class n extends Oe{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function Eg(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Yl._fromErrorAndOperation(n,s,e,r):s})}async function hE(n,e,t=!1){let r=await Oi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Er._forOperation(n,"link",r)}async function dE(n,e,t=!1){let{auth:r}=n;if(We(r.app))return Promise.reject(_t(r));let i="reauthenticate";try{let s=await Oi(n,Eg(r,i,e,n),t);F(s.idToken,r,"internal-error");let o=ch(s.idToken);F(o,r,"internal-error");let{sub:c}=o;return F(n.uid===c,r,"user-mismatch"),Er._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&Xe(r,"user-mismatch"),s}}async function Tg(n,e,t=!1){if(We(n.app))return Promise.reject(_t(n));let r="signIn",i=await Eg(n,r,e),s=await Er._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function bg(n,e){return Tg(wt(n),e)}function Ag(n,e,t){var r;F(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),F(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(F(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(F(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}async function Sg(n){let e=wt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Rg(n,e,t){let r=wt(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Ag(r,i,t),await Qo(r,i,"getOobCode",Zv)}async function Pg(n,e,t){if(We(n.app))return Promise.reject(_t(n));let r=wt(n),o=await Qo(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",lE).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Sg(n),u}),c=await Er._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function Cg(n,e,t){return We(n.app)?Promise.reject(_t(n)):bg(Z(n),Rn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Sg(n),r})}async function kg(n,e){let t=Z(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Ag(t.auth,i,e);let{email:s}=await Xv(t.auth,i);s!==n.email&&await n.reload()}function Dg(n,e,t,r){return Z(n).onIdTokenChanged(e,t,r)}function Ng(n,e,t){return Z(n).beforeAuthStateChanged(e,t)}function Og(n,e,t,r){return Z(n).onAuthStateChanged(e,t,r)}function xg(n){return Z(n).signOut()}function fE(n,e){return Ee(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function pE(n,e){return Ee(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}function mE(n,e){return Ee(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function gE(n,e){return Ee(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}var Xo="__sak";var Zo=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Xo,"1"),this.storage.removeItem(Xo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function _E(){let n=ae();return uh(n)||da(n)}var yE=1e3,wE=10,ea=class extends Zo{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=_E()&&Uv(),this.fallbackToPolling=pg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}let r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}let i=()=>{let o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Fv()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,wE):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},yE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};ea.type="LOCAL";var Vg=ea;var ta=class extends Zo{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};ta.type="SESSION";var lh=ta;function IE(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var na=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(o).map(async h=>h(t.origin,s)),u=await IE(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};na.receivers=[];function hh(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Xl=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,u)=>{let h=hh("",20);i.port1.start();let f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(m){let w=m;if(w.data.eventId===h)switch(w.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(w.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function ct(){return window}function vE(n){ct().location.href=n}function Lg(){return typeof ct().WorkerGlobalScope<"u"&&typeof ct().importScripts=="function"}async function EE(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function TE(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function bE(){return Lg()?self:null}var Mg="firebaseLocalStorageDb",AE=1,ra="firebaseLocalStorage",Fg="fbase_key",Cn=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function pa(n,e){return n.transaction([ra],e?"readwrite":"readonly").objectStore(ra)}function SE(){let n=indexedDB.deleteDatabase(Mg);return new Cn(n).toPromise()}function Zl(){let n=indexedDB.open(Mg,AE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(ra,{keyPath:Fg})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(ra)?e(r):(r.close(),await SE(),e(await Zl()))})})}async function Gm(n,e,t){let r=pa(n,!0).put({[Fg]:e,value:t});return new Cn(r).toPromise()}async function RE(n,e){let t=pa(n,!1).get(e),r=await new Cn(t).toPromise();return r===void 0?null:r.value}function Km(n,e){let t=pa(n,!0).delete(e);return new Cn(t).toPromise()}var PE=800,CE=3,ia=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Zl(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>CE)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Lg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=na._getInstance(bE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await EE(),!this.activeServiceWorker)return;this.sender=new Xl(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||TE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Zl();return await Gm(e,Xo,"1"),await Km(e,Xo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Gm(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>RE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Km(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=pa(i,!1).getAll();return new Cn(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),PE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};ia.type="LOCAL";var Ug=ia;function kE(n,e){return Ee(n,"POST","/v2/accounts/mfaSignIn:start",fe(n,e))}function DE(n,e){return Ee(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}function NE(n,e){return Ee(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}var zA=_g("rcb"),GA=new bn(3e4,6e4);var OE="recaptcha";async function xE(n,e,t){var r;let i=await t.verify();try{F(typeof i=="string",n,"argument-error"),F(t.type===OE,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let o=s.session;if("phoneNumber"in s)return F(o.type==="enroll",n,"internal-error"),(await fE(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{F(o.type==="signin",n,"internal-error");let c=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return F(c,n,"missing-multi-factor-info"),(await kE(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await rE(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}var Bi=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=wt(e)}verifyPhoneNumber(e,t){return xE(this.auth,e,Z(t))}static credential(e,t){return Li._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Li._fromTokenResponse(t,r):null}};Bi.PROVIDER_ID="phone";Bi.PHONE_SIGN_IN_METHOD="phone";function VE(n,e){return e?gt(e):(F(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var ji=class extends An{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ir(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ir(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ir(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function LE(n){return Tg(n.auth,new ji(n),n.bypassAuthState)}function ME(n){let{auth:e,user:t}=n;return F(t,e,"internal-error"),dE(t,new ji(n),n.bypassAuthState)}async function FE(n){let{auth:e,user:t}=n;return F(t,e,"internal-error"),hE(t,new ji(n),n.bypassAuthState)}var sa=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}let u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return LE;case"linkViaPopup":case"linkViaRedirect":return FE;case"reauthViaPopup":case"reauthViaRedirect":return ME;default:Xe(this.auth,"internal-error")}}resolve(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var UE=new bn(2e3,1e4);var eh=class n extends sa{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){yt(this.filter.length===1,"Popup operations only handle one event");let e=hh();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(at(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(at(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(at(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,UE.get())};e()}};eh.currentPopupAction=null;var qE="pendingRedirect",Bo=new Map,th=class extends sa{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Bo.get(this.auth._key());if(!e){try{let r=await BE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Bo.set(this.auth._key(),e)}return this.bypassAuthState||Bo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function BE(n,e){let t=GE(e),r=zE(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function jE(n,e){Bo.set(n._key(),e)}function zE(n){return gt(n._redirectPersistence)}function GE(n){return qo(qE,n.config.apiKey,n.name)}async function KE(n,e,t=!1){if(We(n.app))return Promise.reject(_t(n));let r=wt(n),i=VE(r,e),o=await new th(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var $E=10*60*1e3,nh=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!HE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!qg(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(at(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=$E&&this.cachedEventUids.clear(),this.cachedEventUids.has($m(e))}saveEventToCache(e){this.cachedEventUids.add($m(e)),this.lastProcessedEventTime=Date.now()}};function $m(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function qg({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function HE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return qg(n);default:return!1}}async function WE(n,e={}){return Ee(n,"GET","/v1/projects",e)}var QE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,JE=/^https?/;async function YE(n){if(n.config.emulator)return;let{authorizedDomains:e}=await WE(n);for(let t of e)try{if(XE(t))return}catch{}Xe(n,"unauthorized-domain")}function XE(n){let e=jl(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!JE.test(t))return!1;if(QE.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var ZE=new bn(3e4,6e4);function Hm(){let n=ct().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function eT(n){return new Promise((e,t)=>{var r,i,s;function o(){Hm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Hm(),t(at(n,"network-request-failed"))},timeout:ZE.get()})}if(!((i=(r=ct().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=ct().gapi)===null||s===void 0)&&s.load)o();else{let c=_g("iframefcb");return ct()[c]=()=>{gapi.load?o():t(at(n,"network-request-failed"))},gg(`${Gv()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw jo=null,e})}var jo=null;function tT(n){return jo=jo||eT(n),jo}var nT=new bn(5e3,15e3),rT="__/auth/iframe",iT="emulator/auth/iframe",sT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},oT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function aT(n){let e=n.config;F(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?ah(e,iT):`https://${n.config.authDomain}/${rT}`,r={apiKey:e.apiKey,appName:n.name,v:Pt},i=oT.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Fn(r).slice(1)}`}async function cT(n){let e=await tT(n),t=ct().gapi;return F(t,n,"internal-error"),e.open({where:document.body,url:aT(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:sT,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let o=at(n,"network-request-failed"),c=ct().setTimeout(()=>{s(o)},nT.get());function u(){ct().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(o)})}))}var uT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},lT=500,hT=600,dT="_blank",fT="http://localhost",oa=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function pT(n,e,t,r=lT,i=hT){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",u=Object.assign(Object.assign({},uT),{width:r.toString(),height:i.toString(),top:s,left:o}),h=ae().toLowerCase();t&&(c=ug(h)?dT:t),cg(h)&&(e=e||fT,u.scrollbars="yes");let f=Object.entries(u).reduce((w,[R,D])=>`${w}${R}=${D},`,"");if(Mv(h)&&c!=="_self")return mT(e||"",c),new oa(null);let m=window.open(e||"",c,f);F(m,n,"popup-blocked");try{m.focus()}catch{}return new oa(m)}function mT(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var gT="__/auth/handler",_T="emulator/auth/handler",yT=encodeURIComponent("fac");async function Wm(n,e,t,r,i,s){F(n.config.authDomain,n,"auth-domain-config-required"),F(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Pt,eventId:i};if(e instanceof Yo){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Ld(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[f,m]of Object.entries(s||{}))o[f]=m}if(e instanceof Pn){let f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);let c=o;for(let f of Object.keys(c))c[f]===void 0&&delete c[f];let u=await n._getAppCheckToken(),h=u?`#${yT}=${encodeURIComponent(u)}`:"";return`${wT(n)}?${Fn(c).slice(1)}${h}`}function wT({config:n}){return n.emulator?ah(n,_T):`https://${n.authDomain}/${gT}`}var Bl="webStorageSupport",rh=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=lh,this._completeRedirectFn=KE,this._overrideRedirectResult=jE}async _openPopup(e,t,r,i){var s;yt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await Wm(e,t,r,jl(),i);return pT(e,o,hh())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await Wm(e,t,r,jl(),i);return vE(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(yt(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await cT(e),r=new nh(e);return t.register("authEvent",i=>(F(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Bl,{type:Bl},i=>{var s;let o=(s=i?.[0])===null||s===void 0?void 0:s[Bl];o!==void 0&&t(!!o),Xe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=YE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return pg()||uh()||da()}},Bg=rh,aa=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return ot("unexpected MultiFactorSessionType")}}},ih=class n extends aa{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return pE(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return DE(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},ca=class{constructor(){}static assertion(e){return ih._fromCredential(e)}};ca.FACTOR_ID="phone";var ua=class{static assertionForEnrollment(e,t){return la._fromSecret(e,t)}static assertionForSignIn(e,t){return la._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;F(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let i=await mE(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return ha._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};ua.FACTOR_ID="totp";var la=class n extends aa{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return F(typeof this.secret<"u",e,"argument-error"),gE(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){F(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return NE(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},ha=class n{constructor(e,t,r,i,s,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(Fo(e)||Fo(t))&&(i=!0),i&&(Fo(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),Fo(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Fo(n){return typeof n>"u"||n?.length===0}var Qm="@firebase/auth",Jm="1.7.4";var sh=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function IT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function vT(n){Fe(new me("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:mg(n)},h=new Ql(r,i,s,u);return Hv(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Fe(new me("auth-internal",e=>{let t=wt(e.getProvider("auth").getImmediate());return(r=>new sh(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),we(Qm,Jm,IT(n)),we(Qm,Jm,"esm2017")}var ET=5*60,TT=Qa("authIdTokenMaxAge")||ET,Ym=null,bT=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>TT)return;let i=t?.token;Ym!==i&&(Ym=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function jg(n=Bn()){let e=Ze(n,"auth");if(e.isInitialized())return e.getImmediate();let t=yg(n,{popupRedirectResolver:Bg,persistence:[Ug,Vg,lh]}),r=Qa("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let o=bT(s.toString());Ng(t,o,()=>o(t.currentUser)),Dg(t,c=>o(c))}}let i=kd("auth");return i&&wg(t,`http://${i}`),t}function AT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}jv({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=at("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",AT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});vT("Browser");var Kg="@firebase/installations",mh="0.6.7";var $g=1e4,Hg=`w:${mh}`,Wg="FIS_v2",ST="https://firebaseinstallations.googleapis.com/v1",RT=60*60*1e3,PT="installations",CT="Installations";var kT={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Dn=new qe(PT,CT,kT);function Qg(n){return n instanceof Oe&&n.code.includes("request-failed")}function Jg({projectId:n}){return`${ST}/projects/${n}/installations`}function Yg(n){return{token:n.token,requestStatus:2,expiresIn:NT(n.expiresIn),creationTime:Date.now()}}async function Xg(n,e){let r=(await e.json()).error;return Dn.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Zg({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function DT(n,{refreshToken:e}){let t=Zg(n);return t.append("Authorization",OT(e)),t}async function e_(n){let e=await n();return e.status>=500&&e.status<600?n():e}function NT(n){return Number(n.replace("s","000"))}function OT(n){return`${Wg} ${n}`}async function xT({appConfig:n,heartbeatServiceProvider:e},{fid:t}){let r=Jg(n),i=Zg(n),s=e.getImmediate({optional:!0});if(s){let h=await s.getHeartbeatsHeader();h&&i.append("x-firebase-client",h)}let o={fid:t,authVersion:Wg,appId:n.appId,sdkVersion:Hg},c={method:"POST",headers:i,body:JSON.stringify(o)},u=await e_(()=>fetch(r,c));if(u.ok){let h=await u.json();return{fid:h.fid||t,registrationStatus:2,refreshToken:h.refreshToken,authToken:Yg(h.authToken)}}else throw await Xg("Create Installation",u)}function t_(n){return new Promise(e=>{setTimeout(e,n)})}function VT(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}var LT=/^[cdef][\w-]{21}$/,ph="";function MT(){try{let n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;let t=FT(n);return LT.test(t)?t:ph}catch{return ph}}function FT(n){return VT(n).substr(0,22)}function ga(n){return`${n.appName}!${n.appId}`}var n_=new Map;function r_(n,e){let t=ga(n);i_(t,e),UT(t,e)}function i_(n,e){let t=n_.get(n);if(t)for(let r of t)r(e)}function UT(n,e){let t=qT();t&&t.postMessage({key:n,fid:e}),BT()}var kn=null;function qT(){return!kn&&"BroadcastChannel"in self&&(kn=new BroadcastChannel("[Firebase] FID Change"),kn.onmessage=n=>{i_(n.data.key,n.data.fid)}),kn}function BT(){n_.size===0&&kn&&(kn.close(),kn=null)}var jT="firebase-installations-database",zT=1,Nn="firebase-installations-store",dh=null;function gh(){return dh||(dh=Zt(jT,zT,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Nn)}}})),dh}async function ma(n,e){let t=ga(n),i=(await gh()).transaction(Nn,"readwrite"),s=i.objectStore(Nn),o=await s.get(t);return await s.put(e,t),await i.done,(!o||o.fid!==e.fid)&&r_(n,e.fid),e}async function s_(n){let e=ga(n),r=(await gh()).transaction(Nn,"readwrite");await r.objectStore(Nn).delete(e),await r.done}async function _a(n,e){let t=ga(n),i=(await gh()).transaction(Nn,"readwrite"),s=i.objectStore(Nn),o=await s.get(t),c=e(o);return c===void 0?await s.delete(t):await s.put(c,t),await i.done,c&&(!o||o.fid!==c.fid)&&r_(n,c.fid),c}async function _h(n){let e,t=await _a(n.appConfig,r=>{let i=GT(r),s=KT(n,i);return e=s.registrationPromise,s.installationEntry});return t.fid===ph?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function GT(n){let e=n||{fid:MT(),registrationStatus:0};return o_(e)}function KT(n,e){if(e.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(Dn.create("app-offline"));return{installationEntry:e,registrationPromise:i}}let t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=$T(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:HT(n)}:{installationEntry:e}}async function $T(n,e){try{let t=await xT(n,e);return ma(n.appConfig,t)}catch(t){throw Qg(t)&&t.customData.serverCode===409?await s_(n.appConfig):await ma(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function HT(n){let e=await zg(n.appConfig);for(;e.registrationStatus===1;)await t_(100),e=await zg(n.appConfig);if(e.registrationStatus===0){let{installationEntry:t,registrationPromise:r}=await _h(n);return r||t}return e}function zg(n){return _a(n,e=>{if(!e)throw Dn.create("installation-not-found");return o_(e)})}function o_(n){return WT(n)?{fid:n.fid,registrationStatus:0}:n}function WT(n){return n.registrationStatus===1&&n.registrationTime+$g<Date.now()}async function QT({appConfig:n,heartbeatServiceProvider:e},t){let r=JT(n,t),i=DT(n,t),s=e.getImmediate({optional:!0});if(s){let h=await s.getHeartbeatsHeader();h&&i.append("x-firebase-client",h)}let o={installation:{sdkVersion:Hg,appId:n.appId}},c={method:"POST",headers:i,body:JSON.stringify(o)},u=await e_(()=>fetch(r,c));if(u.ok){let h=await u.json();return Yg(h)}else throw await Xg("Generate Auth Token",u)}function JT(n,{fid:e}){return`${Jg(n)}/${e}/authTokens:generate`}async function yh(n,e=!1){let t,r=await _a(n.appConfig,s=>{if(!a_(s))throw Dn.create("not-registered");let o=s.authToken;if(!e&&ZT(o))return s;if(o.requestStatus===1)return t=YT(n,e),s;{if(!navigator.onLine)throw Dn.create("app-offline");let c=tb(s);return t=XT(n,c),c}});return t?await t:r.authToken}async function YT(n,e){let t=await Gg(n.appConfig);for(;t.authToken.requestStatus===1;)await t_(100),t=await Gg(n.appConfig);let r=t.authToken;return r.requestStatus===0?yh(n,e):r}function Gg(n){return _a(n,e=>{if(!a_(e))throw Dn.create("not-registered");let t=e.authToken;return nb(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function XT(n,e){try{let t=await QT(n,e),r=Object.assign(Object.assign({},e),{authToken:t});return await ma(n.appConfig,r),t}catch(t){if(Qg(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await s_(n.appConfig);else{let r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await ma(n.appConfig,r)}throw t}}function a_(n){return n!==void 0&&n.registrationStatus===2}function ZT(n){return n.requestStatus===2&&!eb(n)}function eb(n){let e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+RT}function tb(n){let e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function nb(n){return n.requestStatus===1&&n.requestTime+$g<Date.now()}async function rb(n){let e=n,{installationEntry:t,registrationPromise:r}=await _h(e);return r?r.catch(console.error):yh(e).catch(console.error),t.fid}async function ib(n,e=!1){let t=n;return await sb(t),(await yh(t,e)).token}async function sb(n){let{registrationPromise:e}=await _h(n);e&&await e}function ob(n){if(!n||!n.options)throw fh("App Configuration");if(!n.name)throw fh("App Name");let e=["projectId","apiKey","appId"];for(let t of e)if(!n.options[t])throw fh(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function fh(n){return Dn.create("missing-app-config-values",{valueName:n})}var c_="installations",ab="installations-internal",cb=n=>{let e=n.getProvider("app").getImmediate(),t=ob(e),r=Ze(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},ub=n=>{let e=n.getProvider("app").getImmediate(),t=Ze(e,c_).getImmediate();return{getId:()=>rb(t),getToken:i=>ib(t,i)}};function lb(){Fe(new me(c_,cb,"PUBLIC")),Fe(new me(ab,ub,"PRIVATE"))}lb();we(Kg,mh);we(Kg,mh,"esm2017");var hb="/firebase-messaging-sw.js",db="/firebase-cloud-messaging-push-scope",m_="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",fb="https://fcmregistrations.googleapis.com/v1",g_="google.c.a.c_id",pb="google.c.a.c_l",mb="google.c.a.ts",gb="google.c.a.e",u_;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(u_||(u_={}));var zi;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(zi||(zi={}));function It(n){let e=new Uint8Array(n);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function _b(n){let e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(t),i=new Uint8Array(r.length);for(let s=0;s<r.length;++s)i[s]=r.charCodeAt(s);return i}var wh="fcm_token_details_db",yb=5,l_="fcm_token_object_Store";async function wb(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(s=>s.name).includes(wh))return null;let e=null;return(await Zt(wh,yb,{upgrade:async(r,i,s,o)=>{var c;if(i<2||!r.objectStoreNames.contains(l_))return;let u=o.objectStore(l_),h=await u.index("fcmSenderId").get(n);if(await u.clear(),!!h){if(i===2){let f=h;if(!f.auth||!f.p256dh||!f.endpoint)return;e={token:f.fcmToken,createTime:(c=f.createTime)!==null&&c!==void 0?c:Date.now(),subscriptionOptions:{auth:f.auth,p256dh:f.p256dh,endpoint:f.endpoint,swScope:f.swScope,vapidKey:typeof f.vapidKey=="string"?f.vapidKey:It(f.vapidKey)}}}else if(i===3){let f=h;e={token:f.fcmToken,createTime:f.createTime,subscriptionOptions:{auth:It(f.auth),p256dh:It(f.p256dh),endpoint:f.endpoint,swScope:f.swScope,vapidKey:It(f.vapidKey)}}}else if(i===4){let f=h;e={token:f.fcmToken,createTime:f.createTime,subscriptionOptions:{auth:It(f.auth),p256dh:It(f.p256dh),endpoint:f.endpoint,swScope:f.swScope,vapidKey:It(f.vapidKey)}}}}}})).close(),await fs(wh),await fs("fcm_vapid_details_db"),await fs("undefined"),Ib(e)?e:null}function Ib(n){if(!n||!n.subscriptionOptions)return!1;let{subscriptionOptions:e}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}var vb="firebase-messaging-database",Eb=1,Gi="firebase-messaging-store",Ih=null;function __(){return Ih||(Ih=Zt(vb,Eb,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Gi)}}})),Ih}async function Tb(n){let e=y_(n),r=await(await __()).transaction(Gi).objectStore(Gi).get(e);if(r)return r;{let i=await wb(n.appConfig.senderId);if(i)return await Th(n,i),i}}async function Th(n,e){let t=y_(n),i=(await __()).transaction(Gi,"readwrite");return await i.objectStore(Gi).put(e,t),await i.done,e}function y_({appConfig:n}){return n.appId}var bb={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ke=new qe("messaging","Messaging",bb);async function Ab(n,e){let t=await Ah(n),r=w_(e),i={method:"POST",headers:t,body:JSON.stringify(r)},s;try{s=await(await fetch(bh(n.appConfig),i)).json()}catch(o){throw ke.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(s.error){let o=s.error.message;throw ke.create("token-subscribe-failed",{errorInfo:o})}if(!s.token)throw ke.create("token-subscribe-no-token");return s.token}async function Sb(n,e){let t=await Ah(n),r=w_(e.subscriptionOptions),i={method:"PATCH",headers:t,body:JSON.stringify(r)},s;try{s=await(await fetch(`${bh(n.appConfig)}/${e.token}`,i)).json()}catch(o){throw ke.create("token-update-failed",{errorInfo:o?.toString()})}if(s.error){let o=s.error.message;throw ke.create("token-update-failed",{errorInfo:o})}if(!s.token)throw ke.create("token-update-no-token");return s.token}async function Rb(n,e){let r={method:"DELETE",headers:await Ah(n)};try{let s=await(await fetch(`${bh(n.appConfig)}/${e}`,r)).json();if(s.error){let o=s.error.message;throw ke.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw ke.create("token-unsubscribe-failed",{errorInfo:i?.toString()})}}function bh({projectId:n}){return`${fb}/projects/${n}/registrations`}async function Ah({appConfig:n,installations:e}){let t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function w_({p256dh:n,auth:e,endpoint:t,vapidKey:r}){let i={web:{endpoint:t,auth:e,p256dh:n}};return r!==m_&&(i.web.applicationPubKey=r),i}var Pb=7*24*60*60*1e3;async function Cb(n){let e=await Db(n.swRegistration,n.vapidKey),t={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:It(e.getKey("auth")),p256dh:It(e.getKey("p256dh"))},r=await Tb(n.firebaseDependencies);if(r){if(Nb(r.subscriptionOptions,t))return Date.now()>=r.createTime+Pb?kb(n,{token:r.token,createTime:Date.now(),subscriptionOptions:t}):r.token;try{await Rb(n.firebaseDependencies,r.token)}catch(i){console.warn(i)}return h_(n.firebaseDependencies,t)}else return h_(n.firebaseDependencies,t)}async function kb(n,e){try{let t=await Sb(n.firebaseDependencies,e),r=Object.assign(Object.assign({},e),{token:t,createTime:Date.now()});return await Th(n.firebaseDependencies,r),t}catch(t){throw t}}async function h_(n,e){let r={token:await Ab(n,e),createTime:Date.now(),subscriptionOptions:e};return await Th(n,r),r.token}async function Db(n,e){let t=await n.pushManager.getSubscription();return t||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:_b(e)})}function Nb(n,e){let t=e.vapidKey===n.vapidKey,r=e.endpoint===n.endpoint,i=e.auth===n.auth,s=e.p256dh===n.p256dh;return t&&r&&i&&s}function d_(n){let e={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return Ob(e,n),xb(e,n),Vb(e,n),e}function Ob(n,e){if(!e.notification)return;n.notification={};let t=e.notification.title;t&&(n.notification.title=t);let r=e.notification.body;r&&(n.notification.body=r);let i=e.notification.image;i&&(n.notification.image=i);let s=e.notification.icon;s&&(n.notification.icon=s)}function xb(n,e){e.data&&(n.data=e.data)}function Vb(n,e){var t,r,i,s,o;if(!e.fcmOptions&&!(!((t=e.notification)===null||t===void 0)&&t.click_action))return;n.fcmOptions={};let c=(i=(r=e.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&i!==void 0?i:(s=e.notification)===null||s===void 0?void 0:s.click_action;c&&(n.fcmOptions.link=c);let u=(o=e.fcmOptions)===null||o===void 0?void 0:o.analytics_label;u&&(n.fcmOptions.analyticsLabel=u)}function Lb(n){return typeof n=="object"&&!!n&&g_ in n}I_("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o");I_("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");function I_(n,e){let t=[];for(let r=0;r<n.length;r++)t.push(n.charAt(r)),r<e.length&&t.push(e.charAt(r));return t.join("")}function Mb(n){if(!n||!n.options)throw vh("App Configuration Object");if(!n.name)throw vh("App Name");let e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=n;for(let r of e)if(!t[r])throw vh(r);return{appName:n.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function vh(n){return ke.create("missing-app-config-values",{valueName:n})}var Eh=class{constructor(e,t,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;let i=Mb(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:r}}_delete(){return Promise.resolve()}};async function Fb(n){try{n.swRegistration=await navigator.serviceWorker.register(hb,{scope:db}),n.swRegistration.update().catch(()=>{})}catch(e){throw ke.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function Ub(n,e){if(!e&&!n.swRegistration&&await Fb(n),!(!e&&n.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw ke.create("invalid-sw-registration");n.swRegistration=e}}async function qb(n,e){e?n.vapidKey=e:n.vapidKey||(n.vapidKey=m_)}async function v_(n,e){if(!navigator)throw ke.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ke.create("permission-blocked");return await qb(n,e?.vapidKey),await Ub(n,e?.serviceWorkerRegistration),Cb(n)}async function Bb(n,e,t){let r=jb(e);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:t[g_],message_name:t[pb],message_time:t[mb],message_device_time:Math.floor(Date.now()/1e3)})}function jb(n){switch(n){case zi.NOTIFICATION_CLICKED:return"notification_open";case zi.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}async function zb(n,e){let t=e.data;if(!t.isFirebaseMessaging)return;n.onMessageHandler&&t.messageType===zi.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(d_(t)):n.onMessageHandler.next(d_(t)));let r=t.data;Lb(r)&&r[gb]==="1"&&await Bb(n,t.messageType,r)}var f_="@firebase/messaging",p_="0.12.9";var Gb=n=>{let e=new Eh(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>zb(e,t)),e},Kb=n=>{let e=n.getProvider("messaging").getImmediate();return{getToken:r=>v_(e,r)}};function $b(){Fe(new me("messaging",Gb,"PUBLIC")),Fe(new me("messaging-internal",Kb,"PRIVATE")),we(f_,p_),we(f_,p_,"esm2017")}async function E_(){try{await ls()}catch{return!1}return typeof window<"u"&&Mn()&&Vd()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function Hb(n,e){if(!navigator)throw ke.create("only-available-in-window");return n.onMessageHandler=e,()=>{n.onMessageHandler=null}}function Wb(n=Bn()){return E_().then(e=>{if(!e)throw ke.create("unsupported-browser")},e=>{throw ke.create("indexed-db-unsupported")}),Ze(Z(n),"messaging").getImmediate()}async function Qb(n,e){return n=Z(n),v_(n,e)}function Jb(n,e){return n=Z(n),Hb(n,e)}$b();export{Pg as createUserWithEmailAndPassword,_v as deleteDoc,E_ as fcmSupported,rv as fcol,iv as fdoc,pv as fgetDocs,dv as flimit,hv as forderBy,uv as fquery,yv as fsnap,lv as fwhere,jg as getAuth,Qb as getFcmToken,Wb as getMessaging,Qd as initializeApp,sv as initializeFirestore,Og as onAuthStateChanged,Jb as onFcmMessage,Iv as persistentLocalCache,Ev as persistentMultipleTabManager,kg as sendEmailVerification,Rg as sendPasswordResetEmail,mv as setDoc,Cg as signInWithEmailAndPassword,xg as signOut,gv as updateDoc,Tv as writeBatch};
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
   * in compliance with the License. You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under the License
   * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
   * or implied. See the License for the specific language governing permissions and limitations under
   * the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
