export const columns = [
  {
    title: "No.",
    scopedSlots: { customRender: "No" }
  },
  {
    title: "Event",
    key: "evtName",
    scopedSlots: { customRender: "evtName" }
  },
  {
    title: "Start",
    scopedSlots: { customRender: "startDate" },
    key: "startDate"
  },
  {
    title: "End",
    scopedSlots: { customRender: "endDate" },
    key: "endDate"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "Action",
    scopedSlots: { customRender: "action" },
    width: 100
  }
];
