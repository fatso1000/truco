import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@views/HomeView.vue";
import OptionsView from "@views/OptionsView.vue";
import Play from "@views/PlayView.vue";
import PlayOptionsView from "@views/PlayOptionsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/options",
      name: "options",
      component: OptionsView,
      props: true,
    },
    {
      path: "/playOptions",
      name: "playOptions",
      component: PlayOptionsView,
      props: true,
    },
    {
      path: "/play",
      name: "play",
      component: Play,
      props: true,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
