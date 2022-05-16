<template>
  <div v-for="user in users" :key="user.id">
    <h1>
      {{ user.name }}
    </h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
    };
  },

  created() {
    this.usersShow();
  },

  methods: {
    usersShow() {
      axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
        this.users.push(response.data);
        console.log("User?", response.data);
        console.log(this.users);
      });
      console.log("Stored users?", this.user);
    },
  },
};
</script>
