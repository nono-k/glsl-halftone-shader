import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";

export default defineConfig({
  base: "/glsl-halftone-shader/",
  build: {
    rolldownOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        demo: resolve(__dirname, "demo.html")
      }
    }
  },
  plugins: [
    glsl({
      include: ["**/*.glsl", "**/*.frag", "**/*.vert"]
    })
  ]
});