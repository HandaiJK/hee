<template>
<div id="container">
    <slot></slot>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Container extends Vue {}
</script>

<style lang="scss" scoped>
#container {
  margin-right: auto;
  margin-left: auto;
  max-width: 920px;
}
</style>
