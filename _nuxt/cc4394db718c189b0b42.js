(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1025:function(e,t,n){"use strict";n(132),n(184),n(52),n(32),n(77),n(76);var r=n(21),o={props:["evtId"],data:function(){return{formItemLayout:{labelCol:{md:4,sm:24},wrapperCol:{md:20,sm:24}},pageLoading:!1,programmingSkills:[],activeKey:["1"],visible:!1,skillTitle:"",selectedExperiences:{},experienceOptions:[],selectedLevels:{},levelOptions:[],submitting:!1,submittedRecord:null,assessmentRecordsRef:null,assessmentEvent:null,notAssessedSkillList:[],submitted:!1,eventEnded:!1,trueEvtId:null}},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.$route.query.evtId||e.evtId){t.next=4;break}e.notifyRouteError(),t.next=15;break;case 4:return e.trueEvtId=e.$route.query.evtId?e.$route.query.evtId:e.evtId,e.pageLoading=!0,t.next=8,e.getAssessmentPeriods();case 8:return(n=t.sent).empty&&e.notifyRouteError(),e.assessmentEvent=n.docs[0].data(),e.$moment(e.assessmentEvent.endDate).diff(e.$moment())<=0&&(e.eventEnded=!0),t.next=14,Promise.all([e.getEvtSkills(),e.retrieveAssessmentRecord()]);case 14:e.pageLoading=!1;case 15:case"end":return t.stop()}}),t)})))()},methods:{getAssessmentPeriods:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.$fireStore.collection("assessment_periods").where("id","==",e.trueEvtId),t.next=3,n.get();case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()},getEvtSkills:function(){var e=this;this.$fireStore.collection("skills").where("id","in",this.assessmentEvent.skillIds).get().then((function(col){col.forEach((function(t){var n=t.data();"Programming Skill"==n.type&&e.programmingSkills.push(n)}))})).catch((function(e){console.log("Error getting collection:",e)}))},retrieveAssessmentRecord:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.assessmentRecordsRef=e.$fireStore.collection("assessment_records"),t.next=3,e.assessmentRecordsRef.where("creatorId","==",e.$fireAuth.currentUser.uid).where("assessmentEventId","==",e.assessmentEvent.id).get();case 3:(n=t.sent).empty?(e.selectedExperiences={},e.selectedLevels={}):(e.submittedRecord=n.docs[0].data(),"submitted"==e.submittedRecord.status&&(e.submitted=!0),e.selectedExperiences=e.submittedRecord.selectedExperiences,e.selectedLevels=e.submittedRecord.selectedLevels);case 5:case"end":return t.stop()}}),t)})))()},openAssessModal:function(e){this.skillTitle=e.title,e.assessmentMetrics.experiences&&(this.experienceOptions=e.assessmentMetrics.experiences),e.assessmentMetrics.levels&&(this.levelOptions=e.assessmentMetrics.levels),this.visible=!0},handleOk:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:_.isEmpty(e.selectedExperiences)&&_.isEmpty(e.selectedLevels)||e.evtId?e.visible=!1:(e.submitting=!0,(n=e.submittedRecord?e.assessmentRecordsRef.doc(e.submittedRecord.id):e.assessmentRecordsRef.doc()).set({id:n.id,assessmentEventId:e.assessmentEvent.id,creatorId:e.$fireAuth.currentUser.uid,selectedLevels:e.selectedLevels,selectedExperiences:e.selectedExperiences}).then(Object(r.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.$notification.success({message:"Assessment record updated successfully!"}),e.submittedRecord){t.next=6;break}return t.next=4,n.get();case 4:r=t.sent,e.submittedRecord=r.data();case 6:case"end":return t.stop()}}),t)})))).catch((function(t){e.$notification.success({message:"Error updating assessment record!"})})).finally((function(){e.submitting=!1,e.visible=!1})));case 1:case"end":return t.stop()}}),t)})))()},handleCancel:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.visible=!1,e.evtId){t.next=6;break}return e.pageLoading=!0,t.next=5,e.retrieveAssessmentRecord();case 5:e.pageLoading=!1;case 6:case"end":return t.stop()}}),t)})))()},handleExperienceSelection:function(e){this.$set(this.selectedExperiences,this.skillTitle,e.target.value)},handleLevelSelection:function(e){this.$set(this.selectedLevels,this.skillTitle,e.target.value)},notifyRouteError:function(){this.$notification.error({message:"No evtId found!"}),window.history.back()},handleSubmission:function(){var e,t=this;this.notAssessedSkillList.length?this.$notification.error({message:"Some skills were not properly assessed, please try again!"}):this.$confirm({content:"Are you sure to submit your assessment? You will not be able to change it later!",onOk:(e=Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.submittedRecord?t.assessmentRecordsRef.doc(t.submittedRecord.id):t.assessmentRecordsRef.doc(),e.next=3,n.set({status:"submitted"},{merge:!0});case 3:t.$notification.success({message:"Submitted successfully!"}),t.submitted=!0;case 5:case"end":return e.stop()}}),e)}))),function(){return e.apply(this,arguments)})})},checkAssessedSkill:function(e){var t=this.selectedExperiences[e.title]&&this.selectedLevels[e.title];return t||this.notAssessedSkillList.includes(e.title)?t&&_.pull(this.notAssessedSkillList,e.title):this.notAssessedSkillList.push(e.title),t}}},l=n(39),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-spin",{attrs:{spinning:e.pageLoading}},[n("div",{staticStyle:{"min-height":"100vh"}},[n("a-collapse",{model:{value:e.activeKey,callback:function(t){e.activeKey=t},expression:"activeKey"}},[n("a-collapse-panel",{key:"1",attrs:{header:"Programming Skills"}},[n("a-list",{staticClass:"demo-loadmore-list",attrs:{"item-layout":"horizontal","data-source":e.programmingSkills},scopedSlots:e._u([{key:"renderItem",fn:function(t,r){return n("a-list-item",{},[n("a-button",{attrs:{slot:"actions",disabled:(e.submitted||e.eventEnded)&&!e.evtId,type:"primary"},on:{click:function(n){return e.openAssessModal(t)}},slot:"actions"},[e._v(e._s(e.evtId?"View":"Assess"))]),e._v(" "),e.evtId?e._e():n("a-tooltip",{attrs:{slot:"actions",placement:"bottomLeft"},slot:"actions"},[n("template",{slot:"title"},[e._v("Already assessed")]),e._v(" "),e.checkAssessedSkill(t)?n("a-icon",{attrs:{type:"check"}}):e._e()],2),e._v(" "),n("a-list-item-meta",{attrs:{description:t.description}},[n("div",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.title))])])],1)}}])})],1),e._v(" "),n("a-collapse-panel",{key:"2",attrs:{header:"Soft Skills"}}),e._v(" "),n("a-collapse-panel",{key:"3",attrs:{header:"Project Management Skills"}})],1),e._v(" "),e.evtId?e._e():n("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[e.submitted||e.eventEnded?n("a-tooltip",{attrs:{slot:"actions"},slot:"actions"},[n("template",{slot:"title"},[e._v(e._s(e.submitted?"Assessment already submitted":e.eventEnded?"Assessment event already ended":""))]),e._v(" "),n("a-button",{attrs:{disabled:"",type:"primary"}},[e._v("Submit")])],2):n("a-button",{attrs:{slot:"actions",type:"primary"},on:{click:e.handleSubmission},slot:"actions"},[e._v("Submit")])],1),e._v(" "),n("a-modal",{attrs:{title:e.skillTitle,visible:e.visible,centered:!0,width:800,okButtonProps:{props:{loading:e.submitting}}},on:{ok:e.handleOk,cancel:e.handleCancel}},[n("a-form",[n("a-form-item",e._b({attrs:{label:"Experience"}},"a-form-item",e.formItemLayout,!1),[n("a-radio-group",{attrs:{value:e.selectedExperiences[e.skillTitle],disabled:e.evtId},on:{change:e.handleExperienceSelection}},e._l(e.experienceOptions,(function(t){return n("a-radio",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1),e._v(" "),n("a-form-item",e._b({attrs:{label:"Level"}},"a-form-item",e.formItemLayout,!1),[n("a-radio-group",{attrs:{value:e.selectedLevels[e.skillTitle],disabled:e.evtId},on:{change:e.handleLevelSelection}},e._l(e.levelOptions,(function(t){return n("a-radio",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1)],1)],1)],1)])}),[],!1,null,null,null);t.a=component.exports},1058:function(e,t,n){"use strict";n.r(t);n(76);var r=n(21),o={components:{AssessmentForm:n(1025).a},data:function(){return{}},mounted:function(){return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},methods:{}},l=n(39),component=Object(l.a)(o,(function(){var e=this.$createElement;return(this._self._c||e)("AssessmentForm")}),[],!1,null,null,null);t.default=component.exports}}]);