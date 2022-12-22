import React from "react";
import { Select } from "antd";
import { changeRoom } from "../../redux-store/features/eventBook/counterSlice";
import { useDispatch } from "react-redux";

const RoomSelect = ({ className }) => {
  const dispatch = useDispatch();
  const handleChangeRoom = (e) => {
    dispatch(changeRoom(e));
  };
  return (
    <Select
      className={className}
      style={{
        width: "100%",
      }}
      options={[
        {
          label: "Abai",
          value: "Abai",
        },
        {
          label: "Ybyrai",
          value: "Ybyrai",
        },
        {
          label: "Coworking",
          value: "Coworking",
        },
        {
          label: "Guest",
          value: "Guest",
        },
        {
          label: "Conference",
          value: "Conference",
        },
      ]}
      onChange={handleChangeRoom}
    />
  );
};

export default RoomSelect;
