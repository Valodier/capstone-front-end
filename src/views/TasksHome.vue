<template>
  <div v-for="task in tasks" :key="task.id">
    <h1>{{ task.title }}</h1>
  </div>
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
  },
};
</script>
