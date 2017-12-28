<template>
<div class="point-item">
    <section id="main">
        <p class="point">{{point}}</p>
    </section>
    <section id="detail">
        <div id="item-name">
            <p>{{itemName}}</p>
        </div>
    </section>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    itemName: String,
    point: Number
  }
})
export default class PointItem extends Vue {}
</script>

<style lang="scss" scoped>
div.point-item {
  width: 240px;
  height: 240px;
  border: 1px solid blue;
  border-radius: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;

  section#main {
    // background-color: yellow;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    p.point {
      font-size: 72px;
      font-family: "Fjalla One", sans-serif;
      text-align: center;
      margin: 0;
    }
  }

  section#detail {
    // background-color: skyblue;

    div#item-name {
      margin: 8px 48px;
      border: 1px solid gray;
      text-align: center;
      padding: 6px;
      border-radius: 100px;

      p {
        font-size: 24px;
        margin: 0;
        font-weight: bold;
      }
    }
  }
}
</style>
