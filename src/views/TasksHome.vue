<template>
  <div>
    <div v-for="task in tasks" :key="task.id">
      <h1>{{ task.title }}</h1>
      <button @click="tasksShow(task)">Add task to Room</button>

      <dialog id="add-task-to-rooms">
        <form method="dialog">
          <div v-for="room in rooms" :key="room.id">
            <input type="checkbox" :value="room.id" v-model="axiosRequests" />
            {{ room.name }}
            <!-- Attempting to make it so clicking this checkbox references the room name next to it to add the current task to that room -->
          </div>
          <button @click="addTaskToSelectedRooms(task)">
            Add task to Rooms
          </button>
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
      userID: "",
      currentTask: {},
      newTaskParams: {},
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

    tasksShow(task) {
      // Tests
      console.log(task);
      // Tests

      document.querySelector("#add-task-to-rooms").showModal();
    },

    createTaskForCurrentRoom(i) {
      console.log("Initiating Create task");
      this.newTaskParams.room_id = i;
      this.newTaskParams.user_id = this.userID;
      this.newTaskParams.title = this.currentTask.title;
      this.newTaskParams.description = this.currentTask.description;
      this.newTaskParams.status = this.currentTask.status;

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

    addTaskToSelectedRooms(task) {
      this.currentTask = task;
      console.log("Current Task:", this.currentTask);
      this.axiosRequests.forEach((i) => {
        this.createTaskForCurrentRoom(i);
      });
      console.log("Selected rooms added", this.axiosRequests);
      this.axiosRequests = [];
      console.log("Empty axiosRequests", this.axiosRequests);
    },
  },
};
</script>
