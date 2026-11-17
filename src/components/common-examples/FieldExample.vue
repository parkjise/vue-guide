<script setup>
import { computed, ref } from 'vue';
import BaseField from '@/components/common/BaseField.vue';
import BaseButton from '@/components/common/BaseButton.vue';
const name = ref('');
const email = ref('');
const submitted = ref(false);
const touched = ref(false);
const result = ref('');
const emailError = computed(() =>
  (submitted.value || touched.value) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ? '이메일 형식을 확인해 주세요. 예: user@company.com'
    : ''
);
const nameError = computed(() =>
  submitted.value && !name.value.trim() ? '이름을 입력해 주세요.' : ''
);
function submit() {
  submitted.value = true;
  result.value = '';
  if (!nameError.value && !emailError.value)
    result.value = `${name.value} / ${email.value} 등록 정보가 준비되었습니다.`;
}
</script>
<template>
  <form class="shared-example shared-example__form" novalidate @submit.prevent="submit">
    <BaseField
      v-model="name"
      label="직원 이름"
      name="name"
      autocomplete="name"
      required
      :error="nameError"
      placeholder="이름을 입력하세요"
    />
    <BaseField
      v-model="email"
      label="업무 이메일"
      name="email"
      type="email"
      autocomplete="email"
      hint="알림을 받을 회사 이메일을 입력합니다."
      :error="emailError"
      required
      @blur="touched = true"
    />
    <div><BaseButton type="submit">등록 정보 확인</BaseButton></div>
    <output v-if="result" class="shared-example__output" aria-live="polite">{{ result }}</output>
    <p class="shared-example__note">
      검증 규칙은 부모의 computed에 둡니다. 공통 입력창은 label·hint·error를 표시하고
      aria-describedby로 입력과 안내를 연결합니다.
    </p>
  </form>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
