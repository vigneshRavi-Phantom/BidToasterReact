(this.webpackJsonpbidtoaster=this.webpackJsonpbidtoaster||[]).push([[9],{103:function(e,n,t){"use strict";t.d(n,"a",(function(){return r})),t.d(n,"b",(function(){return a})),t(366).config();var r="http://23.101.24.189/graphql",a="_bidtoaster_"},143:function(e,n,t){"use strict";t.d(n,"a",(function(){return h})),t.d(n,"b",(function(){return v}));var r=t(4),a=t.n(r),c=t(12),o=t(15),u=t(2),s=t(223),i=t.n(s),l=t(224),d=t(39),p=t(3),b="en",f="appLanguage",j=new i.a({en:l}),O=Object(u.createContext)({strings:j,setAppLanguage:function(e){},appLanguage:b}),h=function(e){var n=e.children,t=Object(u.useState)(b),r=Object(o.a)(t,2),s=r[0],i=r[1],l=function(e){j.setLanguage(e),i(e),Object(d.d)(f,e)};return Object(u.useEffect)((function(){console.debug("[LocalizationContext] Setup app lang"),function(){var e=Object(c.a)(a.a.mark((function e(){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.b)(f);case 2:n=e.sent,l(n||b);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),Object(p.jsx)(O.Provider,{value:{strings:j,setAppLanguage:l,appLanguage:s},children:n})},v=function(){var e=Object(u.useContext)(O);if(void 0===e)throw new Error("useLocalization must be used within a LocalizationContext");return e}},144:function(e,n,t){"use strict";t.d(n,"a",(function(){return l})),t.d(n,"b",(function(){return d}));var r=t(15),a=t(17),c=t(2),o=t.n(c),u=t(3),s={isModal:!1,modalData:null,isDeleteModal:!1,openModal:function(){},closeModal:function(){},openDeleteModal:function(){},deleteModalData:null,closeDeleteModal:function(){}},i=Object(c.createContext)(s),l=function(e){var n=e.children,t=Object(c.useReducer)((function(e,n){switch(n.name){case"MODAL":return Object(a.a)(Object(a.a)({},e),{},{isModal:!e.isModal,modalData:n.modalData});case"DELETE_MODAL":return Object(a.a)(Object(a.a)({},e),{},{isDeleteModal:!e.isDeleteModal,deleteModalData:n.deleteModalData});default:return Object(a.a)({},e)}}),s),l=Object(r.a)(t,2),d=l[0],p=l[1],b=o.a.useMemo((function(){return{openModal:function(e){p({name:"MODAL",modalData:e})},closeModal:function(){p({name:"MODAL",modalData:null})},openDeleteModal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;p({name:"DELETE_MODAL",deleteModalData:e})},closeDeleteModal:function(){p({name:"DELETE_MODAL",deleteModalData:null})}}}),[]);return Object(u.jsx)(i.Provider,{value:Object(a.a)(Object(a.a)({},d),b),children:n})},d=function(){var e=Object(c.useContext)(i);if(void 0===e)throw new Error("useModal must be used within a ModalContext");return e}},145:function(e,n,t){"use strict";t(2);var r=t(388),a=t(389),c=t(3);n.a=function(){return Object(c.jsx)(r.a,{style:{width:"100%",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},children:Object(c.jsx)(a.a,{animation:"border",variant:"dark"})})}},224:function(e){e.exports=JSON.parse('{"no_data_found":"No result found :(","are_you_sure":"Are you sure you want to delete?","text.edit":"edit","text.delete":"delete","error.e10100":"Something went wrong.","error.e10101":"Invalid login creditials.","error.e10102":"Invalid token.","error.e10103":"Invalid OTP code.","error.e10104":"Email already exists.","error.e101043":"Vendor does not exists in our database.","error.e101044":"Vendor already added in your organization.","error.e10105":"Email not exists.","error.e10106":"Password invalid.","error.e10107":"File upload failed.","error.e10108":"Data cannot be deleted.","error.are_you_robot":"Are you a robot?","error.full_name_empty":"Full name cannot be empty.","error.email_empty":"Email cannot be empty.","error.email_invalid":"Email is invalid.","error.phone_number_empty":"Phone number cannot be empty.","error.phone_number_invalid":"Must be valid phone number.","error.password_empty":"Password cannot be empty.","error.password_format":"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character.","error.plan_name_empty":"Plan name cannot be empty.","title.login":"Login","title.signup":"Sign up","button.delete":"Delete","button.cancel":"Cancel","button.login":"Login","button.signup":"Sign up","button.save":"Save","button.verify":"Verify","button.subscribe_now":"Subscribe now","forgot_password":"Forgot Password?","profile.profile_update":"Profile updated.","subscription.order_summary":"Order Summary","plans.plans":"Plans","plans.add_plan":"Add Plan","plans.update_plan":"Update Plan","plans.delete_plan":"Delete Plan","plans.plan_name":"Plan name","plans.plan_add_success":"Plan added","plans.plan_update_success":"Plan updated"}')},260:function(e,n){},262:function(e,n){},275:function(e,n){},277:function(e,n){},305:function(e,n){},307:function(e,n){},308:function(e,n){},313:function(e,n){},315:function(e,n){},334:function(e,n){},346:function(e,n){},349:function(e,n){},382:function(e,n,t){},384:function(e,n,t){},385:function(e,n,t){},386:function(e,n,t){},387:function(e,n,t){"use strict";t.r(n);var r=t(2),a=t.n(r),c=t(140),o=t.n(c),u=t(107),s=t(9),i=t(145),l=t(67),d=t(3),p=Object(r.lazy)((function(){return t.e(32).then(t.bind(null,714))})),b=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(4),t.e(21)]).then(t.bind(null,746))})),f=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(4),t.e(7),t.e(35)]).then(t.bind(null,722))})),j=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(4),t.e(7),t.e(36)]).then(t.bind(null,724))})),O=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(4),t.e(8),t.e(17)]).then(t.bind(null,725))})),h=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(4),t.e(18)]).then(t.bind(null,726))})),v=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(4),t.e(19)]).then(t.bind(null,727))})),m=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(3),t.e(34),t.e(33)]).then(t.bind(null,745))})),x=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(20)]).then(t.bind(null,732))})),w=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(5),t.e(31)]).then(t.bind(null,733))})),y=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(5),t.e(30)]).then(t.bind(null,734))})),g=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(5),t.e(29)]).then(t.bind(null,735))})),k=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(5),t.e(24)]).then(t.bind(null,736))})),P=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(16)]).then(t.bind(null,737))})),C=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(8),t.e(14)]).then(t.bind(null,738))})),T=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(2),t.e(3),t.e(22)]).then(t.bind(null,739))})),_=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(15)]).then(t.bind(null,740))})),q=Object(r.lazy)((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(13)]).then(t.bind(null,741))}));function $(e){var n=e.children,t=Object(l.b)().accessToken,r=Object(s.f)();return void 0===t?null:t?Object(d.jsx)(s.a,{to:"/dashboard",state:{from:r}}):n}function D(e){var n=e.children,t=Object(l.b)().accessToken,r=Object(s.f)();return void 0===t?null:t?n:Object(d.jsx)(s.a,{to:"/login",state:{from:r}})}var L=function(){return Object(d.jsx)(r.Suspense,{fallback:Object(d.jsx)(i.a,{}),children:Object(d.jsxs)(s.d,{children:[Object(d.jsx)(s.b,{path:"*",element:Object(d.jsx)(p,{})}),Object(d.jsx)(s.b,{path:"/",element:Object(d.jsx)(b,{})}),Object(d.jsx)(s.b,{path:"/login",element:Object(d.jsx)($,{children:Object(d.jsx)(f,{})})}),Object(d.jsx)(s.b,{path:"/signup",element:Object(d.jsx)($,{children:Object(d.jsx)(j,{})})}),Object(d.jsx)(s.b,{path:"/vendor-signup",element:Object(d.jsx)($,{children:Object(d.jsx)(O,{})})}),Object(d.jsx)(s.b,{path:"/forgot-password",element:Object(d.jsx)($,{children:Object(d.jsx)(h,{})})}),Object(d.jsx)(s.b,{path:"/reset-password/:token",element:Object(d.jsx)($,{children:Object(d.jsx)(v,{})})}),Object(d.jsx)(s.b,{path:"/dashboard",element:Object(d.jsx)(D,{children:Object(d.jsx)(m,{})})}),Object(d.jsx)(s.b,{path:"/settings/reset-password",element:Object(d.jsx)(D,{children:Object(d.jsx)(x,{})})}),Object(d.jsx)(s.b,{path:"/users",element:Object(d.jsx)(D,{children:Object(d.jsx)(w,{})})}),Object(d.jsx)(s.b,{path:"/org-vendors",element:Object(d.jsx)(D,{children:Object(d.jsx)(y,{})})}),Object(d.jsx)(s.b,{path:"/org-items",element:Object(d.jsx)(D,{children:Object(d.jsx)(g,{})})}),Object(d.jsx)(s.b,{path:"/rfq",element:Object(d.jsx)(D,{children:Object(d.jsx)(k,{})})}),Object(d.jsx)(s.b,{path:"/vendor/rfq/view/:id",element:Object(d.jsx)(D,{children:Object(d.jsx)(P,{})})}),Object(d.jsx)(s.b,{path:"/buyer/rfq/view/:id",element:Object(d.jsx)(D,{children:Object(d.jsx)(C,{})})}),Object(d.jsx)(s.b,{path:"/profile",element:Object(d.jsx)(D,{children:Object(d.jsx)(T,{})})}),Object(d.jsx)(s.b,{path:"/vendor-profile",element:Object(d.jsx)(D,{children:Object(d.jsx)(_,{})})}),Object(d.jsx)(s.b,{path:"/comparison",element:Object(d.jsx)(D,{children:Object(d.jsx)(q,{})})})]})})},E=t(143),M=t(144),R=t(17),A=t(22),S=t(132),z=t(216),I=t(399),V=t(398),U=t(397),N=t.n(U),F=t(103),G=t(39),J=new A.a((function(e,n){return e.setContext((function(e){var n=e.headers;return{headers:Object(R.a)({authorization:Object(G.c)()?Object(G.c)():""},n)}})),n(e)})),B=N()({uri:F.a,credentials:"same-origin"}),Q=new S.a({link:Object(z.a)([J.concat(B)]),cache:new I.a}),H=V.a,K=function(){return Object(d.jsx)(u.a,{children:Object(d.jsx)(H,{client:Q,children:Object(d.jsx)(E.a,{children:Object(d.jsx)(l.a,{children:Object(d.jsx)(M.a,{children:Object(d.jsx)(L,{})})})})})})},W=function(e){e&&e instanceof Function&&t.e(37).then(t.bind(null,742)).then((function(n){var t=n.getCLS,r=n.getFID,a=n.getFCP,c=n.getLCP,o=n.getTTFB;t(e),r(e),a(e),c(e),o(e)}))};t(382),t(383),t(384),t(385),t(386);o.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(K,{})}),document.getElementById("root")),W()},39:function(e,n,t){"use strict";t.d(n,"d",(function(){return s})),t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return l})),t.d(n,"e",(function(){return d})),t.d(n,"a",(function(){return p}));var r=t(4),a=t.n(r),c=t(12),o=t(219),u=t.n(o),s=function(){var e=Object(c.a)(a.a.mark((function e(n,t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,null;case 3:return e.abrupt("return",localStorage.setItem(n,t));case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(n,t){return e.apply(this,arguments)}}(),i=function(){var e=Object(c.a)(a.a.mark((function e(n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,null;case 3:return e.abrupt("return",localStorage.getItem(n));case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(n){return e.apply(this,arguments)}}(),l=function(){var e=null,n=localStorage.getItem("bt.token");if(null!==n&&n){var t=JSON.parse(n);null!==t&&void 0!==t.accessToken&&(e=t.accessToken)}return e};function d(e,n){if(e.length>0){for(var t=!1,r=0;r<n.length;r++){var a=n[r];if(e.substr(e.length-a.length,a.length).toLowerCase()===a.toLowerCase()){t=!0;break}}if(!t)return!1}return!0}function p(e){return b.apply(this,arguments)}function b(){return(b=Object(c.a)(a.a.mark((function e(n){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u()({method:"post",url:"http://52.187.104.169:5001/dashboard_comparison/",data:n});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},43:function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"a",(function(){return a}));var r=function(e,n){return n&&n[e]&&"1"===n[e].responseCode},a=function(e){var n="";return e.networkError?n=e.networkError:e.graphQLErrors&&e.graphQLErrors.forEach((function(e){n=e.message})),n}},67:function(e,n,t){"use strict";t.d(n,"a",(function(){return E})),t.d(n,"b",(function(){return M}));var r,a,c,o,u,s=t(17),i=t(15),l=t(4),d=t.n(l),p=t(12),b=t(2),f=t.n(b),j=t(39),O=t(43),h=t(221),v=t(400),m=t(16),x=t(13),w=Object(x.a)(r||(r=Object(m.a)(["\n    query($input: LoginRequest) {\n      login(input: $input) {\n          responseCode\n          data\n      }\n    }\n"]))),y=Object(x.a)(a||(a=Object(m.a)(["\n    query($input: ForgotPasswordRequest) {\n      forgotPassword(input: $input) {\n          responseCode\n          data\n      }\n    }\n"]))),g=Object(x.a)(c||(c=Object(m.a)(["\n    query($input: ResetPasswordRequest) {\n      resetPassword(input: $input) {\n          responseCode\n          data\n      }\n    }\n"]))),k=Object(x.a)(o||(o=Object(m.a)(["\n    query($input: PasswordResetTokenValidRequest) {\n      passwordResetTokenValid(input: $input) {\n          responseCode\n          data\n      }\n    }\n"]))),P=Object(x.a)(u||(u=Object(m.a)(["\n    query($input: RefreshTokenRequest) {\n      refreshToken(input: $input) {\n          responseCode\n          data\n      }\n    }\n"]))),C=t(83),T=t(220),_=t.n(T),q=t(103),$=t(3),D={userType:"INIT",error:void 0,accessToken:void 0,userAccessType:"buyer",refetchAccountProfile:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),signup:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),vendorSignup:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),login:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),forgotPassword:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),resetPassword:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),isPasswordResetTokenValid:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),refreshToken:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),logout:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},L=Object(b.createContext)(D),E=function(e){var n=e.children,t=Object(h.a)(),r=Object(v.a)(C.k),a=Object(i.a)(r,1)[0],c=Object(v.a)(C.o),o=Object(i.a)(c,1)[0],u=Object(b.useReducer)((function(e,n){switch(n.name){case"LOG_IN":return Object(s.a)(Object(s.a)({},e),{},{userType:"LOGGED_IN",error:void 0,accessToken:n.accessToken,userAccessType:n.userAccessType,accountProfile:n.accountProfile});case"LOG_IN_ERROR":return Object(s.a)(Object(s.a)({},e),{},{userType:"INIT",error:n.value});case"LOG_OUT":return Object(s.a)(Object(s.a)({},e),{},{userType:"NOT_LOGGED_IN",accessToken:"",error:void 0});case"UPDATE_ACCOUNT_PROFILE":return Object(s.a)(Object(s.a)({},e),{},{accountProfile:n.accountProfile});default:return Object(s.a)({},e)}}),D),l=Object(i.a)(u,2),m=l[0],x=l[1];Object(b.useEffect)((function(){(function(){var e=Object(p.a)(d.a.mark((function e(){var n,t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(j.b)("bt.token");case 3:if(void 0===(n=e.sent)||null===n){e.next=10;break}return t=JSON.parse(n),e.next=8,R.refreshToken(t.accessToken);case 8:e.next=12;break;case 10:return e.next=12,E();case 12:e.next=18;break;case 14:return e.prev=14,e.t0=e.catch(0),e.next=18,E();case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var T=function(){var e=Object(p.a)(d.a.mark((function e(n){var t,r,a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.accessToken,r=_.a.verify(t,q.b),a="object"===typeof r?r.userAccessType:"",c=JSON.stringify({accessToken:t}),e.next=6,Object(j.d)("bt.token",c);case 6:return x({name:"LOG_IN",accessToken:t,userAccessType:a,accountProfile:{}}),e.next=9,M(t);case 9:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),E=Object(b.useCallback)(Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(j.d)("bt.token","");case 2:x({name:"LOG_OUT"});case 3:case"end":return e.stop()}}),e)}))),[]),M=Object(b.useCallback)(function(){var e=Object(p.a)(d.a.mark((function e(n){var r,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.query({query:C.a,variables:{input:{accessToken:n}}});case 2:r=e.sent,a=r.data,Object(O.b)("getAccountProfile",a)&&x({name:"UPDATE_ACCOUNT_PROFILE",accountProfile:a.getAccountProfile.data[0]});case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),[]),R=f.a.useMemo((function(){return{refetchAccountProfile:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!m.accessToken){e.next=3;break}return e.next=3,M(m.accessToken);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),login:function(){var e=Object(p.a)(d.a.mark((function e(n){var r,a,c,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.username,a=n.password,e.next=3,t.query({query:w,variables:{input:{username:r,password:a}},fetchPolicy:"no-cache"});case 3:if(c=e.sent,o=c.data,!Object(O.b)("login",o)){e.next=8;break}return e.next=8,T(o.login.data);case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),forgotPassword:function(){var e=Object(p.a)(d.a.mark((function e(n){var r,a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.email,e.next=3,t.query({query:y,variables:{input:{email:r}}});case 3:if(a=e.sent,c=a.data,!Object(O.b)("forgotPassword",c)){e.next=7;break}return e.abrupt("return",c.forgotPassword.data);case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),resetPassword:function(){var e=Object(p.a)(d.a.mark((function e(n){var r,a,c,o,u;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.token,a=n.oldPassword,c=n.password,e.next=3,t.query({query:g,variables:{input:{token:r,password:c,oldPassword:a||""}}});case 3:if(o=e.sent,u=o.data,!Object(O.b)("resetPassword",u)){e.next=7;break}return e.abrupt("return",u.resetPassword.data);case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),isPasswordResetTokenValid:function(){var e=Object(p.a)(d.a.mark((function e(n){var r,a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.token,e.next=3,t.query({query:k,variables:{input:{token:r}}});case 3:if(a=e.sent,c=a.data,!Object(O.b)("passwordResetTokenValid",c)){e.next=7;break}return e.abrupt("return",c.passwordResetTokenValid.data);case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),signup:function(){var e=Object(p.a)(d.a.mark((function e(n){var t,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a({variables:{input:n}});case 2:if(t=e.sent,r=t.data,!Object(O.b)("signup",r)){e.next=7;break}return e.next=7,R.login({username:n.email,password:n.password});case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),vendorSignup:function(){var e=Object(p.a)(d.a.mark((function e(n){var t,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({variables:{input:n}});case 2:if(t=e.sent,r=t.data,!Object(O.b)("vendorSignup",r)){e.next=7;break}return e.next=7,R.login({username:n.email,password:n.password});case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),refreshToken:function(){var e=Object(p.a)(d.a.mark((function e(n){var r,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.query({query:P,variables:{input:{accessToken:n}}});case 2:if(r=e.sent,a=r.data,!Object(O.b)("refreshToken",a)){e.next=9;break}return e.next=7,T(a.refreshToken.data);case 7:e.next=10;break;case 9:R.logout();case 10:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),logout:function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}}),[m]),A=n;return"LOGGED_IN"!==m.userType||m.accountProfile||(A=null),Object($.jsx)(L.Provider,{value:Object(s.a)(Object(s.a)({},m),R),children:A})},M=function(){var e=Object(b.useContext)(L);if(void 0===e)throw new Error("useAuth must be used within a AuthContext");return e}},83:function(e,n,t){"use strict";t.d(n,"a",(function(){return w})),t.d(n,"j",(function(){return y})),t.d(n,"k",(function(){return g})),t.d(n,"o",(function(){return k})),t.d(n,"g",(function(){return P})),t.d(n,"f",(function(){return C})),t.d(n,"i",(function(){return T})),t.d(n,"h",(function(){return _})),t.d(n,"c",(function(){return q})),t.d(n,"b",(function(){return $})),t.d(n,"l",(function(){return D})),t.d(n,"m",(function(){return L})),t.d(n,"n",(function(){return E})),t.d(n,"e",(function(){return M})),t.d(n,"d",(function(){return R}));var r,a,c,o,u,s,i,l,d,p,b,f,j,O,h,v,m=t(16),x=t(13),w=Object(x.a)(r||(r=Object(m.a)(["\n  query ($input: AccountProfileRequest) {\n    getAccountProfile(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),y=Object(x.a)(a||(a=Object(m.a)(["\n  query ($input: VendorSearchCond) {\n    getVendorProfile(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),g=Object(x.a)(c||(c=Object(m.a)(["\n  mutation ($input: SignupRequest) {\n    signup(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),k=Object(x.a)(o||(o=Object(m.a)(["\n  mutation ($input: VendorSignupRequest) {\n    vendorSignup(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),P=(Object(x.a)(u||(u=Object(m.a)(["\nmutation ($input: UpdateAccountProfileRequest) {\n    updateAccountProfile(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),Object(x.a)(s||(s=Object(m.a)(["\n  query ($input: DashboardOverviewCond) {\n    getDashboardOverview(input: $input) {\n      responseCode\n      data\n    }\n  }\n"])))),C=Object(x.a)(i||(i=Object(m.a)(["\n  query ($input: DashboardChartOverviewCond) {\n    getDashboardChartOverview(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),T=Object(x.a)(l||(l=Object(m.a)(["\n  query ($input: UsersCond) {\n    getUsers(input: $input) {\n      responseCode\n      data\n      dataCount\n    }\n  }\n"]))),_=Object(x.a)(d||(d=Object(m.a)(["\n  query ($input: OrgVendorsCond) {\n    getOrgVendors(input: $input) {\n      responseCode\n      data\n      dataCount\n    }\n  }\n"]))),q=Object(x.a)(p||(p=Object(m.a)(["\n  mutation ($input: UserFormRequest) {\n    createUser(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),$=Object(x.a)(b||(b=Object(m.a)(["\n  mutation ($input: OrgVendorFormRequest) {\n    createOrgVendor(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),D=Object(x.a)(f||(f=Object(m.a)(["\n  mutation ($input: UserFormRequest) {\n    updateUser(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),L=Object(x.a)(j||(j=Object(m.a)(["\n  mutation ($input: UserProfileFormRequest) {\n    updateProfile(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),E=Object(x.a)(O||(O=Object(m.a)(["\n  mutation ($input: VendorProfileFormRequest) {\n    updateVendorProfile(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),M=Object(x.a)(h||(h=Object(m.a)(["\n  mutation ($input: UserDeleteRequest) {\n    deleteUser(input: $input) {\n      responseCode\n      data\n    }\n  }\n"]))),R=Object(x.a)(v||(v=Object(m.a)(["\n  mutation ($input: OrgVendorDeleteRequest) {\n    deleteOrgVendor(input: $input) {\n      responseCode\n      data\n    }\n  }\n"])))}},[[387,10,11]]]);
//# sourceMappingURL=main.fb08746c.chunk.js.map