<script setup>
import { computed, ref, useId } from 'vue';
import BaseField from '@/components/common/BaseField.vue';
import BaseButton from '@/components/common/BaseButton.vue';
const email = ref('');
const submitted = ref(false);
const details = ref(false);
const result = ref('');
const trigger = ref(null);
const panelId = useId();
const error = computed(() =>
  submitted.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ? '이메일 형식으로 입력해 주세요. 예: user@example.com'
    : ''
);
function submit() {
  submitted.value = true;
  result.value = error.value
    ? ''
    : `${email.value} 정보가 준비되었습니다. 실제 전송은 하지 않습니다.`;
}
function closeDetails() {
  details.value = false;
  trigger.value?.focus();
}
</script>
<template>
  <section class="publishing-demo">
    <form class="access-recipe__form" novalidate @submit.prevent="submit">
      <BaseField
        v-model="email"
        label="업무 이메일"
        name="email"
        type="email"
        autocomplete="email"
        hint="label을 누르면 입력창으로 이동합니다. Enter로 제출할 수 있습니다."
        required
        :error="error"
      />
      <BaseButton type="submit">이메일 확인</BaseButton>
      <p v-if="result" role="status" class="publishing-demo__box">{{ result }}</p>
    </form>
    <div>
      <button
        ref="trigger"
        class="access-recipe__trigger"
        :aria-expanded="details"
        :aria-controls="panelId"
        @click="details = !details"
        @keydown.esc.prevent="closeDetails"
      >
        추가 안내 {{ details ? '접기' : '펼치기' }}
      </button>
    </div>
    <section
      v-show="details"
      :id="panelId"
      class="publishing-demo__box"
      aria-label="추가 안내"
      @keydown.esc="closeDetails"
    >
      <p>
        aria-expanded 값과 실제 표시 상태를 함께 바꿉니다. Tab으로 버튼에 접근하고 Enter·Space로
        전환해 보세요.
      </p>
      <button @click="closeDetails">안내 닫기</button>
    </section>
    <p class="publishing-demo__note">
      오류는 role="alert", 작업 결과는 role="status"로 알립니다. 색상에만 의존하지 않고 문구를
      제공합니다. 키보드 포커스 테두리와 최소 클릭 영역을 함께 확인하세요.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
.access-recipe__form {
  display: grid;
  gap: 16px;
  max-width: 460px;
}
.access-recipe__trigger {
  min-height: 44px;
  min-width: 44px;
  &:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 3px;
  }
}
</style>
