<template>
<container>
<div id="point-item-wrapper">
    <point-item v-for="item in items" v-bind:key="item.itemName" :itemName="item.itemName" :point="item.point" >
    </point-item>
</div>
</container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PointItem from "../components/pointItem.vue";
import Container from "../components/container.vue";
import { PointItemModel } from "../models/pointItemModel";

@Component({
  components: {
    Container,
    PointItem
  }
})
export default class Display extends Vue {
  items: PointItemModel[] = [
    {
      itemName: "へぇ",
      point: 74
    },
    {
      itemName: "わかる",
      point: 23
    },
    {
      itemName: "!?",
      point: 97
    }
  ];
}
</script>

<style lang="scss" scoped>
div#point-item-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>

