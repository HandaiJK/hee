<template>
<div>
  <p>
    <span>{{header}}</span>
    <span class="is-valid" v-show="isValidValue">[OK]</span>
  </p>
    <input type="text" v-on:input="onInput" >
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Container from "../components/container.vue";

@Component({
  props: ["header", "value", "isValidValue"]
})
export default class New extends Vue {
  onInput(e) {
    this.$emit("changed", e.target.value);
  }
}
</script>

<style lang="scss" scoped>
span.is-valid {
  color: green;
}
</style>
