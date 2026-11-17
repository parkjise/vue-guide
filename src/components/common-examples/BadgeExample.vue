<script setup>
import { ref, computed } from 'vue';
import { CircleHelp, Info, CircleCheck, LockKeyhole, ArrowUpRight, X } from 'lucide-vue-next';
import BaseModal from '@/components/common/BaseModal.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseBadge from '@/components/common/BaseBadge.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
// API의 업무 상태와 UI 표현은 화면(부모)에서 연결합니다.
const statusMap = {
  pending: { label: '승인 대기', tone: 'warning' },
  active: { label: '재직 중', tone: 'success' },
  blocked: { label: '접근 제한', tone: 'danger' }
};
const status = ref('pending');
const options = Object.entries(statusMap).map(([value, item]) => ({ value, label: item.label }));
const current = computed(() => statusMap[status.value]);
const helpOpen = ref(false);
const helpTitle = ref('');
const helpText = ref('');
const tags = ref(['긴급', '검토 요청']);
function showHelp(title, text) {
  helpTitle.value = title;
  helpText.value = text;
  helpOpen.value = true;
}
function removeTag(tag) {
  tags.value = tags.value.filter((item) => item !== tag);
}
</script>
<template>
  <section class="shared-example">
    <div class="shared-example__row">
      <BaseBadge
        v-for="tone in ['primary', 'success', 'warning', 'danger', 'info', 'neutral']"
        :key="tone"
        :tone="tone"
        dot
      >
        {{ tone }}
      </BaseBadge>
    </div>
    <div class="shared-example__form">
      <BaseSelect v-model="status" label="직원 상태" :options="options" required />
    </div>
    <div class="shared-example__row">
      <strong>목록 화면</strong>
      <BaseBadge :tone="current.tone" dot>{{ current.label }}</BaseBadge>
      <strong>상세 화면</strong>
      <BaseBadge :tone="current.tone" size="sm">{{ current.label }}</BaseBadge>
    </div>
    <section class="badge-example__section" aria-label="배지 오른쪽 표시 아이콘">
      <h3>1. 상태를 보충하는 표시 아이콘</h3>
      <div class="shared-example__row">
        <BaseBadge tone="success">
          인증 완료
          <template #trailing><CircleCheck aria-hidden="true" /></template>
        </BaseBadge>
        <BaseBadge tone="neutral">
          읽기 전용
          <template #trailing><LockKeyhole aria-hidden="true" /></template>
        </BaseBadge>
        <BaseBadge tone="info" size="sm">
          안내 사항
          <template #trailing><Info aria-hidden="true" /></template>
        </BaseBadge>
      </div>
      <p class="shared-example__note">
        문구와 같은 의미를 보충하는 아이콘은 aria-hidden으로 읽기 중복을 줄입니다. 아이콘만 있고
        클릭 동작은 없습니다.
      </p>
    </section>
    <section class="badge-example__section" aria-label="배지 오른쪽 도움말 버튼">
      <h3>2. 물음표·정보 아이콘으로 도움말 열기</h3>
      <div class="shared-example__row">
        <BaseBadge :tone="current.tone">
          {{ current.label }}
          <template #trailing>
            <button
              type="button"
              class="badge-example__icon-button"
              :aria-label="current.label + ' 도움말 열기'"
              :title="current.label + ' 도움말'"
              aria-haspopup="dialog"
              @click.stop="
                showHelp(
                  current.label + ' 도움말',
                  status === 'pending'
                    ? '관리자가 신청 내용을 확인하는 단계입니다. 승인이 완료되면 재직 중으로 변경됩니다.'
                    : status === 'active'
                      ? '승인된 직원으로 해당 업무 화면을 이용할 수 있는 상태입니다.'
                      : '관리자가 접근을 제한한 상태입니다. 권한 담당자에게 해제를 요청해 주세요.'
                )
              "
            >
              <CircleHelp aria-hidden="true" />
            </button>
          </template>
        </BaseBadge>
        <BaseBadge tone="info">
          정책 안내
          <template #trailing>
            <button
              type="button"
              class="badge-example__icon-button"
              aria-label="정책 안내 자세히 보기"
              title="정책 안내 자세히 보기"
              aria-haspopup="dialog"
              @click.stop="
                showHelp(
                  '정책 안내',
                  '상태 문구는 짧게 유지하고 자세한 설명은 이 도움말 영역에 제공합니다. 배지의 색상과 문구는 부모 화면에서 결정합니다.'
                )
              "
            >
              <Info aria-hidden="true" />
            </button>
          </template>
        </BaseBadge>
      </div>
      <p class="shared-example__note">
        클릭 가능한 아이콘은 SVG만 두지 않고 button으로 감쌉니다. Tab으로 이동하고 Enter·Space로 열
        수 있습니다. 위 직원 상태를 바꾸면 도움말도 함께 바뀝니다.
      </p>
    </section>
    <section class="badge-example__section" aria-label="배지 오른쪽 링크와 삭제 버튼">
      <h3>3. 상세 링크·선택 해제 아이콘</h3>
      <div class="shared-example__row">
        <BaseBadge tone="primary">
          공통 컴포넌트 가이드
          <template #trailing>
            <a
              class="badge-example__icon-button"
              href="https://parkjise.github.io/vue-guide/#/common-components/library"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="공통 컴포넌트 가이드 새 창으로 열기"
              title="가이드 새 창으로 열기"
              @click.stop
            >
              <ArrowUpRight aria-hidden="true" />
            </a>
          </template>
        </BaseBadge>
        <BaseBadge v-for="tag in tags" :key="tag" tone="neutral">
          {{ tag }}
          <template #trailing>
            <button
              type="button"
              class="badge-example__icon-button"
              :aria-label="tag + ' 선택 해제'"
              :title="tag + ' 선택 해제'"
              @click.stop="removeTag(tag)"
            >
              <X aria-hidden="true" />
            </button>
          </template>
        </BaseBadge>
        <BaseButton
          v-if="tags.length < 2"
          variant="secondary"
          size="sm"
          @click="tags = ['긴급', '검토 요청']"
        >
          선택 태그 초기화
        </BaseButton>
      </div>
      <p class="shared-example__note">
        이동은 a, 상태 변경은 button으로 구분합니다. 선택 해제는 부모 배열을 수정하며, 버튼의
        click.stop은 바깥 목록 행의 클릭이 함께 실행되는 것을 막습니다.
      </p>
    </section>
    <BaseModal v-model="helpOpen" :title="helpTitle">
      <p class="shared-example__note">{{ helpText }}</p>
      <div><BaseButton @click="helpOpen = false">도움말 확인</BaseButton></div>
    </BaseModal>
    <p class="shared-example__note">
      같은 BaseBadge를 두 화면에서 재사용합니다. 색상만으로 구분하지 않고 상태 문구를 함께
      제공합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
.badge-example {
  &__section {
    display: grid;
    gap: 12px;
    padding-top: 18px;
    border-top: 1px solid var(--border);
    h3 {
      margin: 0;
      font-size: 13px;
    }
  }
  &__icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    padding: 3px;
    margin: -2px -5px -2px 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      background: color-mix(in srgb, currentColor 12%, transparent);
    }
    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }
}
</style>
