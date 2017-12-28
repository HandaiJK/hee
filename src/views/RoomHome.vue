<template>
<container>
    <div>
    <span class="room-tooltip">
        <span>ルーム:</span>
        <span class="room-name">handaijk</span>
    </span>
    </div>

    <div>
<h1 id="reactions">REACTIONS</h1>        
    </div>
    <div id="buttons-wrapper">
<button class="btn-blue">へぇ</button>
<button class="btn-purple">わかる</button>
<button class="btn-green">!?</button>
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
export default class RoomHome extends Vue {}
</script>

<style lang="scss" scoped>
span.room-tooltip {
  span.room-name {
    color: purple;
  }
}

h1#reactions {
  font-size: 48px;
  font-family: "Roboto";
}

#buttons-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 96px 0px;

  button {
    width: 140px;
    height: 54px;
    font-size: 24px;
    color: white;
    font-weight: bold;
    background-color: #000;
    border-radius: 27px;
    border: none;
    cursor: pointer;
    box-shadow: 0px 3px 24px 6px #ddd;
  }

  .btn-blue {
    background: linear-gradient(
      to right,
      #5b86e5,
      #36d1dc
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .btn-purple {
    background: linear-gradient(
      to right,
      #1d2671,
      #c33764
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .btn-green {
    background: linear-gradient(to right, #93f9b9, #1d976c);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}
</style>
