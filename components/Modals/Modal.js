import { useState } from "react";
import { Button, Modal } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import RoomSelect from "../Selects/RoomSelect";
import { Input } from "antd";
import HourSelect from "../Selects/HourSelect";
const { TextArea } = Input;
import { useDispatch, useSelector } from "react-redux";
import {
  changeStartDate,
  changeTitle,
  changeDescription,
  changePhone,
  changeTelegramId,
} from "../../redux-store/features/eventBook/counterSlice";
import axios from "axios";
import InputMask from "react-input-mask";
import { getSession, useSession } from "next-auth/react";

const rooms = { Abai: 2, Conference: 1, Ybyrai: 3, Coworking: 4 };

const ModalBook = ({ session }) => {
  const { data, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    room,
    startDate,
    startTime,
    endTime,
    title,
    description,
    phone,
    telegramId,
  } = useSelector((state) => state.eventBook);

  const handleBook = async () => {
    // will go to backend and create new event
    const getTime = (time) => {
      if (time > 9) {
        return time;
      } else {
        return "0" + time;
      }
    };
    const response = await axios.post(
      `http://localhost:5000/users/1/events`,
      {
        title,
        description,
        start_time: startDate + "T" + getTime(startTime) + ":00",
        end_time: startDate + "T" + getTime(endTime) + ":00",
        userId: 1,
        roomId: rooms[room],
        is_approved: false,
        is_passed: false,
      },
      { headers: { Authorization: `Bearer ${data.user.token}` } }
    );
    console.log(response.data);
    setIsModalOpen(false);
  };
  const onChange = (date, dateString) => {
    console.log(date);
    dispatch(changeStartDate(dateString));
  };
  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };
  const handleTitleChange = (e) => {
    e.preventDefault();
    dispatch(changeTitle(e.target.value));
  };
  const handleDescriptionChange = (e) => {
    e.preventDefault();
    dispatch(changeDescription(e.target.value));
  };
  const handlePhoneChange = (e) => {
    e.preventDefault();
    dispatch(changePhone(e.target.value));
  };
  const handleTelegramChange = (e) => {
    e.preventDefault();
    dispatch(changeTelegramId(e.target.value));
  };
  return (
    <div className="flex justify-center mt-3">
      <Button
        type="primary"
        className="bg-[#0D6EFD] w-5/6"
        onClick={() => setIsModalOpen(true)}
      >
        Book room
      </Button>
      <Modal
        title="Book room or leave request"
        className="top-0"
        open={isModalOpen}
        onOk={handleBook}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-[#0D6EFD]"
            onClick={handleBook}
          >
            Book
          </Button>,
        ]}
      >
        <>
          <div className="mt-4">
            Room
            <RoomSelect className="mt-2" onChange={(e) => console.log(e)} />
            {/* select room for booking */}
          </div>

          <div className="mt-2">
            {/* date picker calendar*/}
            Start
            <DatePicker
              className="mt-2"
              style={{ width: "100%" }}
              onChange={onChange}
              size="large"
              showToday={false}
              disabledDate={disabledDate}
            />
          </div>
          <div className="mt-2 flex w-5/5 flex-row">
            <div className="w-1/2 flex flex-col">
              Start time
              <HourSelect value={endTime} className="mt-1 w-2/3" start={true} />
            </div>
            <div className="w-1/2 flex flex-col">
              End time
              <HourSelect
                value={startTime}
                className="mt-1 w-2/3"
                start={false}
              />
            </div>
          </div>
          <div className="mt-2">
            Title
            <Input
              onChange={handleTitleChange}
              value={title}
              className="mt-2"
              size="large"
            />
          </div>
          <div className="mt-2">
            Description
            <TextArea
              onChange={handleDescriptionChange}
              value={description}
              className="mt-2"
              size="large"
            />
          </div>
          <div className="mt-2 flex flex-column">
            Phone
            <InputMask
              mask="(999) 999-99-99"
              value={phone}
              onChange={handlePhoneChange}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  className="mt-2"
                  size="large"
                  addonBefore="+7"
                />
              )}
            </InputMask>
          </div>
          <div className="mt-2">
            Telegram
            <Input
              onChange={handleTelegramChange}
              value={telegramId}
              className="mt-2"
              size="large"
              addonBefore="@"
              placeholder="Telegram account"
            />
          </div>
        </>
      </Modal>
    </div>
  );
};

export default ModalBook;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}
