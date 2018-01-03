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
      <div v-for="r in reactions" :key="r.id">
        <button :class="'btn-' + r.color" 
        @click="onReactionButtonClicked(r.id)">
       {{ r.displayName }}
     </button> 
     <p>
       + {{ r.count }}
     </p>
      </div>
    </div>
</container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Container from "../components/container.vue";
import { RoomApiClient } from "../api/HeeApiClient";
import { ReactionInfo, ReactionData, ReactionId } from "../settings";

interface Reaction extends ReactionInfo {
  count: number;
}

@Component({
  components: {
    Container
  }
})
export default class RoomHome extends Vue {
  reactions: Reaction[] = ReactionData.map(x => {
    return {
      ...x,
      count: 0
    };
  });

  private getApiClient(): RoomApiClient {
    return this.$store.state.roomApiClient;
  }

  onReactionButtonClicked(reactionId: ReactionId) {
    this.getApiClient().makeReaction(reactionId);
    this.reactions[reactionId].count++;
  }
}
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
    background: linear-gradient(to right, #5b86e5, #36d1dc);
  }
  .btn-purple {
    background: linear-gradient(to right, #1d2671, #c33764);
  }
  .btn-green {
    background: linear-gradient(to right, #93f9b9, #1d976c);
  }
}
</style>
