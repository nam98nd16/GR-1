<template>
  <a-spin :spinning="pageLoading">
    <div style="min-height: 100vh">
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="Programming Languages">
          <a-list
            class="demo-loadmore-list"
            item-layout="horizontal"
            :data-source="programmingSkills"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-button
                slot="actions"
                v-if="!evtId"
                :disabled="(submitted || eventEnded) && !evtId"
                type="primary"
                @click="openAssessModal(item)"
              >{{evtId ? 'View' : 'Assess'}}</a-button>
              <span slot="actions" v-if="evtId">
                <div>
                  <a-tag color="purple">
                    Experience:
                    {{selectedExperiences[item.title]}}
                  </a-tag>
                </div>
                <div>
                  <a-tag color="red">
                    Level:
                    {{selectedLevels[item.title]}}
                  </a-tag>
                </div>
              </span>

              <a-tooltip v-if="!evtId" slot="actions" placement="bottomLeft">
                <template slot="title">Already assessed</template>
                <a-icon v-if="checkAssessedSkill(item)" type="check" />
              </a-tooltip>
              <a-list-item-meta :description="item.description">
                <div slot="title">{{item.title}}</div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Frameworks">
          <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="frameworks">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-button
                slot="actions"
                v-if="!evtId"
                :disabled="(submitted || eventEnded) && !evtId"
                type="primary"
                @click="openAssessModal(item)"
              >{{evtId ? 'View' : 'Assess'}}</a-button>

              <span slot="actions" v-if="evtId">
                <div>
                  <a-tag color="purple">Experience: {{selectedExperiences[item.title]}}</a-tag>
                </div>
                <div>
                  <a-tag color="red">Level: {{selectedLevels[item.title]}}</a-tag>
                </div>
              </span>

              <a-tooltip v-if="!evtId" slot="actions" placement="bottomLeft">
                <template slot="title">Already assessed</template>
                <a-icon v-if="checkAssessedSkill(item)" type="check" />
              </a-tooltip>
              <a-list-item-meta :description="item.description">
                <div slot="title">{{item.title}}</div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="Soft Skills"></a-collapse-panel>
      </a-collapse>
      <div v-if="!evtId" style="text-align: center; margin-top: 10px">
        <a-button
          v-if="!submitted && !eventEnded"
          slot="actions"
          type="primary"
          @click="handleSubmission"
        >Submit</a-button>

        <a-tooltip v-else slot="actions">
          <template
            slot="title"
          >{{submitted?'Assessment already submitted':eventEnded?'Assessment event already ended':''}}</template>
          <a-button disabled type="primary">Submit</a-button>
        </a-tooltip>
      </div>

      <a-modal
        :title="skillTitle"
        :visible="visible"
        :centered="true"
        :width="800"
        :okButtonProps="{props: { loading: submitting }}"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form>
          <a-form-item label="Experience" v-bind="formItemLayout">
            <a-radio-group
              @change="handleExperienceSelection"
              :value="selectedExperiences[skillTitle]"
              :disabled="evtId"
            >
              <a-radio
                v-for="experience in experienceOptions"
                :value="experience"
                :key="experience"
              >{{experience}}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Level" v-bind="formItemLayout">
            <a-radio-group
              @change="handleLevelSelection"
              :value="selectedLevels[skillTitle]"
              :disabled="evtId"
            >
              <a-radio v-for="level in levelOptions" :value="level" :key="level">{{level}}</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </a-spin>
</template>

