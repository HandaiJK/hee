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
                {{ currentSessionNumber }}
            </span>
            <span class="session-title">
                {{ currentSessionTitle }}
            </span>
        </div>
        <div>
            <span>
                <button @click="requestGotoPreviousSession" :disabled="isGotoPreviousSessionButtonDisabled">前のセッションへ</button>
            </span>
            <span>
                <button @click="requestGotoNextSession" :disabled="isGotoNextSessionButtonDisabled">次のセッションへ</button>
            </span>
            <span class="progress-message" v-show="sessionChanging">
                セッションを移動中です...
            </span>
        </div>
        <div>
            <p class="progress-message error" v-show="sessionChangeFailed">セッションの移動に失敗しました</p>
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
import { actiontypes } from "../vuex/types";
import { SessionInfo } from "../api/HeeApiClient";

@Component({
  components: {
    Container
  }
})
export default class Admin extends Vue {
  isReactionsEnabled = true;

  requestGotoPreviousSession() {
    this.$store.dispatch(actiontypes.REQUEST_GOTO_PREVIOUS_SESSION);
  }

  requestGotoNextSession() {
    this.$store.dispatch(actiontypes.REQUEST_GOTO_NEXT_SESSION);
  }

  private get currentSession(): SessionInfo | undefined {
    return this.$store.state.currentSession;
  }

  get currentSessionNumber(): string {
    return this.currentSession !== undefined
      ? "#" + this.currentSession.sessionNumber.toString()
      : "--";
  }

  get currentSessionTitle(): string {
    return this.currentSession !== undefined ? this.currentSession.title : "--";
  }

  get sessionChanging(): boolean {
    return this.$store.state.sessionState === "changing";
  }

  get sessionChangeFailed(): boolean {
    return this.$store.state.sessionState === "failed";
  }

  get isGotoNextSessionButtonDisabled(): boolean {
    return (
      this.sessionChanging ||
      this.currentSession === undefined ||
      this.currentSession.attr.isLast
    );
  }

  get isGotoPreviousSessionButtonDisabled(): boolean {
    return (
      this.sessionChanging ||
      this.currentSession === undefined ||
      this.currentSession.attr.isFirst
    );
  }
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
