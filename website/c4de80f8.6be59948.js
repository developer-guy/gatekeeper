(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{70:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var a=n(2),r=n(6),i=(n(0),n(78)),l={id:"install",title:"Installation"},o={unversionedId:"install",id:"install",isDocsHomePage:!1,title:"Installation",description:"Prerequisites",source:"@site/docs/install.md",slug:"/install",permalink:"/gatekeeper/website/docs/install",editUrl:"https://sozercan.github.io/gatekeeper/website/docs/docs/install.md",version:"current",sidebar:"someSidebar",previous:{title:"Introduction",permalink:"/gatekeeper/website/docs/"},next:{title:"Examples",permalink:"/gatekeeper/website/docs/examples"}},s=[{value:"Prerequisites",id:"prerequisites",children:[{value:"Minimum Kubernetes Version",id:"minimum-kubernetes-version",children:[]},{value:"RBAC Permissions",id:"rbac-permissions",children:[]}]},{value:"Installation",id:"installation",children:[{value:"Deploying a Release using Prebuilt Image",id:"deploying-a-release-using-prebuilt-image",children:[]},{value:"Deploying a Release using development image",id:"deploying-a-release-using-development-image",children:[]},{value:"Deploying HEAD Using make",id:"deploying-head-using-make",children:[]},{value:"Deploying via Helm",id:"deploying-via-helm",children:[]}]},{value:"Uninstallation",id:"uninstallation",children:[{value:"Using Prebuilt Image",id:"using-prebuilt-image",children:[]},{value:"Using make",id:"using-make",children:[]},{value:"Using Helm",id:"using-helm",children:[]}]}],c={rightToc:s};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(i.b)("h3",{id:"minimum-kubernetes-version"},"Minimum Kubernetes Version"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"To use Gatekeeper, you should have a minimum Kubernetes version of 1.14, which adds\nwebhook timeouts.")),Object(i.b)("p",null,"You can install Gatekeeper in earlier versions of Kubernetes either by\nremoving incompatible fields from the manifest or by setting ",Object(i.b)("inlineCode",{parentName:"p"},"--validate=false"),"\nwhen applying the manifest. Be warned that, without timeouts on the webhook, your\nAPI Server could timeout when Gatekeeper is down. Kubernetes 1.14 fixes this issue."),Object(i.b)("h3",{id:"rbac-permissions"},"RBAC Permissions"),Object(i.b)("p",null,"For either installation method, make sure you have cluster admin permissions:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"  kubectl create clusterrolebinding cluster-admin-binding \\\n    --clusterrole cluster-admin \\\n    --user <YOUR USER NAME>\n")),Object(i.b)("h2",{id:"installation"},"Installation"),Object(i.b)("h3",{id:"deploying-a-release-using-prebuilt-image"},"Deploying a Release using Prebuilt Image"),Object(i.b)("p",null,"If you want to deploy a released version of Gatekeeper in your cluster with a prebuilt image, then you can run the following command:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/release-3.1/deploy/gatekeeper.yaml\n")),Object(i.b)("h3",{id:"deploying-a-release-using-development-image"},"Deploying a Release using development image"),Object(i.b)("p",null,"If you want to deploy latest development version of Gatekeeper, you can use ",Object(i.b)("inlineCode",{parentName:"p"},"openpolicyagent/gatekeeper:dev")," tag or ",Object(i.b)("inlineCode",{parentName:"p"},"openpolicyagent/gateekeper:<SHA>"),"."),Object(i.b)("p",null,"Images are hosted in ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://hub.docker.com/r/openpolicyagent/gatekeeper/tags"}),"OPA Docker Hub repository"),"."),Object(i.b)("h3",{id:"deploying-head-using-make"},"Deploying HEAD Using make"),Object(i.b)("p",null,"Currently the most reliable way of installing Gatekeeper is to build and install from HEAD:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Make sure that:",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"You have Docker version 19.03 or later installed."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/kubernetes-sigs/kubebuilder#getting-started"}),"Kubebuilder")," and ",Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/kubernetes-sigs/kustomize/blob/master/docs/INSTALL.md"}),"Kustomize")," are installed."),Object(i.b)("li",{parentName:"ul"},"Your kubectl context is set to the desired installation cluster."),Object(i.b)("li",{parentName:"ul"},"You have a container registry you can write to that is readable by the target cluster."))),Object(i.b)("li",{parentName:"ul"},"Clone the Gatekeeper repository to your local system:",Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"git clone https://github.com/open-policy-agent/gatekeeper.git\n"))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"cd")," to the repository directory."),Object(i.b)("li",{parentName:"ul"},"Define your destination Docker image location:",Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"export DESTINATION_GATEKEEPER_DOCKER_IMAGE=<YOUR DESIRED DESTINATION DOCKER IMAGE>\n"))),Object(i.b)("li",{parentName:"ul"},"Build and push your Docker image:",Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),'make docker-buildx REPOSITORY="$DESTINATION_GATEKEEPER_DOCKER_IMAGE"\nmake docker-push-release REPOSITORY="$DESTINATION_GATEKEEPER_DOCKER_IMAGE"\n'))),Object(i.b)("li",{parentName:"ul"},"Finally, deploy:",Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),'make deploy REPOSITORY="$DESTINATION_GATEKEEPER_DOCKER_IMAGE"\n')))),Object(i.b)("h3",{id:"deploying-via-helm"},"Deploying via Helm"),Object(i.b)("p",null,"A basic Helm chart exists in ",Object(i.b)("inlineCode",{parentName:"p"},"charts/gatekeeper"),". If you have Helm installed, you can deploy via the following instructions for Helm v3:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts\nhelm install gatekeeper/gatekeeper --generate-name\n")),Object(i.b)("p",null,"If you are using the older Gatekeeper Helm repo location and Helm v3.3.2+, then use ",Object(i.b)("inlineCode",{parentName:"p"},"force-update")," to override the default behavior to update the existing repo."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts --force-update\n")),Object(i.b)("p",null,"Please note that this chart is compatible with Helm v3 starting with Gatekeeper v3.1.1. When using Helm v3, it is expected to see warnings regarding to ",Object(i.b)("inlineCode",{parentName:"p"},"crd-install")," hook. This is due to maintaining backwards compatibility with Helm v2 and should not impact the chart deployment."),Object(i.b)("p",null,"You can alter the variables in ",Object(i.b)("inlineCode",{parentName:"p"},"charts/gatekeeper/values.yaml")," to customize your deployment. To regenerate the base template, run ",Object(i.b)("inlineCode",{parentName:"p"},"make manifests"),"."),Object(i.b)("h2",{id:"uninstallation"},"Uninstallation"),Object(i.b)("h3",{id:"using-prebuilt-image"},"Using Prebuilt Image"),Object(i.b)("p",null,"If you used a prebuilt image to deploy Gatekeeper, then you can delete all the Gatekeeper components with the following command:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"kubectl delete -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/release-3.1/deploy/gatekeeper.yaml\n")),Object(i.b)("h3",{id:"using-make"},"Using make"),Object(i.b)("p",null,"If you used ",Object(i.b)("inlineCode",{parentName:"p"},"make")," to deploy, then run the following to uninstall Gatekeeper:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"cd to the repository directory"),Object(i.b)("li",{parentName:"ul"},"run ",Object(i.b)("inlineCode",{parentName:"li"},"make uninstall"))),Object(i.b)("h3",{id:"using-helm"},"Using Helm"),Object(i.b)("p",null,"If you used ",Object(i.b)("inlineCode",{parentName:"p"},"helm")," to deploy, then run the following to uninstall Gatekeeper:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"helm delete <release name>\n")),Object(i.b)("p",null,"Helm v3 will not cleanup Gatekeeper installed CRDs. Run the following to uninstall Gatekeeper CRDs:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"kubectl delete crd \\\n  configs.config.gatekeeper.sh \\\n  constraintpodstatuses.status.gatekeeper.sh \\\n  constrainttemplatepodstatuses.status.gatekeeper.sh \\\n  constrainttemplates.templates.gatekeeper.sh\n")),Object(i.b)("p",null,"This operation will also delete any user installed config changes, and constraint templates and constraints."))}p.isMDXComponent=!0},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,d=u["".concat(l,".").concat(m)]||u[m]||b[m]||i;return n?r.a.createElement(d,o(o({ref:t},c),{},{components:n})):r.a.createElement(d,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var c=2;c<i;c++)l[c]=n[c];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);