<script>
export default {
  props: ["evtId"],
  data() {
    return {
      formItemLayout: {
        labelCol: {
          md: 4,
          sm: 24
        },
        wrapperCol: {
          md: 20,
          sm: 24
        }
      },
      pageLoading: false,
      programmingSkills: [],
      frameworks: [],
      activeKey: ["1", "2", "3"],
      visible: false,
      skillTitle: "",
      selectedExperiences: {},
      experienceOptions: [],
      selectedLevels: {},
      levelOptions: [],
      submitting: false,
      submittedRecord: null,
      assessmentRecordsRef: null,
      assessmentEvent: null,
      notAssessedSkillList: [],
      submitted: false,
      eventEnded: false,
      trueEvtId: null
    };
  },
  async mounted() {
    if (!this.$route.query.evtId && !this.evtId) this.notifyRouteError();
    else {
      this.trueEvtId = this.$route.query.evtId
        ? this.$route.query.evtId
        : this.evtId;
      this.pageLoading = true;
      let assessmentPeriods = await this.getAssessmentPeriods();
      if (assessmentPeriods.empty) this.notifyRouteError();
      this.assessmentEvent = assessmentPeriods.docs[0].data();
      if (this.$moment(this.assessmentEvent.endDate).diff(this.$moment()) <= 0)
        this.eventEnded = true;
      await Promise.all([this.getEvtSkills(), this.retrieveAssessmentRecord()]);
      this.pageLoading = false;
    }
  },
  methods: {
    async getAssessmentPeriods() {
      var colRef = this.$fireStore
        .collection("assessment_periods")
        .where("id", "==", this.trueEvtId);
      return await colRef.get();
    },
    getEvtSkills() {
      var colRef = this.$fireStore.collection("skills");
      for (
        let i = 0;
        i < Math.ceil(this.assessmentEvent.skillIds.length / 10);
        i++
      )
        colRef
          .where(
            "id",
            "in",
            this.assessmentEvent.skillIds.slice(i * 10, i * 10 + 10)
          )
          .get()
          .then(col => {
            col.forEach(doc => {
              let docData = doc.data();
              if (docData.type == "Programming Skill")
                this.programmingSkills.push(docData);
              else if (docData.type == "Framework")
                this.frameworks.push(docData);
            });
          })
          .catch(function(error) {
            console.log("Error getting collection:", error);
          });
    },
    async retrieveAssessmentRecord() {
      this.assessmentRecordsRef = this.$fireStore.collection(
        "assessment_records"
      );
      let records = await this.assessmentRecordsRef
        .where("creatorId", "==", this.$fireAuth.currentUser.uid)
        .where("assessmentEventId", "==", this.assessmentEvent.id)
        .get();
      if (!records.empty) {
        this.submittedRecord = records.docs[0].data();
        if (this.submittedRecord.status == "submitted") this.submitted = true;
        this.selectedExperiences = this.submittedRecord.selectedExperiences;
        this.selectedLevels = this.submittedRecord.selectedLevels;
      } else {
        this.selectedExperiences = {};
        this.selectedLevels = {};
      }
    },
    openAssessModal(skill) {
      this.skillTitle = skill.title;
      if (skill.assessmentMetrics.experiences)
        this.experienceOptions = skill.assessmentMetrics.experiences;
      if (skill.assessmentMetrics.levels)
        this.levelOptions = skill.assessmentMetrics.levels;
      this.visible = true;
    },
    async handleOk() {
      if (
        (!_.isEmpty(this.selectedExperiences) ||
          !_.isEmpty(this.selectedLevels)) &&
        !this.evtId
      ) {
        this.submitting = true;
        let recordRef = this.submittedRecord
          ? this.assessmentRecordsRef.doc(this.submittedRecord.id)
          : this.assessmentRecordsRef.doc();
        recordRef
          .set({
            id: recordRef.id,
            assessmentEventId: this.assessmentEvent.id,
            creatorId: this.$fireAuth.currentUser.uid,
            selectedLevels: this.selectedLevels,
            selectedExperiences: this.selectedExperiences
          })
          .then(async () => {
            this.$notification.success({
              message: "Assessment record updated successfully!"
            });

            if (!this.submittedRecord) {
              let record = await recordRef.get();
              this.submittedRecord = record.data();
            }
          })
          .catch(error => {
            this.$notification.success({
              message: "Error updating assessment record!"
            });
          })
          .finally(() => {
            this.submitting = false;
            this.visible = false;
          });
      } else this.visible = false;
    },
    async handleCancel() {
      this.visible = false;
      if (!this.evtId) {
        this.pageLoading = true;
        await this.retrieveAssessmentRecord();
        this.pageLoading = false;
      }
    },
    handleExperienceSelection(event) {
      this.$set(this.selectedExperiences, this.skillTitle, event.target.value);
    },
    handleLevelSelection(event) {
      this.$set(this.selectedLevels, this.skillTitle, event.target.value);
    },
    notifyRouteError() {
      this.$notification.error({ message: "No evtId found!" });
      window.history.back();
    },
    handleSubmission() {
      if (this.notAssessedSkillList.length)
        this.$notification.error({
          message: "Some skills were not properly assessed, please try again!"
        });
      else {
        this.$confirm({
          content:
            "Are you sure to submit your assessment? You will not be able to change it later!",
          onOk: async () => {
            let recordRef = this.submittedRecord
              ? this.assessmentRecordsRef.doc(this.submittedRecord.id)
              : this.assessmentRecordsRef.doc();

            await recordRef.set(
              {
                status: "submitted"
              },
              { merge: true }
            );
            this.$notification.success({ message: "Submitted successfully!" });
            this.submitted = true;
          }
        });
      }
    },
    checkAssessedSkill(skill) {
      let isAssessed =
        this.selectedExperiences[skill.title] &&
        this.selectedLevels[skill.title];
      if (!isAssessed && !this.notAssessedSkillList.includes(skill.title)) {
        this.notAssessedSkillList.push(skill.title);
      } else if (isAssessed) {
        _.pull(this.notAssessedSkillList, skill.title);
      }
      return isAssessed;
    }
  }
};
</script>