<template>
  <div>
    <div v-for="task in tasks" :key="task.id">
      <h1>{{ task.title }}</h1>
      <p>{{ task.description }}</p>
      <button @click="tasksShow(task)">Add task to Room</button>

      <dialog id="add-task-to-rooms">
        <form method="dialog">
          <div v-for="room in rooms" :key="room.id">
            <input type="checkbox" :value="room.id" v-model="axiosRequests" />
            {{ room.name }}
          </div>
          <div>
            <input v-model="userFilter" type="text" list="users-name" />

            <datalist id="users-name">
              <option v-for="user in groupID" :key="user.id">
                {{ user.name }}
              </option>
            </datalist>
          </div>

          <button @click="addTaskToSelectedRooms(task)">Add task</button>

          <button>Close</button>
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
      groupID: [],
      userFilter: [],
      currentTask: {},
      newTaskParams: {},
      axiosRequests: [],
    };
  },
  created() {
    this.tasksIndex();
    this.roomsIndex();
    this.usersGroupIndex();
  },
  methods: {
    usersGroupIndex: function () {
      axios
        .get("/groups/" + localStorage.group_id + ".json")
        .then((response) => {
          (this.groupID = response.data),
            console.log("Group Index Retrieved", response.data);
        });
    },
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

    createTaskForCurrentRoom(i, j) {
      console.log("Initiating Create task");
      this.newTaskParams.room_id = i;
      this.newTaskParams.user_id = j.id;
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
      // this.currentTask = task;
      // this.axiosRequests.forEach((i) => {
      //   this.createTaskForCurrentRoom(i);
      // });
      // this.axiosRequests = [];

      // Tests
      console.log(
        "Chosen user?",
        this.groupID.find((j) => {
          if (j.name == this.userFilter) return j;
        })
      );
      console.log("Group?", this.groupID);
      console.log("Current Task:", this.currentTask, task);
      // console.log("Selected rooms added", this.axiosRequests);
      // console.log("Empty axiosRequests", this.axiosRequests);
      // Tests
    },
  },
};
</script>
