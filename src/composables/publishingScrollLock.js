import { watch, onUnmounted } from 'vue';
// 여러 모달이 겹쳐도 마지막 잠금이 해제될 때만 기존 스타일을 복원합니다.
export function createScrollLockManager(doc, viewport) {
  let count = 0;
  let previous;
  return {
    acquire() {
      if (count === 0) {
        previous = { overflow: doc.body.style.overflow, paddingRight: doc.body.style.paddingRight };
        const gap = Math.max(0, viewport.innerWidth - doc.documentElement.clientWidth);
        const padding = parseFloat(viewport.getComputedStyle(doc.body).paddingRight) || 0;
        doc.body.style.overflow = 'hidden';
        if (gap) doc.body.style.paddingRight = `${padding + gap}px`;
      }
      count++;
      let released = false;
      return () => {
        if (released) return;
        released = true;
        count--;
        if (count === 0) {
          doc.body.style.overflow = previous.overflow;
          doc.body.style.paddingRight = previous.paddingRight;
        }
      };
    }
  };
}
let manager;
export function usePublishingScrollLock(source) {
  let release;
  watch(
    source,
    (open) => {
      if (open && !release && typeof document !== 'undefined') {
        manager ||= createScrollLockManager(document, window);
        release = manager.acquire();
      } else if (!open) {
        release?.();
        release = undefined;
      }
    },
    { immediate: true, flush: 'sync' }
  );
  onUnmounted(() => {
    release?.();
    release = undefined;
  });
}
