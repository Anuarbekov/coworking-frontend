import React from "react";
import { Select } from "antd";
import {
  changeStartTime,
  changeEndTime,
} from "../../redux-store/features/eventBook/counterSlice";
import { useDispatch } from "react-redux";

const HourSelect = ({ className, start }) => {
  const dispatch = useDispatch();

  const handleStartChange = (e) => {
    dispatch(changeStartTime(e));
  };
  const handleEndChange = (e) => {
    dispatch(changeEndTime(e));
  };
  return (
    <Select
      className={className}
      options={[
        {
          label: "8 am",
          value: 8,
        },
        {
          label: "9 am",
          value: 9,
        },
        {
          label: "10 am",
          value: 10,
        },
        {
          label: "11 am",
          value: 11,
        },
        {
          label: "12 am",
          value: 12,
        },
        {
          label: "13 pm",
          value: 13,
        },
        {
          label: "14 pm",
          value: 14,
        },
        {
          label: "15 pm",
          value: 15,
        },
        {
          label: "16 pm",
          value: 16,
        },
        {
          label: "17 pm",
          value: 17,
        },
        {
          label: "18 pm",
          value: 18,
        },
        {
          label: "19 pm",
          value: 19,
        },
        {
          label: "20 pm",
          value: 20,
        },
      ]}
      onChange={start ? handleStartChange : handleEndChange}
    />
  );
};
export default HourSelect;
