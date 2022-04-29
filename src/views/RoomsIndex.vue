<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Rooms!",
      rooms: [],
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
  },
};
</script>
