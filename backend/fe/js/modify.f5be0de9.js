"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[856],{4420:function(t,n,e){e.r(n),e.d(n,{default:function(){return _}});var o=e(4108),c=e(7764);const s=t=>((0,o.ED)("data-v-112fec9e"),t=t(),(0,o.ii)(),t),a={class:"modify-div"},i={class:"modify"},d=s((()=>(0,o.QD)("div",null,[(0,o.QD)("input",{class:"file",type:"file"})],-1))),l={class:"btn-div"},r={class:"btn"};function u(t,n,e,s,u,p){const h=(0,o.E1)("router-link");return(0,o.Wz)(),(0,o.An)("div",a,[(0,o.QD)("div",i,[(0,o.QD)("div",null,[(0,o.wt)((0,o.QD)("input",{class:"title",type:"text",placeholder:"제목을 입력해 주세요.","onUpdate:modelValue":n[0]||(n[0]=t=>this.content_body.title=t)},null,512),[[c.Og,this.content_body.title]])]),d,(0,o.QD)("div",null,[(0,o.wt)((0,o.QD)("textarea",{class:"content",name:"",id:"",rows:"30","onUpdate:modelValue":n[1]||(n[1]=t=>this.content_body.content=t)},null,512),[[c.Og,this.content_body.content]])]),(0,o.QD)("div",l,[(0,o.QD)("button",{class:"btn",onClick:n[2]||(n[2]=(...t)=>p.putContent&&p.putContent(...t))},"등록"),(0,o.QD)("button",r,[(0,o.K2)(h,{to:"/"},{default:(0,o.Ql)((()=>[(0,o.mY)("취소")])),_:1})])])])])}e(3248);var p={setup(){},created(){console.log(this.$route.params.contentDetail)},mounted(){this.content_body.content=this.content_body.content.replaceAll("<br>","\r\n")},data(){var t=JSON.parse(this.$route.params.contentDetail);return{content_body:t}},methods:{async putContent(){this.content_body.content=this.content_body.content.replace(/(?:\r\n|\r|\n)/g,"<br>"),await this.axios.put("/content/"+this.content_body.content_id,this.content_body),this.$router.push({path:"/content/",name:"content",params:{content_id:this.content_body.content_id}})}}},h=e(4100);const b=(0,h.c)(p,[["render",u],["__scopeId","data-v-112fec9e"]]);var _=b}}]);
//# sourceMappingURL=modify.f5be0de9.js.map