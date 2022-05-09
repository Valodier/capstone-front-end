<template>
  <div v-for="task in tasks" :key="task.id">
    <h1>{{ task.title }}</h1>
    <button @click="tasksShow(task, room)">Add task to Room</button>
    <dialog id="add-task-to-room">
      <form method="dialog"></form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      rooms: [],
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
      task = this.tasks;
      room = this.rooms;

      // Tests
      console.log(task);
      console.log(room);
      // Tests

      document.querySelector("#add-task-to-room").showModal();
    },
  },
};
</script>
