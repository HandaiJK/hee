// JSONを `import` で読み込めるようにする
declare module "*.json" {
    const value: any;
    export default value;
}
