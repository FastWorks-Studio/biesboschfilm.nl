var app=function(){"use strict";function e(){}function t(e,t){for(const n in t)e[n]=t[n];return e}function n(e){return e()}function o(){return Object.create(null)}function r(e){e.forEach(n)}function s(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let i;function c(e,t){return e===t||(i||(i=document.createElement("a")),i.href=t,e===i.href)}function l(t,...n){if(null==t){for(const e of n)e(void 0);return e}const o=t.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function u(e){let t;return l(e,(e=>t=e))(),t}function d(e,t,n){e.$$.on_destroy.push(l(t,n))}function f(e,t,n,o){if(e){const r=p(e,t,n,o);return e[0](r)}}function p(e,n,o,r){return e[1]&&r?t(o.ctx.slice(),e[1](r(n))):o.ctx}function h(e,t,n,o){if(e[2]&&o){const r=e[2](o(n));if(void 0===t.dirty)return r;if("object"==typeof r){const e=[],n=Math.max(t.dirty.length,r.length);for(let o=0;o<n;o+=1)e[o]=t.dirty[o]|r[o];return e}return t.dirty|r}return t.dirty}function m(e,t,n,o,r,s){if(r){const a=p(t,n,o,s);e.p(a,r)}}function g(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let e=0;e<n;e++)t[e]=-1;return t}return-1}function v(e){const t={};for(const n in e)"$"!==n[0]&&(t[n]=e[n]);return t}function $(e,t){const n={};t=new Set(t);for(const o in e)t.has(o)||"$"===o[0]||(n[o]=e[o]);return n}function b(e){return null==e?"":e}const w=["",!0,1,"true","contenteditable"],y="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function k(e,t){e.appendChild(t)}function j(e,t,n){e.insertBefore(t,n||null)}function x(e){e.parentNode&&e.parentNode.removeChild(e)}function z(e){return document.createElement(e)}function _(e){return document.createTextNode(e)}function E(){return _(" ")}function R(){return _("")}function S(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function B(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}const H=["width","height"];function M(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const o in t)null==t[o]?e.removeAttribute(o):"style"===o?e.style.cssText=t[o]:"__value"===o?e.value=e[o]=t[o]:n[o]&&n[o].set&&-1===H.indexOf(o)?e[o]=t[o]:B(e,o,t[o])}function P(e,t,n,o){null==n?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}function L(e,t){return new e(t)}let O;function I(e){O=e}function T(){if(!O)throw new Error("Function called outside component initialization");return O}function A(){const e=T();return(t,n,{cancelable:o=!1}={})=>{const r=e.$$.callbacks[t];if(r){const s=function(e,t,{bubbles:n=!1,cancelable:o=!1}={}){return new CustomEvent(e,{detail:t,bubbles:n,cancelable:o})}(t,n,{cancelable:o});return r.slice().forEach((t=>{t.call(e,s)})),!s.defaultPrevented}return!0}}function D(e,t){return T().$$.context.set(e,t),t}function N(e){return T().$$.context.get(e)}const C=[],q=[];let W=[];const F=[],J=Promise.resolve();let K=!1;function U(){K||(K=!0,J.then(Z))}function G(e){W.push(e)}const V=new Set;let Y=0;function Z(){if(0!==Y)return;const e=O;do{try{for(;Y<C.length;){const e=C[Y];Y++,I(e),Q(e.$$)}}catch(e){throw C.length=0,Y=0,e}for(I(null),C.length=0,Y=0;q.length;)q.pop()();for(let e=0;e<W.length;e+=1){const t=W[e];V.has(t)||(V.add(t),t())}W.length=0}while(C.length);for(;F.length;)F.pop()();K=!1,V.clear(),I(e)}function Q(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(G)}}const X=new Set;let ee;function te(){ee={r:0,c:[],p:ee}}function ne(){ee.r||r(ee.c),ee=ee.p}function oe(e,t){e&&e.i&&(X.delete(e),e.i(t))}function re(e,t,n,o){if(e&&e.o){if(X.has(e))return;X.add(e),ee.c.push((()=>{X.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}else o&&o()}function se(e,t){const n={},o={},r={$$scope:1};let s=e.length;for(;s--;){const a=e[s],i=t[s];if(i){for(const e in a)e in i||(o[e]=1);for(const e in i)r[e]||(n[e]=i[e],r[e]=1);e[s]=i}else for(const e in a)r[e]=1}for(const e in o)e in n||(n[e]=void 0);return n}function ae(e){return"object"==typeof e&&null!==e?e:{}}function ie(e){e&&e.c()}function ce(e,t,o){const{fragment:a,after_update:i}=e.$$;a&&a.m(t,o),G((()=>{const t=e.$$.on_mount.map(n).filter(s);e.$$.on_destroy?e.$$.on_destroy.push(...t):r(t),e.$$.on_mount=[]})),i.forEach(G)}function le(e,t){const n=e.$$;null!==n.fragment&&(!function(e){const t=[],n=[];W.forEach((o=>-1===e.indexOf(o)?t.push(o):n.push(o))),n.forEach((e=>e())),W=t}(n.after_update),r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ue(t,n,s,a,i,c,l=null,u=[-1]){const d=O;I(t);const f=t.$$={fragment:null,ctx:[],props:c,update:e,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:u,skip_bound:!1,root:n.target||d.$$.root};l&&l(f.root);let p=!1;if(f.ctx=s?s(t,n.props||{},((e,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&i(f.ctx[e],f.ctx[e]=r)&&(!f.skip_bound&&f.bound[e]&&f.bound[e](r),p&&function(e,t){-1===e.$$.dirty[0]&&(C.push(e),U(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}(t,e)),n})):[],f.update(),p=!0,r(f.before_update),f.fragment=!!a&&a(f.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);f.fragment&&f.fragment.l(e),e.forEach(x)}else f.fragment&&f.fragment.c();n.intro&&oe(t.$$.fragment),ce(t,n.target,n.anchor),Z()}I(d)}class de{$$=void 0;$$set=void 0;$destroy(){le(this,1),this.$destroy=e}$on(t,n){if(!s(n))return e;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const e=o.indexOf(n);-1!==e&&o.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");const fe=e=>void 0===e,pe=e=>"function"==typeof e,he=e=>"number"==typeof e;function me(){let e=0;return()=>e++}const ge="undefined"==typeof window;function ve(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}const $e=(e,t)=>e?{}:{style:t},be=e=>({"aria-hidden":"true",...$e(e,"display:none;")}),we=[];function ye(t,n=e){let o;const r=new Set;function s(e){if(a(t,e)&&(t=e,o)){const e=!we.length;for(const e of r)e[1](),we.push(e,t);if(e){for(let e=0;e<we.length;e+=2)we[e][0](we[e+1]);we.length=0}}}function i(e){s(e(t))}return{set:s,update:i,subscribe:function(a,c=e){const l=[a,c];return r.add(l),1===r.size&&(o=n(s,i)||e),a(t),()=>{r.delete(l),0===r.size&&o&&(o(),o=null)}}}}function ke(t,n,o){const a=!Array.isArray(t),i=a?[t]:t;if(!i.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const c=n.length<2;return u=(t,o)=>{let u=!1;const d=[];let f=0,p=e;const h=()=>{if(f)return;p();const r=n(a?d[0]:d,t,o);c?t(r):p=s(r)?r:e},m=i.map(((e,t)=>l(e,(e=>{d[t]=e,f&=~(1<<t),u&&h()}),(()=>{f|=1<<t}))));return u=!0,h(),function(){r(m),p(),u=!1}},{subscribe:ye(o,u).subscribe};var u}const je=e=>`@@svnav-ctx__${e}`,xe=je("LOCATION"),ze=je("ROUTER"),_e=je("ROUTE"),Ee=je("ROUTE_PARAMS"),Re=je("FOCUS_ELEM"),Se=/^:(.+)/,Be=(e,t,n)=>e.substr(t,n),He=(e,t)=>Be(e,0,t.length)===t,Me=e=>""===e,Pe=e=>Se.test(e),Le=e=>"*"===e[0],Oe=e=>e.replace(/\*.*$/,""),Ie=e=>e.replace(/(^\/+|\/+$)/g,"");function Te(e,t=!1){const n=Ie(e).split("/");return t?n.filter(Boolean):n}const Ae=(e,t)=>e+(t?`?${t}`:""),De=e=>`/${Ie(e)}`;function Ne(...e){const t=e.map((e=>Te(e,!0).join("/"))).join("/");return De(t)}const Ce=1,qe=2,We=3,Fe=5,Je=7,Ke=10,Ue={[Ce]:"Link",[qe]:"Route",[We]:"Router",4:"useFocus",[Fe]:"useLocation",6:"useMatch",[Je]:"useNavigate",8:"useParams",9:"useResolvable",[Ke]:"useResolve",11:"navigate"},Ge=e=>Ue[e];function Ve(e,t,n,o){const r=n&&function(e,t){let n;return e===qe?n=t.path?`path="${t.path}"`:"default":e===Ce?n=`to="${t.to}"`:e===We&&(n=`basepath="${t.basepath||""}"`),`<${Ge(e)} ${n||""} />`}(o||e,n),s=r?`\n\nOccurred in: ${r}`:"",a=Ge(e);return`<${a}> ${pe(t)?t(a):t}${s}`}const Ye=e=>(...t)=>e(Ve(...t)),Ze=Ye((e=>{throw new Error(e)})),Qe=Ye(console.warn),Xe=4,et=3,tt=2,nt=1,ot=1;function rt(e,t){return{route:e,score:e.default?0:Te(e.fullPath).reduce(((e,t)=>{let n=e;return n+=Xe,Me(t)?n+=ot:Pe(t)?n+=tt:Le(t)?n-=Xe+nt:n+=et,n}),0),index:t}}function st(e,t){let n,o;const[r]=t.split("?"),s=Te(r),a=""===s[0],i=function(e){return e.map(rt).sort(((e,t)=>e.score<t.score?1:e.score>t.score?-1:e.index-t.index))}(e);for(let e=0,r=i.length;e<r;e++){const{route:r}=i[e];let c=!1;const l={},u=e=>({...r,params:l,uri:e});if(r.default){o=u(t);continue}const d=Te(r.fullPath),f=Math.max(s.length,d.length);let p=0;for(;p<f;p++){const e=d[p],t=s[p];if(!fe(e)&&Le(e)){const t="*"===e?"*":e.slice(1);l[t]=s.slice(p).map(decodeURIComponent).join("/");break}if(fe(t)){c=!0;break}const n=Se.exec(e);if(n&&!a){const e=decodeURIComponent(t);l[n[1]]=e}else if(e!==t){c=!0;break}}if(!c){n=u(Ne(...s.slice(0,p)));break}}return n||o||null}function at(e,t){return st([e],t)}const it=e=>1===e.length?"":e,ct=e=>{const t=e.indexOf("?"),n=e.indexOf("#"),o=-1!==t,r=-1!==n,s=r?it(Be(e,n)):"",a=r?Be(e,0,n):e,i=o?it(Be(a,t)):"";return{pathname:(o?Be(a,0,t):a)||"/",search:i,hash:s}};function lt(e,t,n){return Ne(n,function(e,t){if(He(e,"/"))return e;const[n,o]=e.split("?"),[r]=t.split("?"),s=Te(n),a=Te(r);if(""===s[0])return Ae(r,o);if(!He(s[0],".")){const e=a.concat(s).join("/");return Ae(("/"===r?"":"/")+e,o)}const i=a.concat(s),c=[];return i.forEach((e=>{".."===e?c.pop():"."!==e&&c.push(e)})),Ae(`/${c.join("/")}`,o)}(e,t))}function ut(e,t){const n=De(Oe(e)),o=Te(n,!0),r=at({fullPath:n},Ne(...Te(t,!0).slice(0,o.length)));return r&&r.uri}const dt="POP";function ft(e){return{...e.location,pathname:encodeURI(decodeURI(e.location.pathname)),state:e.history.state,_key:e.history.state&&e.history.state._key||"initial"}}function pt(e,t){return{...ct(t),state:e}}const ht=!(ge||!window.document||!window.document.createElement),mt=!ge&&"null"===window.location.origin,gt=function(e){let t=[],n=ft(e),o=dt;const r=(e=t)=>e.forEach((e=>e({location:n,action:o})));return{get location(){return n},listen(s){t.push(s);r([s]);const a=ve(e,"popstate",(()=>{n=ft(e),o=dt,r([s])}));return()=>{a(),t=t.filter((e=>e!==s))}},navigate(t,s){const{state:a={},replace:i=!1}=s||{};if(o=i?"REPLACE":"PUSH",he(t))s&&Qe(11,"Navigation options (state or replace) are not supported, when passing a number as the first argument to navigate. They are ignored."),o=dt,e.history.go(t);else{const n={...a,_key:Math.random().toString(36).substring(2)};try{e.history[i?"replaceState":"pushState"](n,"",t)}catch(n){e.location[i?"replace":"assign"](t)}}n=ft(e),r()}}}(ht&&!mt?window:function(e="/"){let t=0,n=[pt(null,e)];return{get entries(){return n},get location(){return n[t]},addEventListener(){},removeEventListener(){},history:{get state(){return n[t].state},pushState(e,o,r){t++,n=n.slice(0,t),n.push(pt(e,r))},replaceState(e,o,r){n[t]=pt(e,r)},go(e){const o=t+e;o<0||o>n.length-1||(t=o)}}}}());let vt=null,$t=!0;function bt(e){(!vt||e.level>vt.level||e.level===vt.level&&function(e,t){const n=document.querySelectorAll("[data-svnav-router]");for(let o=0;o<n.length;o++){const r=n[o],s=Number(r.dataset.svnavRouter);if(s===e)return!0;if(s===t)return!1}return!1}(e.routerId,vt.routerId))&&(vt=e)}function wt(e){if(!e)return!1;const t="tabindex";try{if(!e.hasAttribute(t)){let n;e.setAttribute(t,"-1");const o=()=>{e.removeAttribute(t),n()};n=ve(e,"blur",o)}return e.focus(),document.activeElement===e}catch(e){return!1}}function yt(e,t){return Number(e.dataset.svnavRouteEnd)===t}function kt(e,t=document){return t.querySelector(e)}function jt(e){Promise.resolve(u(e.focusElement)).then((t=>{const n=t||function(e){let t=kt(`[data-svnav-route-start="${e}"]`).nextElementSibling;for(;!yt(t,e);){if(/^H[1-6]$/i.test(t.tagName))return t;const e=kt("h1,h2,h3,h4,h5,h6",t);if(e)return e;t=t.nextElementSibling}return null}(e.id);n||Qe(We,'Could not find an element to focus. You should always render a header for accessibility reasons, or set a custom focus element via the "useFocus" hook. If you don\'t want this Route or Router to manage focus, pass "primary={false}" to it.',e,qe);wt(n)||wt(document.documentElement)}))}const xt=(e,t,n)=>(o,r)=>(U(),J).then((()=>{if(vt&&!$t){if(o&&jt(vt.route),e.announcements&&r){const{path:o,fullPath:r,meta:s,params:a,uri:i}=vt.route,c=e.createAnnouncement({path:o,fullPath:r,meta:s,params:a,uri:i},u(n));Promise.resolve(c).then((e=>{t.set(e)}))}vt=null}else $t=!1})),zt="position:fixed;top:-1px;left:0;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";function _t(e){let n,o,r=[{role:"status"},{"aria-atomic":"true"},{"aria-live":"polite"},{"data-svnav-announcer":""},$e(e[6],zt)],s={};for(let e=0;e<r.length;e+=1)s=t(s,r[e]);return{c(){n=z("div"),o=_(e[0]),M(n,s)},m(e,t){j(e,n,t),k(n,o)},p(e,t){1&t[0]&&function(e,t,n){~w.indexOf(n)?function(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}(e,t):function(e,t){t=""+t,e.data!==t&&(e.data=t)}(e,t)}(o,e[0],s.contenteditable)},d(e){e&&x(n)}}}function Et(e){let n,o,r,s,a,i=[be(e[6]),{"data-svnav-router":e[3]}],c={};for(let e=0;e<i.length;e+=1)c=t(c,i[e]);const l=e[22].default,u=f(l,e,e[21],null);let d=e[2]&&e[4]&&e[1].announcements&&_t(e);return{c(){n=z("div"),o=E(),u&&u.c(),r=E(),d&&d.c(),s=R(),M(n,c)},m(e,t){j(e,n,t),j(e,o,t),u&&u.m(e,t),j(e,r,t),d&&d.m(e,t),j(e,s,t),a=!0},p(e,t){u&&u.p&&(!a||2097152&t[0])&&m(u,l,e,e[21],a?h(l,e[21],t,null):g(e[21]),null),e[2]&&e[4]&&e[1].announcements&&d.p(e,t)},i(e){a||(oe(u,e),a=!0)},o(e){re(u,e),a=!1},d(e){e&&(x(n),x(o),x(r),x(s)),u&&u.d(e),d&&d.d(e)}}}const Rt=me(),St="/";function Bt(e,t,n){let o,r,s,a,i,{$$slots:c={},$$scope:l}=t,{basepath:u=St}=t,{url:f=null}=t,{history:p=gt}=t,{primary:h=!0}=t,{a11y:m={}}=t,{disableInlineStyles:g=!1}=t;const v={createAnnouncement:e=>`Navigated to ${e.uri}`,announcements:!0,...m},$=u,b=De(u),w=N(xe),y=N(ze),k=!w,j=Rt(),x=h&&!(y&&!y.manageFocus),z=ye("");d(e,z,(e=>n(0,i=e)));const _=y?y.disableInlineStyles:g,E=ye([]);d(e,E,(e=>n(20,a=e)));const R=ye(null);d(e,R,(e=>n(18,r=e)));let S=!1;const B=k?0:y.level+1,H=k?ye(function(e,t){const{pathname:n,hash:o="",search:r="",state:s}=e,a=Te(t,!0),i=Te(n,!0);for(;a.length;)a[0]!==i[0]&&Ze(We,`Invalid state: All locations must begin with the basepath "${t}", found "${n}"`),a.shift(),i.shift();return{pathname:Ne(...i),hash:o,search:r,state:s}}(ge?ct(f):p.location,b)):w;d(e,H,(e=>n(17,o=e)));const M=ye(o);d(e,M,(e=>n(19,s=e)));const P=xt(v,z,H),L=e=>t=>t.filter((t=>t.id!==e));return k||u===St||Qe(We,'Only top-level Routers can have a "basepath" prop. It is ignored.',{basepath:u}),k&&D(xe,H),D(ze,{activeRoute:R,registerRoute:function(e){if(ge){if(S)return;const t=at(e,o.pathname);if(t)return S=!0,t}else E.update((t=>{const n=L(e.id)(t);return n.push(e),n}))},unregisterRoute:function(e){E.update(L(e))},manageFocus:x,level:B,id:j,history:k?p:y.history,basepath:k?b:y.basepath,disableInlineStyles:_}),e.$$set=e=>{"basepath"in e&&n(11,u=e.basepath),"url"in e&&n(12,f=e.url),"history"in e&&n(13,p=e.history),"primary"in e&&n(14,h=e.primary),"a11y"in e&&n(15,m=e.a11y),"disableInlineStyles"in e&&n(16,g=e.disableInlineStyles),"$$scope"in e&&n(21,l=e.$$scope)},e.$$.update=()=>{if(2048&e.$$.dirty[0]&&u!==$&&Qe(We,'You cannot change the "basepath" prop. It is ignored.'),1179648&e.$$.dirty[0]){const e=st(a,o.pathname);R.set(e)}if(655360&e.$$.dirty[0]&&k){const e=!!o.hash,t=!e&&x,n=!e||o.pathname!==s.pathname;P(t,n)}262144&e.$$.dirty[0]&&x&&r&&r.primary&&bt({level:B,routerId:j,route:r})},[i,v,k,j,x,z,_,E,R,H,M,u,f,p,h,m,g,o,r,s,a,l,c]}var Ht=class extends de{constructor(e){super(),ue(this,e,Bt,Et,a,{basepath:11,url:12,history:13,primary:14,a11y:15,disableInlineStyles:16},null,[-1,-1])}};function Mt(e,t,n=ze,o=We){N(n)||Ze(e,(e=>`You cannot use ${e} outside of a ${Ge(o)}.`),t)}const Pt=e=>{const{subscribe:t}=N(e);return{subscribe:t}};function Lt(){return Mt(Fe),Pt(xe)}function Ot(){const{history:e}=N(ze);return e}function It(){const e=N(_e);return e?ke(e,(e=>e.base)):ye("/")}function Tt(){Mt(Ke);const e=It(),{basepath:t}=N(ze);return n=>lt(n,u(e),t)}const At=e=>({params:16&e,location:8&e}),Dt=e=>({params:ge?u(e[10]):e[4],location:e[3],navigate:e[11]});function Nt(e){let t,n;return t=new Ht({props:{primary:e[1],$$slots:{default:[Wt]},$$scope:{ctx:e}}}),{c(){ie(t.$$.fragment)},m(e,o){ce(t,e,o),n=!0},p(e,n){const o={};2&n&&(o.primary=e[1]),528409&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(oe(t.$$.fragment,e),n=!0)},o(e){re(t.$$.fragment,e),n=!1},d(e){le(t,e)}}}function Ct(e){let t;const n=e[18].default,o=f(n,e,e[19],Dt);return{c(){o&&o.c()},m(e,n){o&&o.m(e,n),t=!0},p(e,r){o&&o.p&&(!t||524312&r)&&m(o,n,e,e[19],t?h(n,e[19],r,At):g(e[19]),Dt)},i(e){t||(oe(o,e),t=!0)},o(e){re(o,e),t=!1},d(e){o&&o.d(e)}}}function qt(e){let n,o,r;const s=[{location:e[3]},{navigate:e[11]},ge?u(e[10]):e[4],e[12]];var a=e[0];function i(e,n){let o={};if(void 0!==n&&7192&n)o=se(s,[8&n&&{location:e[3]},2048&n&&{navigate:e[11]},1040&n&&ae(ge?u(e[10]):e[4]),4096&n&&ae(e[12])]);else for(let e=0;e<s.length;e+=1)o=t(o,s[e]);return{props:o}}return a&&(n=L(a,i(e))),{c(){n&&ie(n.$$.fragment),o=R()},m(e,t){n&&ce(n,e,t),j(e,o,t),r=!0},p(e,t){if(1&t&&a!==(a=e[0])){if(n){te();const e=n;re(e.$$.fragment,1,0,(()=>{le(e,1)})),ne()}a?(n=L(a,i(e,t)),ie(n.$$.fragment),oe(n.$$.fragment,1),ce(n,o.parentNode,o)):n=null}else if(a){const o=7192&t?se(s,[8&t&&{location:e[3]},2048&t&&{navigate:e[11]},1040&t&&ae(ge?u(e[10]):e[4]),4096&t&&ae(e[12])]):{};n.$set(o)}},i(e){r||(n&&oe(n.$$.fragment,e),r=!0)},o(e){n&&re(n.$$.fragment,e),r=!1},d(e){e&&x(o),n&&le(n,e)}}}function Wt(e){let t,n,o,r;const s=[qt,Ct],a=[];function i(e,t){return null!==e[0]?0:1}return t=i(e),n=a[t]=s[t](e),{c(){n.c(),o=R()},m(e,n){a[t].m(e,n),j(e,o,n),r=!0},p(e,r){let c=t;t=i(e),t===c?a[t].p(e,r):(te(),re(a[c],1,1,(()=>{a[c]=null})),ne(),n=a[t],n?n.p(e,r):(n=a[t]=s[t](e),n.c()),oe(n,1),n.m(o.parentNode,o))},i(e){r||(oe(n),r=!0)},o(e){re(n),r=!1},d(e){e&&x(o),a[t].d(e)}}}function Ft(e){let n,o,r,s,a,i=[be(e[7]),{"data-svnav-route-start":e[5]}],c={};for(let e=0;e<i.length;e+=1)c=t(c,i[e]);let l=e[2]&&Nt(e),u=[be(e[7]),{"data-svnav-route-end":e[5]}],d={};for(let e=0;e<u.length;e+=1)d=t(d,u[e]);return{c(){n=z("div"),o=E(),l&&l.c(),r=E(),s=z("div"),M(n,c),M(s,d)},m(e,t){j(e,n,t),j(e,o,t),l&&l.m(e,t),j(e,r,t),j(e,s,t),a=!0},p(e,[t]){e[2]?l?(l.p(e,t),4&t&&oe(l,1)):(l=Nt(e),l.c(),oe(l,1),l.m(r.parentNode,r)):l&&(te(),re(l,1,1,(()=>{l=null})),ne())},i(e){a||(oe(l),a=!0)},o(e){re(l),a=!1},d(e){e&&(x(n),x(o),x(r),x(s)),l&&l.d(e)}}}const Jt=me();function Kt(e,n,o){let r;const s=["path","component","meta","primary"];let a,i,c,l,u=$(n,s),{$$slots:f={},$$scope:p}=n,{path:h=""}=n,{component:m=null}=n,{meta:g={}}=n,{primary:b=!0}=n;Mt(qe,n);const w=Jt(),{registerRoute:y,unregisterRoute:k,activeRoute:j,disableInlineStyles:x}=N(ze);d(e,j,(e=>o(16,a=e)));const z=It();d(e,z,(e=>o(17,c=e)));const _=Lt();d(e,_,(e=>o(3,i=e)));const E=ye(null);let R;const S=ye(),B=ye({});d(e,B,(e=>o(4,l=e))),D(_e,S),D(Ee,B),D(Re,E);const H=function(){Mt(Je);const e=Tt(),{navigate:t}=Ot();return(n,o)=>{const r=he(n)?n:e(n);return t(r,o)}}();var M;return ge||(M=()=>k(w),T().$$.on_destroy.push(M)),e.$$set=e=>{o(24,n=t(t({},n),v(e))),o(12,u=$(n,s)),"path"in e&&o(13,h=e.path),"component"in e&&o(0,m=e.component),"meta"in e&&o(14,g=e.meta),"primary"in e&&o(1,b=e.primary),"$$scope"in e&&o(19,p=e.$$scope)},e.$$.update=()=>{if(155658&e.$$.dirty){const e=""===h,t=Ne(c,h),n={id:w,path:h,meta:g,default:e,fullPath:e?"":t,base:e?c:ut(t,i.pathname),primary:b,focusElement:E};S.set(n),o(15,R=y(n))}if(98304&e.$$.dirty&&o(2,r=!!(R||a&&a.id===w)),98308&e.$$.dirty&&r){const{params:e}=R||a;B.set(e)}},n=v(n),[m,b,r,i,l,w,j,x,z,_,B,H,u,h,g,R,a,c,f,p]}var Ut=class extends de{constructor(e){super(),ue(this,e,Kt,Ft,a,{path:13,component:0,meta:14,primary:1})}};function Gt(e){let n,o,r,s;const a=e[13].default,i=f(a,e,e[12],null);let c=[{href:e[0]},e[2],e[1]],l={};for(let e=0;e<c.length;e+=1)l=t(l,c[e]);return{c(){n=z("a"),i&&i.c(),M(n,l)},m(t,a){j(t,n,a),i&&i.m(n,null),o=!0,r||(s=S(n,"click",e[4]),r=!0)},p(e,[t]){i&&i.p&&(!o||4096&t)&&m(i,a,e,e[12],o?h(a,e[12],t,null):g(e[12]),null),M(n,l=se(c,[(!o||1&t)&&{href:e[0]},4&t&&e[2],2&t&&e[1]]))},i(e){o||(oe(i,e),o=!0)},o(e){re(i,e),o=!1},d(e){e&&x(n),i&&i.d(e),r=!1,s()}}}function Vt(e,n,o){let r,s,a,i,c,l;const u=["to","replace","state","getProps"];let f,p=$(n,u),{$$slots:h={},$$scope:m}=n,{to:g}=n,{replace:b=!1}=n,{state:w={}}=n,{getProps:y=null}=n;Mt(Ce,n);const k=Lt();d(e,k,(e=>o(11,f=e)));const j=A(),x=Tt(),{navigate:z}=Ot();return e.$$set=e=>{o(19,n=t(t({},n),v(e))),o(18,p=$(n,u)),"to"in e&&o(5,g=e.to),"replace"in e&&o(6,b=e.replace),"state"in e&&o(7,w=e.state),"getProps"in e&&o(8,y=e.getProps),"$$scope"in e&&o(12,m=e.$$scope)},e.$$.update=()=>{2080&e.$$.dirty&&o(0,r=x(g,f)),2049&e.$$.dirty&&o(10,s=He(f.pathname,r)),2049&e.$$.dirty&&o(9,a=r===f.pathname),2049&e.$$.dirty&&(i=ct(r)===(e=>{const{pathname:t,search:n,hash:o}=e;return t+n+o})(f)),512&e.$$.dirty&&o(2,c=a?{"aria-current":"page"}:{}),o(1,l=(()=>{if(pe(y)){const e=y({location:f,href:r,isPartiallyCurrent:s,isCurrent:a});return{...p,...e}}return p})())},n=v(n),[r,l,c,k,function(e){if(j("click",e),function(e){return!e.defaultPrevented&&0===e.button&&!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)){e.preventDefault();z(r,{state:w,replace:i||b})}},g,b,w,y,a,s,f,m,h]}var Yt=class extends de{constructor(e){super(),ue(this,e,Vt,Gt,a,{to:5,replace:6,state:7,getProps:8})}};function Zt(e){let t,n,o,r,s;const a=e[5].default,i=f(a,e,e[4],null);return{c(){t=z("button"),i&&i.c(),B(t,"type","button"),B(t,"class",n=b(e[1]?"fluid":"")+" svelte-s49364"),P(t,"margin",e[0]?"0 auto 0 auto":"0")},m(n,a){j(n,t,a),i&&i.m(t,null),o=!0,r||(s=S(t,"click",e[2]),r=!0)},p(e,[r]){i&&i.p&&(!o||16&r)&&m(i,a,e,e[4],o?h(a,e[4],r,null):g(e[4]),null),(!o||2&r&&n!==(n=b(e[1]?"fluid":"")+" svelte-s49364"))&&B(t,"class",n),(!o||1&r)&&P(t,"margin",e[0]?"0 auto 0 auto":"0")},i(e){o||(oe(i,e),o=!0)},o(e){re(i,e),o=!1},d(e){e&&x(t),i&&i.d(e),r=!1,s()}}}function Qt(e,t,n){let{$$slots:o={},$$scope:r}=t,{click:s}=t,{center:a=!1}=t,{fluid:i=!1}=t;return e.$$set=e=>{"click"in e&&n(3,s=e.click),"center"in e&&n(0,a=e.center),"fluid"in e&&n(1,i=e.fluid),"$$scope"in e&&n(4,r=e.$$scope)},[a,i,function(){if("string"==typeof s){const e=s;window.open(e)}else{s()}},s,r,o]}class Xt extends de{constructor(e){super(),ue(this,e,Qt,Zt,a,{click:3,center:0,fluid:1})}}function en(e){let t;return{c(){t=_("Like ons op Facebook")},m(e,n){j(e,t,n)},d(e){e&&x(t)}}}function tn(e){let t;return{c(){t=_("Mail Bas")},m(e,n){j(e,t,n)},d(e){e&&x(t)}}}function nn(e){let t;return{c(){t=_("LinkedIn")},m(e,n){j(e,t,n)},d(e){e&&x(t)}}}function on(e){let t,n,o,r,s,a,i,l,u,d,f,p,h,m,g,v,$,b,w,y,_,R,S,H,M,P,L,O,I,T,A,D,N,C,q,W,F,J;return s=new Xt({props:{fluid:!0,center:!0,click:"https://www.facebook.com/biesboschfilm",$$slots:{default:[en]},$$scope:{ctx:e}}}),q=new Xt({props:{click:"mailto:info@baskakes.nl?subject=Biesbosch film",$$slots:{default:[tn]},$$scope:{ctx:e}}}),F=new Xt({props:{click:"https://www.linkedin.com/in/bas-kakes/",$$slots:{default:[nn]},$$scope:{ctx:e}}}),{c(){t=z("section"),n=z("img"),r=E(),ie(s.$$.fragment),a=E(),i=z("section"),i.innerHTML='<h2 class="svelte-1oacc3v">Waarom een film over de Biesbosch?</h2> <p>Na het maken van onze vorige film, <a href="https://www.dordtfilm.nl" target="_blank">Dordrecht door de jaren heen</a>, hebben we onze passie ontdekt voor het maken van documentaires en zijn onze ogen geopend voor de prachtige natuur van de Biesbosch. De aangewezen persoon om ons te helpen dit in beeld te brengen is oud-boswachter Jacques van der Neut. Dankzij zijn tientallen jaren Biesbosch-ervaring en kennis weten we precies wat belangrijk is om te vertellen en te laten zien.</p> <p>De Biesbosch is een zoetwatergetijdengebied, dat is uniek op wereldschaal. Na honderden jaren gebruikt te zijn voor industriële doeleinden is het sinds 1994 een nationaal park geworden. Sindsdien is de natuur echt tot bloei gekomen. Als je in de Biesbosch bent voel je meteen de rust en ga je op in de natuur. Wij vinden dit een groot goed en laten mensen graag zien en voelen hoe mooi het is, zowel in de bioscoop als thuis.</p> <figure class="photo svelte-1oacc3v"><img src="assets/images/filmen.jpg" alt="Bas en Jacques in de Biesbosch" class="svelte-1oacc3v"/> <figcaption class="svelte-1oacc3v">Van zonsopkomst tot zonsondergang: Bas en Jacques zijn op allerlei momenten in de Biesbosch te vinden.</figcaption></figure>',l=E(),u=z("section"),u.innerHTML='<h2 class="svelte-1oacc3v">Wie zijn wij?</h2> <p>Ons team bestaat uit:</p> <ul><li><a href="https://www.baskakes.nl" target="_blank">Bas Kakes</a>\n      - filmregisseur, cameraman, en video-editor. Hij is een geboren Dordtenaar en ziet de Biesbosch als zijn verlengde achtertuin.</li> <li><a href="https://www.fotoneut.nl" target="_blank">Jacques van der Neut</a>\n      - gepensioneerd boswachter, Biesbosch-expert, auteur, en fotograaf. Hij heeft 38 jaar voor Staatsbosbeheer gewerkt in de Biesbosch als boswachter.</li> <li><a href="https://www.linkedin.com/in/coen-koopmans-3b15519a/" target="_blank">Coen Koopmans</a>\n      - presenteert en schrijft het script. Hij doet onderzoek om zeker te zijn dat wat er verteld wordt ook klopt.</li> <li><a href="https://www.linkedin.com/in/kevin-van-den-hoek-9302b8145/" target="_blank">Kevin van den Hoek</a>\n      - grafisch ontwerper. Hij maakt de visuals en zorgt dat alles mooi afgewerkt is.</li></ul> <p>Samen zijn wij <em>FastWorks</em>.</p> <figure class="photo svelte-1oacc3v"><img src="assets/images/biesbosch-jacques.jpg" alt="Jacques wordt gefilmd." class="svelte-1oacc3v"/> <figcaption class="svelte-1oacc3v">Gepensioneerd boswachter Jacques van der Neut deelt zijn visie over de Biesbosch.</figcaption></figure> <figure class="photo svelte-1oacc3v"><img src="assets/images/biesbosch-bever.png" alt="Een zwemmende bever in de Biesbosch." class="svelte-1oacc3v"/> <figcaption class="svelte-1oacc3v">Ook het icoon van de Biesbosch komt aan bod: de bever.</figcaption></figure> <figure class="photo svelte-1oacc3v"><img src="assets/images/telelens.jpg" alt="Bas met een camera met een grote telelens." class="svelte-1oacc3v"/> <figcaption class="svelte-1oacc3v">Er moet in alle seizoenen en weersomstandigheden gefilmd worden.</figcaption></figure>',d=E(),f=z("section"),f.innerHTML='<h2 class="svelte-1oacc3v">Tot op de bodem uitgezocht</h2> <p>Om er zeker van te zijn dat we het juiste verhaal vertellen hebben we alles grondig uitgezocht. Alle gemaakte claims worden onderbouwd met (wetenschappelijke) bronnen. Zo zorgen we ervoor dat we recht doen aan het verhaal.</p>',p=E(),h=z("section"),h.innerHTML='<h2 class="svelte-1oacc3v">Crowdfunding</h2> <p>We hebben via voordekunst.nl\n    <a href="https://www.voordekunst.nl/projecten/14768-natuurdocumentaire-over-de-biesbosch-1" target="_blank">een succesvolle crowfundingcampagne</a>\n    afgerond. We zijn ontzettend blij met alle steun!</p>',m=E(),g=z("section"),g.innerHTML='<h2 class="svelte-1oacc3v">In de media</h2> <p>Het AD schreef over onze film en crowdfunding,\n    <a href="https://www.ad.nl/dordrecht/bas-start-crowdfunding-om-natuurdocu-over-biesbosch-af-te-kunnen-maken-grootse-natuur-in-een-klein-land~a1e15a649/" target="_blank">klik hier om het terug te lezen</a>.</p> <p>Op zaterdagochtend 4 februari 2023 waren Bas en Jacques te horen op Radio Rijnmond in het programma\n    <em>Chris Natuurlijk</em>.\n    <a href="https://www.rijnmond.nl/nieuws/1611636/chris-natuurlijk-van-4-februari-make-a-wish" target="_blank" rel="noreferrer noopener">Klik hier voor meer informatie.</a></p> <p>Dit interview is in <a href="https://podcasts.apple.com/nl/podcast/chris-natuurlijk/id356338103?l=en" target="_blank" rel="noreferrer noopener">hun podcast terug te luisteren</a>.</p> <p>RTV Dordrecht ging met ons op pad en wilde meer weten over deze film.\n    <a href="https://www.rtvdordrecht.nl/nieuws/natuur/crowdfundingsactie-gestart-voor-natuurdocumentaire-over-de-biesbosch" target="_blank" rel="noreferrer noopener">Bekijk het hier.</a></p> <figure class="photo svelte-1oacc3v"><img src="assets/images/jacques-rijnmond.jpg" alt="Jacques wordt geïnterviewd." class="svelte-1oacc3v"/> <figcaption class="svelte-1oacc3v">Jacques in gesprek met Chris van Radio Rijnmond.</figcaption></figure>',v=E(),$=z("section"),$.innerHTML='<h2 class="svelte-1oacc3v">Wanneer zal de film te zien zijn?</h2> <p>Iedereen die wel eens iets met fotografie heeft gedaan zal het weten: dieren zijn niet voorspelbaar. Ook de licht- en weersomstandigheden willen nog wel eens variëren. Daarom is het niet alleen moeilijk, maar vinden we het ook zonde om een harde deadline te stellen.</p> <p>We zijn al vier jaar bezig met filmen, dus we zijn al een eind op weg. We mikken op eind 2024.</p>',b=E(),w=z("figure"),w.innerHTML='<img src="assets/images/porseleinhoen.jpg" alt="Een porseleinhoen loopt door ondiep water." class="svelte-1oacc3v"/> <figcaption class="svelte-1oacc3v">Het porseleinhoen laat zich even zien.</figcaption>',y=E(),_=z("figure"),_.innerHTML='<img src="assets/images/zeearend.jpg" alt="Een porseleinhoen loopt door ondiep water." class="svelte-1oacc3v"/> <figcaption class="svelte-1oacc3v">Deze jonge zeearend zit graag op dode bomen.</figcaption>',R=E(),S=z("figure"),S.innerHTML='<img src="assets/images/sperwer.jpg" alt="Een vrouwelijke sperwer kijkt om." class="svelte-1oacc3v"/> <figcaption class="svelte-1oacc3v">Sperwer (vrouwtje) kijkt om.</figcaption>',H=E(),M=z("figure"),M.innerHTML='<img src="assets/images/drone.jpg" alt="De Biesbosch zoals gezien vanuit onze drone; water en een paar stukken groen." class="svelte-1oacc3v"/> <figcaption class="svelte-1oacc3v">Met een drone laten we de hele Biesbosch in vogelvlucht zien.</figcaption>',P=E(),L=z("section"),L.innerHTML='<h2 class="svelte-1oacc3v">Met dank aan</h2> <p>We zijn erg blij met al onze donateurs, waaronder:</p> <ul><li><a href="https://www.staatsbosbeheer.nl" target="_blank">Staatsbosbeheer</a></li> <li><a href="https://www.biesboschstreekfonds.nl" target="_blank">Stichting Biesbosch Streekfonds</a></li> <li><a href="https://www.dordrecht.nl" target="_blank">Gemeente Dordrecht</a></li> <li><a href="https://www.freenature.nl" target="_blank">FREE Nature</a></li> <li><a href="https://zilvermeeuw.nl" target="_blank">Rondvaartbedrijf Zilvermeeuw</a></li> <li><a href="https://www.cultuurfonds.nl" target="_blank">Het Cultuurfonds</a></li> <li><a href="https://www.fysio-dubbeldam.nl" target="_blank">Fysiotherapie Dubbeldam</a></li> <li><a href="https://www.vdkm-bv.nl" target="_blank">van Dijk-Kuiper Medical B.V.</a></li> <li><a href="https://wilgenpaard.nl" target="_blank">Het Wilgenpaard</a></li> <li><a href="https://drijfdordrecht.nl" target="_blank">DRIJF Dordrecht</a></li> <li><a href="https://www.ontdekdordrecht.com" target="_blank">Ontdek Dordrecht</a></li></ul>',O=E(),I=z("section"),T=z("h2"),T.textContent="Vragen?",A=E(),D=z("p"),D.textContent="Heeft u vragen over dit project? Schroom niet om contact op te nemen.",N=E(),C=z("div"),ie(q.$$.fragment),W=E(),ie(F.$$.fragment),B(n,"id","logo"),c(n.src,o="assets/images/logo.svg")||B(n,"src","assets/images/logo.svg"),B(n,"alt","De Biesbosch: Grootse natuur in een klein land"),B(t,"class","intro svelte-1oacc3v"),B(i,"class","waarom svelte-1oacc3v"),B(u,"class","wie-zijn-wij svelte-1oacc3v"),B(f,"class","svelte-1oacc3v"),B(h,"class","svelte-1oacc3v"),B(g,"class","svelte-1oacc3v"),B($,"class","svelte-1oacc3v"),B(w,"class","photo svelte-1oacc3v"),B(_,"class","photo svelte-1oacc3v"),B(S,"class","photo svelte-1oacc3v"),B(M,"class","photo svelte-1oacc3v"),B(L,"class","svelte-1oacc3v"),B(T,"class","svelte-1oacc3v"),B(C,"class","contact-buttons svelte-1oacc3v"),B(I,"class","svelte-1oacc3v")},m(e,o){j(e,t,o),k(t,n),k(t,r),ce(s,t,null),j(e,a,o),j(e,i,o),j(e,l,o),j(e,u,o),j(e,d,o),j(e,f,o),j(e,p,o),j(e,h,o),j(e,m,o),j(e,g,o),j(e,v,o),j(e,$,o),j(e,b,o),j(e,w,o),j(e,y,o),j(e,_,o),j(e,R,o),j(e,S,o),j(e,H,o),j(e,M,o),j(e,P,o),j(e,L,o),j(e,O,o),j(e,I,o),k(I,T),k(I,A),k(I,D),k(I,N),k(I,C),ce(q,C,null),k(C,W),ce(F,C,null),J=!0},p(e,[t]){const n={};1&t&&(n.$$scope={dirty:t,ctx:e}),s.$set(n);const o={};1&t&&(o.$$scope={dirty:t,ctx:e}),q.$set(o);const r={};1&t&&(r.$$scope={dirty:t,ctx:e}),F.$set(r)},i(e){J||(oe(s.$$.fragment,e),oe(q.$$.fragment,e),oe(F.$$.fragment,e),J=!0)},o(e){re(s.$$.fragment,e),re(q.$$.fragment,e),re(F.$$.fragment,e),J=!1},d(e){e&&(x(t),x(a),x(i),x(l),x(u),x(d),x(f),x(p),x(h),x(m),x(g),x(v),x($),x(b),x(w),x(y),x(_),x(R),x(S),x(H),x(M),x(P),x(L),x(O),x(I)),le(s),le(q),le(F)}}}class rn extends de{constructor(e){super(),ue(this,e,null,on,a,{})}}function sn(t){let n;return{c(){n=z("section"),n.innerHTML='<img id="logo" src="assets/images/logo.svg" alt="De Biesbosch: Grootse natuur in een klein land"/>',B(n,"class","intro")},m(e,t){j(e,n,t)},p:e,i:e,o:e,d(e){e&&x(n)}}}class an extends de{constructor(e){super(),ue(this,e,null,sn,a,{})}}const{window:cn}=y;function ln(e){let t;return{c(){t=_("Bronnen")},m(e,n){j(e,t,n)},d(e){e&&x(t)}}}function un(e){let t,n,o,r,s,a,i,l,u,d,f;return a=new Yt({props:{to:"bronnen",$$slots:{default:[ln]},$$scope:{ctx:e}}}),l=new Ut({props:{path:"/",component:rn}}),d=new Ut({props:{path:"bronnen",component:an}}),{c(){t=z("main"),n=z("video"),r=E(),s=z("div"),ie(a.$$.fragment),i=E(),ie(l.$$.fragment),u=E(),ie(d.$$.fragment),B(n,"preload","none"),c(n.src,o=e[1])||B(n,"src",o),n.autoplay=!0,n.muted=!0,n.loop=!0,n.playsInline=!0,B(n,"class","svelte-87mhhx"),B(s,"class","content svelte-87mhhx"),P(t,"width",e[2]+"px"),B(t,"class","svelte-87mhhx")},m(e,o){j(e,t,o),k(t,n),k(t,r),k(t,s),ce(a,s,null),k(s,i),ce(l,s,null),k(s,u),ce(d,s,null),f=!0},p(e,r){(!f||2&r&&!c(n.src,o=e[1]))&&B(n,"src",o);const s={};32&r&&(s.$$scope={dirty:r,ctx:e}),a.$set(s),(!f||4&r)&&P(t,"width",e[2]+"px")},i(e){f||(oe(a.$$.fragment,e),oe(l.$$.fragment,e),oe(d.$$.fragment,e),f=!0)},o(e){re(a.$$.fragment,e),re(l.$$.fragment,e),re(d.$$.fragment,e),f=!1},d(e){e&&x(t),le(a),le(l),le(d)}}}function dn(e){let t,n,o,s;return G(e[4]),t=new Ht({props:{$$slots:{default:[un]},$$scope:{ctx:e}}}),{c(){ie(t.$$.fragment)},m(r,a){ce(t,r,a),n=!0,o||(s=[S(cn,"resize",e[3]),S(cn,"resize",e[4])],o=!0)},p(e,[n]){const o={};38&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(oe(t.$$.fragment,e),n=!0)},o(e){re(t.$$.fragment,e),n=!1},d(e){le(t,e),o=!1,r(s)}}}function fn(){return`./assets/video/bg_${window.innerHeight>window.innerWidth?"portrait":"landscape"}.mp4`}function pn(e,t,n){let o,r,s;return e.$$.update=()=>{1&e.$$.dirty&&n(2,r=Math.min(.5*Math.max(window.innerWidth,window.innerHeight),Math.max(o,300)))},n(0,o=0),n(1,s=fn()),[o,s,r,function(){const e=fn();e!=s&&n(1,s=e)},function(){n(0,o=cn.innerWidth)}]}return new class extends de{constructor(e){super(),ue(this,e,pn,dn,a,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
