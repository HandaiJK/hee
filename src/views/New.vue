<template>
<container>
    <h1>
        ルームを作成する
    </h1>
    <header-input header="ルーム名" :value="roomConfig.roomName" @changed="s => {roomConfig.roomName = s;}">
    </header-input>

    <h2>
      セッション
    </h2>
    <header-input v-for="session in roomConfig.sessions" :key="roomConfig.sessions.indexOf(session)" :header="'#' + (roomConfig.sessions.indexOf(session) + 1) + ' セッション名'" :value="session.title" @changed="s => {session.title = s;}">
    </header-input>

    <button type="button" v-on:click="addSession()">+セッションを追加</button>  
    <button type="button" @click="create()">作成する</button>
</container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Container from "../components/container.vue";
import HeaderInput from "../components/HeaderInput.vue";
import { RoomConfiguration } from "../models/RoomConfiguration";

// TODO: セッションを削除できるようにする
// TODO: ルーム名、セッション名のバリデーションを行う

@Component({
  components: {
    Container,
    HeaderInput
  }
})
export default class New extends Vue {
  roomConfig: RoomConfiguration = new RoomConfiguration();

  addSession() {
    this.roomConfig.sessions.push({ title: "" });
  }

  create() {
    console.log(this.roomConfig.toString());
  }
}
</script>

<style lang="scss" scoped>

</style>
