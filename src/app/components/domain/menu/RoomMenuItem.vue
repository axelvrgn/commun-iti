<script lang="ts" setup>
import { useProvider, useState } from "@/app/platform";
import { RoomService } from "@/modules/room/services/RoomService";
import { RoomStore } from "@/modules/room/store";
import { Plus, Search } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import RoomCreationModal from "@/app/components/domain/room/RoomCreationModal.vue";
import RoomSearchModal from "@/app/components/domain/room/RoomSearchModal.vue";

const state = useState(RoomStore);
const [roomService] = useProvider([RoomService]);

const roomCreationModalIsOpen = ref<InstanceType<typeof RoomCreationModal>>();
const roomSearchModalIsOpen = ref<InstanceType<typeof RoomSearchModal>>();

onMounted(() => {
  if (state.rooms.length === 0) {
    roomService.fetchMore();
  }
});

const openCreationModal = () => {
  roomCreationModalIsOpen.value?.show();
};

const openSearchModal = () => {
  roomSearchModalIsOpen.value?.show();
};
</script>

<template>
  <div class="room-menu-item">
    <div class="room-menu-title">Salon actuel</div>

    <div class="room-menu-main">
      <div class="room-menu-name">{{ state.currentRoom?.name }}</div>
      <div class="room-menu-actions">
        <el-button :icon="Plus" size="default" @click="openCreationModal" circle />
        <el-button :icon="Search" size="default" @click="openSearchModal" circle />
        <room-creation-modal ref="roomCreationModalIsOpen" />
        <room-search-modal ref="roomSearchModalIsOpen" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/app/styles/var";

.room-menu-item {
  padding: map-get(var.$spaces, "xs");
  color: white;

  .room-menu-title {
    font-size: 70%;
    color: rgba(255, 255, 255, 0.7);
  }
  .room-menu-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .room-menu-actions {
      display: flex;
      gap: map-get(var.$spaces, "2xs");
    }
  }
}
</style>
