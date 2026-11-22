import { ref, onUnmounted } from 'vue';
import { useToast } from './useToast';
function copyThroughSelection(value) {
  if (typeof document.execCommand !== 'function') return false;
  const previousFocus = document.activeElement;
  const input = document.createElement('textarea');
  input.value = value;
  input.readOnly = true;
  input.tabIndex = -1;
  input.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;font-size:16px;';
  const parent = previousFocus?.closest('dialog[open]') || document.body;
  parent.appendChild(input);
  try {
    input.focus({ preventScroll: true });
    input.select();
    input.setSelectionRange(0, value.length);
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    input.remove();
    previousFocus?.focus?.({ preventScroll: true });
  }
}

async function copyText(value) {
  try {
    if (typeof navigator.clipboard?.writeText === 'function') {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Some embedded browsers expose the API but deny clipboard writes.
  }
  return copyThroughSelection(value);
}

export function useClipboard({ notifyOnFailure = true } = {}) {
  const copied = ref(false);
  const { toast } = useToast();
  let timer;
  async function copy(value, language = 'Vue') {
    if (!(await copyText(value))) {
      if (notifyOnFailure)
        toast('복사할 수 없습니다. 브라우저의 클립보드 권한을 확인해 주세요.', 'error');
      return false;
    }
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      copied.value = false;
    }, 2000);
    toast(`클립보드에 ${language} 코드가 복사되었습니다.`);
    return true;
  }
  onUnmounted(() => clearTimeout(timer));
  return { copied, copy };
}
