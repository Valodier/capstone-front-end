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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Rooms!",
      rooms: [],
      newRoomParams: {},
      newTaskParams: {},
    };
  },
  created: function () {
    this.roomsIndex();
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
  },
};
</script>
