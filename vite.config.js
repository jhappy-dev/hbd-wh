import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'] // 여기 적어도 pulbic 폴더의 파일들은 캐싱됨
      },

      includeAssets: ['image/*.png'], // 캐싱
      manifest: { // 앱 정보 보관
        name: 'test-app',
        short_name: 'Test',
        description: '앱 테스트',
        theme_color: '#7E5800', // 폰의 status bar 색상
        diaply: 'standalone', // 웹앱처럼 보이게 - default가 이거임
        icons: [ // 192x192, 512x512 필요함
          {
            src: 'img/image2.png',
            sizes: '192x192',
            type: 'img/png'
          },
          {
            src: 'img/image3.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
    })
  ],
  base: '/test/'
})
