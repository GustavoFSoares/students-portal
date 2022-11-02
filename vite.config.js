export default defineConfig({
  plugins: [],
  server: {
    port: 9000,
    https: false,
    hmr: {
      host: "localhost",
      port: 8081,
      protocol: "wss",
    },
  }
});
