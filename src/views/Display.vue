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
import { SessionInfo } from "../api/HeeApiClient";
import { ReactionData } from "../settings";

@Component({
  components: {
    Container,
    PointItem
  }
})
export default class Display extends Vue {
  get items(): PointItemModel[] {
    const session = this.$store.state.currentSession as SessionInfo;
    return session.reactions.map(x => ({
      itemName: ReactionData.find(y => y.id == x.id)!!.displayName,
      point: x.count
    }));
  }
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
