<template>
  <div>
    <div v-for="task in tasks" :key="task.id">
      <h1>{{ task.title }}</h1>
      <button @click="tasksShow(task, room)">Add task to Room</button>

      <dialog id="add-task-to-rooms">
        <form method="dialog">
          <div v-for="room in rooms" :key="room.id">
            <input type="checkbox" :value="room.id" v-model="axiosRequests" />
            {{ room.name }}
            {{ task.title }}
            <!-- Attempting to make it so clicking this checkbox references the room name next to it to add the current task to that room -->
          </div>
          <button @click="addTaskToSelectedRooms()">Add task to Rooms</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      rooms: [],
      currentTask: {},
      editRoomParams: {},
      axiosRequests: [],
    };
  },
  created() {
    this.tasksIndex();
    this.roomsIndex();
  },
  methods: {
    tasksIndex: function () {
      axios.get("/tasks.json").then((response) => {
        (this.tasks = response.data),
          console.log("Tasks Index Retrieved", response.data);
      });
    },

    roomsIndex: function () {
      axios.get("/rooms.json").then((response) => {
        this.rooms = response.data;
        console.log(
          "Rooms Index Retrieved",
          localStorage.user_id,
          response.data
        );
        this.userID = localStorage.user_id;
        // Returns sorted array by ID, meaning the most recently created room is at the bottom
        return this.rooms.sort((a, b) => a.id - b.id);
      });
    },

    tasksShow(task, room) {
      // Tests
      console.log(task);
      console.log(room);
      // Tests

      document.querySelector("#add-task-to-rooms").showModal();
    },

    createTaskForCurrentRoom() {
      this.newTaskParams.room_id = this.currentRoom.id;
      this.newTaskParams.user_id = this.userID;
      this.newTaskParams.title = this.task.title;

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

    addTaskToSelectedRooms() {
      this.axiosRequests.forEach((i) => {
        console.log(i);
      });
      console.log("Selected rooms added", this.axiosRequests);
      this.axiosRequests = [];
      console.log(this.axiosRequests);
    },
  },
};
</script>
