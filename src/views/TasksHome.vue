<template>
  <div></div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.tasksIndex();
  },
  methods: {
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
  },
};
</script>
