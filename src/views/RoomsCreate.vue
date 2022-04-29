<template>
  <div>
    <h1>Add a Room to your floorplan</h1>
    <form>
      Name:
      <input type="text" v-model="newRoomsParams.name" />
      Image:
      <input type="text" v-model="newRoomsParams.bgimage" />
    </form>
    <button v-on:click="roomsCreate()">Add Room</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rooms: [],
      newRoomsParams: {},
      error: {},
    };
  },
  methods: {
    roomsCreate() {
      axios
        .post("/rooms", this.newRoomsParams)
        .then((response) => {
          console.log("Room creation successful", response.data);
          this.$router.push("/rooms");
        })
        .catch((error) => {
          console.log("Error creating room", error.response.data.errors);
        });
    },
  },
};
</script>
