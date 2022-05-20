(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{302:function(t,e,r){"use strict";r.r(e);var n=r(13),o=(r(70),r(73)),c={middleware:"authenticated",data:function(){return{postLists:[],text:null,number:0,postError:null}},computed:{user:function(){return this.$store.state.auth.currentUser}},methods:{logout:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.auth().signOut().then((function(data){t.$router.push("/login")})).catch((function(t){console.log(t)}));case 2:case"end":return e.stop()}}),e)})))()},getPostList:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/api/posts");case 2:r=e.sent,t.postLists=r.data.data;case 4:case"end":return e.stop()}}),e)})))()},deletePost:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$axios.delete("/api/posts/"+t);case 2:e.getPostList();case 3:case"end":return r.stop()}}),r)})))()},insertPost:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={text:t.text,uid:t.user.uid},e.next=3,t.$axios.post("/api/posts",r).then((function(data){t.getPostList(),t.text="",t.postError=""})).catch((function(e){t.postError=e.response.data.data.errors.text[0]}));case 3:case"end":return e.stop()}}),e)})))()},like:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n={uid:e.user.uid},r.next=3,e.$axios.post("/api/posts/"+t+"/like",n);case 3:e.getPostList();case 4:case"end":return r.stop()}}),r)})))()},unlike:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n={uid:e.user.uid},r.next=3,e.$axios.post("/api/posts/"+t+"/unlike",n);case 3:e.getPostList();case 4:case"end":return r.stop()}}),r)})))()},toShow:function(t){this.$router.push("/posts/".concat(t))}},created:function(){var t=this;this.getPostList(),o.a.auth().onAuthStateChanged(function(){var e=Object(n.a)(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r?(n=r.uid,t.$store.dispatch("auth/setUser",{uid:n})):t.$store.dispatch("auth/setUser",null);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},l=c,d=r(41),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("main",{staticClass:"container",attrs:{dark:""}},[r("div",{staticClass:"sidebar"},[t._m(0),t._v(" "),r("nav",[r("ul",[r("li",{staticClass:"side-menu"},[r("NuxtLink",{staticClass:"sidebar-menu-item",attrs:{to:"/"}},[r("img",{attrs:{src:"/img/home.png",alt:"",width:"25"}}),t._v(" "),r("span",{staticClass:"sidemenu-text"},[t._v("ホーム")])])],1),t._v(" "),r("li",{staticClass:"side-menu",on:{click:t.logout}},[r("img",{attrs:{src:"/img/logout.png",alt:"",width:"25"}}),t._v(" "),r("span",{staticClass:"sidemenu-text"},[t._v("ログアウト")])])])]),t._v(" "),r("form",{staticClass:"post-form",attrs:{method:"post"},on:{submit:function(e){return e.preventDefault(),t.insertPost(t.text)}}},[t._m(1),t._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],attrs:{name:"text",id:"text",cols:"37",rows:"6"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),t._v(" "),t.postError?r("p",{staticClass:"errors"},[t._v(t._s(t.postError))]):t._e(),t._v(" "),r("button",{staticClass:"button",attrs:{type:"submit"}},[t._v("シェアする")])])]),t._v(" "),r("section",{staticClass:"post-list"},[r("h2",{staticClass:"post-title"},[t._v("ホーム")]),t._v(" "),r("ul",t._l(t.postLists,(function(e){return r("li",{key:e.id,staticClass:"post-list-item"},[t.user?r("div",{staticClass:"user-info"},[r("p",{staticClass:"user-name"},[t._v(t._s(e.users.name))]),t._v(" "),e.likes.find((function(e){return e.uid===t.user.uid}))?r("div",[r("font-awesome-layers",{staticClass:"fa"},[r("font-awesome-icon",{staticClass:"heart red-text",attrs:{icon:"heart"},on:{click:function(r){return t.unlike(e.id)}}})],1),t._v(" "),r("span",{staticClass:"number"},[t._v(t._s(e.likes.length))])],1):t._e(),t._v(" "),e.likes.find((function(e){return e.uid===t.user.uid}))?t._e():r("div",[r("font-awesome-layers",{staticClass:"fa"},[r("font-awesome-icon",{staticClass:"heart",attrs:{icon:"heart"},on:{click:function(r){return t.like(e.id)}}})],1),t._v(" "),r("span",{staticClass:"number"},[t._v(t._s(e.likes.length))])],1),t._v(" "),r("span",{on:{click:function(r){return t.deletePost(e.id)}}},[t.user.uid===e.users.uid?r("img",{staticClass:"cross",attrs:{src:"img/cross.png",alt:"削除",width:"25"}}):t._e()]),t._v(" "),r("span",{on:{click:function(r){return t.toShow(e.id)}}},[r("img",{staticClass:"arrow",attrs:{src:"img/detail.png",alt:"ページ遷移",width:"25"}})])]):t._e(),t._v(" "),r("p",{staticClass:"content"},[t._v(t._s(e.text))])])})),0)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{staticClass:"logo"},[e("img",{attrs:{src:"/img/logo.png",alt:"ロゴ",width:"100"}})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"post-form-label"},[r("label",{attrs:{for:""}},[t._v("シェア")])])}],!1,null,null,null);e.default=component.exports}}]);