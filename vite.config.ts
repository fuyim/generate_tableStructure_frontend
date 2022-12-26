import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 兼容传统浏览器插件
import legacy from '@vitejs/plugin-legacy'
import dns from 'dns'
import { resolve } from 'path'
import open from 'open'
// 以下配置具体看官网https://cn.vitejs.dev/config配置
// Node.js 在 v17 以下版本中默认会对 DNS 解析地址的结果进行重新排序，当访问 localhost 时，浏览器使用 DNS 来解析地址。
// 通过一下配置禁用这个重新排序的行为
dns.setDefaultResultOrder('verbatim')



// https://vitejs.dev/config/
export default defineConfig({
  // 别名配置
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名 
    }
  },

  // 配置前端服务地址以及端口
  server: {
    port: 80,
    host: 'localhost',
    strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    open: true,
    proxy: {
      // 配置代理
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    // 为开发服务器配置 CORS。默认启用并允许任何源
    cors: true
  },

  // 构建选项
  build: {
    // 设置最终构建的浏览器兼容目标
    target: 'modules',
    // 指定输出路径（相对于 项目根目录)
    outDir: resolve(__dirname, "dist"),
    // 指定生成静态资源的存放路径
    assetsDir: 'assets',
    // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
    emptyOutDir: true,
  },

  // 依赖优化选项
  optimizeDeps: {
    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    include: ['axios'],
  },

  // 插件配置
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      renderLegacyChunks: true,
    }),
    
  ],
})
