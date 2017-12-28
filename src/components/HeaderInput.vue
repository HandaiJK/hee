<template>
<div>
    <p>{{header}}</p>
    <input type="text" v-on:input="onInput" >
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Container from "../components/container.vue";

@Component({
  props: ["header", "value"]
})
export default class New extends Vue {
  onInput(e) {
    this.$emit("changed", e.target.value);
  }
}
</script>

<style lang="scss" scoped>

</style>
