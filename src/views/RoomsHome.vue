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
        </h1>
        <img :src="room.image" />
        <button v-on:click="trueTasksShow(room)">Tasks</button> |
        <button v-on:click="falseTasksShow(room)">Finished Tasks</button>
      </div>
    </div>

    <dialog id="room-details">
      <form method="dialog">
        <div v-for="task in tasks" :key="task.id">
          <div
            v-if="
              task.room_id == currentRoom.id &&
              task.user_id == this.userID &&
              task.status == true
            "
          >
            <!-- stores user_ID during login POST and stores it for use here -->
            <!-- to limit returned tasks to those that match the current userID and roomID -->
            <h1>{{ task.title }}</h1>
            <p>{{ task.description }}</p>
            <div>
              <button @click="tasksStatusChange(task)">Task Completed!</button>
            </div>
          </div>
        </div>

        <form>
          <h3>Add Task To Current Room</h3>
          Task:
          <input type="text" v-model="newTaskParams.title" />
          Description:
          <input type="text" v-model="newTaskParams.description" />
          <button @click="createTaskForCurrentRoom(currentRoom)">
            Add Task
          </button>
        </form>

        <div>
          <button @click="roomsStatusToFalse(currentRoom)">Remove Room</button>
        </div>
        <button>Close</button>
      </form>
    </dialog>

    <dialog id="finished-tasks">
      <form method="dialog">
        <div v-for="task in tasks" :key="task.id">
          <div
            v-if="
              task.room_id == currentRoom.id &&
              task.user_id == this.userID &&
              task.status == false
            "
          >
            <!-- stores user_ID during login POST and stores it for use here -->
            <!-- to limit returned tasks to those that match the current userID and roomID -->
            <h1>{{ task.title }}</h1>
            <p>{{ task.description }}</p>
            <div>
              <button @click="tasksStatusChange(task)">Re-add Task</button>
            </div>
          </div>
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

    trueTasksShow(room) {
      this.currentRoom = room;
      // Tests
      console.log(room);
      // Tests
      document.querySelector("#room-details").showModal();
    },

    falseTasksShow(room) {
      this.currentRoom = room;
      // Tests
      console.log(room);
      // Tests
      document.querySelector("#finished-tasks").showModal();
    },

    tasksStatusChange(task) {
      console.log(task.status);
      if (task.status == false) {
        console.log("Changing Status to true");
        this.editTaskParams.status = "true";
        // makes it ?reactive? idk, updates the local tasks array so the page doesnt have to be refreshed to reflect change in list.
        task.status = "true";
      } else {
        console.log("Changing Status to false");
        this.editTaskParams.status = "false";
        task.status = "false";
      }
      axios
        .patch("/tasks/" + task.id + ".json", this.editTaskParams)
        .then((response) => console.log("Update!", response.data, task.status));
      this.editTaskParams.status = "";
      this.$router.push("/rooms");
    },
  },
};
</script>
