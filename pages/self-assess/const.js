export const columns = [
  {
    title: "No.",
    scopedSlots: { customRender: "No" }
  },
  {
    title: "Title",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Start",
    dataIndex: "startDate",
    key: "startDate"
  },
  {
    title: "End",
    dataIndex: "endDate",
    key: "endDate"
  },
  {
    title: "Skill Count",
    dataIndex: "skillIds",
    key: "skillIds",
    scopedSlots: { customRender: "skillCount" }
  },
  {
    title: "Action",
    scopedSlots: { customRender: "action" },
    width: 100
  }
];
