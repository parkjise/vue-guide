// 선택 적용 예시입니다. 현재 앱은 명시적인 @use를 유지하며 이 설정을 실행하지 않습니다.
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  css: {
    preprocessorOptions: {
      scss: {
        // CSS 선택자를 출력하지 않는 모듈만 주입하세요. 같은 파일을 SFC에서 다시 @use하지 마세요.
        additionalData:
          '@use "@/assets/styles/practice/tokens" as tokens; @use "@/assets/styles/mixins" as mix;\n'
      }
    }
  }
});
