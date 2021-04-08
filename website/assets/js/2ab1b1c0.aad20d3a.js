(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return s}));var r=n(3),o=n(7),a=(n(0),n(99)),i={id:"vendor-specific",title:"Cloud and Vendor Specific Fixes"},c={unversionedId:"vendor-specific",id:"vendor-specific",isDocsHomePage:!1,title:"Cloud and Vendor Specific Fixes",description:"Running on private GKE Cluster nodes",source:"@site/docs/cloud-specific.md",slug:"/vendor-specific",permalink:"/gatekeeper/website/docs/vendor-specific",editUrl:"https://github.com/open-policy-agent/gatekeeper/edit/master/website/docs/docs/cloud-specific.md",version:"current",sidebar:"docs",previous:{title:"Emergency Recovery",permalink:"/gatekeeper/website/docs/emergency"},next:{title:"Mutation",permalink:"/gatekeeper/website/docs/mutation"}},p=[{value:"Running on private GKE Cluster nodes",id:"running-on-private-gke-cluster-nodes",children:[]},{value:"Running on OpenShift 4.x",id:"running-on-openshift-4x",children:[]}],l={toc:p};function s(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"running-on-private-gke-cluster-nodes"},"Running on private GKE Cluster nodes"),Object(a.b)("p",null,"By default, firewall rules restrict the cluster master communication to nodes only on ports 443 (HTTPS) and 10250 (kubelet). Although Gatekeeper exposes its service on port 443, GKE by default enables ",Object(a.b)("inlineCode",{parentName:"p"},"--enable-aggregator-routing")," option, which makes the master to bypass the service and communicate straight to the POD on port 8443."),Object(a.b)("p",null,"Two ways of working around this:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"create a new firewall rule from master to private nodes to open port ",Object(a.b)("inlineCode",{parentName:"p"},"8443")," (or any other custom port)"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",{parentName:"li",href:"https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules"},"https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules")))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"make the pod to run on privileged port 443 (need to run pod as root)"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"update Gatekeeper deployment manifest spec:"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},"remove ",Object(a.b)("inlineCode",{parentName:"li"},"securityContext")," settings that force the pods not to run as root"),Object(a.b)("li",{parentName:"ul"},"update port from ",Object(a.b)("inlineCode",{parentName:"li"},"8443")," to ",Object(a.b)("inlineCode",{parentName:"li"},"443"))),Object(a.b)("pre",{parentName:"li"},Object(a.b)("code",{parentName:"pre",className:"language-yaml"},"containers:\n- args:\n  - --port=443\n  ports:\n  - containerPort: 443\n    name: webhook-server\n    protocol: TCP\n"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("p",{parentName:"li"},"update Gatekeeper service manifest spec:"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},"update ",Object(a.b)("inlineCode",{parentName:"li"},"targetPort")," from ",Object(a.b)("inlineCode",{parentName:"li"},"8443")," to ",Object(a.b)("inlineCode",{parentName:"li"},"443"))),Object(a.b)("pre",{parentName:"li"},Object(a.b)("code",{parentName:"pre",className:"language-yaml"},"ports:\n- port: 443\n  targetPort: 443\n")))))),Object(a.b)("h2",{id:"running-on-openshift-4x"},"Running on OpenShift 4.x"),Object(a.b)("p",null,"When running on OpenShift, the ",Object(a.b)("inlineCode",{parentName:"p"},"nouid")," scc must be used to keep a restricted profile but being able to set the UserID."),Object(a.b)("p",null,"In order to use it, the following section must be added to the gatekeeper-manager-role Role:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-yaml"},"- apiGroups:\n  - security.openshift.io\n  resourceNames:\n    - anyuid\n  resources:\n    - securitycontextconstraints\n  verbs:\n    - use\n")),Object(a.b)("p",null,"With this restricted profile, it won't be possible to set the ",Object(a.b)("inlineCode",{parentName:"p"},"container.seccomp.security.alpha.kubernetes.io/manager: runtime/default")," annotation. On the other hand, given the limited amount of privileges provided by the anyuid scc, the annotation can be removed."))}s.isMDXComponent=!0},99:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),s=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=s(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=s(n),d=r,m=u["".concat(i,".").concat(d)]||u[d]||b[d]||a;return n?o.a.createElement(m,c(c({ref:t},l),{},{components:n})):o.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);