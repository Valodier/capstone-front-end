<template>
  <div>
    <div>
      <h1>Addition</h1>
      Name:
      <input type="text" v-model="newRoomParams.name" />
      Room Image:
      <input type="text" v-model="newRoomParams.bgimage" />
      <br /><button v-on:click="roomsCreate">Add Room</button>
    </div>
    <div v-for="room in rooms" :key="room.id">
      <h1>{{ room.name }}</h1>
    </div>
    <dialog id="room-details">
      <form></form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Rooms!",
      rooms: [],
      tasks: [],
      newRoomParams: {},
      newTaskParams: {},
      currentRoom: {},
      currentRoomTasks: {},
    };
  },
  created: function () {
    this.roomsIndex();
    this.tasksIndex();
  },
  methods: {
    roomsIndex: function () {
      axios.get("/rooms.json").then((response) => {
        this.rooms = response.data;
        console.log("Rooms Index Retrieves", response.data);
      });
    },
    roomsCreate() {
      axios
        .post("/rooms.json", this.newRoomParams)
        .then((response) => {
          console.log("Room creation successful", response.data);
          this.$router.push("/rooms");
        })
        .catch((error) => {
          console.log("Error creating room", error.response.data.errors);
        });
    },
    // roomsShow(room) {
    //   console.log(room);
    //   this.currentRoom = room;
    //   document.querySelector("#room-details").showModal();
    // },
    tasksIndex: function () {
      axios.get("/tasks.json").then((response) => {
        (this.tasks = response.data),
          console.log("Tasks Index Retrieved", response.data);
      });
    },
    tasksCreate() {
      axios
        .post("/tasks.json", this.newTaskParams)
        .then((response) => {
          console.log("Task created successfully", response.data);
          this.$router.push("/tasks");
        })
        .catch((error) => {
          console.log("Error creating room", error.response.data.error);
        });
    },
    tasksShow(room) {
      console.log(room);
      this.currentRoomTasks = room.task;
      document.querySelector("#room-details").showModal();
    },
  },
};
</script>
