<template>
<container>
    <h1>
        ルームを作成する
    </h1>
    <header-input header="ルーム名" 
    :value="roomName.value"
    :isValidValue="roomName.isValid"
    @changed="s => updateRoomName(s)">
    </header-input>

    <h2>
      セッション
    </h2>
    <header-input
     v-for="session in sessions"
     :key="sessions.indexOf(session)"
     :header="'#' + (sessions.indexOf(session) + 1) + ' タイトル'" 
     :value="session.value"
     :isValidValue="session.isValid"
     @changed="s => updateSessionName(session, s)">
    </header-input>

    <button type="button" v-on:click="addSession()" :disabled="buttonsDisabled">
      +セッションを追加
    </button>  
    <button type="button" @click="create()" :disabled="!canCreateRoom || buttonsDisabled">
      作成する
    </button>

    <p class="progress-message" v-show="roomCreating">
      作成中です...
    </p>
    <p class="progress-message error" v-show="roomCreateFailed">
      ルームの作成に失敗しました
    </p>
</container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Container from "../components/container.vue";
import HeaderInput from "../components/HeaderInput.vue";
import { RoomConfiguration } from "../models/RoomConfiguration";

// TODO: セッションを削除できるようにする

interface VV {
  value: string;
  isValid: boolean;
}

@Component({
  components: {
    Container,
    HeaderInput
  }
})
export default class New extends Vue {
  roomName: VV = { value: "", isValid: false };
  sessions: VV[] = new Array(3)
    .fill(3)
    .map(x => ({ value: "", isValid: false }));

  addSession() {
    this.sessions.push({ value: "", isValid: false });
  }

  create() {
    const roomConfig = new RoomConfiguration(
      this.roomName.value,
      this.sessions.map(x => ({ title: x.value }))
    );

    // API呼び出し
    this.$store.dispatch("requestCreateNewRoom", roomConfig);
  }

  isValid(s: string) {
    return s.length > 0;
  }

  updateRoomName(name: string) {
    this.roomName.value = name;
    this.roomName.isValid = this.isValid(name);
  }

  updateSessionName(session: VV, name: string) {
    session.value = name;
    session.isValid = this.isValid(name);
  }

  get canCreateRoom(): boolean {
    const a = this.roomName.isValid;
    const b = this.sessions.map(x => x.isValid).reduce((a, b) => a && b);
    return a && b;
  }

  get roomCreating(): boolean {
    return this.$store.state.roomCreateState == "creating";
  }

  get roomCreateFailed(): boolean {
    return this.$store.state.roomCreateState == "failed";
  }

  get buttonsDisabled(): boolean {
    return this.roomCreating;
  }
}
</script>

<style lang="scss" scoped>

</style>
