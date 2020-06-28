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
      @ok="handleOk"
      @cancel="handleCancel"
    ></a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageLoading: false,
      programmingSkills: [],
      activeKey: ["1"],
      visible: false,
      skillTitle: ""
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
          console.log("pS", this.programmingSkills);
        });
    },
    openAssessModal(skill) {
      this.skillTitle = skill.title;
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>