"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8729],{3905:function(e,n,a){a.d(n,{Zo:function(){return p},kt:function(){return u}});var t=a(7294);function i(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function o(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function s(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?o(Object(a),!0).forEach((function(n){i(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function l(e,n){if(null==e)return{};var a,t,i=function(e,n){if(null==e)return{};var a,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var r=t.createContext({}),c=function(e){var n=t.useContext(r),a=n;return e&&(a="function"==typeof e?e(n):s(s({},n),e)),a},p=function(e){var n=c(e.components);return t.createElement(r.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var a=e.components,i=e.mdxType,o=e.originalType,r=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(a),u=i,g=m["".concat(r,".").concat(u)]||m[u]||d[u]||o;return a?t.createElement(g,s(s({ref:n},p),{},{components:a})):t.createElement(g,s({ref:n},p))}));function u(e,n){var a=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=a.length,s=new Array(o);s[0]=m;var l={};for(var r in n)hasOwnProperty.call(n,r)&&(l[r]=n[r]);l.originalType=e,l.mdxType="string"==typeof e?e:i,s[1]=l;for(var c=2;c<o;c++)s[c]=a[c];return t.createElement.apply(null,s)}return t.createElement.apply(null,a)}m.displayName="MDXCreateElement"},4985:function(e,n,a){a.r(n),a.d(n,{frontMatter:function(){return l},contentTitle:function(){return r},metadata:function(){return c},toc:function(){return p},default:function(){return m}});var t=a(7462),i=a(3366),o=(a(7294),a(3905)),s=["components"],l={id:"mutation",title:"Mutation"},r=void 0,c={unversionedId:"mutation",id:"version-v3.6.x/mutation",isDocsHomePage:!1,title:"Mutation",description:"The mutation feature allows Gatekeeper to not only validate created Kubernetes resources but also modify them based on defined mutation policies.",source:"@site/versioned_docs/version-v3.6.x/mutation.md",sourceDirName:".",slug:"/mutation",permalink:"/gatekeeper/website/docs/mutation",editUrl:"https://github.com/open-policy-agent/gatekeeper/edit/master/website/versioned_docs/version-v3.6.x/mutation.md",tags:[],version:"v3.6.x",frontMatter:{id:"mutation",title:"Mutation"},sidebar:"version-v3.6.x/docs",previous:{title:"Failing Closed",permalink:"/gatekeeper/website/docs/failing-closed"},next:{title:"Constraint Templates",permalink:"/gatekeeper/website/docs/constrainttemplates"}},p=[{value:"Mutation CRDs",id:"mutation-crds",children:[{value:"Extent of changes",id:"extent-of-changes",children:[],level:4},{value:"Intent",id:"intent",children:[{value:"Conditionals",id:"conditionals",children:[],level:5}],level:4},{value:"AssignMetadata",id:"assignmetadata",children:[],level:3}],level:2},{value:"Examples",id:"examples",children:[{value:"Adding an annotation",id:"adding-an-annotation",children:[],level:3},{value:"Setting security context of a specific container in a Pod in a namespace to be non-privileged",id:"setting-security-context-of-a-specific-container-in-a-pod-in-a-namespace-to-be-non-privileged",children:[{value:"Setting imagePullPolicy of all containers to Always in all namespaces except namespace <code>system</code>",id:"setting-imagepullpolicy-of-all-containers-to-always-in-all-namespaces-except-namespace-system",children:[],level:4}],level:3},{value:"Adding a <code>network</code> sidecar to a Pod",id:"adding-a-network-sidecar-to-a-pod",children:[],level:3},{value:"Adding dnsPolicy and dnsConfig to a Pod",id:"adding-dnspolicy-and-dnsconfig-to-a-pod",children:[],level:3}],level:2}],d={toc:p};function m(e){var n=e.components,a=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,t.Z)({},d,a,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The mutation feature allows Gatekeeper to not only validate created Kubernetes resources but also modify them based on defined mutation policies.\nThe feature is still in an alpha stage, so the final form can still change."),(0,o.kt)("p",null,"Status: alpha"),(0,o.kt)("h2",{id:"mutation-crds"},"Mutation CRDs"),(0,o.kt)("p",null,"The mutation policies are defined by means of mutation specific CRDs:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"AssignMetadata - defines changes to the metadata section of a resource"),(0,o.kt)("li",{parentName:"ul"},"Assign - any change outside the metadata section")),(0,o.kt)("p",null,"The rules of mutating the metadata section are more strict than for mutating the rest of the resource definition. The differences will be described in more detail below."),(0,o.kt)("p",null,"Here is an example of a simple AssignMetadata CRD:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: AssignMetadata\nmetadata:\n  name: demo-annotation-owner\nspec:\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n  location: "metadata.annotations.owner"\n  parameters:\n    assign:\n      value:  "admin"\n')),(0,o.kt)("p",null,"Each mutation CRD can be divided into 3 distinct sections:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"extent of changes - what is to be modified (kinds, namespaces, ...)"),(0,o.kt)("li",{parentName:"ul"},"intent - the path and value of the modification"),(0,o.kt)("li",{parentName:"ul"},"conditional - conditions under which the mutation will be applied")),(0,o.kt)("h4",{id:"extent-of-changes"},"Extent of changes"),(0,o.kt)("p",null,"The extent of changes section describes the resource which will be mutated.\nIt allows to filter the resources to be mutated by kind, label and namespace."),(0,o.kt)("p",null,"An example of the extent of changes section."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'applyTo:\n- groups: [""]\n  kinds: ["Pod"]\n  versions: ["v1"]\nmatch:\n  scope: Namespaced | Cluster\n  kinds:\n  - APIGroups: []\n    kinds: []\n  labelSelector: []\n  namespaces: []\n  namespaceSelector: []\n  excludedNamespaces: []\n')),(0,o.kt)("p",null,"Note that the ",(0,o.kt)("inlineCode",{parentName:"p"},"applyTo")," section applies to the Assign CRD only. It allows filtering of resources by the resource GVK (group version kind). Note that the ",(0,o.kt)("inlineCode",{parentName:"p"},"applyTo")," section does not accept globs."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"match")," section is common to both Assign and AssignMetadata. It supports the following elements:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"scope - the scope (Namespaced | Cluster) of the mutated resource"),(0,o.kt)("li",{parentName:"ul"},"kinds - the resource kind, any of the elements listed"),(0,o.kt)("li",{parentName:"ul"},"labelSelector - filters resources by resource labels listed"),(0,o.kt)("li",{parentName:"ul"},"namespaces - list of allowed namespaces, only resources in listed namespaces will be mutated"),(0,o.kt)("li",{parentName:"ul"},"namespaceSelector - filters resources by namespace selector"),(0,o.kt)("li",{parentName:"ul"},"excludedNamespaces - list of excluded namespaces, resources in listed namespaces will not be mutated")),(0,o.kt)("p",null,"Note that the resource is not filtered if an element is not present or an empty list."),(0,o.kt)("h4",{id:"intent"},"Intent"),(0,o.kt)("p",null,"This specifies what should be changed in the resource."),(0,o.kt)("p",null,"An example of the section is shown below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'location: "spec.containers[name:foo].imagePullPolicy"\nparameters:\n  assign:\n    value: "Always"\n')),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"location")," element specifies the path to be modified.\nThe ",(0,o.kt)("inlineCode",{parentName:"p"},"parameters.assign.value")," element specifies the value to be set for the element specified in ",(0,o.kt)("inlineCode",{parentName:"p"},"location"),". Note that the value can either be a simple string or a composite value."),(0,o.kt)("p",null,"An example of a composite value:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'location: "spec.containers[name:networking]"\nparameters:\n  assign:\n    value:\n      name: "networking"\n      imagePullPolicy: Always\n\n')),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"location")," element can specify either a simple subelement or an element in a list.\nFor example the location ",(0,o.kt)("inlineCode",{parentName:"p"},"spec.containers[name:foo].imagePullPolicy")," would be parsed as follows:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"*spec"),".containers","[name:foo]",".imagePullPolicy* - the spec element"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("em",{parentName:"li"},"spec.",(0,o.kt)("strong",{parentName:"em"},"containers","[name:foo]"),".imagePullPolicy")," - container subelement of spec. The container element is a list. Out of the list chosen, an element with the ",(0,o.kt)("inlineCode",{parentName:"li"},"name")," element having the value ",(0,o.kt)("inlineCode",{parentName:"li"},"foo"),"."),(0,o.kt)("li",{parentName:"ul"},"*spec.containers","[name:foo]",".",(0,o.kt)("strong",{parentName:"li"},"imagePullPolicy*")," - in the element from the list chosen in the previous step the element ",(0,o.kt)("inlineCode",{parentName:"li"},"imagePullPolicy")," is chosen")),(0,o.kt)("p",null,"The yaml illustrating the above ",(0,o.kt)("inlineCode",{parentName:"p"},"location"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"spec:\n  containers:\n  - name: foo\n    imagePullPolicy:\n")),(0,o.kt)("p",null,"Wildcards can be used for list element values: ",(0,o.kt)("inlineCode",{parentName:"p"},"spec.containers[name:*].imagePullPolicy")),(0,o.kt)("h5",{id:"conditionals"},"Conditionals"),(0,o.kt)("p",null,"The conditions for updating the resource."),(0,o.kt)("p",null,'Mutation has path tests, which make it so the resource will only be mutated if the specified path exists/does not exist.\nThis can be useful for things like setting a default value if a field is undeclared, or for avoiding creating a field\nwhen a parent is missing, such as accidentally creating an empty sidecar named "foo" in the example below:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'parameters:\n  pathTests:\n  - subPath: "spec.containers[name:foo]"\n    condition: MustExist\n  - subPath: spec.containers[name:foo].securityContext.capabilities\n    condition: MustNotExist\n')),(0,o.kt)("h3",{id:"assignmetadata"},"AssignMetadata"),(0,o.kt)("p",null,"AssignMetadata is a CRD for modifying the metadata section of a resource. Note that the metadata of a resource is a very sensitive piece of data, and certain mutations could result in unintended consequences. An example of this could be changing the name or namespace of a resource. The AssignMetadata changes have therefore been limited to only the labels and annotations. Furthermore, it is currently only allowed to add a label or annotation."),(0,o.kt)("p",null," An example of an AssignMetadata adding a label ",(0,o.kt)("inlineCode",{parentName:"p"},"owner")," set to ",(0,o.kt)("inlineCode",{parentName:"p"},"admin"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: AssignMetadata\nmetadata:\n  name: demo-annotation-owner\nspec:\n  match:\n    scope: Namespaced\n  location: "metadata.labels.owner"\n  parameters:\n    assign:\n      value: "admin"\n')),(0,o.kt)("h2",{id:"examples"},"Examples"),(0,o.kt)("h3",{id:"adding-an-annotation"},"Adding an annotation"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: AssignMetadata\nmetadata:\n  name: demo-annotation-owner\nspec:\n  match:\n    scope: Namespaced\n  location: "metadata.annotations.owner"\n  parameters:\n    assign:\n      value: "admin"\n')),(0,o.kt)("h3",{id:"setting-security-context-of-a-specific-container-in-a-pod-in-a-namespace-to-be-non-privileged"},"Setting security context of a specific container in a Pod in a namespace to be non-privileged"),(0,o.kt)("p",null,"Set the security context of container named ",(0,o.kt)("inlineCode",{parentName:"p"},"foo")," in a Pod in namespace ",(0,o.kt)("inlineCode",{parentName:"p"},"bar")," to be non-privileged"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-privileged\nspec:\n  applyTo:\n  - groups: [""]\n    kinds: ["Pod"]\n    versions: ["v1"]\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n    namespaces: ["bar"]\n  location: "spec.containers[name:foo].securityContext.privileged"\n  parameters:\n    assign:\n      value: false\n')),(0,o.kt)("h4",{id:"setting-imagepullpolicy-of-all-containers-to-always-in-all-namespaces-except-namespace-system"},"Setting imagePullPolicy of all containers to Always in all namespaces except namespace ",(0,o.kt)("inlineCode",{parentName:"h4"},"system")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-image-pull-policy\nspec:\n  applyTo:\n  - groups: [""]\n    kinds: ["Pod"]\n    versions: ["v1"]\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n    excludedNamespaces: ["system"]\n  location: "spec.containers[name:*].imagePullPolicy"\n  parameters:\n    assign:\n      value: Always\n')),(0,o.kt)("h3",{id:"adding-a-network-sidecar-to-a-pod"},"Adding a ",(0,o.kt)("inlineCode",{parentName:"h3"},"network")," sidecar to a Pod"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-sidecar\nspec:\n  applyTo:\n  - groups: [""]\n    kinds: ["Pod"]\n    versions: ["v1"]\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n  location: "spec.containers[name:networking]"\n  parameters:\n    assign:\n      value:\n        name: "networking"\n        imagePullPolicy: Always\n        image: quay.io/foo/bar:latest\n        command: ["/bin/bash", "-c", "sleep INF"]\n\n')),(0,o.kt)("h3",{id:"adding-dnspolicy-and-dnsconfig-to-a-pod"},"Adding dnsPolicy and dnsConfig to a Pod"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-dns-policy\nspec:\n  applyTo:\n  - groups: [""]\n    kinds: ["Pod"]\n    versions: ["v1"]\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n  location: "spec.dnsPolicy"\n  parameters:\n    assign:\n      value: None\n---\napiVersion: mutations.gatekeeper.sh/v1alpha1\nkind: Assign\nmetadata:\n  name: demo-dns-config\nspec:\n  applyTo:\n  - groups: [""]\n    kinds: ["Pod"]\n    versions: ["v1"]\n  match:\n    scope: Namespaced\n    kinds:\n    - apiGroups: ["*"]\n      kinds: ["Pod"]\n  location: "spec.dnsConfig"\n  parameters:\n    assign:\n      value:\n        nameservers:\n        - 1.2.3.4\n')))}m.isMDXComponent=!0}}]);