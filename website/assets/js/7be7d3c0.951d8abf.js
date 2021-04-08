(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{84:function(e,n,a){"use strict";a.r(n),a.d(n,"frontMatter",(function(){return s})),a.d(n,"metadata",(function(){return l})),a.d(n,"toc",(function(){return c})),a.d(n,"default",(function(){return p}));var t=a(3),i=a(7),o=(a(0),a(99)),s={id:"mutation",title:"Mutation"},l={unversionedId:"mutation",id:"mutation",isDocsHomePage:!1,title:"Mutation",description:"The mutation feature allows Gatekeeper to not only validate created Kubernetes resources but also modify them based on defined mutation policies.",source:"@site/docs/mutation.md",slug:"/mutation",permalink:"/gatekeeper/website/docs/mutation",editUrl:"https://github.com/open-policy-agent/gatekeeper/edit/master/website/docs/docs/mutation.md",version:"current",sidebar:"docs",previous:{title:"Cloud and Vendor Specific Fixes",permalink:"/gatekeeper/website/docs/vendor-specific"},next:{title:"Want to help?",permalink:"/gatekeeper/website/docs/help"}},c=[{value:"Mutation CRDs",id:"mutation-crds",children:[{value:"AssignMetadata",id:"assignmetadata",children:[]}]},{value:"Examples",id:"examples",children:[{value:"Adding an annotation",id:"adding-an-annotation",children:[]},{value:"Setting security context of a specific container in a Pod in a namespace to be privileged",id:"setting-security-context-of-a-specific-container-in-a-pod-in-a-namespace-to-be-privileged",children:[]},{value:"Adding a <code>network</code> sidecar to a Pod",id:"adding-a-network-sidecar-to-a-pod",children:[]},{value:"Adding dnsPolicy and dnsConfig to a Pod",id:"adding-dnspolicy-and-dnsconfig-to-a-pod",children:[]}]}],r={toc:c};function p(e){var n=e.components,a=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(t.a)({},r,a,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The mutation feature allows Gatekeeper to not only validate created Kubernetes resources but also modify them based on defined mutation policies.\nThe feature is still in an alpha stage, so the final form can still change."),Object(o.b)("p",null,"Status: alpha"),Object(o.b)("h2",{id:"mutation-crds"},"Mutation CRDs"),Object(o.b)("p",null,"The mutation policies are defined by means of mutation specific CRDs:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"AssignMetadata - defines changes to the metadata section of a resource"),Object(o.b)("li",{parentName:"ul"},"Assign - any change outside the metadata section")),Object(o.b)("p",null,"The rules of mutating the metadata section are more strict than for mutating the rest of the resource definition. The differences will be described in more detail below."),Object(o.b)("p",null,"Here is an example of a simple AssignMetadata CRD:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: AssignMetadata\nmetadata:\n  name: demo-annotation-owner\nspec:\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n  location: "metadata.annotations.owner"\n  parameters:\n    assign:\n      value:  "admin"\n')),Object(o.b)("p",null,"Each mutation CRD can be divided into 3 distinct sections:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"extent of changes - what is to be modified (kinds, namespaces, ...)"),Object(o.b)("li",{parentName:"ul"},"intent - the path and value of the modification"),Object(o.b)("li",{parentName:"ul"},"conditional - conditions under which the mutation will be applied")),Object(o.b)("h4",{id:"extent-of-changes"},"Extent of changes"),Object(o.b)("p",null,"The extent of changes section describes the resource which will be mutated.\nIt allows to filter the resources to be mutated by kind, label and namespace."),Object(o.b)("p",null,"An example of the extent of changes section."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'applyTo:\n- groups: [""]\n  kinds: ["Pod"]\n  versions: ["v1"]\nmatch:\n  scope: Namespaced | Cluster\n  kinds:\n  - APIGroups: []\n    kinds: []\n  labelSelector: []\n  namespaces: []\n  namespaceSelector: []\n  excludedNamespaces: []\n')),Object(o.b)("p",null,"Note that the ",Object(o.b)("inlineCode",{parentName:"p"},"applyTo")," section applies to the Assign CRD only. It allows filtering of resources by the resource GVK (group version kind). Note that the ",Object(o.b)("inlineCode",{parentName:"p"},"applyTo")," section does not accept globs."),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"match")," section is common to both Assign and AssignMetadata. It supports the following elements:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"scope - the scope (Namespaced | Cluster) of the mutated resource"),Object(o.b)("li",{parentName:"ul"},"kinds - the resource kind, any of the elements listed"),Object(o.b)("li",{parentName:"ul"},"labelSelector - filters resources by resource labels listed"),Object(o.b)("li",{parentName:"ul"},"namespaces - list of allowed namespaces, only resources in listed namespaces will be mutated"),Object(o.b)("li",{parentName:"ul"},"namespaceSelector - filters resources by namespace selector"),Object(o.b)("li",{parentName:"ul"},"excludedNamespaces - list of excluded namespaces, resources in listed namespaces will not be mutated")),Object(o.b)("p",null,"Note that the resource is not filtered if an element is not present or an empty list."),Object(o.b)("h4",{id:"intent"},"Intent"),Object(o.b)("p",null,"This specifies what should be changed in the resource."),Object(o.b)("p",null,"An example of the section is shown below:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'location: "spec.containers[name:foo].imagePullPolicy"\nparameters:\n  assign:\n    value: "Always"\n')),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"location")," element specifies the path to be modified.\nThe ",Object(o.b)("inlineCode",{parentName:"p"},"parameters.assign.value")," element specifies the value to be set for the element specified in ",Object(o.b)("inlineCode",{parentName:"p"},"location"),". Note that the value can either be a simple string or a composite value."),Object(o.b)("p",null,"An example of a composite value:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'location: "spec.containers[name:networking]"\nparameters:\n  assign:\n    value:\n      name: "networking"\n      imagePullPolicy: Always\n\n')),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"location")," element can specify either a simple subelement or an element in a list.\nFor example the location ",Object(o.b)("inlineCode",{parentName:"p"},"spec.containers[name:foo].imagePullPolicy")," would be parsed as follows:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"*spec"),".containers","[name:foo]",".imagePullPolicy* - the spec element"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("em",{parentName:"li"},"spec.",Object(o.b)("strong",{parentName:"em"},"containers","[name:foo]"),".imagePullPolicy")," - container subelement of spec. The container element is a list. Out of the list choosen, an element with the ",Object(o.b)("inlineCode",{parentName:"li"},"name")," element having the value ",Object(o.b)("inlineCode",{parentName:"li"},"foo"),"."),Object(o.b)("li",{parentName:"ul"},"*spec.containers","[name:foo]",".",Object(o.b)("strong",{parentName:"li"},"imagePullPolicy*")," - in the element from the list chosen in the previous step the element ",Object(o.b)("inlineCode",{parentName:"li"},"imagePullPolicy")," is chosen")),Object(o.b)("p",null,"The yaml illustrating the above ",Object(o.b)("inlineCode",{parentName:"p"},"location"),":"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},"spec:\n  containers:\n  - name: foo\n    imagePullPolicy:\n")),Object(o.b)("p",null,"Wildcards can be used for list element values: ",Object(o.b)("inlineCode",{parentName:"p"},"spec.containers[name:*].imagePullPolicy")),Object(o.b)("h5",{id:"conditionals"},"Conditionals"),Object(o.b)("p",null,"The conditions for updating the resource.\nTwo types of conditions exist:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"path tests - a resource will only be updated when a specified path exists or not"),Object(o.b)("li",{parentName:"ul"},"value tests - a resource will only be updated when the existing value is/is not contained in a list of values")),Object(o.b)("p",null,"An example of the conditionals: "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'parameters:\n  pathTests:\n  - subPath: "spec.containers[name:foo]"\n    condition: MustExist\n  - subPath: spec.containers[name:foo].securityContext.capabilities\n    condition: MustNotExist\n\n  assignIf:\n    in: [<value 1>, <value 2>, <value 3>, ...]\n    notIn: [<value 1>, <value 2>, <value 3>, ...]\n\n')),Object(o.b)("h3",{id:"assignmetadata"},"AssignMetadata"),Object(o.b)("p",null,"AssignMetadata is a CRD for modifying the metadata section of a resource. Note that the metadata of a resource is a very sensitive piece of data, and certain mutations could result in unintended consequences. An example of this could be changing the name or namespace of a resource. The AssignMetadata changes have therefore been limited to only the labels and annotations. Furthermore, it is currently only allowed to add a label or annotation."),Object(o.b)("p",null," An example of an AssignMetadata adding a label ",Object(o.b)("inlineCode",{parentName:"p"},"owner")," set to ",Object(o.b)("inlineCode",{parentName:"p"},"admin"),":"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: AssignMetadata\nmetadata:\n  name: demo-annotation-owner\nspec:\n  match:\n    scope: Namespaced\n  location: "metadata.labels.owner"\n  parameters:\n    assign:\n      value: "admin"\n')),Object(o.b)("h2",{id:"examples"},"Examples"),Object(o.b)("h3",{id:"adding-an-annotation"},"Adding an annotation"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: AssignMetadata\nmetadata:\n  name: demo-annotation-owner\nspec:\n  match:\n    scope: Namespaced\n  location: "metadata.annotations.owner"\n  parameters:\n    assign:\n      value: "admin"\n')),Object(o.b)("h3",{id:"setting-security-context-of-a-specific-container-in-a-pod-in-a-namespace-to-be-privileged"},"Setting security context of a specific container in a Pod in a namespace to be privileged"),Object(o.b)("p",null,"Set the security context of container named ",Object(o.b)("inlineCode",{parentName:"p"},"foo")," in a Pod in namespace ",Object(o.b)("inlineCode",{parentName:"p"},"bar")," to be privileged"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-privileged\n  namespace: default\nspec:\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n    namespaces: ["bar"]\n  location: "spec.containers[name:foo].securityContext.privileged"\n  parameters:\n    assign:\n      value: false\n')),Object(o.b)("h4",{id:"setting-imagepullpolicy-of-all-containers-to-always-in-all-namespaces-except-namespace-system"},"Setting imagePullPolicy of all containers to Always in all namespaces except namespace ",Object(o.b)("inlineCode",{parentName:"h4"},"system")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-image-pull-policy\n  namespace: default\nspec:\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n    excludedNamespaces: ["system"]\n  location: "spec.containers[name:*].imagePullPolicy"\n  parameters:\n    assign:\n      value: Always\n')),Object(o.b)("h3",{id:"adding-a-network-sidecar-to-a-pod"},"Adding a ",Object(o.b)("inlineCode",{parentName:"h3"},"network")," sidecar to a Pod"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-sidecar\n  namespace: default\nspec:\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n  location: "spec.containers[name:networking]"\n  parameters:\n    assign:\n      value:\n        name: "networking"\n        imagePullPolicy: Always\n        image: quay.io/foo/bar:latest\n        command: ["/bin/bash", "-c", "sleep INF"]\n\n')),Object(o.b)("h3",{id:"adding-dnspolicy-and-dnsconfig-to-a-pod"},"Adding dnsPolicy and dnsConfig to a Pod"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-dns-policy\n  namespace: default\nspec:\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n  location: "spec.dnsPolicy"\n  parameters:\n    assign:\n      value: None\n---\napiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-dns-config\n  namespace: default\nspec:\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n  location: "spec.dnsConfig"\n  parameters:\n    assign:\n      value:\n        nameservers:\n        - 1.2.3.4\n')))}p.isMDXComponent=!0},99:function(e,n,a){"use strict";a.d(n,"a",(function(){return d})),a.d(n,"b",(function(){return b}));var t=a(0),i=a.n(t);function o(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function s(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function l(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?s(Object(a),!0).forEach((function(n){o(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function c(e,n){if(null==e)return{};var a,t,i=function(e,n){if(null==e)return{};var a,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var r=i.a.createContext({}),p=function(e){var n=i.a.useContext(r),a=n;return e&&(a="function"==typeof e?e(n):l(l({},n),e)),a},d=function(e){var n=p(e.components);return i.a.createElement(r.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},u=i.a.forwardRef((function(e,n){var a=e.components,t=e.mdxType,o=e.originalType,s=e.parentName,r=c(e,["components","mdxType","originalType","parentName"]),d=p(a),u=t,b=d["".concat(s,".").concat(u)]||d[u]||m[u]||o;return a?i.a.createElement(b,l(l({ref:n},r),{},{components:a})):i.a.createElement(b,l({ref:n},r))}));function b(e,n){var a=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var o=a.length,s=new Array(o);s[0]=u;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:t,s[1]=l;for(var r=2;r<o;r++)s[r]=a[r];return i.a.createElement.apply(null,s)}return i.a.createElement.apply(null,a)}u.displayName="MDXCreateElement"}}]);