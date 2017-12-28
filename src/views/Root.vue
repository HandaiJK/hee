<template>
<div>
    <ul>
        <li>
           <router-link to="/home">Home</router-link> 
        </li>
        <li>
           <router-link to="/roomhome">Room Home</router-link> 
        </li>
        <li>
           <router-link to="/display">Display</router-link> 
        </li>
        <li>
           <router-link to="/new">Create new</router-link> 
        </li>
        <li>
           <router-link to="/admin">Admin</router-link> 
        </li>
    </ul>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Root extends Vue {}
</script>

