import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const ShowConfirm = (info) => {
  Modal.confirm({
    title: "Are you sure you want to proceed?",
    icon: <ExclamationCircleFilled />,
    confirmLoading: true,
    centered: true,
    keyboard: true,
    onCancel() {
      info.revert();
    },
    onOk() {
      console.log(
        info.event.title + " was dropped on " + info.event.start.toISOString()
      );
      // post query to update event
    },
  });
};
export default ShowConfirm;
