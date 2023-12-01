<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useFormModal } from "@/app/components/ui/modal";
import type { FormInstance, FormRules } from "element-plus";
import { useProvider } from "@/app/platform";
import { RoomAPI } from "@/modules/room/services/RoomAPI";
import { RoomService } from "@/modules/room/services/RoomService";
import type { Room } from "@/modules/room/models/domain/Room";

const [roomApi, roomService] = useProvider([RoomAPI, RoomService]);
const form = ref<FormInstance | null>(null);
const loading = ref(false);
const router = useRouter();
const foundRooms = ref<Room[]>([]);

const formRules = reactive<FormRules>({
  roomName: [
    {
      required: true,
      message: "Veuillez saisir un nom de salon"
    }
  ]
});

const { isVisible, hide, show, formModel } = useFormModal(
  {
    roomName: ""
  },
  form
);

async function onSubmit(form?: FormInstance) {
  if (!form) {
    return;
  }

  try {
    loading.value = true;
    await form.validate();

    hide();
  } catch (e) {
    return;
  } finally {
    loading.value = false;
  }
}

/**
 * Search rooms that contains the given text.
 * Store the result into foundRooms.
 * @param text
 */
async function searchRooms(text: string) {}

defineExpose({
  show,
  hide
});
</script>

<template>
  <el-dialog v-model="isVisible" title="Ajouter un salon" width="30%">
    <el-form
      ref="form"
      :model="formModel"
      :rules="formRules"
      label-position="top"
      @submit.prevent="onSubmit(form!)"
    >
      <el-form-item label="Nom du salon" prop="roomId">
        <el-input v-model="formModel.roomName" type="text" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="form-actions">
        <el-button native-type="reset" @click="hide()">Annuler</el-button>

        <el-button type="primary" native-type="submit" :loading="loading" @click="onSubmit(form!)">
          Rejoindre
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped>
.search-input {
  width: 100%;
}
</style>
