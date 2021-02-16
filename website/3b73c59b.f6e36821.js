(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{66:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var i=n(2),a=n(6),r=(n(0),n(83)),o={id:"audit",title:"Audit"},s={unversionedId:"audit",id:"audit",isDocsHomePage:!1,title:"Audit",description:"The audit functionality enables periodic evaluations of replicated resources against the policies enforced in the cluster to detect pre-existing misconfigurations. Audit results are stored as violations listed in the status field of the failed constraint.",source:"@site/docs/audit.md",slug:"/audit",permalink:"/gatekeeper/website/docs/audit",editUrl:"https://open-policy-agent.github.io/gatekeeper/website/docs/docs/audit.md",version:"current",sidebar:"someSidebar",previous:{title:"How to use Gatekeeper",permalink:"/gatekeeper/website/docs/howto"},next:{title:"Handling Constraint Violations",permalink:"/gatekeeper/website/docs/violations"}},c=[{value:"Configuring Audit",id:"configuring-audit",children:[{value:"Audit using kinds specified in the constraints only",id:"audit-using-kinds-specified-in-the-constraints-only",children:[]}]}],l={rightToc:c};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(i.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"The audit functionality enables periodic evaluations of replicated resources against the policies enforced in the cluster to detect pre-existing misconfigurations. Audit results are stored as violations listed in the ",Object(r.b)("inlineCode",{parentName:"p"},"status")," field of the failed constraint."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sRequiredLabels\nmetadata:\n  name: ns-must-have-gk\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Namespace"]\n  parameters:\n    labels: ["gatekeeper"]\nstatus:\n  auditTimestamp: "2019-05-11T01:46:13Z"\n  enforced: true\n  violations:\n  - enforcementAction: deny\n    kind: Namespace\n    message: \'you must provide labels: {"gatekeeper"}\'\n    name: default\n  - enforcementAction: deny\n    kind: Namespace\n    message: \'you must provide labels: {"gatekeeper"}\'\n    name: gatekeeper-system\n  - enforcementAction: deny\n    kind: Namespace\n    message: \'you must provide labels: {"gatekeeper"}\'\n    name: kube-public\n  - enforcementAction: deny\n    kind: Namespace\n    message: \'you must provide labels: {"gatekeeper"}\'\n    name: kube-system\n')),Object(r.b)("h2",{id:"configuring-audit"},"Configuring Audit"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Audit violations per constraint: set ",Object(r.b)("inlineCode",{parentName:"li"},"--constraint-violations-limit=123")," (defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"20"),")"),Object(r.b)("li",{parentName:"ul"},"Audit chunk size: set ",Object(r.b)("inlineCode",{parentName:"li"},"--audit-chunk-size=500")," (defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"0")," = infinite) to limit memory consumption of the auditing ",Object(r.b)("inlineCode",{parentName:"li"},"Pod")),Object(r.b)("li",{parentName:"ul"},"Audit interval: set ",Object(r.b)("inlineCode",{parentName:"li"},"--audit-interval=123")," (defaults to every ",Object(r.b)("inlineCode",{parentName:"li"},"60")," seconds). Disable audit interval by setting ",Object(r.b)("inlineCode",{parentName:"li"},"--audit-interval=0"))),Object(r.b)("p",null,"By default, the audit will request each resource from the Kubernetes API during each cycle of the audit. To instead rely on the OPA cache, use the flag ",Object(r.b)("inlineCode",{parentName:"p"},"--audit-from-cache=true"),". Note that this requires replication of Kubernetes resources into OPA before they can be evaluated against the enforced policies. Refer to the ",Object(r.b)("a",{parentName:"p",href:"/gatekeeper/website/docs/sync"},"Replicating data")," section for more information."),Object(r.b)("h3",{id:"audit-using-kinds-specified-in-the-constraints-only"},"Audit using kinds specified in the constraints only"),Object(r.b)("p",null,"By default, Gatekeeper will audit all resources in the cluster. This operation can take some time depending on the number of resources."),Object(r.b)("p",null,'If all of your constraints match against specific kinds (e.g. "match only pods"), then you can speed up audit runs by setting ',Object(r.b)("inlineCode",{parentName:"p"},"--audit-match-kind-only=true")," flag. This will only check resources of the kinds specified in all ",Object(r.b)("a",{parentName:"p",href:"#Constraints"},"constraints")," defined in the cluster."),Object(r.b)("p",null,"For example, defining this constraint will only audit ",Object(r.b)("inlineCode",{parentName:"p"},"Pod")," kind:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sAllowedRepos\nmetadata:\n  name: prod-repo-is-openpolicyagent\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Pod"]\n...\n')),Object(r.b)("p",null,"If any of the ",Object(r.b)("a",{parentName:"p",href:"#Constraints"},"constraints")," do not specify ",Object(r.b)("inlineCode",{parentName:"p"},"kinds"),", it will be equivalent to not setting ",Object(r.b)("inlineCode",{parentName:"p"},"--audit-match-kind-only")," flag (",Object(r.b)("inlineCode",{parentName:"p"},"false")," by default), and will fall back to auditing all resources in the cluster."))}u.isMDXComponent=!0},83:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var i=n(0),a=n.n(i);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(n),b=i,m=d["".concat(o,".").concat(b)]||d[b]||p[b]||r;return n?a.a.createElement(m,s(s({ref:t},l),{},{components:n})):a.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=b;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var l=2;l<r;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);