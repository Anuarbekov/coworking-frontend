import ModalBook from "./Modals/Modal";
import { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEvents: [],
    };
  }
  componentDidMount = () => {
    axios.get("http://localhost:5000/event").then((response) => {
      this.setState({
        newEvents: response.data.map((event) => {
          return {
            title: event.title,
            start: event.start_time,
            end: event.end_time,
            description: event.description,
            backgroundColor:
              event.roomId === 2 // abai
                ? "red"
                : event.roomId === 1 // conference
                ? "blue"
                : event.roomId === 3 // ybyrai
                ? "green"
                : event.roomId === 4 // coworking
                ? "#ddc123"
                : "purple",
          };
        }),
      });
    });
  };

  render() {
    const { status } = this.props;
    return (
      <div className="flex mt-5">
        <div className="ml-5 card w-1/5">
          <ModalBook />
        </div>
        <div className="ml-5 card mr-5 p-3 w-4/5">
          <FullCalendar
            selectable
            editable
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              bootstrap5Plugin,
            ]}
            eventDrop={(info) => {
              info.revert();
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            eventStartEditable
            themeSystem="bootstrap5"
            events={this.state.newEvents}
            eventClick={(info) => {
              console.log("Event: " + info.event.title);
            }}
          />
          <ToastContainer limit={3} />
        </div>
      </div>
    );
  }
}
