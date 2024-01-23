<script lang="ts" setup>
import { ref } from "vue";

const notifications = ref<any[]>([]);

getNotifications();

function getNotifications() {
  const itiNotif = localStorage.getItem("iti.notifications");

  if (itiNotif) {
    console.log(JSON.parse(itiNotif));
    notifications.value = JSON.parse(itiNotif);
  }
}
</script>

<template>
  <ul>
    <li v-for="notif in notifications.slice(0, -1)" :key="notif">
      {{ notif.message }}
    </li>
  </ul>
</template>
