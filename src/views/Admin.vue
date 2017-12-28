<template>
<container>
    <section>
        <h3 class="header">
            ルーム
        </h3>
        <div>
        <span>
            handaijk
        </span>
        <button>設定</button>
        </div>
    </section>
    <section>
        <h3 class="header">
            進行中のセッション
        </h3>
        <div>
            <span class="session-number">
                #1
            </span>
            <span class="session-title">
                スマート研究室を作ろう
            </span>
        </div>
        <div>
            <span>
                <button>前のセッションへ</button>
            </span>
            <span>
                <button>次のセッションへ</button>
            </span>
        </div>
    </section>
    <section>
        <h3 class="reactions-header">
            REACTIONS
        </h3>
        <div>

       <toggle-button v-model="isReactionsEnabled">
       </toggle-button>
       <span>
           {{ isReactionsEnabled ? "受付中": "待機中" }}
       </span>
        </div>
    </section>
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
export default class Admin extends Vue {
  isReactionsEnabled = true;
}
</script>

<style lang="scss" scoped>
section {
  margin: 48px 0;
}

.header {
  color: gray;
}

.reactions-header {
  font-family: "Roboto", sans-serif;
}

span.session-number {
  font-family: "Fjalla One", sans-serif;
  font-size: 60px;
  color: blue;
}

span.session-title {
  font-size: 32px;
  font-weight: bold;
}
</style>

