<template>
  <div>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="Programming Skills">
        <a-list
          class="demo-loadmore-list"
          item-layout="horizontal"
          :data-source="programmingSkills"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-button slot="actions" type="primary" @click="openAssessModal(item)">Assess</a-button>
            <a-list-item-meta :description="item.description">
              <div slot="title">{{item.title}}</div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="Soft Skills"></a-collapse-panel>
      <a-collapse-panel key="3" header="Project Management Skills"></a-collapse-panel>
    </a-collapse>
    <a-modal
      :title="skillTitle"
      :visible="visible"
      :centered="true"
      :width="800"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form>
        <a-form-item label="Experience" v-bind="formItemLayout">
          <a-radio-group
            @change="handleExperienceSelection"
            :value="selectedExperience[skillTitle]"
          >
            <a-radio
              v-for="experience in experienceOptions"
              :value="experience"
              :key="experience"
            >{{experience}}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Level" v-bind="formItemLayout">
          <a-radio-group @change="handleLevelSelection" :value="selectedLevel[skillTitle]">
            <a-radio v-for="level in levelOptions" :value="level" :key="level">{{level}}</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
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
      activeKey: ["1"],
      visible: false,
      skillTitle: "",
      selectedExperience: {},
      experienceOptions: [],
      selectedLevel: {},
      levelOptions: []
    };
  },
  mounted() {
    this.getEvtSkills();
  },
  methods: {
    getEvtSkills() {
      this.pageLoading = true;
      var colRef = this.$fireStore.collection("skills");
      colRef
        .where("id", "in", this.$route.params.evt.skillIds)
        .get()
        .then(col => {
          col.forEach(doc => {
            let docData = doc.data();
            if (docData.type == "Programming Skill")
              this.programmingSkills.push(docData);
          });
        })
        .catch(function(error) {
          console.log("Error getting collection:", error);
        })
        .finally(() => {
          this.pageLoading = false;
        });
    },
    openAssessModal(skill) {
      this.skillTitle = skill.title;
      if (skill.assessmentMetrics.experiences)
        this.experienceOptions = skill.assessmentMetrics.experiences;
      if (skill.assessmentMetrics.levels)
        this.levelOptions = skill.assessmentMetrics.levels;
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    handleExperienceSelection(event) {
      this.$set(this.selectedExperience, this.skillTitle, event.target.value);
    },
    handleLevelSelection(event) {
      this.$set(this.selectedLevel, this.skillTitle, event.target.value);
    }
  }
};
</script>