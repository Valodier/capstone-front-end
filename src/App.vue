<template>
  <nav>
    <img href="#" src="./assets/quality-500950_640.png" />
    <router-link to="/">Home</router-link>
    <router-link to="/users/:id">Profile</router-link>
    <router-link to="/rooms">Rooms</router-link>
    <router-link to="/tasks">Tasks</router-link>
    <router-link to="/signup">Sign Up</router-link>
    <router-link to="/login">Log In</router-link>
    <router-link to="/logout">Log Out</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 30px;
  background-color: rgb(0, 0, 0);
}

img {
  margin-right: auto;
}

nav a {
  font-weight: bold;
  color: #e1e6ea;
  border: 1px;
  max-height: 25px;
  border-style: solid;
  border-radius: 25%;
  padding: 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
