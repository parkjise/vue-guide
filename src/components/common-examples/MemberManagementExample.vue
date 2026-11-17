<script setup>
import { computed, ref, watch } from 'vue';
import BaseBadge from '@/components/common/BaseBadge.vue';
import BaseAvatar from '@/components/common/BaseAvatar.vue';
import BaseField from '@/components/common/BaseField.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseModal from '@/components/common/BaseModal.vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
import BaseAlert from '@/components/common/BaseAlert.vue';
import BasePagination from '@/components/common/BasePagination.vue';
const members = ref([
  { id: 1, name: '김 지수', email: 'jisu@example.com', status: 'active' },
  { id: 2, name: '박 민준', email: 'minjun@example.com', status: 'pending' },
  { id: 3, name: '이 서연', email: 'seoyeon@example.com', status: 'active' }
]);
const statusMap = {
  active: { label: '재직 중', tone: 'success' },
  pending: { label: '초대 대기', tone: 'warning' }
};
const statuses = Object.entries(statusMap).map(([value, item]) => ({ value, label: item.label }));
const keyword = ref('');
const status = ref('');
const page = ref(1);
const open = ref(false);
const submitted = ref(false);
const name = ref('');
const email = ref('');
const success = ref('');
const nameError = computed(() =>
  submitted.value && !name.value.trim() ? '이름을 입력해 주세요.' : ''
);
const emailError = computed(() => {
  if (!submitted.value) return '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return '올바른 이메일을 입력해 주세요.';
  return members.value.some((item) => item.email.toLowerCase() === email.value.trim().toLowerCase())
    ? '이미 등록된 이메일입니다.'
    : '';
});
const filtered = computed(() =>
  members.value.filter(
    (item) =>
      (!status.value || item.status === status.value) &&
      (item.name + item.email).toLowerCase().includes(keyword.value.trim().toLowerCase())
  )
);
const visible = computed(() => filtered.value.slice((page.value - 1) * 3, page.value * 3));
watch(
  [keyword, status],
  () => {
    page.value = 1;
  },
  { flush: 'sync' }
);
let sequence = 3;
function startInvite() {
  name.value = '';
  email.value = '';
  submitted.value = false;
  open.value = true;
}
function invite() {
  submitted.value = true;
  if (nameError.value || emailError.value) return;
  members.value.push({
    id: ++sequence,
    name: name.value.trim(),
    email: email.value.trim(),
    status: 'pending'
  });
  keyword.value = '';
  status.value = '';
  page.value = Math.ceil(members.value.length / 3);
  open.value = false;
  success.value = `${name.value.trim()}님을 샘플 목록에 추가했습니다. 실제 초대 메일은 보내지 않습니다.`;
}
function approve(member) {
  member.status = 'active';
  success.value = `${member.name}님의 샘플 상태를 재직 중으로 변경했습니다.`;
}
</script>
<template>
  <section class="shared-example">
    <BaseAlert v-if="success" title="처리 결과" tone="success" dismissible @close="success = ''">
      {{ success }}
    </BaseAlert>
    <BaseCard title="직원 관리" description="같은 공통 컴포넌트 10개를 조합한 로컬 업무 화면">
      <template #actions><BaseButton @click="startInvite">직원 초대</BaseButton></template>
      <div class="shared-example">
        <div class="shared-example__grid">
          <BaseField v-model="keyword" label="직원 검색" placeholder="이름 또는 이메일" />
          <BaseSelect
            v-model="status"
            label="직원 상태 필터"
            :options="statuses"
            placeholder="전체 상태"
          />
        </div>
        <ul v-if="visible.length" class="shared-example__list">
          <li v-for="member in visible" :key="member.id">
            <span class="shared-example__name">
              <BaseAvatar :name="member.name" />
              <span>
                {{ member.name }}
                <br />
                <small>{{ member.email }}</small>
              </span>
            </span>
            <span class="shared-example__row">
              <BaseBadge :tone="statusMap[member.status].tone" dot>
                {{ statusMap[member.status].label }}
              </BaseBadge>
              <BaseButton
                v-if="member.status === 'pending'"
                variant="secondary"
                size="sm"
                @click="approve(member)"
              >
                승인
              </BaseButton>
            </span>
          </li>
        </ul>
        <BaseEmptyState
          v-else
          title="조건에 맞는 직원이 없습니다"
          description="검색어나 상태 필터를 초기화해 보세요."
        >
          <template #action>
            <BaseButton
              variant="secondary"
              @click="
                keyword = '';
                status = '';
              "
            >
              필터 초기화
            </BaseButton>
          </template>
        </BaseEmptyState>
        <BasePagination
          v-if="filtered.length"
          v-model="page"
          :total="filtered.length"
          :page-size="3"
        />
      </div>
      <template #footer>전체 {{ members.length }}명 · 조회 결과 {{ filtered.length }}명</template>
    </BaseCard>
    <BaseModal v-model="open" title="직원 초대">
      <form class="shared-example" novalidate @submit.prevent="invite">
        <BaseField
          v-model="name"
          label="초대할 직원 이름"
          autocomplete="name"
          required
          :error="nameError"
        />
        <BaseField
          v-model="email"
          label="초대할 이메일"
          type="email"
          autocomplete="email"
          required
          :error="emailError"
        />
        <div class="shared-example__row">
          <BaseButton variant="secondary" @click="open = false">초대 취소</BaseButton>
          <BaseButton type="submit">샘플 목록에 추가</BaseButton>
        </div>
      </form>
    </BaseModal>
    <p class="shared-example__note">
      직원 데이터·검색·검증·등록·상태 변경은 이 부모 화면이 담당합니다. 공통 컴포넌트는 직원 API에
      의존하지 않아 주문·게시판·프로젝트 화면에도 재사용할 수 있습니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
