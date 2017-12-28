<template>
<container>
  <div>
    <h1 id="title">
      内製へぇシステム
    </h1>
    <form action="aa">
<input id="room" type="text" placeholder="ルーム名を入力...">
<input id="enter" type="submit" value="ルームに参加する">
    </form>
  </div>
  <div>
    <p id="mataha">または</p>
<form action="bb">
  <input type="submit" value="ルームを作成する">
</form>
  </div>
</container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Container from "../components/container.vue";

@Component({
  components: {
    Container
  }
})
export default class Home extends Vue {}
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
