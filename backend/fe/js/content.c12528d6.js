"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[276],{7248:function(t,e,n){n.r(e),n.d(e,{default:function(){return R}});var i=n(4108),o=n(9096),s=n(7764);const l=t=>((0,i.ED)("data-v-8ad5c9f6"),t=t(),(0,i.ii)(),t),c=l((()=>(0,i.QD)("hr",null,null,-1))),a={class:"title-div"},r={class:"title"},d=l((()=>(0,i.QD)("hr",null,null,-1))),m={class:"writer-div"},h={class:"viewnum-div"},u={class:"file-div"},D=l((()=>(0,i.QD)("div",null,"파일:",-1))),v=["href"],g=l((()=>(0,i.QD)("hr",null,null,-1))),Q=["innerHTML"],p={class:"recom-div"},_={class:"recom"},f={class:"btn-div"},k=l((()=>(0,i.QD)("hr",null,null,-1))),w={class:"comment-writer-div"},C={class:"comment-writer"},A={class:"comment-date"},W={class:"comment-content-div"},b={class:"comment-content"},y=["onClick"],x=l((()=>(0,i.QD)("hr",null,null,-1))),L={style:{"padding-bottom":"30px"}},M=l((()=>(0,i.QD)("div",{class:"comment-write"},"댓글 쓰기",-1))),z={class:"comment-post"};function F(t,e,n,l,F,$){return(0,i.Wz)(),(0,i.An)(i.ae,null,[(0,i.QD)("div",null,[(0,i.QD)("div",null,[c,(0,i.QD)("div",a,[(0,i.QD)("div",r,(0,o.WA)(F.contentDetail.title),1),(0,i.QD)("div",null,(0,o.WA)($.dateFormat(F.contentDetail.date)),1)]),d,(0,i.QD)("div",m,[(0,i.QD)("div",null,"작성자:"+(0,o.WA)(F.contentDetail.writer),1),(0,i.QD)("div",h,[(0,i.QD)("div",null,"조회 수 : "+(0,o.WA)(F.contentDetail.view_num),1),(0,i.QD)("div",null,"추천 수 : "+(0,o.WA)(F.contentDetail.recom_num),1),(0,i.QD)("div",null,"댓글 : "+(0,o.WA)(F.contentDetail.comment_num),1)])]),(0,i.QD)("div",u,[D,(0,i.QD)("a",{href:`http://localhost:3030/files/${F.contentDetail.file}`,download:""},(0,o.WA)(F.contentDetail.file),9,v)])]),g,(0,i.QD)("div",null,[(0,i.QD)("div",{class:"content",innerHTML:F.contentDetail.content},null,8,Q)]),(0,i.QD)("div",p,[(0,i.QD)("div",_,(0,o.WA)(F.contentDetail.recom_num),1),(0,i.QD)("button",{class:"recom-btn",onClick:e[0]||(e[0]=(...t)=>$.postRecomandation&&$.postRecomandation(...t))},(0,o.WA)($.recom_text),1)]),(0,i.QD)("div",f,[$.isGid?((0,i.Wz)(),(0,i.An)("button",{key:0,onClick:e[1]||(e[1]=(...t)=>$.pushModify&&$.pushModify(...t))},"수정")):(0,i.g1)("",!0),$.isGid?((0,i.Wz)(),(0,i.An)("button",{key:1,onClick:e[2]||(e[2]=(...t)=>$.deleteContent&&$.deleteContent(...t))},"삭제")):(0,i.g1)("",!0)])]),k,(0,i.QD)("div",null,[(0,i.QD)("div",null,[((0,i.Wz)(!0),(0,i.An)(i.ae,null,(0,i.mi)(F.commentList,((t,e)=>((0,i.Wz)(),(0,i.An)("div",{key:t},[(0,i.QD)("div",w,[(0,i.QD)("div",C,(0,o.WA)(t.writer),1),(0,i.QD)("div",A,(0,o.WA)($.dateFormat(t.date)),1)]),(0,i.QD)("div",W,[(0,i.QD)("div",b,(0,o.WA)(t.content),1),this.equlCommentWriter(t.writer)?((0,i.Wz)(),(0,i.An)("div",{key:0,class:"comment-delete",onClick:n=>this.deleteComment(t.comment_id,e)}," 삭제 ",8,y)):(0,i.g1)("",!0)]),x])))),128))]),(0,i.QD)("div",L,[M,(0,i.QD)("div",z,[(0,i.wt)((0,i.QD)("textarea",{class:"comment-textarea",name:"",id:"",cols:"1","onUpdate:modelValue":e[3]||(e[3]=t=>F.comment_content=t)},null,512),[[s.Og,F.comment_content]]),(0,i.QD)("input",{class:"comment-btn",type:"button",value:"등록",onClick:e[4]||(e[4]=(...t)=>$.postComment&&$.postComment(...t))})])])])],64)}n(3248);var $={setup(){},props:{content_id:{type:Number,default:8}},created(){this.getContentDetail(this.content_id),this.getCommentList()},data(){return{contentDetail:{},is_like:!1,commentList:[],comment_content:""}},methods:{getContentDetail(t){this.axios.get("/content/"+t,{params:{user_id:this.store.state.gid}}).then((t=>{console.log(t.data),this.contentDetail=t.data.content,this.is_like=t.data.is_like})).catch((t=>{console.error(t)}))},deleteContent(){this.store.state.gid==this.contentDetail.writer?this.axios.delete("/content/"+this.content_id,{params:{file:this.contentDetail.file}}).then((t=>{console.log(t)})).catch((t=>{console.log(t)})).then((()=>{this.$router.replace({name:"main"})})):alert("작성한 사용자만 삭제할 수 있습니다.")},pushModify(){this.store.state.gid==this.contentDetail.writer?this.$router.push({name:"modify",params:{contentDetail:JSON.stringify(this.contentDetail)}}):alert("작성한 사용자만 수정할 수 있습니다.")},getCommentList(){this.axios.get("/comment/list/"+this.content_id).then((t=>{this.commentList=t.data})).catch((t=>{console.log(t)}))},postComment(){if(this.comment_content)return this.store.state.gid?void this.axios.post("/comment",{content:this.comment_content,content_id:this.content_id,writer:this.store.state.gid}).then((t=>{this.commentList.push(t.data),this.comment_content=""})).catch((t=>{console.log(t)})):(alert("로그인 해주세요"),void this.$router.push({name:"login"}));alert("댓글을 입력해주세요")},deleteComment(t,e){this.store.state.gid!=this.commentList[e].writer?this.axios.delete("/comment/"+t).then((t=>{this.commentList.splice(e,1),alert("삭제 되었습니다."),console.log(t)})).catch((t=>{console.log(t)})):alert("작성한 사용자만 삭제할 수 있습니다.")},equlCommentWriter(t){return this.store.state.gid==t},postRecomandation(){this.store.state.gid?this.axios.post("/like/"+this.contentDetail.content_id,{writer:this.store.state.gid,is_like:this.is_like?1:0}).then((t=>{console.log(t),this.is_like=t.data.is_like,this.is_like?this.contentDetail.recom_num++:this.contentDetail.recom_num--})).catch((t=>{console.error(t)})):alert("추천은 로그인한 사용자만 가능합니다")},dateFormat(t){let e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()},saveBtn(){try{let t=document.createElement("a");t.setAttribute("href","localhost:3030/download"),t.setAttribute("download",this.contentDetail.file),t.click()}catch(t){console.log(t)}}},computed:{isGid(){return this.store.state.gid==this.contentDetail.writer},recom_text(){return this.is_like?"추천 취소":"추천"}}},G=n(4100);const H=(0,G.c)($,[["render",F],["__scopeId","data-v-8ad5c9f6"]]);var R=H}}]);
//# sourceMappingURL=content.c12528d6.js.map