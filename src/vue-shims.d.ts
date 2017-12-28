// TypeScript コンパイラーに拡張子が '.vue' である
// シングルコンポーネントファイルはVueコンストラクタの
// 形をしていることを伝えるために必要

declare module "*.vue" {
    import * as Vue from "vue";
    export default Vue;
}
