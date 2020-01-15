(this["webpackJsonpfaceapi-app"]=this["webpackJsonpfaceapi-app"]||[]).push([[0],{19:function(e,t,a){e.exports={wrapper:"setupFaceId_wrapper__2a1wQ",card_faceId:"setupFaceId_card_faceId__3Bm6B",card_faceId_active:"setupFaceId_card_faceId_active__2y8xM",instruct:"setupFaceId_instruct__v_0sy"}},50:function(e,t,a){e.exports=a(82)},59:function(e,t,a){},60:function(e,t,a){},74:function(e,t){},75:function(e,t){},76:function(e,t){},82:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a.n(n),c=a(20),o=a.n(c),i=a(26),s=a(33),l=(a(59),a(16)),u=a(45),d=a.n(u),p=(a(60),a(48)),f=a(15),m=a(22),h=a(23),v=a(27),b=a(24),w=a(28),g=(a(83),a(35)),I=a.n(g),E=a(4),x=a.n(E),y=a(43),_=a.n(y),D=function(){var e=localStorage.getItem("faceApiApp-faceIds");return null===e?(F([]),[]):JSON.parse(e)},F=function(e){localStorage.setItem("faceApiApp-faceIds",JSON.stringify(e))},O=function(e){if(e.descriptors){var t=[];e.descriptors.forEach((function(e){t.push(JSON.parse(e))})),e.formattedDescriptors=t}return e},k=function(){var e=D(),t={id:_()(),name:"New Face ID",descriptors:[],date_created:new Date,date_updated:new Date};e.push(t),F(e)},N=function(e,t){var a=D();t.date_updated=new Date;var n=-1;a.forEach((function(t,a){t.id===e&&(n=a)})),n>=0&&(a[n]=Object(f.a)({},a[n],{},t),F(a))},j=a(47),S=Object(j.a)({slice:"faceId",initial:{isLoading:!1,error:null,data:null,activeDataId:null},actions:{isLoading:function(e,t){return Object(f.a)({},e,{isLoading:t})},loadSuccess:function(e,t){return Object(f.a)({},e,{data:t})},setActiveDataId:function(e,t){return Object(f.a)({},e,{activeDataId:t})}}}),R=S.reducer,C=S.actions,M=function(){return function(e){!function(e){var t;x.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:(t=D()).forEach((function(e){e=O(e)})),e(null,t);case 3:case"end":return a.stop()}}))}((function(t,a){e(C.loadSuccess(a))}))}},A=a(19),B=a.n(A),L=a(44),P=a.n(L),U=a(12);function W(){var e;return x.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e="/faceapi-app/models",t.next=3,x.a.awrap(U.h(e));case 3:return t.next=5,x.a.awrap(U.f(e));case 5:return t.next=7,x.a.awrap(U.g(e));case 7:case"end":return t.stop()}}))}function J(e){var t,a,n,r,c,o,i=arguments;return x.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return t=i.length>1&&void 0!==i[1]?i[1]:512,a=.5,n=new U.c({inputSize:t,scoreThreshold:a}),r=!0,s.next=6,x.a.awrap(U.e(e));case 6:return c=s.sent,s.next=9,x.a.awrap(U.d(c,n).withFaceLandmarks(r).withFaceDescriptors());case 9:return o=s.sent,s.abrupt("return",o);case 11:case"end":return s.stop()}}))}function T(e){var t,a,n;return x.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return t=Object.keys(e),a=t.map((function(t){return new U.b(e[t].name,e[t].descriptors.map((function(e){return new Float32Array(e)})))})),n=new U.a(a,.5),r.abrupt("return",n);case 4:case"end":return r.stop()}}))}var H=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(a=Object(v.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(c)))).webcam=r.a.createRef(),a.state={fullDesc:null,detections:null,descriptors:null,faceMatcher:null,match:null,facingMode:null},a.componentWillMount=function(){return x.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.awrap(W());case 2:a.setInputDevice();case 3:case"end":return e.stop()}}))},a.setInputDevice=function(){navigator.mediaDevices.enumerateDevices().then((function(e){return x.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x.a.awrap(e.filter((function(e){return"videoinput"===e.kind})));case 2:if(!(t.sent.length<2)){t.next=8;break}return t.next=6,x.a.awrap(a.setState({facingMode:"user"}));case 6:t.next=10;break;case 8:return t.next=10,x.a.awrap(a.setState({facingMode:{exact:"environment"}}));case 10:a.startCapture();case 11:case"end":return t.stop()}}))}))},a.startCapture=function(){a.interval=setInterval((function(){a.capture()}),1e3)},a._setupMatcher=function(){var e;return x.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e=a.props.matcherProfile)){t.next=9;break}return t.t0=a,t.t1=e,t.next=6,x.a.awrap(T(e));case 6:t.t2=t.sent,t.t3={matcherProfile:t.t1,faceMatcher:t.t2},t.t0.setState.call(t.t0,t.t3);case 9:case"end":return t.stop()}}))},a.capture=function(){var e;return x.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(!a.webcam.current){t.next=9;break}return t.next=3,x.a.awrap(J(a.webcam.current.getScreenshot(),160).then((function(e){if(e){var t=e.map((function(e){return e.detection})),n=e.map((function(e){return e.descriptor}));a.props.onReceiveDescriptors&&a.props.onReceiveDescriptors(n.length>0?n:null),a.setState({detections:t,descriptors:n})}})));case 3:if(!a.state.descriptors||!a.state.faceMatcher){t.next=9;break}return t.next=6,x.a.awrap(a.state.descriptors.map((function(e){return a.state.faceMatcher.findBestMatch(e)})));case 6:(e=t.sent)&&e.length>0&&a.props.onReceiveMatch&&a.props.onReceiveMatch(e),a.setState({match:e});case 9:case"end":return t.stop()}}))},a}return Object(w.a)(t,e),Object(h.a)(t,[{key:"componentDidUpdate",value:function(e){e.matcherProfile!==this.state.matcherProfile&&this._setupMatcher()}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.props,t=e.width,a=void 0===t?window.innerWidth:t,n=e.height,c=void 0===n?window.innerHeight:n,o=e.activeProfileLabel,i=void 0===o?null:o,s=this.state,l=s.detections,u=s.match,d=s.facingMode,p=null;d&&(p={width:a,height:c,facingMode:d});var f=null;return l&&(f=l.map((function(e,t){var a=e.box.height,n=e.box.width,c=e.box._x,o=e.box._y,s=!1;u&&u[t]&&(s="unknown"!==u[t]._label&&u[t]._distance<.5)&&null!==i&&(s=u[t]._label===i);var l=s?"green":"blue";return r.a.createElement("div",{key:t},r.a.createElement("div",{style:{position:"absolute",border:"solid",borderColor:l,height:a,width:n,transform:"translate(".concat(c,"px,").concat(o,"px)")}},s?r.a.createElement("div",{className:"d-flex justify-content-between align-items-center",style:{backgroundColor:l,border:"solid",borderColor:l,width:n,marginTop:0,color:"#fff",transform:"translate(-3px,".concat(a,"px)")}},r.a.createElement("span",null,u[t]._label),r.a.createElement("span",null,u[t]._distance.toFixed(2))):null))}))),r.a.createElement("div",{className:"Camera",style:{display:"flex",flexDirection:"column",alignItems:"center"}},r.a.createElement("div",{style:{width:a,height:c}},r.a.createElement("div",{style:{position:"relative",width:a}},p?r.a.createElement("div",{style:{position:"absolute"}},r.a.createElement(P.a,{audio:!1,width:a,height:c,ref:this.webcam,screenshotFormat:"image/jpeg",videoConstraints:p})):null,f||null)))}}]),t}(n.Component),X=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(v.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(r)))).descriptors=null,a.recordDescriptors=null,a.state={booleans:{isRecording:!1}},a._toggleBoolean=function(e){var t=Object(f.a)({},a.state.booleans);t[e]=!t[e],a.setState({booleans:t})},a._updateFaceId=function(){var e,t=a.props,n=t.faceIds,r=t.activeFaceId,c=t.updateFaceId,o=null;(n.forEach((function(e){e.id===r&&(o=e)})),null!==o&&null!==a.descriptors)&&c(r,{descriptors:[].concat(Object(p.a)(null!==(e=o.descriptors)&&void 0!==e?e:[]),["[".concat(a.descriptors.toString(),"]")])})},a}return Object(w.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.faceIds,a=e.getFaceIds;null===t&&a()}},{key:"render",value:function(){var e=this,t=this.state.booleans.isRecording,a=this.props,n=a.faceIds,c=a.activeFaceId,o=a.setActiveFaceId,i=a.createFaceId,s=a.updateFaceId,l=null;c&&n&&n.forEach((function(e){e.id===c&&(l=e)}));var u=null;if(null!==n){var d={},p=!1;n.forEach((function(e,t){e.formattedDescriptors&&e.formattedDescriptors.length>0&&(d["face-".concat(t)]={name:e.name,descriptors:e.formattedDescriptors},p=!0)})),p&&(u=d)}return r.a.createElement("div",{className:B.a.wrapper},r.a.createElement("h3",null,"Face Recognition"),r.a.createElement("hr",null),r.a.createElement("div",{className:"row text-left"},r.a.createElement("div",{className:"col-md-2 col-lg-2"},r.a.createElement("h5",{className:"mb-2"},"Select a Face ID:"),n&&n.map((function(e,t){var a=e.id,n=e.name,i=e.descriptors;return r.a.createElement("div",{key:t,className:I()(B.a.card_faceId,c===a?B.a.card_faceId_active:""),onClick:function(){o(c===a?null:a)}},r.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},r.a.createElement("span",null,n),r.a.createElement("span",null,i?i.length:0)))})),r.a.createElement("button",{className:"btn btn-outline-dark",onClick:function(){return i()}},r.a.createElement("i",{className:"fas fa-plus mr-2"}),r.a.createElement("span",null,"New FaceID"))),r.a.createElement("div",{className:"col-md-8 col-lg-8"},r.a.createElement("div",{className:"d-flex align-items-center mb-3"},l&&r.a.createElement("input",{type:"text",className:"form-element mr-2",placeholder:"FaceID User's Name",value:l.name,onChange:function(e){s(c,{name:e.target.value})}}),r.a.createElement("button",{className:"btn btn-sm btn-primary mr-2",onClick:function(){return e._updateFaceId()},disabled:null===c||t},"Add Descriptors"),r.a.createElement("button",{className:I()("btn btn-sm mr-2",t?"btn-danger":"btn-primary"),onClick:function(){if(t){var a=[];e.recordDescriptors.forEach((function(e){a.push("[".concat(e,"]"))})),s(c,{descriptors:a})}else e.recordDescriptors=[];e._toggleBoolean("isRecording")},disabled:null===c},r.a.createElement("i",{className:"fas fa-video mr-2"}),r.a.createElement("span",null,t?"Stop Record":"Record"))),r.a.createElement(H,{matcherProfile:u,onReceiveDescriptors:function(a){if(e.descriptors=a,t&&a){var n=a.toString();e.recordDescriptors.indexOf(n)<0&&e.recordDescriptors.push(n)}},isRecording:t,width:7.8*window.innerWidth/12,height:.8*window.innerHeight})),r.a.createElement("div",{className:"col-md-2 col-lg-2"},r.a.createElement("div",{className:B.a.instruct},r.a.createElement("h5",null,"Instruction:"),r.a.createElement("p",null,'1. Click "+ New FaceID" on the left panel to create a new FaceID.'),r.a.createElement("p",null,"2. Click on any of the FaceID on the list to edit it."),r.a.createElement("p",null,'3. The "Add Descriptors" and "Record" button should be enabled when a FaceID is selected.'),r.a.createElement("p",null,'4. Click on "Add Descriptors" to store a copy of the descriptors data that is generated when a face is detected (green box).'),r.a.createElement("p",null,'5. Click on "Record" to start the FaceID anew, move your head around all directions slowly. All the descriptors data will be collected every second, and will be stored in your browser\'s local storage on "Record" button is toggle off.')))))}}]),t}(r.a.Component),z=Object(i.b)((function(e){return{faceIds:e.faceIdReducer.data,activeFaceId:e.faceIdReducer.activeDataId}}),(function(e){return{getFaceIds:function(){return e(M())},setActiveFaceId:function(t){return e(function(e){return function(t){t(C.setActiveDataId(e))}}(t))},createFaceId:function(){return e((function(e){return x.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:k(),e(M());case 2:case"end":return t.stop()}}))}))},updateFaceId:function(t,a){return e(function(e,t){return function(a){return x.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:N(e,t),a(M());case 2:case"end":return n.stop()}}))}}(t,a))}}}))(X),Q=function(){return console.log("PUBLIC_URL","/faceapi-app"),r.a.createElement("div",{className:"App"},r.a.createElement(l.b,{history:d()({basename:"/faceapi-app"})},r.a.createElement(l.a,{exact:!0,path:"/",component:z})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var V=a(14),$=a(46),q=Object(V.c)({faceIdReducer:R});var G=function(e){var t=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||V.d;return Object(V.e)(q,e,t(Object(V.a)($.a)))}();o.a.render(r.a.createElement(i.a,{store:G},r.a.createElement(s.a,null,r.a.createElement(Q,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[50,1,2]]]);
//# sourceMappingURL=main.6114145b.chunk.js.map