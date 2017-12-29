<template>
<container>
  <div>
    <h1 id="title">
      内製へぇシステム
    </h1>
    <form>
      <input id="room" type="text" placeholder="ルーム名を入力..." v-model="roomName">
    </form>
    <button @click="requestJoinRoom" :disabled="!isValidRoomName || roomJoining">ルームに参加する</button>
    <p class="progress-message" v-show="roomJoiningMessageVisible">
      参加しています...
    </p>
    <p class="progress-message error" v-show="roomJoinFailedMessageVisible">
      ルームの参加に失敗しました
    </p>
  </div>
  <div>
    <p id="mataha">または</p>
    <button @click="createNewRoom" :disabled="roomJoining">ルームを作成する</button>
  </div>
</container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Container from "../components/container.vue";
import { types } from "../vuex/types";

@Component({
  components: {
    Container
  }
})
export default class Home extends Vue {
  roomName: string = "";

  get state() {
    return this.$store.state;
  }

  get roomJoiningMessageVisible(): boolean {
    return this.roomJoining;
  }

  get roomJoinFailedMessageVisible(): boolean {
    return this.state.roomJoinState === "failed";
  }

  get roomJoining(): boolean {
    // ルーム参加中はボタンを押せないようにする
    return this.state.roomJoinState === "joining";
  }

  get isValidRoomName(): boolean {
    // TODO: ルーム名の制約を決めて、バリデーションをきっちりやる
    return this.roomName.length > 0;
  }

  requestJoinRoom() {
    this.$store.dispatch("joinRoom", this.roomName);
  }

  createNewRoom() {
    this.$store.dispatch("navigateToNewPage");
  }
}
</script>

<style lang="scss" scoped>
#container {
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
  text-align: center;
}

h1#title {
  text-align: center;
  color: gray;
  font-size: 48px;
  font-weight: 100;
}

input#room {
  width: 100%;
  font-size: 32px;
}

input#enter {
  margin: 24px 0;
}

p#mataha {
  color: gray;
  margin: 4px;
}
</style>

<style lang="scss">
// load grobal style
@import "~../_default.scss";
</style>
