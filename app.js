var Dd=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Yg=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],o=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{let s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},kd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],o=i+1<n.length,c=o?n[i+1]:0,l=i+2<n.length,h=l?n[i+2]:0,p=s>>2,v=(s&3)<<4|c>>4,S=(c&15)<<2|h>>6,k=h&63;l||(k=64,o||(S=64)),r.push(t[p],t[v],t[S],t[k])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Dd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Yg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let h=i<n.length?t[n.charAt(i)]:64;++i;let v=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||h==null||v==null)throw new Ec;let S=s<<2|c>>4;if(r.push(S),h!==64){let k=c<<4&240|h>>2;if(r.push(k),v!==64){let F=h<<6&192|v;r.push(F)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Ec=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Jg=function(n){let e=Dd(n);return kd.encodeByteArray(e,!0)},Tc=function(n){return Jg(n).replace(/\./g,"")},Ac=function(n){try{return kd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Xg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Zg=()=>Xg().__FIREBASE_DEFAULTS__,e_=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},t_=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Ac(n[1]);return e&&JSON.parse(e)},fo=()=>{try{return Zg()||e_()||t_()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Nd=n=>{var e,t;return(t=(e=fo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]};var Sc=()=>{var n;return(n=fo())===null||n===void 0?void 0:n.config},Rc=n=>{var e;return(e=fo())===null||e===void 0?void 0:e[`_${n}`]};var ho=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Re(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Re())}function n_(){var n;let e=(n=fo())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Od(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Vd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ld(){let n=Re();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Pc(){return!n_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function po(){try{return typeof indexedDB=="object"}catch{return!1}}function Md(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var r_="FirebaseError",ht=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=r_,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ht.prototype.create)}},Ht=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?i_(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new ht(i,c,r)}};function i_(n,e){return n.replace(s_,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var s_=/\{\$([^}]+)}/g;function Fd(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function hn(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],o=e[i];if(Cd(s)&&Cd(o)){if(!hn(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function Cd(n){return n!==null&&typeof n=="object"}function kr(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Nr(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function xr(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function $d(n,e){let t=new bc(n,e);return t.subscribe.bind(t)}var bc=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");o_(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Ic),i.error===void 0&&(i.error=Ic),i.complete===void 0&&(i.complete=Ic);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function o_(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ic(){}var sE=4*60*60*1e3;function Te(n){return n&&n._delegate?n._delegate:n}var _t=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var qn="[DEFAULT]";var Cc=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new ho;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(c_(e))try{this.getOrInitializeService({instanceIdentifier:qn})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=qn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=qn){return this.instances.has(e)}getOptions(e=qn){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,o]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:a_(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=qn){return this.component?this.component.multipleInstances?e:qn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function a_(n){return n===qn?void 0:n}function c_(n){return n.instantiationMode==="EAGER"}var mo=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Cc(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var l_=[],ce;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ce||(ce={}));var u_={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},h_=ce.INFO,d_={[ce.DEBUG]:"log",[ce.VERBOSE]:"log",[ce.INFO]:"info",[ce.WARN]:"warn",[ce.ERROR]:"error"},f_=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=d_[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},dn=class{constructor(e){this.name=e,this._logLevel=h_,this._logHandler=f_,this._userLogHandler=null,l_.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?u_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ce.DEBUG,...e),this._logHandler(this,ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ce.VERBOSE,...e),this._logHandler(this,ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ce.INFO,...e),this._logHandler(this,ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ce.WARN,...e),this._logHandler(this,ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ce.ERROR,...e),this._logHandler(this,ce.ERROR,...e)}};var p_=(n,e)=>e.some(t=>n instanceof t),Ud,Bd;function m_(){return Ud||(Ud=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function g_(){return Bd||(Bd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var jd=new WeakMap,kc=new WeakMap,qd=new WeakMap,Dc=new WeakMap,xc=new WeakMap;function __(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Pt(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&jd.set(t,n)}).catch(()=>{}),xc.set(e,n),e}function y_(n){if(kc.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});kc.set(n,e)}var Nc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return kc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||qd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Pt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function zd(n){Nc=n(Nc)}function v_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(go(this),e,...t);return qd.set(r,e.sort?e.sort():[e]),Pt(r)}:g_().includes(n)?function(...e){return n.apply(go(this),e),Pt(jd.get(this))}:function(...e){return Pt(n.apply(go(this),e))}}function w_(n){return typeof n=="function"?v_(n):(n instanceof IDBTransaction&&y_(n),p_(n,m_())?new Proxy(n,Nc):n)}function Pt(n){if(n instanceof IDBRequest)return __(n);if(Dc.has(n))return Dc.get(n);let e=w_(n);return e!==n&&(Dc.set(n,e),xc.set(e,n)),e}var go=n=>xc.get(n);function Kd(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(n,e),c=Pt(o);return r&&o.addEventListener("upgradeneeded",l=>{r(Pt(o.result),l.oldVersion,l.newVersion,Pt(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}var I_=["get","getKey","getAll","getAllKeys","count"],E_=["put","add","delete","clear"],Oc=new Map;function Gd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Oc.get(e))return Oc.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=E_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||I_.includes(t)))return;let s=async function(o,...c){let l=this.transaction(o,i?"readwrite":"readonly"),h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),i&&l.done]))[0]};return Oc.set(e,s),s}zd(n=>({...n,get:(e,t,r)=>Gd(e,t)||n.get(e,t,r),has:(e,t)=>!!Gd(e,t)||n.has(e,t)}));var Lc=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(b_(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function b_(n){let e=n.getComponent();return e?.type==="VERSION"}var Mc="@firebase/app",Hd="0.10.5";var zn=new dn("@firebase/app"),T_="@firebase/app-compat",A_="@firebase/analytics-compat",S_="@firebase/analytics",R_="@firebase/app-check-compat",P_="@firebase/app-check",C_="@firebase/auth",D_="@firebase/auth-compat",k_="@firebase/database",N_="@firebase/database-compat",x_="@firebase/functions",O_="@firebase/functions-compat",V_="@firebase/installations",L_="@firebase/installations-compat",M_="@firebase/messaging",F_="@firebase/messaging-compat",$_="@firebase/performance",U_="@firebase/performance-compat",B_="@firebase/remote-config",j_="@firebase/remote-config-compat",q_="@firebase/storage",z_="@firebase/storage-compat",G_="@firebase/firestore",K_="@firebase/vertexai-preview",H_="@firebase/firestore-compat",W_="firebase",Q_="10.12.2";var Fc="[DEFAULT]",Y_={[Mc]:"fire-core",[T_]:"fire-core-compat",[S_]:"fire-analytics",[A_]:"fire-analytics-compat",[P_]:"fire-app-check",[R_]:"fire-app-check-compat",[C_]:"fire-auth",[D_]:"fire-auth-compat",[k_]:"fire-rtdb",[N_]:"fire-rtdb-compat",[x_]:"fire-fn",[O_]:"fire-fn-compat",[V_]:"fire-iid",[L_]:"fire-iid-compat",[M_]:"fire-fcm",[F_]:"fire-fcm-compat",[$_]:"fire-perf",[U_]:"fire-perf-compat",[B_]:"fire-rc",[j_]:"fire-rc-compat",[q_]:"fire-gcs",[z_]:"fire-gcs-compat",[G_]:"fire-fst",[H_]:"fire-fst-compat",[K_]:"fire-vertex","fire-js":"fire-js",[W_]:"fire-js-all"};var _o=new Map,J_=new Map,$c=new Map;function Wd(n,e){try{n.container.addComponent(e)}catch(t){zn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function pn(n){let e=n.name;if($c.has(e))return zn.debug(`There were multiple attempts to register component ${e}.`),!1;$c.set(e,n);for(let t of _o.values())Wd(t,n);for(let t of J_.values())Wd(t,n);return!0}function Bi(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function bt(n){return n.settings!==void 0}var X_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},fn=new Ht("app","Firebase",X_);var Uc=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new _t("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fn.create("app-deleted",{appName:this._name})}};var mn=Q_;function qc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:Fc,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw fn.create("bad-app-name",{appName:String(i)});if(t||(t=Sc()),!t)throw fn.create("no-options");let s=_o.get(i);if(s){if(hn(t,s.options)&&hn(r,s.config))return s;throw fn.create("duplicate-app",{appName:i})}let o=new mo(i);for(let l of $c.values())o.addComponent(l);let c=new Uc(t,r,o);return _o.set(i,c),c}function zc(n=Fc){let e=_o.get(n);if(!e&&n===Fc&&Sc())return qc();if(!e)throw fn.create("no-app",{appName:n});return e}function Et(n,e,t){var r;let i=(r=Y_[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),zn.warn(c.join(" "));return}pn(new _t(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var Z_="firebase-heartbeat-database",ey=1,Ui="firebase-heartbeat-store",Vc=null;function Xd(){return Vc||(Vc=Kd(Z_,ey,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ui)}catch(t){console.warn(t)}}}}).catch(n=>{throw fn.create("idb-open",{originalErrorMessage:n.message})})),Vc}async function ty(n){try{let t=(await Xd()).transaction(Ui),r=await t.objectStore(Ui).get(Zd(n));return await t.done,r}catch(e){if(e instanceof ht)zn.warn(e.message);else{let t=fn.create("idb-get",{originalErrorMessage:e?.message});zn.warn(t.message)}}}async function Qd(n,e){try{let r=(await Xd()).transaction(Ui,"readwrite");await r.objectStore(Ui).put(e,Zd(n)),await r.done}catch(t){if(t instanceof ht)zn.warn(t.message);else{let r=fn.create("idb-set",{originalErrorMessage:t?.message});zn.warn(r.message)}}}function Zd(n){return`${n.name}!${n.options.appId}`}var ny=1024,ry=30*24*60*60*1e3,Bc=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new jc(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Yd();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let c=new Date(o.date).valueOf();return Date.now()-c<=ry}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Yd(),{heartbeatsToSend:r,unsentEntries:i}=iy(this._heartbeatsCache.heartbeats),s=Tc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function Yd(){return new Date().toISOString().substring(0,10)}function iy(n,e=ny){let t=[],r=n.slice();for(let i of n){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Jd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Jd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var jc=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return po()?Md().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await ty(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Qd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Qd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function Jd(n){return Tc(JSON.stringify({version:2,heartbeats:n})).length}function sy(n){pn(new _t("platform-logger",e=>new Lc(e),"PRIVATE")),pn(new _t("heartbeat",e=>new Bc(e),"PRIVATE")),Et(Mc,Hd,n),Et(Mc,Hd,"esm2017"),Et("fire-js","")}sy("");var oy="firebase",ay="10.12.2";Et(oy,ay,"app");var ef=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},tf={};var gn,Gc;(function(){var n;function e(T,I){function b(){}b.prototype=I.prototype,T.D=I.prototype,T.prototype=new b,T.prototype.constructor=T,T.C=function(R,P,C){for(var E=Array(arguments.length-2),_e=2;_e<arguments.length;_e++)E[_e-2]=arguments[_e];return I.prototype[P].apply(R,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,I,b){b||(b=0);var R=Array(16);if(typeof I=="string")for(var P=0;16>P;++P)R[P]=I.charCodeAt(b++)|I.charCodeAt(b++)<<8|I.charCodeAt(b++)<<16|I.charCodeAt(b++)<<24;else for(P=0;16>P;++P)R[P]=I[b++]|I[b++]<<8|I[b++]<<16|I[b++]<<24;I=T.g[0],b=T.g[1],P=T.g[2];var C=T.g[3],E=I+(C^b&(P^C))+R[0]+3614090360&4294967295;I=b+(E<<7&4294967295|E>>>25),E=C+(P^I&(b^P))+R[1]+3905402710&4294967295,C=I+(E<<12&4294967295|E>>>20),E=P+(b^C&(I^b))+R[2]+606105819&4294967295,P=C+(E<<17&4294967295|E>>>15),E=b+(I^P&(C^I))+R[3]+3250441966&4294967295,b=P+(E<<22&4294967295|E>>>10),E=I+(C^b&(P^C))+R[4]+4118548399&4294967295,I=b+(E<<7&4294967295|E>>>25),E=C+(P^I&(b^P))+R[5]+1200080426&4294967295,C=I+(E<<12&4294967295|E>>>20),E=P+(b^C&(I^b))+R[6]+2821735955&4294967295,P=C+(E<<17&4294967295|E>>>15),E=b+(I^P&(C^I))+R[7]+4249261313&4294967295,b=P+(E<<22&4294967295|E>>>10),E=I+(C^b&(P^C))+R[8]+1770035416&4294967295,I=b+(E<<7&4294967295|E>>>25),E=C+(P^I&(b^P))+R[9]+2336552879&4294967295,C=I+(E<<12&4294967295|E>>>20),E=P+(b^C&(I^b))+R[10]+4294925233&4294967295,P=C+(E<<17&4294967295|E>>>15),E=b+(I^P&(C^I))+R[11]+2304563134&4294967295,b=P+(E<<22&4294967295|E>>>10),E=I+(C^b&(P^C))+R[12]+1804603682&4294967295,I=b+(E<<7&4294967295|E>>>25),E=C+(P^I&(b^P))+R[13]+4254626195&4294967295,C=I+(E<<12&4294967295|E>>>20),E=P+(b^C&(I^b))+R[14]+2792965006&4294967295,P=C+(E<<17&4294967295|E>>>15),E=b+(I^P&(C^I))+R[15]+1236535329&4294967295,b=P+(E<<22&4294967295|E>>>10),E=I+(P^C&(b^P))+R[1]+4129170786&4294967295,I=b+(E<<5&4294967295|E>>>27),E=C+(b^P&(I^b))+R[6]+3225465664&4294967295,C=I+(E<<9&4294967295|E>>>23),E=P+(I^b&(C^I))+R[11]+643717713&4294967295,P=C+(E<<14&4294967295|E>>>18),E=b+(C^I&(P^C))+R[0]+3921069994&4294967295,b=P+(E<<20&4294967295|E>>>12),E=I+(P^C&(b^P))+R[5]+3593408605&4294967295,I=b+(E<<5&4294967295|E>>>27),E=C+(b^P&(I^b))+R[10]+38016083&4294967295,C=I+(E<<9&4294967295|E>>>23),E=P+(I^b&(C^I))+R[15]+3634488961&4294967295,P=C+(E<<14&4294967295|E>>>18),E=b+(C^I&(P^C))+R[4]+3889429448&4294967295,b=P+(E<<20&4294967295|E>>>12),E=I+(P^C&(b^P))+R[9]+568446438&4294967295,I=b+(E<<5&4294967295|E>>>27),E=C+(b^P&(I^b))+R[14]+3275163606&4294967295,C=I+(E<<9&4294967295|E>>>23),E=P+(I^b&(C^I))+R[3]+4107603335&4294967295,P=C+(E<<14&4294967295|E>>>18),E=b+(C^I&(P^C))+R[8]+1163531501&4294967295,b=P+(E<<20&4294967295|E>>>12),E=I+(P^C&(b^P))+R[13]+2850285829&4294967295,I=b+(E<<5&4294967295|E>>>27),E=C+(b^P&(I^b))+R[2]+4243563512&4294967295,C=I+(E<<9&4294967295|E>>>23),E=P+(I^b&(C^I))+R[7]+1735328473&4294967295,P=C+(E<<14&4294967295|E>>>18),E=b+(C^I&(P^C))+R[12]+2368359562&4294967295,b=P+(E<<20&4294967295|E>>>12),E=I+(b^P^C)+R[5]+4294588738&4294967295,I=b+(E<<4&4294967295|E>>>28),E=C+(I^b^P)+R[8]+2272392833&4294967295,C=I+(E<<11&4294967295|E>>>21),E=P+(C^I^b)+R[11]+1839030562&4294967295,P=C+(E<<16&4294967295|E>>>16),E=b+(P^C^I)+R[14]+4259657740&4294967295,b=P+(E<<23&4294967295|E>>>9),E=I+(b^P^C)+R[1]+2763975236&4294967295,I=b+(E<<4&4294967295|E>>>28),E=C+(I^b^P)+R[4]+1272893353&4294967295,C=I+(E<<11&4294967295|E>>>21),E=P+(C^I^b)+R[7]+4139469664&4294967295,P=C+(E<<16&4294967295|E>>>16),E=b+(P^C^I)+R[10]+3200236656&4294967295,b=P+(E<<23&4294967295|E>>>9),E=I+(b^P^C)+R[13]+681279174&4294967295,I=b+(E<<4&4294967295|E>>>28),E=C+(I^b^P)+R[0]+3936430074&4294967295,C=I+(E<<11&4294967295|E>>>21),E=P+(C^I^b)+R[3]+3572445317&4294967295,P=C+(E<<16&4294967295|E>>>16),E=b+(P^C^I)+R[6]+76029189&4294967295,b=P+(E<<23&4294967295|E>>>9),E=I+(b^P^C)+R[9]+3654602809&4294967295,I=b+(E<<4&4294967295|E>>>28),E=C+(I^b^P)+R[12]+3873151461&4294967295,C=I+(E<<11&4294967295|E>>>21),E=P+(C^I^b)+R[15]+530742520&4294967295,P=C+(E<<16&4294967295|E>>>16),E=b+(P^C^I)+R[2]+3299628645&4294967295,b=P+(E<<23&4294967295|E>>>9),E=I+(P^(b|~C))+R[0]+4096336452&4294967295,I=b+(E<<6&4294967295|E>>>26),E=C+(b^(I|~P))+R[7]+1126891415&4294967295,C=I+(E<<10&4294967295|E>>>22),E=P+(I^(C|~b))+R[14]+2878612391&4294967295,P=C+(E<<15&4294967295|E>>>17),E=b+(C^(P|~I))+R[5]+4237533241&4294967295,b=P+(E<<21&4294967295|E>>>11),E=I+(P^(b|~C))+R[12]+1700485571&4294967295,I=b+(E<<6&4294967295|E>>>26),E=C+(b^(I|~P))+R[3]+2399980690&4294967295,C=I+(E<<10&4294967295|E>>>22),E=P+(I^(C|~b))+R[10]+4293915773&4294967295,P=C+(E<<15&4294967295|E>>>17),E=b+(C^(P|~I))+R[1]+2240044497&4294967295,b=P+(E<<21&4294967295|E>>>11),E=I+(P^(b|~C))+R[8]+1873313359&4294967295,I=b+(E<<6&4294967295|E>>>26),E=C+(b^(I|~P))+R[15]+4264355552&4294967295,C=I+(E<<10&4294967295|E>>>22),E=P+(I^(C|~b))+R[6]+2734768916&4294967295,P=C+(E<<15&4294967295|E>>>17),E=b+(C^(P|~I))+R[13]+1309151649&4294967295,b=P+(E<<21&4294967295|E>>>11),E=I+(P^(b|~C))+R[4]+4149444226&4294967295,I=b+(E<<6&4294967295|E>>>26),E=C+(b^(I|~P))+R[11]+3174756917&4294967295,C=I+(E<<10&4294967295|E>>>22),E=P+(I^(C|~b))+R[2]+718787259&4294967295,P=C+(E<<15&4294967295|E>>>17),E=b+(C^(P|~I))+R[9]+3951481745&4294967295,T.g[0]=T.g[0]+I&4294967295,T.g[1]=T.g[1]+(P+(E<<21&4294967295|E>>>11))&4294967295,T.g[2]=T.g[2]+P&4294967295,T.g[3]=T.g[3]+C&4294967295}r.prototype.u=function(T,I){I===void 0&&(I=T.length);for(var b=I-this.blockSize,R=this.B,P=this.h,C=0;C<I;){if(P==0)for(;C<=b;)i(this,T,C),C+=this.blockSize;if(typeof T=="string"){for(;C<I;)if(R[P++]=T.charCodeAt(C++),P==this.blockSize){i(this,R),P=0;break}}else for(;C<I;)if(R[P++]=T[C++],P==this.blockSize){i(this,R),P=0;break}}this.h=P,this.o+=I},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var I=1;I<T.length-8;++I)T[I]=0;var b=8*this.o;for(I=T.length-8;I<T.length;++I)T[I]=b&255,b/=256;for(this.u(T),T=Array(16),I=b=0;4>I;++I)for(var R=0;32>R;R+=8)T[b++]=this.g[I]>>>R&255;return T};function s(T,I){var b=c;return Object.prototype.hasOwnProperty.call(b,T)?b[T]:b[T]=I(T)}function o(T,I){this.h=I;for(var b=[],R=!0,P=T.length-1;0<=P;P--){var C=T[P]|0;R&&C==I||(b[P]=C,R=!1)}this.g=b}var c={};function l(T){return-128<=T&&128>T?s(T,function(I){return new o([I|0],0>I?-1:0)}):new o([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return v;if(0>T)return M(h(-T));for(var I=[],b=1,R=0;T>=b;R++)I[R]=T/b|0,b*=4294967296;return new o(I,0)}function p(T,I){if(T.length==0)throw Error("number format error: empty string");if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(T.charAt(0)=="-")return M(p(T.substring(1),I));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var b=h(Math.pow(I,8)),R=v,P=0;P<T.length;P+=8){var C=Math.min(8,T.length-P),E=parseInt(T.substring(P,P+C),I);8>C?(C=h(Math.pow(I,C)),R=R.j(C).add(h(E))):(R=R.j(b),R=R.add(h(E)))}return R}var v=l(0),S=l(1),k=l(16777216);n=o.prototype,n.m=function(){if($(this))return-M(this).m();for(var T=0,I=1,b=0;b<this.g.length;b++){var R=this.i(b);T+=(0<=R?R:4294967296+R)*I,I*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(F(this))return"0";if($(this))return"-"+M(this).toString(T);for(var I=h(Math.pow(T,6)),b=this,R="";;){var P=ie(b,I).g;b=Z(b,P.j(I));var C=((0<b.g.length?b.g[0]:b.h)>>>0).toString(T);if(b=P,F(b))return C+R;for(;6>C.length;)C="0"+C;R=C+R}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function F(T){if(T.h!=0)return!1;for(var I=0;I<T.g.length;I++)if(T.g[I]!=0)return!1;return!0}function $(T){return T.h==-1}n.l=function(T){return T=Z(this,T),$(T)?-1:F(T)?0:1};function M(T){for(var I=T.g.length,b=[],R=0;R<I;R++)b[R]=~T.g[R];return new o(b,~T.h).add(S)}n.abs=function(){return $(this)?M(this):this},n.add=function(T){for(var I=Math.max(this.g.length,T.g.length),b=[],R=0,P=0;P<=I;P++){var C=R+(this.i(P)&65535)+(T.i(P)&65535),E=(C>>>16)+(this.i(P)>>>16)+(T.i(P)>>>16);R=E>>>16,C&=65535,E&=65535,b[P]=E<<16|C}return new o(b,b[b.length-1]&-2147483648?-1:0)};function Z(T,I){return T.add(M(I))}n.j=function(T){if(F(this)||F(T))return v;if($(this))return $(T)?M(this).j(M(T)):M(M(this).j(T));if($(T))return M(this.j(M(T)));if(0>this.l(k)&&0>T.l(k))return h(this.m()*T.m());for(var I=this.g.length+T.g.length,b=[],R=0;R<2*I;R++)b[R]=0;for(R=0;R<this.g.length;R++)for(var P=0;P<T.g.length;P++){var C=this.i(R)>>>16,E=this.i(R)&65535,_e=T.i(P)>>>16,rn=T.i(P)&65535;b[2*R+2*P]+=E*rn,J(b,2*R+2*P),b[2*R+2*P+1]+=C*rn,J(b,2*R+2*P+1),b[2*R+2*P+1]+=E*_e,J(b,2*R+2*P+1),b[2*R+2*P+2]+=C*_e,J(b,2*R+2*P+2)}for(R=0;R<I;R++)b[R]=b[2*R+1]<<16|b[2*R];for(R=I;R<2*I;R++)b[R]=0;return new o(b,0)};function J(T,I){for(;(T[I]&65535)!=T[I];)T[I+1]+=T[I]>>>16,T[I]&=65535,I++}function B(T,I){this.g=T,this.h=I}function ie(T,I){if(F(I))throw Error("division by zero");if(F(T))return new B(v,v);if($(T))return I=ie(M(T),I),new B(M(I.g),M(I.h));if($(I))return I=ie(T,M(I)),new B(M(I.g),I.h);if(30<T.g.length){if($(T)||$(I))throw Error("slowDivide_ only works with positive integers.");for(var b=S,R=I;0>=R.l(T);)b=le(b),R=le(R);var P=ee(b,1),C=ee(R,1);for(R=ee(R,2),b=ee(b,2);!F(R);){var E=C.add(R);0>=E.l(T)&&(P=P.add(b),C=E),R=ee(R,1),b=ee(b,1)}return I=Z(T,P.j(I)),new B(P,I)}for(P=v;0<=T.l(I);){for(b=Math.max(1,Math.floor(T.m()/I.m())),R=Math.ceil(Math.log(b)/Math.LN2),R=48>=R?1:Math.pow(2,R-48),C=h(b),E=C.j(I);$(E)||0<E.l(T);)b-=R,C=h(b),E=C.j(I);F(C)&&(C=S),P=P.add(C),T=Z(T,E)}return new B(P,T)}n.A=function(T){return ie(this,T).h},n.and=function(T){for(var I=Math.max(this.g.length,T.g.length),b=[],R=0;R<I;R++)b[R]=this.i(R)&T.i(R);return new o(b,this.h&T.h)},n.or=function(T){for(var I=Math.max(this.g.length,T.g.length),b=[],R=0;R<I;R++)b[R]=this.i(R)|T.i(R);return new o(b,this.h|T.h)},n.xor=function(T){for(var I=Math.max(this.g.length,T.g.length),b=[],R=0;R<I;R++)b[R]=this.i(R)^T.i(R);return new o(b,this.h^T.h)};function le(T){for(var I=T.g.length+1,b=[],R=0;R<I;R++)b[R]=T.i(R)<<1|T.i(R-1)>>>31;return new o(b,T.h)}function ee(T,I){var b=I>>5;I%=32;for(var R=T.g.length-b,P=[],C=0;C<R;C++)P[C]=0<I?T.i(C+b)>>>I|T.i(C+b+1)<<32-I:T.i(C+b);return new o(P,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Gc=tf.Md5=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,gn=tf.Integer=o}).apply(typeof ef<"u"?ef:typeof self<"u"?self:typeof window<"u"?window:{});var yo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Wt={};var Kc,Hc,Or,Wc,ji,vo,Qc,Yc,Jc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,d){return a==Array.prototype||a==Object.prototype||(a[u]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof yo=="object"&&yo];for(var u=0;u<a.length;++u){var d=a[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(a,u){if(u)e:{var d=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var D=a[m];if(!(D in d))break e;d=d[D]}a=a[a.length-1],m=d[a],u=u(m),u!=m&&u!=null&&e(d,a,{configurable:!0,writable:!0,value:u})}}function s(a,u){a instanceof String&&(a+="");var d=0,m=!1,D={next:function(){if(!m&&d<a.length){var x=d++;return{value:u(x,a[x]),done:!1}}return m=!0,{done:!0,value:void 0}}};return D[Symbol.iterator]=function(){return D},D}i("Array.prototype.values",function(a){return a||function(){return s(this,function(u,d){return d})}});var o=o||{},c=this||self;function l(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function p(a,u,d){return a.call.apply(a.bind,arguments)}function v(a,u,d){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var D=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(D,m),a.apply(u,D)}}return function(){return a.apply(u,arguments)}}function S(a,u,d){return S=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:v,S.apply(null,arguments)}function k(a,u){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function F(a,u){function d(){}d.prototype=u.prototype,a.aa=u.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(m,D,x){for(var U=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)U[ve-2]=arguments[ve];return u.prototype[D].apply(m,U)}}function $(a){let u=a.length;if(0<u){let d=Array(u);for(let m=0;m<u;m++)d[m]=a[m];return d}return[]}function M(a,u){for(let d=1;d<arguments.length;d++){let m=arguments[d];if(l(m)){let D=a.length||0,x=m.length||0;a.length=D+x;for(let U=0;U<x;U++)a[D+U]=m[U]}else a.push(m)}}class Z{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function J(a){return/^[\s\xa0]*$/.test(a)}function B(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function ie(a){return ie[" "](a),a}ie[" "]=function(){};var le=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function ee(a,u,d){for(let m in a)u.call(d,a[m],m,a)}function T(a,u){for(let d in a)u.call(void 0,a[d],d,a)}function I(a){let u={};for(let d in a)u[d]=a[d];return u}let b="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function R(a,u){let d,m;for(let D=1;D<arguments.length;D++){m=arguments[D];for(d in m)a[d]=m[d];for(let x=0;x<b.length;x++)d=b[x],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function P(a){var u=1;a=a.split(":");let d=[];for(;0<u&&a.length;)d.push(a.shift()),u--;return a.length&&d.push(a.join(":")),d}function C(a){c.setTimeout(()=>{throw a},0)}function E(){var a=$t;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class _e{constructor(){this.h=this.g=null}add(u,d){let m=rn.get();m.set(u,d),this.h?this.h.next=m:this.g=m,this.h=m}}var rn=new Z(()=>new _i,a=>a.reset());class _i{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let sn,Ft=!1,$t=new _e,yr=()=>{let a=c.Promise.resolve(void 0);sn=()=>{a.then(yi)}};var yi=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(d){C(d)}var u=rn;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}Ft=!1};function ot(){this.s=this.s,this.C=this.C}ot.prototype.s=!1,ot.prototype.ma=function(){this.s||(this.s=!0,this.N())},ot.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ve(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Ve.prototype.h=function(){this.defaultPrevented=!0};var vr=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{let d=()=>{};c.addEventListener("test",d,u),c.removeEventListener("test",d,u)}catch{}return a}();function St(a,u){if(Ve.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(le){e:{try{ie(u.nodeName);var D=!0;break e}catch{}D=!1}D||(u=null)}}else d=="mouseover"?u=a.fromElement:d=="mouseout"&&(u=a.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:on[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&St.aa.h.call(this)}}F(St,Ve);var on={2:"touch",3:"pen",4:"mouse"};St.prototype.h=function(){St.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var be="closure_listenable_"+(1e6*Math.random()|0),at=0;function mt(a,u,d,m,D){this.listener=a,this.proxy=null,this.src=u,this.type=d,this.capture=!!m,this.ha=D,this.key=++at,this.da=this.fa=!1}function Vn(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ln(a){this.src=a,this.g={},this.h=0}Ln.prototype.add=function(a,u,d,m,D){var x=a.toString();a=this.g[x],a||(a=this.g[x]=[],this.h++);var U=$s(a,u,m,D);return-1<U?(u=a[U],d||(u.fa=!1)):(u=new mt(u,this.src,x,!!m,D),u.fa=d,a.push(u)),u};function Fs(a,u){var d=u.type;if(d in a.g){var m=a.g[d],D=Array.prototype.indexOf.call(m,u,void 0),x;(x=0<=D)&&Array.prototype.splice.call(m,D,1),x&&(Vn(u),a.g[d].length==0&&(delete a.g[d],a.h--))}}function $s(a,u,d,m){for(var D=0;D<a.length;++D){var x=a[D];if(!x.da&&x.listener==u&&x.capture==!!d&&x.ha==m)return D}return-1}var ct="closure_lm_"+(1e6*Math.random()|0),an={};function Mn(a,u,d,m,D){if(m&&m.once)return wi(a,u,d,m,D);if(Array.isArray(u)){for(var x=0;x<u.length;x++)Mn(a,u[x],d,m,D);return null}return d=Ut(d),a&&a[be]?a.K(u,d,h(m)?!!m.capture:!!m,D):vi(a,u,d,!1,m,D)}function vi(a,u,d,m,D,x){if(!u)throw Error("Invalid event type");var U=h(D)?!!D.capture:!!D,ve=wr(a);if(ve||(a[ct]=ve=new Ln(a)),d=ve.add(u,d,m,U,x),d.proxy)return d;if(m=Ze(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)vr||(D=U),D===void 0&&(D=!1),a.addEventListener(u.toString(),m,D);else if(a.attachEvent)a.attachEvent(Bs(u.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Ze(){function a(d){return u.call(a.src,a.listener,d)}let u=Ei;return a}function wi(a,u,d,m,D){if(Array.isArray(u)){for(var x=0;x<u.length;x++)wi(a,u[x],d,m,D);return null}return d=Ut(d),a&&a[be]?a.L(u,d,h(m)?!!m.capture:!!m,D):vi(a,u,d,!0,m,D)}function Us(a,u,d,m,D){if(Array.isArray(u))for(var x=0;x<u.length;x++)Us(a,u[x],d,m,D);else m=h(m)?!!m.capture:!!m,d=Ut(d),a&&a[be]?(a=a.i,u=String(u).toString(),u in a.g&&(x=a.g[u],d=$s(x,d,m,D),-1<d&&(Vn(x[d]),Array.prototype.splice.call(x,d,1),x.length==0&&(delete a.g[u],a.h--)))):a&&(a=wr(a))&&(u=a.g[u.toString()],a=-1,u&&(a=$s(u,d,m,D)),(d=-1<a?u[a]:null)&&Ii(d))}function Ii(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[be])Fs(u.i,a);else{var d=a.type,m=a.proxy;u.removeEventListener?u.removeEventListener(d,m,a.capture):u.detachEvent?u.detachEvent(Bs(d),m):u.addListener&&u.removeListener&&u.removeListener(m),(d=wr(u))?(Fs(d,a),d.h==0&&(d.src=null,u[ct]=null)):Vn(a)}}}function Bs(a){return a in an?an[a]:an[a]="on"+a}function Ei(a,u){if(a.da)a=!0;else{u=new St(u,this);var d=a.listener,m=a.ha||a.src;a.fa&&Ii(a),a=d.call(m,u)}return a}function wr(a){return a=a[ct],a instanceof Ln?a:null}var bi="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ut(a){return typeof a=="function"?a:(a[bi]||(a[bi]=function(u){return a.handleEvent(u)}),a[bi])}function Fe(){ot.call(this),this.i=new Ln(this),this.M=this,this.F=null}F(Fe,ot),Fe.prototype[be]=!0,Fe.prototype.removeEventListener=function(a,u,d,m){Us(this,a,u,d,m)};function Be(a,u){var d,m=a.F;if(m)for(d=[];m;m=m.F)d.push(m);if(a=a.M,m=u.type||u,typeof u=="string")u=new Ve(u,a);else if(u instanceof Ve)u.target=u.target||a;else{var D=u;u=new Ve(m,a),R(u,D)}if(D=!0,d)for(var x=d.length-1;0<=x;x--){var U=u.g=d[x];D=Bt(U,m,!0,u)&&D}if(U=u.g=a,D=Bt(U,m,!0,u)&&D,D=Bt(U,m,!1,u)&&D,d)for(x=0;x<d.length;x++)U=u.g=d[x],D=Bt(U,m,!1,u)&&D}Fe.prototype.N=function(){if(Fe.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var d=a.g[u],m=0;m<d.length;m++)Vn(d[m]);delete a.g[u],a.h--}}this.F=null},Fe.prototype.K=function(a,u,d,m){return this.i.add(String(a),u,!1,d,m)},Fe.prototype.L=function(a,u,d,m){return this.i.add(String(a),u,!0,d,m)};function Bt(a,u,d,m){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var D=!0,x=0;x<u.length;++x){var U=u[x];if(U&&!U.da&&U.capture==d){var ve=U.listener,ze=U.ha||U.src;U.fa&&Fs(a.i,U),D=ve.call(ze,m)!==!1&&D}}return D&&!m.defaultPrevented}function js(a,u,d){if(typeof a=="function")d&&(a=S(a,d));else if(a&&typeof a.handleEvent=="function")a=S(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(a,u||0)}function qs(a){a.g=js(()=>{a.g=null,a.i&&(a.i=!1,qs(a))},a.l);let u=a.h;a.h=null,a.m.apply(null,u)}class pc extends ot{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:qs(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Fn(a){ot.call(this),this.h=a,this.g={}}F(Fn,ot);var zs=[];function Gs(a){ee(a.g,function(u,d){this.g.hasOwnProperty(d)&&Ii(u)},a),a.g={}}Fn.prototype.N=function(){Fn.aa.N.call(this),Gs(this)},Fn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ti=c.JSON.stringify,mc=c.JSON.parse,Ai=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Si(){}Si.prototype.h=null;function Ks(a){return a.h||(a.h=a.i())}function Ir(){}var jt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Er(){Ve.call(this,"d")}F(Er,Ve);function Ri(){Ve.call(this,"c")}F(Ri,Ve);var Rt={},Pi=null;function br(){return Pi=Pi||new Fe}Rt.La="serverreachability";function Hs(a){Ve.call(this,Rt.La,a)}F(Hs,Ve);function je(a){let u=br();Be(u,new Hs(u))}Rt.STAT_EVENT="statevent";function Ce(a,u){Ve.call(this,Rt.STAT_EVENT,a),this.stat=u}F(Ce,Ve);function Ae(a){let u=br();Be(u,new Ce(u,a))}Rt.Ma="timingevent";function Ws(a,u){Ve.call(this,Rt.Ma,a),this.size=u}F(Ws,Ve);function oe(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},u)}function it(){this.g=!0}it.prototype.xa=function(){this.g=!1};function gt(a,u,d,m,D,x){a.info(function(){if(a.g)if(x)for(var U="",ve=x.split("&"),ze=0;ze<ve.length;ze++){var me=ve[ze].split("=");if(1<me.length){var We=me[0];me=me[1];var Qe=We.split("_");U=2<=Qe.length&&Qe[1]=="type"?U+(We+"="+me+"&"):U+(We+"=redacted&")}}else U=null;else U=x;return"XMLHTTP REQ ("+m+") [attempt "+D+"]: "+u+`
`+d+`
`+U})}function qt(a,u,d,m,D,x,U){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+D+"]: "+u+`
`+d+`
`+x+" "+U})}function zt(a,u,d,m){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+Ys(a,d)+(m?" "+m:"")})}function Qs(a,u){a.info(function(){return"TIMEOUT: "+u})}it.prototype.info=function(){};function Ys(a,u){if(!a.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var m=d[a];if(!(2>m.length)){var D=m[1];if(Array.isArray(D)&&!(1>D.length)){var x=D[0];if(x!="noop"&&x!="stop"&&x!="close")for(var U=1;U<D.length;U++)D[U]=""}}}}return Ti(d)}catch{return u}}var Tr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Js={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ci;function $n(){}F($n,Si),$n.prototype.g=function(){return new XMLHttpRequest},$n.prototype.i=function(){return{}},Ci=new $n;function ye(a,u,d,m){this.j=a,this.i=u,this.l=d,this.R=m||1,this.U=new Fn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Xs}function Xs(){this.i=null,this.g="",this.h=!1}var Zs={},Di={};function ki(a,u,d){a.L=1,a.v=j(fe(u)),a.m=d,a.P=!0,eo(a,null)}function eo(a,u){a.F=Date.now(),Gt(a),a.A=fe(a.v);var d=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),ad(d.i,"t",m),a.C=0,d=a.j.J,a.h=new Xs,a.g=Ad(a.j,d?u:null,!a.m),0<a.O&&(a.M=new pc(S(a.Y,a,a.g),a.O)),u=a.U,d=a.g,m=a.ca;var D="readystatechange";Array.isArray(D)||(D&&(zs[0]=D.toString()),D=zs);for(var x=0;x<D.length;x++){var U=Mn(d,D[x],m||u.handleEvent,!1,u.h||u);if(!U)break;u.g[U.key]=U}u=a.H?I(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),je(),gt(a.i,a.u,a.A,a.l,a.R,a.m)}ye.prototype.ca=function(a){a=a.target;let u=this.M;u&&Kt(a)==3?u.j():this.Y(a)},ye.prototype.Y=function(a){try{if(a==this.g)e:{let Qe=Kt(this.g);var u=this.g.Ba();let Dr=this.g.Z();if(!(3>Qe)&&(Qe!=3||this.g&&(this.h.h||this.g.oa()||pd(this.g)))){this.J||Qe!=4||u==7||(u==8||0>=Dr?je(3):je(2)),xi(this);var d=this.g.Z();this.X=d;t:if(Ni(this)){var m=pd(this.g);a="";var D=m.length,x=Kt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){wt(this),qe(this);var U="";break t}this.h.i=new c.TextDecoder}for(u=0;u<D;u++)this.h.h=!0,a+=this.h.i.decode(m[u],{stream:!(x&&u==D-1)});m.length=0,this.h.g+=a,this.C=0,U=this.h.g}else U=this.g.oa();if(this.o=d==200,qt(this.i,this.u,this.A,this.l,this.R,Qe,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ve,ze=this.g;if((ve=ze.g?ze.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!J(ve)){var me=ve;break t}}me=null}if(d=me)zt(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,cn(this,d);else{this.o=!1,this.s=3,Ae(12),wt(this),qe(this);break e}}if(this.P){d=!0;let It;for(;!this.J&&this.C<U.length;)if(It=id(this,U),It==Di){Qe==4&&(this.s=4,Ae(14),d=!1),zt(this.i,this.l,null,"[Incomplete Response]");break}else if(It==Zs){this.s=4,Ae(15),zt(this.i,this.l,U,"[Invalid Chunk]"),d=!1;break}else zt(this.i,this.l,It,null),cn(this,It);if(Ni(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Qe!=4||U.length!=0||this.h.h||(this.s=1,Ae(16),d=!1),this.o=this.o&&d,!d)zt(this.i,this.l,U,"[Invalid Chunked Response]"),wt(this),qe(this);else if(0<U.length&&!this.W){this.W=!0;var We=this.j;We.g==this&&We.ba&&!We.M&&(We.j.info("Great, no buffering proxy detected. Bytes received: "+U.length),vc(We),We.M=!0,Ae(11))}}else zt(this.i,this.l,U,null),cn(this,U);Qe==4&&wt(this),this.o&&!this.J&&(Qe==4?Id(this.j,this):(this.o=!1,Gt(this)))}else Wg(this.g),d==400&&0<U.indexOf("Unknown SID")?(this.s=3,Ae(12)):(this.s=0,Ae(13)),wt(this),qe(this)}}}catch{}finally{}};function Ni(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function id(a,u){var d=a.C,m=u.indexOf(`
`,d);return m==-1?Di:(d=Number(u.substring(d,m)),isNaN(d)?Zs:(m+=1,m+d>u.length?Di:(u=u.slice(m,m+d),a.C=m+d,u)))}ye.prototype.cancel=function(){this.J=!0,wt(this)};function Gt(a){a.S=Date.now()+a.I,Ar(a,a.I)}function Ar(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=oe(S(a.ba,a),u)}function xi(a){a.B&&(c.clearTimeout(a.B),a.B=null)}ye.prototype.ba=function(){this.B=null;let a=Date.now();0<=a-this.S?(Qs(this.i,this.A),this.L!=2&&(je(),Ae(17)),wt(this),this.s=2,qe(this)):Ar(this,this.S-a)};function qe(a){a.j.G==0||a.J||Id(a.j,a)}function wt(a){xi(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,Gs(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function cn(a,u){try{var d=a.j;if(d.G!=0&&(d.g==a||Sr(d.h,a))){if(!a.K&&Sr(d.h,a)&&d.G==3){try{var m=d.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var D=m;if(D[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)co(d),oo(d);else break e;yc(d),Ae(18)}}else d.za=D[1],0<d.za-d.T&&37500>D[2]&&d.F&&d.v==0&&!d.C&&(d.C=oe(S(d.Za,d),6e3));if(1>=Un(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else jn(d,11)}else if((a.K||d.g==a)&&co(d),!J(u))for(D=d.Da.g.parse(u),u=0;u<D.length;u++){let me=D[u];if(d.T=me[0],me=me[1],d.G==2)if(me[0]=="c"){d.K=me[1],d.ia=me[2];let We=me[3];We!=null&&(d.la=We,d.j.info("VER="+d.la));let Qe=me[4];Qe!=null&&(d.Aa=Qe,d.j.info("SVER="+d.Aa));let Dr=me[5];Dr!=null&&typeof Dr=="number"&&0<Dr&&(m=1.5*Dr,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;let It=a.g;if(It){let uo=It.g?It.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(uo){var x=m.h;x.g||uo.indexOf("spdy")==-1&&uo.indexOf("quic")==-1&&uo.indexOf("h2")==-1||(x.j=x.l,x.g=new Set,x.h&&(f(x,x.h),x.h=null))}if(m.D){let wc=It.g?It.g.getResponseHeader("X-HTTP-Session-Id"):null;wc&&(m.ya=wc,ne(m.I,m.D,wc))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var U=a;if(m.qa=Td(m,m.J?m.ia:null,m.W),U.K){g(m.h,U);var ve=U,ze=m.L;ze&&(ve.I=ze),ve.B&&(xi(ve),Gt(ve)),m.g=U}else vd(m);0<d.i.length&&ao(d)}else me[0]!="stop"&&me[0]!="close"||jn(d,7);else d.G==3&&(me[0]=="stop"||me[0]=="close"?me[0]=="stop"?jn(d,7):_c(d):me[0]!="noop"&&d.l&&d.l.ta(me),d.v=0)}}je(4)}catch{}}var to=class{constructor(a,u){this.g=a,this.map=u}};function no(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ro(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Un(a){return a.h?1:a.g?a.g.size:0}function Sr(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function f(a,u){a.g?a.g.add(u):a.h=u}function g(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}no.prototype.cancel=function(){if(this.i=y(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let a of this.g.values())a.cancel();this.g.clear()}};function y(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(let d of a.g.values())u=u.concat(d.D);return u}return $(a.i)}function _(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var u=[],d=a.length,m=0;m<d;m++)u.push(a[m]);return u}u=[],d=0;for(m in a)u[d++]=a[m];return u}function A(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var u=[];a=a.length;for(var d=0;d<a;d++)u.push(d);return u}u=[],d=0;for(let m in a)u[d++]=m;return u}}}function w(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var d=A(a),m=_(a),D=m.length,x=0;x<D;x++)u.call(void 0,m[x],d&&d[x],a)}var O=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function G(a,u){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var m=a[d].indexOf("="),D=null;if(0<=m){var x=a[d].substring(0,m);D=a[d].substring(m+1)}else x=a[d];u(x,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function te(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof te){this.h=a.h,ue(this,a.j),this.o=a.o,this.g=a.g,Le(this,a.s),this.l=a.l;var u=a.i,d=new Oi;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),et(this,d),this.m=a.m}else a&&(u=String(a).match(O))?(this.h=!1,ue(this,u[1]||"",!0),this.o=se(u[2]||""),this.g=se(u[3]||"",!0),Le(this,u[4]),this.l=se(u[5]||"",!0),et(this,u[6]||"",!0),this.m=se(u[7]||"")):(this.h=!1,this.i=new Oi(null,this.h))}te.prototype.toString=function(){var a=[],u=this.j;u&&a.push(lt(u,Rr,!0),":");var d=this.g;return(d||u=="file")&&(a.push("//"),(u=this.o)&&a.push(lt(u,Rr,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(lt(d,d.charAt(0)=="/"?pe:Q,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",lt(d,Ug)),a.join("")};function fe(a){return new te(a)}function ue(a,u,d){a.j=d?se(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Le(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function et(a,u,d){u instanceof Oi?(a.i=u,Bg(a.i,a.h)):(d||(u=lt(u,$g)),a.i=new Oi(u,a.h))}function ne(a,u,d){a.i.set(u,d)}function j(a){return ne(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function se(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function lt(a,u,d){return typeof a=="string"?(a=encodeURI(a).replace(u,Bn),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Bn(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Rr=/[#\/\?@]/g,Q=/[#\?:]/g,pe=/[#\?]/g,$g=/[#\?@]/g,Ug=/#/g;function Oi(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function ln(a){a.g||(a.g=new Map,a.h=0,a.i&&G(a.i,function(u,d){a.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=Oi.prototype,n.add=function(a,u){ln(this),this.i=null,a=Pr(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(u),this.h+=1,this};function sd(a,u){ln(a),u=Pr(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function od(a,u){return ln(a),u=Pr(a,u),a.g.has(u)}n.forEach=function(a,u){ln(this),this.g.forEach(function(d,m){d.forEach(function(D){a.call(u,D,m,this)},this)},this)},n.na=function(){ln(this);let a=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let m=0;m<u.length;m++){let D=a[m];for(let x=0;x<D.length;x++)d.push(u[m])}return d},n.V=function(a){ln(this);let u=[];if(typeof a=="string")od(this,a)&&(u=u.concat(this.g.get(Pr(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)u=u.concat(a[d])}return u},n.set=function(a,u){return ln(this),this.i=null,a=Pr(this,a),od(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function ad(a,u,d){sd(a,u),0<d.length&&(a.i=null,a.g.set(Pr(a,u),$(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let a=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var m=u[d];let x=encodeURIComponent(String(m)),U=this.V(m);for(m=0;m<U.length;m++){var D=x;U[m]!==""&&(D+="="+encodeURIComponent(String(U[m]))),a.push(D)}}return this.i=a.join("&")};function Pr(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function Bg(a,u){u&&!a.j&&(ln(a),a.i=null,a.g.forEach(function(d,m){var D=m.toLowerCase();m!=D&&(sd(this,m),ad(this,D,d))},a)),a.j=u}function jg(a,u){let d=new it;if(c.Image){let m=new Image;m.onload=k(un,d,"TestLoadImage: loaded",!0,u,m),m.onerror=k(un,d,"TestLoadImage: error",!1,u,m),m.onabort=k(un,d,"TestLoadImage: abort",!1,u,m),m.ontimeout=k(un,d,"TestLoadImage: timeout",!1,u,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else u(!1)}function qg(a,u){let d=new it,m=new AbortController,D=setTimeout(()=>{m.abort(),un(d,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:m.signal}).then(x=>{clearTimeout(D),x.ok?un(d,"TestPingServer: ok",!0,u):un(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(D),un(d,"TestPingServer: error",!1,u)})}function un(a,u,d,m,D){try{D&&(D.onload=null,D.onerror=null,D.onabort=null,D.ontimeout=null),m(d)}catch{}}function zg(){this.g=new Ai}function Gg(a,u,d){let m=d||"";try{w(a,function(D,x){let U=D;h(D)&&(U=Ti(D)),u.push(m+x+"="+encodeURIComponent(U))})}catch(D){throw u.push(m+"type="+encodeURIComponent("_badmap")),D}}function Vi(a){this.l=a.Ub||null,this.j=a.eb||!1}F(Vi,Si),Vi.prototype.g=function(){return new io(this.l,this.j)},Vi.prototype.i=function(a){return function(){return a}}({});function io(a,u){Fe.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}F(io,Fe),n=io.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,Mi(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Li(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Mi(this)),this.g&&(this.readyState=3,Mi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;cd(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function cd(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Li(this):Mi(this),this.readyState==3&&cd(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Li(this))},n.Qa=function(a){this.g&&(this.response=a,Li(this))},n.ga=function(){this.g&&Li(this)};function Li(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Mi(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let a=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=u.next();return a.join(`\r
`)};function Mi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(io.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function ld(a){let u="";return ee(a,function(d,m){u+=m,u+=":",u+=d,u+=`\r
`}),u}function gc(a,u,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=ld(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ne(a,u,d))}function Se(a){Fe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}F(Se,Fe);var Kg=/^https?$/i,Hg=["POST","PUT"];n=Se.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ci.g(),this.v=this.o?Ks(this.o):Ks(Ci),this.g.onreadystatechange=S(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(x){ud(this,x);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var D in m)d.set(D,m[D]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(let x of m.keys())d.set(x,m.get(x));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(x=>x.toLowerCase()=="content-type"),D=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Hg,u,void 0))||m||D||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[x,U]of d)this.g.setRequestHeader(x,U);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{fd(this),this.u=!0,this.g.send(a),this.u=!1}catch(x){ud(this,x)}};function ud(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,hd(a),so(a)}function hd(a){a.A||(a.A=!0,Be(a,"complete"),Be(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Be(this,"complete"),Be(this,"abort"),so(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),so(this,!0)),Se.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?dd(this):this.bb())},n.bb=function(){dd(this)};function dd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Kt(a)!=4||a.Z()!=2)){if(a.u&&Kt(a)==4)js(a.Ea,0,a);else if(Be(a,"readystatechange"),Kt(a)==4){a.h=!1;try{let U=a.Z();e:switch(U){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var m;if(m=U===0){var D=String(a.D).match(O)[1]||null;!D&&c.self&&c.self.location&&(D=c.self.location.protocol.slice(0,-1)),m=!Kg.test(D?D.toLowerCase():"")}d=m}if(d)Be(a,"complete"),Be(a,"success");else{a.m=6;try{var x=2<Kt(a)?a.g.statusText:""}catch{x=""}a.l=x+" ["+a.Z()+"]",hd(a)}}finally{so(a)}}}}function so(a,u){if(a.g){fd(a);let d=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||Be(a,"ready");try{d.onreadystatechange=m}catch{}}}function fd(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Kt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Kt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),mc(u)}};function pd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Wg(a){let u={};a=(a.g&&2<=Kt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(J(a[m]))continue;var d=P(a[m]);let D=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();let x=u[D]||[];u[D]=x,x.push(d)}T(u,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Fi(a,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||u}function md(a){this.Aa=0,this.i=[],this.j=new it,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Fi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Fi("baseRetryDelayMs",5e3,a),this.cb=Fi("retryDelaySeedMs",1e4,a),this.Wa=Fi("forwardChannelMaxRetries",2,a),this.wa=Fi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new no(a&&a.concurrentRequestLimit),this.Da=new zg,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=md.prototype,n.la=8,n.G=1,n.connect=function(a,u,d,m){Ae(0),this.W=a,this.H=u||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Td(this,null,this.W),ao(this)};function _c(a){if(gd(a),a.G==3){var u=a.U++,d=fe(a.I);if(ne(d,"SID",a.K),ne(d,"RID",u),ne(d,"TYPE","terminate"),$i(a,d),u=new ye(a,a.j,u),u.L=2,u.v=j(fe(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=u.v,d=!0),d||(u.g=Ad(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Gt(u)}bd(a)}function oo(a){a.g&&(vc(a),a.g.cancel(),a.g=null)}function gd(a){oo(a),a.u&&(c.clearTimeout(a.u),a.u=null),co(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function ao(a){if(!ro(a.h)&&!a.s){a.s=!0;var u=a.Ga;sn||yr(),Ft||(sn(),Ft=!0),$t.add(u,a),a.B=0}}function Qg(a,u){return Un(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=oe(S(a.Ga,a,u),Ed(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;let D=new ye(this,this.j,a),x=this.o;if(this.S&&(x?(x=I(x),R(x,this.S)):x=this.S),this.m!==null||this.O||(D.H=x,x=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=yd(this,D,u),d=fe(this.I),ne(d,"RID",a),ne(d,"CVER",22),this.D&&ne(d,"X-HTTP-Session-Id",this.D),$i(this,d),x&&(this.O?u="headers="+encodeURIComponent(String(ld(x)))+"&"+u:this.m&&gc(d,this.m,x)),f(this.h,D),this.Ua&&ne(d,"TYPE","init"),this.P?(ne(d,"$req",u),ne(d,"SID","null"),D.T=!0,ki(D,d,null)):ki(D,d,u),this.G=2}}else this.G==3&&(a?_d(this,a):this.i.length==0||ro(this.h)||_d(this))};function _d(a,u){var d;u?d=u.l:d=a.U++;let m=fe(a.I);ne(m,"SID",a.K),ne(m,"RID",d),ne(m,"AID",a.T),$i(a,m),a.m&&a.o&&gc(m,a.m,a.o),d=new ye(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),u&&(a.i=u.D.concat(a.i)),u=yd(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),f(a.h,d),ki(d,m,u)}function $i(a,u){a.H&&ee(a.H,function(d,m){ne(u,m,d)}),a.l&&w({},function(d,m){ne(u,m,d)})}function yd(a,u,d){d=Math.min(a.i.length,d);var m=a.l?S(a.l.Na,a.l,a):null;e:{var D=a.i;let x=-1;for(;;){let U=["count="+d];x==-1?0<d?(x=D[0].g,U.push("ofs="+x)):x=0:U.push("ofs="+x);let ve=!0;for(let ze=0;ze<d;ze++){let me=D[ze].g,We=D[ze].map;if(me-=x,0>me)x=Math.max(0,D[ze].g-100),ve=!1;else try{Gg(We,U,"req"+me+"_")}catch{m&&m(We)}}if(ve){m=U.join("&");break e}}}return a=a.i.splice(0,d),u.D=a,m}function vd(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;sn||yr(),Ft||(sn(),Ft=!0),$t.add(u,a),a.v=0}}function yc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=oe(S(a.Fa,a),Ed(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,wd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=oe(S(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ae(10),oo(this),wd(this))};function vc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function wd(a){a.g=new ye(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=fe(a.qa);ne(u,"RID","rpc"),ne(u,"SID",a.K),ne(u,"AID",a.T),ne(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&ne(u,"TO",a.ja),ne(u,"TYPE","xmlhttp"),$i(a,u),a.m&&a.o&&gc(u,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=j(fe(u)),d.m=null,d.P=!0,eo(d,a)}n.Za=function(){this.C!=null&&(this.C=null,oo(this),yc(this),Ae(19))};function co(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Id(a,u){var d=null;if(a.g==u){co(a),vc(a),a.g=null;var m=2}else if(Sr(a.h,u))d=u.D,g(a.h,u),m=1;else return;if(a.G!=0){if(u.o)if(m==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var D=a.B;m=br(),Be(m,new Ws(m,d)),ao(a)}else vd(a);else if(D=u.s,D==3||D==0&&0<u.X||!(m==1&&Qg(a,u)||m==2&&yc(a)))switch(d&&0<d.length&&(u=a.h,u.i=u.i.concat(d)),D){case 1:jn(a,5);break;case 4:jn(a,10);break;case 3:jn(a,6);break;default:jn(a,2)}}}function Ed(a,u){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*u}function jn(a,u){if(a.j.info("Error code "+u),u==2){var d=S(a.fb,a),m=a.Xa;let D=!m;m=new te(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||ue(m,"https"),j(m),D?jg(m.toString(),d):qg(m.toString(),d)}else Ae(2);a.G=0,a.l&&a.l.sa(u),bd(a),gd(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ae(2)):(this.j.info("Failed to ping google.com"),Ae(1))};function bd(a){if(a.G=0,a.ka=[],a.l){let u=y(a.h);(u.length!=0||a.i.length!=0)&&(M(a.ka,u),M(a.ka,a.i),a.h.i.length=0,$(a.i),a.i.length=0),a.l.ra()}}function Td(a,u,d){var m=d instanceof te?fe(d):new te(d);if(m.g!="")u&&(m.g=u+"."+m.g),Le(m,m.s);else{var D=c.location;m=D.protocol,u=u?u+"."+D.hostname:D.hostname,D=+D.port;var x=new te(null);m&&ue(x,m),u&&(x.g=u),D&&Le(x,D),d&&(x.l=d),m=x}return d=a.D,u=a.ya,d&&u&&ne(m,d,u),ne(m,"VER",a.la),$i(a,m),m}function Ad(a,u,d){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new Se(new Vi({eb:d})):new Se(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Sd(){}n=Sd.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function lo(){}lo.prototype.g=function(a,u){return new ut(a,u)};function ut(a,u){Fe.call(this),this.g=new md(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!J(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!J(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new Cr(this)}F(ut,Fe),ut.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ut.prototype.close=function(){_c(this.g)},ut.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Ti(a),a=d);u.i.push(new to(u.Ya++,a)),u.G==3&&ao(u)},ut.prototype.N=function(){this.g.l=null,delete this.j,_c(this.g),delete this.g,ut.aa.N.call(this)};function Rd(a){Er.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(let d in u){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}F(Rd,Er);function Pd(){Ri.call(this),this.status=1}F(Pd,Ri);function Cr(a){this.g=a}F(Cr,Sd),Cr.prototype.ua=function(){Be(this.g,"a")},Cr.prototype.ta=function(a){Be(this.g,new Rd(a))},Cr.prototype.sa=function(a){Be(this.g,new Pd)},Cr.prototype.ra=function(){Be(this.g,"b")},lo.prototype.createWebChannel=lo.prototype.g,ut.prototype.send=ut.prototype.o,ut.prototype.open=ut.prototype.m,ut.prototype.close=ut.prototype.close,Jc=Wt.createWebChannelTransport=function(){return new lo},Yc=Wt.getStatEventTarget=function(){return br()},Qc=Wt.Event=Rt,vo=Wt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Tr.NO_ERROR=0,Tr.TIMEOUT=8,Tr.HTTP_ERROR=6,ji=Wt.ErrorCode=Tr,Js.COMPLETE="complete",Wc=Wt.EventType=Js,Ir.EventType=jt,jt.OPEN="a",jt.CLOSE="b",jt.ERROR="c",jt.MESSAGE="d",Fe.prototype.listen=Fe.prototype.K,Or=Wt.WebChannel=Ir,Hc=Wt.FetchXmlHttpFactory=Vi,Se.prototype.listenOnce=Se.prototype.L,Se.prototype.getLastError=Se.prototype.Ka,Se.prototype.getLastErrorCode=Se.prototype.Ba,Se.prototype.getStatus=Se.prototype.Z,Se.prototype.getResponseJson=Se.prototype.Oa,Se.prototype.getResponseText=Se.prototype.oa,Se.prototype.send=Se.prototype.ea,Se.prototype.setWithCredentials=Se.prototype.Ha,Kc=Wt.XhrIo=Se}).apply(typeof yo<"u"?yo:typeof self<"u"?self:typeof window<"u"?window:{});var nf="@firebase/firestore";var $e=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};$e.UNAUTHENTICATED=new $e(null),$e.GOOGLE_CREDENTIALS=new $e("google-credentials-uid"),$e.FIRST_PARTY=new $e("first-party-uid"),$e.MOCK_USER=new $e("mock-user");var hi="10.12.1";var tr=new dn("@firebase/firestore");function $r(){return tr.logLevel}function L(n,...e){if(tr.logLevel<=ce.DEBUG){let t=e.map(Xu);tr.debug(`Firestore (${hi}): ${n}`,...t)}}function De(n,...e){if(tr.logLevel<=ce.ERROR){let t=e.map(Xu);tr.error(`Firestore (${hi}): ${n}`,...t)}}function ts(n,...e){if(tr.logLevel<=ce.WARN){let t=e.map(Xu);tr.warn(`Firestore (${hi}): ${n}`,...t)}}function Xu(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function K(n="Unexpected state"){let e=`FIRESTORE (${hi}) INTERNAL ASSERTION FAILED: `+n;throw De(e),new Error(e)}function Y(n,e){n||K()}function H(n,e){return n}var V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},q=class extends ht{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var kt=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var il=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},sl=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t($e.UNAUTHENTICATED))}shutdown(){}};var ol=class{constructor(e){this.t=e,this.currentUser=$e.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve(),s=new kt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new kt,e.enqueueRetryable(()=>i(this.currentUser))};let o=()=>{let l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){let l=this.t.getImmediate({optional:!0});l?c(l):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new kt)}},0),o()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Y(typeof r.accessToken=="string"),new il(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string"),new $e(e)}},al=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=$e.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},cl=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new al(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t($e.FIRST_PARTY))}shutdown(){}invalidateToken(){}},ll=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},ul=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=s=>{s.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let o=s.token!==this.R;return this.R=s.token,L("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Y(typeof t.token=="string"),this.R=t.token,new ll(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}};function cy(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var Co=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=cy(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function re(n,e){return n<e?-1:n>e?1:0}function Wr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function rp(n){return n+"\0"}var ke=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new q(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new q(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new q(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new q(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?re(this.nanoseconds,e.nanoseconds):re(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var X=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new ke(0,0))}static max(){return new n(new ke(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Do=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&K(),r===void 0?r=e.length-t:r>e.length-t&&K(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},we=class n extends Do{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new q(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},ly=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Me=class n extends Do{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return ly.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new q(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new q(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new q(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new q(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var z=class n{constructor(e){this.path=e}static fromPath(e){return new n(we.fromString(e))}static fromName(e){return new n(we.fromString(e).popFirst(5))}static empty(){return new n(we.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&we.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return we.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new we(e.slice()))}};var Qr=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};function hl(n){return n.fields.find(e=>e.kind===2)}function Kn(n){return n.fields.filter(e=>e.kind!==2)}Qr.UNKNOWN_ID=-1;var Gr=class{constructor(e,t){this.fieldPath=e,this.kind=t}};var ns=class n{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new n(0,vt.min())}};function ip(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=X.fromTimestamp(r===1e9?new ke(t+1,0):new ke(t,r));return new vt(i,z.empty(),e)}function sp(n){return new vt(n.readTime,n.key,-1)}var vt=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(X.min(),z.empty(),-1)}static max(){return new n(X.max(),z.empty(),-1)}};function Zu(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=z.comparator(n.documentKey,e.documentKey),t!==0?t:re(n.largestBatchId,e.largestBatchId))}var op="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",ko=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function Cn(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==op)throw n;L("LocalStore","Unexpectedly lost primary lease")}var N=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&K(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},l=>r(l))}),o=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,o=new Array(s),c=0;for(let l=0;l<s;l++){let h=l;t(e[h]).next(p=>{o[h]=p,++c,c===s&&r(o)},p=>i(p))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};var No=class n{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new kt,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Zn(e,t.error)):this.V.resolve()},this.transaction.onerror=r=>{let i=eh(r.target.error);this.V.reject(new Zn(e,i))}}static open(e,t,r,i){try{return new n(t,e.transaction(i,r))}catch(s){throw new Zn(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(L("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){let e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){let t=this.transaction.objectStore(e);return new fl(t)}},Yr=class n{constructor(e,t,r){this.name=e,this.version=t,this.p=r,n.S(Re())===12.2&&De("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return L("SimpleDb","Removing database:",e),Hn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!po())return!1;if(n.C())return!0;let e=Re(),t=n.S(e),r=0<t&&t<10,i=ap(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static C(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.v)==="YES"}static F(e,t){return e.store(t)}static S(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||(L("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{let i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{let o=s.target.result;t(o)},i.onblocked=()=>{r(new Zn(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{let o=s.target.error;o.name==="VersionError"?r(new q(V.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new q(V.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Zn(e,o))},i.onupgradeneeded=s=>{L("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);let o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{L("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){let s=t==="readonly",o=0;for(;;){++o;try{this.db=await this.M(e);let c=No.open(this.db,e,s?"readonly":"readwrite",r),l=i(c).next(h=>(c.g(),h)).catch(h=>(c.abort(h),N.reject(h))).toPromise();return l.catch(()=>{}),await c.m,l}catch(c){let l=c,h=l.name!=="FirebaseError"&&o<3;if(L("SimpleDb","Transaction failed with error:",l.message,"Retrying:",h),this.close(),!h)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}};function ap(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}var dl=class{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return Hn(this.B.delete())}},Zn=class extends q{constructor(e,t){super(V.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}};function Dn(n){return n.name==="IndexedDbTransactionError"}var fl=class{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(L("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(L("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Hn(r)}add(e){return L("SimpleDb","ADD",this.store.name,e,e),Hn(this.store.add(e))}get(e){return Hn(this.store.get(e)).next(t=>(t===void 0&&(t=null),L("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return L("SimpleDb","DELETE",this.store.name,e),Hn(this.store.delete(e))}count(){return L("SimpleDb","COUNT",this.store.name),Hn(this.store.count())}U(e,t){let r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){let s=i.getAll(r.range);return new N((o,c)=>{s.onerror=l=>{c(l.target.error)},s.onsuccess=l=>{o(l.target.result)}})}{let s=this.cursor(r),o=[];return this.W(s,(c,l)=>{o.push(l)}).next(()=>o)}}G(e,t){let r=this.store.getAll(e,t===null?void 0:t);return new N((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}j(e,t){L("SimpleDb","DELETE ALL",this.store.name);let r=this.options(e,t);r.H=!1;let i=this.cursor(r);return this.W(i,(s,o,c)=>c.delete())}J(e,t){let r;t?r=e:(r={},t=e);let i=this.cursor(r);return this.W(i,t)}Y(e){let t=this.cursor({});return new N((r,i)=>{t.onerror=s=>{let o=eh(s.target.error);i(o)},t.onsuccess=s=>{let o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}W(e,t){let r=[];return new N((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{let c=o.target.result;if(!c)return void i();let l=new dl(c),h=t(c.primaryKey,c.value,l);if(h instanceof N){let p=h.catch(v=>(l.done(),N.reject(v)));r.push(p)}l.isDone?i():l.K===null?c.continue():c.continue(l.K)}}).next(()=>N.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}};function Hn(n){return new N((e,t)=>{n.onsuccess=r=>{let i=r.target.result;e(i)},n.onerror=r=>{let i=eh(r.target.error);t(i)}})}var rf=!1;function eh(n){let e=Yr.S(Re());if(e>=12.2&&e<13){let t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){let r=new q("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return rf||(rf=!0,setTimeout(()=>{throw r},0)),r}}return n}var pl=class{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){L("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{L("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Dn(t)?L("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await Cn(t)}await this.X(6e4)})}},ml=class{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){let r=new Set,i=t,s=!0;return N.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return L("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(c=>{i-=c,r.add(o)});s=!1})).next(()=>t-i)}ne(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{let o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(c=>(L("IndexBackfiller",`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}re(e,t){let r=e;return t.changes.forEach((i,s)=>{let o=sp(s);Zu(o,r)>0&&(r=o)}),new vt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}};var Je=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};Je.oe=-1;function Ta(n){return n==null}function rs(n){return n===0&&1/n==-1/0}function cp(n){return typeof n=="number"&&Number.isInteger(n)&&!rs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function nt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=sf(e)),e=uy(n.get(t),e);return sf(e)}function uy(n,e){let t=e,r=n.length;for(let i=0;i<r;i++){let s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function sf(n){return n+""}function Ct(n){let e=n.length;if(Y(e>=2),e===2)return Y(n.charAt(0)===""&&n.charAt(1)===""),we.emptyPath();let t=e-2,r=[],i="";for(let s=0;s<e;){let o=n.indexOf("",s);switch((o<0||o>t)&&K(),n.charAt(o+1)){case"":let c=n.substring(s,o),l;i.length===0?l=c:(i+=c,l=i,i=""),r.push(l);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:K()}s=o+2}return new we(r)}var of=["userId","batchId"];function To(n,e){return[n,nt(e)]}function lp(n,e,t){return[n,nt(e),t]}var hy={},dy=["prefixPath","collectionGroup","readTime","documentId"],fy=["prefixPath","collectionGroup","documentId"],py=["collectionGroup","readTime","prefixPath","documentId"],my=["canonicalId","targetId"],gy=["targetId","path"],_y=["path","targetId"],yy=["collectionId","parent"],vy=["indexId","uid"],wy=["uid","sequenceNumber"],Iy=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Ey=["indexId","uid","orderedDocumentKey"],by=["userId","collectionPath","documentId"],Ty=["userId","collectionPath","largestBatchId"],Ay=["userId","collectionGroup","largestBatchId"],up=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],Sy=[...up,"documentOverlays"],hp=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],dp=hp,fp=[...dp,"indexConfiguration","indexState","indexEntries"],Ry=fp;var is=class extends ko{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}};function Ue(n,e){let t=H(n);return Yr.F(t._e,e)}function af(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function ur(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function pp(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var Ee=class n{constructor(e,t){this.comparator=e,this.root=t||Nt.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Nt.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Nt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new zr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new zr(this.root,e,this.comparator,!1)}getReverseIterator(){return new zr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new zr(this.root,e,this.comparator,!0)}},zr=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Nt=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=s??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw K();let e=this.left.check();if(e!==this.right.check())throw K();return e+(this.isRed()?0:1)}};Nt.EMPTY=null,Nt.RED=!0,Nt.BLACK=!1;Nt.EMPTY=new class{constructor(){this.size=0}get key(){throw K()}get value(){throw K()}get color(){throw K()}get left(){throw K()}get right(){throw K()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Nt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var Ie=class n{constructor(e){this.comparator=e,this.data=new Ee(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new xo(this.data.getIterator())}getIteratorFrom(e){return new xo(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},xo=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};function Vr(n){return n.hasNext()?n.getNext():void 0}var dt=class n{constructor(e){this.fields=e,e.sort(Me.comparator)}static empty(){return new n([])}unionWith(e){let t=new Ie(Me.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Wr(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Oo=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Ke=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Oo("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return re(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Ke.EMPTY_BYTE_STRING=new Ke("");var Py=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Jt(n){if(Y(!!n),typeof n=="string"){let e=0,t=Py.exec(n);if(Y(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Pe(n.seconds),nanos:Pe(n.nanos)}}function Pe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function En(n){return typeof n=="string"?Ke.fromBase64String(n):Ke.fromUint8Array(n)}function th(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function nh(n){let e=n.mapValue.fields.__previous_value__;return th(e)?nh(e):e}function ss(n){let e=Jt(n.mapValue.fields.__local_write_time__.timestampValue);return new ke(e.seconds,e.nanos)}var gl=class{constructor(e,t,r,i,s,o,c,l,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h}},Jr=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var wn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Ao={nullValue:"NULL_VALUE"};function nr(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?th(n)?4:mp(n)?9007199254740991:10:K()}function xt(n,e){if(n===e)return!0;let t=nr(n);if(t!==nr(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ss(n).isEqual(ss(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=Jt(i.timestampValue),c=Jt(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return En(i.bytesValue).isEqual(En(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return Pe(i.geoPointValue.latitude)===Pe(s.geoPointValue.latitude)&&Pe(i.geoPointValue.longitude)===Pe(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Pe(i.integerValue)===Pe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=Pe(i.doubleValue),c=Pe(s.doubleValue);return o===c?rs(o)===rs(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return Wr(n.arrayValue.values||[],e.arrayValue.values||[],xt);case 10:return function(i,s){let o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(af(o)!==af(c))return!1;for(let l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!xt(o[l],c[l])))return!1;return!0}(n,e);default:return K()}}function os(n,e){return(n.values||[]).find(t=>xt(t,e))!==void 0}function bn(n,e){if(n===e)return 0;let t=nr(n),r=nr(e);if(t!==r)return re(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return re(n.booleanValue,e.booleanValue);case 2:return function(s,o){let c=Pe(s.integerValue||s.doubleValue),l=Pe(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return cf(n.timestampValue,e.timestampValue);case 4:return cf(ss(n),ss(e));case 5:return re(n.stringValue,e.stringValue);case 6:return function(s,o){let c=En(s),l=En(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){let c=s.split("/"),l=o.split("/");for(let h=0;h<c.length&&h<l.length;h++){let p=re(c[h],l[h]);if(p!==0)return p}return re(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){let c=re(Pe(s.latitude),Pe(o.latitude));return c!==0?c:re(Pe(s.longitude),Pe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,o){let c=s.values||[],l=o.values||[];for(let h=0;h<c.length&&h<l.length;++h){let p=bn(c[h],l[h]);if(p)return p}return re(c.length,l.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,o){if(s===wn.mapValue&&o===wn.mapValue)return 0;if(s===wn.mapValue)return 1;if(o===wn.mapValue)return-1;let c=s.fields||{},l=Object.keys(c),h=o.fields||{},p=Object.keys(h);l.sort(),p.sort();for(let v=0;v<l.length&&v<p.length;++v){let S=re(l[v],p[v]);if(S!==0)return S;let k=bn(c[l[v]],h[p[v]]);if(k!==0)return k}return re(l.length,p.length)}(n.mapValue,e.mapValue);default:throw K()}}function cf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return re(n,e);let t=Jt(n),r=Jt(e),i=re(t.seconds,r.seconds);return i!==0?i:re(t.nanos,r.nanos)}function Xr(n){return _l(n)}function _l(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=Jt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return En(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return z.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=_l(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let o of r)s?s=!1:i+=",",i+=`${o}:${_l(t.fields[o])}`;return i+"}"}(n.mapValue):K()}function rh(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function yl(n){return!!n&&"integerValue"in n}function as(n){return!!n&&"arrayValue"in n}function lf(n){return!!n&&"nullValue"in n}function uf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function So(n){return!!n&&"mapValue"in n}function Qi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return ur(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Qi(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Qi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function mp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}function Cy(n){return"nullValue"in n?Ao:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?rh(Jr.empty(),z.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?{mapValue:{}}:K()}function Dy(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?rh(Jr.empty(),z.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?{mapValue:{}}:"mapValue"in n?wn:K()}function hf(n,e){let t=bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function df(n,e){let t=bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}var tt=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!So(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Qi(t)}setAll(e){let t=Me.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){let l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Qi(o):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());So(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return xt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];So(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){ur(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(Qi(this.value))}};function gp(n){let e=[];return ur(n.fields,(t,r)=>{let i=new Me([t]);if(So(r)){let s=gp(r.mapValue).fields;if(s.length===0)e.push(i);else for(let o of s)e.push(i.child(o))}else e.push(i)}),new dt(e)}var Ge=class n{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new n(e,0,X.min(),X.min(),X.min(),tt.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,X.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,X.min(),X.min(),tt.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,X.min(),X.min(),tt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(X.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=X.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Tn=class{constructor(e,t){this.position=e,this.inclusive=t}};function ff(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],o=n.position[i];if(s.field.isKeyField()?r=z.comparator(z.fromName(o.referenceValue),t.key):r=bn(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function pf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!xt(n.position[t],e.position[t]))return!1;return!0}var Zr=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function ky(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var Vo=class{},he=class n extends Vo{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Il(e,t,r):t==="array-contains"?new Tl(e,r):t==="in"?new Lo(e,r):t==="not-in"?new Al(e,r):t==="array-contains-any"?new Sl(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new El(e,r):new bl(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(bn(t,this.value)):t!==null&&nr(this.value)===nr(t)&&this.matchesComparison(bn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},ge=class n extends Vo{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new n(e,t)}matches(e){return ei(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function ei(n){return n.op==="and"}function vl(n){return n.op==="or"}function ih(n){return _p(n)&&ei(n)}function _p(n){for(let e of n.filters)if(e instanceof ge)return!1;return!0}function wl(n){if(n instanceof he)return n.field.canonicalString()+n.op.toString()+Xr(n.value);if(ih(n))return n.filters.map(e=>wl(e)).join(",");{let e=n.filters.map(t=>wl(t)).join(",");return`${n.op}(${e})`}}function yp(n,e){return n instanceof he?function(r,i){return i instanceof he&&r.op===i.op&&r.field.isEqual(i.field)&&xt(r.value,i.value)}(n,e):n instanceof ge?function(r,i){return i instanceof ge&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&yp(o,i.filters[c]),!0):!1}(n,e):void K()}function vp(n,e){let t=n.filters.concat(e);return ge.create(t,n.op)}function wp(n){return n instanceof he?function(t){return`${t.field.canonicalString()} ${t.op} ${Xr(t.value)}`}(n):n instanceof ge?function(t){return t.op.toString()+" {"+t.getFilters().map(wp).join(" ,")+"}"}(n):"Filter"}var Il=class extends he{constructor(e,t,r){super(e,t,r),this.key=z.fromName(r.referenceValue)}matches(e){let t=z.comparator(e.key,this.key);return this.matchesComparison(t)}},El=class extends he{constructor(e,t){super(e,"in",t),this.keys=Ip("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},bl=class extends he{constructor(e,t){super(e,"not-in",t),this.keys=Ip("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Ip(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>z.fromName(r.referenceValue))}var Tl=class extends he{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return as(t)&&os(t.arrayValue,this.value)}},Lo=class extends he{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&os(this.value.arrayValue,t)}},Al=class extends he{constructor(e,t){super(e,"not-in",t)}matches(e){if(os(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!os(this.value.arrayValue,t)}},Sl=class extends he{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!as(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>os(this.value.arrayValue,r))}};var Rl=class{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.ue=null}};function Pl(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Rl(n,e,t,r,i,s,o)}function rr(n){let e=H(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>wl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Ta(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Xr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Xr(r)).join(",")),e.ue=t}return e.ue}function Is(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!ky(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!yp(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!pf(n.startAt,e.startAt)&&pf(n.endAt,e.endAt)}function Mo(n){return z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Fo(n,e){return n.filters.filter(t=>t instanceof he&&t.field.isEqual(e))}function mf(n,e,t){let r=Ao,i=!0;for(let s of Fo(n,e)){let o=Ao,c=!0;switch(s.op){case"<":case"<=":o=Cy(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=Ao}hf({value:r,inclusive:i},{value:o,inclusive:c})<0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){let o=t.position[s];hf({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function gf(n,e,t){let r=wn,i=!0;for(let s of Fo(n,e)){let o=wn,c=!0;switch(s.op){case">=":case">":o=Dy(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=wn}df({value:r,inclusive:i},{value:o,inclusive:c})>0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){let o=t.position[s];df({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}var ti=class{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function Ep(n,e,t,r,i,s,o,c){return new ti(n,e,t,r,i,s,o,c)}function Aa(n){return new ti(n)}function _f(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ny(n){return n.collectionGroup!==null}function Yi(n){let e=H(n);if(e.ce===null){e.ce=[];let t=new Set;for(let s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Ie(Me.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Zr(s,r))}),t.has(Me.keyField().canonicalString())||e.ce.push(new Zr(Me.keyField(),r))}return e.ce}function pt(n){let e=H(n);return e.le||(e.le=xy(e,Yi(n))),e.le}function xy(n,e){if(n.limitType==="F")return Pl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new Zr(i.field,s)});let t=n.endAt?new Tn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Tn(n.startAt.position,n.startAt.inclusive):null;return Pl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Cl(n,e,t){return new ti(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Sa(n,e){return Is(pt(n),pt(e))&&n.limitType===e.limitType}function bp(n){return`${rr(pt(n))}|lt:${n.limitType}`}function Ur(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>wp(i)).join(", ")}]`),Ta(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Xr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Xr(i)).join(",")),`Target(${r})`}(pt(n))}; limitType=${n.limitType})`}function Es(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):z.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of Yi(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,l){let h=ff(o,c,l);return o.inclusive?h<=0:h<0}(r.startAt,Yi(r),i)||r.endAt&&!function(o,c,l){let h=ff(o,c,l);return o.inclusive?h>=0:h>0}(r.endAt,Yi(r),i))}(n,e)}function Tp(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ap(n){return(e,t)=>{let r=!1;for(let i of Yi(n)){let s=Oy(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function Oy(n,e,t){let r=n.field.isKeyField()?z.comparator(e.key,t.key):function(s,o,c){let l=o.data.field(s),h=c.data.field(s);return l!==null&&h!==null?bn(l,h):K()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return K()}}var Ot=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){ur(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return pp(this.inner)}size(){return this.innerSize}};var Vy=new Ee(z.comparator);function ft(){return Vy}var Sp=new Ee(z.comparator);function Hi(...n){let e=Sp;for(let t of n)e=e.insert(t.key,t);return e}function Rp(n){let e=Sp;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Dt(){return Ji()}function Pp(){return Ji()}function Ji(){return new Ot(n=>n.toString(),(n,e)=>n.isEqual(e))}var Ly=new Ee(z.comparator),My=new Ie(z.comparator);function ae(...n){let e=My;for(let t of n)e=e.add(t);return e}var Fy=new Ie(re);function sh(){return Fy}function Cp(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:rs(e)?"-0":e}}function Dp(n){return{integerValue:""+n}}function $y(n,e){return cp(e)?Dp(e):Cp(n,e)}var ni=class{constructor(){this._=void 0}};function Uy(n,e,t){return n instanceof ir?function(i,s){let o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&th(s)&&(s=nh(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):n instanceof An?Np(n,e):n instanceof Sn?xp(n,e):function(i,s){let o=kp(i,s),c=yf(o)+yf(i.Pe);return yl(o)&&yl(i.Pe)?Dp(c):Cp(i.serializer,c)}(n,e)}function By(n,e,t){return n instanceof An?Np(n,e):n instanceof Sn?xp(n,e):t}function kp(n,e){return n instanceof sr?function(r){return yl(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var ir=class extends ni{},An=class extends ni{constructor(e){super(),this.elements=e}};function Np(n,e){let t=Op(e);for(let r of n.elements)t.some(i=>xt(i,r))||t.push(r);return{arrayValue:{values:t}}}var Sn=class extends ni{constructor(e){super(),this.elements=e}};function xp(n,e){let t=Op(e);for(let r of n.elements)t=t.filter(i=>!xt(i,r));return{arrayValue:{values:t}}}var sr=class extends ni{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function yf(n){return Pe(n.integerValue||n.doubleValue)}function Op(n){return as(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var Dl=class{constructor(e,t){this.field=e,this.transform=t}};function jy(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof An&&i instanceof An||r instanceof Sn&&i instanceof Sn?Wr(r.elements,i.elements,xt):r instanceof sr&&i instanceof sr?xt(r.Pe,i.Pe):r instanceof ir&&i instanceof ir}(n.transform,e.transform)}var kl=class{constructor(e,t){this.version=e,this.transformResults=t}},Xe=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Ro(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var ri=class{};function Vp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new or(n.key,Xe.none()):new Rn(n.key,n.data,Xe.none());{let t=n.data,r=tt.empty(),i=new Ie(Me.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Tt(n.key,r,new dt(i.toArray()),Xe.none())}}function qy(n,e,t){n instanceof Rn?function(i,s,o){let c=i.value.clone(),l=wf(i.fieldTransforms,s,o.transformResults);c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Tt?function(i,s,o){if(!Ro(i.precondition,s))return void s.convertToUnknownDocument(o.version);let c=wf(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(Lp(i)),l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Xi(n,e,t,r){return n instanceof Rn?function(s,o,c,l){if(!Ro(s.precondition,o))return c;let h=s.value.clone(),p=If(s.fieldTransforms,l,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Tt?function(s,o,c,l){if(!Ro(s.precondition,o))return c;let h=If(s.fieldTransforms,l,o),p=o.data;return p.setAll(Lp(s)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(v=>v.field))}(n,e,t,r):function(s,o,c){return Ro(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function zy(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=kp(r.transform,i||null);s!=null&&(t===null&&(t=tt.empty()),t.set(r.field,s))}return t||null}function vf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Wr(r,i,(s,o)=>jy(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Rn=class extends ri{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Tt=class extends ri{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function Lp(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function wf(n,e,t){let r=new Map;Y(n.length===t.length);for(let i=0;i<t.length;i++){let s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,By(o,c,t[i]))}return r}function If(n,e,t){let r=new Map;for(let i of n){let s=i.transform,o=t.data.field(i.field);r.set(i.field,Uy(s,o,e))}return r}var or=class extends ri{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},$o=class extends ri{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var cs=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&qy(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=Xi(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=Xi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=Pp();return this.mutations.forEach(i=>{let s=e.get(i.key),o=s.overlayedDocument,c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;let l=Vp(o,c);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(X.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ae())}isEqual(e){return this.batchId===e.batchId&&Wr(this.mutations,e.mutations,(t,r)=>vf(t,r))&&Wr(this.baseMutations,e.baseMutations,(t,r)=>vf(t,r))}},Nl=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Y(e.mutations.length===r.length);let i=function(){return Ly}(),s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new n(e,t,r,i)}};var ls=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var xl=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var Ne,de;function Gy(n){switch(n){default:return K();case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0}}function Mp(n){if(n===void 0)return De("GRPC error has no .code"),V.UNKNOWN;switch(n){case Ne.OK:return V.OK;case Ne.CANCELLED:return V.CANCELLED;case Ne.UNKNOWN:return V.UNKNOWN;case Ne.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case Ne.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case Ne.INTERNAL:return V.INTERNAL;case Ne.UNAVAILABLE:return V.UNAVAILABLE;case Ne.UNAUTHENTICATED:return V.UNAUTHENTICATED;case Ne.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case Ne.NOT_FOUND:return V.NOT_FOUND;case Ne.ALREADY_EXISTS:return V.ALREADY_EXISTS;case Ne.PERMISSION_DENIED:return V.PERMISSION_DENIED;case Ne.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case Ne.ABORTED:return V.ABORTED;case Ne.OUT_OF_RANGE:return V.OUT_OF_RANGE;case Ne.UNIMPLEMENTED:return V.UNIMPLEMENTED;case Ne.DATA_LOSS:return V.DATA_LOSS;default:return K()}}(de=Ne||(Ne={}))[de.OK=0]="OK",de[de.CANCELLED=1]="CANCELLED",de[de.UNKNOWN=2]="UNKNOWN",de[de.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",de[de.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",de[de.NOT_FOUND=5]="NOT_FOUND",de[de.ALREADY_EXISTS=6]="ALREADY_EXISTS",de[de.PERMISSION_DENIED=7]="PERMISSION_DENIED",de[de.UNAUTHENTICATED=16]="UNAUTHENTICATED",de[de.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",de[de.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",de[de.ABORTED=10]="ABORTED",de[de.OUT_OF_RANGE=11]="OUT_OF_RANGE",de[de.UNIMPLEMENTED=12]="UNIMPLEMENTED",de[de.INTERNAL=13]="INTERNAL",de[de.UNAVAILABLE=14]="UNAVAILABLE",de[de.DATA_LOSS=15]="DATA_LOSS";var Ef=null;function Ky(){return new TextEncoder}var Hy=new gn([4294967295,4294967295],0);function bf(n){let e=Ky().encode(n),t=new Gc;return t.update(e),new Uint8Array(t.digest())}function Tf(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new gn([t,r],0),new gn([i,s],0)]}var Ol=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Jn(`Invalid padding: ${t}`);if(r<0)throw new Jn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Jn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Jn(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=gn.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(gn.fromNumber(r)));return i.compare(Hy)===1&&(i=new gn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;let t=bf(e),[r,i]=Tf(t);for(let s=0;s<this.hashCount;s++){let o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new n(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ie===0)return;let t=bf(e),[r,i]=Tf(t);for(let s=0;s<this.hashCount;s++){let o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},Jn=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var us=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,hs.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(X.min(),i,new Ee(re),ft(),ae())}},hs=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,ae(),ae(),ae())}};var Kr=class{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}},Uo=class{constructor(e,t){this.targetId=e,this.me=t}},Bo=class{constructor(e,t,r=Ke.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},jo=class{constructor(){this.fe=0,this.ge=Sf(),this.pe=Ke.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}Ce(){let e=ae(),t=ae(),r=ae();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:K()}}),new hs(this.pe,this.ye,e,t,r)}ve(){this.we=!1,this.ge=Sf()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Y(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}},Vl=class{constructor(e){this.Le=e,this.Be=new Map,this.ke=ft(),this.qe=Af(),this.Qe=new Ee(re)}Ke(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{let r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.ve(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:K()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){let t=e.targetId,r=e.me.count,i=this.Je(t);if(i){let s=i.target;if(Mo(s))if(r===0){let o=new z(s.path);this.Ue(t,o,Ge.newNoDocument(o,X.min()))}else Y(r===1);else{let o=this.Ye(t);if(o!==r){let c=this.Ze(e),l=c?this.Xe(c,e,o):1;if(l!==0){this.je(t);let h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}Ef?.et(function(p,v,S,k,F){var $,M,Z,J,B,ie;let le={localCacheCount:p,existenceFilterCount:v.count,databaseId:S.database,projectId:S.projectId},ee=v.unchangedNames;return ee&&(le.bloomFilter={applied:F===0,hashCount:($=ee?.hashCount)!==null&&$!==void 0?$:0,bitmapLength:(J=(Z=(M=ee?.bits)===null||M===void 0?void 0:M.bitmap)===null||Z===void 0?void 0:Z.length)!==null&&J!==void 0?J:0,padding:(ie=(B=ee?.bits)===null||B===void 0?void 0:B.padding)!==null&&ie!==void 0?ie:0,mightContain:T=>{var I;return(I=k?.mightContain(T))!==null&&I!==void 0&&I}}),le}(o,e.me,this.Le.tt(),c,l))}}}}Ze(e){let t=e.me.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,o,c;try{o=En(r).toUint8Array()}catch(l){if(l instanceof Oo)return ts("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Ol(o,i,s)}catch(l){return ts(l instanceof Jn?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){let r=this.Le.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){let t=new Map;this.Be.forEach((s,o)=>{let c=this.Je(o);if(c){if(s.current&&Mo(c.target)){let l=new z(c.target.path);this.ke.get(l)!==null||this.it(o,l)||this.Ue(o,l,Ge.newNoDocument(l,e))}s.be&&(t.set(o,s.Ce()),s.ve())}});let r=ae();this.qe.forEach((s,o)=>{let c=!0;o.forEachWhile(l=>{let h=this.Je(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));let i=new us(e,t,this.Qe,this.ke,r);return this.ke=ft(),this.qe=Af(),this.Qe=new Ee(re),i}$e(e,t){if(!this.ze(e))return;let r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;let i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){let t=this.Ge(e).Ce();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new jo,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ie(re),this.qe=this.qe.insert(e,t)),t}ze(e){let t=this.Je(e)!==null;return t||L("WatchChangeAggregator","Detected inactive target",e),t}Je(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new jo),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}};function Af(){return new Ee(z.comparator)}function Sf(){return new Ee(z.comparator)}var Wy={asc:"ASCENDING",desc:"DESCENDING"},Qy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Yy={and:"AND",or:"OR"},Ll=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function Ml(n,e){return n.useProto3Json||Ta(e)?e:{value:e}}function ii(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Fp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Jy(n,e){return ii(n,e.toTimestamp())}function rt(n){return Y(!!n),X.fromTimestamp(function(t){let r=Jt(t);return new ke(r.seconds,r.nanos)}(n))}function oh(n,e){return Fl(n,e).canonicalString()}function Fl(n,e){let t=function(i){return new we(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function $p(n){let e=we.fromString(n);return Y(Wp(e)),e}function qo(n,e){return oh(n.databaseId,e.path)}function er(n,e){let t=$p(e);if(t.get(1)!==n.databaseId.projectId)throw new q(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new q(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new z(jp(t))}function Up(n,e){return oh(n.databaseId,e)}function Bp(n){let e=$p(n);return e.length===4?we.emptyPath():jp(e)}function $l(n){return new we(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function jp(n){return Y(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Rf(n,e,t){return{name:qo(n,e),fields:t.value.mapValue.fields}}function Xy(n,e,t){let r=er(n,e.name),i=rt(e.updateTime),s=e.createTime?rt(e.createTime):X.min(),o=new tt({mapValue:{fields:e.fields}}),c=Ge.newFoundDocument(r,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function Zy(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:K()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,p){return h.useProto3Json?(Y(p===void 0||typeof p=="string"),Ke.fromBase64String(p||"")):(Y(p===void 0||p instanceof Buffer||p instanceof Uint8Array),Ke.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){let p=h.code===void 0?V.UNKNOWN:Mp(h.code);return new q(p,h.message||"")}(o);t=new Bo(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=er(n,r.document.name),s=rt(r.document.updateTime),o=r.document.createTime?rt(r.document.createTime):X.min(),c=new tt({mapValue:{fields:r.document.fields}}),l=Ge.newFoundDocument(i,s,o,c),h=r.targetIds||[],p=r.removedTargetIds||[];t=new Kr(h,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=er(n,r.document),s=r.readTime?rt(r.readTime):X.min(),o=Ge.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Kr([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=er(n,r.document),s=r.removedTargetIds||[];t=new Kr([],s,i,null)}else{if(!("filter"in e))return K();{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,o=new xl(i,s),c=r.targetId;t=new Uo(c,o)}}return t}function zo(n,e){let t;if(e instanceof Rn)t={update:Rf(n,e.key,e.value)};else if(e instanceof or)t={delete:qo(n,e.key)};else if(e instanceof Tt)t={update:Rf(n,e.key,e.data),updateMask:sv(e.fieldMask)};else{if(!(e instanceof $o))return K();t={verify:qo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){let c=o.transform;if(c instanceof ir)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof An)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Sn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof sr)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw K()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Jy(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:K()}(n,e.precondition)),t}function Ul(n,e){let t=e.currentDocument?function(s){return s.updateTime!==void 0?Xe.updateTime(rt(s.updateTime)):s.exists!==void 0?Xe.exists(s.exists):Xe.none()}(e.currentDocument):Xe.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let l=null;if("setToServerValue"in c)Y(c.setToServerValue==="REQUEST_TIME"),l=new ir;else if("appendMissingElements"in c){let p=c.appendMissingElements.values||[];l=new An(p)}else if("removeAllFromArray"in c){let p=c.removeAllFromArray.values||[];l=new Sn(p)}else"increment"in c?l=new sr(o,c.increment):K();let h=Me.fromServerFormat(c.fieldPath);return new Dl(h,l)}(n,i)):[];if(e.update){e.update.name;let i=er(n,e.update.name),s=new tt({mapValue:{fields:e.update.fields}});if(e.updateMask){let o=function(l){let h=l.fieldPaths||[];return new dt(h.map(p=>Me.fromServerFormat(p)))}(e.updateMask);return new Tt(i,s,o,t,r)}return new Rn(i,s,t,r)}if(e.delete){let i=er(n,e.delete);return new or(i,t)}if(e.verify){let i=er(n,e.verify);return new $o(i,t)}return K()}function ev(n,e){return n&&n.length>0?(Y(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?rt(i.updateTime):rt(s);return o.isEqual(X.min())&&(o=rt(s)),new kl(o,i.transformResults||[])}(t,e))):[]}function qp(n,e){return{documents:[Up(n,e.path)]}}function zp(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Up(n,i);let s=function(h){if(h.length!==0)return Hp(ge.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let o=function(h){if(h.length!==0)return h.map(p=>function(S){return{field:Br(S.field),direction:nv(S.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let c=Ml(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:i}}function Gp(n){let e=Bp(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){Y(r===1);let p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(v){let S=Kp(v);return S instanceof ge&&ih(S)?S.getFilters():[S]}(t.where));let o=[];t.orderBy&&(o=function(v){return v.map(S=>function(F){return new Zr(jr(F.field),function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(F.direction))}(S))}(t.orderBy));let c=null;t.limit&&(c=function(v){let S;return S=typeof v=="object"?v.value:v,Ta(S)?null:S}(t.limit));let l=null;t.startAt&&(l=function(v){let S=!!v.before,k=v.values||[];return new Tn(k,S)}(t.startAt));let h=null;return t.endAt&&(h=function(v){let S=!v.before,k=v.values||[];return new Tn(k,S)}(t.endAt)),Ep(e,i,o,s,c,"F",l,h)}function tv(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Kp(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=jr(t.unaryFilter.field);return he.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=jr(t.unaryFilter.field);return he.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=jr(t.unaryFilter.field);return he.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let o=jr(t.unaryFilter.field);return he.create(o,"!=",{nullValue:"NULL_VALUE"});default:return K()}}(n):n.fieldFilter!==void 0?function(t){return he.create(jr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return K()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ge.create(t.compositeFilter.filters.map(r=>Kp(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return K()}}(t.compositeFilter.op))}(n):K()}function nv(n){return Wy[n]}function rv(n){return Qy[n]}function iv(n){return Yy[n]}function Br(n){return{fieldPath:n.canonicalString()}}function jr(n){return Me.fromServerFormat(n.fieldPath)}function Hp(n){return n instanceof he?function(t){if(t.op==="=="){if(uf(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NAN"}};if(lf(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(uf(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NOT_NAN"}};if(lf(t.value))return{unaryFilter:{field:Br(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Br(t.field),op:rv(t.op),value:t.value}}}(n):n instanceof ge?function(t){let r=t.getFilters().map(i=>Hp(i));return r.length===1?r[0]:{compositeFilter:{op:iv(t.op),filters:r}}}(n):K()}function sv(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Wp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var si=class n{constructor(e,t,r,i,s=X.min(),o=X.min(),c=Ke.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var Go=class{constructor(e){this.ct=e}};function ov(n,e){let t;if(e.document)t=Xy(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){let r=z.fromSegments(e.noDocument.path),i=cr(e.noDocument.readTime);t=Ge.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return K();{let r=z.fromSegments(e.unknownDocument.path),i=cr(e.unknownDocument.version);t=Ge.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){let s=new ke(i[0],i[1]);return X.fromTimestamp(s)}(e.readTime)),t}function Pf(n,e){let t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ko(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:qo(s,o.key),fields:o.data.value.mapValue.fields,updateTime:ii(s,o.version.toTimestamp()),createTime:ii(s,o.createTime.toTimestamp())}}(n.ct,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:ar(e.version)};else{if(!e.isUnknownDocument())return K();r.unknownDocument={path:t.path.toArray(),version:ar(e.version)}}return r}function Ko(n){let e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function ar(n){let e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function cr(n){let e=new ke(n.seconds,n.nanoseconds);return X.fromTimestamp(e)}function Wn(n,e){let t=(e.baseMutations||[]).map(s=>Ul(n.ct,s));for(let s=0;s<e.mutations.length-1;++s){let o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){let c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}let r=e.mutations.map(s=>Ul(n.ct,s)),i=ke.fromMillis(e.localWriteTimeMs);return new cs(e.batchId,i,t,r)}function Wi(n){let e=cr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?cr(n.lastLimboFreeSnapshotVersion):X.min(),r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){return Y(s.documents.length===1),pt(Aa(Bp(s.documents[0])))}(n.query):function(s){return pt(Gp(s))}(n.query),new si(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Ke.fromBase64String(n.resumeToken))}function Qp(n,e){let t=ar(e.snapshotVersion),r=ar(e.lastLimboFreeSnapshotVersion),i;i=Mo(e.target)?qp(n.ct,e.target):zp(n.ct,e.target)._t;let s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:rr(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Yp(n){let e=Gp({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Cl(e,e.limit,"L"):e}function Xc(n,e){return new ls(e.largestBatchId,Ul(n.ct,e.overlayMutation))}function Cf(n,e){let t=e.path.lastSegment();return[n,nt(e.path.popLast()),t]}function Df(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:ar(r.readTime),documentKey:nt(r.documentKey.path),largestBatchId:r.largestBatchId}}var Bl=class{getBundleMetadata(e,t){return kf(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:cr(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return kf(e).put(function(i){return{bundleId:i.id,createTime:ar(rt(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return Nf(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:Yp(s.bundledQuery),readTime:cr(s.readTime)}}(r)})}saveNamedQuery(e,t){return Nf(e).put(function(i){return{name:i.name,readTime:ar(rt(i.readTime)),bundledQuery:i.bundledQuery}}(t))}};function kf(n){return Ue(n,"bundles")}function Nf(n){return Ue(n,"namedQueries")}var Ho=class n{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){let r=t.uid||"";return new n(e,r)}getOverlay(e,t){return qi(e).get(Cf(this.userId,t)).next(r=>r?Xc(this.serializer,r):null)}getOverlays(e,t){let r=Dt();return N.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){let i=[];return r.forEach((s,o)=>{let c=new ls(t,o);i.push(this.ht(e,c))}),N.waitFor(i)}removeOverlaysForBatchId(e,t,r){let i=new Set;t.forEach(o=>i.add(nt(o.getCollectionPath())));let s=[];return i.forEach(o=>{let c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(qi(e).j("collectionPathOverlayIndex",c))}),N.waitFor(s)}getOverlaysForCollection(e,t,r){let i=Dt(),s=nt(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return qi(e).U("collectionPathOverlayIndex",o).next(c=>{for(let l of c){let h=Xc(this.serializer,l);i.set(h.getKey(),h)}return i})}getOverlaysForCollectionGroup(e,t,r,i){let s=Dt(),o,c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return qi(e).J({index:"collectionGroupOverlayIndex",range:c},(l,h,p)=>{let v=Xc(this.serializer,h);s.size()<i||v.largestBatchId===o?(s.set(v.getKey(),v),o=v.largestBatchId):p.done()}).next(()=>s)}ht(e,t){return qi(e).put(function(i,s,o){let[c,l,h]=Cf(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:zo(i.ct,o.mutation)}}(this.serializer,this.userId,t))}};function qi(n){return Ue(n,"documentOverlays")}var Qt=class{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(Pe(e.integerValue));else if("doubleValue"in e){let r=Pe(e.doubleValue);isNaN(r)?this.Et(t,13):(this.Et(t,15),rs(r)?t.dt(0):t.dt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Et(t,20),typeof r=="string"&&(r=Jt(r)),t.At(`${r.seconds||""}`),t.dt(r.nanos||0)}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(En(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Et(t,45),t.dt(r.latitude||0),t.dt(r.longitude||0)}else"mapValue"in e?mp(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):K()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let r=e.fields||{};this.Et(t,55);for(let i of Object.keys(r))this.Rt(i,t),this.It(r[i],t)}wt(e,t){let r=e.values||[];this.Et(t,50);for(let i of r)this.It(i,t)}gt(e,t){this.Et(t,37),z.fromName(e).path.forEach(r=>{this.Et(t,60),this.St(r,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}};Qt.bt=new Qt;function av(n){if(n===0)return 8;let e=0;return!(n>>4)&&(e+=4,n<<=4),!(n>>6)&&(e+=2,n<<=2),!(n>>7)&&(e+=1),e}function xf(n){let e=64-function(r){let i=0;for(let s=0;s<8;++s){let o=av(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}var jl=class{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Dt(e){let t=e[Symbol.iterator](),r=t.next();for(;!r.done;)this.Ct(r.value),r=t.next();this.vt()}Ft(e){let t=e[Symbol.iterator](),r=t.next();for(;!r.done;)this.Mt(r.value),r=t.next();this.xt()}Ot(e){for(let t of e){let r=t.charCodeAt(0);if(r<128)this.Ct(r);else if(r<2048)this.Ct(960|r>>>6),this.Ct(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ct(480|r>>>12),this.Ct(128|63&r>>>6),this.Ct(128|63&r);else{let i=t.codePointAt(0);this.Ct(240|i>>>18),this.Ct(128|63&i>>>12),this.Ct(128|63&i>>>6),this.Ct(128|63&i)}}this.vt()}Nt(e){for(let t of e){let r=t.charCodeAt(0);if(r<128)this.Mt(r);else if(r<2048)this.Mt(960|r>>>6),this.Mt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Mt(480|r>>>12),this.Mt(128|63&r>>>6),this.Mt(128|63&r);else{let i=t.codePointAt(0);this.Mt(240|i>>>18),this.Mt(128|63&i>>>12),this.Mt(128|63&i>>>6),this.Mt(128|63&i)}}this.xt()}Lt(e){let t=this.Bt(e),r=xf(t);this.kt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}qt(e){let t=this.Bt(e),r=xf(t);this.kt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}Qt(){this.Kt(255),this.Kt(255)}$t(){this.Ut(255),this.Ut(255)}reset(){this.position=0}seed(e){this.kt(e.length),this.buffer.set(e,this.position),this.position+=e.length}Wt(){return this.buffer.slice(0,this.position)}Bt(e){let t=function(s){let o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Ct(e){let t=255&e;t===0?(this.Kt(0),this.Kt(255)):t===255?(this.Kt(255),this.Kt(0)):this.Kt(t)}Mt(e){let t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(e)}vt(){this.Kt(0),this.Kt(1)}xt(){this.Ut(0),this.Ut(1)}Kt(e){this.kt(1),this.buffer[this.position++]=e}Ut(e){this.kt(1),this.buffer[this.position++]=~e}kt(e){let t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);let i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}},ql=class{constructor(e){this.Gt=e}ft(e){this.Gt.Dt(e)}At(e){this.Gt.Ot(e)}dt(e){this.Gt.Lt(e)}Tt(){this.Gt.Qt()}},zl=class{constructor(e){this.Gt=e}ft(e){this.Gt.Ft(e)}At(e){this.Gt.Nt(e)}dt(e){this.Gt.qt(e)}Tt(){this.Gt.$t()}},Qn=class{constructor(){this.Gt=new jl,this.zt=new ql(this.Gt),this.jt=new zl(this.Gt)}seed(e){this.Gt.seed(e)}Ht(e){return e===0?this.zt:this.jt}Wt(){return this.Gt.Wt()}reset(){this.Gt.reset()}};var Yn=class n{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Jt(){let e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new n(this.indexId,this.documentKey,this.arrayValue,r)}};function _n(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=Of(n.arrayValue,e.arrayValue),t!==0?t:(t=Of(n.directionalValue,e.directionalValue),t!==0?t:z.comparator(n.documentKey,e.documentKey)))}function Of(n,e){for(let t=0;t<n.length&&t<e.length;++t){let r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}var Wo=class{constructor(e){this.Yt=new Ie((t,r)=>Me.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.Zt=e.orderBy,this.Xt=[];for(let t of e.filters){let r=t;r.isInequality()?this.Yt=this.Yt.add(r):this.Xt.push(r)}}get en(){return this.Yt.size>1}tn(e){if(Y(e.collectionGroup===this.collectionId),this.en)return!1;let t=hl(e);if(t!==void 0&&!this.nn(t))return!1;let r=Kn(e),i=new Set,s=0,o=0;for(;s<r.length&&this.nn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Yt.size>0){let c=this.Yt.getIterator().getNext();if(!i.has(c.field.canonicalString())){let l=r[s];if(!this.rn(c,l)||!this.sn(this.Zt[o++],l))return!1}++s}for(;s<r.length;++s){let c=r[s];if(o>=this.Zt.length||!this.sn(this.Zt[o++],c))return!1}return!0}on(){if(this.en)return null;let e=new Ie(Me.comparator),t=[];for(let r of this.Xt)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Gr(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Gr(r.field,0))}for(let r of this.Zt)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Gr(r.field,r.dir==="asc"?0:1)));return new Qr(Qr.UNKNOWN_ID,this.collectionId,t,ns.empty())}nn(e){for(let t of this.Xt)if(this.rn(t,e))return!0;return!1}rn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;let r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}sn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}};function Jp(n){var e,t;if(Y(n instanceof he||n instanceof ge),n instanceof he){if(n instanceof Lo){let i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>he.create(n.field,"==",s)))||[];return ge.create(i,"or")}return n}let r=n.filters.map(i=>Jp(i));return ge.create(r,n.op)}function cv(n){if(n.getFilters().length===0)return[];let e=Hl(Jp(n));return Y(Xp(e)),Gl(e)||Kl(e)?[e]:e.getFilters()}function Gl(n){return n instanceof he}function Kl(n){return n instanceof ge&&ih(n)}function Xp(n){return Gl(n)||Kl(n)||function(t){if(t instanceof ge&&vl(t)){for(let r of t.getFilters())if(!Gl(r)&&!Kl(r))return!1;return!0}return!1}(n)}function Hl(n){if(Y(n instanceof he||n instanceof ge),n instanceof he)return n;if(n.filters.length===1)return Hl(n.filters[0]);let e=n.filters.map(r=>Hl(r)),t=ge.create(e,n.op);return t=Qo(t),Xp(t)?t:(Y(t instanceof ge),Y(ei(t)),Y(t.filters.length>1),t.filters.reduce((r,i)=>ah(r,i)))}function ah(n,e){let t;return Y(n instanceof he||n instanceof ge),Y(e instanceof he||e instanceof ge),t=n instanceof he?e instanceof he?function(i,s){return ge.create([i,s],"and")}(n,e):Vf(n,e):e instanceof he?Vf(e,n):function(i,s){if(Y(i.filters.length>0&&s.filters.length>0),ei(i)&&ei(s))return vp(i,s.getFilters());let o=vl(i)?i:s,c=vl(i)?s:i,l=o.filters.map(h=>ah(h,c));return ge.create(l,"or")}(n,e),Qo(t)}function Vf(n,e){if(ei(e))return vp(e,n.getFilters());{let t=e.filters.map(r=>ah(n,r));return ge.create(t,"or")}}function Qo(n){if(Y(n instanceof he||n instanceof ge),n instanceof he)return n;let e=n.getFilters();if(e.length===1)return Qo(e[0]);if(_p(n))return n;let t=e.map(i=>Qo(i)),r=[];return t.forEach(i=>{i instanceof he?r.push(i):i instanceof ge&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ge.create(r,n.op)}var Wl=class{constructor(){this._n=new ds}addToCollectionParentIndex(e,t){return this._n.add(t),N.resolve()}getCollectionParents(e,t){return N.resolve(this._n.getEntries(t))}addFieldIndex(e,t){return N.resolve()}deleteFieldIndex(e,t){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,t){return N.resolve()}getDocumentsMatchingTarget(e,t){return N.resolve(null)}getIndexType(e,t){return N.resolve(0)}getFieldIndexes(e,t){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,t){return N.resolve(vt.min())}getMinOffsetFromCollectionGroup(e,t){return N.resolve(vt.min())}updateCollectionGroup(e,t,r){return N.resolve()}updateIndexEntries(e,t){return N.resolve()}},ds=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ie(we.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ie(we.comparator)).toArray()}};var wo=new Uint8Array(0),Ql=class{constructor(e,t){this.databaseId=t,this.an=new ds,this.un=new Ot(r=>rr(r),(r,i)=>Is(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.an.has(t)){let r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.an.add(t)});let s={collectionId:r,parent:nt(i)};return Lf(e).put(s)}return N.resolve()}getCollectionParents(e,t){let r=[],i=IDBKeyRange.bound([t,""],[rp(t),""],!1,!0);return Lf(e).U(i).next(s=>{for(let o of s){if(o.collectionId!==t)break;r.push(Ct(o.parent))}return r})}addFieldIndex(e,t){let r=zi(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete i.indexId;let s=r.add(i);if(t.indexState){let o=Mr(e);return s.next(c=>{o.put(Df(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){let r=zi(e),i=Mr(e),s=Lr(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){let t=zi(e),r=Lr(e),i=Mr(e);return t.j().next(()=>r.j()).next(()=>i.j())}createTargetIndexes(e,t){return N.forEach(this.cn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){let s=new Wo(r).on();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){let r=Lr(e),i=!0,s=new Map;return N.forEach(this.cn(t),o=>this.ln(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=ae(),c=[];return N.forEach(s,(l,h)=>{L("IndexedDbIndexManager",`Using index ${function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map(ie=>`${ie.fieldPath}:${ie.kind}`).join(",")}`}(l)} to execute ${rr(t)}`);let p=function(B,ie){let le=hl(ie);if(le===void 0)return null;for(let ee of Fo(B,le.fieldPath))switch(ee.op){case"array-contains-any":return ee.value.arrayValue.values||[];case"array-contains":return[ee.value]}return null}(h,l),v=function(B,ie){let le=new Map;for(let ee of Kn(ie))for(let T of Fo(B,ee.fieldPath))switch(T.op){case"==":case"in":le.set(ee.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return le.set(ee.fieldPath.canonicalString(),T.value),Array.from(le.values())}return null}(h,l),S=function(B,ie){let le=[],ee=!0;for(let T of Kn(ie)){let I=T.kind===0?mf(B,T.fieldPath,B.startAt):gf(B,T.fieldPath,B.startAt);le.push(I.value),ee&&(ee=I.inclusive)}return new Tn(le,ee)}(h,l),k=function(B,ie){let le=[],ee=!0;for(let T of Kn(ie)){let I=T.kind===0?gf(B,T.fieldPath,B.endAt):mf(B,T.fieldPath,B.endAt);le.push(I.value),ee&&(ee=I.inclusive)}return new Tn(le,ee)}(h,l),F=this.hn(l,h,S),$=this.hn(l,h,k),M=this.Pn(l,h,v),Z=this.In(l.indexId,p,F,S.inclusive,$,k.inclusive,M);return N.forEach(Z,J=>r.G(J,t.limit).next(B=>{B.forEach(ie=>{let le=z.fromSegments(ie.documentKey);o.has(le)||(o=o.add(le),c.push(le))})}))}).next(()=>c)}return N.resolve(null)})}cn(e){let t=this.un.get(e);return t||(e.filters.length===0?t=[e]:t=cv(ge.create(e.filters,"and")).map(r=>Pl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.un.set(e,t),t)}In(e,t,r,i,s,o,c){let l=(t!=null?t.length:1)*Math.max(r.length,s.length),h=l/(t!=null?t.length:1),p=[];for(let v=0;v<l;++v){let S=t?this.Tn(t[v/h]):wo,k=this.En(e,S,r[v%h],i),F=this.dn(e,S,s[v%h],o),$=c.map(M=>this.En(e,S,M,!0));p.push(...this.createRange(k,F,$))}return p}En(e,t,r,i){let s=new Yn(e,z.empty(),t,r);return i?s:s.Jt()}dn(e,t,r,i){let s=new Yn(e,z.empty(),t,r);return i?s.Jt():s}ln(e,t){let r=new Wo(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(let c of s)r.tn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2,i=this.cn(t);return N.forEach(i,s=>this.ln(e,s).next(o=>{o?r!==0&&o.fields.length<function(l){let h=new Ie(Me.comparator),p=!1;for(let v of l.filters)for(let S of v.getFlattenedFilters())S.field.isKeyField()||(S.op==="array-contains"||S.op==="array-contains-any"?p=!0:h=h.add(S.field));for(let v of l.orderBy)v.field.isKeyField()||(h=h.add(v.field));return h.size+(p?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}An(e,t){let r=new Qn;for(let i of Kn(e)){let s=t.data.field(i.fieldPath);if(s==null)return null;let o=r.Ht(i.kind);Qt.bt.Pt(s,o)}return r.Wt()}Tn(e){let t=new Qn;return Qt.bt.Pt(e,t.Ht(0)),t.Wt()}Rn(e,t){let r=new Qn;return Qt.bt.Pt(rh(this.databaseId,t),r.Ht(function(s){let o=Kn(s);return o.length===0?0:o[o.length-1].kind}(e))),r.Wt()}Pn(e,t,r){if(r===null)return[];let i=[];i.push(new Qn);let s=0;for(let o of Kn(e)){let c=r[s++];for(let l of i)if(this.Vn(t,o.fieldPath)&&as(c))i=this.mn(i,o,c);else{let h=l.Ht(o.kind);Qt.bt.Pt(c,h)}}return this.fn(i)}hn(e,t,r){return this.Pn(e,t,r.position)}fn(e){let t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Wt();return t}mn(e,t,r){let i=[...e],s=[];for(let o of r.arrayValue.values||[])for(let c of i){let l=new Qn;l.seed(c.Wt()),Qt.bt.Pt(o,l.Ht(t.kind)),s.push(l)}return s}Vn(e,t){return!!e.filters.find(r=>r instanceof he&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){let r=zi(e),i=Mr(e);return(t?r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.U()).next(s=>{let o=[];return N.forEach(s,c=>i.get([c.indexId,this.uid]).next(l=>{o.push(function(p,v){let S=v?new ns(v.sequenceNumber,new vt(cr(v.readTime),new z(Ct(v.documentKey)),v.largestBatchId)):ns.empty(),k=p.fields.map(([F,$])=>new Gr(Me.fromServerFormat(F),$));return new Qr(p.indexId,p.collectionGroup,k,S)}(c,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{let s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:re(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){let i=zi(e),s=Mr(e);return this.gn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(c=>N.forEach(c,l=>s.put(Df(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){let r=new Map;return N.forEach(t,(i,s)=>{let o=r.get(i.collectionGroup);return(o?N.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(r.set(i.collectionGroup,c),N.forEach(c,l=>this.pn(e,i,l).next(h=>{let p=this.yn(s,l);return h.isEqual(p)?N.resolve():this.wn(e,s,l,h,p)}))))})}Sn(e,t,r,i){return Lr(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.Rn(r,t.key),documentKey:t.key.path.toArray()})}bn(e,t,r,i){return Lr(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.Rn(r,t.key),t.key.path.toArray()])}pn(e,t,r){let i=Lr(e),s=new Ie(_n);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.Rn(r,t)])},(o,c)=>{s=s.add(new Yn(r.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}yn(e,t){let r=new Ie(_n),i=this.An(t,e);if(i==null)return r;let s=hl(t);if(s!=null){let o=e.data.field(s.fieldPath);if(as(o))for(let c of o.arrayValue.values||[])r=r.add(new Yn(t.indexId,e.key,this.Tn(c),i))}else r=r.add(new Yn(t.indexId,e.key,wo,i));return r}wn(e,t,r,i,s){L("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);let o=[];return function(l,h,p,v,S){let k=l.getIterator(),F=h.getIterator(),$=Vr(k),M=Vr(F);for(;$||M;){let Z=!1,J=!1;if($&&M){let B=p($,M);B<0?J=!0:B>0&&(Z=!0)}else $!=null?J=!0:Z=!0;Z?(v(M),M=Vr(F)):J?(S($),$=Vr(k)):($=Vr(k),M=Vr(F))}}(i,s,_n,c=>{o.push(this.Sn(e,t,r,c))},c=>{o.push(this.bn(e,t,r,c))}),N.waitFor(o)}gn(e){let t=1;return Mr(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>_n(o,c)).filter((o,c,l)=>!c||_n(o,l[c-1])!==0);let i=[];i.push(e);for(let o of r){let c=_n(o,e),l=_n(o,t);if(c===0)i[0]=e.Jt();else if(c>0&&l<0)i.push(o),i.push(o.Jt());else if(l>0)break}i.push(t);let s=[];for(let o=0;o<i.length;o+=2){if(this.Dn(i[o],i[o+1]))return[];let c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,wo,[]],l=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,wo,[]];s.push(IDBKeyRange.bound(c,l))}return s}Dn(e,t){return _n(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Mf)}getMinOffset(e,t){return N.mapArray(this.cn(t),r=>this.ln(e,r).next(i=>i||K())).next(Mf)}};function Lf(n){return Ue(n,"collectionParents")}function Lr(n){return Ue(n,"indexEntries")}function zi(n){return Ue(n,"indexConfiguration")}function Mr(n){return Ue(n,"indexState")}function Mf(n){Y(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){let i=n[r].indexState.offset;Zu(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new vt(e.readTime,e.documentKey,t)}var Ff={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},yt=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};function Zp(n,e,t){let r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId),c=0,l=r.J({range:o},(p,v,S)=>(c++,S.delete()));s.push(l.next(()=>{Y(c===1)}));let h=[];for(let p of t.mutations){let v=lp(e,p.key.path,t.batchId);s.push(i.delete(v)),h.push(p.key)}return N.waitFor(s).next(()=>h)}function Yo(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw K();e=n.noDocument}return JSON.stringify(e).length}yt.DEFAULT_COLLECTION_PERCENTILE=10,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,yt.DEFAULT=new yt(41943040,yt.DEFAULT_COLLECTION_PERCENTILE,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),yt.DISABLED=new yt(-1,0,0);var Jo=class n{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Cn={}}static lt(e,t,r,i){Y(e.uid!=="");let s=e.isAuthenticated()?e.uid:"";return new n(s,t,r,i)}checkEmpty(e){let t=!0,r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).J({index:"userMutationsIndex",range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){let s=qr(e),o=yn(e);return o.add({}).next(c=>{Y(typeof c=="number");let l=new cs(c,t,r,i),h=function(k,F,$){let M=$.baseMutations.map(J=>zo(k.ct,J)),Z=$.mutations.map(J=>zo(k.ct,J));return{userId:F,batchId:$.batchId,localWriteTimeMs:$.localWriteTime.toMillis(),baseMutations:M,mutations:Z}}(this.serializer,this.userId,l),p=[],v=new Ie((S,k)=>re(S.canonicalString(),k.canonicalString()));for(let S of i){let k=lp(this.userId,S.key.path,c);v=v.add(S.key.path.popLast()),p.push(o.put(h)),p.push(s.put(k,hy))}return v.forEach(S=>{p.push(this.indexManager.addToCollectionParentIndex(e,S))}),e.addOnCommittedListener(()=>{this.Cn[c]=l.keys()}),N.waitFor(p).next(()=>l)})}lookupMutationBatch(e,t){return yn(e).get(t).next(r=>r?(Y(r.userId===this.userId),Wn(this.serializer,r)):null)}vn(e,t){return this.Cn[t]?N.resolve(this.Cn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){let i=r.keys();return this.Cn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]),s=null;return yn(e).J({index:"userMutationsIndex",range:i},(o,c,l)=>{c.userId===this.userId&&(Y(c.batchId>=r),s=Wn(this.serializer,c)),l.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),r=-1;return yn(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).U("userMutationsIndex",t).next(r=>r.map(i=>Wn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){let r=To(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return qr(e).J({range:i},(o,c,l)=>{let[h,p,v]=o,S=Ct(p);if(h===this.userId&&t.path.isEqual(S))return yn(e).get(v).next(k=>{if(!k)throw K();Y(k.userId===this.userId),s.push(Wn(this.serializer,k))});l.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ie(re),i=[];return t.forEach(s=>{let o=To(this.userId,s.path),c=IDBKeyRange.lowerBound(o),l=qr(e).J({range:c},(h,p,v)=>{let[S,k,F]=h,$=Ct(k);S===this.userId&&s.path.isEqual($)?r=r.add(F):v.done()});i.push(l)}),N.waitFor(i).next(()=>this.Fn(e,r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=To(this.userId,r),o=IDBKeyRange.lowerBound(s),c=new Ie(re);return qr(e).J({range:o},(l,h,p)=>{let[v,S,k]=l,F=Ct(S);v===this.userId&&r.isPrefixOf(F)?F.length===i&&(c=c.add(k)):p.done()}).next(()=>this.Fn(e,c))}Fn(e,t){let r=[],i=[];return t.forEach(s=>{i.push(yn(e).get(s).next(o=>{if(o===null)throw K();Y(o.userId===this.userId),r.push(Wn(this.serializer,o))}))}),N.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return Zp(e._e,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.Mn(t.batchId)}),N.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}Mn(e){delete this.Cn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return N.resolve();let r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return qr(e).J({range:r},(s,o,c)=>{if(s[0]===this.userId){let l=Ct(s[1]);i.push(l)}else c.done()}).next(()=>{Y(i.length===0)})})}containsKey(e,t){return em(e,this.userId,t)}xn(e){return tm(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}};function em(n,e,t){let r=To(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r),o=!1;return qr(n).J({range:s,H:!0},(c,l,h)=>{let[p,v,S]=c;p===e&&v===i&&(o=!0),h.done()}).next(()=>o)}function yn(n){return Ue(n,"mutations")}function qr(n){return Ue(n,"documentMutations")}function tm(n){return Ue(n,"mutationQueues")}var oi=class n{constructor(e){this.On=e}next(){return this.On+=2,this.On}static Nn(){return new n(0)}static Ln(){return new n(-1)}};var Yl=class{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Bn(e).next(t=>{let r=new oi(t.highestTargetId);return t.highestTargetId=r.next(),this.kn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Bn(e).next(t=>X.fromTimestamp(new ke(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Bn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Bn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.kn(e,i)))}addTargetData(e,t){return this.qn(e,t).next(()=>this.Bn(e).next(r=>(r.targetCount+=1,this.Qn(t,r),this.kn(e,r))))}updateTargetData(e,t){return this.qn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Fr(e).delete(t.targetId)).next(()=>this.Bn(e)).next(r=>(Y(r.targetCount>0),r.targetCount-=1,this.kn(e,r)))}removeTargets(e,t,r){let i=0,s=[];return Fr(e).J((o,c)=>{let l=Wi(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))}).next(()=>N.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Fr(e).J((r,i)=>{let s=Wi(i);t(s)})}Bn(e){return $f(e).get("targetGlobalKey").next(t=>(Y(t!==null),t))}kn(e,t){return $f(e).put("targetGlobalKey",t)}qn(e,t){return Fr(e).put(Qp(this.serializer,t))}Qn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Bn(e).next(t=>t.targetCount)}getTargetData(e,t){let r=rr(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]),s=null;return Fr(e).J({range:i,index:"queryTargetsIndex"},(o,c,l)=>{let h=Wi(c);Is(t,h.target)&&(s=h,l.done())}).next(()=>s)}addMatchingKeys(e,t,r){let i=[],s=vn(e);return t.forEach(o=>{let c=nt(o.path);i.push(s.put({targetId:r,path:c})),i.push(this.referenceDelegate.addReference(e,r,o))}),N.waitFor(i)}removeMatchingKeys(e,t,r){let i=vn(e);return N.forEach(t,s=>{let o=nt(s.path);return N.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){let r=vn(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){let r=IDBKeyRange.bound([t],[t+1],!1,!0),i=vn(e),s=ae();return i.J({range:r,H:!0},(o,c,l)=>{let h=Ct(o[1]),p=new z(h);s=s.add(p)}).next(()=>s)}containsKey(e,t){let r=nt(t.path),i=IDBKeyRange.bound([r],[rp(r)],!1,!0),s=0;return vn(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,c],l,h)=>{o!==0&&(s++,h.done())}).next(()=>s>0)}ot(e,t){return Fr(e).get(t).next(r=>r?Wi(r):null)}};function Fr(n){return Ue(n,"targets")}function $f(n){return Ue(n,"targetGlobal")}function vn(n){return Ue(n,"targetDocuments")}function Uf([n,e],[t,r]){let i=re(n,t);return i===0?re(e,r):i}var Jl=class{constructor(e){this.Kn=e,this.buffer=new Ie(Uf),this.$n=0}Un(){return++this.$n}Wn(e){let t=[e,this.Un()];if(this.buffer.size<this.Kn)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();Uf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},Xl=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Gn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.zn(6e4)}stop(){this.Gn&&(this.Gn.cancel(),this.Gn=null)}get started(){return this.Gn!==null}zn(e){L("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Gn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Gn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Dn(t)?L("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Cn(t)}await this.zn(3e5)})}},Zl=class{constructor(e,t){this.jn=e,this.params=t}calculateTargetCount(e,t){return this.jn.Hn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return N.resolve(Je.oe);let r=new Jl(t);return this.jn.forEachTarget(e,i=>r.Wn(i.sequenceNumber)).next(()=>this.jn.Jn(e,i=>r.Wn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(L("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(Ff)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(L("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ff):this.Yn(e,t))}getCacheSize(e){return this.jn.getCacheSize(e)}Yn(e,t){let r,i,s,o,c,l,h,p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(v=>(v>this.params.maximumSequenceNumbersToCollect?(L("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${v}`),i=this.params.maximumSequenceNumbersToCollect):i=v,o=Date.now(),this.nthSequenceNumber(e,i))).next(v=>(r=v,c=Date.now(),this.removeTargets(e,r,t))).next(v=>(s=v,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(v=>(h=Date.now(),$r()<=ce.DEBUG&&L("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${v} documents in `+(h-l)+`ms
Total Duration: ${h-p}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:v})))}};function lv(n,e){return new Zl(n,e)}var eu=class{constructor(e,t){this.db=e,this.garbageCollector=lv(this,t)}Hn(e){let t=this.Zn(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}Zn(e){let t=0;return this.Jn(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Jn(e,t){return this.Xn(e,(r,i)=>t(i))}addReference(e,t,r){return Io(e,r)}removeReference(e,t,r){return Io(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Io(e,t)}er(e,t){return function(i,s){let o=!1;return tm(i).Y(c=>em(i,c,s).next(l=>(l&&(o=!0),N.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){let r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[],s=0;return this.Xn(e,(o,c)=>{if(c<=t){let l=this.er(e,o).next(h=>{if(!h)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,X.min()),vn(e).delete(function(v){return[0,nt(v.path)]}(o))))});i.push(l)}}).next(()=>N.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Io(e,t)}Xn(e,t){let r=vn(e),i,s=Je.oe;return r.J({index:"documentTargetsIndex"},([o,c],{path:l,sequenceNumber:h})=>{o===0?(s!==Je.oe&&t(new z(Ct(i)),s),s=h,i=l):s=Je.oe}).next(()=>{s!==Je.oe&&t(new z(Ct(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}};function Io(n,e){return vn(n).put(function(r,i){return{targetId:0,path:nt(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}var Xo=class{constructor(){this.changes=new Ot(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ge.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?N.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var tu=class{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Gn(e).put(r)}removeEntry(e,t,r){return Gn(e).delete(function(s,o){let c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ko(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.tr(e,r)))}getEntry(e,t){let r=Ge.newInvalidDocument(t);return Gn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Gi(t))},(i,s)=>{r=this.nr(t,s)}).next(()=>r)}rr(e,t){let r={size:0,document:Ge.newInvalidDocument(t)};return Gn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Gi(t))},(i,s)=>{r={document:this.nr(t,s),size:Yo(s)}}).next(()=>r)}getEntries(e,t){let r=ft();return this.ir(e,t,(i,s)=>{let o=this.nr(i,s);r=r.insert(i,o)}).next(()=>r)}sr(e,t){let r=ft(),i=new Ee(z.comparator);return this.ir(e,t,(s,o)=>{let c=this.nr(s,o);r=r.insert(s,c),i=i.insert(s,Yo(o))}).next(()=>({documents:r,_r:i}))}ir(e,t,r){if(t.isEmpty())return N.resolve();let i=new Ie(qf);t.forEach(l=>i=i.add(l));let s=IDBKeyRange.bound(Gi(i.first()),Gi(i.last())),o=i.getIterator(),c=o.getNext();return Gn(e).J({index:"documentKeyIndex",range:s},(l,h,p)=>{let v=z.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&qf(c,v)<0;)r(c,null),c=o.getNext();c&&c.isEqual(v)&&(r(c,h),c=o.hasNext()?o.getNext():null),c?p.$(Gi(c)):p.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){let o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Ko(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Gn(e).U(IDBKeyRange.bound(c,l,!0)).next(h=>{s?.incrementDocumentReadCount(h.length);let p=ft();for(let v of h){let S=this.nr(z.fromSegments(v.prefixPath.concat(v.collectionGroup,v.documentId)),v);S.isFoundDocument()&&(Es(t,S)||i.has(S.key))&&(p=p.insert(S.key,S))}return p})}getAllFromCollectionGroup(e,t,r,i){let s=ft(),o=jf(t,r),c=jf(t,vt.max());return Gn(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,c,!0)},(l,h,p)=>{let v=this.nr(z.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);s=s.insert(v.key,v),s.size===i&&p.done()}).next(()=>s)}newChangeBuffer(e){return new nu(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Bf(e).get("remoteDocumentGlobalKey").next(t=>(Y(!!t),t))}tr(e,t){return Bf(e).put("remoteDocumentGlobalKey",t)}nr(e,t){if(t){let r=ov(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(X.min())))return r}return Ge.newInvalidDocument(e)}};function nm(n){return new tu(n)}var nu=class extends Xo{constructor(e,t){super(),this.ar=e,this.trackRemovals=t,this.ur=new Ot(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){let t=[],r=0,i=new Ie((s,o)=>re(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{let c=this.ur.get(s);if(t.push(this.ar.removeEntry(e,s,c.readTime)),o.isValidDocument()){let l=Pf(this.ar.serializer,o);i=i.add(s.path.popLast());let h=Yo(l);r+=h-c.size,t.push(this.ar.addEntry(e,s,l))}else if(r-=c.size,this.trackRemovals){let l=Pf(this.ar.serializer,o.convertToNoDocument(X.min()));t.push(this.ar.addEntry(e,s,l))}}),i.forEach(s=>{t.push(this.ar.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.ar.updateMetadata(e,r)),N.waitFor(t)}getFromCache(e,t){return this.ar.rr(e,t).next(r=>(this.ur.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.ar.sr(e,t).next(({documents:r,_r:i})=>(i.forEach((s,o)=>{this.ur.set(s,{size:o,readTime:r.get(s).readTime})}),r))}};function Bf(n){return Ue(n,"remoteDocumentGlobal")}function Gn(n){return Ue(n,"remoteDocumentsV14")}function Gi(n){let e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function jf(n,e){let t=e.documentKey.path.toArray();return[n,Ko(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function qf(n,e){let t=n.path.toArray(),r=e.path.toArray(),i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=re(t[s],r[s]),i)return i;return i=re(t.length,r.length),i||(i=re(t[t.length-2],r[r.length-2]),i||re(t[t.length-1],r[r.length-1]))}var ru=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var Zo=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Xi(r.mutation,i,dt.empty(),ke.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,ae()).next(()=>r))}getLocalViewOfDocuments(e,t,r=ae()){let i=Dt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=Hi();return s.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){let r=Dt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,ae()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=ft(),o=Ji(),c=function(){return Ji()}();return t.forEach((l,h)=>{let p=r.get(h.key);i.has(h.key)&&(p===void 0||p.mutation instanceof Tt)?s=s.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),Xi(p.mutation,h,p.mutation.getFieldMask(),ke.now())):o.set(h.key,dt.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((h,p)=>o.set(h,p)),t.forEach((h,p)=>{var v;return c.set(h,new ru(p,(v=o.get(h))!==null&&v!==void 0?v:null))}),c))}recalculateAndSaveOverlays(e,t){let r=Ji(),i=new Ee((o,c)=>o-c),s=ae();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(let c of o)c.keys().forEach(l=>{let h=t.get(l);if(h===null)return;let p=r.get(l)||dt.empty();p=c.applyToLocalView(h,p),r.set(l,p);let v=(i.get(c.batchId)||ae()).add(l);i=i.insert(c.batchId,v)})}).next(()=>{let o=[],c=i.getReverseIterator();for(;c.hasNext();){let l=c.getNext(),h=l.key,p=l.value,v=Pp();p.forEach(S=>{if(!s.has(S)){let k=Vp(t.get(S),r.get(S));k!==null&&v.set(S,k),s=s.add(S)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,v))}return N.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return z.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ny(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):N.resolve(Dt()),c=-1,l=s;return o.next(h=>N.forEach(h,(p,v)=>(c<v.largestBatchId&&(c=v.largestBatchId),s.get(p)?N.resolve():this.remoteDocumentCache.getEntry(e,p).next(S=>{l=l.insert(p,S)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,l,h,ae())).next(p=>({batchId:c,changes:Rp(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new z(t)).next(r=>{let i=Hi();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,o=Hi();return this.indexManager.getCollectionParents(e,s).next(c=>N.forEach(c,l=>{let h=function(v,S){return new ti(S,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(p=>{p.forEach((v,S)=>{o=o.insert(v,S)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,h)=>{let p=h.getKey();o.get(p)===null&&(o=o.insert(p,Ge.newInvalidDocument(p)))});let c=Hi();return o.forEach((l,h)=>{let p=s.get(l);p!==void 0&&Xi(p.mutation,h,dt.empty(),ke.now()),Es(t,h)&&(c=c.insert(l,h))}),c})}};var iu=class{constructor(e){this.serializer=e,this.cr=new Map,this.lr=new Map}getBundleMetadata(e,t){return N.resolve(this.cr.get(t))}saveBundleMetadata(e,t){return this.cr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:rt(i.createTime)}}(t)),N.resolve()}getNamedQuery(e,t){return N.resolve(this.lr.get(t))}saveNamedQuery(e,t){return this.lr.set(t.name,function(i){return{name:i.name,query:Yp(i.bundledQuery),readTime:rt(i.readTime)}}(t)),N.resolve()}};var su=class{constructor(){this.overlays=new Ee(z.comparator),this.hr=new Map}getOverlay(e,t){return N.resolve(this.overlays.get(t))}getOverlays(e,t){let r=Dt();return N.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),N.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.hr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.hr.delete(r)),N.resolve()}getOverlaysForCollection(e,t,r){let i=Dt(),s=t.length+1,o=new z(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){let l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return N.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Ee((h,p)=>h-p),o=this.overlays.getIterator();for(;o.hasNext();){let h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let p=s.get(h.largestBatchId);p===null&&(p=Dt(),s=s.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}let c=Dt(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,p)=>c.set(h,p)),!(c.size()>=i)););return N.resolve(c)}ht(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let o=this.hr.get(i.largestBatchId).delete(r.key);this.hr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ls(t,r));let s=this.hr.get(t);s===void 0&&(s=ae(),this.hr.set(t,s)),this.hr.set(t,s.add(r.key))}};var fs=class{constructor(){this.Pr=new Ie(xe.Ir),this.Tr=new Ie(xe.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(e,t){let r=new xe(e,t);this.Pr=this.Pr.add(r),this.Tr=this.Tr.add(r)}dr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ar(new xe(e,t))}Rr(e,t){e.forEach(r=>this.removeReference(r,t))}Vr(e){let t=new z(new we([])),r=new xe(t,e),i=new xe(t,e+1),s=[];return this.Tr.forEachInRange([r,i],o=>{this.Ar(o),s.push(o.key)}),s}mr(){this.Pr.forEach(e=>this.Ar(e))}Ar(e){this.Pr=this.Pr.delete(e),this.Tr=this.Tr.delete(e)}gr(e){let t=new z(new we([])),r=new xe(t,e),i=new xe(t,e+1),s=ae();return this.Tr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){let t=new xe(e,0),r=this.Pr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},xe=class{constructor(e,t){this.key=e,this.pr=t}static Ir(e,t){return z.comparator(e.key,t.key)||re(e.pr,t.pr)}static Er(e,t){return re(e.pr,t.pr)||z.comparator(e.key,t.key)}};var ou=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.yr=1,this.wr=new Ie(xe.Ir)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let o=new cs(s,t,r,i);this.mutationQueue.push(o);for(let c of i)this.wr=this.wr.add(new xe(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return N.resolve(o)}lookupMutationBatch(e,t){return N.resolve(this.Sr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.br(r),s=i<0?0:i;return N.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?-1:this.yr-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new xe(t,0),i=new xe(t,Number.POSITIVE_INFINITY),s=[];return this.wr.forEachInRange([r,i],o=>{let c=this.Sr(o.pr);s.push(c)}),N.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ie(re);return t.forEach(i=>{let s=new xe(i,0),o=new xe(i,Number.POSITIVE_INFINITY);this.wr.forEachInRange([s,o],c=>{r=r.add(c.pr)})}),N.resolve(this.Dr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;z.isDocumentKey(s)||(s=s.child(""));let o=new xe(new z(s),0),c=new Ie(re);return this.wr.forEachWhile(l=>{let h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(c=c.add(l.pr)),!0)},o),N.resolve(this.Dr(c))}Dr(e){let t=[];return e.forEach(r=>{let i=this.Sr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Y(this.Cr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.wr;return N.forEach(t.mutations,i=>{let s=new xe(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.wr=r})}Mn(e){}containsKey(e,t){let r=new xe(t,0),i=this.wr.firstAfterOrEqual(r);return N.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}Cr(e,t){return this.br(e)}br(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Sr(e){let t=this.br(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var au=class{constructor(e){this.vr=e,this.docs=function(){return new Ee(z.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.vr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return N.resolve(r?r.document.mutableCopy():Ge.newInvalidDocument(t))}getEntries(e,t){let r=ft();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ge.newInvalidDocument(i))}),N.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=ft(),o=t.path,c=new z(o.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:h,value:{document:p}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Zu(sp(p),r)<=0||(i.has(p.key)||Es(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return N.resolve(s)}getAllFromCollectionGroup(e,t,r,i){K()}Fr(e,t){return N.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new cu(this)}getSize(e){return N.resolve(this.size)}},cu=class extends Xo{constructor(e){super(),this.ar=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.ar.addEntry(e,i)):this.ar.removeEntry(r)}),N.waitFor(t)}getFromCache(e,t){return this.ar.getEntry(e,t)}getAllFromCache(e,t){return this.ar.getEntries(e,t)}};var lu=class{constructor(e){this.persistence=e,this.Mr=new Ot(t=>rr(t),Is),this.lastRemoteSnapshotVersion=X.min(),this.highestTargetId=0,this.Or=0,this.Nr=new fs,this.targetCount=0,this.Lr=oi.Nn()}forEachTarget(e,t){return this.Mr.forEach((r,i)=>t(i)),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.Or)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Or&&(this.Or=t),N.resolve()}qn(e){this.Mr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Lr=new oi(t),this.highestTargetId=t),e.sequenceNumber>this.Or&&(this.Or=e.sequenceNumber)}addTargetData(e,t){return this.qn(t),this.targetCount+=1,N.resolve()}updateTargetData(e,t){return this.qn(t),N.resolve()}removeTargetData(e,t){return this.Mr.delete(t.target),this.Nr.Vr(t.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.Mr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Mr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),N.waitFor(s).next(()=>i)}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,t){let r=this.Mr.get(t)||null;return N.resolve(r)}addMatchingKeys(e,t,r){return this.Nr.dr(t,r),N.resolve()}removeMatchingKeys(e,t,r){this.Nr.Rr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),N.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Nr.Vr(t),N.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Nr.gr(t);return N.resolve(r)}containsKey(e,t){return N.resolve(this.Nr.containsKey(t))}};var ea=class{constructor(e,t){this.Br={},this.overlays={},this.kr=new Je(0),this.qr=!1,this.qr=!0,this.referenceDelegate=e(this),this.Qr=new lu(this),this.indexManager=new Wl,this.remoteDocumentCache=function(i){return new au(i)}(r=>this.referenceDelegate.Kr(r)),this.serializer=new Go(t),this.$r=new iu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new su,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Br[e.toKey()];return r||(r=new ou(t,this.referenceDelegate),this.Br[e.toKey()]=r),r}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(e,t,r){L("MemoryPersistence","Starting transaction:",e);let i=new uu(this.kr.next());return this.referenceDelegate.Ur(),r(i).next(s=>this.referenceDelegate.Wr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Gr(e,t){return N.or(Object.values(this.Br).map(r=>()=>r.containsKey(e,t)))}},uu=class extends ko{constructor(e){super(),this.currentSequenceNumber=e}},ta=class n{constructor(e){this.persistence=e,this.zr=new fs,this.jr=null}static Hr(e){return new n(e)}get Jr(){if(this.jr)return this.jr;throw K()}addReference(e,t,r){return this.zr.addReference(r,t),this.Jr.delete(r.toString()),N.resolve()}removeReference(e,t,r){return this.zr.removeReference(r,t),this.Jr.add(r.toString()),N.resolve()}markPotentiallyOrphaned(e,t){return this.Jr.add(t.toString()),N.resolve()}removeTarget(e,t){this.zr.Vr(t.targetId).forEach(i=>this.Jr.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Jr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ur(){this.jr=new Set}Wr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.Jr,r=>{let i=z.fromPath(r);return this.Yr(e,i).next(s=>{s||t.removeEntry(i,X.min())})}).next(()=>(this.jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yr(e,t).next(r=>{r?this.Jr.delete(t.toString()):this.Jr.add(t.toString())})}Kr(e){return 0}Yr(e,t){return N.or([()=>N.resolve(this.zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gr(e,t)])}};var hu=class{constructor(e){this.serializer=e}O(e,t,r,i){let s=new No("createOrUpgrade",t);r<1&&i>=1&&(function(l){l.createObjectStore("owner")}(e),function(l){l.createObjectStore("mutationQueues",{keyPath:"userId"}),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",of,{unique:!0}),l.createObjectStore("documentMutations")}(e),zf(e),function(l){l.createObjectStore("remoteDocuments")}(e));let o=N.resolve();return r<3&&i>=3&&(r!==0&&(function(l){l.deleteObjectStore("targetDocuments"),l.deleteObjectStore("targets"),l.deleteObjectStore("targetGlobal")}(e),zf(e)),o=o.next(()=>function(l){let h=l.store("targetGlobal"),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:X.min().toTimestamp(),targetCount:0};return h.put("targetGlobalKey",p)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(l,h){return h.store("mutations").U().next(p=>{l.deleteObjectStore("mutations"),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",of,{unique:!0});let v=h.store("mutations"),S=p.map(k=>v.put(k));return N.waitFor(S)})}(e,s))),o=o.next(()=>{(function(l){l.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.Xr(s))),r<6&&i>=6&&(o=o.next(()=>(function(l){l.createObjectStore("remoteDocumentGlobal")}(e),this.ei(s)))),r<7&&i>=7&&(o=o.next(()=>this.ti(s))),r<8&&i>=8&&(o=o.next(()=>this.ni(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.ri(s))),r<11&&i>=11&&(o=o.next(()=>{(function(l){l.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(l){l.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(l){let h=l.createObjectStore("documentOverlays",{keyPath:by});h.createIndex("collectionPathOverlayIndex",Ty,{unique:!1}),h.createIndex("collectionGroupOverlayIndex",Ay,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(l){let h=l.createObjectStore("remoteDocumentsV14",{keyPath:dy});h.createIndex("documentKeyIndex",fy),h.createIndex("collectionGroupIndex",py)}(e)).next(()=>this.ii(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.si(e,s))),r<15&&i>=15&&(o=o.next(()=>function(l){l.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),l.createObjectStore("indexState",{keyPath:vy}).createIndex("sequenceNumberIndex",wy,{unique:!1}),l.createObjectStore("indexEntries",{keyPath:Iy}).createIndex("documentKeyIndex",Ey,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),o}ei(e){let t=0;return e.store("remoteDocuments").J((r,i)=>{t+=Yo(i)}).next(()=>{let r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}Xr(e){let t=e.store("mutationQueues"),r=e.store("mutations");return t.U().next(i=>N.forEach(i,s=>{let o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next(c=>N.forEach(c,l=>{Y(l.userId===s.userId);let h=Wn(this.serializer,l);return Zp(e,s.userId,h).next(()=>{})}))}))}ti(e){let t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{let s=[];return r.J((o,c)=>{let l=new we(o),h=function(v){return[0,nt(v)]}(l);s.push(t.get(h).next(p=>p?N.resolve():(v=>t.put({targetId:0,path:nt(v),sequenceNumber:i.highestListenSequenceNumber}))(l)))}).next(()=>N.waitFor(s))})}ni(e,t){e.createObjectStore("collectionParents",{keyPath:yy});let r=t.store("collectionParents"),i=new ds,s=o=>{if(i.add(o)){let c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:nt(l)})}};return t.store("remoteDocuments").J({H:!0},(o,c)=>{let l=new we(o);return s(l.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,c,l],h)=>{let p=Ct(c);return s(p.popLast())}))}ri(e){let t=e.store("targets");return t.J((r,i)=>{let s=Wi(i),o=Qp(this.serializer,s);return t.put(o)})}ii(e,t){let r=t.store("remoteDocuments"),i=[];return r.J((s,o)=>{let c=t.store("remoteDocumentsV14"),l=function(v){return v.document?new z(we.fromString(v.document.name).popFirst(5)):v.noDocument?z.fromSegments(v.noDocument.path):v.unknownDocument?z.fromSegments(v.unknownDocument.path):K()}(o).path.toArray(),h={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(h))}).next(()=>N.waitFor(i))}si(e,t){let r=t.store("mutations"),i=nm(this.serializer),s=new ea(ta.Hr,this.serializer.ct);return r.U().next(o=>{let c=new Map;return o.forEach(l=>{var h;let p=(h=c.get(l.userId))!==null&&h!==void 0?h:ae();Wn(this.serializer,l).keys().forEach(v=>p=p.add(v)),c.set(l.userId,p)}),N.forEach(c,(l,h)=>{let p=new $e(h),v=Ho.lt(this.serializer,p),S=s.getIndexManager(p),k=Jo.lt(p,this.serializer,S,s.referenceDelegate);return new Zo(i,k,v,S).recalculateAndSaveOverlaysForDocumentKeys(new is(t,Je.oe),l).next()})})}};function zf(n){n.createObjectStore("targetDocuments",{keyPath:gy}).createIndex("documentTargetsIndex",_y,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",my,{unique:!0}),n.createObjectStore("targetGlobal")}var Zc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",du=class n{constructor(e,t,r,i,s,o,c,l,h,p,v=16){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.oi=s,this.window=o,this.document=c,this._i=h,this.ai=p,this.ui=v,this.kr=null,this.qr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ci=null,this.inForeground=!1,this.li=null,this.hi=null,this.Pi=Number.NEGATIVE_INFINITY,this.Ii=S=>Promise.resolve(),!n.D())throw new q(V.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new eu(this,i),this.Ti=t+"main",this.serializer=new Go(l),this.Ei=new Yr(this.Ti,this.ui,new hu(this.serializer)),this.Qr=new Yl(this.referenceDelegate,this.serializer),this.remoteDocumentCache=nm(this.serializer),this.$r=new Bl,this.window&&this.window.localStorage?this.di=this.window.localStorage:(this.di=null,p===!1&&De("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ai().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new q(V.FAILED_PRECONDITION,Zc);return this.Ri(),this.Vi(),this.mi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Qr.getHighestSequenceNumber(e))}).then(e=>{this.kr=new Je(e,this._i)}).then(()=>{this.qr=!0}).catch(e=>(this.Ei&&this.Ei.close(),Promise.reject(e)))}fi(e){return this.Ii=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ei.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.oi.enqueueAndForget(async()=>{this.started&&await this.Ai()}))}Ai(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Eo(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.gi(e).next(t=>{t||(this.isPrimary=!1,this.oi.enqueueRetryable(()=>this.Ii(!1)))})}).next(()=>this.pi(e)).next(t=>this.isPrimary&&!t?this.yi(e).next(()=>!1):!!t&&this.wi(e).next(()=>!0))).catch(e=>{if(Dn(e))return L("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return L("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.oi.enqueueRetryable(()=>this.Ii(e)),this.isPrimary=e})}gi(e){return Ki(e).get("owner").next(t=>N.resolve(this.Si(t)))}bi(e){return Eo(e).delete(this.clientId)}async Di(){if(this.isPrimary&&!this.Ci(this.Pi,18e5)){this.Pi=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{let r=Ue(t,"clientMetadata");return r.U().next(i=>{let s=this.vi(i,18e5),o=i.filter(c=>s.indexOf(c)===-1);return N.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.di)for(let t of e)this.di.removeItem(this.Fi(t.clientId))}}mi(){this.hi=this.oi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ai().then(()=>this.Di()).then(()=>this.mi()))}Si(e){return!!e&&e.ownerId===this.clientId}pi(e){return this.ai?N.resolve(!0):Ki(e).get("owner").next(t=>{if(t!==null&&this.Ci(t.leaseTimestampMs,5e3)&&!this.Mi(t.ownerId)){if(this.Si(t)&&this.networkEnabled)return!0;if(!this.Si(t)){if(!t.allowTabSynchronization)throw new q(V.FAILED_PRECONDITION,Zc);return!1}}return!(!this.networkEnabled||!this.inForeground)||Eo(e).U().next(r=>this.vi(r,5e3).find(i=>{if(this.clientId!==i.clientId){let s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&L("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.qr=!1,this.xi(),this.hi&&(this.hi.cancel(),this.hi=null),this.Oi(),this.Ni(),await this.Ei.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{let t=new is(e,Je.oe);return this.yi(t).next(()=>this.bi(t))}),this.Ei.close(),this.Li()}vi(e,t){return e.filter(r=>this.Ci(r.updateTimeMs,t)&&!this.Mi(r.clientId))}Bi(){return this.runTransaction("getActiveClients","readonly",e=>Eo(e).U().next(t=>this.vi(t,18e5).map(r=>r.clientId)))}get started(){return this.qr}getMutationQueue(e,t){return Jo.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Ql(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Ho.lt(this.serializer,e)}getBundleCache(){return this.$r}runTransaction(e,t,r){L("IndexedDbPersistence","Starting transaction:",e);let i=t==="readonly"?"readonly":"readwrite",s=function(l){return l===16?Ry:l===15?fp:l===14?dp:l===13?hp:l===12?Sy:l===11?up:void K()}(this.ui),o;return this.Ei.runTransaction(e,i,s,c=>(o=new is(c,this.kr?this.kr.next():Je.oe),t==="readwrite-primary"?this.gi(o).next(l=>!!l||this.pi(o)).next(l=>{if(!l)throw De(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.oi.enqueueRetryable(()=>this.Ii(!1)),new q(V.FAILED_PRECONDITION,op);return r(o)}).next(l=>this.wi(o).next(()=>l)):this.ki(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}ki(e){return Ki(e).get("owner").next(t=>{if(t!==null&&this.Ci(t.leaseTimestampMs,5e3)&&!this.Mi(t.ownerId)&&!this.Si(t)&&!(this.ai||this.allowTabSynchronization&&t.allowTabSynchronization))throw new q(V.FAILED_PRECONDITION,Zc)})}wi(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ki(e).put("owner",t)}static D(){return Yr.D()}yi(e){let t=Ki(e);return t.get("owner").next(r=>this.Si(r)?(L("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):N.resolve())}Ci(e,t){let r=Date.now();return!(e<r-t)&&(!(e>r)||(De(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Ri(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.li=()=>{this.oi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ai()))},this.document.addEventListener("visibilitychange",this.li),this.inForeground=this.document.visibilityState==="visible")}Oi(){this.li&&(this.document.removeEventListener("visibilitychange",this.li),this.li=null)}Vi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.ci=()=>{this.xi();let t=/(?:Version|Mobile)\/1[456]/;Pc()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.oi.enterRestrictedMode(!0),this.oi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.ci))}Ni(){this.ci&&(this.window.removeEventListener("pagehide",this.ci),this.ci=null)}Mi(e){var t;try{let r=((t=this.di)===null||t===void 0?void 0:t.getItem(this.Fi(e)))!==null;return L("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return De("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}xi(){if(this.di)try{this.di.setItem(this.Fi(this.clientId),String(Date.now()))}catch(e){De("Failed to set zombie client id.",e)}}Li(){if(this.di)try{this.di.removeItem(this.Fi(this.clientId))}catch{}}Fi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}};function Ki(n){return Ue(n,"owner")}function Eo(n){return Ue(n,"clientMetadata")}function rm(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}var fu=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.qi=r,this.Qi=i}static Ki(e,t){let r=ae(),i=ae();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var pu=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var na=class{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=function(){return Pc()?8:ap(Re())>0?6:4}()}initialize(e,t){this.zi=e,this.indexManager=t,this.$i=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ji(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Hi(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;let o=new pu;return this.Ji(e,t,o).next(c=>{if(s.result=c,this.Ui)return this.Yi(e,t,o,c.size)})}).next(()=>s.result)}Yi(e,t,r,i){return r.documentReadCount<this.Wi?($r()<=ce.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",Ur(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),N.resolve()):($r()<=ce.DEBUG&&L("QueryEngine","Query:",Ur(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Gi*i?($r()<=ce.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",Ur(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,pt(t))):N.resolve())}ji(e,t){if(_f(t))return N.resolve(null);let r=pt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Cl(t,null,"F"),r=pt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let o=ae(...s);return this.zi.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{let h=this.Zi(t,c);return this.Xi(t,h,o,l.readTime)?this.ji(e,Cl(t,null,"F")):this.es(e,h,t,l)}))})))}Hi(e,t,r,i){return _f(t)||i.isEqual(X.min())?N.resolve(null):this.zi.getDocuments(e,r).next(s=>{let o=this.Zi(t,s);return this.Xi(t,o,r,i)?N.resolve(null):($r()<=ce.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ur(t)),this.es(e,o,t,ip(i,-1)).next(c=>c))})}Zi(e,t){let r=new Ie(Ap(e));return t.forEach((i,s)=>{Es(e,s)&&(r=r.add(s))}),r}Xi(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ji(e,t,r){return $r()<=ce.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",Ur(t)),this.zi.getDocumentsMatchingQuery(e,t,vt.min(),r)}es(e,t,r,i){return this.zi.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}};var mu=class{constructor(e,t,r,i){this.persistence=e,this.ts=t,this.serializer=i,this.ns=new Ee(re),this.rs=new Ot(s=>rr(s),Is),this.ss=new Map,this.os=e.getRemoteDocumentCache(),this.Qr=e.getTargetCache(),this.$r=e.getBundleCache(),this._s(r)}_s(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Zo(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ns))}};function im(n,e,t,r){return new mu(n,e,t,r)}async function sm(n,e){let t=H(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t._s(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let o=[],c=[],l=ae();for(let h of i){o.push(h.batchId);for(let p of h.mutations)l=l.add(p.key)}for(let h of s){c.push(h.batchId);for(let p of h.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(h=>({us:h,removedBatchIds:o,addedBatchIds:c}))})})}function uv(n,e){let t=H(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.os.newChangeBuffer({trackRemovals:!0});return function(c,l,h,p){let v=h.batch,S=v.keys(),k=N.resolve();return S.forEach(F=>{k=k.next(()=>p.getEntry(l,F)).next($=>{let M=h.docVersions.get(F);Y(M!==null),$.version.compareTo(M)<0&&(v.applyToRemoteDocument($,h),$.isValidDocument()&&($.setReadTime(h.commitVersion),p.addEntry($)))})}),k.next(()=>c.mutationQueue.removeMutationBatch(l,v))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=ae();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function om(n){let e=H(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Qr.getLastRemoteSnapshotVersion(t))}function hv(n,e){let t=H(n),r=e.snapshotVersion,i=t.ns;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let o=t.os.newChangeBuffer({trackRemovals:!0});i=t.ns;let c=[];e.targetChanges.forEach((p,v)=>{let S=i.get(v);if(!S)return;c.push(t.Qr.removeMatchingKeys(s,p.removedDocuments,v).next(()=>t.Qr.addMatchingKeys(s,p.addedDocuments,v)));let k=S.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(v)!==null?k=k.withResumeToken(Ke.EMPTY_BYTE_STRING,X.min()).withLastLimboFreeSnapshotVersion(X.min()):p.resumeToken.approximateByteSize()>0&&(k=k.withResumeToken(p.resumeToken,r)),i=i.insert(v,k),function($,M,Z){return $.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-$.snapshotVersion.toMicroseconds()>=3e8?!0:Z.addedDocuments.size+Z.modifiedDocuments.size+Z.removedDocuments.size>0}(S,k,p)&&c.push(t.Qr.updateTargetData(s,k))});let l=ft(),h=ae();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(dv(s,o,e.documentUpdates).next(p=>{l=p.cs,h=p.ls})),!r.isEqual(X.min())){let p=t.Qr.getLastRemoteSnapshotVersion(s).next(v=>t.Qr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return N.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,h)).next(()=>l)}).then(s=>(t.ns=i,s))}function dv(n,e,t){let r=ae(),i=ae();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=ft();return t.forEach((c,l)=>{let h=s.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(X.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):L("LocalStore","Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{cs:o,ls:i}})}function fv(n,e){let t=H(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function ra(n,e){let t=H(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Qr.getTargetData(r,e).next(s=>s?(i=s,N.resolve(i)):t.Qr.allocateTargetId(r).next(o=>(i=new si(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Qr.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.ns.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.ns=t.ns.insert(r.targetId,r),t.rs.set(e,r.targetId)),r})}async function ai(n,e,t){let r=H(n),i=r.ns.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Dn(o))throw o;L("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.ns=r.ns.remove(e),r.rs.delete(i.target)}function gu(n,e,t){let r=H(n),i=X.min(),s=ae();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,h,p){let v=H(l),S=v.rs.get(p);return S!==void 0?N.resolve(v.ns.get(S)):v.Qr.getTargetData(h,p)}(r,o,pt(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Qr.getMatchingKeysForTargetId(o,c.targetId).next(l=>{s=l})}).next(()=>r.ts.getDocumentsMatchingQuery(o,e,t?i:X.min(),t?s:ae())).next(c=>(lm(r,Tp(e),c),{documents:c,hs:s})))}function am(n,e){let t=H(n),r=H(t.Qr),i=t.ns.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>r.ot(s,e).next(o=>o?o.target:null))}function cm(n,e){let t=H(n),r=t.ss.get(e)||X.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.os.getAllFromCollectionGroup(i,e,ip(r,-1),Number.MAX_SAFE_INTEGER)).then(i=>(lm(t,e,i),i))}function lm(n,e,t){let r=n.ss.get(e)||X.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.ss.set(e,r)}function Gf(n,e){return`firestore_clients_${n}_${e}`}function Kf(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function el(n,e){return`firestore_targets_${n}_${e}`}var ia=class n{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Es(e,t,r){let i=JSON.parse(r),s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new q(i.error.code,i.error.message))),o?new n(e,t,i.state,s):(De("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}ds(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}},Zi=class n{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Es(e,t){let r=JSON.parse(t),i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new q(r.error.code,r.error.message))),s?new n(e,r.state,i):(De("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}ds(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}},sa=class n{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Es(e,t){let r=JSON.parse(t),i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=sh();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=cp(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new n(e,s):(De("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}},_u=class n{constructor(e,t){this.clientId=e,this.onlineState=t}static Es(e){let t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new n(t.clientId,t.onlineState):(De("SharedClientState",`Failed to parse online state: ${e}`),null)}},ps=class{constructor(){this.activeTargetIds=sh()}As(e){this.activeTargetIds=this.activeTargetIds.add(e)}Rs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ds(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}},es=class{constructor(e,t,r,i,s){this.window=e,this.oi=t,this.persistenceKey=r,this.Vs=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.fs=this.gs.bind(this),this.ps=new Ee(re),this.started=!1,this.ys=[];let o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.ws=Gf(this.persistenceKey,this.Vs),this.Ss=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.ps=this.ps.insert(this.Vs,new ps),this.bs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Ds=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Cs=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.vs=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.Fs=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.fs)}static D(e){return!(!e||!e.localStorage)}async start(){let e=await this.syncEngine.Bi();for(let r of e){if(r===this.Vs)continue;let i=this.getItem(Gf(this.persistenceKey,r));if(i){let s=sa.Es(r,i);s&&(this.ps=this.ps.insert(s.clientId,s))}}this.Ms();let t=this.storage.getItem(this.vs);if(t){let r=this.xs(t);r&&this.Os(r)}for(let r of this.ys)this.gs(r);this.ys=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ss,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Ns(this.ps)}isActiveQueryTarget(e){let t=!1;return this.ps.forEach((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.Ls(e,"pending")}updateMutationState(e,t,r){this.Ls(e,t,r),this.Bs(e)}addLocalQueryTarget(e){let t="not-current";if(this.isActiveQueryTarget(e)){let r=this.storage.getItem(el(this.persistenceKey,e));if(r){let i=Zi.Es(e,r);i&&(t=i.state)}}return this.ks.As(e),this.Ms(),t}removeLocalQueryTarget(e){this.ks.Rs(e),this.Ms()}isLocalQueryTarget(e){return this.ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(el(this.persistenceKey,e))}updateQueryState(e,t,r){this.qs(e,t,r)}handleUserChange(e,t,r){t.forEach(i=>{this.Bs(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Qs(e)}notifyBundleLoaded(e){this.Ks(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.fs),this.removeItem(this.ws),this.started=!1)}getItem(e){let t=this.storage.getItem(e);return L("SharedClientState","READ",e,t),t}setItem(e,t){L("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){L("SharedClientState","REMOVE",e),this.storage.removeItem(e)}gs(e){let t=e;if(t.storageArea===this.storage){if(L("SharedClientState","EVENT",t.key,t.newValue),t.key===this.ws)return void De("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.oi.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.bs.test(t.key)){if(t.newValue==null){let r=this.$s(t.key);return this.Us(r,null)}{let r=this.Ws(t.key,t.newValue);if(r)return this.Us(r.clientId,r)}}else if(this.Ds.test(t.key)){if(t.newValue!==null){let r=this.Gs(t.key,t.newValue);if(r)return this.zs(r)}}else if(this.Cs.test(t.key)){if(t.newValue!==null){let r=this.js(t.key,t.newValue);if(r)return this.Hs(r)}}else if(t.key===this.vs){if(t.newValue!==null){let r=this.xs(t.newValue);if(r)return this.Os(r)}}else if(t.key===this.Ss){let r=function(s){let o=Je.oe;if(s!=null)try{let c=JSON.parse(s);Y(typeof c=="number"),o=c}catch(c){De("SharedClientState","Failed to read sequence number from WebStorage",c)}return o}(t.newValue);r!==Je.oe&&this.sequenceNumberHandler(r)}else if(t.key===this.Fs){let r=this.Js(t.newValue);await Promise.all(r.map(i=>this.syncEngine.Ys(i)))}}}else this.ys.push(t)})}}get ks(){return this.ps.get(this.Vs)}Ms(){this.setItem(this.ws,this.ks.ds())}Ls(e,t,r){let i=new ia(this.currentUser,e,t,r),s=Kf(this.persistenceKey,this.currentUser,e);this.setItem(s,i.ds())}Bs(e){let t=Kf(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Qs(e){let t={clientId:this.Vs,onlineState:e};this.storage.setItem(this.vs,JSON.stringify(t))}qs(e,t,r){let i=el(this.persistenceKey,e),s=new Zi(e,t,r);this.setItem(i,s.ds())}Ks(e){let t=JSON.stringify(Array.from(e));this.setItem(this.Fs,t)}$s(e){let t=this.bs.exec(e);return t?t[1]:null}Ws(e,t){let r=this.$s(e);return sa.Es(r,t)}Gs(e,t){let r=this.Ds.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return ia.Es(new $e(s),i,t)}js(e,t){let r=this.Cs.exec(e),i=Number(r[1]);return Zi.Es(i,t)}xs(e){return _u.Es(e)}Js(e){return JSON.parse(e)}async zs(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Zs(e.batchId,e.state,e.error);L("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Hs(e){return this.syncEngine.Xs(e.targetId,e.state,e.error)}Us(e,t){let r=t?this.ps.insert(e,t):this.ps.remove(e),i=this.Ns(this.ps),s=this.Ns(r),o=[],c=[];return s.forEach(l=>{i.has(l)||o.push(l)}),i.forEach(l=>{s.has(l)||c.push(l)}),this.syncEngine.eo(o,c).then(()=>{this.ps=r})}Os(e){this.ps.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Ns(e){let t=sh();return e.forEach((r,i)=>{t=t.unionWith(i.activeTargetIds)}),t}},oa=class{constructor(){this.no=new ps,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.no.As(e),this.ro[e]||"not-current"}updateQueryState(e,t,r){this.ro[e]=t}removeLocalQueryTarget(e){this.no.Rs(e)}isLocalQueryTarget(e){return this.no.activeTargetIds.has(e)}clearQueryState(e){delete this.ro[e]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(e){return this.no.activeTargetIds.has(e)}start(){return this.no=new ps,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var yu=class{io(e){}shutdown(){}};var aa=class{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(e){this.uo.push(e)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){L("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.uo)e(0)}ao(){L("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.uo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var bo=null;function tl(){return bo===null?bo=function(){return 268435456+Math.round(2147483648*Math.random())}():bo++,"0x"+bo.toString(16)}var pv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var vu=class{constructor(e){this.lo=e.lo,this.ho=e.ho}Po(e){this.Io=e}To(e){this.Eo=e}Ao(e){this.Ro=e}onMessage(e){this.Vo=e}close(){this.ho()}send(e){this.lo(e)}mo(){this.Io()}fo(){this.Eo()}po(e){this.Ro(e)}yo(e){this.Vo(e)}};var Ye="WebChannelConnection",wu=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.wo=r+"://"+t.host,this.So=`projects/${i}/databases/${s}`,this.bo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Do(){return!1}Co(t,r,i,s,o){let c=tl(),l=this.vo(t,r.toUriEncodedString());L("RestConnection",`Sending RPC '${t}' ${c}:`,l,i);let h={"google-cloud-resource-prefix":this.So,"x-goog-request-params":this.bo};return this.Fo(h,s,o),this.Mo(t,l,h,i).then(p=>(L("RestConnection",`Received RPC '${t}' ${c}: `,p),p),p=>{throw ts("RestConnection",`RPC '${t}' ${c} failed with error: `,p,"url: ",l,"request:",i),p})}xo(t,r,i,s,o,c){return this.Co(t,r,i,s,o)}Fo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+hi}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}vo(t,r){let i=pv[t];return`${this.wo}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Mo(e,t,r,i){let s=tl();return new Promise((o,c)=>{let l=new Kc;l.setWithCredentials(!0),l.listenOnce(Wc.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case ji.NO_ERROR:let p=l.getResponseJson();L(Ye,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),o(p);break;case ji.TIMEOUT:L(Ye,`RPC '${e}' ${s} timed out`),c(new q(V.DEADLINE_EXCEEDED,"Request time out"));break;case ji.HTTP_ERROR:let v=l.getStatus();if(L(Ye,`RPC '${e}' ${s} failed with status:`,v,"response text:",l.getResponseText()),v>0){let S=l.getResponseJson();Array.isArray(S)&&(S=S[0]);let k=S?.error;if(k&&k.status&&k.message){let F=function(M){let Z=M.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(Z)>=0?Z:V.UNKNOWN}(k.status);c(new q(F,k.message))}else c(new q(V.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new q(V.UNAVAILABLE,"Connection failed."));break;default:K()}}finally{L(Ye,`RPC '${e}' ${s} completed.`)}});let h=JSON.stringify(i);L(Ye,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",h,r,15)})}Oo(e,t,r){let i=tl(),s=[this.wo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Jc(),c=Yc(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.xmlHttpFactory=new Hc({})),this.Fo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let p=s.join("");L(Ye,`Creating RPC '${e}' stream ${i}: ${p}`,l);let v=o.createWebChannel(p,l),S=!1,k=!1,F=new vu({lo:M=>{k?L(Ye,`Not sending because RPC '${e}' stream ${i} is closed:`,M):(S||(L(Ye,`Opening RPC '${e}' stream ${i} transport.`),v.open(),S=!0),L(Ye,`RPC '${e}' stream ${i} sending:`,M),v.send(M))},ho:()=>v.close()}),$=(M,Z,J)=>{M.listen(Z,B=>{try{J(B)}catch(ie){setTimeout(()=>{throw ie},0)}})};return $(v,Or.EventType.OPEN,()=>{k||(L(Ye,`RPC '${e}' stream ${i} transport opened.`),F.mo())}),$(v,Or.EventType.CLOSE,()=>{k||(k=!0,L(Ye,`RPC '${e}' stream ${i} transport closed`),F.po())}),$(v,Or.EventType.ERROR,M=>{k||(k=!0,ts(Ye,`RPC '${e}' stream ${i} transport errored:`,M),F.po(new q(V.UNAVAILABLE,"The operation could not be completed")))}),$(v,Or.EventType.MESSAGE,M=>{var Z;if(!k){let J=M.data[0];Y(!!J);let B=J,ie=B.error||((Z=B[0])===null||Z===void 0?void 0:Z.error);if(ie){L(Ye,`RPC '${e}' stream ${i} received error:`,ie);let le=ie.status,ee=function(b){let R=Ne[b];if(R!==void 0)return Mp(R)}(le),T=ie.message;ee===void 0&&(ee=V.INTERNAL,T="Unknown error status: "+le+" with message "+ie.message),k=!0,F.po(new q(ee,T)),v.close()}else L(Ye,`RPC '${e}' stream ${i} received:`,J),F.yo(J)}}),$(c,Qc.STAT_EVENT,M=>{M.stat===vo.PROXY?L(Ye,`RPC '${e}' stream ${i} detected buffering proxy`):M.stat===vo.NOPROXY&&L(Ye,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{F.fo()},0),F}};function um(){return typeof window<"u"?window:null}function Po(){return typeof document<"u"?document:null}function Ra(n){return new Ll(n,!0)}var ca=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.oi=e,this.timerId=t,this.No=r,this.Lo=i,this.Bo=s,this.ko=0,this.qo=null,this.Qo=Date.now(),this.reset()}reset(){this.ko=0}Ko(){this.ko=this.Bo}$o(e){this.cancel();let t=Math.floor(this.ko+this.Uo()),r=Math.max(0,Date.now()-this.Qo),i=Math.max(0,t-r);i>0&&L("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.qo=this.oi.enqueueAfterDelay(this.timerId,i,()=>(this.Qo=Date.now(),e())),this.ko*=this.Lo,this.ko<this.No&&(this.ko=this.No),this.ko>this.Bo&&(this.ko=this.Bo)}Wo(){this.qo!==null&&(this.qo.skipDelay(),this.qo=null)}cancel(){this.qo!==null&&(this.qo.cancel(),this.qo=null)}Uo(){return(Math.random()-.5)*this.ko}};var la=class{constructor(e,t,r,i,s,o,c,l){this.oi=e,this.Go=r,this.zo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.jo=0,this.Ho=null,this.Jo=null,this.stream=null,this.Yo=new ca(e,t)}Zo(){return this.state===1||this.state===5||this.Xo()}Xo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.e_()}async stop(){this.Zo()&&await this.close(0)}t_(){this.state=0,this.Yo.reset()}n_(){this.Xo()&&this.Ho===null&&(this.Ho=this.oi.enqueueAfterDelay(this.Go,6e4,()=>this.r_()))}i_(e){this.s_(),this.stream.send(e)}async r_(){if(this.Xo())return this.close(0)}s_(){this.Ho&&(this.Ho.cancel(),this.Ho=null)}o_(){this.Jo&&(this.Jo.cancel(),this.Jo=null)}async close(e,t){this.s_(),this.o_(),this.Yo.cancel(),this.jo++,e!==4?this.Yo.reset():t&&t.code===V.RESOURCE_EXHAUSTED?(De(t.toString()),De("Using maximum backoff delay to prevent overloading the backend."),this.Yo.Ko()):t&&t.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.__(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ao(t)}__(){}auth(){this.state=1;let e=this.a_(this.jo),t=this.jo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.jo===t&&this.u_(r,i)},r=>{e(()=>{let i=new q(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.c_(i)})})}u_(e,t){let r=this.a_(this.jo);this.stream=this.l_(e,t),this.stream.Po(()=>{r(()=>this.listener.Po())}),this.stream.To(()=>{r(()=>(this.state=2,this.Jo=this.oi.enqueueAfterDelay(this.zo,1e4,()=>(this.Xo()&&(this.state=3),Promise.resolve())),this.listener.To()))}),this.stream.Ao(i=>{r(()=>this.c_(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}e_(){this.state=5,this.Yo.$o(async()=>{this.state=0,this.start()})}c_(e){return L("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}a_(e){return t=>{this.oi.enqueueAndForget(()=>this.jo===e?t():(L("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Iu=class extends la{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}l_(e,t){return this.connection.Oo("Listen",e,t)}onMessage(e){this.Yo.reset();let t=Zy(this.serializer,e),r=function(s){if(!("targetChange"in s))return X.min();let o=s.targetChange;return o.targetIds&&o.targetIds.length?X.min():o.readTime?rt(o.readTime):X.min()}(e);return this.listener.h_(t,r)}P_(e){let t={};t.database=$l(this.serializer),t.addTarget=function(s,o){let c,l=o.target;if(c=Mo(l)?{documents:qp(s,l)}:{query:zp(s,l)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Fp(s,o.resumeToken);let h=Ml(s,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(X.min())>0){c.readTime=ii(s,o.snapshotVersion.toTimestamp());let h=Ml(s,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);let r=tv(this.serializer,e);r&&(t.labels=r),this.i_(t)}I_(e){let t={};t.database=$l(this.serializer),t.removeTarget=e,this.i_(t)}},Eu=class extends la{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s,this.T_=!1}get E_(){return this.T_}start(){this.T_=!1,this.lastStreamToken=void 0,super.start()}__(){this.T_&&this.d_([])}l_(e,t){return this.connection.Oo("Write",e,t)}onMessage(e){if(Y(!!e.streamToken),this.lastStreamToken=e.streamToken,this.T_){this.Yo.reset();let t=ev(e.writeResults,e.commitTime),r=rt(e.commitTime);return this.listener.A_(r,t)}return Y(!e.writeResults||e.writeResults.length===0),this.T_=!0,this.listener.R_()}V_(){let e={};e.database=$l(this.serializer),this.i_(e)}d_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>zo(this.serializer,r))};this.i_(t)}};var bu=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.m_=!1}f_(){if(this.m_)throw new q(V.FAILED_PRECONDITION,"The client has already been terminated.")}Co(e,t,r,i){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Co(e,Fl(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new q(V.UNKNOWN,s.toString())})}xo(e,t,r,i,s){return this.f_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.xo(e,Fl(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new q(V.UNKNOWN,o.toString())})}terminate(){this.m_=!0,this.connection.terminate()}},Tu=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.g_=0,this.p_=null,this.y_=!0}w_(){this.g_===0&&(this.S_("Unknown"),this.p_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.p_=null,this.b_("Backend didn't respond within 10 seconds."),this.S_("Offline"),Promise.resolve())))}D_(e){this.state==="Online"?this.S_("Unknown"):(this.g_++,this.g_>=1&&(this.C_(),this.b_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.S_("Offline")))}set(e){this.C_(),this.g_=0,e==="Online"&&(this.y_=!1),this.S_(e)}S_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}b_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.y_?(De(t),this.y_=!1):L("OnlineStateTracker",t)}C_(){this.p_!==null&&(this.p_.cancel(),this.p_=null)}};var Au=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.v_=[],this.F_=new Map,this.M_=new Set,this.x_=[],this.O_=s,this.O_.io(o=>{r.enqueueAndForget(async()=>{hr(this)&&(L("RemoteStore","Restarting streams for network reachability change."),await async function(l){let h=H(l);h.M_.add(4),await bs(h),h.N_.set("Unknown"),h.M_.delete(4),await Pa(h)}(this))})}),this.N_=new Tu(r,i)}};async function Pa(n){if(hr(n))for(let e of n.x_)await e(!0)}async function bs(n){for(let e of n.x_)await e(!1)}function Ca(n,e){let t=H(n);t.F_.has(e.targetId)||(t.F_.set(e.targetId,e),uh(t)?lh(t):fi(t).Xo()&&ch(t,e))}function ci(n,e){let t=H(n),r=fi(t);t.F_.delete(e),r.Xo()&&hm(t,e),t.F_.size===0&&(r.Xo()?r.n_():hr(t)&&t.N_.set("Unknown"))}function ch(n,e){if(n.L_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(X.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}fi(n).P_(e)}function hm(n,e){n.L_.xe(e),fi(n).I_(e)}function lh(n){n.L_=new Vl({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.F_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),fi(n).start(),n.N_.w_()}function uh(n){return hr(n)&&!fi(n).Zo()&&n.F_.size>0}function hr(n){return H(n).M_.size===0}function dm(n){n.L_=void 0}async function mv(n){n.N_.set("Online")}async function gv(n){n.F_.forEach((e,t)=>{ch(n,e)})}async function _v(n,e){dm(n),uh(n)?(n.N_.D_(e),lh(n)):n.N_.set("Unknown")}async function yv(n,e,t){if(n.N_.set("Online"),e instanceof Bo&&e.state===2&&e.cause)try{await async function(i,s){let o=s.cause;for(let c of s.targetIds)i.F_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.F_.delete(c),i.L_.removeTarget(c))}(n,e)}catch(r){L("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ua(n,r)}else if(e instanceof Kr?n.L_.Ke(e):e instanceof Uo?n.L_.He(e):n.L_.We(e),!t.isEqual(X.min()))try{let r=await om(n.localStore);t.compareTo(r)>=0&&await function(s,o){let c=s.L_.rt(o);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){let p=s.F_.get(h);p&&s.F_.set(h,p.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,h)=>{let p=s.F_.get(l);if(!p)return;s.F_.set(l,p.withResumeToken(Ke.EMPTY_BYTE_STRING,p.snapshotVersion)),hm(s,l);let v=new si(p.target,l,h,p.sequenceNumber);ch(s,v)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){L("RemoteStore","Failed to raise snapshot:",r),await ua(n,r)}}async function ua(n,e,t){if(!Dn(e))throw e;n.M_.add(1),await bs(n),n.N_.set("Offline"),t||(t=()=>om(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{L("RemoteStore","Retrying IndexedDB access"),await t(),n.M_.delete(1),await Pa(n)})}function fm(n,e){return e().catch(t=>ua(n,t,e))}async function di(n){let e=H(n),t=Pn(e),r=e.v_.length>0?e.v_[e.v_.length-1].batchId:-1;for(;vv(e);)try{let i=await fv(e.localStore,r);if(i===null){e.v_.length===0&&t.n_();break}r=i.batchId,wv(e,i)}catch(i){await ua(e,i)}pm(e)&&mm(e)}function vv(n){return hr(n)&&n.v_.length<10}function wv(n,e){n.v_.push(e);let t=Pn(n);t.Xo()&&t.E_&&t.d_(e.mutations)}function pm(n){return hr(n)&&!Pn(n).Zo()&&n.v_.length>0}function mm(n){Pn(n).start()}async function Iv(n){Pn(n).V_()}async function Ev(n){let e=Pn(n);for(let t of n.v_)e.d_(t.mutations)}async function bv(n,e,t){let r=n.v_.shift(),i=Nl.from(r,e,t);await fm(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await di(n)}async function Tv(n,e){e&&Pn(n).E_&&await async function(r,i){if(function(o){return Gy(o)&&o!==V.ABORTED}(i.code)){let s=r.v_.shift();Pn(r).t_(),await fm(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await di(r)}}(n,e),pm(n)&&mm(n)}async function Hf(n,e){let t=H(n);t.asyncQueue.verifyOperationInProgress(),L("RemoteStore","RemoteStore received new credentials");let r=hr(t);t.M_.add(3),await bs(t),r&&t.N_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.M_.delete(3),await Pa(t)}async function Su(n,e){let t=H(n);e?(t.M_.delete(2),await Pa(t)):e||(t.M_.add(2),await bs(t),t.N_.set("Unknown"))}function fi(n){return n.B_||(n.B_=function(t,r,i){let s=H(t);return s.f_(),new Iu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:mv.bind(null,n),To:gv.bind(null,n),Ao:_v.bind(null,n),h_:yv.bind(null,n)}),n.x_.push(async e=>{e?(n.B_.t_(),uh(n)?lh(n):n.N_.set("Unknown")):(await n.B_.stop(),dm(n))})),n.B_}function Pn(n){return n.k_||(n.k_=function(t,r,i){let s=H(t);return s.f_(),new Eu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Po:()=>Promise.resolve(),To:Iv.bind(null,n),Ao:Tv.bind(null,n),R_:Ev.bind(null,n),A_:bv.bind(null,n)}),n.x_.push(async e=>{e?(n.k_.t_(),await di(n)):(await n.k_.stop(),n.v_.length>0&&(L("RemoteStore",`Stopping write stream with ${n.v_.length} pending writes`),n.v_=[]))})),n.k_}var Ru=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let o=Date.now()+r,c=new n(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new q(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function hh(n,e){if(De("AsyncQueue",`${e}: ${n}`),Dn(n))return new q(V.UNAVAILABLE,`${e}: ${n}`);throw n}var ha=class n{constructor(e){this.comparator=e?(t,r)=>e(t,r)||z.comparator(t.key,r.key):(t,r)=>z.comparator(t.key,r.key),this.keyedMap=Hi(),this.sortedSet=new Ee(this.comparator)}static emptySet(e){return new n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var da=class{constructor(){this.q_=new Ee(z.comparator)}track(e){let t=e.doc.key,r=this.q_.get(t);r?e.type!==0&&r.type===3?this.q_=this.q_.insert(t,e):e.type===3&&r.type!==1?this.q_=this.q_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.q_=this.q_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.q_=this.q_.remove(t):e.type===1&&r.type===2?this.q_=this.q_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.q_=this.q_.insert(t,{type:2,doc:e.doc}):K():this.q_=this.q_.insert(t,e)}Q_(){let e=[];return this.q_.inorderTraversal((t,r)=>{e.push(r)}),e}},li=class n{constructor(e,t,r,i,s,o,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,i,s){let o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new n(e,t,ha.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Sa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Pu=class{constructor(){this.K_=void 0,this.U_=[]}W_(){return this.U_.some(e=>e.G_())}},Cu=class{constructor(){this.queries=new Ot(e=>bp(e),Sa),this.onlineState="Unknown",this.z_=new Set}};async function Av(n,e){let t=H(n),r=3,i=e.query,s=t.queries.get(i);s?!s.W_()&&e.G_()&&(r=2):(s=new Pu,r=e.G_()?0:1);try{switch(r){case 0:s.K_=await t.onListen(i,!0);break;case 1:s.K_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){let c=hh(o,`Initialization of query '${Ur(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.U_.push(e),e.j_(t.onlineState),s.K_&&e.H_(s.K_)&&dh(t)}async function Sv(n,e){let t=H(n),r=e.query,i=3,s=t.queries.get(r);if(s){let o=s.U_.indexOf(e);o>=0&&(s.U_.splice(o,1),s.U_.length===0?i=e.G_()?0:1:!s.W_()&&e.G_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Rv(n,e){let t=H(n),r=!1;for(let i of e){let s=i.query,o=t.queries.get(s);if(o){for(let c of o.U_)c.H_(i)&&(r=!0);o.K_=i}}r&&dh(t)}function Pv(n,e,t){let r=H(n),i=r.queries.get(e);if(i)for(let s of i.U_)s.onError(t);r.queries.delete(e)}function dh(n){n.z_.forEach(e=>{e.next()})}var Du,Wf;(Wf=Du||(Du={})).J_="default",Wf.Cache="cache";var ku=class{constructor(e,t,r){this.query=e,this.Y_=t,this.Z_=!1,this.X_=null,this.onlineState="Unknown",this.options=r||{}}H_(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new li(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Z_?this.ea(e)&&(this.Y_.next(e),t=!0):this.ta(e,this.onlineState)&&(this.na(e),t=!0),this.X_=e,t}onError(e){this.Y_.error(e)}j_(e){this.onlineState=e;let t=!1;return this.X_&&!this.Z_&&this.ta(this.X_,e)&&(this.na(this.X_),t=!0),t}ta(e,t){if(!e.fromCache||!this.G_())return!0;let r=t!=="Offline";return(!this.options.ra||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ea(e){if(e.docChanges.length>0)return!0;let t=this.X_&&this.X_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}na(e){e=li.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Z_=!0,this.Y_.next(e)}G_(){return this.options.source!==Du.Cache}};var fa=class{constructor(e){this.key=e}},pa=class{constructor(e){this.key=e}},Nu=class{constructor(e,t){this.query=e,this.la=t,this.ha=null,this.hasCachedResults=!1,this.current=!1,this.Pa=ae(),this.mutatedKeys=ae(),this.Ia=Ap(e),this.Ta=new ha(this.Ia)}get Ea(){return this.la}da(e,t){let r=t?t.Aa:new da,i=t?t.Ta:this.Ta,s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1,l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,v)=>{let S=i.get(p),k=Es(this.query,v)?v:null,F=!!S&&this.mutatedKeys.has(S.key),$=!!k&&(k.hasLocalMutations||this.mutatedKeys.has(k.key)&&k.hasCommittedMutations),M=!1;S&&k?S.data.isEqual(k.data)?F!==$&&(r.track({type:3,doc:k}),M=!0):this.Ra(S,k)||(r.track({type:2,doc:k}),M=!0,(l&&this.Ia(k,l)>0||h&&this.Ia(k,h)<0)&&(c=!0)):!S&&k?(r.track({type:0,doc:k}),M=!0):S&&!k&&(r.track({type:1,doc:S}),M=!0,(l||h)&&(c=!0)),M&&(k?(o=o.add(k),s=$?s.add(p):s.delete(p)):(o=o.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){let p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{Ta:o,Aa:r,Xi:c,mutatedKeys:s}}Ra(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.Ta;this.Ta=e.Ta,this.mutatedKeys=e.mutatedKeys;let o=e.Aa.Q_();o.sort((p,v)=>function(k,F){let $=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K()}};return $(k)-$(F)}(p.type,v.type)||this.Ia(p.doc,v.doc)),this.Va(r),i=i!=null&&i;let c=t&&!i?this.ma():[],l=this.Pa.size===0&&this.current&&!i?1:0,h=l!==this.ha;return this.ha=l,o.length!==0||h?{snapshot:new li(this.query,e.Ta,s,o,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),fa:c}:{fa:c}}j_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ta:this.Ta,Aa:new da,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{fa:[]}}ga(e){return!this.la.has(e)&&!!this.Ta.has(e)&&!this.Ta.get(e).hasLocalMutations}Va(e){e&&(e.addedDocuments.forEach(t=>this.la=this.la.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.la=this.la.delete(t)),this.current=e.current)}ma(){if(!this.current)return[];let e=this.Pa;this.Pa=ae(),this.Ta.forEach(r=>{this.ga(r.key)&&(this.Pa=this.Pa.add(r.key))});let t=[];return e.forEach(r=>{this.Pa.has(r)||t.push(new pa(r))}),this.Pa.forEach(r=>{e.has(r)||t.push(new fa(r))}),t}pa(e){this.la=e.hs,this.Pa=ae();let t=this.da(e.documents);return this.applyChanges(t,!0)}ya(){return li.fromInitialDocuments(this.query,this.Ta,this.mutatedKeys,this.ha===0,this.hasCachedResults)}},xu=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Ou=class{constructor(e){this.key=e,this.wa=!1}},Vu=class{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Sa={},this.ba=new Ot(c=>bp(c),Sa),this.Da=new Map,this.Ca=new Set,this.va=new Ee(z.comparator),this.Fa=new Map,this.Ma=new fs,this.xa={},this.Oa=new Map,this.Na=oi.Ln(),this.onlineState="Unknown",this.La=void 0}get isPrimaryClient(){return this.La===!0}};async function Cv(n,e,t=!0){let r=Da(n),i,s=r.ba.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.ya()):i=await gm(r,e,t,!0),i}async function Dv(n,e){let t=Da(n);await gm(t,e,!0,!1)}async function gm(n,e,t,r){let i=await ra(n.localStore,pt(e)),s=i.targetId,o=t?n.sharedClientState.addLocalQueryTarget(s):"not-current",c;return r&&(c=await fh(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Ca(n.remoteStore,i),c}async function fh(n,e,t,r,i){n.Ba=(v,S,k)=>async function($,M,Z,J){let B=M.view.da(Z);B.Xi&&(B=await gu($.localStore,M.query,!1).then(({documents:T})=>M.view.da(T,B)));let ie=J&&J.targetChanges.get(M.targetId),le=J&&J.targetMismatches.get(M.targetId)!=null,ee=M.view.applyChanges(B,$.isPrimaryClient,ie,le);return Lu($,M.targetId,ee.fa),ee.snapshot}(n,v,S,k);let s=await gu(n.localStore,e,!0),o=new Nu(e,s.hs),c=o.da(s.documents),l=hs.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),h=o.applyChanges(c,n.isPrimaryClient,l);Lu(n,t,h.fa);let p=new xu(e,t,o);return n.ba.set(e,p),n.Da.has(t)?n.Da.get(t).push(e):n.Da.set(t,[e]),h.snapshot}async function kv(n,e,t){let r=H(n),i=r.ba.get(e),s=r.Da.get(i.targetId);if(s.length>1)return r.Da.set(i.targetId,s.filter(o=>!Sa(o,e))),void r.ba.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await ai(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&ci(r.remoteStore,i.targetId),ui(r,i.targetId)}).catch(Cn)):(ui(r,i.targetId),await ai(r.localStore,i.targetId,!0))}async function Nv(n,e){let t=H(n),r=t.ba.get(e),i=t.Da.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ci(t.remoteStore,r.targetId))}async function xv(n,e,t){let r=_h(n);try{let i=await function(o,c){let l=H(o),h=ke.now(),p=c.reduce((k,F)=>k.add(F.key),ae()),v,S;return l.persistence.runTransaction("Locally write mutations","readwrite",k=>{let F=ft(),$=ae();return l.os.getEntries(k,p).next(M=>{F=M,F.forEach((Z,J)=>{J.isValidDocument()||($=$.add(Z))})}).next(()=>l.localDocuments.getOverlayedDocuments(k,F)).next(M=>{v=M;let Z=[];for(let J of c){let B=zy(J,v.get(J.key).overlayedDocument);B!=null&&Z.push(new Tt(J.key,B,gp(B.value.mapValue),Xe.exists(!0)))}return l.mutationQueue.addMutationBatch(k,h,Z,c)}).next(M=>{S=M;let Z=M.applyToLocalDocumentSet(v,$);return l.documentOverlayCache.saveOverlays(k,M.batchId,Z)})}).then(()=>({batchId:S.batchId,changes:Rp(v)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,l){let h=o.xa[o.currentUser.toKey()];h||(h=new Ee(re)),h=h.insert(c,l),o.xa[o.currentUser.toKey()]=h}(r,i.batchId,t),await kn(r,i.changes),await di(r.remoteStore)}catch(i){let s=hh(i,"Failed to persist write");t.reject(s)}}async function _m(n,e){let t=H(n);try{let r=await hv(t.localStore,e);e.targetChanges.forEach((i,s)=>{let o=t.Fa.get(s);o&&(Y(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.wa=!0:i.modifiedDocuments.size>0?Y(o.wa):i.removedDocuments.size>0&&(Y(o.wa),o.wa=!1))}),await kn(t,r,e)}catch(r){await Cn(r)}}function Qf(n,e,t){let r=H(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.ba.forEach((s,o)=>{let c=o.view.j_(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){let l=H(o);l.onlineState=c;let h=!1;l.queries.forEach((p,v)=>{for(let S of v.U_)S.j_(c)&&(h=!0)}),h&&dh(l)}(r.eventManager,e),i.length&&r.Sa.h_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Ov(n,e,t){let r=H(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Fa.get(e),s=i&&i.key;if(s){let o=new Ee(z.comparator);o=o.insert(s,Ge.newNoDocument(s,X.min()));let c=ae().add(s),l=new us(X.min(),new Map,new Ee(re),o,c);await _m(r,l),r.va=r.va.remove(s),r.Fa.delete(e),gh(r)}else await ai(r.localStore,e,!1).then(()=>ui(r,e,t)).catch(Cn)}async function Vv(n,e){let t=H(n),r=e.batch.batchId;try{let i=await uv(t.localStore,e);mh(t,r,null),ph(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await kn(t,i)}catch(i){await Cn(i)}}async function Lv(n,e,t){let r=H(n);try{let i=await function(o,c){let l=H(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let p;return l.mutationQueue.lookupMutationBatch(h,c).next(v=>(Y(v!==null),p=v.keys(),l.mutationQueue.removeMutationBatch(h,v))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p)).next(()=>l.localDocuments.getDocuments(h,p))})}(r.localStore,e);mh(r,e,t),ph(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await kn(r,i)}catch(i){await Cn(i)}}function ph(n,e){(n.Oa.get(e)||[]).forEach(t=>{t.resolve()}),n.Oa.delete(e)}function mh(n,e,t){let r=H(n),i=r.xa[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.xa[r.currentUser.toKey()]=i}}function ui(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Da.get(e))n.ba.delete(r),t&&n.Sa.ka(r,t);n.Da.delete(e),n.isPrimaryClient&&n.Ma.Vr(e).forEach(r=>{n.Ma.containsKey(r)||ym(n,r)})}function ym(n,e){n.Ca.delete(e.path.canonicalString());let t=n.va.get(e);t!==null&&(ci(n.remoteStore,t),n.va=n.va.remove(e),n.Fa.delete(t),gh(n))}function Lu(n,e,t){for(let r of t)r instanceof fa?(n.Ma.addReference(r.key,e),Mv(n,r)):r instanceof pa?(L("SyncEngine","Document no longer in limbo: "+r.key),n.Ma.removeReference(r.key,e),n.Ma.containsKey(r.key)||ym(n,r.key)):K()}function Mv(n,e){let t=e.key,r=t.path.canonicalString();n.va.get(t)||n.Ca.has(r)||(L("SyncEngine","New document in limbo: "+t),n.Ca.add(r),gh(n))}function gh(n){for(;n.Ca.size>0&&n.va.size<n.maxConcurrentLimboResolutions;){let e=n.Ca.values().next().value;n.Ca.delete(e);let t=new z(we.fromString(e)),r=n.Na.next();n.Fa.set(r,new Ou(t)),n.va=n.va.insert(t,r),Ca(n.remoteStore,new si(pt(Aa(t.path)),r,"TargetPurposeLimboResolution",Je.oe))}}async function kn(n,e,t){let r=H(n),i=[],s=[],o=[];r.ba.isEmpty()||(r.ba.forEach((c,l)=>{o.push(r.Ba(l,e,t).then(h=>{if((h||t)&&r.isPrimaryClient){let p=h&&!h.fromCache;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(h){i.push(h);let p=fu.Ki(l.targetId,h);s.push(p)}}))}),await Promise.all(o),r.Sa.h_(i),await async function(l,h){let p=H(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>N.forEach(h,S=>N.forEach(S.qi,k=>p.persistence.referenceDelegate.addReference(v,S.targetId,k)).next(()=>N.forEach(S.Qi,k=>p.persistence.referenceDelegate.removeReference(v,S.targetId,k)))))}catch(v){if(!Dn(v))throw v;L("LocalStore","Failed to update sequence numbers: "+v)}for(let v of h){let S=v.targetId;if(!v.fromCache){let k=p.ns.get(S),F=k.snapshotVersion,$=k.withLastLimboFreeSnapshotVersion(F);p.ns=p.ns.insert(S,$)}}}(r.localStore,s))}async function Fv(n,e){let t=H(n);if(!t.currentUser.isEqual(e)){L("SyncEngine","User change. New user:",e.toKey());let r=await sm(t.localStore,e);t.currentUser=e,function(s,o){s.Oa.forEach(c=>{c.forEach(l=>{l.reject(new q(V.CANCELLED,o))})}),s.Oa.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await kn(t,r.us)}}function $v(n,e){let t=H(n),r=t.Fa.get(e);if(r&&r.wa)return ae().add(r.key);{let i=ae(),s=t.Da.get(e);if(!s)return i;for(let o of s){let c=t.ba.get(o);i=i.unionWith(c.view.Ea)}return i}}async function Uv(n,e){let t=H(n),r=await gu(t.localStore,e.query,!0),i=e.view.pa(r);return t.isPrimaryClient&&Lu(t,e.targetId,i.fa),i}async function Bv(n,e){let t=H(n);return cm(t.localStore,e).then(r=>kn(t,r))}async function jv(n,e,t,r){let i=H(n),s=await function(c,l){let h=H(c),p=H(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",v=>p.vn(v,l).next(S=>S?h.localDocuments.getDocuments(v,S):N.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await di(i.remoteStore):t==="acknowledged"||t==="rejected"?(mh(i,e,r||null),ph(i,e),function(c,l){H(H(c).mutationQueue).Mn(l)}(i.localStore,e)):K(),await kn(i,s)):L("SyncEngine","Cannot apply mutation batch with id: "+e)}async function qv(n,e){let t=H(n);if(Da(t),_h(t),e===!0&&t.La!==!0){let r=t.sharedClientState.getAllActiveQueryTargets(),i=await Yf(t,r.toArray());t.La=!0,await Su(t.remoteStore,!0);for(let s of i)Ca(t.remoteStore,s)}else if(e===!1&&t.La!==!1){let r=[],i=Promise.resolve();t.Da.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(ui(t,o),ai(t.localStore,o,!0))),ci(t.remoteStore,o)}),await i,await Yf(t,r),function(o){let c=H(o);c.Fa.forEach((l,h)=>{ci(c.remoteStore,h)}),c.Ma.mr(),c.Fa=new Map,c.va=new Ee(z.comparator)}(t),t.La=!1,await Su(t.remoteStore,!1)}}async function Yf(n,e,t){let r=H(n),i=[],s=[];for(let o of e){let c,l=r.Da.get(o);if(l&&l.length!==0){c=await ra(r.localStore,pt(l[0]));for(let h of l){let p=r.ba.get(h),v=await Uv(r,p);v.snapshot&&s.push(v.snapshot)}}else{let h=await am(r.localStore,o);c=await ra(r.localStore,h),await fh(r,vm(h),o,!1,c.resumeToken)}i.push(c)}return r.Sa.h_(s),i}function vm(n){return Ep(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function zv(n){return function(t){return H(H(t).persistence).Bi()}(H(n).localStore)}async function Gv(n,e,t,r){let i=H(n);if(i.La)return void L("SyncEngine","Ignoring unexpected query state notification.");let s=i.Da.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{let o=await cm(i.localStore,Tp(s[0])),c=us.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ke.EMPTY_BYTE_STRING);await kn(i,o,c);break}case"rejected":await ai(i.localStore,e,!0),ui(i,e,r);break;default:K()}}async function Kv(n,e,t){let r=Da(n);if(r.La){for(let i of e){if(r.Da.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){L("SyncEngine","Adding an already active target "+i);continue}let s=await am(r.localStore,i),o=await ra(r.localStore,s);await fh(r,vm(s),o.targetId,!1,o.resumeToken),Ca(r.remoteStore,o)}for(let i of t)r.Da.has(i)&&await ai(r.localStore,i,!1).then(()=>{ci(r.remoteStore,i),ui(r,i)}).catch(Cn)}}function Da(n){let e=H(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=_m.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=$v.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Ov.bind(null,e),e.Sa.h_=Rv.bind(null,e.eventManager),e.Sa.ka=Pv.bind(null,e.eventManager),e}function _h(n){let e=H(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Vv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Lv.bind(null,e),e}var ms=class{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=Ra(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return im(this.persistence,new na,e.initialUser,this.serializer)}createPersistence(e){return new ea(ta.Hr,this.serializer)}createSharedClientState(e){return new oa}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};var ma=class extends ms{constructor(e,t,r){super(),this.Qa=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Qa.initialize(this,e),await _h(this.Qa.syncEngine),await di(this.Qa.remoteStore),await this.persistence.fi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}createLocalStore(e){return im(this.persistence,new na,e.initialUser,this.serializer)}createGarbageCollectionScheduler(e,t){let r=this.persistence.referenceDelegate.garbageCollector;return new Xl(r,e.asyncQueue,t)}createIndexBackfillerScheduler(e,t){let r=new ml(t,this.persistence);return new pl(e.asyncQueue,r)}createPersistence(e){let t=rm(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?yt.withCacheSize(this.cacheSizeBytes):yt.DEFAULT;return new du(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,um(),Po(),this.serializer,this.sharedClientState,!!this.forceOwnership)}createSharedClientState(e){return new oa}},Mu=class extends ma{constructor(e,t){super(e,t,!1),this.Qa=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);let t=this.Qa.syncEngine;this.sharedClientState instanceof es&&(this.sharedClientState.syncEngine={Zs:jv.bind(null,t),Xs:Gv.bind(null,t),eo:Kv.bind(null,t),Bi:zv.bind(null,t),Ys:Bv.bind(null,t)},await this.sharedClientState.start()),await this.persistence.fi(async r=>{await qv(this.Qa.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}createSharedClientState(e){let t=um();if(!es.D(t))throw new q(V.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");let r=rm(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new es(t,e.asyncQueue,r,e.clientId,e.initialUser)}},gs=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Qf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Fv.bind(null,this.syncEngine),await Su(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Cu}()}createDatastore(e){let t=Ra(e.databaseInfo.databaseId),r=function(s){return new wu(s)}(e.databaseInfo);return function(s,o,c,l){return new bu(s,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new Au(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Qf(this.syncEngine,t,0),function(){return aa.D()?new aa:new yu}())}createSyncEngine(e,t){return function(i,s,o,c,l,h,p){let v=new Vu(i,s,o,c,l,h);return p&&(v.La=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e;await async function(r){let i=H(r);L("RemoteStore","RemoteStore shutting down."),i.M_.add(5),await bs(i),i.O_.shutdown(),i.N_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate()}};var Fu=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ka(this.observer.next,e)}error(e){this.observer.error?this.Ka(this.observer.error,e):De("Uncaught Error in snapshot listener:",e.toString())}$a(){this.muted=!0}Ka(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}};var $u=class{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=$e.UNAUTHENTICATED,this.clientId=Co.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{L("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(L("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new q(V.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new kt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=hh(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function nl(n,e){n.asyncQueue.verifyOperationInProgress(),L("FirestoreClient","Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await sm(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Jf(n,e){n.asyncQueue.verifyOperationInProgress();let t=await Wv(n);L("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Hf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Hf(e.remoteStore,i)),n._onlineComponents=e}function Hv(n){return n.name==="FirebaseError"?n.code===V.FAILED_PRECONDITION||n.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function Wv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L("FirestoreClient","Using user provided OfflineComponentProvider");try{await nl(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!Hv(t))throw t;ts("Error using user provided cache. Falling back to memory cache: "+t),await nl(n,new ms)}}else L("FirestoreClient","Using default OfflineComponentProvider"),await nl(n,new ms);return n._offlineComponents}async function wm(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L("FirestoreClient","Using user provided OnlineComponentProvider"),await Jf(n,n._uninitializedComponentsProvider._online)):(L("FirestoreClient","Using default OnlineComponentProvider"),await Jf(n,new gs))),n._onlineComponents}function Qv(n){return wm(n).then(e=>e.syncEngine)}async function Xf(n){let e=await wm(n),t=e.eventManager;return t.onListen=Cv.bind(null,e.syncEngine),t.onUnlisten=kv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Dv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Nv.bind(null,e.syncEngine),t}function Im(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Zf=new Map;function Em(n,e,t){if(!t)throw new q(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Yv(n,e,t,r){if(e===!0&&r===!0)throw new q(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ep(n){if(!z.isDocumentKey(n))throw new q(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function tp(n){if(z.isDocumentKey(n))throw new q(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function yh(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":K()}function Yt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new q(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=yh(n);throw new q(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}var ga=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new q(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new q(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Yv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Im((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new q(V.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new q(V.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new q(V.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},_s=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ga({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new q(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new q(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ga(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new sl;switch(r.type){case"firstParty":return new cl(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new q(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Zf.get(t);r&&(L("ComponentProvider","Removing Datastore"),Zf.delete(t),r.terminate())}(this),Promise.resolve()}};var _a=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},st=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new In(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},In=class n extends _a{constructor(e,t,r){super(e,t,Aa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new st(this.firestore,null,new z(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function ka(n,e,...t){if(n=Te(n),Em("collection","path",e),n instanceof _s){let r=we.fromString(e,...t);return tp(r),new In(n,null,r)}{if(!(n instanceof st||n instanceof In))throw new q(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(we.fromString(e,...t));return tp(r),new In(n.firestore,null,r)}}function Ts(n,e,...t){if(n=Te(n),arguments.length===1&&(e=Co.newId()),Em("doc","path",e),n instanceof _s){let r=we.fromString(e,...t);return ep(r),new st(n,null,new z(r))}{if(!(n instanceof st||n instanceof In))throw new q(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(we.fromString(e,...t));return ep(r),new st(n.firestore,n instanceof In?n.converter:null,new z(r))}}var Uu=class{constructor(){this.iu=Promise.resolve(),this.su=[],this.ou=!1,this._u=[],this.au=null,this.uu=!1,this.cu=!1,this.lu=[],this.Yo=new ca(this,"async_queue_retry"),this.hu=()=>{let t=Po();t&&L("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Yo.Wo()};let e=Po();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.hu)}get isShuttingDown(){return this.ou}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pu(),this.Iu(e)}enterRestrictedMode(e){if(!this.ou){this.ou=!0,this.cu=e||!1;let t=Po();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hu)}}enqueue(e){if(this.Pu(),this.ou)return new Promise(()=>{});let t=new kt;return this.Iu(()=>this.ou&&this.cu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.su.push(e),this.Tu()))}async Tu(){if(this.su.length!==0){try{await this.su[0](),this.su.shift(),this.Yo.reset()}catch(e){if(!Dn(e))throw e;L("AsyncQueue","Operation failed with retryable error: "+e)}this.su.length>0&&this.Yo.$o(()=>this.Tu())}}Iu(e){let t=this.iu.then(()=>(this.uu=!0,e().catch(r=>{this.au=r,this.uu=!1;let i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw De("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.uu=!1,r))));return this.iu=t,t}enqueueAfterDelay(e,t,r){this.Pu(),this.lu.indexOf(e)>-1&&(t=0);let i=Ru.createAndSchedule(this,e,t,r,s=>this.Eu(s));return this._u.push(i),i}Pu(){this.au&&K()}verifyOperationInProgress(){}async du(){let e;do e=this.iu,await e;while(e!==this.iu)}Au(e){for(let t of this._u)if(t.timerId===e)return!0;return!1}Ru(e){return this.du().then(()=>{this._u.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this._u)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.du()})}Vu(e){this.lu.push(e)}Eu(e){let t=this._u.indexOf(e);this._u.splice(t,1)}};function np(n){return function(t,r){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}var Xt=class extends _s{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=function(){return new Uu}(),this._persistenceKey=i?.name||"[DEFAULT]"}_terminate(){return this._firestoreClient||Tm(this),this._firestoreClient.terminate()}};function bm(n,e,t){t||(t="(default)");let r=Bi(n,"firestore");if(r.isInitialized(t)){let i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(hn(s,e))return i;throw new q(V.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new q(V.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new q(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function vh(n){return n._firestoreClient||Tm(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function Tm(n){var e,t,r;let i=n._freezeSettings(),s=function(c,l,h,p){return new gl(c,l,h,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Im(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new $u(n._authCredentials,n._appCheckCredentials,n._queue,s),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}var ys=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Ke.fromBase64String(e))}catch(t){throw new q(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var lr=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new q(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Me(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var vs=class{constructor(e){this._methodName=e}};var ws=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new q(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new q(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return re(this._lat,e._lat)||re(this._long,e._long)}};var Jv=/^__.*__$/,Bu=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Tt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Rn(e,this.data,t,this.fieldTransforms)}},ya=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Tt(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function Am(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K()}}var ju=class n{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.mu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get fu(){return this.settings.fu}gu(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}pu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.wu(e),i}Su(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.gu({path:r,yu:!1});return i.mu(),i}bu(e){return this.gu({path:void 0,yu:!0})}Du(e){return wa(e,this.settings.methodName,this.settings.Cu||!1,this.path,this.settings.vu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}mu(){if(this.path)for(let e=0;e<this.path.length;e++)this.wu(this.path.get(e))}wu(e){if(e.length===0)throw this.Du("Document fields must not be empty");if(Am(this.fu)&&Jv.test(e))throw this.Du('Document fields cannot begin and end with "__"')}},qu=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ra(e)}Fu(e,t,r,i=!1){return new ju({fu:e,methodName:t,vu:r,path:Me.emptyPath(),yu:!1,Cu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function wh(n){let e=n._freezeSettings(),t=Ra(n._databaseId);return new qu(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Sm(n,e,t,r,i,s={}){let o=n.Fu(s.merge||s.mergeFields?2:0,e,t,i);Ih("Data must be an object, but it was:",o,r);let c=Cm(r,o),l,h;if(s.merge)l=new dt(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){let p=[];for(let v of s.mergeFields){let S=zu(e,v,t);if(!o.contains(S))throw new q(V.INVALID_ARGUMENT,`Field '${S}' is specified in your field mask but missing from your input data.`);km(p,S)||p.push(S)}l=new dt(p),h=o.fieldTransforms.filter(v=>l.covers(v.field))}else l=null,h=o.fieldTransforms;return new Bu(new tt(c),l,h)}var va=class n extends vs{_toFieldTransform(e){if(e.fu!==2)throw e.fu===1?e.Du(`${this._methodName}() can only appear at the top level of your update data`):e.Du(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};function Rm(n,e,t,r){let i=n.Fu(1,e,t);Ih("Data must be an object, but it was:",i,r);let s=[],o=tt.empty();ur(r,(l,h)=>{let p=Eh(e,l,t);h=Te(h);let v=i.Su(p);if(h instanceof va)s.push(p);else{let S=Na(h,v);S!=null&&(s.push(p),o.set(p,S))}});let c=new dt(s);return new ya(o,c,i.fieldTransforms)}function Pm(n,e,t,r,i,s){let o=n.Fu(1,e,t),c=[zu(e,r,t)],l=[i];if(s.length%2!=0)throw new q(V.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let S=0;S<s.length;S+=2)c.push(zu(e,s[S])),l.push(s[S+1]);let h=[],p=tt.empty();for(let S=c.length-1;S>=0;--S)if(!km(h,c[S])){let k=c[S],F=l[S];F=Te(F);let $=o.Su(k);if(F instanceof va)h.push(k);else{let M=Na(F,$);M!=null&&(h.push(k),p.set(k,M))}}let v=new dt(h);return new ya(p,v,o.fieldTransforms)}function Na(n,e){if(Dm(n=Te(n)))return Ih("Unsupported field value:",e,n),Cm(n,e);if(n instanceof vs)return function(r,i){if(!Am(i.fu))throw i.Du(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Du(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.yu&&e.fu!==4)throw e.Du("Nested arrays are not supported");return function(r,i){let s=[],o=0;for(let c of r){let l=Na(c,i.bu(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=Te(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return $y(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=ke.fromDate(r);return{timestampValue:ii(i.serializer,s)}}if(r instanceof ke){let s=new ke(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ii(i.serializer,s)}}if(r instanceof ws)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ys)return{bytesValue:Fp(i.serializer,r._byteString)};if(r instanceof st){let s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Du(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:oh(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i.Du(`Unsupported field value: ${yh(r)}`)}(n,e)}function Cm(n,e){let t={};return pp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ur(n,(r,i)=>{let s=Na(i,e.pu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Dm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ke||n instanceof ws||n instanceof ys||n instanceof st||n instanceof vs)}function Ih(n,e,t){if(!Dm(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=yh(t);throw r==="an object"?e.Du(n+" a custom object"):e.Du(n+" "+r)}}function zu(n,e,t){if((e=Te(e))instanceof lr)return e._internalPath;if(typeof e=="string")return Eh(n,e);throw wa("Field path arguments must be of type string or ",n,!1,void 0,t)}var Xv=new RegExp("[~\\*/\\[\\]]");function Eh(n,e,t){if(e.search(Xv)>=0)throw wa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new lr(...e.split("."))._internalPath}catch{throw wa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function wa(n,e,t,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new q(V.INVALID_ARGUMENT,c+n+l)}function km(n,e){return n.some(t=>t.isEqual(e))}var Ia=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new st(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Gu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Nm("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Gu=class extends Ia{data(){return super.data()}};function Nm(n,e){return typeof e=="string"?Eh(n,e):e instanceof lr?e._internalPath:e._delegate._internalPath}function Zv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new q(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var Ku=class{convertValue(e,t="none"){switch(nr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(En(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw K()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return ur(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new ws(Pe(e.latitude),Pe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=nh(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ss(e));default:return null}}convertTimestamp(e){let t=Jt(e);return new ke(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=we.fromString(e);Y(Wp(r));let i=new Jr(r.get(1),r.get(3)),s=new z(r.popFirst(5));return i.isEqual(t)||De(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function xm(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Xn=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},Ea=class extends Ia{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Hr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Nm("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},Hr=class extends Ea{data(e={}){return super.data(e)}},Hu=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Xn(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Hr(this._firestore,this._userDataWriter,r.key,r,new Xn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new q(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{let l=new Hr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Xn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let l=new Hr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Xn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),h=-1,p=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:ew(c.type),doc:l,oldIndex:h,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function ew(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K()}}var ba=class extends Ku{constructor(e){super(),this.firestore=e}convertBytes(e){return new ys(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new st(this.firestore,null,t)}};function bh(n,e,t){n=Yt(n,st);let r=Yt(n.firestore,Xt),i=xm(n.converter,e,t);return xa(r,[Sm(wh(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Xe.none())])}function Om(n,e,t,...r){n=Yt(n,st);let i=Yt(n.firestore,Xt),s=wh(i),o;return o=typeof(e=Te(e))=="string"||e instanceof lr?Pm(s,"updateDoc",n._key,e,t,r):Rm(s,"updateDoc",n._key,e),xa(i,[o.toMutation(n._key,Xe.exists(!0))])}function Vm(n){return xa(Yt(n.firestore,Xt),[new or(n._key,Xe.none())])}function Th(n,...e){var t,r,i;n=Te(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||np(e[o])||(s=e[o],o++);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(np(e[o])){let v=e[o];e[o]=(t=v.next)===null||t===void 0?void 0:t.bind(v),e[o+1]=(r=v.error)===null||r===void 0?void 0:r.bind(v),e[o+2]=(i=v.complete)===null||i===void 0?void 0:i.bind(v)}let l,h,p;if(n instanceof st)h=Yt(n.firestore,Xt),p=Aa(n._key.path),l={next:v=>{e[o]&&e[o](tw(h,n,v))},error:e[o+1],complete:e[o+2]};else{let v=Yt(n,_a);h=Yt(v.firestore,Xt),p=v._query;let S=new ba(h);l={next:k=>{e[o]&&e[o](new Hu(h,S,v,k))},error:e[o+1],complete:e[o+2]},Zv(n._query)}return function(S,k,F,$){let M=new Fu($),Z=new ku(k,M,F);return S.asyncQueue.enqueueAndForget(async()=>Av(await Xf(S),Z)),()=>{M.$a(),S.asyncQueue.enqueueAndForget(async()=>Sv(await Xf(S),Z))}}(vh(h),p,c,l)}function xa(n,e){return function(r,i){let s=new kt;return r.asyncQueue.enqueueAndForget(async()=>xv(await Qv(r),i,s)),s.promise}(vh(n),e)}function tw(n,e,t){let r=t.docs.get(e._key),i=new ba(n);return new Ea(n,i,e._key,r,new Xn(t.hasPendingWrites,t.fromCache),e.converter)}var Wu=class{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=nw(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}};function Lm(n){return new Wu(n)}var Qu=class{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=new gs,this._offlineComponentProvider=new ma(this._onlineComponentProvider,e?.cacheSizeBytes,this.forceOwnership)}},Yu=class{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=new gs,this._offlineComponentProvider=new Mu(this._onlineComponentProvider,e?.cacheSizeBytes)}};function nw(n){return new Qu(n?.forceOwnership)}function Mm(){return new Yu}var Ju=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=wh(e)}set(e,t,r){this._verifyNotCommitted();let i=rl(e,this._firestore),s=xm(i.converter,t,r),o=Sm(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Xe.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=rl(e,this._firestore),o;return o=typeof(t=Te(t))=="string"||t instanceof lr?Pm(this._dataReader,"WriteBatch.update",s._key,t,r,i):Rm(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Xe.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=rl(e,this._firestore);return this._mutations=this._mutations.concat(new or(t._key,Xe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new q(V.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function rl(n,e){if((n=Te(n)).firestore!==e)throw new q(V.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function Fm(n){return vh(n=Yt(n,Xt)),new Ju(n,e=>xa(n,e))}(function(e,t=!0){(function(i){hi=i})(mn),pn(new _t("firestore",(r,{instanceIdentifier:i,options:s})=>{let o=r.getProvider("app").getImmediate(),c=new Xt(new ol(r.getProvider("auth-internal")),new ul(r.getProvider("app-check-internal")),function(h,p){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new q(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Jr(h.options.projectId,p)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Et(nf,"4.6.3",e),Et(nf,"4.6.3","esm2017")})();function Oa(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function tg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var ng=tg,rg=new Ht("auth","Firebase",tg());var Ua=new dn("@firebase/auth");function rw(n,...e){Ua.logLevel<=ce.WARN&&Ua.warn(`Auth (${mn}): ${n}`,...e)}function La(n,...e){Ua.logLevel<=ce.ERROR&&Ua.error(`Auth (${mn}): ${n}`,...e)}function At(n,...e){throw Gh(n,...e)}function Lt(n,...e){return Gh(n,...e)}function ig(n,e,t){let r=Object.assign(Object.assign({},ng()),{[e]:t});return new Ht("auth","Firebase",r).create(e,{appName:n.name})}function en(n){return ig(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Gh(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return rg.create(n,...e)}function W(n,e,...t){if(!n)throw Gh(e,...t)}function Vt(n){let e="INTERNAL ASSERTION FAILED: "+n;throw La(e),new Error(e)}function tn(n,e){n||Vt(e)}function Rh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function iw(){return $m()==="http:"||$m()==="https:"}function $m(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function sw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(iw()||Od()||"connection"in navigator)?navigator.onLine:!0}function ow(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var dr=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,tn(t>e,"Short delay should be less than long delay!"),this.isMobile=xd()||Vd()}get(){return sw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Kh(n,e){tn(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Ba=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Vt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Vt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Vt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var aw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var cw=new dr(3e4,6e4);function Oe(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function He(n,e,t,r,i={}){return sg(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});let c=kr(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode),Ba.fetch()(og(n,n.config.apiHost,t,c),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},s))})}async function sg(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},aw),e);try{let i=new Ph(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw As(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let c=s.ok?o.errorMessage:o.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw As(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw As(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw As(n,"user-disabled",o);let p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw ig(n,p,h);At(n,p)}}catch(i){if(i instanceof ht)throw i;At(n,"network-request-failed",{message:String(i)})}}async function xn(n,e,t,r,i={}){let s=await He(n,e,t,r,i);return"mfaPendingCredential"in s&&At(n,"multi-factor-auth-required",{_serverResponse:s}),s}function og(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?Kh(n.config,i):`${n.config.apiScheme}://${i}`}function lw(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var Ph=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Lt(this.auth,"network-request-failed")),cw.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function As(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=Lt(n,e,r);return i.customData._tokenResponse=t,i}function Um(n){return n!==void 0&&n.enterprise!==void 0}var Ch=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return lw(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function uw(n,e){return He(n,"GET","/v2/recaptchaConfig",Oe(n,e))}async function hw(n,e){return He(n,"POST","/v1/accounts:delete",e)}async function ag(n,e){return He(n,"POST","/v1/accounts:lookup",e)}function Ss(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function cg(n,e=!1){let t=Te(n),r=await t.getIdToken(e),i=Hh(r);W(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Ss(Ah(i.auth_time)),issuedAtTime:Ss(Ah(i.iat)),expirationTime:Ss(Ah(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Ah(n){return Number(n)*1e3}function Hh(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return La("JWT malformed, contained fewer than 3 sections"),null;try{let i=Ac(t);return i?JSON.parse(i):(La("Failed to decode base64 JWT payload"),null)}catch(i){return La("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Bm(n){let e=Hh(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Ps(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ht&&dw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function dw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Dh=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Cs=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ss(this.lastLoginAt),this.creationTime=Ss(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function ja(n){var e;let t=n.auth,r=await n.getIdToken(),i=await Ps(n,ag(t,{idToken:r}));W(i?.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ug(s.providerUserInfo):[],c=fw(n.providerData,o),l=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!c?.length,p=l?h:!1,v={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Cs(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,v)}async function lg(n){let e=Te(n);await ja(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function fw(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ug(n){return n.map(e=>{var{providerId:t}=e,r=Oa(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function pw(n,e){let t=await sg(n,{},async()=>{let r=kr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=og(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Ba.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function mw(n,e){return He(n,"POST","/v2/accounts:revokeToken",Oe(n,e))}var Rs=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Bm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");let t=Bm(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await pw(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new n;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(W(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(W(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Vt("not implemented")}};function Nn(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var mi=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Oa(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Dh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Cs(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Ps(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return cg(this,e)}reload(){return lg(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ja(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(bt(this.auth.app))return Promise.reject(en(this.auth));let e=await this.getIdToken();return await Ps(this,hw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,c,l,h,p;let v=(r=t.displayName)!==null&&r!==void 0?r:void 0,S=(i=t.email)!==null&&i!==void 0?i:void 0,k=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,F=(o=t.photoURL)!==null&&o!==void 0?o:void 0,$=(c=t.tenantId)!==null&&c!==void 0?c:void 0,M=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,Z=(h=t.createdAt)!==null&&h!==void 0?h:void 0,J=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:B,emailVerified:ie,isAnonymous:le,providerData:ee,stsTokenManager:T}=t;W(B&&T,e,"internal-error");let I=Rs.fromJSON(this.name,T);W(typeof B=="string",e,"internal-error"),Nn(v,e.name),Nn(S,e.name),W(typeof ie=="boolean",e,"internal-error"),W(typeof le=="boolean",e,"internal-error"),Nn(k,e.name),Nn(F,e.name),Nn($,e.name),Nn(M,e.name),Nn(Z,e.name),Nn(J,e.name);let b=new n({uid:B,auth:e,email:S,emailVerified:ie,displayName:v,isAnonymous:le,photoURL:F,phoneNumber:k,tenantId:$,stsTokenManager:I,createdAt:Z,lastLoginAt:J});return ee&&Array.isArray(ee)&&(b.providerData=ee.map(R=>Object.assign({},R))),M&&(b._redirectEventId=M),b}static async _fromIdTokenResponse(e,t,r=!1){let i=new Rs;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ja(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];W(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?ug(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,c=new Rs;c.updateFromIdToken(r);let l=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Cs(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(l,h),l}};var jm=new Map;function Zt(n){tn(n instanceof Function,"Expected a class definition");let e=jm.get(n);return e?(tn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,jm.set(n,e),e)}var qa=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};qa.type="NONE";var kh=qa;function Ma(n,e,t){return`firebase:${n}:${e}:${t}`}var za=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=Ma(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ma("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?mi._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(Zt(kh),e,r);let i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h),s=i[0]||Zt(kh),o=Ma(r,e.config.apiKey,e.name),c=null;for(let h of t)try{let p=await h._get(o);if(p){let v=mi._fromJSON(e,p);h!==s&&(c=v),s=h;break}}catch{}let l=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new n(s,e,r):(s=l[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new n(s,e,r))}};function qm(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(fg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(hg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(mg(e))return"Blackberry";if(gg(e))return"Webos";if(Wh(e))return"Safari";if((e.includes("chrome/")||dg(e))&&!e.includes("edge/"))return"Chrome";if(pg(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function hg(n=Re()){return/firefox\//i.test(n)}function Wh(n=Re()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function dg(n=Re()){return/crios\//i.test(n)}function fg(n=Re()){return/iemobile/i.test(n)}function pg(n=Re()){return/android/i.test(n)}function mg(n=Re()){return/blackberry/i.test(n)}function gg(n=Re()){return/webos/i.test(n)}function lc(n=Re()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function gw(n=Re()){var e;return lc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function _w(){return Ld()&&document.documentMode===10}function _g(n=Re()){return lc(n)||pg(n)||gg(n)||mg(n)||/windows phone/i.test(n)||fg(n)}function yw(){try{return!!(window&&window!==window.top)}catch{return!1}}function yg(n,e=[]){let t;switch(n){case"Browser":t=qm(Re());break;case"Worker":t=`${qm(Re())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${mn}/${r}`}var Nh=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((o,c)=>{try{let l=e(s);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function vw(n,e={}){return He(n,"GET","/v2/passwordPolicy",Oe(n,e))}var ww=6,xh=class{constructor(e){var t,r,i,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:ww,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,c;let l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Oh=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ga(this),this.idTokenSubscription=new Ga(this),this.beforeStateQueue=new Nh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=rg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Zt(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await za.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await ag(this,{idToken:e}),r=await mi._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(bt(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&l?.user&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ja(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ow()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(bt(this.app))return Promise.reject(en(this));let t=e?Te(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return bt(this.app)?Promise.reject(en(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return bt(this.app)?Promise.reject(en(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Zt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await vw(this),t=new xh(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ht("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await mw(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Zt(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await za.create(this,[Zt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{let l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=yg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&rw(`Error while retrieving App Check token: ${t.error}`),t?.token}};function nn(n){return Te(n)}var Ga=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=$d(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var uc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Iw(n){uc=n}function vg(n){return uc.loadJS(n)}function Ew(){return uc.recaptchaEnterpriseScript}function bw(){return uc.gapiScript}function wg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var Tw="recaptcha-enterprise",Aw="NO_RECAPTCHA",Vh=class{constructor(e){this.type=Tw,this.auth=nn(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{uw(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let h=new Ch(l);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,o(h.siteKey)}}).catch(l=>{c(l)})})}function i(s,o,c){let l=window.grecaptcha;Um(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(h=>{o(h)}).catch(()=>{o(Aw)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(c=>{if(!t&&Um(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=Ew();l.length!==0&&(l+=c),vg(l).then(()=>{i(c,s,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}};async function zm(n,e,t,r=!1){let i=new Vh(n),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Ka(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await zm(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let o=await zm(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}function Ig(n,e){let t=Bi(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(hn(s,e??{}))return i;At(i,"already-initialized")}return t.initialize({options:e})}function Sw(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Zt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Eg(n,e,t){let r=nn(n);W(r._canInitEmulator,r,"emulator-config-failed"),W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!t?.disableWarnings,s=bg(e),{host:o,port:c}=Rw(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Pw()}function bg(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Rw(n){let e=bg(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:Gm(r.substr(s.length+1))}}else{let[s,o]=r.split(":");return{host:s,port:Gm(o)}}}function Gm(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Pw(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var fr=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Vt("not implemented")}_getIdTokenResponse(e){return Vt("not implemented")}_linkToIdToken(e,t){return Vt("not implemented")}_getReauthenticationResolver(e){return Vt("not implemented")}};async function Cw(n,e){return He(n,"POST","/v1/accounts:signUp",e)}async function Dw(n,e){return xn(n,"POST","/v1/accounts:signInWithPassword",Oe(n,e))}async function Tg(n,e){return He(n,"POST","/v1/accounts:sendOobCode",Oe(n,e))}async function kw(n,e){return Tg(n,e)}async function Nw(n,e){return Tg(n,e)}async function xw(n,e){return xn(n,"POST","/v1/accounts:signInWithEmailLink",Oe(n,e))}async function Ow(n,e){return xn(n,"POST","/v1/accounts:signInWithEmailLink",Oe(n,e))}var Ds=class n extends fr{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ka(e,t,"signInWithPassword",Dw);case"emailLink":return xw(e,{email:this._email,oobCode:this._password});default:At(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ka(e,r,"signUpPassword",Cw);case"emailLink":return Ow(e,{idToken:t,email:this._email,oobCode:this._password});default:At(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function pi(n,e){return xn(n,"POST","/v1/accounts:signInWithIdp",Oe(n,e))}var Vw="http://localhost",pr=class n extends fr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):At("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Oa(t,["providerId","signInMethod"]);if(!r||!i)return null;let o=new n(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return pi(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,pi(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,pi(e,t)}buildRequest(){let e={requestUri:Vw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=kr(t)}return e}};async function Lw(n,e){return He(n,"POST","/v1/accounts:sendVerificationCode",Oe(n,e))}async function Mw(n,e){return xn(n,"POST","/v1/accounts:signInWithPhoneNumber",Oe(n,e))}async function Fw(n,e){let t=await xn(n,"POST","/v1/accounts:signInWithPhoneNumber",Oe(n,e));if(t.temporaryProof)throw As(n,"account-exists-with-different-credential",t);return t}var $w={USER_NOT_FOUND:"user-not-found"};async function Uw(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return xn(n,"POST","/v1/accounts:signInWithPhoneNumber",Oe(n,t),$w)}var ks=class n extends fr{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Mw(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Fw(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Uw(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function Bw(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function jw(n){let e=Nr(xr(n)).link,t=e?Nr(xr(e)).deep_link_id:null,r=Nr(xr(n)).deep_link_id;return(r?Nr(xr(r)).link:null)||r||t||e||n}var Ha=class n{constructor(e){var t,r,i,s,o,c;let l=Nr(xr(e)),h=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,v=Bw((i=l.mode)!==null&&i!==void 0?i:null);W(h&&p&&v,"argument-error"),this.apiKey=h,this.operation=v,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=jw(e);try{return new n(t)}catch{return null}}};var mr=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Ds._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Ha.parseLink(t);return W(r,"argument-error"),Ds._fromEmailAndCode(e,r.code,r.tenantId)}};mr.PROVIDER_ID="password";mr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";mr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Wa=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var gr=class extends Wa{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Ns=class n extends gr{constructor(){super("facebook.com")}static credential(e){return pr._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Ns.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ns.PROVIDER_ID="facebook.com";var xs=class n extends gr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return pr._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};xs.GOOGLE_SIGN_IN_METHOD="google.com";xs.PROVIDER_ID="google.com";var Os=class n extends gr{constructor(){super("github.com")}static credential(e){return pr._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Os.GITHUB_SIGN_IN_METHOD="github.com";Os.PROVIDER_ID="github.com";var Vs=class n extends gr{constructor(){super("twitter.com")}static credential(e,t){return pr._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Vs.TWITTER_SIGN_IN_METHOD="twitter.com";Vs.PROVIDER_ID="twitter.com";async function qw(n,e){return xn(n,"POST","/v1/accounts:signUp",Oe(n,e))}var gi=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await mi._fromIdTokenResponse(e,r,i),o=Km(r);return new n({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=Km(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function Km(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Lh=class n extends ht{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function Ag(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Lh._fromErrorAndOperation(n,s,e,r):s})}async function zw(n,e,t=!1){let r=await Ps(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return gi._forOperation(n,"link",r)}async function Gw(n,e,t=!1){let{auth:r}=n;if(bt(r.app))return Promise.reject(en(r));let i="reauthenticate";try{let s=await Ps(n,Ag(r,i,e,n),t);W(s.idToken,r,"internal-error");let o=Hh(s.idToken);W(o,r,"internal-error");let{sub:c}=o;return W(n.uid===c,r,"user-mismatch"),gi._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&At(r,"user-mismatch"),s}}async function Sg(n,e,t=!1){if(bt(n.app))return Promise.reject(en(n));let r="signIn",i=await Ag(n,r,e),s=await gi._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Rg(n,e){return Sg(nn(n),e)}function Pg(n,e,t){var r;W(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),W(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(W(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(W(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}async function Cg(n){let e=nn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Qh(n,e,t){let r=nn(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Pg(r,i,t),await Ka(r,i,"getOobCode",Nw)}async function Yh(n,e,t){if(bt(n.app))return Promise.reject(en(n));let r=nn(n),o=await Ka(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",qw).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&Cg(n),l}),c=await gi._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function Jh(n,e,t){return bt(n.app)?Promise.reject(en(n)):Rg(Te(n),mr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Cg(n),r})}async function hc(n,e){let t=Te(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Pg(t.auth,i,e);let{email:s}=await kw(t.auth,i);s!==n.email&&await n.reload()}function Dg(n,e,t,r){return Te(n).onIdTokenChanged(e,t,r)}function kg(n,e,t){return Te(n).beforeAuthStateChanged(e,t)}function Xh(n,e,t,r){return Te(n).onAuthStateChanged(e,t,r)}function dc(n){return Te(n).signOut()}function Kw(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:start",Oe(n,e))}function Hw(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:finalize",Oe(n,e))}function Ww(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:start",Oe(n,e))}function Qw(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:finalize",Oe(n,e))}var Qa="__sak";var Ya=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Qa,"1"),this.storage.removeItem(Qa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function Yw(){let n=Re();return Wh(n)||lc(n)}var Jw=1e3,Xw=10,Ja=class extends Ya{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Yw()&&yw(),this.fallbackToPolling=_g(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}let r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}let i=()=>{let o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);_w()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Xw):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Jw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Ja.type="LOCAL";var Ng=Ja;var Xa=class extends Ya{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Xa.type="SESSION";var Zh=Xa;function Zw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Za=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(o).map(async h=>h(t.origin,s)),l=await Zw(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Za.receivers=[];function ed(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Mh=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,l)=>{let h=ed("",20);i.port1.start();let p=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(v){let S=v;if(S.data.eventId===h)switch(S.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(S.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function Mt(){return window}function eI(n){Mt().location.href=n}function xg(){return typeof Mt().WorkerGlobalScope<"u"&&typeof Mt().importScripts=="function"}async function tI(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function nI(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function rI(){return xg()?self:null}var Og="firebaseLocalStorageDb",iI=1,ec="firebaseLocalStorage",Vg="fbase_key",_r=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function fc(n,e){return n.transaction([ec],e?"readwrite":"readonly").objectStore(ec)}function sI(){let n=indexedDB.deleteDatabase(Og);return new _r(n).toPromise()}function Fh(){let n=indexedDB.open(Og,iI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(ec,{keyPath:Vg})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(ec)?e(r):(r.close(),await sI(),e(await Fh()))})})}async function Hm(n,e,t){let r=fc(n,!0).put({[Vg]:e,value:t});return new _r(r).toPromise()}async function oI(n,e){let t=fc(n,!1).get(e),r=await new _r(t).toPromise();return r===void 0?null:r.value}function Wm(n,e){let t=fc(n,!0).delete(e);return new _r(t).toPromise()}var aI=800,cI=3,tc=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Fh(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>cI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return xg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Za._getInstance(rI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await tI(),!this.activeServiceWorker)return;this.sender=new Mh(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||nI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Fh();return await Hm(e,Qa,"1"),await Wm(e,Qa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Hm(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>oI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Wm(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=fc(i,!1).getAll();return new _r(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),aI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};tc.type="LOCAL";var Lg=tc;function lI(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:start",Oe(n,e))}function uI(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:finalize",Oe(n,e))}function hI(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:finalize",Oe(n,e))}var JE=wg("rcb"),XE=new dr(3e4,6e4);var dI="recaptcha";async function fI(n,e,t){var r;let i=await t.verify();try{W(typeof i=="string",n,"argument-error"),W(t.type===dI,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let o=s.session;if("phoneNumber"in s)return W(o.type==="enroll",n,"internal-error"),(await Kw(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{W(o.type==="signin",n,"internal-error");let c=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return W(c,n,"missing-multi-factor-info"),(await lI(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await Lw(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}var Ls=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=nn(e)}verifyPhoneNumber(e,t){return fI(this.auth,e,Te(t))}static credential(e,t){return ks._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?ks._fromTokenResponse(t,r):null}};Ls.PROVIDER_ID="phone";Ls.PHONE_SIGN_IN_METHOD="phone";function pI(n,e){return e?Zt(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Ms=class extends fr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return pi(e,this._buildIdpRequest())}_linkToIdToken(e,t){return pi(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return pi(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function mI(n){return Sg(n.auth,new Ms(n),n.bypassAuthState)}function gI(n){let{auth:e,user:t}=n;return W(t,e,"internal-error"),Gw(t,new Ms(n),n.bypassAuthState)}async function _I(n){let{auth:e,user:t}=n;return W(t,e,"internal-error"),zw(t,new Ms(n),n.bypassAuthState)}var nc=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}let l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return mI;case"linkViaPopup":case"linkViaRedirect":return _I;case"reauthViaPopup":case"reauthViaRedirect":return gI;default:At(this.auth,"internal-error")}}resolve(e){tn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){tn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var yI=new dr(2e3,1e4);var $h=class n extends nc{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){tn(this.filter.length===1,"Popup operations only handle one event");let e=ed();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Lt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Lt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Lt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,yI.get())};e()}};$h.currentPopupAction=null;var vI="pendingRedirect",Fa=new Map,Uh=class extends nc{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Fa.get(this.auth._key());if(!e){try{let r=await wI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Fa.set(this.auth._key(),e)}return this.bypassAuthState||Fa.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function wI(n,e){let t=bI(e),r=EI(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function II(n,e){Fa.set(n._key(),e)}function EI(n){return Zt(n._redirectPersistence)}function bI(n){return Ma(vI,n.config.apiKey,n.name)}async function TI(n,e,t=!1){if(bt(n.app))return Promise.reject(en(n));let r=nn(n),i=pI(r,e),o=await new Uh(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var AI=10*60*1e3,Bh=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!SI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Mg(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Lt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=AI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Qm(e))}saveEventToCache(e){this.cachedEventUids.add(Qm(e)),this.lastProcessedEventTime=Date.now()}};function Qm(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Mg({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function SI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mg(n);default:return!1}}async function RI(n,e={}){return He(n,"GET","/v1/projects",e)}var PI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,CI=/^https?/;async function DI(n){if(n.config.emulator)return;let{authorizedDomains:e}=await RI(n);for(let t of e)try{if(kI(t))return}catch{}At(n,"unauthorized-domain")}function kI(n){let e=Rh(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!CI.test(t))return!1;if(PI.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var NI=new dr(3e4,6e4);function Ym(){let n=Mt().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function xI(n){return new Promise((e,t)=>{var r,i,s;function o(){Ym(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ym(),t(Lt(n,"network-request-failed"))},timeout:NI.get()})}if(!((i=(r=Mt().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Mt().gapi)===null||s===void 0)&&s.load)o();else{let c=wg("iframefcb");return Mt()[c]=()=>{gapi.load?o():t(Lt(n,"network-request-failed"))},vg(`${bw()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw $a=null,e})}var $a=null;function OI(n){return $a=$a||xI(n),$a}var VI=new dr(5e3,15e3),LI="__/auth/iframe",MI="emulator/auth/iframe",FI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},$I=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function UI(n){let e=n.config;W(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Kh(e,MI):`https://${n.config.authDomain}/${LI}`,r={apiKey:e.apiKey,appName:n.name,v:mn},i=$I.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${kr(r).slice(1)}`}async function BI(n){let e=await OI(n),t=Mt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:UI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:FI,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let o=Lt(n,"network-request-failed"),c=Mt().setTimeout(()=>{s(o)},VI.get());function l(){Mt().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(o)})}))}var jI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qI=500,zI=600,GI="_blank",KI="http://localhost",rc=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function HI(n,e,t,r=qI,i=zI){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",l=Object.assign(Object.assign({},jI),{width:r.toString(),height:i.toString(),top:s,left:o}),h=Re().toLowerCase();t&&(c=dg(h)?GI:t),hg(h)&&(e=e||KI,l.scrollbars="yes");let p=Object.entries(l).reduce((S,[k,F])=>`${S}${k}=${F},`,"");if(gw(h)&&c!=="_self")return WI(e||"",c),new rc(null);let v=window.open(e||"",c,p);W(v,n,"popup-blocked");try{v.focus()}catch{}return new rc(v)}function WI(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var QI="__/auth/handler",YI="emulator/auth/handler",JI=encodeURIComponent("fac");async function Jm(n,e,t,r,i,s){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:mn,eventId:i};if(e instanceof Wa){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Fd(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[p,v]of Object.entries(s||{}))o[p]=v}if(e instanceof gr){let p=e.getScopes().filter(v=>v!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);let c=o;for(let p of Object.keys(c))c[p]===void 0&&delete c[p];let l=await n._getAppCheckToken(),h=l?`#${JI}=${encodeURIComponent(l)}`:"";return`${XI(n)}?${kr(c).slice(1)}${h}`}function XI({config:n}){return n.emulator?Kh(n,YI):`https://${n.authDomain}/${QI}`}var Sh="webStorageSupport",jh=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zh,this._completeRedirectFn=TI,this._overrideRedirectResult=II}async _openPopup(e,t,r,i){var s;tn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await Jm(e,t,r,Rh(),i);return HI(e,o,ed())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await Jm(e,t,r,Rh(),i);return eI(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(tn(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await BI(e),r=new Bh(e);return t.register("authEvent",i=>(W(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Sh,{type:Sh},i=>{var s;let o=(s=i?.[0])===null||s===void 0?void 0:s[Sh];o!==void 0&&t(!!o),At(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=DI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return _g()||Wh()||lc()}},Fg=jh,ic=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Vt("unexpected MultiFactorSessionType")}}},qh=class n extends ic{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return Hw(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return uI(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},sc=class{constructor(){}static assertion(e){return qh._fromCredential(e)}};sc.FACTOR_ID="phone";var oc=class{static assertionForEnrollment(e,t){return ac._fromSecret(e,t)}static assertionForSignIn(e,t){return ac._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;W(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let i=await Ww(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return cc._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};oc.FACTOR_ID="totp";var ac=class n extends ic{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return W(typeof this.secret<"u",e,"argument-error"),Qw(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){W(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return hI(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},cc=class n{constructor(e,t,r,i,s,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(Va(e)||Va(t))&&(i=!0),i&&(Va(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),Va(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Va(n){return typeof n>"u"||n?.length===0}var Xm="@firebase/auth",Zm="1.7.4";var zh=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function ZI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function eE(n){pn(new _t("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:yg(n)},h=new Oh(r,i,s,l);return Sw(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),pn(new _t("auth-internal",e=>{let t=nn(e.getProvider("auth").getImmediate());return(r=>new zh(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Et(Xm,Zm,ZI(n)),Et(Xm,Zm,"esm2017")}var tE=5*60,nE=Rc("authIdTokenMaxAge")||tE,eg=null,rE=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>nE)return;let i=t?.token;eg!==i&&(eg=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function td(n=zc()){let e=Bi(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Ig(n,{popupRedirectResolver:Fg,persistence:[Lg,Ng,Zh]}),r=Rc("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let o=rE(s.toString());kg(t,o,()=>o(t.currentUser)),Dg(t,c=>o(c))}}let i=Nd("auth");return i&&Eg(t,`http://${i}`),t}function iE(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Iw({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=Lt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",iE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});eE("Browser");var nd={apiKey:"AIzaSyDRxvvqyyryi-5r6szyLPod7YkNv8WCXBA",authDomain:"destreza-legal-gestion.firebaseapp.com",projectId:"destreza-legal-gestion",storageBucket:"destreza-legal-gestion.firebasestorage.app",messagingSenderId:"901941872535",appId:"1:901941872535:web:0353d6583cfa8f9893e6d2"},On="abg.destrezalegal@gmail.com",rd="Sebasti\xE1n";(()=>{"use strict";let n={DL:"Destreza Legal",DYN:"Dynamis Jur\xEDdica",NOA:"Naranjo Ochoa Abogados"},e=["Civil","Comercial","Familia","Laboral","Penal","Administrativo","Tr\xE1mites Administrativos","Extinci\xF3n de Dominio","Propiedad Intelectual"],t=["Audiencia","Diligencia","T\xE9rmino","Reuni\xF3n","Tarea"],r=["Actuaci\xF3n","Auto / providencia","Memorial radicado","Audiencia","Comunicaci\xF3n con cliente","Nota interna"],i={casos:{},tareas:{},clientes:{},equipo:{responsables:["Sebasti\xE1n B.","Juan T."]},ready:{casos:!1,tareas:!1,clientes:!1},db:null,ro:!1,view:"panel",firm:"ALL",open:null,tab:"resumen",clientOpen:null,cf:{estado:"Abierto",area:"",resp:"",sort:"proxima"},af:{mode:"lista",tipo:"",resp:"",ver:"abiertas",month:null},meId:null,email:"",usuarios:{},online:navigator.onLine,pending:{},fromCache:!0,installEvt:null},s=null,o=null,c=null;try{let f=localStorage.getItem("dl.firm");f&&(f==="ALL"||n[f])&&(i.firm=f);let g=localStorage.getItem("dl.view");g&&(i.view=g)}catch{}let l=f=>document.querySelector(f),h=f=>String(f??"").replace(/[&<>"']/g,g=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[g]),p=f=>String(f).padStart(2,"0"),v=f=>`${f.getFullYear()}-${p(f.getMonth()+1)}-${p(f.getDate())}`,S=f=>{if(!f)return null;let[g,y,_]=f.split("-").map(Number);return new Date(g,y-1,_)},k=()=>v(new Date),F=(f,g)=>{let y=S(f);return y.setDate(y.getDate()+g),v(y)},$=(f,g)=>Math.round((S(f)-S(g))/864e5),M=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],Z=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],J=["domingo","lunes","martes","mi\xE9rcoles","jueves","viernes","s\xE1bado"],B=f=>{if(!f)return"\u2014";let g=S(f);return`${g.getDate()} ${M[g.getMonth()]} ${g.getFullYear()}`},ie=f=>{let g=S(f);return`${J[g.getDay()]} ${g.getDate()} de ${Z[g.getMonth()]} de ${g.getFullYear()}`},le=f=>{if(!f)return"";let[g,y]=f.split(":").map(Number),_=g>=12?"p. m.":"a. m.";return`${(g+11)%12+1}:${p(y)} ${_}`},ee=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}),T=f=>ee.format(Math.round(f||0)),I=f=>(f=f||0,Math.abs(f)>=1e6?"$"+(f/1e6).toLocaleString("es-CO",{maximumFractionDigits:1})+" M":T(f)),b=f=>{let g=String(f||"").replace(/\D/g,"");return g.length===23?[g.slice(0,5),g.slice(5,7),g.slice(7,9),g.slice(9,12),g.slice(12,16),g.slice(16,21),g.slice(21)].join("-"):f||""},R=f=>String(f||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),P=f=>R(f).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,50)||"cliente",C=()=>new Date().toISOString(),E=()=>Math.random().toString(36).slice(2,9);function _e(f){let g=document.createElement("div");g.className="toast",g.textContent=f,document.body.appendChild(g),setTimeout(()=>g.remove(),2600)}let rn={panel:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',casos:'<svg viewBox="0 0 24 24"><path d="M3 7h18v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12h18"/></svg>',agenda:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',clientes:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.9.8 3.1 2.6 3.5 5.2"/></svg>',finanzas:'<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',terminos:'<svg viewBox="0 0 24 24"><path d="M6 3h12M6 21h12M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9"/></svg>',ajustes:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>'},_i=[["panel","Panel"],["casos","Procesos"],["agenda","Agenda"],["clientes","Clientes"],["finanzas","Honorarios"],["terminos","T\xE9rminos"],["ajustes","Ajustes"]];function sn(f){let g=f%19,y=Math.floor(f/100),_=f%100,A=Math.floor(y/4),w=y%4,O=Math.floor((y+8)/25),G=Math.floor((y-O+1)/3),te=(19*g+y-A-G+15)%30,fe=Math.floor(_/4),ue=_%4,Le=(32+2*w+2*fe-te-ue)%7,et=Math.floor((g+11*te+22*Le)/451),ne=Math.floor((te+Le-7*et+114)/31),j=(te+Le-7*et+114)%31+1;return new Date(f,ne-1,j)}let Ft={};function $t(f){if(Ft[f])return Ft[f];let g={},y=(O,G)=>{g[v(O)]=G},_=O=>{let G=new Date(O);for(;G.getDay()!==1;)G.setDate(G.getDate()+1);return G};y(new Date(f,0,1),"A\xF1o Nuevo"),y(new Date(f,4,1),"D\xEDa del Trabajo"),y(new Date(f,6,20),"Independencia"),y(new Date(f,7,7),"Batalla de Boyac\xE1"),y(new Date(f,11,8),"Inmaculada Concepci\xF3n"),y(new Date(f,11,25),"Navidad"),[[0,6,"Reyes Magos"],[2,19,"San Jos\xE9"],[5,29,"San Pedro y San Pablo"],[7,15,"Asunci\xF3n de la Virgen"],[9,12,"D\xEDa de la Raza"],[10,1,"Todos los Santos"],[10,11,"Independencia de Cartagena"]].forEach(([O,G,te])=>y(_(new Date(f,O,G)),te));let A=sn(f),w=O=>{let G=new Date(A);return G.setDate(G.getDate()+O),G};return y(w(-3),"Jueves Santo"),y(w(-2),"Viernes Santo"),y(w(43),"Ascensi\xF3n del Se\xF1or"),y(w(64),"Corpus Christi"),y(w(71),"Sagrado Coraz\xF3n"),Ft[f]=g}let yr=f=>$t(+f.slice(0,4))[f]||null;function yi(f,g){let y=S(f),_=y.getDay();if(_===0)return"Domingo";if(_===6)return"S\xE1bado";let A=yr(f);if(A)return"Festivo: "+A;if(g.vacancia){let w=f.slice(5);if(w>="12-20"||w<="01-10")return"Vacancia judicial"}if(g.santa){let w=sn(y.getFullYear()),O=new Date(w);O.setDate(w.getDate()-6);let G=new Date(w);if(G.setDate(w.getDate()-4),y>=O&&y<=G)return"Semana Santa (vacancia)"}return null}function ot(f,g,y){let _=f,A=[],w=0;for(;w<g;){_=F(_,1);let O=yi(_,y);O?A.push([_,O]):w++}return{fecha:_,skipped:A}}let Ve=f=>i.firm==="ALL"||f.firma===i.firm,vr=()=>Object.entries(i.casos).map(([f,g])=>({id:f,...g})).filter(Ve),St=()=>Object.entries(i.tareas).map(([f,g])=>({id:f,...g})).filter(f=>Ve(f)),on=f=>(f.pagos||[]).reduce((g,y)=>g+(+y.valor||0),0),be=f=>Math.max(0,(f.honorarios?.pactados||0)-on(f)),at=f=>f.estado!=="Completada"&&f.estado!=="Cancelada",mt=f=>at(f)&&f.fecha&&f.fecha<k();function Vn(f){let g=Object.entries(i.tareas).map(([y,_])=>({id:y,..._})).filter(y=>y.casoId===f&&at(y));return g.sort((y,_)=>(y.fecha||"9999").localeCompare(_.fecha||"9999")||(y.hora||"").localeCompare(_.hora||"")),g[0]}function Ln(f){return(f.bitacora||[]).slice().sort((y,_)=>(_.fecha||"").localeCompare(y.fecha||""))[0]}let Fs=f=>f?`${f.codigo} \xB7 ${f.clienteNombre}`:"Sin caso",$s=f=>`<span class="chip firm"><i style="background:var(--f-${f})"></i></span>`,ct=f=>`<span class="chip firm mono" title="${h(n[f.firma])}"><i style="background:var(--f-${f.firma})"></i>${h(f.codigo)}</span>`;function an(f){if(!f)return"sin fecha";let g=$(f,k());return g===0?"hoy":g===1?"ma\xF1ana":g===-1?"ayer":g>0?`en ${g} d\xEDas`:`hace ${-g} d\xEDas`}let Mn=()=>{let f=new Set(i.equipo.responsables||[]);return Object.values(i.casos).forEach(g=>String(g.responsable||"").split(",").forEach(y=>y.trim()&&f.add(y.trim()))),[...f]};function vi(){let f=St().filter(mt).length,g=_i.map(([y,_])=>`<button data-act="nav" data-v="${y}" ${i.view===y?'aria-current="page"':""}>${rn[y]}<span>${_}</span>${y==="agenda"&&f?`<span class="badge num" title="Tareas vencidas">${f}</span>`:""}</button>`).join("");l("#nav").innerHTML=g,l("#mnav").innerHTML=_i.map(([y,_])=>`<button data-act="nav" data-v="${y}" ${i.view===y?'aria-current="page"':""}>${rn[y]}<span>${_.split(" ")[0]}</span></button>`).join(""),l("#firmSeg").innerHTML=[["ALL","Todas"],["DL","Destreza"],["DYN","Dynamis"],["NOA","NOA"]].map(([y,_])=>`<button data-act="firm" data-f="${y}" aria-pressed="${i.firm===y}">${y!=="ALL"?`<span class="dot" style="background:var(--f-${y})"></span>`:""}${_}</button>`).join(""),l("#btnNew").hidden=i.ro}function Ze(){vi();let f=_i.find(g=>g[0]===i.view)?i.view:"panel";if(!i.db){l("#content").innerHTML=Us();return}l("#content").innerHTML={panel:Ii,casos:bi,agenda:Fn,clientes:mc,finanzas:Si,terminos:Ks,ajustes:Ri}[f](),f==="terminos"&&Ir(),i.open?Ut():i.clientOpen&&Ai(),Ni()}function wi(){i.view==="terminos"?(vi(),i.open?Ut():i.clientOpen&&Ai()):Ze()}function Us(){let f=i.db===null;return`<div class="page-head"><div><h1>Destreza Legal</h1><p>${f?"Conectando con la base de datos de la firma\u2026":"La base de datos no est\xE1 disponible en esta vista."}</p></div></div>
  <div class="notice">${f?"Un momento.":"Revisa tu conexi\xF3n e intenta de nuevo."}</div>`}function Ii(){let f=vr(),g=St(),y=k(),_=F(y,7),A=f.filter(Q=>Q.estado==="Abierto"),w=g.filter(Q=>at(Q)&&(Q.tipo==="Audiencia"||Q.tipo==="Diligencia"||Q.tipo==="T\xE9rmino")&&Q.fecha>=y).sort((Q,pe)=>(Q.fecha+Q.hora).localeCompare(pe.fecha+pe.hora)),O=w.filter(Q=>Q.fecha<=_),G=g.filter(mt).sort((Q,pe)=>Q.fecha.localeCompare(pe.fecha)),te=f.reduce((Q,pe)=>Q+be(pe),0),fe=f.reduce((Q,pe)=>Q+on(pe),0),ue=new Date,Le=Object.entries($t(ue.getFullYear())).concat(Object.entries($t(ue.getFullYear()+1))).filter(([Q])=>Q>=y).sort()[0],et={};A.forEach(Q=>et[Q.area]=(et[Q.area]||0)+1);let ne=Object.entries(et).sort((Q,pe)=>pe[1]-Q[1]),j=Math.max(1,...ne.map(Q=>Q[1])),se={};g.filter(at).forEach(Q=>String(Q.responsable||"Sin asignar").split(",").forEach(pe=>{pe=pe.trim()||"Sin asignar",se[pe]=se[pe]||{n:0,l:0},se[pe].n++,mt(Q)&&se[pe].l++}));let lt=Object.entries(se).sort((Q,pe)=>pe[1].n-Q[1].n),Bn=Math.max(1,...lt.map(Q=>Q[1].n)),Rr=A.map(Q=>({c:Q,l:Ln(Q)})).filter(Q=>!Q.l||$(y,Q.l.fecha)>45).slice(0,6);return`
  <div class="page-head"><div><h1>${Bs()}</h1><p>${Ei(ie(y))}${Le?` \xB7 Pr\xF3ximo festivo: ${h(Le[1])}, ${B(Le[0])}`:""}</p></div></div>
  <div class="grid g-kpi">
    <button class="kpi" data-act="nav" data-v="casos"><span class="l">Procesos activos</span><span class="v">${A.length}</span><span class="s">${f.length-A.length} cerrados \xB7 ${new Set(A.map(Q=>Q.clienteId)).size} clientes</span></button>
    <button class="kpi" data-act="nav" data-v="agenda"><span class="l">Audiencias y t\xE9rminos \xB7 7 d\xEDas</span><span class="v">${O.length}</span><span class="s">${w.length} programados en total</span></button>
    <button class="kpi ${G.length?"alert":""}" data-act="agenda-late"><span class="l">Tareas vencidas</span><span class="v">${G.length}</span><span class="s">${g.filter(at).length} tareas abiertas</span></button>
    <button class="kpi" data-act="nav" data-v="finanzas"><span class="l">Cartera por cobrar</span><span class="v">${I(te)}</span><span class="s">Saldo de honorarios pactados</span></button>
    <button class="kpi" data-act="nav" data-v="finanzas"><span class="l">Honorarios recaudados</span><span class="v">${I(fe)}</span><span class="s">Acumulado registrado</span></button>
  </div>
  <div class="grid g-2">
    <section class="panel"><div class="panel-h"><h2>Pr\xF3ximas audiencias y t\xE9rminos</h2><button class="btn sm ghost more" data-act="nav" data-v="agenda">Ver agenda \u2192</button></div>
      <div class="panel-b">${w.slice(0,7).map(wr).join("")||'<div class="empty">No hay audiencias programadas.</div>'}</div></section>
    <section class="panel"><div class="panel-h"><h2>Requieren atenci\xF3n</h2><span class="chip p-Alta more">${G.length} vencidas</span></div>
      <div class="panel-b">${G.slice(0,6).map(wr).join("")||'<div class="empty">Todo al d\xEDa.</div>'}
      ${G.length>6?`<button class="btn sm" data-act="agenda-late" style="margin-top:8px">Ver las ${G.length}</button>`:""}</div></section>
  </div>
  <div class="grid g-3">
    <section class="panel"><div class="panel-h"><h2>Procesos activos por \xE1rea</h2></div><div class="panel-b bars">
      ${ne.map(([Q,pe])=>`<div class="bar-row" data-tip="${h(Q)}: ${pe} procesos"><span>${h(Q)}</span><div class="track"><div class="fill" style="width:${pe/j*100}%"></div></div><span class="n">${pe}</span></div>`).join("")||'<div class="empty">Sin datos</div>'}</div></section>
    <section class="panel"><div class="panel-h"><h2>Carga por responsable</h2></div><div class="panel-b bars">
      ${lt.map(([Q,pe])=>`<div class="bar-row" data-tip="${h(Q)}: ${pe.n} abiertas, ${pe.l} vencidas"><span>${h(Q)}</span><div class="track"><div class="fill" style="width:${pe.n/Bn*100}%"></div></div><span class="n">${pe.n}</span></div>`).join("")||'<div class="empty">Sin tareas</div>'}
      <p class="faint" style="margin:6px 0 0;font-size:12px">Tareas abiertas asignadas.</p></div></section>
    <section class="panel"><div class="panel-h"><h2>Sin actuaci\xF3n registrada &gt; 45 d\xEDas</h2></div><div class="panel-b">
      ${Rr.map(({c:Q,l:pe})=>`<div class="ev" style="grid-template-columns:1fr auto" data-act="open-case" data-id="${Q.id}"><div><div class="ev-t">${h(Q.clienteNombre)}</div><div class="ev-m">${ct(Q)}<span>${h(Q.titulo)}</span></div></div><span class="rel">${pe?an(pe.fecha):"sin bit\xE1cora"}</span></div>`).join("")||'<div class="empty">Todos los procesos tienen movimiento reciente.</div>'}</div></section>
  </div>`}let Bs=()=>{let f=new Date().getHours();return(f<12?"Buenos d\xEDas":f<19?"Buenas tardes":"Buenas noches")+(i.meName?", "+i.meName.split(" ")[0]:"")},Ei=f=>f.charAt(0).toUpperCase()+f.slice(1);function wr(f){let g=i.casos[f.casoId],y=k(),_=mt(f),A=!_&&f.fecha&&$(f.fecha,y)<=3,w=f.fecha?S(f.fecha):null;return`<div class="ev" data-act="open-case" data-id="${h(f.casoId)}" data-tab="agenda">
    <div class="when ${_?"late":A?"soon":""}">${w?`<b>${w.getDate()}</b><span>${M[w.getMonth()]}</span>`:"<b>\u2013</b><span>s/f</span>"}</div>
    <div><div class="ev-t">${h(f.titulo)}</div>
      <div class="ev-m"><span class="chip t-${h(f.tipo)}">${h(f.tipo)}</span>${g?ct({...g}):""}${g?`<span>${h(g.clienteNombre)}</span>`:""}${f.hora?`<span class="num">${le(f.hora)}</span>`:""}${f.lugar?`<span>${h(f.lugar)}</span>`:""}</div></div>
    <span class="rel ${_?"late":""}">${an(f.fecha)}</span></div>`}function bi(){let f=vr(),g=i.cf;g.estado&&(f=f.filter(w=>w.estado===g.estado)),g.area&&(f=f.filter(w=>w.area===g.area)),g.resp&&(f=f.filter(w=>String(w.responsable||"").includes(g.resp)));let y=f.map(w=>({c:w,nt:Vn(w.id),s:be(w)})),_={proxima:(w,O)=>(w.nt?.fecha||"9999").localeCompare(O.nt?.fecha||"9999"),codigo:(w,O)=>(w.c.firma+w.c.codigo).localeCompare(O.c.firma+O.c.codigo),cliente:(w,O)=>w.c.clienteNombre.localeCompare(O.c.clienteNombre),saldo:(w,O)=>O.s-w.s,inicio:(w,O)=>(O.c.fechaInicio||"").localeCompare(w.c.fechaInicio||"")};y.sort(_[g.sort]||_.proxima);let A=[...new Set(Object.values(i.casos).map(w=>w.area))].sort();return`
  <div class="page-head"><div><h1>Procesos</h1><p>${y.length} ${g.estado?g.estado.toLowerCase()+"s":""} \xB7 ${i.firm==="ALL"?"todas las firmas":n[i.firm]}</p></div>
    <div class="actions">${i.ro?"":'<button class="btn primary" data-act="new-case"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Nuevo proceso</button>'}</div></div>
  <div class="filters">
    <select class="f" id="cf-estado" aria-label="Estado"><option value="">Todos los estados</option>${["Abierto","Suspendido","Cerrado"].map(w=>`<option ${g.estado===w?"selected":""}>${w}</option>`).join("")}</select>
    <select class="f" id="cf-area" aria-label="\xC1rea"><option value="">Todas las \xE1reas</option>${A.map(w=>`<option ${g.area===w?"selected":""}>${h(w)}</option>`).join("")}</select>
    <select class="f" id="cf-resp" aria-label="Responsable"><option value="">Todos los responsables</option>${Mn().map(w=>`<option ${g.resp===w?"selected":""}>${h(w)}</option>`).join("")}</select>
    <select class="f" id="cf-sort" aria-label="Ordenar"><option value="proxima" ${g.sort==="proxima"?"selected":""}>Ordenar: pr\xF3xima actuaci\xF3n</option><option value="codigo" ${g.sort==="codigo"?"selected":""}>Ordenar: c\xF3digo</option><option value="cliente" ${g.sort==="cliente"?"selected":""}>Ordenar: cliente</option><option value="saldo" ${g.sort==="saldo"?"selected":""}>Ordenar: saldo por cobrar</option><option value="inicio" ${g.sort==="inicio"?"selected":""}>Ordenar: m\xE1s recientes</option></select>
  </div>
  <div class="panel tbl-wrap"><table class="tbl">
    <thead><tr><th>C\xF3digo</th><th>Cliente y asunto</th><th class="hide-m">\xC1rea</th><th class="hide-m">Despacho / radicado</th><th>Pr\xF3xima actuaci\xF3n</th><th class="r hide-m">Saldo</th><th class="hide-m">Estado</th></tr></thead>
    <tbody>${y.map(({c:w,nt:O,s:G})=>`<tr data-act="open-case" data-id="${w.id}">
      <td>${ct(w)}</td>
      <td><div class="cl">${h(w.clienteNombre)}</div><div class="sub">${h(w.titulo)}</div></td>
      <td class="hide-m">${h(w.area)}</td>
      <td class="hide-m"><div>${h(w.despacho||"\u2014")}</div>${w.radicado?`<div class="mono faint">${h(b(w.radicado))}</div>`:""}</td>
      <td>${O?`<div class="${mt(O)?"rel late":""}" style="text-align:left">${O.fecha?B(O.fecha):"Sin fecha"}</div><div class="sub">${h(O.titulo.slice(0,90))}${O.titulo.length>90?"\u2026":""}</div>`:'<span class="faint">\u2014</span>'}</td>
      <td class="r num hide-m">${G?T(G):'<span class="faint">\u2014</span>'}</td>
      <td class="hide-m"><span class="chip ${w.estado==="Abierto"?"st-open":"st-closed"}">${h(w.estado)}</span></td></tr>`).join("")||'<tr><td colspan="7"><div class="empty">No hay procesos con estos filtros.</div></td></tr>'}</tbody>
  </table></div>`}function Ut(){let f=i.casos[i.open];if(!f){Ae();return}let g=i.open,y=i.tab,_=[["resumen","Resumen"],["agenda","Agenda"],["bitacora","Bit\xE1cora"],["honorarios","Honorarios"]],A={resumen:Fe,agenda:Be,bitacora:js,honorarios:qs}[y](f,g);l("#layer").innerHTML=`<div class="scrim" data-act="close"></div>
  <aside class="drawer" role="dialog" aria-label="Proceso ${h(f.codigo)}">
    <div class="drawer-h"><div class="row"><div style="min-width:0">
      <div class="ev-m" style="margin:0">${ct(f)}<span class="chip ${f.estado==="Abierto"?"st-open":"st-closed"}">${h(f.estado)}</span><span>${h(f.area)}</span><span>\xB7 ${h(n[f.firma])}</span></div>
      <h3>${h(f.clienteNombre)}</h3><div class="muted">${h(f.titulo)}</div></div>
      <button class="x" data-act="close" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <div class="tabs" role="tablist">${_.map(([w,O])=>`<button role="tab" data-act="tab" data-t="${w}" aria-selected="${y===w}">${O}</button>`).join("")}</div>
    </div>
    <div class="drawer-b">${A}</div>
  </aside>`,Ni()}function Fe(f,g){let y=Vn(g),_=Ln(f);return`
  <div style="display:flex;gap:8px;flex-wrap:wrap">
    ${i.ro?"":`<button class="btn" data-act="edit-case" data-id="${g}"><svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>Editar datos</button>
    <button class="btn" data-act="new-event" data-case="${g}"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>Agendar</button>
    <button class="btn" data-act="new-bit" data-id="${g}"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Registrar actuaci\xF3n</button>`}
    <button class="btn" data-act="copy-ctx" data-id="${g}" title="Copia la ficha completa para pegarla en Claude"><svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>Copiar ficha para Claude</button>
    ${f.linkProceso?`<a class="btn" href="${h(f.linkProceso)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/></svg>Expediente digital</a>`:""}
  </div>
  ${y?`<div class="notice" style="border-left:3px solid ${mt(y)?"var(--danger)":"var(--accent)"}"><h2 style="margin-bottom:6px">Pr\xF3xima actuaci\xF3n \xB7 ${y.fecha?B(y.fecha)+(y.hora?" "+le(y.hora):""):"sin fecha"} <span class="${mt(y)?"rel late":"faint"}" style="text-transform:none;letter-spacing:0">(${an(y.fecha)})</span></h2><div>${h(y.titulo)}</div></div>`:""}
  <div class="panel panel-b kv">
    <div><span>Cliente</span><p><a href="#" data-act="open-client" data-id="${h(f.clienteId)}">${h(f.clienteNombre)}</a></p></div>
    <div><span>Contraparte</span><p>${h(f.contraparte||"\u2014")}</p></div>
    <div><span>Despacho / entidad</span><p>${h(f.despacho||"\u2014")}</p></div>
    <div><span>Radicado</span><p class="mono">${f.radicado?`${h(b(f.radicado))} <button class="btn sm ghost" data-act="copy" data-v="${h(f.radicado)}" title="Copiar radicado">Copiar</button>`:"\u2014"}</p></div>
    <div><span>Responsable</span><p>${h(f.responsable||"\u2014")}</p></div>
    <div><span>Fecha de inicio</span><p>${B(f.fechaInicio)}</p></div>
    <div><span>Etapa procesal</span><p>${h(f.etapa||"\u2014")}</p></div>
    <div><span>Referido por</span><p>${h(f.referido||"\u2014")}</p></div>
    <div class="wide"><span>Descripci\xF3n</span><p>${h(f.descripcion||"\u2014")}</p></div>
    <div class="wide"><span>Contactos del proceso</span><p>${h(f.contactos||"\u2014")}</p></div>
  </div>
  ${_?`<div><h2 style="margin-bottom:8px">\xDAltima actuaci\xF3n</h2><div class="tl"><div class="tl-i"><div class="d">${B(_.fecha)} <span class="chip">${h(_.tipo)}</span></div><p>${h(_.texto)}</p></div></div></div>`:""}`}function Be(f,g){let y=Object.entries(i.tareas).map(([_,A])=>({id:_,...A})).filter(_=>_.casoId===g).sort((_,A)=>at(A)-at(_)||(_.fecha||"9999").localeCompare(A.fecha||"9999"));return`${i.ro?"":`<div><button class="btn primary" data-act="new-event" data-case="${g}"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Nueva tarea o audiencia</button></div>`}
  <div class="panel panel-b">${y.map(Bt).join("")||'<div class="empty">Sin tareas ni audiencias para este proceso.</div>'}</div>`}function Bt(f,g){let y=i.casos[f.casoId],_=!at(f);return`<div class="task ${_?"done":""}">
    <input type="checkbox" class="check" data-act="toggle-task" data-id="${f.id}" ${_?"checked":""} ${i.ro?"disabled":""} aria-label="Marcar como completada">
    <div data-act="edit-event" data-id="${f.id}" style="cursor:pointer;min-width:0"><div class="ev-t">${h(f.titulo)}</div>
      <div class="ev-m"><span class="chip t-${h(f.tipo)}">${h(f.tipo)}</span><span class="chip p-${h(f.prioridad)}">${h(f.prioridad)}</span>
      ${g&&y?`${ct(y)}<a href="#" data-act="open-case" data-id="${h(f.casoId)}" data-tab="agenda">${h(y.clienteNombre)}</a>`:""}
      ${f.hora?`<span class="num">${le(f.hora)}</span>`:""}${f.lugar?`<span>${h(f.lugar)}</span>`:""}<span>${h(f.responsable||"")}</span></div></div>
    <span class="rel ${mt(f)?"late":""}">${f.fecha?B(f.fecha):"sin fecha"}<br><span class="faint">${_?h(f.estado):an(f.fecha)}</span></span></div>`}function js(f,g){let y=(f.bitacora||[]).slice().sort((_,A)=>(A.fecha||"").localeCompare(_.fecha||""));return`${i.ro?"":`<div><button class="btn primary" data-act="new-bit" data-id="${g}"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Registrar actuaci\xF3n</button></div>`}
  <div class="panel panel-b">${y.length?`<div class="tl">${y.map(_=>`<div class="tl-i"><div class="d"><b class="num">${B(_.fecha)}</b><span class="chip">${h(_.tipo)}</span>${_.autor?`<span class="faint" data-uid="${h(_.autor)}"></span>`:""}${i.ro?"":`<button class="btn sm ghost" data-act="del-bit" data-id="${g}" data-b="${h(_.id)}" style="margin-left:auto">Quitar</button>`}</div><p>${h(_.texto)}</p></div>`).join("")}</div>`:'<div class="empty">A\xFAn no hay actuaciones registradas.</div>'}</div>`}function qs(f,g){let y=f.honorarios||{},_=on(f),A=be(f),w=y.pactados||0,O=w?Math.min(100,_/w*100):0;return`<div style="display:flex;gap:8px;flex-wrap:wrap">${i.ro?"":`<button class="btn primary" data-act="new-pay" data-id="${g}"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Registrar pago</button><button class="btn" data-act="edit-fees" data-id="${g}">Editar acuerdo de honorarios</button>`}</div>
  <div class="money-grid">
    <div class="money"><span>Honorarios pactados</span><b>${T(w)}</b></div>
    <div class="money"><span>Recaudado</span><b style="color:var(--ok)">${T(_)}</b></div>
    <div class="money"><span>Saldo por cobrar</span><b style="color:${A?"var(--danger)":"inherit"}">${T(A)}</b></div>
  </div>
  <div class="progress" title="${O.toFixed(0)}% recaudado"><i style="width:${O}%"></i></div>
  <div class="panel panel-b kv">
    <div><span>Cuota litis</span><p>${y.porcentaje?(y.porcentaje*100).toLocaleString("es-CO",{maximumFractionDigits:1})+" %":"\u2014"}</p></div>
    <div><span>Prima de \xE9xito</span><p>${y.primaExito?T(y.primaExito):"\u2014"}</p></div>
    <div><span>Pr\xF3ximo cobro</span><p>${y.proximoCobroFecha?B(y.proximoCobroFecha):y.proximoCobroHito?"Al "+h(y.proximoCobroHito):"\u2014"}</p></div>
    <div><span>Valor pr\xF3ximo cobro</span><p>${y.valorProximo?T(y.valorProximo):"\u2014"}</p></div>
    ${y.notas?`<div class="wide"><span>Notas</span><p>${h(y.notas)}</p></div>`:""}
  </div>
  <div class="panel"><div class="panel-h"><h2>Pagos recibidos</h2></div><div class="panel-b">
    ${(f.pagos||[]).length?`<table class="tbl"><tbody>${f.pagos.map(G=>`<tr style="cursor:default"><td>${G.fecha?B(G.fecha):"\u2014"}</td><td>${h(G.concepto||"")}</td><td class="r num">${T(G.valor)}</td><td class="r">${i.ro?"":`<button class="btn sm ghost" data-act="del-pay" data-id="${g}" data-p="${h(G.id)}">Quitar</button>`}</td></tr>`).join("")}</tbody></table>`:'<div class="empty">Sin pagos registrados.</div>'}
  </div></div>`}function pc(f,g){let y=f.honorarios||{},_=Object.values(i.tareas).filter(w=>w.casoId===g).map(w=>`- [${w.estado}] ${w.tipo} ${w.fecha||"s/f"} ${w.hora||""}: ${w.titulo}`).join(`
`),A=(f.bitacora||[]).slice().sort((w,O)=>(O.fecha||"").localeCompare(w.fecha||"")).slice(0,15).map(w=>`- ${w.fecha} (${w.tipo}): ${w.texto}`).join(`
`);return`Fecha de hoy: ${k()}.
Proceso ${f.codigo} (${n[f.firma]}) \u2014 Estado: ${f.estado}
Cliente: ${f.clienteNombre}; Contraparte: ${f.contraparte||"no registrada"}
\xC1rea: ${f.area}; Asunto: ${f.titulo}. Descripci\xF3n: ${f.descripcion}
Despacho: ${f.despacho||"no registrado"}; Radicado: ${b(f.radicado)||"no registrado"}; Etapa: ${f.etapa||"no registrada"}
Responsable: ${f.responsable}; Inicio: ${f.fechaInicio||"s/f"}
Honorarios: pactados ${T(y.pactados)}, recaudado ${T(on(f))}, saldo ${T(be(f))}, cuota litis ${y.porcentaje?y.porcentaje*100+"%":"no"}, prima de \xE9xito ${y.primaExito?T(y.primaExito):"no"}
Bit\xE1cora (reciente primero):
${A||"(vac\xEDa)"}
Agenda del proceso:
${_||"(sin tareas)"}`}function Fn(){let f=i.af,g=St();return f.tipo&&(g=g.filter(_=>_.tipo===f.tipo)),f.resp&&(g=g.filter(_=>String(_.responsable||"").includes(f.resp))),`<div class="page-head"><div><h1>Agenda</h1><p>Audiencias, diligencias, t\xE9rminos y tareas de ${i.firm==="ALL"?"todas las firmas":n[i.firm]}</p></div>
    <div class="actions"><div class="seg"><button data-act="amode" data-m="lista" aria-pressed="${f.mode==="lista"}">Lista</button><button data-act="amode" data-m="mes" aria-pressed="${f.mode==="mes"}">Mes</button></div>
    ${i.ro?"":'<button class="btn primary" data-act="new-event"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Agendar</button>'}</div></div>
  <div class="filters">
    <select class="f" id="af-tipo" aria-label="Tipo"><option value="">Todos los tipos</option>${t.map(_=>`<option ${f.tipo===_?"selected":""}>${_}</option>`).join("")}</select>
    <select class="f" id="af-resp" aria-label="Responsable"><option value="">Todos los responsables</option>${Mn().map(_=>`<option ${f.resp===_?"selected":""}>${h(_)}</option>`).join("")}</select>
    ${f.mode==="lista"?`<select class="f" id="af-ver" aria-label="Mostrar"><option value="abiertas" ${f.ver==="abiertas"?"selected":""}>Abiertas</option><option value="vencidas" ${f.ver==="vencidas"?"selected":""}>Solo vencidas</option><option value="completadas" ${f.ver==="completadas"?"selected":""}>Completadas</option></select>`:""}
  </div>`+(f.mode==="mes"?Gs(g):zs(g))}function zs(f){let g=i.af,y=k(),_=F(y,7);return g.ver==="completadas"?(f=f.filter(w=>!at(w)).sort((w,O)=>(O.fecha||"").localeCompare(w.fecha||"")),`<div class="panel panel-b">${f.map(w=>Bt(w,!0)).join("")||'<div class="empty">Nada completado a\xFAn.</div>'}</div>`):(f=f.filter(at),g.ver==="vencidas"&&(f=f.filter(mt)),f.sort((w,O)=>((w.fecha||"9999")+(w.hora||"")).localeCompare((O.fecha||"9999")+(O.hora||""))),[["Vencidas",w=>w.fecha&&w.fecha<y,"var(--danger)"],["Hoy",w=>w.fecha===y,"var(--accent)"],["Pr\xF3ximos 7 d\xEDas",w=>w.fecha>y&&w.fecha<=_,"var(--ink)"],["M\xE1s adelante",w=>w.fecha>_,"var(--ink-2)"],["Sin fecha",w=>!w.fecha,"var(--ink-3)"]].map(([w,O,G])=>{let te=f.filter(O);return te.length?`<section class="panel"><div class="panel-h"><div class="group-h" style="margin:0"><span class="dot" style="background:${G}"></span><b style="color:${G}">${w}</b><span class="c num">${te.length}</span></div></div><div class="panel-b">${te.map(fe=>Bt(fe,!0)).join("")}</div></section>`:""}).join("")||'<div class="panel"><div class="empty">No hay pendientes con estos filtros.</div></div>')}function Gs(f){let g=i.af.month?S(i.af.month):new Date,y=g.getFullYear(),_=g.getMonth(),A=new Date(y,_,1),w=new Date(A);w.setDate(1-(A.getDay()+6)%7);let O=k(),G="";for(let te=0;te<42;te++){let fe=new Date(w);fe.setDate(w.getDate()+te);let ue=v(fe),Le=f.filter(ne=>ne.fecha===ue).sort((ne,j)=>(ne.hora||"").localeCompare(j.hora||"")),et=yr(ue);if(G+=`<div class="dc ${fe.getMonth()!==_?"out":""} ${ue===O?"today":""} ${et?"hol":""}" data-act="day" data-d="${ue}" title="${et?h(et):""}"><span class="dn">${fe.getDate()}</span>
      ${Le.slice(0,3).map(ne=>`<div class="it ${h(ne.tipo)} ${at(ne)?"":"done"}">${ne.hora?le(ne.hora).replace(" ","")+" ":""}${h((i.casos[ne.casoId]?.clienteNombre||"")+" \xB7 "+ne.titulo)}</div>`).join("")}${Le.length>3?`<span class="more">+${Le.length-3} m\xE1s</span>`:""}</div>`,te>=34&&fe.getMonth()!==_&&fe.getDay()===0)break}return`<div class="panel"><div class="panel-h"><button class="btn sm" data-act="cal-nav" data-n="-1" aria-label="Mes anterior">\u2190</button><h3 style="text-transform:capitalize">${Z[_]} ${y}</h3><button class="btn sm" data-act="cal-nav" data-n="1" aria-label="Mes siguiente">\u2192</button><button class="btn sm ghost more" data-act="cal-nav" data-n="0">Hoy</button></div>
  <div class="tbl-wrap"><div class="cal">${["Lun","Mar","Mi\xE9","Jue","Vie","S\xE1b","Dom"].map(te=>`<div class="dh">${te}</div>`).join("")}${G}</div></div></div>
  <p class="faint" style="margin:0;font-size:12px">Los d\xEDas en rojo son festivos en Colombia. Toca un d\xEDa para ver o agendar.</p>`}function Ti(f){let g=St().filter(_=>_.fecha===f),y=yr(f);je(`<div class="mh"><h3>${Ei(ie(f))}</h3><button class="x" data-act="close-modal" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div style="padding:4px 22px 20px">${y?`<p class="chip p-Alta">Festivo: ${h(y)}</p>`:""}${g.map(_=>Bt(_,!0)).join("")||'<div class="empty">Sin eventos.</div>'}
  ${i.ro?"":`<div style="margin-top:12px"><button class="btn primary" data-act="new-event" data-date="${f}">Agendar este d\xEDa</button></div>`}</div>`)}function mc(){let f=vr(),g={};f.forEach(_=>{let A=g[_.clienteId]=g[_.clienteId]||{n:0,open:0,s:0,firmas:new Set};A.n++,_.estado==="Abierto"&&A.open++,A.s+=be(_),A.firmas.add(_.firma)});let y=Object.entries(i.clientes).map(([_,A])=>({id:_,...A,st:g[_]})).filter(_=>i.firm==="ALL"?!0:_.st);return y.sort((_,A)=>(A.st?.open||0)-(_.st?.open||0)||_.nombre.localeCompare(A.nombre)),`<div class="page-head"><div><h1>Clientes</h1><p>${y.length} clientes \xB7 ${y.filter(_=>_.st?.open).length} con procesos activos</p></div>
  <div class="actions">${i.ro?"":'<button class="btn primary" data-act="new-client"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Nuevo cliente</button>'}</div></div>
  <div class="panel tbl-wrap"><table class="tbl"><thead><tr><th>Cliente</th><th class="hide-m">Contacto</th><th class="r">Activos</th><th class="r hide-m">Total</th><th class="r">Saldo</th></tr></thead><tbody>
  ${y.map(_=>`<tr data-act="open-client" data-id="${h(_.id)}"><td><div class="cl">${h(_.nombre)}</div><div class="ev-m">${[..._.st?.firmas||_.firmas||[]].map(A=>`<span class="chip"><span class="dot" style="background:var(--f-${A})"></span>${h(n[A]||A)}</span>`).join("")}<span>${h(_.tipo||"")}</span></div></td>
  <td class="hide-m">${h(_.telefono||"")}${_.email?`<div class="sub">${h(_.email)}</div>`:""}${!_.telefono&&!_.email?'<span class="faint">\u2014</span>':""}</td>
  <td class="r num">${_.st?.open||0}</td><td class="r num hide-m">${_.st?.n||0}</td><td class="r num">${_.st?.s?T(_.st.s):'<span class="faint">\u2014</span>'}</td></tr>`).join("")}
  </tbody></table></div>`}function Ai(){let f=i.clientes[i.clientOpen];if(!f){Ae();return}let g=Object.entries(i.casos).map(([y,_])=>({id:y,..._})).filter(y=>y.clienteId===i.clientOpen);l("#layer").innerHTML=`<div class="scrim" data-act="close"></div><aside class="drawer" role="dialog" aria-label="Cliente">
  <div class="drawer-h" style="padding-bottom:16px"><div class="row"><div><h2>Cliente \xB7 ${h(f.tipo||"")}</h2><h3>${h(f.nombre)}</h3></div><button class="x" data-act="close" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div></div>
  <div class="drawer-b">
    ${i.ro?"":`<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-act="edit-client" data-id="${h(i.clientOpen)}">Editar datos</button><button class="btn primary" data-act="new-case" data-client="${h(i.clientOpen)}">Nuevo proceso para este cliente</button></div>`}
    <div class="panel panel-b kv">
      <div><span>Documento</span><p>${h(f.documento||"\u2014")}</p></div><div><span>Tel\xE9fono</span><p>${f.telefono?`<a href="https://wa.me/57${h(String(f.telefono).replace(/\D/g,"").slice(-10))}" target="_blank" rel="noopener">${h(f.telefono)}</a>`:"\u2014"}</p></div>
      <div><span>Correo</span><p>${f.email?`<a href="mailto:${h(f.email)}">${h(f.email)}</a>`:"\u2014"}</p></div><div><span>Ciudad</span><p>${h(f.ciudad||"\u2014")}</p></div>
      ${f.notas?`<div class="wide"><span>Notas</span><p>${h(f.notas)}</p></div>`:""}
    </div>
    <div class="panel"><div class="panel-h"><h2>Procesos (${g.length})</h2></div><div class="panel-b">
    ${g.map(y=>`<div class="ev" style="grid-template-columns:1fr auto" data-act="open-case" data-id="${y.id}"><div><div class="ev-t">${h(y.titulo)}</div><div class="ev-m">${ct(y)}<span>${h(y.area)}</span><span class="chip ${y.estado==="Abierto"?"st-open":"st-closed"}">${h(y.estado)}</span></div></div><span class="rel num">${be(y)?T(be(y)):""}</span></div>`).join("")||'<div class="empty">Sin procesos.</div>'}</div></div>
  </div></aside>`}function Si(){let f=vr(),g=k(),y=f.reduce((j,se)=>j+(se.honorarios?.pactados||0),0),_=f.reduce((j,se)=>j+on(se),0),A=f.reduce((j,se)=>j+be(se),0),w=f.filter(j=>j.estado==="Abierto").reduce((j,se)=>j+(se.honorarios?.primaExito||0),0),O=f.filter(j=>j.estado==="Abierto"&&j.honorarios?.porcentaje>0).length,G=new Date,te=[];for(let j=0;j<12;j++){let se=new Date(G.getFullYear(),G.getMonth()+j,1);te.push({k:`${se.getFullYear()}-${p(se.getMonth()+1)}`,l:M[se.getMonth()]+(se.getMonth()===0||j===0?" "+String(se.getFullYear()).slice(2):""),v:0,items:[]})}let fe={v:0,items:[]};f.forEach(j=>{let se=j.honorarios||{};if(!se.proximoCobroFecha||!be(j))return;let lt=Math.min(se.valorProximo||be(j),be(j));if(se.proximoCobroFecha<g.slice(0,7)+"-01"){fe.v+=lt,fe.items.push(j.codigo);return}let Bn=te.find(Rr=>Rr.k===se.proximoCobroFecha.slice(0,7));Bn&&(Bn.v+=lt,Bn.items.push(j.codigo))});let ue=[{k:"venc",l:"Vencido",v:fe.v,items:fe.items},...te],Le=Math.max(1,...ue.map(j=>j.v)),et=f.filter(j=>be(j)&&!j.honorarios?.proximoCobroFecha),ne=f.filter(j=>be(j)).sort((j,se)=>be(se)-be(j));return`<div class="page-head"><div><h1>Honorarios y cartera</h1><p>${i.firm==="ALL"?"Todas las firmas":n[i.firm]}</p></div></div>
  <div class="grid g-kpi">
    <div class="kpi" style="cursor:default"><span class="l">Honorarios pactados</span><span class="v">${I(y)}</span><span class="s">${f.length} procesos</span></div>
    <div class="kpi" style="cursor:default"><span class="l">Recaudado</span><span class="v">${I(_)}</span><span class="s">${y?Math.round(_/y*100):0}% de lo pactado</span></div>
    <div class="kpi" style="cursor:default"><span class="l">Cartera por cobrar</span><span class="v">${I(A)}</span><span class="s">${ne.length} procesos con saldo</span></div>
    <div class="kpi" style="cursor:default"><span class="l">Primas de \xE9xito en juego</span><span class="v">${I(w)}</span><span class="s">Procesos activos</span></div>
    <div class="kpi" style="cursor:default"><span class="l">Con cuota litis</span><span class="v">${O}</span><span class="s">Procesos activos</span></div>
  </div>
  <section class="panel"><div class="panel-h"><h2>Cobros programados por mes</h2><span class="faint more" style="font-size:12px">Seg\xFAn fecha y valor del pr\xF3ximo cobro</span></div><div class="panel-b">
    <div class="cols">${ue.map(j=>`<div class="col" data-tip="${h(j.l)}: ${T(j.v)}${j.items.length?" \xB7 "+h(j.items.join(", ")):""}"><div class="c ${j.v?"":"zero"}" style="height:${j.v?Math.max(3,j.v/Le*100):2}%;${j.k==="venc"&&j.v?"background:var(--danger)":""}"></div>${j.v?`<span class="lab num" style="bottom:calc(${j.v/Le*100}% + 4px)">${I(j.v)}</span>`:""}</div>`).join("")}</div>
    <div class="col-x">${ue.map(j=>`<span>${j.l}</span>`).join("")}</div></div></section>
  <div class="grid g-2">
    <section class="panel"><div class="panel-h"><h2>Cartera por proceso</h2></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Proceso</th><th class="r">Saldo</th><th>Pr\xF3ximo cobro</th></tr></thead><tbody>
    ${ne.map(j=>{let se=j.honorarios||{},lt=se.proximoCobroFecha&&se.proximoCobroFecha<g;return`<tr data-act="open-case" data-id="${j.id}" data-tab="honorarios"><td>${ct(j)}<div class="cl">${h(j.clienteNombre)}</div></td><td class="r num">${T(be(j))}</td><td class="${lt?"rel late":""}" style="text-align:left">${se.proximoCobroFecha?B(se.proximoCobroFecha):se.proximoCobroHito?"Al "+h(se.proximoCobroHito):"Por definir"}${se.valorProximo?`<div class="sub num">${T(se.valorProximo)}</div>`:""}</td></tr>`}).join("")||'<tr><td colspan="3"><div class="empty">Sin cartera pendiente.</div></td></tr>'}</tbody></table></div></section>
    <section class="panel"><div class="panel-h"><h2>Cobros sujetos a un hito procesal</h2></div><div class="panel-b">
    ${et.map(j=>`<div class="ev" style="grid-template-columns:1fr auto" data-act="open-case" data-id="${j.id}" data-tab="honorarios"><div><div class="ev-t">${h(j.clienteNombre)}</div><div class="ev-m">${ct(j)}<span>${h(j.honorarios?.proximoCobroHito?"Al "+j.honorarios.proximoCobroHito:"Hito por definir")}</span></div></div><span class="rel num">${T(be(j))}</span></div>`).join("")||'<div class="empty">Ninguno.</div>'}</div></section>
  </div>`}function Ks(){let f=k(),g=+f.slice(0,4),y=[...Object.entries($t(g)),...Object.entries($t(g+1))].filter(([_])=>_>=f).sort().slice(0,8);return`<div class="page-head"><div><h1>Calculadora de t\xE9rminos</h1><p>D\xEDas h\xE1biles judiciales en Colombia: excluye fines de semana, festivos y vacancias.</p></div></div>
  <div class="grid g-2">
    <section class="panel"><div class="panel-b"><form id="tn" class="modal-form" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 14px" onsubmit="return false">
      <div class="fld"><label for="tn-f">Fecha de notificaci\xF3n o actuaci\xF3n</label><input type="date" id="tn-f" value="${f}"></div>
      <div class="fld"><label for="tn-n">T\xE9rmino</label><div style="display:flex;gap:6px"><input type="number" id="tn-n" value="10" min="1" max="999" style="width:90px"><select id="tn-u"><option value="h">d\xEDas h\xE1biles</option><option value="m">meses</option><option value="a">a\xF1os</option></select></div></div>
      <label class="fld wide" style="flex-direction:row;gap:8px;align-items:flex-start"><input type="checkbox" class="check" id="tn-e"><span>Notificaci\xF3n personal por mensaje de datos (Ley 2213 de 2022, art. 8): se entiende surtida al cabo de 2 d\xEDas h\xE1biles del env\xEDo.</span></label>
      <label class="fld wide" style="flex-direction:row;gap:8px;align-items:flex-start"><input type="checkbox" class="check" id="tn-v" checked><span>Excluir la vacancia judicial colectiva (20 de diciembre a 10 de enero).</span></label>
      <label class="fld wide" style="flex-direction:row;gap:8px;align-items:flex-start"><input type="checkbox" class="check" id="tn-s" checked><span>Excluir lunes a mi\xE9rcoles de Semana Santa.</span></label>
      <p class="faint wide" style="margin:0;font-size:12px">El t\xE9rmino empieza a correr el d\xEDa h\xE1bil siguiente a la notificaci\xF3n (CGP, art. 118). Los t\xE9rminos en meses o a\xF1os se cuentan en calendario y, si vencen en d\xEDa inh\xE1bil, se corren al siguiente h\xE1bil. Verifica suspensiones o cierres extraordinarios del despacho.</p>
    </form></div></section>
    <section class="panel"><div class="panel-b" id="tn-out"></div></section>
  </div>
  <section class="panel"><div class="panel-h"><h2>Pr\xF3ximos festivos</h2></div><div class="panel-b" style="display:flex;flex-wrap:wrap;gap:8px">${y.map(([_,A])=>`<span class="chip"><b class="num">${B(_)}</b> ${h(A)}</span>`).join("")}</div></section>`}function Ir(){let f=l("#tn-f")?.value,g=+(l("#tn-n")?.value||0),y=l("#tn-u")?.value;if(!f||!g){l("#tn-out").innerHTML='<div class="empty">Indica fecha y t\xE9rmino.</div>';return}let _={vacancia:l("#tn-v").checked,santa:l("#tn-s").checked},A=f,w=[];if(l("#tn-e").checked){let ue=ot(f,2,_);A=ue.fecha,w=w.concat(ue.skipped)}let O,G;if(y==="h"){let ue=ot(A,g,_);O=ue.fecha,w=w.concat(ue.skipped),G=ot(A,1,_).fecha}else{let ue=S(A);for(y==="m"?ue.setMonth(ue.getMonth()+g):ue.setFullYear(ue.getFullYear()+g),O=v(ue),G=ot(A,1,_).fecha;yi(O,_);)w.push([O,yi(O,_)]),O=F(O,1)}let te=$(O,k()),fe=w.filter(ue=>!/Sábado|Domingo/.test(ue[1]));l("#tn-out").innerHTML=`<h2>Vence</h2><div class="tn-result">${Ei(ie(O))}</div>
  <p class="${te<0?"rel late":"muted"}" style="text-align:left;margin:6px 0 14px">${te<0?`Venci\xF3 hace ${-te} d\xEDas`:te===0?"Vence hoy":`Faltan ${te} d\xEDas calendario`}</p>
  <div class="kv"><div><span>Notificaci\xF3n surtida</span><p>${B(A)}</p></div><div><span>Empieza a correr</span><p>${B(G)}</p></div>
  <div class="wide"><span>D\xEDas inh\xE1biles descontados (sin contar fines de semana)</span><p>${fe.length?fe.map(ue=>`${B(ue[0])} \u2014 ${h(ue[1])}`).join(`
`):"Ninguno"}</p></div></div>
  ${i.ro?"":`<div style="margin-top:14px"><button class="btn primary" data-act="new-event" data-date="${O}" data-tipo="T\xE9rmino">Agendar este vencimiento</button></div>`}`}let jt=()=>i.email===On||i.usuarios[i.email]?.rol==="admin",Er=f=>f===On?i.usuarios[f]?.nombre||rd:i.usuarios[f]?.nombre||String(f||"").split("@")[0];function Ri(){let f=Object.entries(i.usuarios).sort((y,_)=>y[0].localeCompare(_[0])),g=matchMedia("(display-mode: standalone)").matches||navigator.standalone;return`<div class="page-head"><div><h1>Ajustes</h1><p>Sesi\xF3n: ${h(i.email)} \xB7 ${jt()?"Administrador":h(i.usuarios[i.email]?.rol||"")}</p></div>
    <div class="actions"><button class="btn" data-act="logout">Cerrar sesi\xF3n</button></div></div>
  <div class="grid g-2">
    <section class="panel"><div class="panel-h"><h2>Instalar la app</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
      ${g?'<p style="margin:0">Est\xE1s usando la app instalada. \u2713</p>':'<p style="margin:0">Inst\xE1lala para abrirla como programa, con su propio \xEDcono y funcionando sin conexi\xF3n.</p><div><button class="btn primary" data-act="install">Instalar en este dispositivo</button></div>'}
      <p class="faint" style="margin:0;font-size:12.5px">iPhone: abre este enlace en Safari \u2192 bot\xF3n Compartir \u2192 \u201CAgregar a inicio\u201D. Windows: en Chrome o Edge, \xEDcono de instalar en la barra de direcciones.</p>
    </div></section>
    <section class="panel"><div class="panel-h"><h2>Estado de sincronizaci\xF3n</h2></div><div class="panel-b kv">
      <div><span>Conexi\xF3n</span><p>${i.online?"En l\xEDnea":"Sin conexi\xF3n"}</p></div>
      <div><span>Cambios pendientes por subir</span><p>${Object.values(i.pending).some(Boolean)?"S\xED \u2014 se enviar\xE1n al reconectar":"Ninguno"}</p></div>
      <div class="wide"><span>C\xF3mo funciona</span><p>Todo se guarda primero en este dispositivo y se sincroniza con la nube de la firma. Sin internet puedes consultar y editar; al volver la conexi\xF3n se env\xEDan los cambios.</p></div>
    </div></section>
  </div>
  <section class="panel"><div class="panel-h"><h2>Respaldo y exportaci\xF3n</h2></div><div class="panel-b" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
    <button class="btn" data-act="export">Exportar a Excel</button>
    <button class="btn" data-act="backup">Descargar respaldo (.json)</button>
    ${jt()?'<label class="btn" for="imp-file">Importar respaldo (.json)</label><input type="file" id="imp-file" accept="application/json,.json" hidden>':""}
    <span class="faint" style="font-size:12.5px">El respaldo incluye procesos, agenda, clientes y honorarios.</span>
  </div></section>
  ${jt()?`<section class="panel"><div class="panel-h"><h2>Usuarios con acceso</h2><button class="btn sm primary more" data-act="new-user">Agregar usuario</button></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Correo</th><th>Nombre</th><th>Rol</th><th></th></tr></thead><tbody>
    <tr style="cursor:default"><td>${h(On)}</td><td>${h(Er(On))}</td><td><span class="chip st-open">Propietario</span></td><td></td></tr>
    ${f.filter(([y])=>y!==On).map(([y,_])=>`<tr style="cursor:default"><td>${h(y)}</td><td>${h(_.nombre||"")}</td><td><span class="chip">${h(_.rol)}</span></td><td class="r"><button class="btn sm ghost" data-act="edit-user" data-id="${h(y)}">Editar</button></td></tr>`).join("")}
    </tbody></table></div><div class="panel-b faint" style="font-size:12.5px">Cada persona crea su cuenta en la pantalla de ingreso con el mismo correo que agregues aqu\xED y lo verifica. Roles: <b>admin</b> (todo, incluidos usuarios), <b>editor</b> (crea y edita), <b>lector</b> (solo consulta).</div></section>`:""}`}function Rt(f){let g=f?i.usuarios[f]:{rol:"editor"};je(`${gt(f?"Editar usuario":"Agregar usuario")}<form id="frm" data-kind="user" data-id="${h(f||"")}">
  ${oe("Correo","email",f||"","email",!0,f?"readonly":"required")}${oe("Nombre","nombre",g.nombre||"","text")}${it("Rol","rol",["admin","editor","lector"],g.rol)}${qt(f?"del-user":"")}</form>`)}function Pi(f,g,y){let _=g instanceof Blob?g:new Blob([g],{type:y}),A=document.createElement("a");A.href=URL.createObjectURL(_),A.download=f,document.body.appendChild(A),A.click(),setTimeout(()=>{URL.revokeObjectURL(A.href),A.remove()},1500)}function br(){let f={formato:"destreza-legal-respaldo",version:1,exportado:C(),casos:i.casos,tareas:i.tareas,clientes:i.clientes,config:{equipo:i.equipo}};Pi(`Respaldo_Destreza_Legal_${k()}.json`,JSON.stringify(f),"application/json"),_e("Respaldo descargado")}async function Hs(f){let g;try{g=JSON.parse(await f.text())}catch{_e("El archivo no es un respaldo v\xE1lido.");return}if(g.formato!=="destreza-legal-respaldo"){_e("El archivo no es un respaldo de Destreza Legal.");return}let y=["casos","tareas","clientes","config"],_=[];y.forEach(A=>Object.entries(g[A]||{}).forEach(([w,O])=>_.push([A,w,O]))),je(`${gt("Importar respaldo")}<div style="padding:4px 22px 22px;display:flex;flex-direction:column;gap:12px"><p style="margin:0">Se van a cargar <b>${Object.keys(g.casos||{}).length}</b> procesos, <b>${Object.keys(g.tareas||{}).length}</b> eventos de agenda y <b>${Object.keys(g.clientes||{}).length}</b> clientes. Los registros con el mismo c\xF3digo se reemplazan.</p><div class="form-actions"><button class="btn" data-act="close-modal">Cancelar</button><button class="btn primary" id="imp-go">Importar</button></div></div>`),l("#imp-go").onclick=async()=>{l("#imp-go").disabled=!0,l("#imp-go").textContent="Importando\u2026";try{for(let A=0;A<_.length;A+=400){let w=Fm(o);_.slice(A,A+400).forEach(([O,G,te])=>w.set(Ts(o,O,G),te)),await w.commit()}Ce(),_e(`Importados ${_.length} registros`)}catch(A){console.error(A),_e(A.code==="permission-denied"?"No tienes permiso para importar.":"No se pudo importar. Revisa la conexi\xF3n."),l("#imp-go").disabled=!1,l("#imp-go").textContent="Importar"}}}function je(f){l("#layer2").innerHTML=`<div class="scrim" data-act="close-modal" style="z-index:69"></div><div class="modal" role="dialog">${f}</div>`;let g=l("#layer2 input:not([type=hidden]),#layer2 select,#layer2 textarea");g&&g.focus()}function Ce(){l("#layer2").innerHTML=""}function Ae(){i.open=null,i.clientOpen=null,l("#layer").innerHTML=""}let Ws=(f,g)=>f.map(y=>`<option ${y===g?"selected":""}>${h(y)}</option>`).join(""),oe=(f,g,y,_="text",A,w="")=>`<div class="fld ${A?"wide":""}"><label for="f-${g}">${f}</label>${_==="textarea"?`<textarea id="f-${g}" name="${g}" ${w}>${h(y)}</textarea>`:`<input id="f-${g}" name="${g}" type="${_}" value="${h(y)}" ${w}>`}</div>`,it=(f,g,y,_,A,w="")=>`<div class="fld ${A?"wide":""}"><label for="f-${g}">${f}</label><select id="f-${g}" name="${g}" ${w}>${Ws(y,_)}</select></div>`,gt=f=>`<div class="mh"><h3>${f}</h3><button class="x" type="button" data-act="close-modal" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>`,qt=f=>`<div class="form-actions">${f?`<button type="button" class="btn ghost" data-act="${f}" style="margin-right:auto;color:var(--danger)">Eliminar</button>`:""}<button type="button" class="btn" data-act="close-modal">Cancelar</button><button class="btn primary" type="submit">Guardar</button></div>`,zt=f=>Object.fromEntries(new FormData(f).entries());function Qs(f,g){let y=f?i.casos[f]:{firma:i.firm==="ALL"?"DL":i.firm,estado:"Abierto",area:"Civil",fechaInicio:k(),responsable:"Sebasti\xE1n B.",clienteNombre:g?i.clientes[g]?.nombre:""};je(`${gt(f?"Editar proceso "+h(y.codigo):"Nuevo proceso")}<form id="frm" data-kind="case" data-id="${f||""}">
    <div class="fld"><label for="f-firma">Firma</label><select id="f-firma" name="firma" ${f?"disabled":""}>${Object.entries(n).map(([_,A])=>`<option value="${_}" ${y.firma===_?"selected":""}>${A}</option>`).join("")}</select></div>
    ${it("Estado","estado",["Abierto","Suspendido","Cerrado"],y.estado)}
    <div class="fld wide"><label for="f-cliente">Cliente</label><input id="f-cliente" name="cliente" list="dl-clientes" value="${h(y.clienteNombre||"")}" required placeholder="Escribe para buscar o crear"><datalist id="dl-clientes">${Object.values(i.clientes).map(_=>`<option value="${h(_.nombre)}">`).join("")}</datalist></div>
    ${oe("Asunto (t\xEDtulo corto)","titulo",y.titulo||"","text",!0,"required")}
    ${it("\xC1rea","area",e.includes(y.area)?e:[y.area,...e],y.area)}
    ${oe("Fecha de inicio","fechaInicio",y.fechaInicio||"","date")}
    ${oe("Despacho / entidad","despacho",y.despacho||"")}
    ${oe("Radicado","radicado",y.radicado||"","text",!1,'placeholder="23 d\xEDgitos" inputmode="numeric"')}
    ${oe("Contraparte","contraparte",y.contraparte||"")}
    ${oe("Etapa procesal","etapa",y.etapa||"","text",!1,'placeholder="Ej. Admisi\xF3n, pruebas, fallo"')}
    <div class="fld"><label for="f-responsable">Responsable</label><input id="f-responsable" name="responsable" list="dl-resp" value="${h(y.responsable||"")}"><datalist id="dl-resp">${Mn().map(_=>`<option value="${h(_)}">`).join("")}</datalist></div>
    ${oe("Referido por","referido",y.referido||"")}
    ${oe("Enlace al expediente digital","linkProceso",y.linkProceso||"","url",!0,'placeholder="https://"')}
    ${oe("Descripci\xF3n","descripcion",y.descripcion||"","textarea",!0)}
    ${oe("Contactos del proceso","contactos",y.contactos||"","textarea",!0,'style="min-height:60px"')}
    ${qt(f?"del-case":"")}</form>`)}function Ys(f,g={}){let y=f?i.tareas[f]:{tipo:g.tipo||"Audiencia",fecha:g.date||"",hora:"",prioridad:"Media",estado:"Programada",casoId:g.casoId||i.open||"",responsable:i.casos[g.casoId||i.open]?.responsable||"Sebasti\xE1n B."},_=Object.entries(i.casos).map(([A,w])=>({id:A,...w})).filter(A=>A.estado!=="Cerrado"||A.id===y.casoId).sort((A,w)=>(A.firma+A.codigo).localeCompare(w.firma+w.codigo));je(`${gt(f?"Editar evento":"Agendar")}<form id="frm" data-kind="event" data-id="${f||""}">
    <div class="fld wide"><label for="f-casoId">Proceso</label><select id="f-casoId" name="casoId" required><option value="">Selecciona\u2026</option>${_.map(A=>`<option value="${A.id}" ${A.id===y.casoId?"selected":""}>${h(A.codigo)} \xB7 ${h(A.clienteNombre)} \u2014 ${h(A.titulo.slice(0,50))}</option>`).join("")}</select></div>
    ${it("Tipo","tipo",t,y.tipo)}${it("Prioridad","prioridad",["Alta","Media","Baja"],y.prioridad)}
    ${oe("Descripci\xF3n","titulo",y.titulo||"","textarea",!0,'required style="min-height:64px"')}
    ${oe("Fecha","fecha",y.fecha||"","date")}${oe("Hora","hora",y.hora||"","time")}
    ${oe("Lugar o enlace","lugar",y.lugar||"","text",!0,'placeholder="Despacho, sala virtual, Teams\u2026"')}
    <div class="fld"><label for="f-responsable">Responsable</label><input id="f-responsable" name="responsable" list="dl-resp2" value="${h(y.responsable||"")}"><datalist id="dl-resp2">${Mn().map(A=>`<option value="${h(A)}">`).join("")}</datalist></div>
    ${it("Estado","estado",["Pendiente","Programada","Completada","Cancelada"],y.estado)}
    ${qt(f?"del-event":"")}</form>`)}function Tr(f){je(`${gt("Registrar actuaci\xF3n")}<form id="frm" data-kind="bit" data-id="${f}">${oe("Fecha","fecha",k(),"date")}${it("Tipo","tipo",r,"Actuaci\xF3n")}${oe("Detalle","texto","","textarea",!0,"required")}${qt()}</form>`)}function Js(f){let g=i.casos[f];je(`${gt("Registrar pago \xB7 "+h(g.codigo))}<form id="frm" data-kind="pay" data-id="${f}">${oe("Fecha","fecha",k(),"date")}${oe("Valor (COP)","valor",g.honorarios?.valorProximo||"","number",!1,'min="0" step="1000" required')}${oe("Concepto","concepto","Abono a honorarios","text",!0)}<label class="fld wide" style="flex-direction:row;gap:8px"><input type="checkbox" class="check" name="limpiar" checked><span>Marcar el pr\xF3ximo cobro como atendido (limpiar fecha y valor)</span></label>${qt()}</form>`)}function Ci(f){let g=i.casos[f].honorarios||{};je(`${gt("Acuerdo de honorarios")}<form id="frm" data-kind="fees" data-id="${f}">
  ${oe("Honorarios pactados (COP)","pactados",g.pactados||0,"number",!1,'min="0" step="1000"')}${oe("Cuota litis (%)","porcentaje",g.porcentaje?+(g.porcentaje*100).toFixed(2):0,"number",!1,'min="0" max="100" step="0.5"')}
  ${oe("Prima de \xE9xito (COP)","primaExito",g.primaExito||0,"number",!1,'min="0" step="1000"')}${oe("Valor pr\xF3ximo cobro (COP)","valorProximo",g.valorProximo||0,"number",!1,'min="0" step="1000"')}
  ${oe("Fecha pr\xF3ximo cobro","proximoCobroFecha",g.proximoCobroFecha||"","date")}${oe("\u2026o hito procesal","proximoCobroHito",g.proximoCobroHito||"","text",!1,'placeholder="Ej. auto admisorio"')}
  ${oe("Notas","notas",g.notas||"","textarea",!0)}${qt()}</form>`)}function $n(f){let g=f?i.clientes[f]:{tipo:"Natural",ciudad:"Medell\xEDn"};je(`${gt(f?"Editar cliente":"Nuevo cliente")}<form id="frm" data-kind="client" data-id="${f||""}">
  ${oe("Nombre o raz\xF3n social","nombre",g.nombre||"","text",!0,"required")}${it("Tipo de persona","tipo",["Natural","Jur\xEDdica"],g.tipo)}${oe("Documento (C.C. / NIT)","documento",g.documento||"")}
  ${oe("Tel\xE9fono","telefono",g.telefono||"","tel")}${oe("Correo","email",g.email||"","email")}${oe("Ciudad","ciudad",g.ciudad||"")}${oe("Notas","notas",g.notas||"","textarea",!0)}${qt()}</form>`)}async function ye(f,g){try{return await f(),g&&_e(g),!0}catch(y){return console.error(y),_e(y?.code==="permission-denied"?"No tienes permiso para guardar cambios.":"No se pudo guardar. Intenta de nuevo."),!1}}async function Xs(f){f=f.trim();let g=Object.entries(i.clientes).find(([,_])=>R(_.nombre)===R(f));if(g)return g[0];let y=P(f);return i.clientes[y]&&(y+="-"+E().slice(0,4)),await s.collection("clientes").doc(y).set({nombre:f,tipo:"Natural",documento:"",telefono:"",email:"",ciudad:"Medell\xEDn",notas:"",firmas:[],creado:C()}),y}function Zs(f){let g=f==="DL"?"CAS":f,y=0;Object.values(i.casos).filter(A=>A.firma===f).forEach(A=>{let w=parseInt(String(A.codigo).split("-")[1]);w>y&&(y=w)});let _=`${g}-${String(y+1).padStart(3,"0")}`;return{code:_,id:f==="DL"?`DL-${_}`:_}}async function Di(f){let g=f.dataset.kind,y=f.dataset.id,_=zt(f);if(g==="case"){let A=await Xs(_.cliente),w=i.clientes[A]?.nombre||_.cliente.trim(),O={clienteId:A,clienteNombre:w,titulo:_.titulo.trim(),descripcion:_.descripcion.trim(),area:_.area,radicado:_.radicado.replace(/\s/g,""),despacho:_.despacho.trim(),estado:_.estado,etapa:_.etapa.trim(),fechaInicio:_.fechaInicio,responsable:_.responsable.trim(),linkProceso:_.linkProceso.trim(),contactos:_.contactos.trim(),referido:_.referido.trim(),contraparte:_.contraparte.trim(),actualizado:C()};if(y)await ye(()=>s.collection("casos").doc(y).update(O),"Proceso actualizado")&&Ce();else{let G=_.firma||"DL",{code:te,id:fe}=Zs(G),ue={...O,codigo:te,firma:G,etiqueta:w,honorarios:{porcentaje:0,primaExito:0,pactados:0,proximoCobroFecha:"",proximoCobroHito:"",valorProximo:0,notas:""},pagos:[],bitacora:[{id:E(),fecha:k(),tipo:"Nota interna",texto:"Apertura del proceso en el sistema.",autor:i.email||""}],creado:C()};await ye(()=>s.collection("casos").doc(fe).set(ue),`Proceso ${te} creado`)&&(Ce(),i.clientOpen=null,i.open=fe,i.tab="resumen",Ze())}}if(g==="event"){let A=i.casos[_.casoId];if(!A){_e("Selecciona un proceso.");return}let w={casoId:_.casoId,firma:A.firma,tipo:_.tipo,titulo:_.titulo.trim(),fecha:_.fecha,hora:_.hora,lugar:_.lugar.trim(),responsable:_.responsable.trim(),prioridad:_.prioridad,estado:_.estado,completadoEn:_.estado==="Completada"?C():""};y?await ye(()=>s.collection("tareas").doc(y).update(w),"Evento actualizado")&&Ce():await ye(()=>s.collection("tareas").add({...w,creado:C()}),"Agendado")&&Ce()}if(g==="bit"){let w=[...i.casos[y].bitacora||[],{id:E(),fecha:_.fecha,tipo:_.tipo,texto:_.texto.trim(),autor:i.email||""}];await ye(()=>s.collection("casos").doc(y).update({bitacora:w,actualizado:C()}),"Actuaci\xF3n registrada")&&(Ce(),i.tab="bitacora",Ut())}if(g==="pay"){let A=i.casos[y],O={pagos:[...A.pagos||[],{id:E(),fecha:_.fecha,valor:+_.valor||0,concepto:_.concepto.trim()}],actualizado:C()};_.limpiar&&(O.honorarios={...A.honorarios||{},proximoCobroFecha:"",valorProximo:0}),await ye(()=>s.collection("casos").doc(y).update(O),"Pago registrado")&&Ce()}if(g==="fees"){let A={pactados:+_.pactados||0,porcentaje:(+_.porcentaje||0)/100,primaExito:+_.primaExito||0,valorProximo:+_.valorProximo||0,proximoCobroFecha:_.proximoCobroFecha,proximoCobroHito:_.proximoCobroHito.trim(),notas:_.notas.trim()};await ye(()=>s.collection("casos").doc(y).update({honorarios:A,actualizado:C()}),"Honorarios actualizados")&&Ce()}if(g==="user"){let A=(y||_.email).trim().toLowerCase();if(!A.includes("@")){_e("Correo no v\xE1lido");return}await ye(()=>s.collection("usuarios").doc(A).set({nombre:_.nombre.trim(),rol:_.rol,agregado:C()}),"Usuario guardado")&&Ce()}if(g==="client"){let A={nombre:_.nombre.trim(),tipo:_.tipo,documento:_.documento.trim(),telefono:_.telefono.trim(),email:_.email.trim(),ciudad:_.ciudad.trim(),notas:_.notas.trim()};if(y){let w=i.clientes[y].nombre!==A.nombre;if(await ye(()=>s.collection("clientes").doc(y).update(A),"Cliente actualizado")&&(Ce(),w))for(let[O,G]of Object.entries(i.casos))G.clienteId===y&&await ye(()=>s.collection("casos").doc(O).update({clienteNombre:A.nombre}))}else{let w=P(A.nombre);i.clientes[w]&&(w+="-"+E().slice(0,4)),await ye(()=>s.collection("clientes").doc(w).set({...A,firmas:[],creado:C()}),"Cliente creado")&&(Ce(),i.open=null,i.clientOpen=w,Ze())}}}async function ki(){let f;try{f=await import("./chunks/xlsx-RTKH2X3A.js")}catch{_e("Con\xE9ctate a internet una vez para habilitar la exportaci\xF3n a Excel.");return}let g=Object.entries(i.casos).map(([w,O])=>({id:w,...O})).sort((w,O)=>(w.firma+w.codigo).localeCompare(O.firma+O.codigo)),y=f.utils.book_new(),_=(w,O)=>f.utils.book_append_sheet(y,f.utils.json_to_sheet(O),w);_("1. Procesos",g.map(w=>({Firma:n[w.firma],"ID Caso":w.codigo,Cliente:w.clienteNombre,Asunto:w.titulo,\u00C1rea:w.area,Radicado:b(w.radicado),"Despacho / Entidad":w.despacho,Contraparte:w.contraparte,Estado:w.estado,Etapa:w.etapa,"Fecha de inicio":w.fechaInicio,Responsable:w.responsable,Descripci\u00F3n:w.descripcion,"Link del proceso":w.linkProceso,Contactos:w.contactos}))),_("2. Agenda y Tareas",Object.values(i.tareas).map(w=>({t:w,c:i.casos[w.casoId]||{}})).sort((w,O)=>(w.t.fecha||"9").localeCompare(O.t.fecha||"9")).map(({t:w,c:O})=>({Firma:n[w.firma],"ID Caso":O.codigo,Cliente:O.clienteNombre,Tipo:w.tipo,Descripci\u00F3n:w.titulo,Fecha:w.fecha,Hora:w.hora,Lugar:w.lugar,Responsable:w.responsable,Prioridad:w.prioridad,Estado:mt(w)?"Vencida":w.estado}))),_("3. Honorarios",g.map(w=>{let O=w.honorarios||{};return{Firma:n[w.firma],"ID Caso":w.codigo,Cliente:w.clienteNombre,"Cuota litis (%)":(O.porcentaje||0)*100,"Prima de \xE9xito":O.primaExito||0,"Honorarios pactados":O.pactados||0,Recaudado:on(w),"Saldo pendiente":be(w),"Pr\xF3ximo cobro":O.proximoCobroFecha||O.proximoCobroHito||"","Valor pr\xF3ximo cobro":O.valorProximo||0}})),_("4. Pagos",g.flatMap(w=>(w.pagos||[]).map(O=>({"ID Caso":w.codigo,Cliente:w.clienteNombre,Fecha:O.fecha,Valor:O.valor,Concepto:O.concepto})))),_("5. Bit\xE1cora",g.flatMap(w=>(w.bitacora||[]).map(O=>({"ID Caso":w.codigo,Cliente:w.clienteNombre,Fecha:O.fecha,Tipo:O.tipo,Detalle:O.texto})))),_("6. Clientes",Object.values(i.clientes).map(w=>({Nombre:w.nombre,Tipo:w.tipo,Documento:w.documento,Tel\u00E9fono:w.telefono,Correo:w.email,Ciudad:w.ciudad,Notas:w.notas})));let A=f.write(y,{bookType:"xlsx",type:"array"});Pi(`Destreza_Legal_Gestion_${k()}.xlsx`,new Blob([A],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})),_e("Excel descargado")}function eo(f){let g=l("#results");if(f=R(f).trim(),f.length<2){g.hidden=!0;return}let y=Object.entries(i.casos).map(([A,w])=>({id:A,...w})).filter(A=>R([A.codigo,A.clienteNombre,A.titulo,A.radicado,A.despacho,A.contraparte,A.etiqueta].join(" ")).includes(f)||String(A.radicado||"").includes(f.replace(/\D/g,"")||"~")).slice(0,8),_=Object.entries(i.clientes).filter(([,A])=>R(A.nombre+" "+A.documento+" "+A.telefono).includes(f)).slice(0,4);g.innerHTML=y.map(A=>`<button data-act="open-case" data-id="${A.id}"><div class="ev-m" style="margin:0">${ct(A)}<b style="color:var(--ink)">${h(A.clienteNombre)}</b></div><div class="faint" style="font-size:12.5px">${h(A.titulo)}${A.radicado?" \xB7 "+h(b(A.radicado)):""}</div></button>`).join("")+_.map(([A,w])=>`<button data-act="open-client" data-id="${h(A)}"><b>${h(w.nombre)}</b> <span class="faint">\xB7 cliente</span></button>`).join("")||'<div class="empty">Sin resultados</div>',g.hidden=!1}function Ni(){document.querySelectorAll("[data-uid]").forEach(f=>{let g=f.dataset.uid;f.textContent=g?"\xB7 "+Er(g):""})}document.addEventListener("click",async f=>{let g=f.target.closest("[data-act]");if(!g){f.target.closest(".search")||(l("#results").hidden=!0);return}let y=g.dataset.act,_=g.dataset.id;switch(g.tagName==="A"&&g.getAttribute("href")==="#"&&f.preventDefault(),y){case"nav":i.view=g.dataset.v,Ae();try{localStorage.setItem("dl.view",i.view)}catch{}Ze(),window.scrollTo(0,0);break;case"firm":i.firm=g.dataset.f;try{localStorage.setItem("dl.firm",i.firm)}catch{}Ze();break;case"agenda-late":i.view="agenda",i.af.mode="lista",i.af.ver="vencidas",Ae(),Ze();break;case"open-case":f.stopPropagation(),l("#results").hidden=!0,i.clientOpen=null,i.open=_,i.tab=g.dataset.tab||"resumen",Ce(),Ut();break;case"open-client":l("#results").hidden=!0,i.open=null,i.clientOpen=_,Ce(),Ai();break;case"close":Ae();break;case"tab":i.tab=g.dataset.t,Ut();break;case"close-modal":Ce();break;case"new-menu":je(`${gt("Crear")}<div style="padding:4px 22px 22px;display:grid;gap:8px"><button class="btn" data-act="new-case">Nuevo proceso</button><button class="btn" data-act="new-event">Agendar audiencia, t\xE9rmino o tarea</button><button class="btn" data-act="new-client">Nuevo cliente</button></div>`);break;case"new-case":Qs(null,g.dataset.client);break;case"edit-case":Qs(_);break;case"new-event":Ys(null,{casoId:g.dataset.case,date:g.dataset.date,tipo:g.dataset.tipo});break;case"edit-event":i.ro||Ys(_);break;case"new-bit":Tr(_);break;case"new-pay":Js(_);break;case"edit-fees":Ci(_);break;case"new-client":$n(null);break;case"edit-client":$n(_);break;case"toggle-task":{let A=i.tareas[_],w=g.checked;await ye(()=>s.collection("tareas").doc(_).update({estado:w?"Completada":"Pendiente",completadoEn:w?C():""}),w?"Tarea completada":"Tarea reabierta");break}case"del-event":case"del-case":{if(g.dataset.confirm!=="1"){g.dataset.confirm="1",g.textContent="\xBFSeguro? Toca otra vez para eliminar";return}let w=l("#frm").dataset.id;if(y==="del-event")await ye(()=>s.collection("tareas").doc(w).delete(),"Evento eliminado")&&Ce();else if(await ye(()=>s.collection("casos").doc(w).delete(),"Proceso eliminado")){for(let[O,G]of Object.entries(i.tareas))G.casoId===w&&await ye(()=>s.collection("tareas").doc(O).delete());Ce(),Ae(),Ze()}break}case"del-bit":{let A=i.casos[_];await ye(()=>s.collection("casos").doc(_).update({bitacora:(A.bitacora||[]).filter(w=>w.id!==g.dataset.b)}),"Actuaci\xF3n quitada");break}case"del-pay":{let A=i.casos[_];await ye(()=>s.collection("casos").doc(_).update({pagos:(A.pagos||[]).filter(w=>w.id!==g.dataset.p)}),"Pago quitado");break}case"copy":try{await navigator.clipboard.writeText(g.dataset.v),_e("Copiado")}catch{_e("No se pudo copiar")}break;case"amode":i.af.mode=g.dataset.m,Ze();break;case"cal-nav":{let A=+g.dataset.n,w=i.af.month?S(i.af.month):new Date,O=A===0?new Date:new Date(w.getFullYear(),w.getMonth()+A,1);i.af.month=v(new Date(O.getFullYear(),O.getMonth(),1)),Ze();break}case"day":Ti(g.dataset.d);break;case"export":ki();break;case"copy-ctx":try{await navigator.clipboard.writeText(pc(i.casos[_],_)),_e("Ficha copiada: p\xE9gala en Claude")}catch{_e("No se pudo copiar")}break;case"logout":await dc(c),location.reload();break;case"install":ro();break;case"backup":br();break;case"new-user":Rt(null);break;case"edit-user":Rt(_);break;case"del-user":{if(g.dataset.confirm!=="1"){g.dataset.confirm="1",g.textContent="\xBFSeguro? Toca otra vez";return}let A=l("#frm").dataset.id;await ye(()=>s.collection("usuarios").doc(A).delete(),"Usuario retirado")&&Ce();break}case"update-app":i.swWaiting?.postMessage("SKIP_WAITING");break}}),document.addEventListener("change",f=>{let g=f.target,y={"cf-estado":["cf","estado"],"cf-area":["cf","area"],"cf-resp":["cf","resp"],"cf-sort":["cf","sort"],"af-tipo":["af","tipo"],"af-resp":["af","resp"],"af-ver":["af","ver"]};if(y[g.id]){let[_,A]=y[g.id];i[_][A]=g.value,Ze()}g.closest("#tn")&&Ir(),g.id==="imp-file"&&g.files[0]&&Hs(g.files[0])}),document.addEventListener("input",f=>{f.target.id==="q"&&eo(f.target.value),f.target.closest("#tn")&&Ir()}),document.addEventListener("submit",f=>{f.target.id==="frm"&&(f.preventDefault(),Di(f.target))}),document.addEventListener("keydown",f=>{if(f.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&(f.preventDefault(),l("#q").focus()),f.key==="Escape"&&(l("#layer2").innerHTML?Ce():(i.open||i.clientOpen)&&Ae(),l("#results").hidden=!0),f.key==="Enter"&&f.target.id==="q"){let g=l("#results button");g&&g.click()}}),document.addEventListener("mouseover",f=>{let g=f.target.closest("[data-tip]"),y=l("#tip");if(!g){y.hidden=!0;return}y.textContent=g.dataset.tip,y.hidden=!1}),document.addEventListener("mousemove",f=>{let g=l("#tip");g.hidden||(g.style.left=Math.min(f.clientX+12,innerWidth-270)+"px",g.style.top=f.clientY+14+"px")});let id=!1;function Gt(f){let g=!1;return f.then(()=>{},y=>{console.error(y),g&&_e(y?.code==="permission-denied"?"Un cambio fue rechazado: no tienes permiso.":"Un cambio no se pudo sincronizar.")}),Promise.race([f,new Promise(y=>setTimeout(y,450))]).finally(()=>{g=!0})}let Ar=f=>({...f,actualizadoPor:i.email||""});function xi(){let f=y=>({docs:y.docs.map(_=>({id:_.id,exists:!0,data:()=>_.data()})),metadata:y.metadata}),g=y=>{let _=Ts(o,y);return{set:A=>Gt(bh(_,Ar(A))),update:A=>Gt(Om(_,Ar(A))),delete:()=>Gt(Vm(_)),onSnapshot:(A,w)=>Th(_,{includeMetadataChanges:!0},O=>A({exists:O.exists(),data:()=>O.data(),metadata:O.metadata}),w)}};return{doc:g,collection:y=>({doc:_=>g(`${y}/${_||Ts(ka(o,y)).id}`),add:_=>{let A=Ts(ka(o,y));return Gt(bh(A,Ar(_))).then(()=>A)},onSnapshot:(_,A)=>Th(ka(o,y),{includeMetadataChanges:!0},w=>_(f(w)),A)})}}function qe(f,g=""){let y=A=>`<div class="auth"><div class="auth-card"><div class="brand-lg"><div class="seal lg">DL</div><b>Destreza Legal</b><span>Abogados \xB7 Gesti\xF3n</span></div>${A}</div></div>`,_="";(f==="login"||f==="signup")&&(_=y(`<h3>${f==="login"?"Ingresar":"Crear mi acceso"}</h3>
    ${f==="signup"?'<p class="muted" style="margin:0">Usa el correo que el administrador de la firma autoriz\xF3.</p>':""}
    <form id="authf" data-mode="${f}" class="auth-form">
      <div class="fld"><label for="a-email">Correo</label><input id="a-email" name="email" type="email" autocomplete="email" required></div>
      <div class="fld"><label for="a-pass">Contrase\xF1a</label><input id="a-pass" name="pass" type="password" autocomplete="${f==="login"?"current-password":"new-password"}" minlength="8" required></div>
      ${g?`<p class="auth-msg">${h(g)}</p>`:""}
      <button class="btn primary" type="submit" style="justify-content:center">${f==="login"?"Ingresar":"Crear acceso"}</button>
    </form>
    <div class="auth-links">${f==="login"?'<a href="#" data-auth="signup">Crear mi acceso</a><a href="#" data-auth="reset">Olvid\xE9 mi contrase\xF1a</a>':'<a href="#" data-auth="login">Ya tengo acceso</a>'}</div>`)),f==="verify"&&(_=y(`<h3>Verifica tu correo</h3><p class="muted" style="margin:0">Enviamos un enlace de verificaci\xF3n a <b>${h(c.currentUser?.email)}</b>. \xC1brelo y luego vuelve aqu\xED.</p>${g?`<p class="auth-msg">${h(g)}</p>`:""}
    <button class="btn primary" data-auth="checkverify" style="justify-content:center">Ya lo verifiqu\xE9</button><div class="auth-links"><a href="#" data-auth="resend">Reenviar correo</a><a href="#" data-auth="logout">Salir</a></div>`)),f==="denied"&&(_=y(`<h3>Sin acceso</h3><p class="muted" style="margin:0">La cuenta <b>${h(c.currentUser?.email)}</b> a\xFAn no est\xE1 autorizada. Pide al administrador de la firma que te agregue en Ajustes \u2192 Usuarios.</p><div class="auth-links"><a href="#" data-auth="retry">Reintentar</a><a href="#" data-auth="logout">Salir</a></div>`)),l("#auth").innerHTML=_,l("#auth").hidden=!1}let wt=f=>({"auth/invalid-credential":"Correo o contrase\xF1a incorrectos.","auth/wrong-password":"Correo o contrase\xF1a incorrectos.","auth/user-not-found":"No existe una cuenta con ese correo.","auth/email-already-in-use":"Ese correo ya tiene acceso: usa Ingresar.","auth/weak-password":"La contrase\xF1a debe tener al menos 8 caracteres.","auth/network-request-failed":"Sin conexi\xF3n. Con\xE9ctate para ingresar la primera vez.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos."})[f]||"No se pudo completar. Intenta de nuevo.";document.addEventListener("submit",async f=>{if(f.target.id!=="authf")return;f.preventDefault();let g=f.target,y=zt(g),_=g.querySelector("button[type=submit]");_.disabled=!0;try{if(g.dataset.mode==="login")await Jh(c,y.email.trim(),y.pass);else{let A=await Yh(c,y.email.trim(),y.pass);await hc(A.user)}}catch(A){qe(g.dataset.mode,wt(A.code))}}),document.addEventListener("click",async f=>{let g=f.target.closest("[data-auth]");if(!g)return;f.preventDefault();let y=g.dataset.auth;if((y==="login"||y==="signup")&&qe(y),y==="reset"){let _=l("#a-email")?.value.trim();if(!_){qe("login","Escribe tu correo y vuelve a tocar \u201COlvid\xE9 mi contrase\xF1a\u201D.");return}try{await Qh(c,_),qe("login","Te enviamos un correo para restablecer la contrase\xF1a.")}catch(A){qe("login",wt(A.code))}}if(y==="resend")try{await hc(c.currentUser),qe("verify","Correo reenviado.")}catch(_){qe("verify",wt(_.code))}y==="checkverify"&&(await c.currentUser.reload(),await c.currentUser.getIdToken(!0),c.currentUser.emailVerified?Sr(c.currentUser):qe("verify","A\xFAn no aparece verificado. Abre el enlace del correo.")),y==="logout"&&(await dc(c),location.reload()),y==="retry"&&location.reload()});function cn(){let f=l("#sync");if(!f)return;let g=Object.values(i.pending).some(Boolean),[y,_]=i.online?g?["pend","Sincronizando\u2026"]:["ok","Sincronizado"]:["off",g?"Sin conexi\xF3n \xB7 cambios en espera":"Sin conexi\xF3n"];f.className="sync "+y,f.textContent=_,f.title=i.online?"":"Puedes seguir trabajando: los cambios se enviar\xE1n al reconectar."}addEventListener("online",()=>{i.online=!0,cn()}),addEventListener("offline",()=>{i.online=!1,cn()}),addEventListener("beforeinstallprompt",f=>{f.preventDefault(),i.installEvt=f,l("#btnInstall").hidden=!1}),addEventListener("appinstalled",()=>{l("#btnInstall").hidden=!0,_e("App instalada")});let to=/iphone|ipad|ipod/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,no=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0;async function ro(){if(i.installEvt){i.installEvt.prompt(),await i.installEvt.userChoice,i.installEvt=null,l("#btnInstall").hidden=!0;return}je(`${gt("Instalar la app")}<div style="padding:4px 22px 22px;display:flex;flex-direction:column;gap:10px">${to?`
    <p style="margin:0"><b>En iPhone o iPad:</b></p><ol style="margin:0;padding-left:20px;line-height:1.7"><li>Abre esta p\xE1gina en <b>Safari</b>.</li><li>Toca el bot\xF3n <b>Compartir</b> (cuadro con flecha hacia arriba).</li><li>Elige <b>\u201CAgregar a inicio\u201D</b> y confirma.</li></ol>`:`
    <p style="margin:0"><b>En Windows o Android:</b> abre esta p\xE1gina en Chrome o Edge y toca el \xEDcono de <b>instalar</b> en la barra de direcciones (o men\xFA \u22EE \u2192 \u201CInstalar Destreza Legal\u201D).</p>`}
    <p class="faint" style="margin:0;font-size:12.5px">Quedar\xE1 un \xEDcono de Destreza Legal en tu pantalla y la app abrir\xE1 en su propia ventana, incluso sin conexi\xF3n.</p></div>`)}if("serviceWorker"in navigator){navigator.serviceWorker.register("./sw.js").then(g=>{let y=_=>_&&_.addEventListener("statechange",()=>{_.state==="installed"&&navigator.serviceWorker.controller&&(i.swWaiting=_,l("#btnUpdate").hidden=!1)});g.waiting&&navigator.serviceWorker.controller&&(i.swWaiting=g.waiting,l("#btnUpdate").hidden=!1),g.addEventListener("updatefound",()=>y(g.installing)),setInterval(()=>g.update().catch(()=>{}),60*60*1e3)}).catch(()=>{});let f=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{f||(f=!0,location.reload())})}let Un=!1;function Sr(f){if(Un)return;Un=!0,i.email=(f.email||"").toLowerCase(),i.meId=i.email,i.meName=i.email===On?rd:"",l("#auth").hidden=!0,l("#auth").innerHTML="",s=xi(),i.db=!0,l("#me").innerHTML=`<span class="avatar">${h(i.email.slice(0,1).toUpperCase())}</span><span style="min-width:0;overflow:hidden;text-overflow:ellipsis">${h(i.email)}</span>`;let g=!1,y=A=>w=>{console.warn(A,w),w.code==="permission-denied"&&!g&&(g=!0,Un=!1,qe("denied"))},_=(A,w)=>s.collection(A).onSnapshot(O=>{let G={};O.docs.forEach(te=>G[te.id]=te.data()),i[w]=G,i.ready[w]=!0,i.pending[A]=O.metadata.hasPendingWrites,i.fromCache=O.metadata.fromCache,cn(),wi()},y(A));_("casos","casos"),_("tareas","tareas"),_("clientes","clientes"),s.collection("usuarios").onSnapshot(A=>{let w={};A.docs.forEach(G=>w[G.id]=G.data()),i.usuarios=w;let O=w[i.email];O?.nombre&&(i.meName=O.nombre),i.ro=i.email!==On&&O?.rol==="lector",wi()},y("usuarios")),s.doc("config/equipo").onSnapshot(A=>{A.exists&&(i.equipo={...i.equipo,...A.data()})},()=>{}),Ze(),cn()}if(!nd.apiKey)i.db=!1,Ze(),l("#content").innerHTML='<div class="notice">Falta la configuraci\xF3n de Firebase (config.js).</div>';else{let f=qc(nd);o=bm(f,{localCache:Lm({tabManager:Mm()})}),c=td(f),c.languageCode="es",Ze(),Xh(c,g=>{if(!g){Un=!1,qe("login");return}if(!g.emailVerified){qe("verify");return}Sr(g)})}to&&!no()&&(l("#btnInstall").hidden=!1)})();
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
*/
