import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RoomsHome from "../views/RoomsHome.vue";
import UsersShow from "../views/UsersShow.vue";
import TasksHome from "../views/TasksHome.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import LogOut from "../views/LogOut.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/users/:id",
    name: "users",
    component: UsersShow,
  },
  {
    path: "/rooms",
    name: "rooms",
    component: RoomsHome,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TasksHome,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: SignUp,
  },
  {
    path: "/login",
    name: "log-in",
    component: LogIn,
  },
  {
    path: "/logout",
    name: "log-out",
    component: LogOut,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
