<script lang="ts" setup>
import { ref } from "vue";
import BgImage from "@/app/components/ui/BgImage.vue";
import { ElMessageBox } from "element-plus";
import { SwitchButton, Edit, Bell } from "@element-plus/icons-vue";
import { AuthenticationStore } from "@/modules/authentication/store/AuthenticationStore";
import { useProvider, useState } from "@/app/platform";
import { AuthenticationService } from "@/modules/authentication/services";
import EditUserProfileModal from "@/app/components/domain/user/EditUserProfileModal.vue";
import RightMenu from "./RightMenu.vue";

const state = useState(AuthenticationStore);
const [authService] = useProvider([AuthenticationService]);

const editUserProfileModalIsOpen = ref<InstanceType<typeof EditUserProfileModal>>();
const rightMenuIsOpen = ref<InstanceType<typeof RightMenu>>();

const openEdituserProfileModal = () => {
  editUserProfileModalIsOpen.value?.show({
    username: state.loggedUser ? state.loggedUser.username : "",
    pictureUrl: state.loggedUser ? state.loggedUser.pictureUrl : "",
    picture: null
  });
};

const openRightMenu = () => {
  rightMenuIsOpen.value?.show();
};

function logout() {
  ElMessageBox.confirm("Souhaitez-vous vous déconnecter de la session actuelle ?", "Warning", {
    confirmButtonText: "Oui",
    cancelButtonText: "Annuler",
    type: "warning"
  })
    .then(() => {
      authService.logout();
      location.href = "/login";
    })
    .catch(() => {});
}
</script>

<template>
  <div class="user-profile-menu-item">
    <div class="user-profile-info">
      <bg-image class="user-profile-info-picture" :src="state.loggedUser?.pictureUrl!" />

      <div class="user-profile-info-username">{{ state.loggedUser?.username }}</div>
    </div>

    <div class="user-profile-actions">
      <el-button :icon="SwitchButton" type="danger" size="default" @click="logout()" />
      <el-button :icon="Edit" size="default" @click="openEdituserProfileModal" />
      <el-button :icon="Bell" size="default" @click="openRightMenu" />
      <edit-user-profile-modal ref="editUserProfileModalIsOpen" />
      <right-menu ref="rightMenuIsOpen" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";
@use "@/app/styles/var";

.user-profile-info {
  height: var.$layout-top-menu-height * 2;
  padding: map-get(var.$spaces, "xs");
  display: flex;
  color: white;
  font-size: 14px;

  gap: map-get(var.$spaces, "xs");

  > .user-profile-info-picture {
    $width: calc(var.$layout-top-menu-height * 2 - map-get(var.$spaces, "xs") * 2);
    height: 100%;
    width: $width;
    min-width: $width;
  }
}

.user-profile-actions {
  display: flex;
  justify-content: space-between;
  padding: 0 map-get(var.$spaces, "xs") map-get(var.$spaces, "xs") map-get(var.$spaces, "xs");
}
</style>
