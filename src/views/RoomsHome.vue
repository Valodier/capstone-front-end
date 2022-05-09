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
      <div v-if="room.status === true">
        <h1>
          {{ room.name }}

          <!-- Test -->
          {{ userID }}
          <!-- Test -->
        </h1>
        <img :src="room.image" />
        <button v-on:click="tasksShow(task, room)">Tasks</button>
      </div>
    </div>
    <dialog id="room-details">
      <form method="dialog">
        <div v-for="task in tasks" :key="task.id">
          <div
            v-if="
              task.room_id === currentRoom.id &&
              task.user_id == this.userID &&
              task.status === true
            "
          >
            <!-- stores user_ID during login POST and stores it for use here -->
            <!-- to limit returned tasks to those that match the current userID and roomID -->
            <h1>{{ task.title }}</h1>
            <p>{{ task.description }}</p>

            <!-- Tests -->
            <p>{{ task.id }}</p>
            <p>{{ task.status }}</p>
            <!-- Tests -->

            <div>
              <button @click="tasksStatusToFalse(task)">Task Completed!</button>
            </div>
          </div>
        </div>
        <form>
          <h3>Add Task To Current Room</h3>
          Task:
          <input type="text" v-model="newTaskParams.title" />
          Description:
          <input type="text" v-model="newTaskParams.description" />
          <button @click="createTaskForCurrentRoom()"></button>
        </form>
        <div>
          <button @click="roomsStatusToFalse(currentRoom)">Remove Room</button>
        </div>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Rooms!",
      userID: "",
      rooms: [],
      tasks: [],
      currentRoom: {},
      newRoomParams: {},
      editRoomParams: {},
      newTaskParams: {},
      editTaskParams: {},
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

    roomsStatusToFalse(room) {
      this.editRoomParams.status = "false";
      axios
        .patch("/rooms/" + room.id + ".json", this.editRoomParams)
        .then((response) => console.log("Update!", response.data));
      this.editRoomParams.status = "";
      this.$router.push("/rooms");
    },

    tasksIndex: function () {
      axios.get("/tasks.json").then((response) => {
        this.tasks = response.data;
        console.log("Tasks Index Retrieved", response.data);
      });
    },

    createTaskForCurrentRoom() {
      this.newTaskParams.room_id = this.currentRoom.id;
      this.newTaskParams.user_id = this.userID;

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

    tasksShow(task, room, userID) {
      task = this.tasks;
      userID = this.userID;
      this.currentRoom = room;

      // Tests
      console.log(task);
      console.log(room);
      console.log(userID);
      // Tests
      document.querySelector("#room-details").showModal();
    },

    tasksStatusToFalse(task) {
      this.editTaskParams.status = "false";
      console.log("Task id:", task.id);
      axios
        .patch("/tasks/" + task.id + ".json", this.editTaskParams)
        .then((response) => console.log("Update!", response.data));
      this.editTaskParams.status = "";
      this.$router.push("/rooms");
    },
  },
};
</script>
