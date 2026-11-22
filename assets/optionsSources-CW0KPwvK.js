const n={"403-cd89a71f-432d4e3":{file:"src/App.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import DefaultLayout from './layouts/DefaultLayout.vue';
import BaseToast from './components/common/BaseToast.vue';
export default {
  name: 'App',
  components: {
    DefaultLayout,
    BaseToast
  }
};
<\/script>
<template>
  <RouterView v-if="$route.meta.layout === 'standalone'" />
  <DefaultLayout v-else />
  <BaseToast />
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
</style>
`},"3494-e9723bfc-b5dfab8":{file:"src/components/common/ActivityChart.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'ActivityChart',
  props: {
    values: {
      type: Array,
      default: () => [32, 48, 39, 68, 52, 79, 66, 88, 73, 91, 78, 98]
    },
    secondary: {
      type: Array,
      default: () => [18, 28, 23, 37, 31, 48, 37, 56, 49, 65, 52, 72]
    },
    labels: {
      type: Array,
      default: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    height: {
      type: Number,
      default: 210
    }
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const gradientId = useId();
    return {
      gradientId
    };
  },
  data() {
    const active = -1;
    return {
      active
    };
  },
  computed: {
    points() {
      return this.$props.values
        .map(
          (v, i) =>
            \`\${40 + (i * 660) / Math.max(this.$props.values.length - 1, 1)},\${180 - v * 1.5}\`
        )
        .join(' ');
    },
    secondaryPoints() {
      return this.$props.secondary
        .map(
          (v, i) =>
            \`\${40 + (i * 660) / Math.max(this.$props.secondary.length - 1, 1)},\${180 - v * 1.5}\`
        )
        .join(' ');
    }
  }
};
<\/script>
<template>
  <figure class="activity-chart">
    <svg
      viewBox="0 0 740 225"
      role="img"
      aria-label="활동 추이 차트"
      :style="{ height: height + 'px' }"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366f1" stop-opacity=".18" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
        </linearGradient>
      </defs>
      <g v-for="(n, i) in [100, 75, 50, 25, 0]" :key="n">
        <line
          x1="40"
          x2="710"
          :y1="30 + i * 38"
          :y2="30 + i * 38"
          stroke="currentColor"
          stroke-opacity=".08"
          stroke-dasharray="3 5"
        />
        <text x="6" :y="34 + i * 38" fill="currentColor" opacity=".45" font-size="9">
          {{ n }}k
        </text>
      </g>
      <polygon :points="'40,180 ' + points + ' 700,180'" :fill="\`url(#\${gradientId})\`" />
      <polyline
        :points="secondaryPoints"
        fill="none"
        stroke="#b7a3ed"
        stroke-width="2"
        stroke-dasharray="5 5"
        stroke-linejoin="round"
      />
      <polyline
        :points="points"
        fill="none"
        stroke="#6366f1"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g v-for="(value, i) in values" :key="i">
        <circle
          :cx="40 + (i * 660) / Math.max(values.length - 1, 1)"
          :cy="180 - value * 1.5"
          r="7"
          fill="transparent"
          tabindex="0"
          :aria-label="\`포인트 \${i + 1}: \${value}천\`"
          @mouseenter="active = i"
          @mouseleave="active = -1"
          @focus="active = i"
          @blur="active = -1"
        />
        <text
          v-if="active === i"
          :x="40 + (i * 660) / Math.max(values.length - 1, 1)"
          :y="165 - value * 1.5"
          text-anchor="middle"
          fill="currentColor"
          font-size="10"
        >
          {{ value }}k
        </text>
      </g>
      <text
        v-for="(label, i) in labels"
        :key="label"
        :x="40 + (i * 660) / Math.max(labels.length - 1, 1)"
        y="212"
        text-anchor="middle"
        fill="currentColor"
        opacity=".5"
        font-size="10"
      >
        {{ label }}
      </text>
    </svg>
    <figcaption class="activity-chart__caption">
      실행 수(실선) · 이전 기간(점선), 단위: 천 회
    </figcaption>
  </figure>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.activity-chart {
  margin: 0;
  width: 100%;
  svg {
    width: 100%;
    overflow: visible;
  }
  &__caption {
    font-size: 10px;
    color: var(--caption);
    text-align: center;
  }
}
</style>
`},"1106-ef524225-7f083c1b":{file:"src/components/common/BaseAccordion.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'BaseAccordion',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const id = useId();
    return {
      id
    };
  },
  data() {
    const active = 0;
    return {
      active
    };
  }
};
<\/script>
<template>
  <section class="base-accordion">
    <article v-for="(item, i) in items" :key="item.title">
      <h3>
        <button
          :aria-expanded="active === i"
          :aria-controls="id + i"
          @click="active = active === i ? -1 : i"
        >
          {{ item.title }}
          <span>{{ active === i ? '−' : '+' }}</span>
        </button>
      </h3>
      <section v-show="active === i" :id="id + i">{{ item.content }}</section>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-accordion {
  @include card-surface;
  overflow: hidden;
  article + article {
    border-top: 1px solid var(--border);
  }
  button {
    @include flex-between;
    width: 100%;
    border: 0;
    border-radius: 0;
    background: none;
    font-size: 14px;
    text-align: left;
    padding: 18px;
  }
  section {
    padding: 0 18px 18px;
    color: var(--muted);
  }
}
</style>
`},"1883-75d0974-64e4b7e8":{file:"src/components/common/BaseAlert.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { Info, CheckCircle2, AlertTriangle, X } from 'lucide-vue-next';
export default {
  name: 'BaseAlert',
  components: {
    Info,
    CheckCircle2,
    AlertTriangle,
    X
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    tone: {
      type: String,
      default: 'info'
    },
    dismissible: Boolean
  },
  emits: {
    close: null
  }
};
<\/script>
<template>
  <section
    class="base-alert"
    :class="\`base-alert--\${tone}\`"
    :role="tone === 'danger' ? 'alert' : 'status'"
  >
    <CheckCircle2 v-if="tone === 'success'" :size="18" aria-hidden="true" />
    <AlertTriangle
      v-else-if="['warning', 'danger'].includes(tone)"
      :size="18"
      aria-hidden="true"
    />
    <Info v-else :size="18" aria-hidden="true" />
    <div>
      <strong v-if="title">{{ title }}</strong>
      <div class="base-alert__content"><slot /></div>
      <slot name="action" />
    </div>
    <button v-if="dismissible" type="button" aria-label="안내 닫기" @click="$emit('close')">
      <X :size="16" />
    </button>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--info);
  background: var(--surface);
  border-radius: 10px;
  > svg {
    flex-shrink: 0;
    color: var(--info);
  }
  > div {
    flex: 1;
    min-width: 0;
  }
  strong {
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
  }
  &__content {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.8;
  }
  > button {
    border: 0;
    background: transparent;
    padding: 0;
    color: var(--muted);
  }
  &--success {
    border-left-color: var(--success);
    > svg {
      color: var(--success);
    }
  }
  &--warning {
    border-left-color: var(--warning);
    > svg {
      color: var(--warning);
    }
  }
  &--danger {
    border-left-color: var(--danger);
    > svg {
      color: var(--danger);
    }
  }
}
</style>
`},"1250-25ca3423-cc38e48b":{file:"src/components/common/BaseAvatar.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'BaseAvatar',
  props: {
    name: {
      type: String,
      required: true
    },
    src: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  data() {
    const failed = false;
    return {
      failed
    };
  },
  computed: {
    initials() {
      return (
        this.$props.name
          .trim()
          .split(/\\s+/)
          .map((part) => Array.from(part)[0])
          .slice(0, 2)
          .join('') || '?'
      );
    }
  },
  created() {
    this.$watch(
      () => this.$props.src,
      () => {
        this.failed = false;
      }
    );
  }
};
<\/script>
<template>
  <span class="base-avatar" :class="\`base-avatar--\${size}\`" role="img" :aria-label="name">
    <img v-if="src && !failed" :src="src" alt="" @error="failed = true" />
    <span v-else aria-hidden="true">{{ initials }}</span>
  </span>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-avatar {
  @include flex-center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--soft);
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &--sm {
    width: 28px;
    height: 28px;
    font-size: 10px;
  }
  &--lg {
    width: 54px;
    height: 54px;
    font-size: 18px;
  }
}
</style>
`},"2078-44ec3d78-ea79d21e":{file:"src/components/common/BaseBadge.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'BaseBadge',
  props: {
    tone: {
      type: String,
      default: 'primary',
      validator: (value) =>
        ['primary', 'success', 'warning', 'danger', 'info', 'neutral'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md'].includes(value)
    },
    dot: {
      type: Boolean,
      default: false
    }
  }
};
<\/script>
<template>
  <span class="base-badge" :class="[\`base-badge--\${tone}\`, \`base-badge--\${size}\`]">
    <span v-if="dot" class="base-badge__dot" aria-hidden="true" />
    <slot />
    <!-- trailing에는 표시용 아이콘 또는 접근 가능한 버튼·링크를 전달합니다. -->
    <span v-if="$slots.trailing" class="base-badge__trailing"
      ><slot name="trailing"
    /></span>
  </span>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-badge {
  @include flex-center;
  display: inline-flex;
  gap: 5px;
  border-radius: 9999px;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
  color: var(--primary);
  background: var(--soft);
  white-space: nowrap;
  &--success {
    color: #047857;
    background: #10b98120;
  }
  &--warning {
    color: #93610b;
    background: #f59e0b20;
  }
  &--danger {
    color: var(--danger);
    background: #ef444420;
  }
  &--info {
    color: #2563eb;
    background: #3b82f620;
  }
  &--neutral {
    color: var(--muted);
    background: var(--canvas);
    border: 1px solid var(--border);
  }
  &--sm {
    font-size: 10px;
    padding: 2px 7px;
  }
  &__trailing {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    :deep(svg) {
      display: block;
      width: 13px;
      height: 13px;
    }
  }
  &__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  }
}
// 다크 배경에서도 상태 문구를 읽을 수 있도록 명도를 높입니다.
:global([data-theme='dark'] .base-badge--success) {
  color: #6ee7b7;
}
:global([data-theme='dark'] .base-badge--warning) {
  color: #fcd34d;
}
:global([data-theme='dark'] .base-badge--danger) {
  color: #fda4af;
}
:global([data-theme='dark'] .base-badge--info) {
  color: #93c5fd;
}
</style>
`},"1626-13ed53af-2f1646eb":{file:"src/components/common/BaseButton.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    }
  }
};
<\/script>
<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading ? 'true' : undefined"
    class="base-button"
    :class="[\`base-button--\${variant}\`, \`base-button--\${size}\`]"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-button {
  @include focus-ring;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  &--primary {
    background: var(--primary);
    color: #fff;
    border-color: var(--primary);
    &:hover:not(:disabled) {
      background: var(--hover);
    }
  }
  &--danger {
    background: var(--danger);
    color: #fff;
    &:hover:not(:disabled) {
      background: color-mix(in srgb, var(--danger), #000 15%);
    }
  }
  &--sm {
    font-size: 12px;
    padding: 6px 10px;
  }
  &__spinner {
    width: 13px;
    height: 13px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: button-spin 0.8s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    &__spinner {
      animation: none;
    }
  }
}
@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
`},"1184-ac1db852-9def711a":{file:"src/components/common/BaseCard.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'BaseCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  }
};
<\/script>
<template>
  <section class="base-card">
    <header class="base-card__header">
      <div>
        <h3>{{ title }}</h3>
        <p v-if="description">{{ description }}</p>
      </div>
      <slot name="actions" />
    </header>
    <div class="base-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="base-card__footer"><slot name="footer" /></footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-card {
  @include card-surface;
  min-width: 0;
  overflow: hidden;
  &__header {
    @include flex-between;
    flex-wrap: wrap;
    padding: 18px;
    border-bottom: 1px solid var(--border);
    h3 {
      margin: 0;
      font-size: 15px;
    }
    p {
      margin: 5px 0 0;
      color: var(--muted);
      font-size: 11px;
      line-height: 1.7;
    }
  }
  &__body {
    padding: 18px;
    font-size: 13px;
  }
  &__footer {
    padding: 13px 18px;
    border-top: 1px solid var(--border);
    background: var(--canvas);
    font-size: 11px;
    color: var(--muted);
  }
}
</style>
`},"2069-45434fdc-19bd8ff0":{file:"src/components/common/BaseDropzone.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'BaseDropzone',
  props: {
    accept: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: {
    'update:modelValue': null
  },
  data() {
    const dragging = false;
    return {
      dragging
    };
  },
  computed: {
    files: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    add(list) {
      this.files = [
        ...this.files,
        ...Array.from(list || []).map((f) => ({
          name: f.name,
          size: f.size,
          id: crypto.randomUUID()
        }))
      ];
      this.dragging = false;
    }
  }
};
<\/script>
<template>
  <section class="base-dropzone">
    <label
      class="base-dropzone__area"
      :class="{ 'base-dropzone__area--active': dragging }"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="add($event.dataTransfer.files)"
    >
      <strong>↑</strong>
      <span>파일을 끌어오거나 선택하세요</span>
      <small>데모: 메타데이터만 보관합니다. 서버로 전송하지 않습니다.</small>
      <input
        type="file"
        multiple
        :accept="accept"
        aria-label="파일 선택"
        @change="
          add($event.target.files);
          $event.target.value = '';
        "
      />
    </label>
    <ul>
      <li v-for="file in files" :key="file.id">
        <span>{{ file.name }} · {{ (file.size / 1024).toFixed(1) }} KB</span>
        <button
          :aria-label="file.name + ' 제거'"
          @click="files = files.filter((f) => f.id !== file.id)"
        >
          ×
        </button>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-dropzone {
  &__area {
    @include flex-center;
    flex-direction: column;
    padding: 30px;
    border: 2px dashed var(--border);
    border-radius: 14px;
    gap: 12px;
    strong {
      font-size: 32px;
      color: var(--primary);
    }
    small {
      font-size: 11px;
      color: var(--caption);
    }
    input {
      max-width: 100%;
    }
    &--active {
      border-color: var(--primary);
      background: var(--soft);
    }
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    @include flex-between;
    padding: 10px;
    border-bottom: 1px solid var(--border);
    font-size: 12px;
  }
}
</style>
`},"1091-dba4b958-649265c6":{file:"src/components/common/BaseEmptyState.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { Inbox } from 'lucide-vue-next';
export default {
  name: 'BaseEmptyState',
  components: {
    Inbox
  },
  props: {
    title: {
      type: String,
      default: '아직 데이터가 없습니다'
    },
    description: {
      type: String,
      default: ''
    }
  }
};
<\/script>
<template>
  <section class="base-empty-state">
    <span class="base-empty-state__icon">
      <slot name="icon"><Inbox :size="26" aria-hidden="true" /></slot>
    </span>
    <h3>{{ title }}</h3>
    <p v-if="description">{{ description }}</p>
    <div v-if="$slots.action"><slot name="action" /></div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-empty-state {
  @include flex-center;
  flex-direction: column;
  gap: 12px;
  padding: 35px 20px;
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: 12px;
  h3 {
    font-size: 15px;
    margin: 0;
  }
  p {
    color: var(--muted);
    line-height: 1.8;
    font-size: 12px;
    margin: 0;
    max-width: 420px;
  }
  &__icon {
    @include flex-center;
    width: 52px;
    height: 52px;
    background: var(--soft);
    color: var(--primary);
    border-radius: 15px;
  }
}
</style>
`},"1836-75ece2dd-92b2c5f3":{file:"src/components/common/BaseField.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'BaseField',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    hint: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    required: Boolean,
    disabled: Boolean,
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: {
    'update:modelValue': null
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const generatedId = useId();
    return {
      generatedId
    };
  },
  computed: {
    fieldId() {
      return this.$props.id || this.generatedId;
    },
    describedBy() {
      return (
        [
          this.$props.hint && \`\${this.fieldId}-hint\`,
          this.$props.error && \`\${this.fieldId}-error\`
        ]
          .filter(Boolean)
          .join(' ') || undefined
      );
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
<\/script>
<template>
  <div class="base-field">
    <label :for="fieldId">
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </label>
    <input
      v-bind="$attrs"
      :id="fieldId"
      v-model="value"
      :type="type"
      :required="required"
      :disabled="disabled"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
    />
    <p v-if="hint" :id="\`\${fieldId}-hint\`" class="base-field__hint">{{ hint }}</p>
    <p v-if="error" :id="\`\${fieldId}-error\`" class="base-field__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-field {
  display: grid;
  gap: 7px;
  label {
    font-size: 12px;
    font-weight: 600;
    display: block;
  }
  input {
    width: 100%;
    min-width: 0;
    &[aria-invalid='true'] {
      border-color: var(--danger);
    }
    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
  }
  p {
    margin: 0;
    font-size: 11px;
    line-height: 1.7;
  }
  &__hint {
    color: var(--muted);
  }
  &__error {
    color: var(--danger);
  }
}
</style>
`},"5993-13ffeb79-b9ad21cd":{file:"src/components/common/BaseIconTooltip.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { nextTick, useId } from 'vue';
import { CircleHelp } from 'lucide-vue-next';
// 아이콘 버튼과 짧은 설명을 묶습니다. tooltip 안에는 링크·버튼을 넣지 않습니다.
export default {
  name: 'BaseIconTooltip',
  components: {
    CircleHelp
  },
  props: {
    label: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      default: 'top',
      validator: (value) => ['top', 'bottom'].includes(value)
    }
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const id = useId();
    return {
      id
    };
  },
  data() {
    const visible = false;
    const pinned = false;
    const focused = false;
    const hovered = false;
    const position = {
      left: '0px',
      top: '0px'
    };
    const side = 'top';
    let closeTimer;
    return {
      visible,
      pinned,
      focused,
      hovered,
      position,
      side,
      closeTimer
    };
  },
  methods: {
    cancelClose() {
      clearTimeout(this.closeTimer);
    },
    show() {
      this.cancelClose();
      this.visible = true;
    },
    dismiss() {
      this.cancelClose();
      this.pinned = false;
      this.visible = false;
    },
    leave() {
      this.cancelClose();
      this.closeTimer = setTimeout(() => {
        if (!this.pinned && !this.focused && !this.hovered) this.visible = false;
      }, 120);
    },
    pointerEnter(event) {
      if (event.pointerType === 'touch') return;
      this.hovered = true;
      this.show();
    },
    pointerLeave() {
      this.hovered = false;
      this.leave();
    },
    focus() {
      this.focused = true;
      this.show();
    },
    blur() {
      this.focused = false;
      this.pinned = false;
      this.leave();
    },
    toggle() {
      // focus로 열린 상태여도 첫 탭은 고정, 두 번째 탭은 닫힘으로 동작합니다.
      if (this.pinned) this.dismiss();
      else {
        this.pinned = true;
        this.show();
      }
    },
    updatePosition() {
      if (!this.visible || !this.$refs.trigger || !this.$refs.bubble) return;
      const anchor = this.$refs.trigger.getBoundingClientRect();
      const box = this.$refs.bubble.getBoundingClientRect();
      const gap = 9;
      const edge = 12;
      if (anchor.bottom < 0 || anchor.top > window.innerHeight) {
        this.dismiss();
        return;
      }
      const above = anchor.top - edge;
      const below = window.innerHeight - anchor.bottom - edge;
      const useTop =
        this.$props.placement === 'top'
          ? above >= box.height + gap || above > below
          : below < box.height + gap && above > below;
      this.side = useTop ? 'top' : 'bottom';
      const left = Math.max(
        edge,
        Math.min(
          anchor.left + anchor.width / 2 - box.width / 2,
          window.innerWidth - box.width - edge
        )
      );
      const top = Math.max(
        edge,
        Math.min(
          useTop ? anchor.top - gap - box.height : anchor.bottom + gap,
          window.innerHeight - box.height - edge
        )
      );
      this.position = {
        left: \`\${left}px\`,
        top: \`\${top}px\`,
        '--tooltip-arrow': \`\${Math.max(12, Math.min(box.width - 12, anchor.left + anchor.width / 2 - left))}px\`
      };
    },
    outside(event) {
      if (
        !this.$refs.trigger?.contains(event.target) &&
        !this.$refs.bubble?.contains(event.target)
      )
        this.dismiss();
    },
    onEscape(event) {
      if (event.key === 'Escape' && this.visible) this.dismiss();
    }
  },
  created() {
    this.$watch(
      () => [this.visible, (() => this.$props.text)(), (() => this.$props.placement)()],
      async () => {
        if (this.visible) {
          await nextTick();
          this.updatePosition();
        }
      }
    );
  },
  mounted() {
    document.addEventListener('pointerdown', this.outside);
    window.addEventListener('keydown', this.onEscape);
    window.addEventListener('resize', this.updatePosition);
    window.addEventListener('scroll', this.updatePosition, true);
  },
  unmounted() {
    this.cancelClose();
    document.removeEventListener('pointerdown', this.outside);
    window.removeEventListener('keydown', this.onEscape);
    window.removeEventListener('resize', this.updatePosition);
    window.removeEventListener('scroll', this.updatePosition, true);
  }
};
<\/script>
<template>
  <span class="base-icon-tooltip">
    <button
      ref="trigger"
      type="button"
      class="base-icon-tooltip__trigger"
      :aria-label="label"
      :aria-describedby="visible ? id : undefined"
      @pointerenter="pointerEnter"
      @pointerleave="pointerLeave"
      @focus="focus"
      @blur="blur"
      @click.stop="toggle"
    >
      <slot><CircleHelp :size="13" aria-hidden="true" /></slot>
    </button>
    <!-- body로 이동시켜 카드의 overflow:hidden에 잘리지 않도록 합니다. -->
    <Teleport to="body">
      <span
        v-if="visible"
        :id="id"
        ref="bubble"
        role="tooltip"
        class="base-icon-tooltip__bubble"
        :class="\`base-icon-tooltip__bubble--\${side}\`"
        :style="position"
        @pointerenter="pointerEnter"
        @pointerleave="pointerLeave"
      >
        {{ text }}
      </span>
    </Teleport>
  </span>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-icon-tooltip {
  display: inline-flex;
  &__trigger {
    @include flex-center;
    width: 24px;
    height: 24px;
    padding: 3px;
    margin: -2px -5px -2px 0;
    border: 0;
    border-radius: 50%;
    color: inherit;
    background: transparent;
    cursor: pointer;
    &:hover:not(:disabled) {
      background: color-mix(in srgb, currentColor 12%, transparent);
    }
    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }
  &__bubble {
    position: fixed;
    z-index: 300;
    box-sizing: border-box;
    width: max-content;
    max-width: min(280px, calc(100vw - 24px));
    padding: 11px 14px;
    border: 1px solid #44516a;
    border-radius: 9px;
    box-shadow: 0 6px 24px #0003;
    background: #19253b;
    color: #fff;
    white-space: normal;
    overflow-wrap: anywhere;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.8;
    text-align: left;
    // 트리거와 설명 사이의 빈 공간도 hover 영역으로 연결합니다.
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 10px;
    }
    &--top::before {
      top: 100%;
    }
    &--bottom::before {
      bottom: 100%;
    }
    &::after {
      content: '';
      position: absolute;
      left: var(--tooltip-arrow);
      transform: translateX(-50%);
      border: 6px solid transparent;
    }
    &--top::after {
      top: 100%;
      border-top-color: #19253b;
    }
    &--bottom::after {
      bottom: 100%;
      border-bottom-color: #19253b;
    }
  }
}
</style>
`},"1519-b8ef18ad-ee92d021":{file:"src/components/common/BaseModal.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { nextTick, useId } from 'vue';
export default {
  name: 'BaseModal',
  props: {
    title: {
      type: String,
      default: '상세 정보'
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': null
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const titleId = useId();
    return {
      titleId
    };
  },
  data() {
    let previousFocus;
    return {
      previousFocus
    };
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  watch: {
    model: {
      async handler(open) {
        await nextTick();
        if (open && !this.$refs.dialog.open) {
          this.previousFocus = document.activeElement;
          this.$refs.dialog.showModal();
        } else if (!open && this.$refs.dialog.open) {
          this.$refs.dialog.close();
          this.previousFocus?.focus();
        }
      },
      immediate: true
    }
  }
};
<\/script>
<template>
  <dialog
    ref="dialog"
    class="base-modal"
    :aria-labelledby="titleId"
    @cancel.prevent="model = false"
    @close="model = false"
    @click="
      (e) => {
        if (e.target === $refs.dialog) model = false;
      }
    "
  >
    <header class="base-modal__header">
      <h2 :id="titleId">{{ title }}</h2>
      <button aria-label="닫기" @click="model = false">×</button>
    </header>
    <section class="base-modal__body"><slot /></section>
  </dialog>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-modal {
  @include card-surface;
  color: var(--text);
  width: min(520px, calc(100% - 32px));
  padding: 24px;
  max-height: 85vh;
  &::backdrop {
    background: #0f172a88;
    backdrop-filter: blur(4px);
  }
  &__header {
    @include flex-between;
    margin-bottom: 22px;
    h2 {
      font-size: 19px;
    }
  }
  &__body {
    display: grid;
    gap: 16px;
  }
}
</style>
`},"1281-47dc00f9-d75cfdff":{file:"src/components/common/BasePagination.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'BasePagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 5
    },
    modelValue: {
      type: Number,
      default: 1
    }
  },
  emits: {
    'update:modelValue': null
  },
  computed: {
    count() {
      return Math.max(1, Math.ceil(this.$props.total / this.$props.pageSize));
    },
    pages() {
      return Array.from(
        {
          length: this.count
        },
        (_, i) => i + 1
      ).filter((n) => n === 1 || n === this.count || Math.abs(n - this.page) < 2);
    },
    page: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  watch: {
    count: {
      handler(value) {
        if (this.page > value) this.page = value;
      }
    }
  }
};
<\/script>
<template>
  <nav aria-label="페이지 탐색" class="base-pagination">
    <button :disabled="page <= 1" aria-label="이전 페이지" @click="page--">←</button>
    <button
      v-for="n in pages"
      :key="n"
      :aria-current="page === n ? 'page' : undefined"
      :class="{ 'base-pagination__page--active': page === n }"
      @click="page = n"
    >
      {{ n }}
    </button>
    <button :disabled="page >= count" aria-label="다음 페이지" @click="page++">→</button>
  </nav>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-pagination {
  @include flex-center;
  gap: 6px;
  button {
    padding: 6px 12px;
  }
  &__page--active {
    background: var(--primary);
    color: white;
  }
}
</style>
`},"1102-6754baf8-940c8f2":{file:"src/components/common/BaseRating.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'BaseRating',
  props: {
    max: {
      type: Number,
      default: 5
    },
    label: {
      type: String,
      default: '별점'
    },
    modelValue: {
      type: Number,
      default: 0
    }
  },
  emits: {
    'update:modelValue': null
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
<\/script>
<template>
  <fieldset class="base-rating">
    <legend>{{ label }}: {{ value }} / {{ max }}</legend>
    <label v-for="n in max" :key="n">
      <input v-model="value" type="radio" :value="n" :aria-label="n + '점'" />
      <span :class="{ 'base-rating__star--active': n <= value }">★</span>
    </label>
  </fieldset>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-rating {
  display: flex;
  gap: 8px;
  border: 0;
  padding: 0;
  legend {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 10px;
  }
  label {
    position: relative;
  }
  input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:focus-visible + span {
      outline: 3px solid var(--primary);
      outline-offset: 3px;
    }
  }
  span {
    font-size: 30px;
    color: var(--border);
  }
  &__star--active {
    color: #f5b747 !important;
  }
}
</style>
`},"1133-a431b5d5-bfa12da1":{file:"src/components/common/BaseSelect.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: '선택하세요'
    },
    disabled: Boolean,
    required: Boolean,
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: {
    'update:modelValue': null
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const id = useId();
    return {
      id
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
<\/script>
<template>
  <div class="base-select">
    <label :for="id">{{ label }}</label>
    <select
      v-bind="$attrs"
      :id="id"
      v-model="value"
      :disabled="disabled"
      :required="required"
    >
      <option value="" :disabled="required">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-select {
  display: grid;
  gap: 7px;
  label {
    display: block;
    font-size: 12px;
    font-weight: 600;
  }
  select {
    width: 100%;
    min-width: 0;
    &:disabled {
      opacity: 0.55;
    }
  }
}
</style>
`},"1464-2dd5ad2b-17aeeb69":{file:"src/components/common/BaseSkeleton.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'BaseSkeleton',
  props: {
    lines: {
      type: Number,
      default: 3
    },
    avatar: Boolean,
    label: {
      type: String,
      default: '데이터를 불러오는 중입니다'
    }
  },
  computed: {
    count() {
      return Math.min(10, Math.max(1, Math.floor(this.$props.lines) || 1));
    }
  }
};
<\/script>
<template>
  <div class="base-skeleton" role="status" :aria-label="label">
    <span v-if="avatar" class="base-skeleton__avatar" aria-hidden="true" />
    <div class="base-skeleton__lines" aria-hidden="true">
      <span v-for="n in count" :key="n" :class="{ 'base-skeleton__short': n === count }" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-skeleton {
  display: flex;
  gap: 14px;
  padding: 18px 0;
  &__avatar,
  &__lines span {
    background: linear-gradient(100deg, var(--border) 20%, var(--soft) 40%, var(--border) 60%);
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.4s linear infinite;
  }
  &__avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  &__lines {
    flex: 1;
    display: grid;
    gap: 10px;
    span {
      display: block;
      height: 13px;
      border-radius: 5px;
    }
    .base-skeleton__short {
      width: 65%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    &__avatar,
    &__lines span {
      animation: none;
    }
  }
}
@keyframes skeleton-shimmer {
  to {
    background-position: -200% 0;
  }
}
</style>
`},"1785-26cbff85-9a56e7c7":{file:"src/components/common/BaseTabs.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'BaseTabs',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const id = useId();
    return {
      id
    };
  },
  data() {
    const active = 0;
    return {
      active
    };
  },
  methods: {
    keydown(e, i) {
      let n = i;
      if (e.key === 'ArrowRight') n = (i + 1) % this.$props.items.length;
      else if (e.key === 'ArrowLeft')
        n = (i + this.$props.items.length - 1) % this.$props.items.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = this.$props.items.length - 1;
      else return;
      e.preventDefault();
      this.active = n;
      document.getElementById(this.id + '-tab-' + n)?.focus();
    }
  }
};
<\/script>
<template>
  <section class="base-tabs">
    <nav role="tablist" aria-label="콘텐츠 탭">
      <button
        v-for="(item, i) in items"
        :id="id + '-tab-' + i"
        :key="item.title"
        role="tab"
        :aria-selected="active === i"
        :aria-controls="id + '-panel-' + i"
        :tabindex="active === i ? 0 : -1"
        @click="active = i"
        @keydown="keydown($event, i)"
      >
        {{ item.title }}
      </button>
    </nav>
    <section
      v-for="(item, i) in items"
      v-show="active === i"
      :id="id + '-panel-' + i"
      :key="item.title"
      role="tabpanel"
      :aria-labelledby="id + '-tab-' + i"
      tabindex="0"
    >
      {{ item.content }}
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-tabs {
  @include card-surface;
  overflow: hidden;
  nav {
    display: flex;
    border-bottom: 1px solid var(--border);
  }
  button {
    border: 0;
    border-radius: 0;
    padding: 15px 22px;
    background: none;
    &[aria-selected='true'] {
      color: var(--primary);
      border-bottom: 2px solid var(--primary);
    }
  }
  section {
    padding: 24px;
    color: var(--muted);
  }
}
</style>
`},"1003-36530ed8-408f3b68":{file:"src/components/common/BaseToast.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useToast } from '@/composables/useToast';
export default {
  name: 'BaseToast',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { messages, dismiss } = useToast();
    return {
      messages,
      dismiss
    };
  }
};
<\/script>
<template>
  <aside class="base-toast" aria-live="polite" aria-label="알림">
    <article
      v-for="item in messages"
      :key="item.id"
      class="base-toast__item"
      :class="{ 'base-toast__item--error': item.type === 'error' }"
    >
      <span>{{ item.type === 'error' ? '!' : '✓' }} {{ item.text }}</span>
      <button aria-label="알림 닫기" @click="dismiss(item.id)">×</button>
    </article>
  </aside>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 200;
  max-width: calc(100vw - 48px);
  display: grid;
  gap: 8px;
  &__item {
    @include card-surface;
    @include flex-between;
    padding: 12px 18px;
    border-left: 4px solid var(--success);
    &--error {
      border-left-color: var(--danger);
    }
    button {
      padding: 2px 9px;
    }
  }
}
</style>
`},"10412-baa9f4e7-e7b56d01":JSON.parse(`{"file":"src/components/common/CodeExampleCard.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport { useId, defineAsyncComponent } from 'vue';\\nimport { Code2, Copy, Check, ChevronDown, FileCode2 } from 'lucide-vue-next';\\nimport { extractBlock } from '@/data/codeSnippets/blocks';\\nimport { useClipboard } from '@/composables/useClipboard';\\nimport { loadOptionsExamples, findOptionsExample } from '@/data/codeSnippets/apiVariants';\\nconst SyntaxCode = defineAsyncComponent(() => import('@/components/common/SyntaxCode.vue'));\\nexport default {\\n  name: 'CodeExampleCard',\\n  components: {\\n    SyntaxCode,\\n    Code2,\\n    Copy,\\n    Check,\\n    ChevronDown,\\n    FileCode2\\n  },\\n  props: {\\n    title: {\\n      type: String,\\n      default: 'Live example'\\n    },\\n    description: {\\n      type: String,\\n      default: ''\\n    },\\n    files: {\\n      type: Object,\\n      required: true\\n    },\\n    initiallyExpanded: {\\n      type: Boolean,\\n      default: false\\n    },\\n    sourceOnly: {\\n      type: Boolean,\\n      default: false\\n    }\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const id = useId();\\n    const { copied, copy } = useClipboard();\\n    return {\\n      id,\\n      copied,\\n      copy\\n    };\\n  },\\n  data() {\\n    const expanded = this.$props.initiallyExpanded;\\n    const selectedFile = Object.keys(this.$props.files)[0] || '';\\n    const selectedTab = 'full';\\n    const apiMode = 'composition';\\n    const optionsCatalog = null;\\n    const loadingOptions = false;\\n    const optionsError = '';\\n    return {\\n      expanded,\\n      selectedFile,\\n      selectedTab,\\n      apiMode,\\n      optionsCatalog,\\n      loadingOptions,\\n      optionsError\\n    };\\n  },\\n  computed: {\\n    originalSource() {\\n      return (\\n        this.$props.files[this.selectedFile] ?? Object.values(this.$props.files)[0] ?? ''\\n      );\\n    },\\n    vueSource() {\\n      return (\\n        /\\\\.vue$/.test(this.selectedFile) &&\\n        /^<script\\\\b[^>]*\\\\bsetup\\\\b/m.test(this.originalSource)\\n      );\\n    },\\n    optionsCode() {\\n      return findOptionsExample(this.optionsCatalog, this.originalSource);\\n    },\\n    optionsSelected() {\\n      return this.vueSource && this.apiMode === 'options';\\n    },\\n    canCopy() {\\n      return (\\n        !this.optionsSelected ||\\n        (!this.loadingOptions && !this.optionsError && !!this.optionsCode)\\n      );\\n    },\\n    tabs() {\\n      return [\\n        {\\n          id: 'full',\\n          label: \`전체 코드 (.\${this.selectedFile.split('.').pop() || 'vue'})\`\\n        },\\n        {\\n          id: 'template',\\n          label: '<template>'\\n        },\\n        {\\n          id: 'script',\\n          label: this.optionsSelected ? '<script> · Options API' : '<script setup>'\\n        },\\n        {\\n          id: 'style',\\n          label: '<style scss>'\\n        }\\n      ].filter((tab) => (!this.$props.sourceOnly && this.vueSource) || tab.id === 'full');\\n    },\\n    source() {\\n      return this.optionsSelected ? this.optionsCode : this.originalSource;\\n    },\\n    code() {\\n      if (\\n        this.selectedTab === 'full' ||\\n        (this.selectedTab === 'style' && this.selectedFile.endsWith('.scss'))\\n      )\\n        return this.source;\\n      const tag = this.selectedTab;\\n      return (\\n        extractBlock(this.source, tag) ||\\n        '이 파일에는 선택한 블록이 없습니다. 전체 코드 탭을 확인하세요.'\\n      );\\n    },\\n    codeLanguage() {\\n      return this.selectedTab === 'template'\\n        ? 'html'\\n        : this.selectedTab === 'script'\\n          ? 'javascript'\\n          : this.selectedTab === 'style'\\n            ? 'scss'\\n            : this.selectedFile.split('.').pop();\\n    }\\n  },\\n  methods: {\\n    async fetchOptions() {\\n      if (this.optionsCatalog || this.loadingOptions) return;\\n      this.loadingOptions = true;\\n      this.optionsError = '';\\n      try {\\n        this.optionsCatalog = await loadOptionsExamples();\\n      } catch {\\n        this.optionsError = 'Options API 소스를 불러오지 못했습니다. 다시 시도해 주세요.';\\n      } finally {\\n        this.loadingOptions = false;\\n      }\\n    },\\n    onApiKey(event) {\\n      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;\\n      event.preventDefault();\\n      this.apiMode =\\n        event.key === 'Home'\\n          ? 'composition'\\n          : event.key === 'End'\\n            ? 'options'\\n            : this.apiMode === 'composition'\\n              ? 'options'\\n              : 'composition';\\n      event.currentTarget.parentElement\\n        .querySelector(\`[data-api=\\"\${this.apiMode}\\"]\`)\\n        ?.focus();\\n    }\\n  },\\n  watch: {\\n    vueSource: {\\n      handler(value) {\\n        if (!value) this.selectedTab = 'full';\\n      }\\n    }\\n  },\\n  created() {\\n    this.$watch(\\n      () => [this.apiMode, this.vueSource],\\n      () => {\\n        if (this.optionsSelected) this.fetchOptions();\\n      }\\n    );\\n    this.$watch(\\n      () => this.$props.files,\\n      (files) => {\\n        if (!(this.selectedFile in files)) this.selectedFile = Object.keys(files)[0] || '';\\n      }\\n    );\\n  }\\n};\\n<\/script>\\n<template>\\n  <article class=\\"code-card\\">\\n    <header class=\\"code-card__header\\">\\n      <section>\\n        <h2>{{ title }}</h2>\\n        <p v-if=\\"description\\">{{ description }}</p>\\n      </section>\\n      <span class=\\"code-card__live\\">\\n        <span />\\n        {{ sourceOnly ? 'SOURCE FILES' : 'LIVE PREVIEW' }}\\n      </span>\\n    </header>\\n    <section class=\\"code-card__preview\\" aria-label=\\"동작 예제\\"><slot /></section>\\n    <footer class=\\"code-card__toolbar\\">\\n      <button :aria-expanded=\\"expanded\\" :aria-controls=\\"id\\" @click=\\"expanded = !expanded\\">\\n        <Code2 :size=\\"16\\" />\\n        {{ sourceOnly ? 'SCSS' : 'Vue' }} 코드 {{ expanded ? '닫기' : '보기' }}\\n        <ChevronDown :size=\\"14\\" :class=\\"{ 'code-card__chevron--open': expanded }\\" />\\n      </button>\\n      <span class=\\"code-card__hint\\">\\n        {{\\n          sourceOnly\\n            ? 'SCSS · 원본 파일'\\n            : 'Vue 3 · ' + (optionsSelected ? 'Options API' : 'Composition API')\\n        }}\\n      </span>\\n      <button\\n        :aria-label=\\"'현재 코드 복사'\\"\\n        :disabled=\\"!canCopy\\"\\n        @click=\\"copy(code, selectedFile.endsWith('.scss') ? 'SCSS' : 'Vue')\\"\\n      >\\n        <Check v-if=\\"copied\\" :size=\\"15\\" />\\n        <Copy v-else :size=\\"15\\" />\\n        {{ copied ? '복사됨 ✓' : '코드 복사' }}\\n      </button>\\n    </footer>\\n    <section v-if=\\"expanded\\" :id=\\"id\\" class=\\"code-card__source\\">\\n      <label class=\\"code-card__file\\">\\n        <FileCode2 :size=\\"15\\" />\\n        파일\\n        <select v-model=\\"selectedFile\\" aria-label=\\"소스 파일\\">\\n          <option v-for=\\"(_, name) in files\\" :key=\\"name\\" :value=\\"name\\">{{ name }}</option>\\n          <option v-if=\\"!selectedFile\\" value=\\"\\" disabled>파일 선택</option>\\n        </select>\\n      </label>\\n      <nav v-if=\\"vueSource\\" class=\\"code-card__api\\" role=\\"tablist\\" aria-label=\\"Vue API 방식\\">\\n        <button\\n          v-for=\\"api in ['composition', 'options']\\"\\n          :id=\\"\`\${id}-api-\${api}\`\\"\\n          :key=\\"api\\"\\n          role=\\"tab\\"\\n          :data-api=\\"api\\"\\n          :aria-selected=\\"apiMode === api\\"\\n          :aria-controls=\\"\`\${id}-api-panel\`\\"\\n          :tabindex=\\"apiMode === api ? 0 : -1\\"\\n          @click=\\"apiMode = api\\"\\n          @keydown=\\"onApiKey\\"\\n        >\\n          {{ api === 'composition' ? 'Composition API' : 'Options API' }}\\n        </button>\\n      </nav>\\n      <p v-if=\\"vueSource\\" class=\\"code-card__api-note\\">\\n        {{\\n          optionsSelected\\n            ? '같은 화면·동작을 data · computed · methods · watch로 작성한 Vue 3 전체 예제입니다. 공유 Composable·useId가 필요한 파일은 setup에서 연결하며, 해당 공통 JS는 두 방식에서 함께 사용합니다.'\\n            : '실제 화면에서 실행 중인 Composition API 원본입니다. Options API 탭으로 같은 기능의 작성 방식을 비교하세요.'\\n        }}\\n      </p>\\n      <p v-else class=\\"code-card__api-note\\">\\n        SCSS·HTML·CSS·공통 JS·에셋은 API 방식과 무관하게 같은 원본을 사용합니다.\\n      </p>\\n      <div v-if=\\"optionsSelected && loadingOptions\\" class=\\"code-card__status\\" role=\\"status\\">\\n        Options API 소스를 불러오는 중입니다…\\n      </div>\\n      <div\\n        v-else-if=\\"optionsSelected && optionsError\\"\\n        class=\\"code-card__status\\"\\n        role=\\"alert\\"\\n      >\\n        {{ optionsError }}\\n        <button @click=\\"fetchOptions\\">다시 시도</button>\\n      </div>\\n      <p v-else-if=\\"optionsSelected && !optionsCode\\" class=\\"code-card__status\\" role=\\"alert\\">\\n        이 원본과 일치하는 Options API 예제를 찾지 못했습니다. 페이지를 새로고침해 주세요.\\n      </p>\\n      <section\\n        v-if=\\"canCopy\\"\\n        :id=\\"\`\${id}-api-panel\`\\"\\n        :role=\\"vueSource ? 'tabpanel' : undefined\\"\\n        :aria-labelledby=\\"vueSource ? \`\${id}-api-\${apiMode}\` : undefined\\"\\n        :aria-label=\\"vueSource ? undefined : '공통 원본 소스'\\"\\n        tabindex=\\"0\\"\\n      >\\n        <nav class=\\"code-card__tabs\\" aria-label=\\"소스 코드 블록\\">\\n          <button\\n            v-for=\\"tab in tabs\\"\\n            :key=\\"tab.id\\"\\n            :aria-pressed=\\"selectedTab === tab.id\\"\\n            @click=\\"selectedTab = tab.id\\"\\n          >\\n            {{ tab.label }}\\n          </button>\\n        </nav>\\n        <SyntaxCode :code=\\"code\\" :language=\\"codeLanguage\\" label=\\"소스 코드\\" />\\n      </section>\\n    </section>\\n  </article>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/mixins' as *;\\n.code-card {\\n  @include card-surface;\\n  overflow: hidden;\\n  &__header {\\n    @include flex-between;\\n    padding: 22px 26px;\\n    border-bottom: 1px solid var(--border);\\n    h2 {\\n      font-size: 16px;\\n    }\\n    p {\\n      font-size: 12px;\\n      color: var(--muted);\\n      margin-top: 4px;\\n    }\\n  }\\n  &__live {\\n    display: flex;\\n    align-items: center;\\n    gap: 7px;\\n    font-size: 9px;\\n    letter-spacing: 1.2px;\\n    color: var(--caption);\\n    white-space: nowrap;\\n    span {\\n      width: 6px;\\n      height: 6px;\\n      border-radius: 50%;\\n      background: var(--success);\\n    }\\n  }\\n  &__preview {\\n    padding: 28px;\\n    min-height: 160px;\\n  }\\n  &__toolbar {\\n    @include flex-between;\\n    background: var(--canvas);\\n    border-top: 1px solid var(--border);\\n    padding: 10px 20px;\\n    button {\\n      display: flex;\\n      align-items: center;\\n      gap: 8px;\\n      font-size: 12px;\\n      border: 0;\\n      background: transparent;\\n    }\\n  }\\n  &__hint {\\n    margin-left: auto;\\n    color: var(--caption);\\n    font-size: 11px;\\n  }\\n  &__source {\\n    background: #1e1e1e;\\n    color: #d4d4d4;\\n    color-scheme: dark;\\n  }\\n  &__file {\\n    display: flex;\\n    padding: 14px 20px;\\n    gap: 10px;\\n    select {\\n      background: #252526;\\n      color: #e2e8f0;\\n      max-width: 85%;\\n    }\\n  }\\n  &__api {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 8px;\\n    padding: 16px 20px 0;\\n    button {\\n      background: #252526;\\n      color: #cbd5e1;\\n      border: 1px solid #4b5563;\\n      font-size: 12px;\\n      &[aria-selected='true'] {\\n        background: #37316c;\\n        color: #e0e7ff;\\n        border-color: #a5b4fc;\\n      }\\n    }\\n  }\\n  &__api-note,\\n  &__status {\\n    padding: 12px 20px;\\n    margin: 0;\\n    font-size: 12px;\\n    line-height: 1.8;\\n    color: #b8c2d1;\\n    overflow-wrap: anywhere;\\n  }\\n  button:focus-visible,\\n  select:focus-visible,\\n  [role='tabpanel']:focus-visible {\\n    outline: 2px solid #a5b4fc;\\n    outline-offset: -2px;\\n  }\\n  &__toolbar button:disabled {\\n    opacity: 0.45;\\n    cursor: wait;\\n  }\\n  &__tabs {\\n    display: flex;\\n    overflow: auto;\\n    padding: 0 14px;\\n    border-bottom: 1px solid #3c3c3c;\\n    button {\\n      background: none;\\n      color: #94a3b8;\\n      border: 0;\\n      border-radius: 0;\\n      font-size: 12px;\\n      white-space: nowrap;\\n      &[aria-pressed='true'] {\\n        color: #c7d2fe;\\n        border-bottom: 2px solid #818cf8;\\n      }\\n    }\\n  }\\n  &__chevron--open {\\n    transform: rotate(180deg);\\n  }\\n  @include responsive(mobile) {\\n    &__header,\\n    &__preview {\\n      padding: 18px;\\n    }\\n    &__hint {\\n      display: none;\\n    }\\n    &__live {\\n      font-size: 8px;\\n    }\\n  }\\n}\\n</style>\\n"}`),"5837-34ecf8d1-7032ad7":{file:"src/components/common/DataTable.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BasePagination from './BasePagination.vue';
export default {
  name: 'DataTable',
  components: {
    BasePagination
  },
  props: {
    initialRows: {
      type: Array,
      required: true
    }
  },
  data() {
    const rows = this.$props.initialRows.map((r) => ({
      ...r
    }));
    const query = '';
    const sortKey = 'name';
    const direction = 1;
    const page = 1;
    const pageSize = 5;
    const selected = [];
    const columns = [
      {
        key: 'name',
        label: '이름'
      },
      {
        key: 'email',
        label: '이메일'
      },
      {
        key: 'role',
        label: '역할'
      },
      {
        key: 'status',
        label: '상태'
      }
    ];
    return {
      rows,
      query,
      sortKey,
      direction,
      page,
      pageSize,
      selected,
      columns
    };
  },
  computed: {
    filtered() {
      return this.rows
        .filter((r) =>
          Object.values(r).join(' ').toLowerCase().includes(this.query.toLowerCase())
        )
        .sort(
          (a, b) =>
            String(a[this.sortKey]).localeCompare(String(b[this.sortKey]), 'ko', {
              numeric: true
            }) * this.direction
        );
    },
    visible() {
      return this.filtered.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
    all: {
      get() {
        return (
          this.visible.length > 0 && this.visible.every((r) => this.selected.includes(r.id))
        );
      },
      set(value) {
        const ids = this.visible.map((r) => r.id);
        this.selected = value
          ? [...new Set([...this.selected, ...ids])]
          : this.selected.filter((id) => !ids.includes(id));
      }
    },
    partial() {
      return !this.all && this.visible.some((r) => this.selected.includes(r.id));
    }
  },
  methods: {
    sort(key) {
      if (this.sortKey === key) this.direction *= -1;
      else {
        this.sortKey = key;
        this.direction = 1;
      }
    },
    remove() {
      this.rows = this.rows.filter((r) => !this.selected.includes(r.id));
      this.selected = [];
    },
    csvCell(value) {
      let text = String(value ?? '');
      if (/^[=+@\\-\\t\\r]/.test(text)) text = "'" + text;
      return '"' + text.replaceAll('"', '""') + '"';
    },
    download() {
      const fields = ['name', 'email', 'role', 'status'];
      const csv =
        '\\ufeff' +
        [fields, ...this.filtered.map((row) => fields.map((k) => row[k]))]
          .map((line) => line.map(this.csvCell).join(','))
          .join('\\r\\n');
      const url = URL.createObjectURL(
        new Blob([csv], {
          type: 'text/csv;charset=utf-8;'
        })
      );
      const link = document.createElement('a');
      link.href = url;
      link.download = 'vue-atelier-users.csv';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  },
  created() {
    this.$watch(
      () => [this.query, this.pageSize],
      () => {
        this.page = 1;
      }
    );
  }
};
<\/script>
<template>
  <section class="data-table">
    <header>
      <label>
        검색
        <input v-model="query" placeholder="이름, 이메일, 역할..." />
      </label>
      <label>
        페이지 크기
        <select v-model.number="pageSize">
          <option :value="5">5개</option>
          <option :value="10">10개</option>
          <option :value="20">20개</option>
        </select>
      </label>
      <button :disabled="!selected.length" @click="remove">
        선택 {{ selected.length }}개 삭제
      </button>
      <button @click="download">↓ CSV 다운로드</button>
    </header>
    <section class="data-table__scroll">
      <table>
        <caption>
          팀 멤버 ·
          {{
            filtered.length
          }}개 검색 결과
        </caption>
        <thead>
          <tr>
            <th>
              <input
                v-model="all"
                type="checkbox"
                :indeterminate="partial"
                aria-label="현재 페이지 전체 선택"
              />
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              :aria-sort="
                sortKey === col.key
                  ? direction === 1
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              "
            >
              <button @click="sort(col.key)">
                {{ col.label }}
                {{ sortKey === col.key ? (direction === 1 ? '↑' : '↓') : '↕' }}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in visible" :key="row.id">
            <td>
              <input
                v-model="selected"
                type="checkbox"
                :value="row.id"
                :aria-label="row.name + ' 선택'"
              />
            </td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.role }}</td>
            <td>
              <span
                class="data-table__status"
                :class="{ 'data-table__status--inactive': row.status !== 'Active' }"
              >
                {{ row.status }}
              </span>
            </td>
          </tr>
          <tr v-if="!visible.length">
            <td colspan="5">검색 결과가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer>
      <span>총 {{ filtered.length }}개 · {{ selected.length }}개 선택</span>
      <BasePagination v-model="page" :total="filtered.length" :page-size="pageSize" />
    </footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.data-table {
  display: grid;
  gap: 20px;
  header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 12px;
    label:first-child {
      margin-right: auto;
    }
  }
  &__scroll {
    overflow: auto;
    @include custom-scrollbar;
  }
  caption {
    text-align: left;
    font-size: 12px;
    color: var(--muted);
    padding-bottom: 14px;
  }
  th {
    white-space: nowrap;
    button {
      border: 0;
      padding: 0;
      background: none;
      border-radius: 0;
      font-size: 12px;
      color: inherit;
    }
  }
  td {
    font-size: 12px;
  }
  footer {
    @include flex-between;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--caption);
  }
  &__status {
    color: #059669;
    background: #10b98112;
    border-radius: 9999px;
    font-size: 10px;
    padding: 3px 10px;
    &--inactive {
      color: #b7790b;
      background: #f59e0b12;
    }
  }
}
</style>
`},"1245-41661a02-36291166":{file:"src/components/common/SyntaxCode.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { highlightCode } from '@/composables/codeHighlight';
export default {
  name: 'SyntaxCode',
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'plaintext'
    },
    label: {
      type: String,
      default: '소스 코드'
    }
  },
  computed: {
    highlighted() {
      return highlightCode(this.$props.code, this.$props.language);
    }
  }
};
<\/script>
<template>
  <pre
    class="syntax-code"
    tabindex="0"
    :aria-label="label"
  ><code v-html="highlighted" /></pre>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/code-palette' as *;
.syntax-code {
  @include custom-scrollbar;
  @include focus-ring;
  margin: 0;
  padding: 22px 24px;
  max-height: 600px;
  overflow: auto;
  background: #1e1e1e;
  color: #d4d4d4;
  color-scheme: dark;
  white-space: pre;
  tab-size: 2;
  text-align: left;
  font:
    13px/1.85 'SFMono-Regular',
    Consolas,
    'Liberation Mono',
    monospace;
  code {
    font: inherit;
    background: transparent;
    color: inherit;
    padding: 0;
  }
  &::selection,
  :deep(::selection) {
    background: #264f78;
  }
  :deep(code) {
    @include vs-code-dark-tokens;
  }
  @include responsive(mobile) {
    padding: 16px;
    font-size: 12px;
  }
}
</style>
`},"942-cde16063-7fc9c95d":{file:"src/components/common/TreeNode.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  data() {
    const open = true;
    return {
      open
    };
  }
};
<\/script>
<template>
  <li class="tree-node">
    <button v-if="node.children" :aria-expanded="open" @click="open = !open">
      {{ open ? '⌄' : '›' }} ▱ {{ $props.node.label }}
    </button>
    <span v-else class="tree-node__leaf">▤ {{ $props.node.label }}</span>
    <ul v-if="node.children" v-show="open">
      <TreeNode v-for="child in node.children" :key="child.id" :node="child" />
    </ul>
  </li>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.tree-node {
  list-style: none;
  button {
    border: 0;
    background: none;
    text-align: left;
  }
  ul {
    padding-left: 24px;
    border-left: 1px solid var(--border);
    margin-left: 15px;
  }
  &__leaf {
    display: block;
    padding: 8px 16px;
    color: var(--muted);
    font-size: 13px;
  }
}
</style>
`},"1253-6cd198d-25eeedc5":{file:"src/components/common-examples/AlertExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseAlert from '@/components/common/BaseAlert.vue';
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'AlertExample',
  components: {
    BaseAlert,
    BaseButton
  },
  data() {
    const visible = true;
    const retry = 0;
    return {
      visible,
      retry
    };
  }
};
<\/script>
<template>
  <section class="shared-example">
    <BaseAlert
      v-if="visible"
      title="저장에 실패했습니다"
      tone="danger"
      dismissible
      @close="visible = false"
    >
      네트워크 연결을 확인한 뒤 다시 시도해 주세요.
      <template #action>
        <BaseButton
          size="sm"
          variant="secondary"
          @click="
            retry++;
            visible = false;
          "
        >
          다시 시도
        </BaseButton>
      </template>
    </BaseAlert>
    <BaseAlert v-else title="안내를 닫았습니다" tone="success">
      재시도 횟수: {{ retry }}. 표시 여부는 부모가 관리합니다.
    </BaseAlert>
    <BaseAlert title="예약 점검 안내" tone="warning">
      예정된 점검 시간을 사용자에게 미리 알려주세요.
    </BaseAlert>
    <BaseAlert title="도움말">
      본문은 slot이므로 링크나 목록 등 화면에 필요한 내용을 넣을 수 있습니다.
    </BaseAlert>
    <div>
      <BaseButton variant="secondary" @click="visible = true"
        >오류 안내 다시 열기</BaseButton
      >
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"1264-84d6698b-ff31accd":{file:"src/components/common-examples/AvatarExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseAvatar from '@/components/common/BaseAvatar.vue';
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'AvatarExample',
  components: {
    BaseAvatar,
    BaseButton
  },
  data() {
    const useImage = false;
    const avatar =
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="#6366f1"/><circle cx="40" cy="30" r="14" fill="#fff"/><ellipse cx="40" cy="77" rx="29" ry="27" fill="#fff"/></svg>'
      );
    return {
      useImage,
      avatar
    };
  }
};
<\/script>
<template>
  <section class="shared-example">
    <div class="shared-example__row">
      <BaseAvatar name="김 지수" size="sm" />
      <BaseAvatar name="Min Park" />
      <BaseAvatar name="이 서연" size="lg" :src="useImage ? avatar : ''" />
      <span>이 서연 · 프로필</span>
    </div>
    <div>
      <BaseButton variant="secondary" @click="useImage = !useImage">
        {{ useImage ? '이니셜 표시' : '프로필 이미지 표시' }}
      </BaseButton>
    </div>
    <p class="shared-example__note">
      이미지가 없거나 로드에 실패하면 이름에서 이니셜을 만듭니다. 목록과 상세 화면에서는
      size만 바꿉니다. 이름은 접근 가능한 이미지 설명으로도 사용됩니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"8963-e90cdd9a-e68fa920":JSON.parse(`{"file":"src/components/common-examples/BadgeExample.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport {\\n  CircleHelp,\\n  Info,\\n  CircleCheck,\\n  LockKeyhole,\\n  ArrowUpRight,\\n  X\\n} from 'lucide-vue-next';\\nimport BaseIconTooltip from '@/components/common/BaseIconTooltip.vue';\\nimport BaseModal from '@/components/common/BaseModal.vue';\\nimport BaseButton from '@/components/common/BaseButton.vue';\\nimport BaseBadge from '@/components/common/BaseBadge.vue';\\nimport BaseSelect from '@/components/common/BaseSelect.vue';\\n// API의 업무 상태와 UI 표현은 화면(부모)에서 연결합니다.\\nexport default {\\n  name: 'BadgeExample',\\n  components: {\\n    CircleHelp,\\n    Info,\\n    CircleCheck,\\n    LockKeyhole,\\n    ArrowUpRight,\\n    X,\\n    BaseIconTooltip,\\n    BaseModal,\\n    BaseButton,\\n    BaseBadge,\\n    BaseSelect\\n  },\\n  data() {\\n    const statusMap = {\\n      pending: {\\n        label: '승인 대기',\\n        tone: 'warning'\\n      },\\n      active: {\\n        label: '재직 중',\\n        tone: 'success'\\n      },\\n      blocked: {\\n        label: '접근 제한',\\n        tone: 'danger'\\n      }\\n    };\\n    const status = 'pending';\\n    const options = Object.entries(statusMap).map(([value, item]) => ({\\n      value,\\n      label: item.label\\n    }));\\n    const helpOpen = false;\\n    const helpTitle = '';\\n    const helpText = '';\\n    const tags = ['긴급', '검토 요청'];\\n    return {\\n      statusMap,\\n      status,\\n      options,\\n      helpOpen,\\n      helpTitle,\\n      helpText,\\n      tags\\n    };\\n  },\\n  computed: {\\n    current() {\\n      return this.statusMap[this.status];\\n    }\\n  },\\n  methods: {\\n    showHelp(title, text) {\\n      this.helpTitle = title;\\n      this.helpText = text;\\n      this.helpOpen = true;\\n    },\\n    removeTag(tag) {\\n      this.tags = this.tags.filter((item) => item !== tag);\\n    }\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"shared-example\\">\\n    <div class=\\"shared-example__row\\">\\n      <BaseBadge\\n        v-for=\\"tone in ['primary', 'success', 'warning', 'danger', 'info', 'neutral']\\"\\n        :key=\\"tone\\"\\n        :tone=\\"tone\\"\\n        dot\\n      >\\n        {{ tone }}\\n      </BaseBadge>\\n    </div>\\n    <div class=\\"shared-example__form\\">\\n      <BaseSelect v-model=\\"status\\" label=\\"직원 상태\\" :options=\\"options\\" required />\\n    </div>\\n    <div class=\\"shared-example__row\\">\\n      <strong>목록 화면</strong>\\n      <BaseBadge :tone=\\"current.tone\\" dot>{{ current.label }}</BaseBadge>\\n      <strong>상세 화면</strong>\\n      <BaseBadge :tone=\\"current.tone\\" size=\\"sm\\">{{ current.label }}</BaseBadge>\\n    </div>\\n    <section class=\\"badge-example__section\\" aria-label=\\"배지 오른쪽 표시 아이콘\\">\\n      <h3>1. 상태를 보충하는 표시 아이콘</h3>\\n      <div class=\\"shared-example__row\\">\\n        <BaseBadge tone=\\"success\\">\\n          인증 완료\\n          <template #trailing><CircleCheck aria-hidden=\\"true\\" /></template>\\n        </BaseBadge>\\n        <BaseBadge tone=\\"neutral\\">\\n          읽기 전용\\n          <template #trailing><LockKeyhole aria-hidden=\\"true\\" /></template>\\n        </BaseBadge>\\n        <BaseBadge tone=\\"info\\" size=\\"sm\\">\\n          안내 사항\\n          <template #trailing><Info aria-hidden=\\"true\\" /></template>\\n        </BaseBadge>\\n      </div>\\n      <p class=\\"shared-example__note\\">\\n        문구와 같은 의미를 보충하는 아이콘은 aria-hidden으로 읽기 중복을 줄입니다. 아이콘만\\n        있고 클릭 동작은 없습니다.\\n      </p>\\n    </section>\\n    <section class=\\"badge-example__section\\" aria-label=\\"배지 오른쪽 도움말 버튼\\">\\n      <h3>2. 물음표·정보 아이콘으로 도움말 열기</h3>\\n      <div class=\\"shared-example__row\\">\\n        <BaseBadge :tone=\\"current.tone\\">\\n          {{ current.label }}\\n          <template #trailing>\\n            <button\\n              type=\\"button\\"\\n              class=\\"badge-example__icon-button\\"\\n              :aria-label=\\"current.label + ' 도움말 열기'\\"\\n              :title=\\"current.label + ' 도움말'\\"\\n              aria-haspopup=\\"dialog\\"\\n              @click.stop=\\"\\n                showHelp(\\n                  current.label + ' 도움말',\\n                  status === 'pending'\\n                    ? '관리자가 신청 내용을 확인하는 단계입니다. 승인이 완료되면 재직 중으로 변경됩니다.'\\n                    : status === 'active'\\n                      ? '승인된 직원으로 해당 업무 화면을 이용할 수 있는 상태입니다.'\\n                      : '관리자가 접근을 제한한 상태입니다. 권한 담당자에게 해제를 요청해 주세요.'\\n                )\\n              \\"\\n            >\\n              <CircleHelp aria-hidden=\\"true\\" />\\n            </button>\\n          </template>\\n        </BaseBadge>\\n        <BaseBadge tone=\\"info\\">\\n          정책 안내\\n          <template #trailing>\\n            <button\\n              type=\\"button\\"\\n              class=\\"badge-example__icon-button\\"\\n              aria-label=\\"정책 안내 자세히 보기\\"\\n              title=\\"정책 안내 자세히 보기\\"\\n              aria-haspopup=\\"dialog\\"\\n              @click.stop=\\"\\n                showHelp(\\n                  '정책 안내',\\n                  '상태 문구는 짧게 유지하고 자세한 설명은 이 도움말 영역에 제공합니다. 배지의 색상과 문구는 부모 화면에서 결정합니다.'\\n                )\\n              \\"\\n            >\\n              <Info aria-hidden=\\"true\\" />\\n            </button>\\n          </template>\\n        </BaseBadge>\\n      </div>\\n      <p class=\\"shared-example__note\\">\\n        클릭 가능한 아이콘은 SVG만 두지 않고 button으로 감쌉니다. Tab으로 이동하고\\n        Enter·Space로 열 수 있습니다. 위 직원 상태를 바꾸면 도움말도 함께 바뀝니다.\\n      </p>\\n    </section>\\n    <section class=\\"badge-example__section\\" aria-label=\\"배지 오른쪽 링크와 삭제 버튼\\">\\n      <h3>3. 상세 링크·선택 해제 아이콘</h3>\\n      <div class=\\"shared-example__row\\">\\n        <BaseBadge tone=\\"primary\\">\\n          공통 컴포넌트 가이드\\n          <template #trailing>\\n            <a\\n              class=\\"badge-example__icon-button\\"\\n              href=\\"https://parkjise.github.io/vue-guide/#/common-components/library\\"\\n              target=\\"_blank\\"\\n              rel=\\"noopener noreferrer\\"\\n              aria-label=\\"공통 컴포넌트 가이드 새 창으로 열기\\"\\n              title=\\"가이드 새 창으로 열기\\"\\n              @click.stop\\n            >\\n              <ArrowUpRight aria-hidden=\\"true\\" />\\n            </a>\\n          </template>\\n        </BaseBadge>\\n        <BaseBadge v-for=\\"tag in tags\\" :key=\\"tag\\" tone=\\"neutral\\">\\n          {{ tag }}\\n          <template #trailing>\\n            <button\\n              type=\\"button\\"\\n              class=\\"badge-example__icon-button\\"\\n              :aria-label=\\"tag + ' 선택 해제'\\"\\n              :title=\\"tag + ' 선택 해제'\\"\\n              @click.stop=\\"removeTag(tag)\\"\\n            >\\n              <X aria-hidden=\\"true\\" />\\n            </button>\\n          </template>\\n        </BaseBadge>\\n        <BaseButton\\n          v-if=\\"tags.length < 2\\"\\n          variant=\\"secondary\\"\\n          size=\\"sm\\"\\n          @click=\\"tags = ['긴급', '검토 요청']\\"\\n        >\\n          선택 태그 초기화\\n        </BaseButton>\\n      </div>\\n      <p class=\\"shared-example__note\\">\\n        이동은 a, 상태 변경은 button으로 구분합니다. 선택 해제는 부모 배열을 수정하며,\\n        버튼의 click.stop은 바깥 목록 행의 클릭이 함께 실행되는 것을 막습니다.\\n      </p>\\n    </section>\\n    <section class=\\"badge-example__section\\" aria-label=\\"배지 아이콘 툴팁\\">\\n      <h3>4. 아이콘에 올리면 나타나는 툴팁</h3>\\n      <div class=\\"shared-example__row\\">\\n        <BaseBadge :tone=\\"current.tone\\">\\n          {{ current.label }}\\n          <template #trailing>\\n            <BaseIconTooltip\\n              :label=\\"current.label + ' 간단 설명'\\"\\n              :text=\\"\\n                status === 'pending'\\n                  ? '담당자가 신청 내용을 검토하고 있습니다. 승인 후 사용할 수 있습니다.'\\n                  : status === 'active'\\n                    ? '인증과 승인이 완료되어 서비스를 이용할 수 있습니다.'\\n                    : '접근이 제한되었습니다. 권한 담당자에게 해제를 요청해 주세요.'\\n              \\"\\n            />\\n          </template>\\n        </BaseBadge>\\n        <BaseBadge tone=\\"info\\">\\n          자동 갱신\\n          <template #trailing>\\n            <BaseIconTooltip\\n              label=\\"자동 갱신 주기 설명\\"\\n              text=\\"데이터는 5분마다 갱신됩니다. 화면에 표시되는 시각은 마지막 갱신 완료 시각입니다.\\"\\n              placement=\\"bottom\\"\\n            >\\n              <Info :size=\\"13\\" aria-hidden=\\"true\\" />\\n            </BaseIconTooltip>\\n          </template>\\n        </BaseBadge>\\n        <BaseBadge tone=\\"success\\">\\n          보안 점검 완료\\n          <template #trailing>\\n            <BaseIconTooltip\\n              label=\\"보안 점검 범위 설명\\"\\n              text=\\"현재 항목의 필수 점검을 통과했습니다. 이 배지는 화면 예제이며 실제 보안 검사를 수행하지 않습니다.\\"\\n            >\\n              <CircleCheck :size=\\"13\\" aria-hidden=\\"true\\" />\\n            </BaseIconTooltip>\\n          </template>\\n        </BaseBadge>\\n      </div>\\n      <p class=\\"shared-example__note\\">\\n        마우스 hover 또는 Tab 포커스로 설명을 표시합니다. 아이콘을 누르면 열린 상태를\\n        유지하고, 다시 누르거나 바깥을 누르거나 Escape를 누르면 닫힙니다. 설명 위로 마우스를\\n        옮겨도 읽는 동안 유지됩니다.\\n      </p>\\n      <p class=\\"shared-example__note\\">\\n        짧은 보충 설명은 툴팁, 긴 내용이나 버튼이 필요한 안내는 위 도움말 모달을 사용합니다.\\n        툴팁은 role=\\"tooltip\\"과 aria-describedby로 아이콘에 연결됩니다.\\n      </p>\\n    </section>\\n    <BaseModal v-model=\\"helpOpen\\" :title=\\"helpTitle\\">\\n      <p class=\\"shared-example__note\\">{{ helpText }}</p>\\n      <div><BaseButton @click=\\"helpOpen = false\\">도움말 확인</BaseButton></div>\\n    </BaseModal>\\n    <p class=\\"shared-example__note\\">\\n      같은 BaseBadge를 두 화면에서 재사용합니다. 색상만으로 구분하지 않고 상태 문구를 함께\\n      제공합니다.\\n    </p>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/shared-examples' as examples;\\n@include examples.layout;\\n.badge-example {\\n  &__section {\\n    display: grid;\\n    gap: 12px;\\n    padding-top: 18px;\\n    border-top: 1px solid var(--border);\\n    h3 {\\n      margin: 0;\\n      font-size: 13px;\\n    }\\n  }\\n  &__icon-button {\\n    display: inline-flex;\\n    align-items: center;\\n    justify-content: center;\\n    flex-shrink: 0;\\n    width: 24px;\\n    height: 24px;\\n    padding: 3px;\\n    margin: -2px -5px -2px 0;\\n    border: 0;\\n    border-radius: 50%;\\n    background: transparent;\\n    color: inherit;\\n    cursor: pointer;\\n    text-decoration: none;\\n    &:hover {\\n      background: color-mix(in srgb, currentColor 12%, transparent);\\n    }\\n    &:focus-visible {\\n      outline: 2px solid currentColor;\\n      outline-offset: 2px;\\n    }\\n  }\\n}\\n</style>\\n"}`),"1355-769dbb24-4f4e8044":{file:"src/components/common-examples/ButtonExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { Save } from 'lucide-vue-next';
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'ButtonExample',
  components: {
    Save,
    BaseButton
  },
  data() {
    const saving = false;
    const result = '저장 버튼을 눌러 보세요.';
    let timer;
    return {
      saving,
      result,
      timer
    };
  },
  methods: {
    save() {
      if (this.saving) return;
      this.saving = true;
      this.result = '저장을 처리하고 있습니다…';
      // 실제 화면에서는 API 요청을 await하고 finally에서 saving을 해제합니다.
      this.timer = setTimeout(() => {
        this.saving = false;
        this.result = '저장이 완료되었습니다. (로컬 시연)';
      }, 900);
    }
  },
  unmounted() {
    return clearTimeout(this.timer);
  }
};
<\/script>
<template>
  <section class="shared-example">
    <div class="shared-example__row">
      <BaseButton :loading="saving" @click="save">
        <Save :size="15" />
        {{ saving ? '저장 중' : '변경사항 저장' }}
      </BaseButton>
      <BaseButton
        variant="secondary"
        :disabled="saving"
        @click="result = '변경을 취소했습니다.'"
      >
        취소
      </BaseButton>
      <BaseButton variant="danger" size="sm" disabled>삭제 권한 없음</BaseButton>
    </div>
    <output class="shared-example__output" aria-live="polite">{{ result }}</output>
    <p class="shared-example__note">
      로딩 여부와 저장 로직은 부모가 관리합니다. 버튼은 loading일 때 자동 비활성화되어 중복
      요청을 막습니다. 아이콘과 문구는 기본 slot으로 전달합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"1300-3f7ad0d7-be2b6663":{file:"src/components/common-examples/CardExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseCard from '@/components/common/BaseCard.vue';
import BaseBadge from '@/components/common/BaseBadge.vue';
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'CardExample',
  components: {
    BaseCard,
    BaseBadge,
    BaseButton
  },
  data() {
    const favorite = false;
    return {
      favorite
    };
  }
};
<\/script>
<template>
  <section class="shared-example shared-example__grid">
    <BaseCard title="서비스 운영 현황" description="프로젝트 대시보드">
      <template #actions><BaseBadge tone="success" dot>정상 운영</BaseBadge></template>
      <p class="shared-example__note">
        오늘 처리한 요청
        <strong>128건</strong>
        <br />
        응답 성공률 99.8%
      </p>
      <template #footer>5분 전 업데이트 · 운영팀</template>
    </BaseCard>
    <BaseCard title="디자인 시스템" description="문서 목록 카드">
      <template #actions>
        <BaseButton
          variant="secondary"
          size="sm"
          :aria-pressed="favorite"
          @click="favorite = !favorite"
        >
          {{ favorite ? '★ 저장됨' : '☆ 즐겨찾기' }}
        </BaseButton>
      </template>
      <p class="shared-example__note">
        카드의 테두리와 제목 구조는 공유하고 본문과 액션은 slot으로 다르게 구성합니다.
      </p>
      <template #footer>공통 컴포넌트 13종 관리 중</template>
    </BaseCard>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"1322-a9e9ada6-cb405c58":{file:"src/components/common-examples/EmptyExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
import BaseField from '@/components/common/BaseField.vue';
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'EmptyExample',
  components: {
    BaseEmptyState,
    BaseField,
    BaseButton
  },
  data() {
    const keyword = '없는 검색어';
    const projects = ['디자인 시스템', '고객 관리 포털'];
    return {
      keyword,
      projects
    };
  },
  computed: {
    visible() {
      return this.projects.filter((item) => item.includes(this.keyword.trim()));
    }
  },
  methods: {
    resetSearch() {
      this.keyword = '';
    }
  }
};
<\/script>
<template>
  <section class="shared-example">
    <div class="shared-example__form">
      <BaseField
        v-model="keyword"
        label="프로젝트 검색"
        placeholder="검색어를 입력하세요"
      />
    </div>
    <ul v-if="visible.length" class="shared-example__list">
      <li v-for="project in visible" :key="project">{{ project }}</li>
    </ul>
    <BaseEmptyState
      v-else
      title="검색 결과가 없습니다"
      description="검색어를 줄이거나 초기화하면 전체 프로젝트를 볼 수 있습니다."
    >
      <template #action><BaseButton @click="resetSearch">검색 초기화</BaseButton></template>
    </BaseEmptyState>
    <p class="shared-example__note">
      데이터가 없는 경우와 검색 결과가 없는 경우는 문구와 행동이 다릅니다. 공통 빈 상태
      컴포넌트는 유지하고 title·description·action slot만 바꿉니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"1726-eec1a4c-c735e2a8":{file:"src/components/common-examples/FieldExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseField from '@/components/common/BaseField.vue';
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'FieldExample',
  components: {
    BaseField,
    BaseButton
  },
  data() {
    const name = '';
    const email = '';
    const submitted = false;
    const touched = false;
    const result = '';
    return {
      name,
      email,
      submitted,
      touched,
      result
    };
  },
  computed: {
    emailError() {
      return (this.submitted || this.touched) &&
        !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(this.email)
        ? '이메일 형식을 확인해 주세요. 예: user@company.com'
        : '';
    },
    nameError() {
      return this.submitted && !this.name.trim() ? '이름을 입력해 주세요.' : '';
    }
  },
  methods: {
    submit() {
      this.submitted = true;
      this.result = '';
      if (!this.nameError && !this.emailError)
        this.result = \`\${this.name} / \${this.email} 등록 정보가 준비되었습니다.\`;
    }
  }
};
<\/script>
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
    <output v-if="result" class="shared-example__output" aria-live="polite">{{
      result
    }}</output>
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
`},"6033-d56409e8-53adccc2":{file:"src/components/common-examples/MemberManagementExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
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
export default {
  name: 'MemberManagementExample',
  components: {
    BaseBadge,
    BaseAvatar,
    BaseField,
    BaseSelect,
    BaseButton,
    BaseCard,
    BaseModal,
    BaseEmptyState,
    BaseAlert,
    BasePagination
  },
  data() {
    const members = [
      {
        id: 1,
        name: '김 지수',
        email: 'jisu@example.com',
        status: 'active'
      },
      {
        id: 2,
        name: '박 민준',
        email: 'minjun@example.com',
        status: 'pending'
      },
      {
        id: 3,
        name: '이 서연',
        email: 'seoyeon@example.com',
        status: 'active'
      }
    ];
    const statusMap = {
      active: {
        label: '재직 중',
        tone: 'success'
      },
      pending: {
        label: '초대 대기',
        tone: 'warning'
      }
    };
    const statuses = Object.entries(statusMap).map(([value, item]) => ({
      value,
      label: item.label
    }));
    const keyword = '';
    const status = '';
    const page = 1;
    const open = false;
    const submitted = false;
    const name = '';
    const email = '';
    const success = '';
    let sequence = 3;
    return {
      members,
      statusMap,
      statuses,
      keyword,
      status,
      page,
      open,
      submitted,
      name,
      email,
      success,
      sequence
    };
  },
  computed: {
    nameError() {
      return this.submitted && !this.name.trim() ? '이름을 입력해 주세요.' : '';
    },
    emailError() {
      if (!this.submitted) return '';
      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(this.email))
        return '올바른 이메일을 입력해 주세요.';
      return this.members.some(
        (item) => item.email.toLowerCase() === this.email.trim().toLowerCase()
      )
        ? '이미 등록된 이메일입니다.'
        : '';
    },
    filtered() {
      return this.members.filter(
        (item) =>
          (!this.status || item.status === this.status) &&
          (item.name + item.email).toLowerCase().includes(this.keyword.trim().toLowerCase())
      );
    },
    visible() {
      return this.filtered.slice((this.page - 1) * 3, this.page * 3);
    }
  },
  methods: {
    startInvite() {
      this.name = '';
      this.email = '';
      this.submitted = false;
      this.open = true;
    },
    invite() {
      this.submitted = true;
      if (this.nameError || this.emailError) return;
      this.members.push({
        id: ++this.sequence,
        name: this.name.trim(),
        email: this.email.trim(),
        status: 'pending'
      });
      this.keyword = '';
      this.status = '';
      this.page = Math.ceil(this.members.length / 3);
      this.open = false;
      this.success = \`\${this.name.trim()}님을 샘플 목록에 추가했습니다. 실제 초대 메일은 보내지 않습니다.\`;
    },
    approve(member) {
      member.status = 'active';
      this.success = \`\${member.name}님의 샘플 상태를 재직 중으로 변경했습니다.\`;
    }
  },
  created() {
    this.$watch(
      () => [this.keyword, this.status],
      () => {
        this.page = 1;
      },
      {
        flush: 'sync'
      }
    );
  }
};
<\/script>
<template>
  <section class="shared-example">
    <BaseAlert
      v-if="success"
      title="처리 결과"
      tone="success"
      dismissible
      @close="success = ''"
    >
      {{ success }}
    </BaseAlert>
    <BaseCard
      title="직원 관리"
      description="같은 공통 컴포넌트 10개를 조합한 로컬 업무 화면"
    >
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
      <template #footer
        >전체 {{ members.length }}명 · 조회 결과 {{ filtered.length }}명</template
      >
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
      직원 데이터·검색·검증·등록·상태 변경은 이 부모 화면이 담당합니다. 공통 컴포넌트는 직원
      API에 의존하지 않아 주문·게시판·프로젝트 화면에도 재사용할 수 있습니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"1690-d68ec0c8-3cc607d4":{file:"src/components/common-examples/ModalExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseModal from '@/components/common/BaseModal.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
export default {
  name: 'ModalExample',
  components: {
    BaseModal,
    BaseButton,
    BaseEmptyState
  },
  data() {
    const documents = ['운영 보고서 초안', '디자인 검토 메모'];
    const selected = '';
    const open = false;
    return {
      documents,
      selected,
      open
    };
  },
  methods: {
    askDelete(name) {
      this.selected = name;
      this.open = true;
    },
    confirmDelete() {
      this.documents = this.documents.filter((name) => name !== this.selected);
      this.open = false;
    }
  }
};
<\/script>
<template>
  <section class="shared-example">
    <ul v-if="documents.length" class="shared-example__list">
      <li v-for="name in documents" :key="name">
        {{ name }}
        <BaseButton variant="danger" size="sm" @click="askDelete(name)"
          >삭제 확인</BaseButton
        >
      </li>
    </ul>
    <BaseEmptyState v-else title="모든 샘플 문서를 삭제했습니다">
      <template #action>
        <BaseButton @click="documents = ['운영 보고서 초안', '디자인 검토 메모']">
          예제 초기화
        </BaseButton>
      </template>
    </BaseEmptyState>
    <BaseModal v-model="open" title="문서 삭제 확인">
      <p>{{ selected }} 문서를 목록에서 삭제할까요? 이 예제는 화면 데이터만 변경합니다.</p>
      <div class="shared-example__row">
        <BaseButton variant="secondary" @click="open = false">취소</BaseButton>
        <BaseButton variant="danger" @click="confirmDelete">삭제 실행</BaseButton>
      </div>
    </BaseModal>
    <p class="shared-example__note">
      모달은 열림 상태와 레이아웃을 공유합니다. 선택 문서와 삭제 처리는 부모에 둡니다.
      Escape 닫기, 포커스 이동·복원은 공통 BaseModal이 담당합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"1439-afc6d067-682feb37":{file:"src/components/common-examples/PaginationExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BasePagination from '@/components/common/BasePagination.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
export default {
  name: 'PaginationExample',
  components: {
    BasePagination,
    BaseSelect
  },
  data() {
    const page = 1;
    const pageSize = '5';
    const all = Array.from(
      {
        length: 23
      },
      (_, index) => ({
        id: index + 1,
        name: \`업무 문서 \${String(index + 1).padStart(2, '0')}\`
      })
    );
    const options = [
      {
        value: '5',
        label: '5개씩'
      },
      {
        value: '10',
        label: '10개씩'
      }
    ];
    return {
      page,
      pageSize,
      all,
      options
    };
  },
  computed: {
    rows() {
      return this.all.slice(
        (this.page - 1) * Number(this.pageSize),
        this.page * Number(this.pageSize)
      );
    }
  },
  watch: {
    pageSize: {
      handler() {
        this.page = 1;
      }
    }
  }
};
<\/script>
<template>
  <section class="shared-example">
    <div class="shared-example__form">
      <BaseSelect v-model="pageSize" label="페이지당 표시 수" :options="options" required />
    </div>
    <ul class="shared-example__list">
      <li v-for="row in rows" :key="row.id">
        {{ row.name }}
        <span>#{{ row.id }}</span>
      </li>
    </ul>
    <BasePagination v-model="page" :total="all.length" :page-size="Number(pageSize)" />
    <output class="shared-example__note"
      >전체 {{ all.length }}개 · 현재 {{ page }}페이지</output
    >
    <p class="shared-example__note">
      공통 페이지네이션은 페이지 번호만 바꿉니다. 데이터 slice 또는 서버 재조회는 부모에서
      처리하며 필터·페이지 크기가 바뀌면 첫 페이지로 되돌립니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"1488-3abef9f3-4a679c99":{file:"src/components/common-examples/SelectExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseSelect from '@/components/common/BaseSelect.vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
export default {
  name: 'SelectExample',
  components: {
    BaseSelect,
    BaseEmptyState
  },
  data() {
    const department = '';
    const departments = [
      {
        value: 'design',
        label: '디자인'
      },
      {
        value: 'dev',
        label: '개발'
      },
      {
        value: 'ops',
        label: '운영'
      }
    ];
    const members = [
      {
        name: '김지수',
        department: 'design'
      },
      {
        name: '박민준',
        department: 'dev'
      },
      {
        name: '이서연',
        department: 'dev'
      }
    ];
    return {
      department,
      departments,
      members
    };
  },
  computed: {
    visible() {
      return this.members.filter(
        (item) => !this.department || item.department === this.department
      );
    }
  }
};
<\/script>
<template>
  <section class="shared-example">
    <div class="shared-example__form">
      <BaseSelect
        v-model="department"
        label="부서로 직원 필터링"
        :options="departments"
        placeholder="전체 부서"
      />
    </div>
    <ul v-if="visible.length" class="shared-example__list">
      <li v-for="member in visible" :key="member.name">
        {{ member.name }}
        <span>{{
          departments.find((item) => item.value === member.department).label
        }}</span>
      </li>
    </ul>
    <BaseEmptyState
      v-else
      title="이 부서에는 직원이 없습니다"
      description="다른 부서를 선택해 주세요."
    />
    <p class="shared-example__note">
      공통 Select는 업무 데이터의 구조를 알 필요가 없습니다. 부모가 options를 value·label
      형태로 바꾸고 선택값으로 목록을 계산합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"1194-85505220-f181afac":{file:"src/components/common-examples/SkeletonExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseSkeleton from '@/components/common/BaseSkeleton.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
export default {
  name: 'SkeletonExample',
  components: {
    BaseSkeleton,
    BaseButton,
    BaseCard
  },
  data() {
    const loading = false;
    let timer;
    return {
      loading,
      timer
    };
  },
  methods: {
    reload() {
      if (this.loading) return;
      this.loading = true;
      this.timer = setTimeout(() => {
        this.loading = false;
      }, 1400);
    }
  },
  unmounted() {
    return clearTimeout(this.timer);
  }
};
<\/script>
<template>
  <section class="shared-example">
    <div>
      <BaseButton :disabled="loading" variant="secondary" @click="reload">
        데이터 다시 불러오기
      </BaseButton>
    </div>
    <div :aria-busy="loading">
      <BaseSkeleton
        v-if="loading"
        :lines="3"
        avatar
        label="프로젝트 정보를 불러오는 중입니다"
      />
      <BaseCard v-else title="고객 관리 포털" description="최신 프로젝트 정보">
        <p>담당자 김지수 · 검토 대기 문서 3건</p>
      </BaseCard>
    </div>
    <p class="shared-example__note">
      로딩·실패·빈 상태·정상 결과는 부모에서 나눕니다. Skeleton은 로딩 중 모양만 표시합니다.
      화면을 떠날 때 예제의 타이머를 정리하며, 애니메이션 줄이기 설정도 따릅니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"711-b83207ae-9beaad64":{file:"src/components/common-examples/TabsExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseTabs from '@/components/common/BaseTabs.vue';
export default {
  name: 'TabsExample',
  components: {
    BaseTabs
  },
  data() {
    const tabs = [
      {
        title: '기본 정보',
        content: '문서 제목, 작성자, 생성일을 보여주는 영역입니다.'
      },
      {
        title: '변경 이력',
        content: '승인 요청 → 담당자 검토 → 승인 완료 순으로 이력을 확인합니다.'
      },
      {
        title: '접근 권한',
        content: '문서 열람 및 수정 권한을 설명하는 영역입니다.'
      }
    ];
    return {
      tabs
    };
  }
};
<\/script>
<template>
  <section class="shared-example">
    <BaseTabs :items="tabs" />
    <p class="shared-example__note">
      items 배열을 바꾸면 직원 상세, 문서 상세 등 여러 화면에서 재사용할 수 있습니다. 좌우
      방향키, Home, End로 탭을 이동해 보세요. 현재 BaseTabs는 문자열 콘텐츠용이며 복잡한
      폼은 slot 기반으로 확장하는 편이 좋습니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"888-a32dcf46-918c75d6":{file:"src/components/common-examples/ToastExample.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseButton from '@/components/common/BaseButton.vue';
import { useToast } from '@/composables/useToast';
export default {
  name: 'ToastExample',
  components: {
    BaseButton
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { toast } = useToast();
    return {
      toast
    };
  },
  data() {
    return {
      useToast
    };
  },
  methods: {
    save() {
      this.toast('프로필 변경사항을 저장했습니다. (시연)');
    },
    fail() {
      this.toast('저장에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'error');
    }
  }
};
<\/script>
<template>
  <section class="shared-example">
    <div class="shared-example__row">
      <BaseButton @click="save">저장 완료 알림</BaseButton>
      <BaseButton variant="secondary" @click="fail">저장 실패 알림</BaseButton>
    </div>
    <p class="shared-example__note">
      어느 화면에서든 useToast()로 같은 알림 영역을 사용합니다. 화면 우측 하단에 4초간
      표시되고 닫기 버튼으로 제거할 수 있습니다. 여러 화면마다 BaseToast를 다시 배치하면
      알림이 중복됩니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
`},"7264-142f7a8c-49e13562":{file:"src/components/examples/MixinCatalog.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import catalog from '@/data/commonMixins.json';
import mixinSource from '@/assets/styles/_mixins.scss?raw';
import { getSassMixinSource } from '@/composables/sassMixinSource';
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import { useClipboard } from '@/composables/useClipboard';
export default {
  name: 'MixinCatalog',
  components: {
    SyntaxCode
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { copy } = useClipboard();
    return {
      copy
    };
  },
  data() {
    const query = '';
    const category = '전체';
    const selectedName = 'auto-grid';
    const categories = [...new Set(catalog.map((item) => item.category))];
    return {
      query,
      category,
      selectedName,
      categories,
      catalog
    };
  },
  computed: {
    selected() {
      return catalog.find((item) => item.name === this.selectedName);
    },
    original() {
      return getSassMixinSource(mixinSource, this.selected.name, this.selected.usage);
    },
    groups() {
      return this.categories
        .map((name) => ({
          name,
          items: catalog.filter(
            (item) =>
              item.category === name &&
              (this.category === '전체' || name === this.category) &&
              \`\${item.name} \${item.description} \${item.notes.join(' ')}\`
                .toLowerCase()
                .includes(this.query.trim().toLowerCase())
          )
        }))
        .filter((group) => group.items.length);
    }
  }
};
<\/script>
<template>
  <section class="mixin-catalog" aria-label="공통 믹스인 카탈로그">
    <header>
      <h3>공통 Mixin {{ catalog.length }}종</h3>
      <p>
        버튼을 선택하면 @include 사용 예시, 컴파일 결과, 실제 @mixin 원본과 내부 의존 정의를
        함께 확인할 수 있습니다.
      </p>
    </header>
    <div class="mixin-catalog__filters">
      <label>
        믹스인 검색
        <input v-model="query" type="search" placeholder="grid, 텍스트, 반응형…" />
      </label>
      <label>
        믹스인 분야
        <select v-model="category">
          <option>전체</option>
          <option v-for="name in categories" :key="name">{{ name }}</option>
        </select>
      </label>
    </div>
    <section v-for="group in groups" :key="group.name">
      <h4>{{ group.name }} · {{ group.items.length }}</h4>
      <div class="mixin-catalog__buttons">
        <button
          v-for="item in group.items"
          :key="item.name"
          type="button"
          :aria-pressed="selectedName === item.name"
          @click="selectedName = item.name"
        >
          <strong>{{ item.name }}</strong>
          <span>{{ item.description }}</span>
        </button>
      </div>
    </section>
    <p v-if="!groups.length" role="status">
      검색 결과가 없습니다. 검색어나 분야를 바꿔 주세요.
    </p>
    <section class="mixin-catalog__selected" aria-label="선택한 믹스인 사용법">
      <header>
        <h3>{{ selected.name }}</h3>
        <p>{{ selected.description }}</p>
      </header>
      <ul>
        <li v-for="note in selected.notes" :key="note">{{ note }}</li>
      </ul>
      <div class="mixin-catalog__code">
        <section>
          <header>
            <h4>SCSS 사용 예시</h4>
            <button type="button" @click="copy(selected.usage, 'SCSS')">
              사용 예시 복사
            </button>
          </header>
          <SyntaxCode :code="selected.usage" language="scss" label="믹스인 사용 예시" />
        </section>
        <section>
          <header>
            <h4>컴파일된 CSS</h4>
            <button type="button" @click="copy(selected.css, 'CSS')">CSS 복사</button>
          </header>
          <SyntaxCode :code="selected.css" language="css" label="믹스인 컴파일 결과" />
        </section>
      </div>
      <section class="mixin-catalog__original" aria-label="선택한 믹스인 원본">
        <header>
          <h4>선택한 @mixin 원본 · {{ selected.name }}</h4>
          <button type="button" @click="copy(original.bundle, 'SCSS 정의')">
            필요한 정의 모두 복사
          </button>
        </header>
        <p>
          src/assets/styles/_mixins.scss의 실제 정의입니다. @include에 전달한 인자는 아래
          매개변수로 들어갑니다.
        </p>
        <SyntaxCode :code="original.primary" language="scss" label="믹스인 원본 정의" />
      </section>
      <section
        v-if="original.dependencyCode"
        class="mixin-catalog__original"
        aria-label="믹스인 의존 원본"
      >
        <header>
          <h4>함께 필요한 원본 · 내부 호출과 사용 예시의 의존 항목</h4>
          <button type="button" @click="copy(original.dependencyCode, 'SCSS 의존 정의')">
            의존 원본 복사
          </button>
        </header>
        <ul>
          <li v-for="name in original.dependencyNames" :key="name">
            <code>{{ name }}</code>
          </li>
        </ul>
        <p>
          선택한 믹스인이 내부에서 호출하거나 사용 예시가 함께 사용하는 믹스인·함수·전역
          변수·Sass 모듈입니다.
        </p>
        <SyntaxCode
          :code="original.dependencyCode"
          language="scss"
          label="믹스인 의존 정의"
        />
      </section>
      <p>
        ‘사용 예시 복사’는 공통 파일을 @use로 가져오는 방식입니다. 프로젝트에 정의를 직접
        옮길 때는 ‘필요한 정의 모두 복사’를 사용하고, 별도 SCSS 파일에 저장하세요. 색상·배경
        등 CSS 변수는 전역 테마 토큰이 필요합니다. 전체 공통 파일은 아래 원본 파일에서
        확인할 수 있습니다.
      </p>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.mixin-catalog {
  display: grid;
  gap: 20px;
  min-width: 0;
  h3 {
    font-size: 17px;
  }
  h4 {
    font-size: 13px;
    margin-bottom: 10px;
  }
  p,
  li {
    font-size: 12px;
    line-height: 1.9;
    color: var(--muted);
  }
  p {
    margin-top: 7px;
  }
  &__filters {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 14px;
    label {
      display: grid;
      gap: 7px;
      font-size: 12px;
    }
    input,
    select {
      width: 100%;
      min-width: 0;
    }
  }
  &__buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr));
    gap: 8px;
    button {
      @include focus-ring;
      display: grid;
      gap: 6px;
      text-align: left;
      min-width: 0;
      strong {
        font-size: 12px;
        overflow-wrap: anywhere;
      }
      span {
        font-size: 10px;
        color: var(--muted);
      }
      &[aria-pressed='true'] {
        background: var(--soft);
        color: var(--primary);
        border-color: var(--primary);
      }
    }
  }
  &__selected {
    display: grid;
    gap: 14px;
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 12px;
    min-width: 0;
    ul {
      padding-left: 18px;
    }
  }
  &__original {
    display: grid;
    gap: 12px;
    min-width: 0;
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      h4 {
        margin: 0;
      }
      button {
        font-size: 11px;
      }
    }
    p {
      margin: 0;
    }
    code {
      overflow-wrap: anywhere;
    }
    .syntax-code {
      border-radius: 8px;
    }
  }
  &__code {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    min-width: 0;
    section {
      min-width: 0;
    }
    header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      h4 {
        margin: 0;
      }
      button {
        font-size: 10px;
      }
    }
    .syntax-code {
      border-radius: 8px;
      max-height: 350px;
    }
  }
  @include responsive(tablet) {
    &__code {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @include responsive(mobile) {
    &__filters {
      grid-template-columns: minmax(0, 1fr);
    }
    &__selected {
      padding: 14px;
    }
  }
}
</style>
`},"3560-22e5062c-ec86d328":{file:"src/components/examples/PeopleDirectory.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseModal from '@/components/common/BaseModal.vue';
export default {
  name: 'PeopleDirectory',
  components: {
    BaseModal
  },
  props: {
    mode: {
      type: String,
      default: 'users'
    }
  },
  data() {
    const query = '';
    const open = false;
    const name = '';
    const email = '';
    const role = 'Developer';
    const people = [
      {
        id: 1,
        name: 'Jise Park',
        email: 'jise@example.com',
        role: 'Developer',
        active: true
      },
      {
        id: 2,
        name: 'Emma Wilson',
        email: 'emma@example.com',
        role: 'Designer',
        active: true
      },
      {
        id: 3,
        name: 'Alex Kim',
        email: 'alex@example.com',
        role: 'Manager',
        active: false
      }
    ];
    return {
      query,
      open,
      name,
      email,
      role,
      people
    };
  },
  computed: {
    filtered() {
      return this.people.filter((p) =>
        (p.name + p.email + p.role).toLowerCase().includes(this.query.toLowerCase())
      );
    }
  },
  methods: {
    add() {
      if (!this.name.trim()) return;
      this.people.push({
        id: Date.now(),
        name: this.name.trim(),
        email: this.email,
        role: this.role,
        active: true
      });
      this.open = false;
      this.name = '';
      this.email = '';
    }
  }
};
<\/script>
<template>
  <section class="people-directory">
    <header>
      <input
        v-model="query"
        aria-label="사용자 이름 또는 이메일 검색"
        placeholder="이름, 이메일, 역할 검색..."
      />
      <button @click="open = true">
        + {{ $props.mode === 'contacts' ? '연락처' : '사용자' }} 추가
      </button>
    </header>
    <section class="people-directory__grid">
      <article v-for="person in filtered" :key="person.id">
        <span class="people-directory__avatar">
          {{
            person.name
              .split(' ')
              .map((n) => n[0])
              .join('')
          }}
        </span>
        <h3>{{ person.name }}</h3>
        <p>{{ person.role }}</p>
        <a :href="'mailto:' + person.email">{{ person.email }}</a>
        <button :aria-pressed="person.active" @click="person.active = !person.active">
          {{ person.active ? '● Active' : '○ Inactive' }}
        </button>
        <button
          :aria-label="person.name + ' 삭제'"
          @click="people = people.filter((p) => p.id !== person.id)"
        >
          삭제
        </button>
      </article>
    </section>
    <p v-if="!filtered.length">검색 결과가 없습니다.</p>
    <BaseModal v-model="open" title="새 연락처 / 사용자">
      <form @submit.prevent="add">
        <label>
          이름
          <input v-model="name" required />
        </label>
        <label>
          이메일
          <input v-model="email" type="email" required />
        </label>
        <label>
          역할
          <select v-model="role">
            <option>Developer</option>
            <option>Designer</option>
            <option>Manager</option>
          </select>
        </label>
        <button type="submit">추가</button>
      </form>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.people-directory {
  display: grid;
  gap: 22px;
  header {
    @include flex-between;
    flex-wrap: wrap;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
  }
  article {
    @include card-surface;
    display: grid;
    justify-items: center;
    gap: 12px;
    padding: 26px;
    h3 {
      font-size: 16px;
    }
    p,
    a {
      color: var(--muted);
      font-size: 12px;
    }
  }
  &__avatar {
    @include flex-center;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: var(--soft);
    color: var(--primary);
    font-weight: 600;
  }
  form {
    display: grid;
    gap: 16px;
    label {
      display: grid;
    }
  }
}
</style>
`},"704-1e09a9e3-d42586cf":{file:"src/components/examples/ProfileEditor.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'ProfileEditor',
  props: {
    label: {
      type: String,
      default: '이름'
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: {
    save: (value) => typeof value === 'string',
    'update:modelValue': null
  },
  computed: {
    name: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
<\/script>
<template>
  <article class="profile-editor">
    <header><slot name="header">프로필 편집</slot></header>
    <label>
      {{ $props.label }}
      <input v-model="name" />
    </label>
    <button @click="$emit('save', name)">저장 이벤트 전달</button>
    <slot :name="name" :length="name.length" />
  </article>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.profile-editor {
  @include card-surface;
  display: grid;
  gap: 16px;
  padding: 20px;
}
</style>
`},"12239-870dad54-54e02a24":JSON.parse(`{"file":"src/components/examples/ScssRecipeCatalog.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport recipes from '@/data/scssRecipes.json';\\nimport themeVariables from '@/assets/styles/_variables.scss?raw';\\nimport SyntaxCode from '@/components/common/SyntaxCode.vue';\\nimport { getExampleFiles } from '@/data/codeSnippets';\\nimport { getRecipeDefinitions } from '@/composables/scssRecipeSource';\\nimport { createPracticePreview } from '@/composables/practicePreview';\\nimport { useClipboard } from '@/composables/useClipboard';\\nimport { useTheme } from '@/composables/useTheme';\\nexport default {\\n  name: 'ScssRecipeCatalog',\\n  components: {\\n    SyntaxCode\\n  },\\n  props: {\\n    topic: {\\n      type: String,\\n      required: true\\n    }\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const { theme } = useTheme();\\n    const { copy } = useClipboard();\\n    return {\\n      theme,\\n      copy\\n    };\\n  },\\n  data() {\\n    const names = {\\n      tokens: '디자인 토큰',\\n      functions: '계산 함수',\\n      responsive: '반응형',\\n      typography: '타이포그래피',\\n      layout: '레이아웃',\\n      states: '상태와 인터랙션',\\n      loops: 'Map과 반복문',\\n      modules: '모듈 설계',\\n      'practice-source': 'Practice 진입점',\\n      'practice-tokens': 'Tokens 모듈',\\n      'practice-functions': 'Functions 모듈',\\n      'practice-mixins': 'Practice Mixins'\\n    };\\n    const search = '';\\n    const group = '전체';\\n    const selectedId = '';\\n    const selectedMember = '';\\n    const selectedFile = '';\\n    const previewOpen = false;\\n    const previewWidth = 720;\\n    const previewTheme = 'app';\\n    return {\\n      names,\\n      search,\\n      group,\\n      selectedId,\\n      selectedMember,\\n      selectedFile,\\n      previewOpen,\\n      previewWidth,\\n      previewTheme,\\n      recipes\\n    };\\n  },\\n  computed: {\\n    available() {\\n      return recipes.filter((recipe) => recipe.topics.includes(this.$props.topic));\\n    },\\n    categories() {\\n      return [...new Set(this.available.map((item) => item.topic))];\\n    },\\n    filtered() {\\n      return this.available.filter(\\n        (item) =>\\n          (this.group === '전체' || item.topic === this.group) &&\\n          \`\${item.title} \${item.description} \${item.id}\`\\n            .toLowerCase()\\n            .includes(this.search.trim().toLowerCase())\\n      );\\n    },\\n    active() {\\n      return this.filtered.find((item) => item.id === this.selectedId) || this.filtered[0];\\n    },\\n    files() {\\n      return this.active\\n        ? {\\n            ...getExampleFiles('', this.active.file),\\n            'src/assets/styles/_variables.scss': themeVariables\\n          }\\n        : {};\\n    },\\n    usage() {\\n      return this.files[this.active?.file.slice(1)] || '';\\n    },\\n    definitions() {\\n      return this.active ? getRecipeDefinitions(this.files, this.active.file) : [];\\n    },\\n    declaration() {\\n      return (\\n        this.definitions.find((item) => item.label === this.selectedMember) ||\\n        this.definitions[0]\\n      );\\n    },\\n    dependencyFile() {\\n      return this.selectedFile in this.files\\n        ? this.selectedFile\\n        : this.declaration?.file || Object.keys(this.files)[0];\\n    },\\n    dark() {\\n      return (\\n        this.previewTheme === 'dark' ||\\n        (this.previewTheme === 'app' && this.theme === 'dark')\\n      );\\n    },\\n    preview() {\\n      return this.active\\n        ? createPracticePreview(\\n            this.active.html,\\n            themeVariables + '\\\\n' + this.active.css,\\n            this.dark,\\n            true\\n          )\\n        : '';\\n    }\\n  },\\n  created() {\\n    this.$watch(\\n      () => this.active?.id,\\n      () => {\\n        this.selectedMember = '';\\n        this.selectedFile = '';\\n      }\\n    );\\n    this.$watch(\\n      () => this.$props.topic,\\n      () => {\\n        this.search = '';\\n        this.group = '전체';\\n        this.selectedId = '';\\n      }\\n    );\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"scss-recipes\\" :aria-label=\\"names[topic] + ' 실무 레시피'\\">\\n    <header class=\\"scss-recipes__intro\\">\\n      <h3>{{ names[topic] }} · 실무 레시피 {{ available.length }}개</h3>\\n      <p>\\n        패턴을 선택하면 실제 SCSS 사용 파일, Sass 컴파일 결과, 호출한 정의와 의존 파일을\\n        확인할 수 있습니다. 화면보기에서 너비와 테마를 바꿔 비교해 보세요.\\n      </p>\\n    </header>\\n    <div class=\\"scss-recipes__filters\\">\\n      <label>\\n        레시피 검색\\n        <input v-model=\\"search\\" type=\\"search\\" placeholder=\\"검색, 클래스, 동작…\\" />\\n      </label>\\n      <label v-if=\\"categories.length > 1\\">\\n        레시피 분야\\n        <select v-model=\\"group\\">\\n          <option>전체</option>\\n          <option v-for=\\"name in categories\\" :key=\\"name\\" :value=\\"name\\">\\n            {{ names[name] }}\\n          </option>\\n        </select>\\n      </label>\\n    </div>\\n    <nav class=\\"scss-recipes__buttons\\" aria-label=\\"SCSS 레시피 선택\\">\\n      <button\\n        v-for=\\"recipe in filtered\\"\\n        :key=\\"recipe.id\\"\\n        type=\\"button\\"\\n        :aria-pressed=\\"active?.id === recipe.id\\"\\n        @click=\\"selectedId = recipe.id\\"\\n      >\\n        <strong>{{ recipe.title }}</strong>\\n        <span>{{ recipe.description }}</span>\\n      </button>\\n    </nav>\\n    <p v-if=\\"!filtered.length\\" role=\\"status\\">\\n      일치하는 레시피가 없습니다. 검색어나 분야를 바꿔 주세요.\\n    </p>\\n    <article v-if=\\"active\\" class=\\"scss-recipes__detail\\" aria-label=\\"선택한 SCSS 레시피\\">\\n      <header>\\n        <small>{{ names[active.topic] }}</small>\\n        <h3>{{ active.title }}</h3>\\n        <p>{{ active.description }}</p>\\n        <code class=\\"scss-recipes__path\\">{{ active.file.replace('/src/', 'src/') }}</code>\\n      </header>\\n      <ol class=\\"scss-recipes__steps\\">\\n        <li v-for=\\"step in active.steps\\" :key=\\"step\\">{{ step }}</li>\\n      </ol>\\n      <aside class=\\"scss-recipes__note\\">\\n        <strong>실무에서 주의할 점</strong>\\n        <p>{{ active.pitfall }}</p>\\n      </aside>\\n      <section class=\\"scss-recipes__preview\\">\\n        <button\\n          type=\\"button\\"\\n          :aria-expanded=\\"previewOpen\\"\\n          aria-controls=\\"scss-recipe-preview\\"\\n          @click=\\"previewOpen = !previewOpen\\"\\n        >\\n          {{ previewOpen ? '화면 접기' : '화면보기' }}\\n        </button>\\n        <div v-if=\\"previewOpen\\" id=\\"scss-recipe-preview\\">\\n          <div class=\\"scss-recipes__filters\\">\\n            <label>\\n              미리보기 뷰포트 너비 {{ previewWidth }}px\\n              <input\\n                v-model.number=\\"previewWidth\\"\\n                type=\\"range\\"\\n                min=\\"280\\"\\n                max=\\"1440\\"\\n                step=\\"20\\"\\n                aria-label=\\"SCSS 미리보기 너비\\"\\n              />\\n            </label>\\n            <label>\\n              미리보기 테마\\n              <select v-model=\\"previewTheme\\">\\n                <option value=\\"app\\">앱 테마</option>\\n                <option value=\\"light\\">밝게</option>\\n                <option value=\\"dark\\">어둡게</option>\\n              </select>\\n            </label>\\n          </div>\\n          <p>\\n            프레임 너비는 실제 미디어 쿼리의 기준입니다. 넓은 화면은 영역 안에서 가로\\n            스크롤할 수 있습니다. hover·인쇄·모션 설정은 브라우저 환경도 함께 확인하세요.\\n          </p>\\n          <div class=\\"scss-recipes__frame-wrap\\">\\n            <iframe\\n              :key=\\"active.id\\"\\n              :srcdoc=\\"preview\\"\\n              :title=\\"active.title + ' 화면보기'\\"\\n              sandbox=\\"\\"\\n              referrerpolicy=\\"no-referrer\\"\\n              :style=\\"{ width: previewWidth + 'px' }\\"\\n            />\\n          </div>\\n        </div>\\n      </section>\\n      <div class=\\"scss-recipes__columns\\">\\n        <section>\\n          <header>\\n            <h4>SCSS 사용 예시 · 실제 파일</h4>\\n            <button type=\\"button\\" @click=\\"copy(usage, 'SCSS')\\">SCSS 복사</button>\\n          </header>\\n          <SyntaxCode :code=\\"usage\\" language=\\"scss\\" label=\\"레시피 SCSS 사용 예시\\" />\\n        </section>\\n        <section>\\n          <header>\\n            <h4>컴파일된 CSS</h4>\\n            <button type=\\"button\\" @click=\\"copy(active.css, 'CSS')\\">CSS 복사</button>\\n          </header>\\n          <SyntaxCode :code=\\"active.css\\" language=\\"css\\" label=\\"레시피 컴파일 CSS\\" />\\n        </section>\\n      </div>\\n      <details class=\\"scss-recipes__markup\\">\\n        <summary>화면보기에 사용한 HTML</summary>\\n        <header>\\n          <h4>HTML 구조</h4>\\n          <button type=\\"button\\" @click=\\"copy(active.html, 'HTML')\\">HTML 복사</button>\\n        </header>\\n        <SyntaxCode :code=\\"active.html\\" language=\\"html\\" label=\\"레시피 HTML\\" />\\n      </details>\\n      <section v-if=\\"declaration\\" class=\\"scss-recipes__source\\">\\n        <header>\\n          <h4>호출한 함수·믹스인·토큰의 실제 정의</h4>\\n          <button type=\\"button\\" @click=\\"copy(declaration.code, 'SCSS 정의')\\">\\n            정의 복사\\n          </button>\\n        </header>\\n        <label>\\n          정의 선택\\n          <select\\n            :value=\\"declaration.label\\"\\n            @change=\\"\\n              selectedMember = $event.target.value;\\n              selectedFile = '';\\n            \\"\\n          >\\n            <option v-for=\\"item in definitions\\" :key=\\"item.label\\" :value=\\"item.label\\">\\n              {{ item.label }} · {{ item.kind }}\\n            </option>\\n          </select>\\n        </label>\\n        <code class=\\"scss-recipes__path\\">{{ declaration.file }}</code>\\n        <SyntaxCode\\n          :code=\\"declaration.code\\"\\n          language=\\"scss\\"\\n          label=\\"레시피 관련 원본 정의\\"\\n        />\\n      </section>\\n      <section class=\\"scss-recipes__source\\">\\n        <header>\\n          <h4>전체 원본과 의존 파일</h4>\\n          <button type=\\"button\\" @click=\\"copy(files[dependencyFile], 'SCSS 원본')\\">\\n            선택 파일 복사\\n          </button>\\n        </header>\\n        <label>\\n          원본 파일\\n          <select :value=\\"dependencyFile\\" @change=\\"selectedFile = $event.target.value\\">\\n            <option v-for=\\"(_, name) in files\\" :key=\\"name\\" :value=\\"name\\">{{ name }}</option>\\n          </select>\\n        </label>\\n        <SyntaxCode\\n          :code=\\"files[dependencyFile] || ''\\"\\n          language=\\"scss\\"\\n          label=\\"레시피 의존 원본\\"\\n        />\\n        <p>\\n          정의 조각에는 다른 함수·변수·모듈이 필요할 수 있습니다. 원본 파일과 @use/@forward\\n          경로를 함께 유지하세요. _variables.scss는 런타임 테마용 CSS 변수이며, 실제 Sass\\n          의존 파일과 구분해 제공합니다.\\n        </p>\\n      </section>\\n    </article>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/mixins' as *;\\n.scss-recipes {\\n  display: grid;\\n  gap: 20px;\\n  min-width: 0;\\n  h3 {\\n    font-size: 17px;\\n  }\\n  h4 {\\n    font-size: 14px;\\n  }\\n  p,\\n  li {\\n    font-size: 12px;\\n    line-height: 1.95;\\n    color: var(--muted);\\n  }\\n  p {\\n    margin-top: 8px;\\n  }\\n  &__intro {\\n    padding: 18px;\\n    background: var(--soft);\\n    border-radius: 12px;\\n  }\\n  &__filters {\\n    display: grid;\\n    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);\\n    gap: 14px;\\n    label {\\n      display: grid;\\n      gap: 7px;\\n      font-size: 12px;\\n    }\\n    input,\\n    select {\\n      width: 100%;\\n      min-width: 0;\\n    }\\n  }\\n  &__buttons {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));\\n    gap: 8px;\\n    button {\\n      @include focus-ring;\\n      display: grid;\\n      gap: 6px;\\n      text-align: left;\\n      min-width: 0;\\n      strong {\\n        font-size: 12px;\\n      }\\n      span {\\n        color: var(--muted);\\n        font-size: 10px;\\n      }\\n      &[aria-pressed='true'] {\\n        background: var(--soft);\\n        color: var(--primary);\\n        border-color: var(--primary);\\n      }\\n    }\\n  }\\n  &__detail {\\n    display: grid;\\n    gap: 20px;\\n    min-width: 0;\\n    padding: 20px;\\n    border: 1px solid var(--border);\\n    border-radius: 12px;\\n    > header h3 {\\n      margin: 7px 0;\\n    }\\n    small {\\n      color: var(--primary);\\n    }\\n  }\\n  &__path {\\n    display: block;\\n    font-size: 11px;\\n    overflow-wrap: anywhere;\\n    margin-top: 8px;\\n    color: var(--primary);\\n  }\\n  &__steps {\\n    padding-left: 22px;\\n    margin: 0;\\n    li + li {\\n      margin-top: 9px;\\n    }\\n  }\\n  &__note {\\n    padding: 16px;\\n    background: var(--canvas);\\n    border-radius: 10px;\\n    strong {\\n      font-size: 12px;\\n    }\\n  }\\n  &__columns {\\n    display: grid;\\n    grid-template-columns: repeat(2, minmax(0, 1fr));\\n    gap: 12px;\\n    > section {\\n      min-width: 0;\\n    }\\n  }\\n  &__columns header,\\n  &__source header,\\n  &__markup header {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-between;\\n    align-items: center;\\n    gap: 10px;\\n    margin-bottom: 12px;\\n    button {\\n      font-size: 11px;\\n    }\\n  }\\n  &__source {\\n    display: grid;\\n    gap: 12px;\\n    min-width: 0;\\n    label {\\n      display: grid;\\n      gap: 8px;\\n      font-size: 12px;\\n    }\\n    select {\\n      width: 100%;\\n      min-width: 0;\\n      max-width: 100%;\\n    }\\n  }\\n  &__preview > button {\\n    margin-bottom: 14px;\\n    font-size: 12px;\\n  }\\n  &__frame-wrap {\\n    @include custom-scrollbar;\\n    overflow-x: auto;\\n    max-width: 100%;\\n    margin-top: 14px;\\n    border: 1px solid var(--border);\\n    border-radius: 10px;\\n    iframe {\\n      display: block;\\n      height: 460px;\\n      max-width: none;\\n      border: 0;\\n      background: var(--surface);\\n    }\\n  }\\n  &__markup {\\n    min-width: 0;\\n    summary {\\n      cursor: pointer;\\n      font-size: 12px;\\n      font-weight: 600;\\n      margin-bottom: 12px;\\n    }\\n  }\\n  .syntax-code {\\n    border-radius: 9px;\\n    max-height: 420px;\\n  }\\n  @include responsive(tablet) {\\n    &__columns {\\n      grid-template-columns: minmax(0, 1fr);\\n    }\\n  }\\n  @include responsive(mobile) {\\n    &__filters {\\n      grid-template-columns: minmax(0, 1fr);\\n    }\\n    &__detail {\\n      padding: 14px;\\n    }\\n  }\\n}\\n</style>\\n"}`),"2515-59612bfa-c46610ba":{file:"src/components/examples/TaskList.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'TaskList',
  props: {
    title: {
      type: String,
      default: '나의 할 일'
    }
  },
  data() {
    const input = '';
    const filter = 'All';
    const tasks = [
      {
        id: 1,
        title: '프로젝트 기획서 검토',
        done: true
      },
      {
        id: 2,
        title: 'Vue 컴포넌트 리팩토링',
        done: false
      },
      {
        id: 3,
        title: '팀 주간 미팅 준비',
        done: false
      }
    ];
    return {
      input,
      filter,
      tasks
    };
  },
  computed: {
    filtered() {
      return this.tasks.filter(
        (t) => this.filter === 'All' || (this.filter === 'Done' ? t.done : !t.done)
      );
    },
    completed() {
      return this.tasks.filter((t) => t.done).length;
    }
  },
  methods: {
    add() {
      if (!this.input.trim()) return;
      this.tasks.push({
        id: Date.now(),
        title: this.input.trim(),
        done: false
      });
      this.input = '';
    }
  }
};
<\/script>
<template>
  <section class="task-list">
    <h3>{{ $props.title }}</h3>
    <p>{{ completed }} / {{ tasks.length }} 완료</p>
    <progress :value="completed" :max="Math.max(tasks.length, 1)" />
    <form @submit.prevent="add">
      <input
        v-model="input"
        aria-label="새 할 일"
        required
        placeholder="무엇을 해야 하나요?"
      />
      <button type="submit">+ 추가</button>
    </form>
    <nav aria-label="할 일 필터">
      <button
        v-for="f in ['All', 'Active', 'Done']"
        :key="f"
        :aria-pressed="filter === f"
        @click="filter = f"
      >
        {{ f }}
      </button>
    </nav>
    <ul>
      <li v-for="task in filtered" :key="task.id">
        <label>
          <input v-model="task.done" type="checkbox" />
          <span :class="{ 'task-list__title--done': task.done }">{{ task.title }}</span>
        </label>
        <button
          :aria-label="task.title + ' 삭제'"
          @click="tasks = tasks.filter((t) => t.id !== task.id)"
        >
          ×
        </button>
      </li>
    </ul>
    <p v-if="!filtered.length">할 일이 없습니다. 여유로운 하루 보내세요!</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.task-list {
  display: grid;
  gap: 16px;
  p {
    color: var(--caption);
    font-size: 12px;
  }
  form {
    display: flex;
    gap: 10px;
    input {
      flex: 1;
    }
  }
  nav {
    display: flex;
    gap: 8px;
    button[aria-pressed='true'] {
      background: var(--soft);
      color: var(--primary);
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
  }
  li {
    @include flex-between;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 10px;
  }
  &__title--done {
    text-decoration: line-through;
    color: var(--caption);
  }
}
</style>
`},"758-a6e566b7-2b2f4499":{file:"src/components/layout/AppBreadcrumb.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'AppBreadcrumb',
  computed: {
    category() {
      return this.$route.meta.category || 'Workspace';
    }
  }
};
<\/script>
<template>
  <nav aria-label="현재 위치" class="app-breadcrumb">
    <RouterLink to="/">Workspace</RouterLink>
    <span>/</span>
    <span>{{ category }}</span>
    <span>/</span>
    <strong aria-current="page">{{ $route.meta.title }}</strong>
  </nav>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.app-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--caption);
  font-size: 10px;
  margin-bottom: 22px;
  strong {
    color: var(--muted);
    font-weight: 500;
  }
  a {
    @include focus-ring;
  }
}
</style>
`},"6399-e8ae8ac-c5f876be":{file:"src/components/layout/AppHeader.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import {
  Search,
  Moon,
  Sun,
  Bell,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown
} from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';
import { menuItems, tmoneyGuide } from '@/data/menuData';
export default {
  name: 'AppHeader',
  components: {
    Search,
    Moon,
    Sun,
    Bell,
    Menu,
    PanelLeftClose,
    PanelLeftOpen,
    ChevronDown
  },
  props: {
    mobile: {
      type: Boolean,
      default: false
    },
    sidebarOpen: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    menu: () => true
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { theme, toggle } = useTheme();
    return {
      theme,
      toggle
    };
  },
  data() {
    const query = '';
    const notifications = false;
    return {
      query,
      notifications,
      tmoneyGuide
    };
  },
  expose: ['focusMenu'],
  computed: {
    menuLabel() {
      return this.$props.mobile
        ? this.$props.sidebarOpen
          ? '전체 메뉴 닫기'
          : '전체 메뉴 열기'
        : this.$props.sidebarOpen
          ? '사이드바 접기'
          : '사이드바 펼치기';
    },
    results() {
      return this.query
        ? menuItems
            .filter((i) => i.title.toLowerCase().includes(this.query.toLowerCase()))
            .slice(0, 6)
        : [];
    }
  },
  methods: {
    focusMenu() {
      return this.$refs.menuButton?.focus();
    }
  }
};
<\/script>
<template>
  <header class="app-header">
    <button
      ref="menuButton"
      class="app-header__menu"
      :aria-label="menuLabel"
      :title="menuLabel"
      :aria-expanded="sidebarOpen"
      aria-controls="app-sidebar"
      @click="$emit('menu')"
    >
      <Menu v-if="mobile" :size="20" />
      <PanelLeftClose v-else-if="sidebarOpen" :size="20" />
      <PanelLeftOpen v-else :size="20" />
    </button>
    <section class="app-header__workspace">
      <span class="app-header__workspace-icon">✦</span>
      <strong>Personal workspace</strong>
      <ChevronDown :size="13" />
      <span class="app-header__plan">PRO</span>
    </section>
    <section class="app-header__search">
      <label>
        <Search :size="16" />
        <input
          v-model="query"
          aria-label="페이지 빠른 검색"
          placeholder="무엇을 찾고 있나요?"
        />
      </label>
      <ul v-if="query">
        <li v-for="item in results" :key="item.path">
          <RouterLink :to="item.path" @click="query = ''">
            {{ item.title }}
            <small>{{ item.folder }}</small>
          </RouterLink>
        </li>
        <li v-if="!results.length">검색 결과 없음</li>
      </ul>
    </section>
    <a
      class="app-header__guide"
      :href="tmoneyGuide.href"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="tmoneyGuide.title + ' (새 창)'"
      :title="tmoneyGuide.title + ' (새 창)'"
    >
      T
    </a>
    <nav class="app-header__actions" aria-label="설정 및 바로가기">
      <button
        :aria-label="theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'"
        @click="toggle"
      >
        <Moon v-if="theme === 'light'" :size="18" />
        <Sun v-else :size="18" />
      </button>
      <button
        aria-label="알림 보기"
        :aria-expanded="notifications"
        class="app-header__bell"
        @click="notifications = !notifications"
      >
        <Bell :size="18" />
        <i />
      </button>
    </nav>
    <section v-if="notifications" class="app-header__notification">
      <strong>모든 준비가 끝났어요 ✨</strong>
      <p>Vue 3 실무 예제와 UI 컴포넌트를 살펴보세요.</p>
      <RouterLink to="/vue-patterns/async" @click="notifications = false">
        실무 패턴 열기 →
      </RouterLink>
    </section>
  </header>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.app-header {
  @include flex-between;
  height: 79px;
  padding: 0 34px;
  position: sticky;
  top: 0;
  z-index: 30;
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  &__workspace {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    white-space: nowrap;
  }
  &__workspace-icon {
    background: var(--soft);
    color: var(--primary);
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 18px;
  }
  &__plan {
    font-size: 8px;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 5px;
    color: var(--caption);
  }
  &__search {
    position: relative;
    margin-left: auto;
    label {
      display: flex;
      gap: 8px;
      color: var(--caption);
    }
    input {
      background: none !important;
      border: 0 !important;
      font-size: 11px;
      padding: 6px !important;
      width: 170px;
    }
    ul {
      @include card-surface;
      position: absolute;
      top: 34px;
      right: 0;
      width: 300px;
      list-style: none;
      margin: 0;
      padding: 8px;
      li {
        padding: 9px;
      }
      a {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      small {
        color: var(--caption);
      }
    }
  }
  &__guide {
    @include flex-center;
    @include focus-ring;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border: 1px solid var(--border);
    border-radius: 7px;
    background: var(--soft);
    color: var(--primary);
    font-size: 16px;
    font-weight: 800;
    text-decoration: none;
    &:hover {
      background: var(--primary);
      color: #fff;
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 14px;
    button {
      border: 0;
      padding: 6px;
      background: none;
      color: var(--muted);
    }
  }
  &__bell {
    position: relative;
    i {
      position: absolute;
      right: 7px;
      top: 4px;
      width: 5px;
      height: 5px;
      background: var(--primary);
      border: 1px solid var(--surface);
      border-radius: 50%;
    }
  }
  &__menu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 14px;
    padding: 8px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--muted);
  }
  &__notification {
    @include card-surface;
    position: absolute;
    right: 24px;
    top: 68px;
    padding: 22px;
    font-size: 12px;
    p {
      color: var(--muted);
      margin: 8px 0;
    }
    a {
      color: var(--primary);
    }
  }
  @include responsive(tablet) {
    &__guide {
      margin-left: auto;
    }
    &__search {
      display: none;
    }
  }
  @include responsive(mobile) {
    padding: 0 18px;
    height: 66px;
    &__menu {
      display: flex;
      padding: 5px;
      margin-right: 0;
    }
    &__workspace {
      font-size: 10px;
    }
    &__plan {
      display: none;
    }
    &__actions {
      gap: 6px;
    }
  }
}
</style>
`},"8089-b08c7263-53dc79dd":{file:"src/components/layout/AppSidebar.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import {
  Search,
  Palette,
  ChevronDown,
  X,
  Layers,
  CodeXml,
  Workflow,
  LayoutDashboard,
  Component,
  Table2,
  ArrowUpRight
} from 'lucide-vue-next';
import { menuGroups } from '@/data/menuData';
export default {
  name: 'AppSidebar',
  components: {
    Search,
    ChevronDown,
    X,
    Component,
    ArrowUpRight
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    close: () => true
  },
  data() {
    const query = '';
    const collapsed = new Set([
      'Applications',
      'UI Kits & Bonus UI',
      'Forms & Tables',
      'SCSS 실무 가이드',
      '팁'
    ]);
    const icons = {
      Layers,
      CodeXml,
      Workflow,
      LayoutDashboard,
      Component,
      Table2,
      Palette
    };
    return {
      query,
      collapsed,
      icons
    };
  },
  computed: {
    groups() {
      return menuGroups
        .map((g) => ({
          ...g,
          children: g.children.filter((i) =>
            (g.title + ' ' + i.title + ' ' + i.description)
              .toLowerCase()
              .includes(this.query.toLowerCase())
          )
        }))
        .filter((g) => g.children.length);
    }
  },
  methods: {
    toggle(title) {
      const set = new Set(this.collapsed);
      set.has(title) ? set.delete(title) : set.add(title);
      this.collapsed = set;
    }
  },
  created() {
    this.$watch(
      () => this.$route.path,
      (path) => {
        const group = menuGroups.find((g) => g.children.some((i) => i.path === path));
        if (group) {
          const next = new Set(this.collapsed);
          next.delete(group.title);
          this.collapsed = next;
        }
      },
      {
        immediate: true
      }
    );
  }
};
<\/script>
<template>
  <aside
    id="app-sidebar"
    class="app-sidebar"
    :class="{ 'app-sidebar--open': $props.open, 'app-sidebar--hidden': !$props.visible }"
    :inert="!$props.visible"
    :aria-hidden="!$props.visible"
  >
    <RouterLink to="/" class="app-sidebar__brand" @click="$emit('close')">
      <span class="app-sidebar__logo">
        v
        <span>✳</span>
      </span>
      vue
      <span class="app-sidebar__word">atelier</span>
      <small>3</small>
    </RouterLink>
    <button class="app-sidebar__close" aria-label="메뉴 닫기" @click="$emit('close')">
      <X :size="18" />
    </button>
    <p class="app-sidebar__caption">YOUR VUE WORKSPACE</p>
    <label class="app-sidebar__search">
      <Search :size="15" />
      <input v-model="query" aria-label="메뉴 검색" placeholder="메뉴 검색..." />
      <kbd>/</kbd>
    </label>
    <nav class="app-sidebar__nav" aria-label="전체 메뉴">
      <section v-for="group in groups" :key="group.title" class="app-sidebar__group">
        <RouterLink
          v-if="group.direct"
          :to="group.children[0].path"
          class="app-sidebar__category app-sidebar__category--direct"
          @click="$emit('close')"
        >
          <component :is="icons[group.icon]" :size="17" />
          <span>{{ group.title }}</span>
        </RouterLink>
        <button
          v-else
          class="app-sidebar__category"
          :aria-expanded="!!query || !collapsed.has(group.title)"
          @click="toggle(group.title)"
        >
          <component :is="icons[group.icon]" :size="17" />
          <span>{{ group.title }}</span>
          <ChevronDown :size="13" />
        </button>
        <ul v-if="!group.direct" v-show="query || !collapsed.has(group.title)">
          <li v-for="item in group.children" :key="item.path">
            <RouterLink :to="item.path" class="app-sidebar__link" @click="$emit('close')">
              <span class="app-sidebar__dot" />
              {{ item.title }}
              <small v-if="item.slug === 'default'">NEW</small>
            </RouterLink>
          </li>
        </ul>
      </section>
      <p v-if="!groups.length" class="app-sidebar__empty">검색 결과가 없습니다.</p>
    </nav>
    <footer class="app-sidebar__footer">
      <div class="app-sidebar__footer-info">
        <span class="app-sidebar__version">✦</span>
        <section>
          <strong>Build something great.</strong>
          <p>Vue 3 실무 레퍼런스</p>
        </section>
        <RouterLink to="/vue-syntax/conditional" aria-label="가이드 시작">
          <ArrowUpRight :size="16" />
        </RouterLink>
      </div>
    </footer>
  </aside>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.app-sidebar {
  width: 254px;
  position: fixed;
  inset: 0 auto 0 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  z-index: 50;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    visibility 0.2s;
  &--hidden {
    transform: translateX(-100%);
    visibility: hidden;
    pointer-events: none;
  }
  &__brand {
    display: flex;
    align-items: center;
    padding: 27px 26px 25px;
    gap: 3px;
    font-size: 26px;
    font-weight: 750;
    letter-spacing: -1px;
    small {
      background: var(--soft);
      color: var(--primary);
      font-size: 10px;
      padding: 1px 5px;
      border-radius: 5px;
      align-self: flex-start;
      letter-spacing: 0;
      margin: 4px;
    }
  }
  &__word {
    font-weight: 400;
  }
  &__logo {
    font-size: 28px;
    background: var(--primary);
    color: #fff;
    border-radius: 10px;
    width: 35px;
    height: 35px;
    line-height: 33px;
    text-align: center;
    position: relative;
    margin-right: 7px;
    span {
      font-size: 15px;
      position: absolute;
      right: 1px;
      top: -6px;
      color: #c4b5fd;
    }
  }
  &__caption {
    font-size: 9px;
    font-weight: 650;
    letter-spacing: 1.8px;
    color: var(--caption);
    padding: 0 25px 13px;
  }
  &__search {
    display: flex;
    margin: 0 18px 18px;
    border: 1px solid var(--border);
    padding: 8px 10px;
    border-radius: 8px;
    color: var(--caption);
    input {
      width: 100%;
      border: 0 !important;
      background: none !important;
      padding: 0 !important;
      font-size: 12px;
      outline: none;
    }
    kbd {
      font-size: 11px;
      border: 1px solid var(--border);
      padding: 0 4px;
      border-radius: 3px;
    }
  }
  &__nav {
    @include custom-scrollbar;
    overflow: auto;
    flex: 1;
    min-height: 0;
    padding: 0 13px;
  }
  &__group {
    margin-bottom: 13px;
  }
  &__category {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 0;
    width: 100%;
    font-size: 11px;
    font-weight: 650;
    padding: 9px 10px;
    background: none;
    color: var(--muted);
    text-align: left;
    span {
      flex: 1;
    }
  }
  &__category--direct {
    border-radius: 8px;
    @include focus-ring;
    &:hover {
      background: var(--canvas);
    }
    &.router-link-exact-active {
      color: var(--primary);
      background: var(--soft);
    }
  }
  ul {
    list-style: none;
    padding: 4px 0;
    margin: 0;
  }
  &__link {
    display: flex;
    align-items: center;
    gap: 11px;
    margin: 2px 0;
    padding: 9px 14px 9px 19px;
    font-size: 12px;
    color: var(--muted);
    border-radius: 8px;
    &:hover {
      background: var(--canvas);
    }
    &.router-link-exact-active {
      color: var(--primary);
      background: var(--soft);
      font-weight: 600;
    }
    small {
      font-size: 8px;
      color: var(--primary);
      margin-left: auto;
    }
  }
  &__dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.6;
  }
  &__footer {
    flex-shrink: 0;
    display: grid;
    gap: 14px;
    padding: 18px 16px;
    border-top: 1px solid var(--border);
    strong {
      font-size: 10px;
    }
    p {
      font-size: 9px;
      color: var(--caption);
    }
  }
  &__footer-info {
    @include flex-between;
  }
  &__version {
    @include flex-center;
    background: var(--soft);
    width: 30px;
    height: 32px;
    color: var(--primary);
    border-radius: 8px;
  }
  &__close {
    display: none;
  }
  &__empty {
    padding: 16px;
    color: var(--muted);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  @include responsive(mobile) {
    &--open {
      transform: translateX(0);
    }
    &__close {
      display: block;
      position: absolute;
      right: 10px;
      top: 30px;
      padding: 3px;
    }
  }
}
</style>
`},"2606-7216d507-6059c1a5":{file:"src/components/practice/data-async.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'DataAsync',
  data() {
    const loading = false;
    const fail = false;
    const error = '';
    const rows = [];
    const loaded = false;
    let timer;
    return {
      loading,
      fail,
      error,
      rows,
      loaded,
      timer
    };
  },
  methods: {
    load() {
      if (this.loading) return;
      const shouldFail = this.fail;
      this.loading = true;
      this.error = '';
      this.loaded = false;
      this.rows = [];
      this.timer = setTimeout(() => {
        if (shouldFail) this.error = '조회에 실패했습니다. 다시 시도하세요.';
        else {
          this.rows = ['컴포넌트 설계', '접근성 검토'];
          this.loaded = true;
        }
        this.loading = false;
      }, 650);
    }
  },
  unmounted() {
    return clearTimeout(this.timer);
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      <input v-model="fail" :disabled="loading" type="checkbox" />
      실패 테스트
    </label>
    <button :disabled="loading" @click="load">
      {{ loading ? '조회 중…' : '조회 / 재시도' }}
    </button>
    <p v-if="loading" role="status">불러오는 중입니다.</p>
    <p v-else-if="error" class="error" role="alert">{{ error }}</p>
    <ul v-else-if="loaded">
      <li v-for="row in rows" :key="row">{{ row }}</li>
    </ul>
    <p v-else>조회 전입니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2408-5626452c-8d3b0dde":{file:"src/components/practice/data-cart.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'DataCart',
  data() {
    const items = [
      {
        id: 1,
        name: '키보드',
        price: 30000,
        quantity: 1
      },
      {
        id: 2,
        name: '마우스',
        price: 18000,
        quantity: 1
      }
    ];
    return {
      items
    };
  },
  computed: {
    total() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  methods: {
    setQuantity(item, event) {
      const number = Number(event.target.value);
      item.quantity = Number.isFinite(number)
        ? Math.min(5, Math.max(1, Math.trunc(number)))
        : 1;
      event.target.value = String(item.quantity);
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <label v-for="item in items" :key="item.id">
      {{ item.name }} · {{ item.price.toLocaleString() }}원
      <input
        type="number"
        :value="item.quantity"
        min="1"
        max="5"
        step="1"
        @input="setQuantity(item, $event)"
      />
    </label>
    <output>합계 {{ total.toLocaleString() }}원</output>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2368-98b76b97-9d6f2ecf":{file:"src/components/practice/data-debounce.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'DataDebounce',
  data() {
    const input = '';
    const query = '';
    const waiting = false;
    const items = ['Vue Guide', 'Vite Build', 'Vue Router'];
    return {
      input,
      query,
      waiting,
      items
    };
  },
  computed: {
    results() {
      return this.items.filter((item) =>
        item.toLowerCase().includes(this.query.toLowerCase())
      );
    }
  },
  watch: {
    input: {
      handler(value, _old, onCleanup) {
        this.waiting = true;
        const timer = setTimeout(() => {
          this.query = value.trim();
          this.waiting = false;
        }, 350);
        onCleanup(() => clearTimeout(timer));
      }
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      검색
      <input v-model="input" placeholder="Vue" />
    </label>
    <p role="status">{{ waiting ? '입력 대기 중…' : results.length + '개 결과' }}</p>
    <ul>
      <li v-for="item in results" :key="item">{{ item }}</li>
    </ul>
    <p v-if="!results.length">검색 결과가 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2193-49e7ef36-50058546":{file:"src/components/practice/data-search.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'DataSearch',
  data() {
    const query = '';
    const items = [
      {
        id: 1,
        name: 'Vue Guide'
      },
      {
        id: 2,
        name: 'Vite Build'
      },
      {
        id: 3,
        name: 'Vue Router'
      }
    ];
    return {
      query,
      items
    };
  },
  computed: {
    filtered() {
      const keyword = this.query.trim().toLowerCase();
      return this.items.filter((item) => item.name.toLowerCase().includes(keyword));
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      검색
      <input v-model="query" placeholder="Vue" />
    </label>
    <p>{{ filtered.length }}개 결과</p>
    <ul v-if="filtered.length">
      <li v-for="item in filtered" :key="item.id">{{ item.name }}</li>
    </ul>
    <p v-else class="muted">검색 결과가 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2229-c6093f9e-993a109c":{file:"src/components/practice/data-sort.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'DataSort',
  data() {
    const order = 'asc';
    const products = [
      {
        id: 1,
        name: '키보드',
        price: 30000
      },
      {
        id: 2,
        name: '마우스',
        price: 18000
      },
      {
        id: 3,
        name: '모니터',
        price: 180000
      }
    ];
    return {
      order,
      products
    };
  },
  computed: {
    sorted() {
      return [...this.products].sort((a, b) =>
        this.order === 'asc' ? a.price - b.price : b.price - a.price
      );
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      정렬
      <select v-model="order">
        <option value="asc">낮은 가격순</option>
        <option value="desc">높은 가격순</option>
      </select>
    </label>
    <ul>
      <li v-for="product in sorted" :key="product.id">
        {{ product.name }} · {{ product.price.toLocaleString() }}원
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2228-7937b2a8-510b73b4":{file:"src/components/practice/data-timer.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'DataTimer',
  data() {
    const seconds = 0;
    const running = false;
    let timer;
    return {
      seconds,
      running,
      timer
    };
  },
  methods: {
    start() {
      if (this.running) return;
      this.running = true;
      this.timer = setInterval(() => {
        this.seconds++;
      }, 1000);
    },
    pause() {
      clearInterval(this.timer);
      this.timer = undefined;
      this.running = false;
    },
    reset() {
      this.pause();
      this.seconds = 0;
    }
  },
  unmounted() {
    this.pause();
  }
};
<\/script>
<template>
  <section class="workshop">
    <output aria-live="off">{{ seconds }}초</output>
    <div class="row">
      <button :disabled="running" @click="start">시작</button>
      <button :disabled="!running" @click="pause">일시정지</button>
      <button @click="reset">초기화</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2021-2181488-15178e20":{file:"src/components/practice/for-cards.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'ForCards',
  data() {
    const products = [
      {
        id: 1,
        name: '키보드',
        price: 30000
      },
      {
        id: 2,
        name: '마우스',
        price: 18000
      }
    ];
    let nextId = 3;
    return {
      products,
      nextId
    };
  },
  methods: {
    add() {
      this.products.push({
        id: this.nextId++,
        name: '새 상품',
        price: 12000
      });
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <article v-for="product in products" :key="product.id" class="box">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price.toLocaleString() }}원</p>
    </article>
    <button @click="add">상품 추가</button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2026-1e849734-7239f24a":{file:"src/components/practice/for-groups.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'ForGroups',
  data() {
    const days = [
      {
        id: 1,
        label: '월요일',
        tasks: ['코드 리뷰', '팀 회의']
      },
      {
        id: 2,
        label: '화요일',
        tasks: []
      }
    ];
    return {
      days
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <article v-for="day in days" :key="day.id" class="box">
      <h3>{{ day.label }} · {{ day.tasks.length }}개</h3>
      <ul v-if="day.tasks.length">
        <li v-for="(task, index) in day.tasks" :key="day.id + '-' + index">{{ task }}</li>
      </ul>
      <p v-else class="muted">일정이 없습니다.</p>
    </article>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1969-ecd7dcc0-87f50848":{file:"src/components/practice/for-keys.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'ForKeys',
  data() {
    const people = [
      {
        id: 1,
        name: '민지'
      },
      {
        id: 2,
        name: '준호'
      }
    ];
    return {
      people
    };
  },
  methods: {
    reverse() {
      this.people = [...this.people].reverse();
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <button @click="reverse">순서 뒤집기</button>
    <ul>
      <li v-for="person in people" :key="person.id">
        #{{ person.id }}
        <input v-model="person.name" :aria-label="person.id + '번 이름'" />
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2049-5a76e5a2-84253c08":{file:"src/components/practice/for-nested.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'ForNested',
  data() {
    const groups = [
      {
        id: 'dev',
        name: '개발',
        children: [
          {
            id: 'vue',
            name: 'Vue'
          },
          {
            id: 'scss',
            name: 'SCSS'
          }
        ]
      },
      {
        id: 'design',
        name: '디자인',
        children: [
          {
            id: 'figma',
            name: 'Figma'
          }
        ]
      }
    ];
    return {
      groups
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <section v-for="group in groups" :key="group.id" class="box">
      <h3>{{ group.name }}</h3>
      <ul>
        <li v-for="child in group.children" :key="child.id">{{ child.name }}</li>
      </ul>
    </section>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2006-e3263a67-3468b24d":{file:"src/components/practice/for-options.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'ForOptions',
  data() {
    const region = '';
    const regions = [
      {
        id: 'seoul',
        name: '서울'
      },
      {
        id: 'busan',
        name: '부산'
      },
      {
        id: 'jeju',
        name: '제주'
      }
    ];
    return {
      region,
      regions
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      지역
      <select v-model="region">
        <option disabled value="">지역 선택</option>
        <option v-for="item in regions" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </label>
    <p>선택한 지역 ID: {{ region || '없음' }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1978-abf556c3-60d6e893":{file:"src/components/practice/for-pages.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'ForPages',
  data() {
    const page = 1;
    const totalPages = 5;
    return {
      page,
      totalPages
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <nav class="row" aria-label="페이지 이동">
      <button
        v-for="number in totalPages"
        :key="number"
        :class="{ active: page === number }"
        :aria-current="page === number ? 'page' : undefined"
        @click="page = number"
      >
        {{ number }}
      </button>
    </nav>
    <p>현재 {{ page }}페이지</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2209-1c76dd27-7b1942f5":{file:"src/components/practice/for-table.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'ForTable',
  data() {
    const orders = [
      {
        id: 1,
        name: '노트북',
        done: false
      },
      {
        id: 2,
        name: '마우스',
        done: true
      }
    ];
    return {
      orders
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <table>
      <caption>
        주문 목록
      </caption>
      <thead>
        <tr>
          <th scope="col">주문</th>
          <th scope="col">상태</th>
          <th scope="col">변경</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.name }}</td>
          <td :class="{ active: order.done }">
            {{ order.done ? '배송 완료' : '준비 중' }}
          </td>
          <td><button @click="order.done = !order.done">상태 전환</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2302-1d1ae1bc-e3cb4704":{file:"src/components/practice/for-todo.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'ForTodo',
  data() {
    const input = '';
    const tasks = [
      {
        id: 1,
        name: 'Vue 복습'
      }
    ];
    let nextId = 2;
    return {
      input,
      tasks,
      nextId
    };
  },
  methods: {
    add() {
      const name = this.input.trim();
      if (!name) return;
      this.tasks.push({
        id: this.nextId++,
        name
      });
      this.input = '';
    },
    remove(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <form class="row" @submit.prevent="add">
      <label>
        할 일
        <input v-model="input" placeholder="새 할 일" />
      </label>
      <button type="submit">추가</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
        <button @click="remove(task.id)">삭제</button>
      </li>
    </ul>
    <p v-if="!tasks.length">할 일이 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1927-43bf69d5-f8477a3":{file:"src/components/practice/form-count.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'FormCount',
  data() {
    const bio = '';
    const limit = 100;
    return {
      bio,
      limit
    };
  },
  computed: {
    remaining() {
      return this.limit - this.bio.length;
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      소개글
      <textarea v-model="bio" :maxlength="limit" rows="4"></textarea>
    </label>
    <p :class="{ error: remaining === 0 }">
      {{ bio.length }} / {{ limit }}자 · {{ remaining }}자 남음
    </p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2262-2f52068b-8997a1f3":{file:"src/components/practice/form-dependent.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'FormDependent',
  data() {
    const city = 'seoul';
    const district = '';
    const data = {
      seoul: ['강남구', '마포구'],
      busan: ['해운대구', '수영구']
    };
    return {
      city,
      district,
      data
    };
  },
  computed: {
    districts() {
      return this.data[this.city];
    }
  },
  watch: {
    city: {
      handler() {
        this.district = '';
      }
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      지역
      <select v-model="city">
        <option value="seoul">서울</option>
        <option value="busan">부산</option>
      </select>
    </label>
    <label>
      구·군
      <select v-model="district">
        <option disabled value="">구·군 선택</option>
        <option v-for="name in districts" :key="name" :value="name">{{ name }}</option>
      </select>
    </label>
    <p>{{ district || '구·군을 선택하세요.' }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2143-92ef4b9f-3650118f":{file:"src/components/practice/form-dynamic.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'FormDynamic',
  data() {
    const rows = [
      {
        id: 1,
        name: ''
      }
    ];
    let nextId = 2;
    return {
      rows,
      nextId
    };
  },
  methods: {
    add() {
      this.rows.push({
        id: this.nextId++,
        name: ''
      });
    },
    remove(id) {
      if (this.rows.length > 1) this.rows = this.rows.filter((row) => row.id !== id);
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <div v-for="row in rows" :key="row.id" class="row">
      <label>
        팀원 #{{ row.id }}
        <input v-model="row.name" />
      </label>
      <button :disabled="rows.length === 1" @click="remove(row.id)">행 삭제</button>
    </div>
    <button @click="add">팀원 추가</button>
    <p>총 {{ rows.length }}명</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2012-72299990-ccc77a2a":{file:"src/components/practice/form-password.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'FormPassword',
  data() {
    const password = '';
    const visible = false;
    return {
      password,
      visible
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <div class="row">
      <label>
        비밀번호
        <input
          v-model="password"
          :type="visible ? 'text' : 'password'"
          autocomplete="current-password"
        />
      </label>
      <button type="button" :aria-pressed="visible" @click="visible = !visible">
        비밀번호 {{ visible ? '숨기기' : '표시' }}
      </button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2197-c01f3554-a802ff92":{file:"src/components/practice/form-selectall.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'FormSelectall',
  data() {
    const options = ['뉴스', '이벤트', '업데이트'];
    const selected = [];
    return {
      options,
      selected
    };
  },
  computed: {
    all: {
      get() {
        return this.selected.length === this.options.length;
      },
      set(value) {
        this.selected = value ? [...this.options] : [];
      }
    },
    partial() {
      return this.selected.length > 0 && !this.all;
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      <input v-model="all" :indeterminate="partial" type="checkbox" />
      전체 선택
    </label>
    <label v-for="option in options" :key="option">
      <input v-model="selected" :value="option" type="checkbox" />
      {{ option }}
    </label>
    <p>{{ selected.length }}개 선택</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2402-139545be-9b8b7a0c":{file:"src/components/practice/form-validation.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'FormValidation',
  data() {
    const email = '';
    const password = '';
    const message = '';
    return {
      email,
      password,
      message
    };
  },
  computed: {
    valid() {
      return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(this.email) && this.password.length >= 8;
    }
  },
  methods: {
    submit() {
      if (this.valid) this.message = '입력 검증을 통과했습니다.';
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <form @submit.prevent="submit">
      <label>
        이메일
        <input v-model.trim="email" type="email" required autocomplete="email" />
      </label>
      <label>
        비밀번호
        <input
          v-model="password"
          type="password"
          minlength="8"
          required
          autocomplete="current-password"
        />
      </label>
      <p class="muted">이메일 형식과 비밀번호 8자 이상이 필요합니다.</p>
      <button :disabled="!valid" type="submit">로그인</button>
    </form>
    <p role="status">{{ message }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2034-ab6cef4b-9df1c667":{file:"src/components/practice/if-empty.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'IfEmpty',
  data() {
    const items = [];
    let nextId = 1;
    return {
      items,
      nextId
    };
  },
  methods: {
    add() {
      this.items.push({
        id: this.nextId++,
        name: '새 항목'
      });
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <p v-if="items.length === 0" class="muted">등록된 항목이 없습니다.</p>
    <ul v-else>
      <li v-for="item in items" :key="item.id">{{ item.name }} #{{ item.id }}</li>
    </ul>
    <div class="row">
      <button @click="add">항목 추가</button>
      <button :disabled="!items.length" @click="items = []">전체 비우기</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2117-9e1d0a93-9c03f7a9":{file:"src/components/practice/if-error.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'IfError',
  data() {
    const fail = true;
    const error = '';
    const loaded = false;
    return {
      fail,
      error,
      loaded
    };
  },
  methods: {
    load() {
      this.error = this.fail ? '데이터를 가져오지 못했습니다.' : '';
      this.loaded = !this.fail;
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      <input v-model="fail" type="checkbox" />
      실패시키기
    </label>
    <button @click="load">조회</button>
    <section v-if="error" class="box">
      <p class="error" role="alert">{{ error }}</p>
      <button @click="load">재시도</button>
    </section>
    <p v-else-if="loaded">정상적으로 불러왔습니다.</p>
    <p v-else>조회 전입니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2071-993531ce-25dfd990":{file:"src/components/practice/if-loading.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'IfLoading',
  data() {
    const loading = false;
    const result = '조회 전입니다.';
    let timer;
    return {
      loading,
      result,
      timer
    };
  },
  methods: {
    load() {
      if (this.loading) return;
      this.loading = true;
      this.timer = setTimeout(() => {
        this.result = '조회가 완료되었습니다.';
        this.loading = false;
      }, 700);
    }
  },
  unmounted() {
    return clearTimeout(this.timer);
  }
};
<\/script>
<template>
  <section class="workshop">
    <button :disabled="loading" @click="load">{{ loading ? '조회 중…' : '조회' }}</button>
    <p v-if="loading" role="status">데이터를 불러오는 중입니다.</p>
    <p v-else>{{ result }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1874-af7aa3a6-75799fe2":{file:"src/components/practice/if-login.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'IfLogin',
  data() {
    const loggedIn = false;
    return {
      loggedIn
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <template v-if="loggedIn">
      <p>환영합니다, Vue 개발자님!</p>
      <button @click="loggedIn = false">로그아웃</button>
    </template>
    <template v-else>
      <p>로그인이 필요합니다.</p>
      <button @click="loggedIn = true">로그인</button>
    </template>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1998-3dd11444-6545f558":{file:"src/components/practice/if-role.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'IfRole',
  data() {
    const role = 'member';
    return {
      role
    };
  },
  computed: {
    isAdmin() {
      return this.role === 'admin';
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <label>
      권한
      <select v-model="role">
        <option value="member">일반 사용자</option>
        <option value="admin">관리자</option>
      </select>
    </label>
    <p class="box">일반 메뉴</p>
    <p v-if="isAdmin" class="box active">관리자 전용 메뉴</p>
    <p v-else class="muted">관리 메뉴를 볼 권한이 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1926-abdf9f80-8eeec8d0":{file:"src/components/practice/if-show.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'IfShow',
  data() {
    const open = false;
    const memo = '';
    return {
      open,
      memo
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <button :aria-expanded="open" @click="open = !open">
      상세 안내 {{ open ? '닫기' : '열기' }}
    </button>
    <section v-show="open" class="box">
      <label>
        메모
        <input v-model="memo" />
      </label>
      <p>{{ memo || '메모를 남길 수 있습니다.' }}</p>
    </section>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2007-29b14c0d-4ba63a91":{file:"src/components/practice/if-step.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'IfStep',
  data() {
    const step = 1;
    return {
      step
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <p>{{ step }} / 3단계</p>
    <section class="box">
      <p v-if="step === 1">약관 확인</p>
      <p v-else-if="step === 2">회원 정보 입력</p>
      <p v-else>가입 내용 확인</p>
    </section>
    <div class="row">
      <button :disabled="step === 1" @click="step = Math.max(1, step - 1)">이전</button>
      <button :disabled="step === 3" @click="step = Math.min(3, step + 1)">다음</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1913-f08a98c2-a0f68dfe":{file:"src/components/practice/if-stock.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'IfStock',
  data() {
    const stock = 3;
    return {
      stock
    };
  },
  methods: {
    buy() {
      if (this.stock > 0) this.stock--;
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <p v-if="stock > 0">남은 재고: {{ stock }}</p>
    <p v-else class="error">품절되었습니다.</p>
    <div class="row">
      <button :disabled="stock === 0" @click="buy">구매하기</button>
      <button @click="stock = 3">재고 초기화</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2220-5fe93ce9-71812d1b":{file:"src/components/practice/ui-accordion.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'UiAccordion',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const uid = useId();
    return {
      uid
    };
  },
  data() {
    const openId = null;
    const items = [
      {
        id: 1,
        question: '배송은 얼마나 걸리나요?',
        answer: '영업일 기준 2~3일입니다.'
      },
      {
        id: 2,
        question: '반품은 어떻게 하나요?',
        answer: '주문 내역에서 반품을 신청하세요.'
      }
    ];
    return {
      openId,
      items
    };
  },
  methods: {
    toggle(id) {
      this.openId = this.openId === id ? null : id;
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <section v-for="item in items" :key="item.id" class="box">
      <button
        :aria-expanded="openId === item.id"
        :aria-controls="uid + item.id"
        @click="toggle(item.id)"
      >
        {{ item.question }}
      </button>
      <p :id="uid + item.id" v-show="openId === item.id">{{ item.answer }}</p>
    </section>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2164-a6575ca3-b32fd4bd":{file:"src/components/practice/ui-chips.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiChips',
  data() {
    const options = ['Vue', 'SCSS', 'Vite'];
    const selected = [];
    return {
      options,
      selected
    };
  },
  methods: {
    toggle(value) {
      this.selected = this.selected.includes(value)
        ? this.selected.filter((item) => item !== value)
        : [...this.selected, value];
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <div class="row">
      <button
        v-for="option in options"
        :key="option"
        :class="{ active: selected.includes(option) }"
        :aria-pressed="selected.includes(option)"
        @click="toggle(option)"
      >
        {{ option }}
      </button>
    </div>
    <p>{{ selected.join(', ') || '선택 없음' }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1955-5ac7b2a6-a2689f5c":{file:"src/components/practice/ui-counter.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiCounter',
  data() {
    const quantity = 1;
    return {
      quantity
    };
  },
  methods: {
    change(delta) {
      this.quantity = Math.min(5, Math.max(1, this.quantity + delta));
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <div class="row">
      <button :disabled="quantity === 1" @click="change(-1)">감소</button>
      <output aria-live="polite">{{ quantity }}</output>
      <button :disabled="quantity === 5" @click="change(1)">증가</button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2327-7cb07e87-c1529afd":{file:"src/components/practice/ui-dropdown.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiDropdown',
  data() {
    const open = false;
    const selected = '선택 없음';
    return {
      open,
      selected
    };
  },
  methods: {
    choose(value) {
      this.selected = value;
      this.open = false;
    },
    outside(event) {
      if (!this.$refs.root?.contains(event.target)) this.open = false;
    }
  },
  mounted() {
    return document.addEventListener('pointerdown', this.outside);
  },
  unmounted() {
    return document.removeEventListener('pointerdown', this.outside);
  }
};
<\/script>
<template>
  <section class="workshop">
    <div ref="root" class="box" @keydown.esc="open = false">
      <button :aria-expanded="open" @click="open = !open">옵션</button>
      <div v-if="open" class="row">
        <button @click="choose('수정')">수정</button>
        <button @click="choose('복제')">복제</button>
      </div>
    </div>
    <p>{{ selected }}</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1871-708c02aa-a071c042":{file:"src/components/practice/ui-like.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiLike',
  data() {
    const liked = false;
    const baseCount = 12;
    return {
      liked,
      baseCount
    };
  },
  computed: {
    count() {
      return this.baseCount + (this.liked ? 1 : 0);
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <button :class="{ active: liked }" :aria-pressed="liked" @click="liked = !liked">
      {{ liked ? '좋아요 취소' : '좋아요' }} {{ count }}
    </button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1840-a121edb8-ca9403aa":{file:"src/components/practice/ui-modal.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiModal'
};
<\/script>
<template>
  <section class="workshop">
    <button @click="$refs.dialog.showModal()">안내 열기</button>
    <dialog ref="dialog" aria-label="안내">
      <h3>안내</h3>
      <p>변경사항을 확인하세요.</p>
      <button autofocus @click="$refs.dialog.close()">닫기</button>
    </dialog>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2005-555005ee-220794c2":{file:"src/components/practice/ui-readmore.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiReadmore',
  data() {
    const expanded = false;
    const summary = 'Vue는 사용자 인터페이스를 만드는 도구입니다.';
    const full =
      summary +
      ' 반응형 상태가 바뀌면 템플릿이 갱신됩니다. 컴포넌트로 기능을 나누고 Composable로 상태 로직을 재사용할 수 있습니다.';
    return {
      expanded,
      summary,
      full
    };
  },
  computed: {
    description() {
      return this.expanded ? this.full : this.summary;
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <p>{{ description }}</p>
    <button :aria-expanded="expanded" @click="expanded = !expanded">
      {{ expanded ? '접기' : '더 보기' }}
    </button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1996-62c2cde2-97ed6676":{file:"src/components/practice/ui-scroll.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiScroll',
  methods: {
    toTop() {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.$refs.panel?.scrollTo({
        top: 0,
        behavior: reduced ? 'auto' : 'smooth'
      });
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <div ref="panel" class="scroll box" tabindex="0" aria-label="연습 목록">
      <p v-for="number in 30" :key="number">{{ number }}번째 항목</p>
    </div>
    <button @click="toTop">목록 맨 위로</button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2321-3de7f56a-186905b0":{file:"src/components/practice/ui-tabs.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiTabs',
  data() {
    const selected = 'intro';
    const tabs = [
      {
        id: 'intro',
        label: '소개',
        content: '서비스를 소개합니다.'
      },
      {
        id: 'price',
        label: '가격',
        content: '기본 요금은 월 10,000원입니다.'
      },
      {
        id: 'review',
        label: '후기',
        content: '사용자 후기를 확인하세요.'
      }
    ];
    return {
      selected,
      tabs
    };
  },
  computed: {
    current() {
      return this.tabs.find((tab) => tab.id === this.selected);
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <nav class="row" aria-label="콘텐츠 선택">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: selected === tab.id }"
        :aria-pressed="selected === tab.id"
        @click="selected = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>
    <section class="box">
      <h3>{{ current.label }}</h3>
      <p>{{ current.content }}</p>
    </section>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1936-f118d18-5732588c":{file:"src/components/practice/ui-toast.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiToast',
  data() {
    const visible = false;
    let timer;
    return {
      visible,
      timer
    };
  },
  methods: {
    notify() {
      clearTimeout(this.timer);
      this.visible = true;
      this.timer = setTimeout(() => {
        this.visible = false;
      }, 2000);
    }
  },
  unmounted() {
    return clearTimeout(this.timer);
  }
};
<\/script>
<template>
  <section class="workshop">
    <button @click="notify">저장</button>
    <p v-if="visible" class="box active" role="status">저장되었습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"1772-ea5e0326-4b04cbae":{file:"src/components/practice/ui-toggle.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'UiToggle',
  data() {
    const enabled = false;
    return {
      enabled
    };
  }
};
<\/script>
<template>
  <section class="workshop">
    <button
      :class="{ active: enabled }"
      :aria-pressed="enabled"
      @click="enabled = !enabled"
    >
      알림 {{ enabled ? '켜짐' : '꺼짐' }}
    </button>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"2082-8e051992-7c2c4d36":{file:"src/components/practice/ui-tooltip.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'UiTooltip',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const tooltipId = useId();
    return {
      tooltipId
    };
  },
  data() {
    const hovered = false;
    const focused = false;
    return {
      hovered,
      focused
    };
  },
  computed: {
    visible() {
      return this.hovered || this.focused;
    }
  }
};
<\/script>
<template>
  <section class="workshop">
    <button
      :aria-describedby="visible ? tooltipId : undefined"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @focus="focused = true"
      @blur="focused = false"
    >
      배송 도움말
    </button>
    <p v-if="visible" :id="tooltipId" class="box" role="tooltip">
      영업일 기준으로 계산합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
.workshop {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 12px;
}
.workshop .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.workshop .box {
  padding: 14px;
  border: 1px solid var(--border, #d5d9e2);
  border-radius: 8px;
}
.workshop .active {
  color: var(--primary, #6254e7);
  background: var(--soft, #efedff);
  border-color: currentColor;
}
.workshop .muted {
  color: var(--muted, #6b7280);
}
.workshop .error {
  color: #c24141;
}
.workshop label {
  display: grid;
  gap: 6px;
}
.workshop input,
.workshop select,
.workshop textarea {
  max-width: 100%;
  min-width: 0;
}
.workshop ul,
.workshop ol {
  padding-left: 22px;
}
.workshop li {
  margin: 7px 0;
}
.workshop button {
  cursor: pointer;
}
.workshop button:disabled {
  cursor: default;
  opacity: 0.5;
}
.workshop .bar {
  height: 10px;
  background: var(--soft, #efedff);
  border-radius: 5px;
}
.workshop dialog {
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: var(--surface, #fff);
  color: var(--text, #111827);
  max-width: min(90vw, 420px);
}
.workshop dialog::backdrop {
  background: #0008;
}
.workshop .scroll {
  max-height: 180px;
  overflow: auto;
}
.workshop table {
  width: 100%;
  border-collapse: collapse;
}
.workshop td,
.workshop th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--border, #d5d9e2);
}
</style>
`},"7524-beb3cf89-661031e1":{file:"src/components/sm/SmMessage.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { Copy, MailPlus, ThumbsUp, ThumbsDown, BookOpen, Paperclip } from 'lucide-vue-next';
export default {
  name: 'SmMessage',
  components: {
    Copy,
    MailPlus,
    ThumbsUp,
    ThumbsDown,
    BookOpen,
    Paperclip
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  emits: {
    notice: null,
    feedback: null
  },
  methods: {
    async copyAnswer() {
      try {
        await navigator.clipboard.writeText(this.$refs.answer?.innerText || '');
        this.$emit('notice', '답변을 복사했습니다.');
      } catch {
        this.$emit(
          'notice',
          '복사하지 못했습니다. 브라우저의 클립보드 권한을 확인해 주세요.'
        );
      }
    },
    exportMail() {
      // 메일 서버로 전송하지 않고 초안 파일만 내려받습니다.
      const body = (this.$refs.answer?.innerText || '').replace(/\\r?\\n/g, '\\r\\n');
      const blob = new Blob(
        [
          'Subject: Samsung Gauss demo\\r\\nMIME-Version: 1.0\\r\\nContent-Type: text/plain; charset=UTF-8\\r\\nContent-Transfer-Encoding: 8bit\\r\\n\\r\\n',
          body
        ],
        {
          type: 'message/rfc822'
        }
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'gauss-demo-draft.eml';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      this.$emit('notice', '메일 초안을 내려받았습니다. Knox 메일 연동은 데모입니다.');
    }
  }
};
<\/script>
<template>
  <article
    class="sm-message"
    :class="{ 'sm-message--user': message.role === 'user' }"
    :aria-label="message.role === 'user' ? '내 질문' : 'Gauss 샘플 답변'"
  >
    <span v-if="message.role === 'assistant'" class="sm-avatar">G</span>
    <div class="sm-message__bubble">
      <template v-if="message.role === 'user'">
        <span v-if="message.attachment" class="sm-message__attachment">
          <Paperclip :size="13" />
          {{ message.attachment }}
        </span>
        <p class="sm-message__question">{{ message.text }}</p>
      </template>
      <template v-else>
        <header class="sm-message__heading">
          <strong>Samsung Gauss</strong>
          <span>샘플 답변</span>
          <small>{{ message.dept }} · {{ message.model }}</small>
        </header>
        <div ref="answer" class="sm-message__content">
          <!-- html은 원본 와이어프레임에서 가져온 정적 샘플만 사용합니다. 사용자 입력은 텍스트로 렌더링합니다. -->
          <div v-if="message.html" v-html="message.html" />
          <template v-else>
            <p><strong>업무 요청을 확인했습니다.</strong></p>
            <p>“{{ message.prompt }}”</p>
            <p>
              이 화면은 Vue UI 데모이므로 실제 AI 분석이나 사내 문서 검색은 수행하지
              않습니다. 왼쪽 샘플 대화에서 보고서 요약, 코드 리뷰, 출장 규정, 영문 메일
              답변을 확인할 수 있습니다.
            </p>
            <p v-if="message.attachment">
              첨부 시연: {{ message.attachment }} (파일 내용은 읽거나 업로드하지 않습니다.)
            </p>
          </template>
        </div>
        <section
          v-if="message.sources?.length"
          class="sm-message__sources"
          aria-label="샘플 참조 출처"
        >
          <p>참조 사내 지식 출처 · 와이어프레임 예시</p>
          <button
            v-for="source in message.sources"
            :key="source.title"
            @click="
              $emit('notice', '원본 문서는 연결되지 않은 샘플 출처입니다. ' + source.title)
            "
          >
            <BookOpen :size="13" />
            <strong>[{{ source.tag }}]</strong>
            {{ source.title }}
          </button>
        </section>
        <footer class="sm-message__actions">
          <div>
            <button @click="copyAnswer">
              <Copy :size="14" />
              답변 복사
            </button>
            <button @click="exportMail">
              <MailPlus :size="14" />
              메일 초안
            </button>
          </div>
          <div>
            <button
              :aria-pressed="message.feedback === 'up'"
              aria-label="도움이 됨"
              @click="$emit('feedback', { id: message.id, value: 'up' })"
            >
              <ThumbsUp :size="14" />
            </button>
            <button
              :aria-pressed="message.feedback === 'down'"
              aria-label="개선 필요"
              @click="$emit('feedback', { id: message.id, value: 'down' })"
            >
              <ThumbsDown :size="14" />
            </button>
          </div>
        </footer>
      </template>
    </div>
  </article>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/sm/mixins' as sm;
.sm-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  min-width: 0;
  > .sm-avatar {
    flex-shrink: 0;
    margin-top: 3px;
  }
  &__bubble {
    @include sm.panel;
    padding: 18px;
    min-width: 0;
    flex: 1;
    border-top-left-radius: 4px;
  }
  &--user {
    justify-content: flex-end;
    .sm-message__bubble {
      flex: initial;
      max-width: 85%;
      background: var(--sm-blue);
      color: #fff;
      border: 0;
      border-radius: 16px 4px 16px 16px;
      padding: 14px 18px;
    }
  }
  &__heading {
    @include sm.row;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--sm-border);
    padding-bottom: 11px;
    margin-bottom: 12px;
    font-size: 12px;
    span {
      font-size: 10px;
      color: var(--sm-accent);
      background: var(--sm-soft);
      border-radius: 4px;
      padding: 3px 6px;
    }
    small {
      margin-left: auto;
      font-size: 10px;
      color: var(--sm-muted);
    }
  }
  &__question {
    white-space: pre-wrap;
    margin: 0;
    overflow-wrap: anywhere;
    font-size: 13px;
    line-height: 1.8;
  }
  &__attachment {
    @include sm.row;
    font-size: 11px;
    margin-bottom: 8px;
    overflow-wrap: anywhere;
  }
  &__content {
    font-size: 13px;
    line-height: 1.9;
    overflow-wrap: anywhere;
    :deep(p) {
      margin: 0 0 12px;
    }
    :deep(ul) {
      list-style: disc;
      padding-left: 20px;
      margin: 8px 0 16px;
    }
    :deep(li) {
      margin-bottom: 6px;
    }
    :deep(pre) {
      overflow-x: auto;
      padding: 16px;
      margin: 12px 0;
      border-radius: 10px;
      background: #111a2d;
      color: #dbeafe;
      font-size: 11px;
      line-height: 1.8;
    }
    :deep(code) {
      color: var(--sm-accent);
    }
    :deep(table) {
      min-width: 530px;
      font-size: 11px;
      margin: 12px 0;
    }
    :deep(div:has(> table)) {
      overflow-x: auto;
    }
    :deep(th),
    :deep(td) {
      padding: 10px;
      border: 1px solid var(--sm-border);
      color: inherit;
    }
    :deep(th) {
      background: var(--sm-soft);
    }
    :deep(hr) {
      border: 0;
      border-top: 1px solid var(--sm-border);
      margin: 14px 0;
    }
  }
  &__sources {
    border-top: 1px solid var(--sm-border);
    margin-top: 16px;
    padding-top: 10px;
    p {
      color: var(--sm-muted);
      font-size: 10px;
      margin: 0 0 8px;
    }
    button {
      @include sm.flat-button;
      @include sm.row(6px);
      flex-wrap: wrap;
      font-size: 10px;
      padding: 7px;
      text-align: left;
      margin-bottom: 4px;
      border: 1px solid var(--sm-border);
      strong {
        color: var(--sm-accent);
      }
    }
  }
  &__actions {
    @include sm.row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 12px;
    border-top: 1px solid var(--sm-border);
    padding-top: 10px;
    > div {
      @include sm.row(3px);
    }
    button {
      @include sm.flat-button;
      @include sm.row(5px);
      padding: 7px;
      font-size: 11px;
      color: var(--sm-muted);
      &[aria-pressed='true'] {
        background: var(--sm-soft);
        color: var(--sm-accent);
      }
    }
  }
  @media (max-width: 600px) {
    gap: 7px;
    > .sm-avatar {
      display: none;
    }
    &__bubble {
      padding: 12px;
    }
    &--user .sm-message__bubble {
      max-width: 95%;
    }
  }
}
</style>
`},"6721-b606e80b-2e07529f":{file:"src/components/sm/SmSidebar.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import {
  FileText,
  ShieldCheck,
  Mail,
  Building2,
  Cpu,
  Plus,
  MessageSquare,
  Moon,
  Sun,
  Lock,
  X
} from 'lucide-vue-next';
import { agents, scenarioCards } from '@/data/smDemo';
export default {
  name: 'SmSidebar',
  components: {
    Plus,
    MessageSquare,
    Moon,
    Sun,
    Lock,
    X
  },
  props: {
    open: Boolean,
    dark: Boolean,
    dept: {
      type: String,
      required: true
    },
    activeAgent: String,
    history: {
      type: Array,
      required: true
    }
  },
  emits: {
    close: null,
    reset: null,
    agent: null,
    scenario: null,
    conversation: null,
    theme: null
  },
  data() {
    const icons = {
      FileText,
      ShieldCheck,
      Mail,
      Building2,
      Cpu
    };
    return {
      icons,
      agents,
      scenarioCards
    };
  }
};
<\/script>
<template>
  <aside
    id="sm-sidebar"
    class="sm-sidebar"
    :class="{ 'sm-sidebar--open': open }"
    aria-label="SM 업무 에이전트"
  >
    <header class="sm-sidebar__brand">
      <span class="sm-avatar">S</span>
      <div>
        <strong>
          SAMSUNG
          <small>Gauss</small>
        </strong>
        <p>Enterprise AI Assistant v2.4</p>
      </div>
      <button
        class="sm-icon-button sm-sidebar__close"
        aria-label="SM 메뉴 닫기"
        @click="$emit('close')"
      >
        <X :size="18" />
      </button>
    </header>
    <div class="sm-sidebar__new">
      <button class="sm-button sm-button--primary" @click="$emit('reset')">
        <Plus :size="16" />
        새 대화 시작 (New Chat)
      </button>
    </div>
    <div class="sm-sidebar__scroll">
      <section>
        <h2>
          사내 특화 에이전트
          <span>템플릿</span>
        </h2>
        <button
          v-for="agent in agents"
          :key="agent.id"
          class="sm-sidebar__agent"
          :class="{ 'is-active': activeAgent === agent.id }"
          :aria-pressed="activeAgent === agent.id"
          @click="$emit('agent', agent)"
        >
          <span class="sm-sidebar__agent-icon">
            <component :is="icons[agent.icon]" :size="17" />
          </span>
          <span>
            <strong>{{ agent.title }}</strong>
            <small>{{ agent.description }}</small>
          </span>
        </button>
      </section>
      <section>
        <h2>
          최근 대화 내역
          <span>현재 화면</span>
        </h2>
        <button
          v-for="item in history"
          :key="item.id"
          class="sm-sidebar__history"
          @click="$emit('conversation', item.id)"
        >
          <MessageSquare :size="14" />
          <span>{{ item.title }}</span>
        </button>
        <p v-if="!history.length" class="sm-sidebar__empty">
          새 대화를 시작하면 여기에 표시됩니다.
        </p>
      </section>
      <section>
        <h2>
          샘플 대화
          <span>4가지 시나리오</span>
        </h2>
        <button
          v-for="card in scenarioCards"
          :key="card.id"
          class="sm-sidebar__history"
          @click="$emit('scenario', card.id)"
        >
          <MessageSquare :size="14" />
          <span>{{ card.title }}</span>
        </button>
      </section>
    </div>
    <footer class="sm-sidebar__footer">
      <div class="sm-sidebar__security">
        <Lock :size="14" />
        <strong>On-Premise 보안망</strong>
        <span>UI 데모</span>
      </div>
      <div class="sm-sidebar__profile">
        <span class="sm-avatar sm-avatar--muted">김삼</span>
        <div>
          <strong>김삼성 프로 (Knox 인증 UI)</strong>
          <p>{{ dept === 'DS' ? 'DS부문 메모리사업부' : 'DX부문 MX사업부' }}</p>
        </div>
        <button
          class="sm-icon-button"
          :aria-label="dark ? 'SM 라이트 모드' : 'SM 다크 모드'"
          @click="$emit('theme')"
        >
          <Sun v-if="dark" :size="17" />
          <Moon v-else :size="17" />
        </button>
      </div>
    </footer>
  </aside>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/sm/mixins' as sm;
.sm-sidebar {
  width: 274px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--sm-surface);
  border-right: 1px solid var(--sm-border);
  min-height: 0;
  &__brand {
    @include sm.row(10px);
    padding: 21px 16px;
    border-bottom: 1px solid var(--sm-border);
    strong {
      font-size: 15px;
      letter-spacing: -0.4px;
    }
    small {
      font-size: 11px;
      padding: 3px 5px;
      border-radius: 4px;
      background: var(--sm-soft);
      color: var(--sm-accent);
    }
    p {
      margin: 4px 0 0;
      font-size: 10px;
      color: var(--sm-muted);
    }
  }
  &__close {
    display: none !important;
  }
  &__new {
    padding: 14px 12px;
    button {
      width: 100%;
    }
  }
  &__scroll {
    overflow-y: auto;
    flex: 1;
    min-height: 0;
    padding: 0 12px 20px;
    section + section {
      margin-top: 24px;
    }
    h2 {
      @include sm.row;
      justify-content: space-between;
      margin: 6px 7px 10px;
      font-size: 11px;
      color: var(--sm-muted);
      span {
        font-size: 10px;
        font-weight: 400;
      }
    }
  }
  &__agent {
    @include sm.row(10px);
    @include sm.flat-button;
    width: 100%;
    text-align: left;
    padding: 10px 8px;
    margin: 2px 0;
    &.is-active {
      background: var(--sm-soft);
    }
    > span:last-child {
      min-width: 0;
    }
    strong {
      display: block;
      font-size: 12px;
      line-height: 1.6;
    }
    small {
      display: block;
      color: var(--sm-muted);
      font-size: 10px;
    }
  }
  &__agent-icon {
    @include sm.center;
    color: var(--sm-accent);
    background: var(--sm-soft);
    width: 30px;
    height: 30px;
    border-radius: 8px;
    flex-shrink: 0;
  }
  &__history {
    @include sm.row(8px);
    @include sm.flat-button;
    width: 100%;
    text-align: left;
    padding: 9px 8px;
    font-size: 11px;
    color: var(--sm-muted);
    svg {
      flex-shrink: 0;
    }
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &__empty {
    font-size: 11px;
    color: var(--sm-muted);
    padding: 0 8px;
    line-height: 1.7;
  }
  &__footer {
    padding: 12px;
    border-top: 1px solid var(--sm-border);
    background: var(--sm-canvas);
  }
  &__security {
    @include sm.panel(9px);
    @include sm.row(7px);
    padding: 10px;
    font-size: 10px;
    svg {
      color: #15966b;
    }
    span {
      margin-left: auto;
      color: var(--sm-accent);
    }
  }
  &__profile {
    @include sm.row(8px);
    margin-top: 12px;
    strong {
      font-size: 10px;
    }
    p {
      margin: 4px 0 0;
      color: var(--sm-muted);
      font-size: 10px;
    }
    button {
      margin-left: auto;
    }
  }
  @include sm.compact {
    display: none;
    width: min(290px, 87%);
    &--open {
      display: flex;
      position: absolute;
      inset: 0 auto 0 0;
      z-index: 5;
      box-shadow: 12px 0 30px #0002;
    }
    &__close {
      display: flex !important;
      margin-left: auto;
    }
  }
}
</style>
`},"2407-78467dc3-ebb3a85":{file:"src/components/tips/AccessibilityFormDemo.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
import BaseField from '@/components/common/BaseField.vue';
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'AccessibilityFormDemo',
  components: {
    BaseField,
    BaseButton
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const panelId = useId();
    return {
      panelId
    };
  },
  data() {
    const email = '';
    const submitted = false;
    const details = false;
    const result = '';
    return {
      email,
      submitted,
      details,
      result
    };
  },
  computed: {
    error() {
      return this.submitted && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(this.email)
        ? '이메일 형식으로 입력해 주세요. 예: user@example.com'
        : '';
    }
  },
  methods: {
    submit() {
      this.submitted = true;
      this.result = this.error
        ? ''
        : \`\${this.email} 정보가 준비되었습니다. 실제 전송은 하지 않습니다.\`;
    },
    closeDetails() {
      this.details = false;
      this.$refs.trigger?.focus();
    }
  }
};
<\/script>
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
        aria-expanded 값과 실제 표시 상태를 함께 바꿉니다. Tab으로 버튼에 접근하고
        Enter·Space로 전환해 보세요.
      </p>
      <button @click="closeDetails">안내 닫기</button>
    </section>
    <p class="publishing-demo__note">
      오류는 role="alert", 작업 결과는 role="status"로 알립니다. 색상에만 의존하지 않고
      문구를 제공합니다. 키보드 포커스 테두리와 최소 클릭 영역을 함께 확인하세요.
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
`},"5055-36ddfb30-729d96b4":{file:"src/components/tips/AssetsMotionDemo.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseButton from '@/components/common/BaseButton.vue';
import TipIcon from './TipIcon.vue';
import designImage from '@/assets/tips/project-design.svg';
import dashboardImage from '@/assets/tips/project-dashboard.svg';
export default {
  name: 'AssetsMotionDemo',
  components: {
    BaseButton,
    TipIcon
  },
  data() {
    const projects = [
      {
        id: 'design',
        name: '디자인 시스템',
        image: designImage
      },
      {
        id: 'dashboard',
        name: '운영 대시보드',
        image: dashboardImage
      }
    ];
    const visible = true;
    const highlight = false;
    const publicMark = \`\${import.meta.env.BASE_URL}tips/guide-mark.svg\`;
    const mobile = false;
    let query;
    return {
      projects,
      visible,
      highlight,
      publicMark,
      mobile,
      query
    };
  },
  methods: {
    update(event) {
      this.mobile = event.matches;
    },
    restore() {
      this.projects = [
        {
          id: 'design',
          name: '디자인 시스템',
          image: designImage
        },
        {
          id: 'dashboard',
          name: '운영 대시보드',
          image: dashboardImage
        }
      ];
    }
  },
  mounted() {
    this.query = window.matchMedia('(max-width: 760px)');
    this.mobile = this.query.matches;
    this.query.addEventListener('change', this.update);
  },
  unmounted() {
    return this.query?.removeEventListener('change', this.update);
  }
};
<\/script>
<template>
  <section class="publishing-demo">
    <div class="publishing-demo__row">
      <BaseButton
        :class="{ 'asset-recipe__highlight': highlight }"
        variant="secondary"
        @click="highlight = !highlight"
      >
        <TipIcon />
        currentColor 아이콘
      </BaseButton>
      <img :src="publicMark" width="34" height="34" alt="공개 경로 예제 마크" />
      <code>BASE_URL + public 경로</code>
    </div>
    <div class="publishing-demo__row">
      <BaseButton variant="secondary" @click="visible = !visible">안내 전환</BaseButton>
      <BaseButton variant="secondary" @click="projects.reverse()">순서 변경</BaseButton>
      <BaseButton variant="secondary" @click="restore">목록 복원</BaseButton>
    </div>
    <Transition name="asset-fade">
      <p v-if="visible" class="publishing-demo__box">
        Transition은 요소가 들어오고 나갈 때 동작합니다.
      </p>
    </Transition>
    <p class="publishing-demo__note">
      구조가 다른 UI만 JS로 분기: 현재
      {{ mobile ? '모바일 select' : '데스크톱 toolbar' }} 표시 중
    </p>
    <label v-if="mobile">
      모바일 작업
      <select
        aria-label="모바일 카드 작업"
        @change="$event.target.value === 'reverse' ? projects.reverse() : restore()"
      >
        <option value="restore">목록 복원</option>
        <option value="reverse">순서 변경</option>
      </select>
    </label>
    <nav v-else class="publishing-demo__row" aria-label="데스크톱 카드 작업">
      <BaseButton size="sm" variant="secondary" @click="projects.reverse()">
        카드 정렬 뒤집기
      </BaseButton>
      <BaseButton size="sm" variant="secondary" @click="restore">전체 카드 보기</BaseButton>
    </nav>
    <TransitionGroup name="asset-list" tag="ul" class="asset-recipe__grid">
      <li v-for="project in projects" :key="project.id">
        <img
          :src="project.image"
          :alt="project.name + ' 예시 화면'"
          width="480"
          height="280"
          loading="lazy"
          decoding="async"
        />
        <div>
          <strong>{{ project.name }}</strong>
          <button
            type="button"
            :aria-label="project.name + ' 제거'"
            @click="projects = projects.filter((item) => item.id !== project.id)"
          >
            제거
          </button>
        </div>
      </li>
    </TransitionGroup>
    <p v-if="!projects.length" class="publishing-demo__note">
      목록이 비었습니다. 목록 복원을 눌러 보세요.
    </p>
    <p class="publishing-demo__note">
      v-for에서도 src/assets의 import URL을 사용할 수 있습니다. 레이아웃은 CSS grid와 미디어
      쿼리로 반응형을 처리합니다.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@use '@/assets/styles/mixins' as mix;
@include examples.layout;
.asset-recipe {
  &__highlight {
    color: var(--danger);
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      min-width: 0;
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      background: var(--surface);
    }
    img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 12/7;
      object-fit: cover;
    }
    li > div {
      @include mix.flex-between;
      padding: 14px;
      font-size: 12px;
    }
    button {
      font-size: 11px;
      padding: 5px 9px;
    }
    @include mix.responsive(mobile) {
      grid-template-columns: minmax(0, 1fr);
    }
  }
}
.asset-fade-enter-active,
.asset-fade-leave-active {
  transition: opacity 0.2s;
}
.asset-fade-enter-from,
.asset-fade-leave-to {
  opacity: 0;
}
.asset-list-move,
.asset-list-enter-active,
.asset-list-leave-active {
  transition:
    transform 0.25s,
    opacity 0.25s;
}
.asset-list-enter-from,
.asset-list-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
@media (prefers-reduced-motion: reduce) {
  .asset-fade-enter-active,
  .asset-fade-leave-active,
  .asset-list-move,
  .asset-list-enter-active,
  .asset-list-leave-active {
    transition: none;
  }
}
</style>
`},"3106-ec249690-9ef9999a":{file:"src/components/tips/DataPerformanceDemo.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseField from '@/components/common/BaseField.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BasePagination from '@/components/common/BasePagination.vue';
import BaseSkeleton from '@/components/common/BaseSkeleton.vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
import BaseAlert from '@/components/common/BaseAlert.vue';
export default {
  name: 'DataPerformanceDemo',
  components: {
    BaseField,
    BaseButton,
    BasePagination,
    BaseSkeleton,
    BaseEmptyState,
    BaseAlert
  },
  data() {
    const source = Array.from(
      {
        length: 23
      },
      (_, index) => ({
        id: index + 1,
        title: \`\${index % 2 ? '디자인' : '개발'} 문서 \${index + 1}\`
      })
    );
    const query = '';
    const retry = 0;
    const results = source;
    const busy = false;
    const error = '';
    const page = 1;
    const descending = false;
    return {
      source,
      query,
      retry,
      results,
      busy,
      error,
      page,
      descending
    };
  },
  computed: {
    sorted() {
      return [...this.results].sort((a, b) =>
        this.descending ? b.id - a.id : a.id - b.id
      );
    },
    visible() {
      return this.sorted.slice((this.page - 1) * 5, this.page * 5);
    }
  },
  methods: {
    recover() {
      this.query = '';
      this.retry++;
    }
  },
  created() {
    this.$watch(
      () => [this.query, this.retry],
      ([text], _old, onCleanup) => {
        this.page = 1;
        this.busy = true;
        this.error = '';
        // 외부 요청 없는 시연. 실제 fetch에서는 같은 위치에 AbortController를 두고 취소합니다.
        const timer = setTimeout(() => {
          if (text.trim() === '에러') {
            this.error = '조회 오류 시연입니다. 재시도를 눌러 복구해 보세요.';
            this.results = [];
          } else
            this.results = this.source.filter((item) => item.title.includes(text.trim()));
          this.busy = false;
        }, 500);
        // 다음 입력·재시도·컴포넌트 해제 시 이전 작업을 취소합니다.
        onCleanup(() => clearTimeout(timer));
      }
    );
  }
};
<\/script>
<template>
  <section class="publishing-demo">
    <BaseField
      v-model="query"
      label="문서 검색 · 취소 가능한 지연 처리"
      placeholder="디자인, 개발, 없는값, 에러를 입력하세요"
    />
    <div class="publishing-demo__row">
      <BaseButton variant="secondary" @click="descending = !descending">
        {{ descending ? 'ID 오름차순' : 'ID 내림차순' }} 정렬
      </BaseButton>
      <span class="publishing-demo__note">
        정렬용 복사 배열을 사용해 원본 데이터 순서는 유지합니다.
      </span>
    </div>
    <div :aria-busy="busy">
      <BaseSkeleton v-if="busy" :lines="3" />
      <BaseAlert v-else-if="error" title="검색을 완료하지 못했습니다" tone="danger">
        {{ error }}
        <template #action
          ><BaseButton size="sm" @click="recover">재시도</BaseButton></template
        >
      </BaseAlert>
      <BaseEmptyState v-else-if="!results.length" title="검색 결과가 없습니다">
        <template #action>
          <BaseButton variant="secondary" @click="recover">검색 초기화</BaseButton>
        </template>
      </BaseEmptyState>
      <ul v-else class="publishing-demo__list">
        <li v-for="item in visible" :key="item.id">#{{ item.id }} {{ item.title }}</li>
      </ul>
    </div>
    <BasePagination
      v-if="!busy && results.length"
      v-model="page"
      :total="results.length"
      :page-size="5"
    />
    <output class="publishing-demo__note" aria-live="polite">
      {{ busy ? '새 검색을 처리 중입니다.' : \`\${results.length}개 결과 · \${page}페이지\` }}
    </output>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
</style>
`},"3939-8974842c-6d55920":{file:"src/components/tips/LayoutDefenseDemo.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseButton from '@/components/common/BaseButton.vue';
import BaseModal from '@/components/common/BaseModal.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import BaseSkeleton from '@/components/common/BaseSkeleton.vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
import BaseAlert from '@/components/common/BaseAlert.vue';
import BaseIconTooltip from '@/components/common/BaseIconTooltip.vue';
import { createScrollLockManager } from '@/composables/publishingScrollLock';
export default {
  name: 'LayoutDefenseDemo',
  components: {
    BaseButton,
    BaseModal,
    BaseSelect,
    BaseSkeleton,
    BaseEmptyState,
    BaseAlert,
    BaseIconTooltip
  },
  data() {
    const open = false;
    const nested = false;
    const scrollLock = createScrollLockManager(document, window);
    let releaseOpen;
    let releaseNested;
    const state = 'success';
    const options = [
      {
        value: 'loading',
        label: '로딩'
      },
      {
        value: 'success',
        label: '데이터 있음'
      },
      {
        value: 'empty',
        label: '데이터 없음'
      },
      {
        value: 'error',
        label: '오류'
      }
    ];
    const trustedHtml =
      '<p><strong>에디터 본문 스타일</strong>을 별도 래퍼에 복원합니다.</p><ul><li>목록의 들여쓰기와 표식 복원</li><li>긴 URL: https://example.com/very-long-document-path-without-spaces-to-check-wrapping-and-layout</li></ul><p><a href="https://vuejs.org/guide/best-practices/security.html" target="_blank" rel="noopener noreferrer">Vue 보안 가이드</a></p>';
    return {
      open,
      nested,
      scrollLock,
      releaseOpen,
      releaseNested,
      state,
      options,
      trustedHtml
    };
  },
  watch: {
    open: {
      handler(value) {
        if (value) this.releaseOpen = this.scrollLock.acquire();
        else {
          this.releaseOpen?.();
          this.releaseOpen = undefined;
        }
      }
    },
    nested: {
      handler(value) {
        if (value) this.releaseNested = this.scrollLock.acquire();
        else {
          this.releaseNested?.();
          this.releaseNested = undefined;
        }
      }
    }
  },
  unmounted() {
    this.releaseOpen?.();
    this.releaseNested?.();
  }
};
<\/script>
<template>
  <section class="publishing-demo">
    <div class="layout-recipe__clip">
      <span>overflow: hidden 영역 안의 도움말</span>
      <BaseIconTooltip
        label="Teleport 설명 보기"
        text="이 툴팁은 body로 Teleport되어 부모 카드의 overflow에 잘리지 않습니다."
      />
    </div>
    <div><BaseButton @click="open = true">스크롤 잠금 모달 열기</BaseButton></div>
    <BaseModal v-model="open" title="첫 번째 모달">
      <p>배경 스크롤을 잠그고 기존 body 스타일을 보관합니다.</p>
      <BaseButton @click="nested = true">두 번째 모달 열기</BaseButton>
      <BaseButton variant="secondary" @click="open = false">첫 번째 닫기</BaseButton>
    </BaseModal>
    <BaseModal v-model="nested" title="두 번째 모달">
      <p>이 창만 닫아도 첫 모달이 남아 있으면 스크롤 잠금은 유지됩니다.</p>
      <BaseButton @click="nested = false">두 번째 닫기</BaseButton>
    </BaseModal>
    <BaseSelect v-model="state" label="목록 상태 시뮬레이션" :options="options" required />
    <div class="publishing-demo__box" :aria-busy="state === 'loading'">
      <BaseSkeleton v-if="state === 'loading'" avatar :lines="3" />
      <ul v-else-if="state === 'success'" class="publishing-demo__list">
        <li>문서 01 · 검토 완료</li>
        <li>문서 02 · 승인 대기</li>
      </ul>
      <BaseEmptyState
        v-else-if="state === 'empty'"
        title="조회 결과가 없습니다"
        description="필터를 변경하거나 새 문서를 등록해 주세요."
      />
      <BaseAlert v-else tone="danger" title="불러오지 못했습니다">
        일시적인 오류입니다.
        <template #action>
          <BaseButton size="sm" variant="secondary" @click="state = 'success'">
            다시 시도
          </BaseButton>
        </template>
      </BaseAlert>
    </div>
    <article class="layout-recipe__rich" v-html="trustedHtml" />
    <p class="publishing-demo__note">
      본문 스타일 복원은 XSS 방어가 아닙니다. 외부·사용자 HTML은 별도의 신뢰할 수 있는 정화
      과정을 거친 후 렌더링해야 합니다.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
.layout-recipe {
  &__clip {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    font-size: 12px;
  }
  &__rich {
    padding: 18px;
    border: 1px solid var(--border);
    border-radius: 12px;
    word-break: keep-all;
    overflow-wrap: anywhere;
    font-size: 13px;
    line-height: 1.9;
    :deep(strong) {
      font-weight: 750;
    }
    :deep(ul) {
      list-style: disc;
      padding-left: 22px;
      margin: 12px 0;
    }
    :deep(ol) {
      list-style: decimal;
      padding-left: 22px;
    }
    :deep(a) {
      color: var(--primary);
      text-decoration: underline;
    }
    :deep(p) {
      margin: 0 0 10px;
    }
  }
}
</style>
`},"2210-502daf04-3c482d24":{file:"src/components/tips/MarkupDirectivesDemo.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseButton from '@/components/common/BaseButton.vue';
import TipRenderPanel from './TipRenderPanel.vue';
export default {
  name: 'MarkupDirectivesDemo',
  components: {
    BaseButton,
    TipRenderPanel
  },
  data() {
    const active = false;
    const show = true;
    const members = [
      {
        id: 'a',
        name: '김지수',
        selected: false
      },
      {
        id: 'b',
        name: '박민준',
        selected: false
      },
      {
        id: 'c',
        name: '이서연',
        selected: false
      }
    ];
    return {
      active,
      show,
      members
    };
  },
  computed: {
    count() {
      return this.members.filter((item) => item.selected).length;
    }
  }
};
<\/script>
<template>
  <section class="publishing-demo">
    <div class="publishing-demo__row">
      <BaseButton
        variant="secondary"
        class="markup-recipe__toggle"
        :class="['markup-recipe__button', { 'is-active': active }]"
        :aria-pressed="active"
        @click="active = !active"
      >
        객체 클래스 {{ active ? '활성' : '비활성' }}
      </BaseButton>
      <BaseButton variant="secondary" @click="members.reverse()"
        >리스트 순서 뒤집기</BaseButton
      >
    </div>
    <ul class="publishing-demo__list">
      <li v-for="member in members" :key="member.id">
        <label>
          <input v-model="member.selected" type="checkbox" />
          {{ member.name }}
        </label>
      </li>
    </ul>
    <output class="publishing-demo__note">
      선택 {{ count }}명 · key를 id로 유지해 순서 변경 후에도 선택 항목이 같습니다.
    </output>
    <div>
      <BaseButton @click="show = !show"
        >두 패널 {{ show ? '숨기기' : '다시 표시' }}</BaseButton
      >
    </div>
    <div class="publishing-demo__grid">
      <div>
        <p class="publishing-demo__note">v-show: DOM·내부 상태 유지</p>
        <TipRenderPanel v-show="show" title="v-show 패널" />
      </div>
      <div>
        <p class="publishing-demo__note">v-if: 해제 시 인스턴스 제거</p>
        <TipRenderPanel v-if="show" title="v-if 패널" />
      </div>
    </div>
    <p class="publishing-demo__note">
      패널마다 입력·카운터를 바꾼 뒤 숨겼다 다시 표시해 보세요. v-if 쪽은 새로 생성되어
      초기화됩니다. 공통 버튼의 한 루트에 부모 class도 자동 병합됩니다.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
.markup-recipe__button.is-active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
.markup-recipe__toggle {
  border-radius: 999px;
}
</style>
`},"13085-23b59c03-1d157de9":JSON.parse(`{"file":"src/components/tips/PublishingTipsGuide.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport { RouterLink } from 'vue-router';\\nimport categories from '@/data/publishingTips.json';\\nimport CodeExampleCard from '@/components/common/CodeExampleCard.vue';\\nimport SyntaxCode from '@/components/common/SyntaxCode.vue';\\nimport { getExampleFiles } from '@/data/codeSnippets';\\nimport { useClipboard } from '@/composables/useClipboard';\\nimport {\\n  readPublishingProgress,\\n  savePublishingProgress,\\n  publishingMarkdown\\n} from '@/composables/publishingChecklist';\\nimport StyleArchitectureDemo from './StyleArchitectureDemo.vue';\\nimport MarkupDirectivesDemo from './MarkupDirectivesDemo.vue';\\nimport LayoutDefenseDemo from './LayoutDefenseDemo.vue';\\nimport AssetsMotionDemo from './AssetsMotionDemo.vue';\\nimport AccessibilityFormDemo from './AccessibilityFormDemo.vue';\\nimport DataPerformanceDemo from './DataPerformanceDemo.vue';\\nimport WorkflowQADemo from './WorkflowQADemo.vue';\\nimport viteConfig from '@/examples/config/vite-scss.config.js?raw';\\nimport designSvg from '@/assets/tips/project-design.svg?raw';\\nimport dashboardSvg from '@/assets/tips/project-dashboard.svg?raw';\\nimport publicSvg from '../../../public/tips/guide-mark.svg?raw';\\nexport default {\\n  name: 'PublishingTipsGuide',\\n  components: {\\n    RouterLink,\\n    CodeExampleCard,\\n    SyntaxCode\\n  },\\n  props: {\\n    category: {\\n      type: String,\\n      required: true\\n    }\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const { copy } = useClipboard();\\n    return {\\n      copy\\n    };\\n  },\\n  data() {\\n    const demos = {\\n      StyleArchitectureDemo,\\n      MarkupDirectivesDemo,\\n      LayoutDefenseDemo,\\n      AssetsMotionDemo,\\n      AccessibilityFormDemo,\\n      DataPerformanceDemo,\\n      WorkflowQADemo\\n    };\\n    const allTips = categories.flatMap((c) => c.tips);\\n    const validIds = allTips.map((t) => t.id);\\n    const done = readPublishingProgress(validIds);\\n    const storageFailed = false;\\n    const query = '';\\n    const origin = 'all';\\n    return {\\n      demos,\\n      allTips,\\n      validIds,\\n      done,\\n      storageFailed,\\n      query,\\n      origin,\\n      categories,\\n      publishingMarkdown\\n    };\\n  },\\n  computed: {\\n    current() {\\n      return categories.find((c) => c.id === this.$props.category);\\n    },\\n    isChecklist() {\\n      return this.$props.category === 'checklist';\\n    },\\n    filtered() {\\n      return (this.isChecklist ? categories : [this.current])\\n        .filter(Boolean)\\n        .map((c) => ({\\n          ...c,\\n          tips: c.tips.filter(\\n            (t) =>\\n              (this.origin === 'all' || t.origin === this.origin) &&\\n              \`\${t.title} \${t.why} \${t.how} \${t.caution} \${t.checklist}\`\\n                .toLowerCase()\\n                .includes(this.query.trim().toLowerCase())\\n          )\\n        }))\\n        .filter((c) => c.tips.length);\\n    },\\n    visibleIds() {\\n      return this.filtered.flatMap((c) => c.tips.map((t) => t.id));\\n    },\\n    files() {\\n      if (!this.current) return {};\\n      const result = {\\n        ...getExampleFiles('', \`/src/components/tips/\${this.current.demo}.vue\`),\\n        ...getExampleFiles('', '/src/assets/styles/main.scss')\\n      };\\n      if (this.$props.category === 'styles') {\\n        result['src/examples/config/vite-scss.config.js'] = viteConfig;\\n        Object.assign(\\n          result,\\n          getExampleFiles('', '/src/assets/styles/practice/_tokens.scss')\\n        );\\n      }\\n      if (this.$props.category === 'assets')\\n        Object.assign(result, {\\n          'src/assets/tips/project-design.svg': designSvg,\\n          'src/assets/tips/project-dashboard.svg': dashboardSvg,\\n          'public/tips/guide-mark.svg': publicSvg\\n        });\\n      return result;\\n    }\\n  },\\n  methods: {\\n    toggle(id, checked) {\\n      this.done = checked\\n        ? [...new Set([...this.done, id])]\\n        : this.done.filter((x) => x !== id);\\n    },\\n    markVisible(checked) {\\n      this.done = checked\\n        ? [...new Set([...this.done, ...this.visibleIds])]\\n        : this.done.filter((id) => !this.visibleIds.includes(id));\\n    },\\n    resetFilter() {\\n      this.query = '';\\n      this.origin = 'all';\\n    },\\n    download() {\\n      const url = URL.createObjectURL(\\n        new Blob([publishingMarkdown(categories, this.done)], {\\n          type: 'text/markdown;charset=utf-8'\\n        })\\n      );\\n      const link = document.createElement('a');\\n      link.href = url;\\n      link.download = 'vue-publishing-checklist.md';\\n      link.click();\\n      setTimeout(() => URL.revokeObjectURL(url), 1000);\\n    }\\n  },\\n  watch: {\\n    done: {\\n      handler(value) {\\n        this.storageFailed = !savePublishingProgress(value);\\n      },\\n      deep: true\\n    }\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"tips-guide\\">\\n    <header class=\\"tips-guide__hero\\">\\n      <span class=\\"tips-guide__eyebrow\\">VUE 3 · PUBLISHING PLAYBOOK</span>\\n      <h2>{{ isChecklist ? '실무 퍼블리싱 체크리스트' : current?.title }}</h2>\\n      <p>\\n        {{\\n          isChecklist\\n            ? '배포 전에 하나씩 확인하세요. 체크한 항목은 현재 브라우저에 저장됩니다.'\\n            : current?.description\\n        }}\\n      </p>\\n      <div class=\\"tips-guide__stats\\">\\n        <span>7개 분야 · 42개 팁</span>\\n        <span>핵심 16 + 확장 26</span>\\n        <strong>확인 {{ done.length }} / 42</strong>\\n      </div>\\n      <progress :value=\\"done.length\\" max=\\"42\\" aria-label=\\"전체 체크리스트 진행률\\" />\\n    </header>\\n    <nav class=\\"tips-guide__nav\\" aria-label=\\"팁 분야\\">\\n      <RouterLink\\n        v-for=\\"c in categories\\"\\n        :key=\\"c.id\\"\\n        :to=\\"\`/tips/\${c.slug}\`\\"\\n        :aria-current=\\"current?.id === c.id ? 'page' : undefined\\"\\n      >\\n        {{ c.title }}\\n      </RouterLink>\\n      <RouterLink to=\\"/tips/checklist\\" :aria-current=\\"isChecklist ? 'page' : undefined\\">\\n        전체 체크리스트\\n      </RouterLink>\\n    </nav>\\n    <CodeExampleCard\\n      v-if=\\"current\\"\\n      :key=\\"current.id\\"\\n      :title=\\"\`\${current.title} · 화면에서 직접 확인\`\\"\\n      description=\\"입력·클릭으로 동작을 확인하세요. 코드 보기에서 실제 Vue 파일과 공통 SCSS·의존 파일을 복사할 수 있습니다.\\"\\n      :files=\\"files\\"\\n    >\\n      <component :is=\\"demos[current.demo]\\" />\\n    </CodeExampleCard>\\n    <section class=\\"tips-guide__tools\\" aria-label=\\"팁 검색 및 체크리스트 관리\\">\\n      <label>\\n        팁 검색\\n        <input v-model=\\"query\\" type=\\"search\\" placeholder=\\"예: 모달, 이미지, 반응형\\" />\\n      </label>\\n      <label>\\n        범위\\n        <select v-model=\\"origin\\">\\n          <option value=\\"all\\">전체 팁</option>\\n          <option>요청한 핵심</option>\\n          <option>실무 확장</option>\\n        </select>\\n      </label>\\n      <span>{{ visibleIds.length }}개 표시</span>\\n      <template v-if=\\"isChecklist\\">\\n        <button :disabled=\\"!visibleIds.length\\" @click=\\"markVisible(true)\\">\\n          표시 항목 모두 확인\\n        </button>\\n        <button :disabled=\\"!visibleIds.length\\" @click=\\"markVisible(false)\\">\\n          표시 항목 체크 해제\\n        </button>\\n        <button @click=\\"copy(publishingMarkdown(categories, done), '체크리스트')\\">\\n          Markdown 복사\\n        </button>\\n        <button @click=\\"download\\">파일 내려받기</button>\\n      </template>\\n    </section>\\n    <p v-if=\\"storageFailed\\" role=\\"status\\">\\n      브라우저 저장소를 사용할 수 없습니다. 현재 화면에서 체크한 뒤 파일로 내려받아 주세요.\\n    </p>\\n    <p class=\\"tips-guide__intro\\">\\n      {{\\n        isChecklist\\n          ? '항목별 설명과 동작 예제는 해당 분야 메뉴에서 확인할 수 있습니다. 검색한 항목만 한 번에 체크할 수도 있습니다.'\\n          : '아래 코드는 핵심 패턴을 설명하는 발췌입니다. 바로 실행할 전체 파일은 위 동작 예제의 코드 보기에서 확인하세요.'\\n      }}\\n    </p>\\n    <section v-for=\\"group in filtered\\" :key=\\"group.id\\" class=\\"tips-guide__group\\">\\n      <header v-if=\\"isChecklist\\" class=\\"tips-guide__group-heading\\">\\n        <h3>{{ group.title }}</h3>\\n        <RouterLink :to=\\"\`/tips/\${group.slug}\`\\">설명·동작 예제 보기 →</RouterLink>\\n      </header>\\n      <article\\n        v-for=\\"(tip, index) in group.tips\\"\\n        :key=\\"tip.id\\"\\n        class=\\"tip-item\\"\\n        :class=\\"{ 'tip-item--checked': done.includes(tip.id) }\\"\\n      >\\n        <div class=\\"tip-item__heading\\">\\n          <h3>{{ String(index + 1).padStart(2, '0') }}. {{ tip.title }}</h3>\\n          <span>{{ tip.origin }}</span>\\n        </div>\\n        <template v-if=\\"!isChecklist\\">\\n          <dl>\\n            <dt>왜 필요한가요?</dt>\\n            <dd>{{ tip.why }}</dd>\\n            <dt>실무에서는 이렇게</dt>\\n            <dd>{{ tip.how }}</dd>\\n            <dt>주의할 점</dt>\\n            <dd>{{ tip.caution }}</dd>\\n          </dl>\\n          <div v-if=\\"tip.code\\" class=\\"tip-item__source\\">\\n            <header>\\n              <span>핵심 패턴 · {{ tip.language }}</span>\\n              <button\\n                :aria-label=\\"\`\${tip.title} 핵심 패턴 복사\`\\"\\n                @click=\\"copy(tip.code, tip.language)\\"\\n              >\\n                소스 복사\\n              </button>\\n            </header>\\n            <SyntaxCode\\n              :code=\\"tip.code\\"\\n              :language=\\"tip.language\\"\\n              :label=\\"\`\${tip.title} 핵심 패턴\`\\"\\n            />\\n          </div>\\n        </template>\\n        <label class=\\"tip-item__check\\">\\n          <input\\n            type=\\"checkbox\\"\\n            :checked=\\"done.includes(tip.id)\\"\\n            @change=\\"toggle(tip.id, $event.target.checked)\\"\\n          />\\n          <span>{{ tip.checklist }}</span>\\n        </label>\\n      </article>\\n      <p v-if=\\"!isChecklist\\" class=\\"tips-guide__reference\\">\\n        <a :href=\\"group.source\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\n          >관련 공식 문서 ↗</a\\n        >\\n      </p>\\n    </section>\\n    <div v-if=\\"!filtered.length\\" class=\\"tips-guide__empty\\">\\n      <p>검색 조건에 맞는 팁이 없습니다.</p>\\n      <button @click=\\"resetFilter\\">검색 조건 초기화</button>\\n    </div>\\n  </section>\\n</template>\\n<style scoped lang=\\"scss\\">\\n@use '@/assets/styles/mixins' as mix;\\n.tips-guide {\\n  display: grid;\\n  gap: 22px;\\n  min-width: 0;\\n  grid-template-columns: minmax(0, 1fr);\\n  &__hero {\\n    @include mix.card-surface;\\n    padding: 28px;\\n    background: linear-gradient(125deg, var(--surface), var(--soft));\\n    h2 {\\n      margin: 12px 0;\\n      font-size: 26px;\\n    }\\n    p {\\n      color: var(--muted);\\n      line-height: 1.8;\\n    }\\n    progress {\\n      width: 100%;\\n      height: 8px;\\n      accent-color: var(--primary);\\n      margin-top: 16px;\\n    }\\n  }\\n  &__eyebrow {\\n    font-size: 11px;\\n    letter-spacing: 0.12em;\\n    color: var(--primary);\\n    font-weight: 700;\\n  }\\n  &__stats {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 12px;\\n    font-size: 12px;\\n    strong {\\n      color: var(--primary);\\n    }\\n  }\\n  &__nav {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 8px;\\n    a {\\n      border: 1px solid var(--border);\\n      border-radius: 8px;\\n      padding: 10px 12px;\\n      color: var(--muted);\\n      font-size: 12px;\\n      &[aria-current='page'] {\\n        background: var(--primary);\\n        color: white;\\n        border-color: var(--primary);\\n      }\\n    }\\n  }\\n  &__tools {\\n    display: flex;\\n    align-items: end;\\n    gap: 12px;\\n    flex-wrap: wrap;\\n    label {\\n      display: grid;\\n      gap: 6px;\\n      font-size: 12px;\\n      font-weight: 600;\\n    }\\n    input,\\n    select {\\n      background: var(--surface);\\n      color: var(--text);\\n      border: 1px solid var(--border);\\n      border-radius: 8px;\\n      padding: 11px;\\n      max-width: 100%;\\n      min-width: 0;\\n    }\\n    span {\\n      padding: 10px 0;\\n      font-size: 12px;\\n      color: var(--muted);\\n    }\\n  }\\n  button {\\n    border: 1px solid var(--border);\\n    background: var(--surface);\\n    color: var(--text);\\n    padding: 10px 12px;\\n    border-radius: 8px;\\n    cursor: pointer;\\n    font: inherit;\\n    font-size: 12px;\\n    &:disabled {\\n      opacity: 0.45;\\n      cursor: default;\\n    }\\n  }\\n  a,\\n  button,\\n  input,\\n  select {\\n    @include mix.focus-ring;\\n  }\\n  &__intro,\\n  &__reference {\\n    font-size: 12px;\\n    color: var(--muted);\\n    line-height: 1.9;\\n    margin: 0;\\n  }\\n  &__group {\\n    display: grid;\\n    gap: 16px;\\n    min-width: 0;\\n    grid-template-columns: minmax(0, 1fr);\\n  }\\n  &__group-heading {\\n    display: flex;\\n    gap: 12px;\\n    flex-wrap: wrap;\\n    align-items: center;\\n    justify-content: space-between;\\n    h3 {\\n      margin: 0;\\n      font-size: 17px;\\n    }\\n    a {\\n      font-size: 12px;\\n      color: var(--primary);\\n    }\\n  }\\n  &__empty {\\n    @include mix.card-surface;\\n    padding: 30px;\\n    text-align: center;\\n  }\\n}\\n.tip-item {\\n  @include mix.card-surface;\\n  min-width: 0;\\n  overflow: hidden;\\n  padding: 22px;\\n  display: grid;\\n  gap: 18px;\\n  &--checked {\\n    border-color: var(--primary);\\n  }\\n  &__heading {\\n    display: flex;\\n    align-items: start;\\n    justify-content: space-between;\\n    gap: 12px;\\n    flex-wrap: wrap;\\n    h3 {\\n      font-size: 17px;\\n      line-height: 1.6;\\n      margin: 0;\\n    }\\n    span {\\n      font-size: 11px;\\n      color: var(--primary);\\n      background: var(--soft);\\n      padding: 5px 8px;\\n      border-radius: 6px;\\n      white-space: nowrap;\\n    }\\n  }\\n  dl {\\n    display: grid;\\n    grid-template-columns: 125px minmax(0, 1fr);\\n    gap: 12px 20px;\\n    margin: 0;\\n    font-size: 13px;\\n    line-height: 1.9;\\n  }\\n  dt {\\n    font-weight: 700;\\n  }\\n  dd {\\n    margin: 0;\\n    color: var(--muted);\\n    overflow-wrap: anywhere;\\n    white-space: pre-line;\\n  }\\n  &__source {\\n    min-width: 0;\\n    border-radius: 8px;\\n    overflow: hidden;\\n    header {\\n      display: flex;\\n      justify-content: space-between;\\n      align-items: center;\\n      gap: 10px;\\n      padding: 10px 14px;\\n      background: #252526;\\n      color: #ddd;\\n      font-size: 11px;\\n    }\\n  }\\n  &__check {\\n    display: flex;\\n    align-items: start;\\n    gap: 10px;\\n    font-size: 13px;\\n    line-height: 1.8;\\n    cursor: pointer;\\n    border-top: 1px solid var(--border);\\n    padding-top: 16px;\\n    input {\\n      margin-top: 5px;\\n      accent-color: var(--primary);\\n      flex-shrink: 0;\\n      width: 17px;\\n      height: 17px;\\n    }\\n    span {\\n      overflow-wrap: anywhere;\\n    }\\n  }\\n}\\n@include mix.responsive(mobile) {\\n  .tips-guide__hero {\\n    padding: 20px;\\n    h2 {\\n      font-size: 22px;\\n    }\\n  }\\n  .tips-guide__tools label {\\n    width: 100%;\\n  }\\n  .tip-item {\\n    padding: 16px;\\n    dl {\\n      grid-template-columns: minmax(0, 1fr);\\n      gap: 5px;\\n    }\\n    dd {\\n      margin-bottom: 12px;\\n    }\\n  }\\n}\\n</style>\\n"}`),"2242-eeebf391-92dbb8f1":{file:"src/components/tips/StyleArchitectureDemo.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import TipIcon from './TipIcon.vue';
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'StyleArchitectureDemo',
  components: {
    TipIcon,
    BaseButton
  },
  data() {
    const color = '#6366f1';
    const percent = 65;
    const title = '공통 토큰을 활용한 업무 카드';
    return {
      color,
      percent,
      title
    };
  }
};
<\/script>
<template>
  <section class="publishing-demo">
    <div class="publishing-demo__row">
      <label>
        강조 색상
        <input v-model="color" type="color" />
      </label>
      <label>
        진행률 {{ percent }}%
        <input v-model="percent" type="range" min="0" max="100" />
      </label>
    </div>
    <label>
      카드 제목
      <input v-model="title" aria-label="SCSS 예제 카드 제목" />
    </label>
    <article class="style-recipe" :style="{ '--progress': percent + '%' }">
      <h3>{{ title }}</h3>
      <p>색상은 CSS v-bind, 진행률은 인라인 CSS 변수로 연결합니다.</p>
      <div
        class="style-recipe__track"
        role="progressbar"
        aria-label="업무 진행률"
        :aria-valuenow="Number(percent)"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span />
      </div>
      <BaseButton class="style-recipe__action">
        <TipIcon />
        부모에서 공통 버튼 스타일 조정
      </BaseButton>
    </article>
    <p class="publishing-demo__note">
      카드·정렬은 공통 mixin을 사용하고, 화면별 규칙은 scoped SCSS에 둡니다. 아래 소스에는
      선택 적용용 Vite 자동 주입 설정도 함께 제공합니다.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/mixins' as mix;
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
.style-recipe {
  @include mix.card-surface;
  display: grid;
  gap: 15px;
  padding: 22px;
  border-top: 4px solid v-bind(color);
  h3 {
    margin: 0;
    font-size: 17px;
    overflow-wrap: anywhere;
  }
  p {
    font-size: 12px;
    color: var(--muted);
    margin: 0;
  }
  &__track {
    height: 10px;
    border-radius: 20px;
    background: var(--border);
    overflow: hidden;
    span {
      display: block;
      width: var(--progress);
      height: 100%;
      background: v-bind(color);
      transition: width 0.2s;
    }
  }
  &__action {
    justify-self: start;
  }
  .style-recipe__action:deep(svg) {
    width: 16px;
  }
  @media (prefers-reduced-motion: reduce) {
    &__track span {
      transition: none;
    }
  }
}
</style>
`},"460-314b7414-79bab784":{file:"src/components/tips/TipIcon.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'TipIcon',
  props: {
    size: {
      type: Number,
      default: 18
    }
  }
};
<\/script>
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="m12 2 3.1 6.3L22 9.3l-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.9 6.9-1L12 2Z"
    />
  </svg>
</template>
<style scoped lang="scss">
svg {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
`},"676-75bb4c3-6ce4eb35":{file:"src/components/tips/TipRenderPanel.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'TipRenderPanel',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    const count = 0;
    return {
      count
    };
  }
};
<\/script>
<template>
  <section class="render-panel">
    <h4>{{ title }}</h4>
    <input
      aria-label="패널 내부 입력"
      placeholder="여기에 입력하고 숨겼다 다시 표시하세요"
    />
    <button @click="count++">내부 카운터 {{ count }}</button>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;
.render-panel {
  display: grid;
  gap: 12px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  h4 {
    font-size: 13px;
    margin: 0;
  }
  input {
    min-width: 0;
    width: 100%;
  }
}
</style>
`},"3611-76c3cd84-954e434":{file:"src/components/tips/WorkflowQADemo.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'WorkflowQADemo',
  components: {
    BaseButton
  },
  data() {
    const width = 360;
    const long = false;
    const empty = false;
    const count = 1;
    return {
      width,
      long,
      empty,
      count
    };
  }
};
<\/script>
<template>
  <section class="publishing-demo">
    <div class="publishing-demo__row">
      <label>
        미리보기 컨테이너 {{ width }}px
        <input v-model="width" type="range" min="280" max="800" step="10" />
      </label>
      <label>
        <input v-model="long" type="checkbox" />
        긴 문구
      </label>
      <label>
        <input v-model="empty" type="checkbox" />
        빈 결과
      </label>
      <label>
        개수
        <select v-model="count">
          <option :value="1">1개</option>
          <option :value="3">3개</option>
          <option :value="10">10개</option>
        </select>
      </label>
    </div>
    <div class="qa-recipe__scroll">
      <div class="qa-recipe__viewport" :style="{ width: width + 'px' }">
        <section class="qa-recipe__card">
          <h3>
            {{
              long
                ? '한글과 English가 섞인 긴 제목은 실제 운영 데이터처럼 여러 줄이 되어도 버튼과 본문을 밀어내지 않아야 합니다.'
                : '검수용 업무 카드'
            }}
          </h3>
          <p>컨테이너 너비 기준으로 가로·세로 배치를 전환합니다.</p>
          <div class="qa-recipe__actions">
            <BaseButton size="sm">상세 보기</BaseButton>
            <BaseButton size="sm" variant="secondary">선택</BaseButton>
          </div>
        </section>
        <p v-if="empty" class="qa-recipe__empty">조회 결과가 없습니다.</p>
        <ul v-else>
          <li v-for="n in count" :key="n">
            업무 항목 {{ n }}
            <span>
              {{
                long
                  ? 'https://example.com/no-spaces-very-long-document-path-that-needs-wrapping-for-mobile-qa'
                  : '승인 대기'
              }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <p class="publishing-demo__note">
      이 슬라이더는 컨테이너 너비만 바꿉니다. 실제 브라우저 viewport 분기·확대·키보드·터치
      검수는 개발자 도구와 기기에서도 별도로 확인하세요.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
.qa-recipe {
  &__scroll {
    overflow-x: auto;
    padding: 4px;
  }
  &__viewport {
    container: qa/inline-size;
    max-width: none;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    background: var(--canvas);
    ul {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 8px;
    }
    li {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      font-size: 11px;
      border-bottom: 1px solid var(--border);
      padding: 10px 0;
      span {
        overflow-wrap: anywhere;
        min-width: 0;
      }
    }
  }
  &__card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    padding: 18px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    h3 {
      font-size: 15px;
      overflow-wrap: anywhere;
      grid-column: 1;
      margin: 0;
    }
    p {
      font-size: 11px;
      color: var(--muted);
      grid-column: 1;
      margin: 0;
    }
  }
  &__actions {
    grid-column: 2;
    grid-row: 1/3;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  &__empty {
    font-size: 12px;
    padding: 20px;
    color: var(--muted);
  }
}
@container qa (max-width:420px) {
  .qa-recipe__card {
    grid-template-columns: minmax(0, 1fr);
  }
  .qa-recipe__actions {
    grid-column: 1;
    grid-row: auto;
    flex-wrap: wrap;
  }
}
</style>
`},"4411-b0c99da6-33339af4":{file:"src/layouts/DefaultLayout.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue';
export default {
  name: 'DefaultLayout',
  components: {
    AppSidebar,
    AppHeader,
    AppBreadcrumb
  },
  data() {
    const menu = false;
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const mobile = mobileQuery.matches;
    let storedCollapsed = false;
    try {
      storedCollapsed = localStorage.getItem('atelier-sidebar-collapsed') === 'true';
    } catch {
      /* Use the default when storage is unavailable. */
    }
    const sidebarCollapsed = storedCollapsed;
    return {
      menu,
      mobileQuery,
      mobile,
      storedCollapsed,
      sidebarCollapsed
    };
  },
  computed: {
    sidebarVisible() {
      return this.mobile ? this.menu : !this.sidebarCollapsed;
    }
  },
  methods: {
    toggleSidebar() {
      if (this.mobile) this.menu = !this.menu;
      else this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    closeMobileMenu() {
      if (this.mobile && this.menu) {
        this.menu = false;
        this.$refs.header?.focusMenu();
      }
    },
    updateViewport(event) {
      this.mobile = event.matches;
      this.menu = false;
    },
    onEscape(event) {
      if (event.key === 'Escape') this.closeMobileMenu();
    },
    focusMain() {
      document.getElementById('main-content')?.focus();
    }
  },
  watch: {
    sidebarCollapsed: {
      handler(value) {
        try {
          localStorage.setItem('atelier-sidebar-collapsed', String(value));
        } catch {
          /* Toggling still works without persistence. */
        }
      }
    }
  },
  created() {
    this.$watch(
      () => this.$route.path,
      () => {
        this.menu = false;
      }
    );
  },
  mounted() {
    this.mobileQuery.addEventListener('change', this.updateViewport);
    window.addEventListener('keydown', this.onEscape);
  },
  unmounted() {
    this.mobileQuery.removeEventListener('change', this.updateViewport);
    window.removeEventListener('keydown', this.onEscape);
  }
};
<\/script>
<template>
  <a
    href="#main-content"
    class="default-layout__skip"
    :style="{ left: sidebarVisible && !mobile ? '280px' : '16px' }"
    @click.prevent="focusMain"
  >
    본문으로 건너뛰기
  </a>
  <AppSidebar :open="menu" :visible="sidebarVisible" @close="closeMobileMenu" />
  <button
    v-if="menu && mobile"
    class="default-layout__backdrop"
    aria-label="메뉴 닫기"
    @click="closeMobileMenu"
  />
  <section
    class="default-layout__body"
    :class="{ 'default-layout__body--wide': sidebarCollapsed }"
  >
    <AppHeader
      ref="header"
      :mobile="mobile"
      :sidebar-open="sidebarVisible"
      @menu="toggleSidebar"
    />
    <main id="main-content" class="default-layout__main" tabindex="-1">
      <AppBreadcrumb />
      <RouterView v-slot="{ Component }">
        <component :is="Component" :key="$route.path" />
      </RouterView>
    </main>
    <footer class="default-layout__footer">
      <span>© {{ new Date().getFullYear() }} Vue Atelier</span>
      <a
        href="https://github.com/parkjise/vue-guide"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub ↗
      </a>
      <span>
        Crafted with Vue 3
        <span class="default-layout__heart">♡</span>
        Made for developers.
      </span>
    </footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.default-layout {
  &__body {
    margin-left: 254px;
    transition: margin-left 0.2s ease;
    &--wide {
      margin-left: 0;
    }
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  &__main {
    padding: 24px 34px 34px;
    width: 100%;
    max-width: none;
    min-width: 0;
    margin: 0;
    flex: 1;
    outline: none;
  }
  &__footer {
    flex-wrap: wrap;
    @include flex-between;
    border-top: 1px solid var(--border);
    padding: 18px 34px;
    font-size: 10px;
    color: var(--caption);
  }
  &__heart {
    color: var(--primary);
  }
  &__skip {
    position: fixed;
    top: -100px;
    left: 280px;
    z-index: 300;
    padding: 12px;
    background: var(--surface);
    &:focus {
      top: 10px;
    }
  }
  &__backdrop {
    position: fixed;
    inset: 0;
    z-index: 45;
    background: #0f172a77;
    border: 0;
    border-radius: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    &__body {
      transition: none;
    }
  }
  @include responsive(mobile) {
    &__body {
      margin-left: 0;
    }
    &__main {
      padding: 20px 16px;
    }
    &__footer {
      flex-wrap: wrap;
      padding: 18px 16px;
      font-size: 9px;
      gap: 10px;
    }
  }
}
</style>
`},"7479-2ca91582-90491558":{file:"src/views/ReferencePage.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { ArrowUpRight, Check, Code2, ExternalLink } from 'lucide-vue-next';
import CodeExampleCard from '@/components/common/CodeExampleCard.vue';
import { getExampleFiles } from '@/data/codeSnippets';
export default {
  name: 'ReferencePage',
  components: {
    ArrowUpRight,
    Check,
    Code2,
    ExternalLink,
    CodeExampleCard
  },
  props: {
    example: {
      type: [Object, Function],
      required: true
    }
  },
  data() {
    const descriptions = {
      tools: '개인 Gemini / OpenAI API로 HTML 마크업에 맞는 BEM 클래스를 제안받으세요.',
      scss: '실제 컴파일된 SCSS를 조작하고, 재사용할 믹스인과 모듈 원본을 가져가세요.',
      'vue-syntax': '핵심 문법을 직접 조작하고, 실무에 필요한 코드를 바로 가져가세요.',
      'vue-patterns':
        '반복되는 문제를 해결하는 패턴. 상태 관리부터 정리 로직까지 확인하세요.',
      'ui-kits': '작은 디테일까지 직접 조작하는 Vue 컴포넌트 라이브러리.',
      apps: '당신의 다음 프로젝트를 위한, 실제로 동작하는 미니 앱.',
      'forms-tables': '입력부터 검증, 정렬과 내보내기까지. 실무 데이터 흐름을 경험하세요.',
      dashboard: '숫자 속에서 인사이트를 발견하는 Vue 대시보드.'
    };
    return {
      descriptions
    };
  },
  computed: {
    scss() {
      return this.$route.meta.folder === 'scss';
    },
    overview() {
      return this.$route.path === '/dashboard/default';
    },
    files() {
      return getExampleFiles(this.$route.path, this.$route.meta.sourceFile);
    }
  }
};
<\/script>
<template>
  <section class="reference-page">
    <template v-if="overview">
      <component :is="$props.example" />
      <details class="reference-page__dashboard-code">
        <summary>대시보드 구현 코드 보기</summary>
        <CodeExampleCard
          title="Dashboard implementation"
          description="대시보드와 공통 컴포넌트 전체 원본"
          :files="files"
        >
          <p class="demo__muted">위 대시보드의 실제 구현 코드를 확인하고 복사하세요.</p>
        </CodeExampleCard>
      </details>
    </template>
    <template v-else-if="$route.meta.folder === 'sm'">
      <header class="reference-page__sm-toolbar">
        <div>
          <h1>SM UI</h1>
          <p>새 창에서 가이드 메뉴 없이 SM 화면만 넓게 볼 수 있습니다.</p>
        </div>
        <RouterLink
          :to="{ name: 'sm-standalone' }"
          target="_blank"
          rel="noopener noreferrer"
          class="reference-page__sm-open"
          aria-label="SM UI 새 창으로 보기"
        >
          <ExternalLink :size="16" />
          새 창으로 보기
        </RouterLink>
      </header>
      <component :is="$props.example" />
      <details class="reference-page__dashboard-code">
        <summary>SM Vue · SCSS · Mixin 전체 소스 보기</summary>
        <CodeExampleCard
          title="SM implementation"
          description="Vue 컴포넌트 · 대화 상태 · SCSS · mixin 원본"
          :files="files"
        >
          <p class="demo__muted">
            위 화면에 사용한 전체 소스입니다. Tailwind 없이 SCSS와 mixin으로 구성했습니다.
          </p>
        </CodeExampleCard>
      </details>
    </template>
    <template
      v-else-if="
        $route.meta.fullPage ||
        ['vue-practice', 'html5', 'css3', 'common-components', 'tips'].includes(
          $route.meta.folder
        )
      "
    >
      <component :is="$props.example" />
    </template>
    <template v-else>
      <header class="reference-page__header">
        <section>
          <span class="reference-page__eyebrow">
            THE DEVELOPER’S TOOLBOX / {{ $route.meta.category }}
          </span>
          <h1>
            {{ $route.meta.title }}
            <span>{{ $route.meta.badge || (scss ? 'SCSS' : 'Vue 3') }}</span>
          </h1>
          <p>{{ $route.meta.pageDescription || descriptions[$route.meta.folder] }}</p>
        </section>
        <span class="reference-page__ready">
          <Check :size="13" />
          Ready to copy
        </span>
      </header>
      <aside class="reference-page__tip">
        <span><Code2 :size="18" /></span>
        <section>
          <strong>실행해 보고, 코드를 내 것으로.</strong>
          <p>
            <template v-if="$route.meta.folder === 'tools'">
              입력한 내용으로 AI 결과를 받고 확인·복사하세요. API 키는 서버에서 관리하며,
              프로젝트 파일에는 자동 적용하지 않습니다.
            </template>
            <template v-else-if="$route.meta.sourceFile">
              아래에 실제 SCSS 원본이 바로 표시됩니다. 파일을 선택해 모듈별 전체 소스를
              확인하고 복사하세요.
            </template>
            <template v-else-if="scss">
              스타일 탭에서 실제 SCSS를, 파일 선택에서 @use / @forward로 연결된
              믹스인·함수·토큰 원본을 확인하고 복사하세요.
            </template>
            <template v-else>
              화면은 Vue 3 Composition API로 동작합니다. 코드 보기에서 Composition API와
              Options API 예제를 비교하고, 선택한 방식의 전체 소스와 의존 파일을 복사하세요.
            </template>
          </p>
        </section>
        <ArrowUpRight :size="17" />
      </aside>
      <CodeExampleCard
        :title="$route.meta.title"
        :description="$route.meta.description"
        :files="files"
        :initially-expanded="!!$route.meta.sourceFile"
        :source-only="!!$route.meta.sourceFile"
      >
        <component :is="$props.example" />
      </CodeExampleCard>
      <footer class="reference-page__footer">
        <span>✧ Built with Vue 3 · SCSS · Composition API</span>
        <RouterLink to="/vue-patterns/composables"
          >재사용 가능한 로직 살펴보기 ↗</RouterLink
        >
      </footer>
    </template>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.reference-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  &__header {
    @include flex-between;
    h1 {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 28px;
      letter-spacing: -0.8px;
      font-weight: 650;
      margin: 7px 0 9px;
      span {
        font-size: 10px;
        background: var(--soft);
        color: var(--primary);
        padding: 3px 8px;
        border-radius: 6px;
        letter-spacing: 0;
      }
    }
    p {
      color: var(--caption);
      font-size: 12px;
    }
  }
  &__eyebrow {
    font-size: 8px;
    letter-spacing: 1.2px;
    color: var(--caption);
  }
  &__ready {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--success);
    font-size: 10px;
  }
  &__tip {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 17px 20px;
    border: 1px solid color-mix(in srgb, var(--primary) 15%, var(--border));
    background: var(--soft);
    border-radius: 12px;
    > span {
      color: var(--primary);
      background: var(--surface);
      padding: 10px;
      display: flex;
      border-radius: 9px;
    }
    strong {
      font-size: 11px;
      font-weight: 600;
    }
    p {
      font-size: 10px;
      color: var(--muted);
      margin-top: 3px;
    }
    > svg {
      margin-left: auto;
      color: var(--primary);
    }
  }
  &__footer {
    @include flex-between;
    color: var(--caption);
    font-size: 10px;
    flex-wrap: wrap;
    a {
      color: var(--primary);
    }
  }
  &__sm-toolbar {
    @include flex-between;
    flex-wrap: wrap;
    h1 {
      font-size: 24px;
      margin: 0 0 6px;
    }
    p {
      color: var(--muted);
      font-size: 12px;
      line-height: 1.8;
      margin: 0;
    }
  }
  &__sm-open {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 15px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--primary);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    &:hover {
      background: var(--hover);
    }
  }
  &__dashboard-code {
    color: var(--muted);
    summary {
      cursor: pointer;
      font-size: 11px;
      padding: 10px;
    }
    .code-card {
      margin-top: 10px;
    }
  }
  @include responsive(mobile) {
    &__header {
      align-items: flex-start;
      h1 {
        font-size: 23px;
      }
    }
    &__ready {
      display: none;
    }
    &__tip {
      padding: 14px;
    }
  }
}
</style>
`},"6356-e4851397-fc57f4fb":{file:"src/views/apps/bookmark.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { Plus, Star, Grid2X2, List, ExternalLink } from 'lucide-vue-next';
import BaseModal from '@/components/common/BaseModal.vue';
export default {
  name: 'Bookmark',
  components: {
    Plus,
    Star,
    Grid2X2,
    List,
    ExternalLink,
    BaseModal
  },
  data() {
    const items = [
      {
        id: 1,
        title: 'Vue.js',
        url: 'https://vuejs.org',
        category: 'Development',
        favorite: true,
        description: 'The progressive JavaScript framework',
        icon: 'V',
        color: '#42b883'
      },
      {
        id: 2,
        title: 'Figma',
        url: 'https://figma.com',
        category: 'Design',
        favorite: true,
        description: 'Ideas come to life, together.',
        icon: 'F',
        color: '#a78bfa'
      },
      {
        id: 3,
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        category: 'Development',
        favorite: false,
        description: 'Resources for developers, by developers',
        icon: 'M',
        color: '#475569'
      },
      {
        id: 4,
        title: 'Dribbble',
        url: 'https://dribbble.com',
        category: 'Design',
        favorite: false,
        description: 'Discover the world’s top designers',
        icon: 'D',
        color: '#e995ba'
      }
    ];
    const category = 'All';
    const query = '';
    const layout = 'grid';
    const open = false;
    const title = '';
    const url = '';
    const newCategory = 'Development';
    const error = '';
    return {
      items,
      category,
      query,
      layout,
      open,
      title,
      url,
      newCategory,
      error
    };
  },
  computed: {
    filtered() {
      return this.items.filter(
        (i) =>
          (this.category === 'All' ||
            (this.category === 'Favorites' ? i.favorite : i.category === this.category)) &&
          i.title.toLowerCase().includes(this.query.toLowerCase())
      );
    }
  },
  methods: {
    add() {
      try {
        const parsed = new URL(this.url);
        if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error();
        if (!this.title.trim()) return;
        this.items.push({
          id: Date.now(),
          title: this.title.trim(),
          url: parsed.href,
          category: this.newCategory,
          favorite: false,
          description: parsed.hostname,
          icon: this.title[0].toUpperCase(),
          color: '#6366f1'
        });
        this.open = false;
        this.title = '';
        this.url = '';
        this.error = '';
      } catch {
        this.error = 'http 또는 https URL을 입력하세요.';
      }
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <header class="bookmark__toolbar">
      <nav aria-label="북마크 카테고리">
        <button
          v-for="c in ['All', 'Favorites', 'Development', 'Design']"
          :key="c"
          :aria-pressed="category === c"
          @click="category = c"
        >
          {{ c }}
        </button>
      </nav>
      <div class="demo__row">
        <input v-model="query" aria-label="북마크 검색" placeholder="Search bookmarks..." />
        <button
          aria-label="그리드 보기"
          :aria-pressed="layout === 'grid'"
          @click="layout = 'grid'"
        >
          <Grid2X2 :size="16" />
        </button>
        <button
          aria-label="리스트 보기"
          :aria-pressed="layout === 'list'"
          @click="layout = 'list'"
        >
          <List :size="16" />
        </button>
        <button class="demo__primary" @click="open = true">
          <Plus :size="15" />
          Add bookmark
        </button>
      </div>
    </header>
    <section
      class="bookmark__items"
      :class="{ 'bookmark__items--list': layout === 'list' }"
    >
      <article v-for="item in filtered" :key="item.id" class="bookmark__card">
        <header>
          <span
            class="bookmark__icon"
            :style="{ color: item.color, background: item.color + '18' }"
          >
            {{ item.icon }}
          </span>
          <button
            :aria-label="item.title + ' 즐겨찾기'"
            :aria-pressed="item.favorite"
            @click="item.favorite = !item.favorite"
          >
            <Star
              :size="17"
              :fill="item.favorite ? '#f5bb4b' : 'none'"
              :color="item.favorite ? '#f5bb4b' : '#94a3b8'"
            />
          </button>
        </header>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <footer>
          <span>{{ item.category }}</span>
          <a
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="item.title + ' 새 탭에서 열기'"
          >
            <ExternalLink :size="15" />
          </a>
        </footer>
      </article>
    </section>
    <p v-if="!filtered.length">북마크가 없습니다.</p>
    <BaseModal v-model="open" title="새 북마크">
      <form class="demo" @submit.prevent="add">
        <label class="demo__field">
          이름
          <input v-model="title" required />
        </label>
        <label class="demo__field">
          URL
          <input v-model="url" type="url" required placeholder="https://" />
        </label>
        <label class="demo__field">
          카테고리
          <select v-model="newCategory">
            <option>Development</option>
            <option>Design</option>
          </select>
        </label>
        <p v-if="error" role="alert" class="demo__error">{{ error }}</p>
        <button type="submit" class="demo__primary">북마크 추가</button>
      </form>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.bookmark {
  &__toolbar {
    display: grid;
    gap: 18px;
    nav {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      button {
        border: 0;
        background: none;
        &[aria-pressed='true'] {
          background: var(--soft);
          color: var(--primary);
        }
      }
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    &--list {
      grid-template-columns: 1fr;
    }
  }
  &__card {
    @include card-surface;
    padding: 22px;
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-3px);
    }
    header {
      @include flex-between;
      button {
        border: 0;
        padding: 5px;
      }
    }
    h3 {
      font-size: 15px;
      margin-top: 18px;
    }
    p {
      font-size: 12px;
      color: var(--caption);
      margin: 8px 0 22px;
    }
    footer {
      @include flex-between;
      font-size: 10px;
      color: var(--caption);
      border-top: 1px solid var(--border);
      padding-top: 14px;
    }
  }
  &__icon {
    @include flex-center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    font-size: 22px;
    font-weight: 700;
  }
}
</style>
`},"3465-cd234d5c-6c5aac68":{file:"src/views/apps/calendar.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Calendar',
  data() {
    const today = new Date();
    const month = new Date(today.getFullYear(), today.getMonth(), 1);
    const selected = '';
    const title = '';
    const events = [];
    return {
      today,
      month,
      selected,
      title,
      events
    };
  },
  computed: {
    label() {
      return this.month.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long'
      });
    },
    cells() {
      const y = this.month.getFullYear(),
        m = this.month.getMonth(),
        offset = new Date(y, m, 1).getDay(),
        days = new Date(y, m + 1, 0).getDate();
      return Array.from(
        {
          length: Math.ceil((offset + days) / 7) * 7
        },
        (_, i) => {
          const day = i - offset + 1;
          return day > 0 && day <= days
            ? {
                day,
                key: \`\${y}-\${String(m + 1).padStart(2, '0')}-\${String(day).padStart(2, '0')}\`
              }
            : null;
        }
      );
    }
  },
  methods: {
    move(step) {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() + step, 1);
    },
    add() {
      if (!this.title.trim() || !this.selected) return;
      this.events.push({
        id: Date.now(),
        date: this.selected,
        title: this.title.trim()
      });
      this.title = '';
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <header class="demo__row">
      <button aria-label="이전 달" @click="move(-1)">←</button>
      <h3>{{ label }}</h3>
      <button aria-label="다음 달" @click="move(1)">→</button>
      <button @click="month = new Date(today.getFullYear(), today.getMonth(), 1)">
        오늘
      </button>
    </header>
    <section class="calendar" aria-label="월간 달력">
      <strong v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day">
        {{ day }}
      </strong>
      <template v-for="(cell, i) in cells" :key="cell?.key || 'blank' + i">
        <button
          v-if="cell"
          :aria-pressed="selected === cell.key"
          :aria-label="cell.key + ' 일정 선택'"
          @click="selected = cell.key"
        >
          <span>{{ cell.day }}</span>
          <small v-for="event in events.filter((e) => e.date === cell.key)" :key="event.id">
            {{ event.title }}
          </small>
        </button>
        <span v-else />
      </template>
    </section>
    <form class="demo__row" @submit.prevent="add">
      <label>
        일정 날짜
        <input v-model="selected" type="date" required />
      </label>
      <input v-model="title" aria-label="일정 제목" required placeholder="새 일정" />
      <button class="demo__primary" type="submit">일정 추가</button>
    </form>
    <ul class="demo__list">
      <li
        v-for="event in events.filter((e) => e.date === selected)"
        :key="event.id"
        class="demo__item"
      >
        {{ event.date }} · {{ event.title }}
        <button
          :aria-label="event.title + ' 삭제'"
          @click="events = events.filter((e) => e.id !== event.id)"
        >
          삭제
        </button>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.calendar {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 5px;
  > strong {
    text-align: center;
    color: var(--caption);
    font-size: 12px;
  }
  button {
    min-height: 78px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 8px;
    &[aria-pressed='true'] {
      background: var(--soft);
      border-color: var(--primary);
    }
    small {
      @include text-ellipsis;
      max-width: 100%;
      font-size: 9px;
      color: var(--primary);
    }
  }
}
</style>
`},"1827-4b5af661-31f35dd5":{file:"src/views/apps/cart.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useCart } from '@/composables/useCart';
export default {
  name: 'Cart',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { lines, total, update, remove } = useCart();
    return {
      lines,
      total,
      update,
      remove
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <p class="demo__muted">
      수량과 총액은 computed로 계산되며 장바구니는 로컬 저장소에 보관됩니다.
    </p>
    <div class="demo__scroll">
      <table>
        <thead>
          <tr>
            <th>상품</th>
            <th>단가</th>
            <th>수량</th>
            <th>소계</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in lines" :key="row.id">
            <td>{{ row.icon }} {{ row.name }}</td>
            <td>₩{{ row.price.toLocaleString() }}</td>
            <td>
              <input
                type="number"
                :value="row.quantity"
                min="1"
                max="99"
                :aria-label="row.name + ' 수량'"
                class="cart__quantity"
                @input="update(row.id, $event.target.value)"
              />
            </td>
            <td>₩{{ (row.price * row.quantity).toLocaleString() }}</td>
            <td>
              <button :aria-label="row.name + ' 삭제'" @click="remove(row.id)">×</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="!lines.length">
      장바구니가 비었습니다.
      <RouterLink to="/apps/products">상품 둘러보기</RouterLink>
    </p>
    <footer class="cart__total">
      <strong>총액 ₩{{ total.toLocaleString() }}</strong>
      <RouterLink v-if="lines.length" to="/apps/checkout">주문하기 →</RouterLink>
    </footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.cart__quantity {
  width: 80px;
}
.cart__total {
  @include flex-between;
  padding: 20px;
  background: var(--soft);
  border-radius: 12px;
  a {
    color: var(--primary);
  }
}
</style>
`},"4133-65d6d03c-3510fa98":{file:"src/views/apps/chat.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { nextTick } from 'vue';
export default {
  name: 'Chat',
  data() {
    const input = '';
    const messages = [
      {
        id: 1,
        role: 'assistant',
        text: '안녕하세요! Vue Atelier 데모 어시스턴트입니다. Vue 3에 대해 무엇이 궁금한가요?'
      }
    ];
    const pending = false;
    let timer;
    return {
      input,
      messages,
      pending,
      timer
    };
  },
  methods: {
    async scroll() {
      await nextTick();
      this.$refs.feed?.scrollTo({
        top: this.$refs.feed.scrollHeight,
        behavior: 'smooth'
      });
    },
    send() {
      const text = this.input.trim();
      if (!text || this.pending) return;
      this.messages.push({
        id: Date.now(),
        role: 'user',
        text
      });
      this.input = '';
      this.pending = true;
      this.scroll();
      this.timer = setTimeout(() => {
        let answer = text.toLowerCase().includes('computed')
          ? 'computed는 반응형 의존성을 추적하고 결과를 캐싱합니다. 반응형 핵심 가이드에서 직접 실험해 보세요.'
          : text.includes('안녕')
            ? '반가워요! 문법 가이드, 실무 패턴, UI Kit 중 궁금한 주제를 입력해 주세요.'
            : 'Vue 3에서는 <script setup>과 Composition API로 관심사를 분리합니다. 사이드바의 문법·실무 패턴에서 실행 가능한 예제를 확인하세요.';
        this.messages.push({
          id: Date.now(),
          role: 'assistant',
          text: answer
        });
        this.pending = false;
        this.scroll();
      }, 700);
    }
  },
  unmounted() {
    return clearTimeout(this.timer);
  }
};
<\/script>
<template>
  <section class="demo">
    <section class="chat">
      <header>
        <span class="chat__avatar">✦</span>
        <section>
          <h3>Atelier Assistant</h3>
          <small>● Online · 로컬 응답 데모</small>
        </section>
        <button @click="messages = messages.slice(0, 1)" :disabled="pending">
          대화 초기화
        </button>
      </header>
      <section
        ref="feed"
        class="chat__feed"
        role="log"
        aria-live="polite"
        aria-label="채팅 메시지"
      >
        <article
          v-for="message in messages"
          :key="message.id"
          class="chat__message"
          :class="{ 'chat__message--user': message.role === 'user' }"
        >
          <small>{{ message.role === 'user' ? 'You' : '✦ Atelier AI' }}</small>
          <p>{{ message.text }}</p>
        </article>
        <p v-if="pending" class="demo__muted" role="status">어시스턴트가 입력 중…</p>
      </section>
      <form @submit.prevent="send">
        <input
          v-model="input"
          aria-label="메시지"
          placeholder="메시지를 입력하세요..."
          :disabled="pending"
          required
        />
        <button class="demo__primary" type="submit" :disabled="pending || !input.trim()">
          전송 ↗
        </button>
      </form>
      <footer>
        미리 작성된 로컬 응답을 표시합니다. 외부 AI API와 연결되어 있지 않습니다.
      </footer>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.chat {
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  > header {
    @include flex-between;
    padding: 18px 22px;
    background: var(--canvas);
    h3 {
      font-size: 14px;
    }
    small {
      color: var(--success);
      font-size: 10px;
    }
    section {
      margin-right: auto;
    }
  }
  &__avatar {
    background: var(--soft);
    color: var(--primary);
    padding: 8px 13px;
    border-radius: 12px;
    font-size: 22px;
  }
  &__feed {
    height: 380px;
    overflow: auto;
    @include custom-scrollbar;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__message {
    align-self: flex-start;
    max-width: 80%;
    small {
      font-size: 10px;
      color: var(--caption);
    }
    p {
      margin-top: 5px;
      padding: 14px 18px;
      background: var(--canvas);
      border: 1px solid var(--border);
      border-radius: 0 12px 12px 12px;
      font-size: 13px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
    &--user {
      align-self: flex-end;
      p {
        background: var(--primary);
        color: white;
        border: 0;
        border-radius: 12px 0 12px 12px;
      }
      small {
        display: block;
        text-align: right;
      }
    }
  }
  form {
    display: flex;
    gap: 12px;
    padding: 18px;
    border-top: 1px solid var(--border);
    input {
      flex: 1;
    }
  }
  > footer {
    text-align: center;
    color: var(--caption);
    font-size: 9px;
    padding: 0 12px 14px;
  }
}
</style>
`},"1529-ca25d7a1-87bee795":{file:"src/views/apps/checkout.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useCart } from '@/composables/useCart';
export default {
  name: 'Checkout',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { lines, total } = useCart();
    return {
      lines,
      total
    };
  },
  data() {
    const name = '';
    const email = '';
    const address = '';
    const done = false;
    return {
      name,
      email,
      address,
      done
    };
  },
  methods: {
    submit() {
      if (this.lines.length && this.name.trim() && this.address.trim()) this.done = true;
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <p class="demo__muted">
      테스트 주문 화면입니다. 결제나 개인정보 전송이 발생하지 않습니다.
    </p>
    <form v-if="!done" class="demo" @submit.prevent="submit">
      <div class="demo__grid">
        <label class="demo__field">
          받는 분
          <input v-model.trim="name" required />
        </label>
        <label class="demo__field">
          이메일
          <input v-model="email" type="email" required />
        </label>
      </div>
      <label class="demo__field">
        배송지
        <input v-model.trim="address" required />
      </label>
      <output class="demo__output">
        {{ lines.length }}개 상품 · ₩{{ total.toLocaleString() }}
      </output>
      <p v-if="!lines.length">장바구니에 상품을 먼저 담아주세요.</p>
      <button class="demo__primary" type="submit" :disabled="!lines.length">
        데모 주문 확인
      </button>
    </form>
    <article v-else class="demo__output">
      <h3>✓ 주문 확인이 완료되었습니다.</h3>
      <p>{{ name }}님, {{ address }} · ₩{{ total.toLocaleString() }}</p>
      <RouterLink to="/apps/invoice">인보이스 보기 →</RouterLink>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"310-2ab551c5-57141a47":{file:"src/views/apps/contacts.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PeopleDirectory from '@/components/examples/PeopleDirectory.vue';
export default {
  name: 'Contacts',
  components: {
    PeopleDirectory
  }
};
<\/script>
<template>
  <section class="demo">
    <PeopleDirectory mode="contacts" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"3391-9e99d2a5-6e1eed03":{file:"src/views/apps/email.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseModal from '@/components/common/BaseModal.vue';
export default {
  name: 'Email',
  components: {
    BaseModal
  },
  data() {
    const folder = 'Inbox';
    const query = '';
    const active = null;
    const compose = false;
    const to = '';
    const subject = '';
    const body = '';
    const emails = [
      {
        id: 1,
        from: 'Emma Wilson',
        subject: '디자인 리뷰가 준비됐어요',
        body: '새로운 디자인 시스템을 함께 검토해 주세요. 이번 주 금요일에 만나요!',
        folder: 'Inbox',
        read: false
      },
      {
        id: 2,
        from: 'Vue Atelier',
        subject: '워크스페이스에 오신 것을 환영합니다',
        body: '작은 아이디어를 시작할 모든 도구가 준비되었습니다.',
        folder: 'Inbox',
        read: true
      }
    ];
    return {
      folder,
      query,
      active,
      compose,
      to,
      subject,
      body,
      emails
    };
  },
  computed: {
    filtered() {
      return this.emails.filter(
        (e) =>
          e.folder === this.folder &&
          (e.subject + e.from).toLowerCase().includes(this.query.toLowerCase())
      );
    }
  },
  methods: {
    send() {
      if (!this.to || !this.subject.trim() || !this.body.trim()) return;
      this.emails.push({
        id: Date.now(),
        from: this.to,
        subject: this.subject,
        body: this.body,
        folder: 'Sent',
        read: true
      });
      this.compose = false;
      this.folder = 'Sent';
      this.to = '';
      this.subject = '';
      this.body = '';
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <p class="demo__muted">
      이메일 클라이언트 데모입니다. 작성한 메일은 세션의 Sent 목록에만 추가됩니다.
    </p>
    <div class="demo__row">
      <button
        v-for="f in ['Inbox', 'Sent', 'Trash']"
        :key="f"
        :aria-pressed="folder === f"
        @click="
          folder = f;
          active = null;
        "
      >
        {{ f }}
      </button>
      <input v-model="query" aria-label="메일 검색" placeholder="메일 검색" />
      <button class="demo__primary" @click="compose = true">+ 메일 작성</button>
    </div>
    <ul class="demo__list">
      <li v-for="mail in filtered" :key="mail.id">
        <button
          class="email__item"
          @click="
            active = mail;
            mail.read = true;
          "
        >
          <span>{{ mail.read ? '○' : '●' }} {{ mail.from }}</span>
          <strong>{{ mail.subject }}</strong>
        </button>
      </li>
    </ul>
    <p v-if="!filtered.length">메일이 없습니다.</p>
    <article v-if="active" class="demo__panel">
      <h3>{{ active.subject }}</h3>
      <p class="demo__muted">{{ active.from }}</p>
      <p class="email__body">{{ active.body }}</p>
      <button
        v-if="active.folder !== 'Trash'"
        @click="
          active.folder = 'Trash';
          active = null;
        "
      >
        휴지통으로 이동
      </button>
    </article>
    <BaseModal v-model="compose" title="메일 작성">
      <form class="demo" @submit.prevent="send">
        <label class="demo__field">
          받는 사람
          <input v-model="to" type="email" required />
        </label>
        <label class="demo__field">
          제목
          <input v-model="subject" required />
        </label>
        <label class="demo__field">
          내용
          <textarea v-model="body" required rows="4" />
        </label>
        <button type="submit" class="demo__primary">데모 메일 저장</button>
      </form>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.email__item {
  @include flex-between;
  width: 100%;
  text-align: left;
  padding: 20px;
  strong {
    font-size: 13px;
  }
}
.email__body {
  white-space: pre-wrap;
  padding: 24px 0;
}
</style>
`},"3370-421a5a95-92c2e231":{file:"src/views/apps/files.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Files',
  data() {
    const folder = 'All files';
    const query = '';
    const dragging = false;
    const files = [
      {
        id: 1,
        name: 'Brand guidelines.pdf',
        folder: 'Documents',
        size: 2400000
      },
      {
        id: 2,
        name: 'Dashboard.fig',
        folder: 'Design',
        size: 8600000
      },
      {
        id: 3,
        name: 'Project notes.md',
        folder: 'Documents',
        size: 12000
      },
      {
        id: 4,
        name: 'Workspace.png',
        folder: 'Images',
        size: 420000
      }
    ];
    return {
      folder,
      query,
      dragging,
      files
    };
  },
  computed: {
    filtered() {
      return this.files.filter(
        (f) =>
          (this.folder === 'All files' || f.folder === this.folder) &&
          f.name.toLowerCase().includes(this.query.toLowerCase())
      );
    }
  },
  methods: {
    upload(list) {
      Array.from(list || []).forEach((file, i) =>
        this.files.push({
          id: Date.now() + i,
          name: file.name,
          folder: this.folder === 'All files' ? 'Documents' : this.folder,
          size: file.size
        })
      );
      this.dragging = false;
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <p class="demo__muted">
      로컬 데모: 파일 이름과 크기만 세션에 추가하며 서버에 업로드하지 않습니다.
    </p>
    <section class="files">
      <nav aria-label="폴더 트리">
        <button
          v-for="f in ['All files', 'Documents', 'Design', 'Images']"
          :key="f"
          :aria-pressed="folder === f"
          @click="folder = f"
        >
          ▱ {{ f }}
        </button>
      </nav>
      <section class="demo">
        <input v-model="query" aria-label="파일 검색" placeholder="파일 검색..." />
        <label
          class="files__drop"
          :class="{ 'files__drop--active': dragging }"
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop.prevent="upload($event.dataTransfer.files)"
        >
          <span>↑ 파일을 드래그하거나 선택하세요</span>
          <input
            type="file"
            multiple
            aria-label="파일 추가"
            @change="
              upload($event.target.files);
              $event.target.value = '';
            "
          />
        </label>
        <ul class="demo__list">
          <li v-for="f in filtered" :key="f.id" class="demo__item">
            <span>
              ▤ {{ f.name }}
              <small>{{ (f.size / 1000000).toFixed(2) }} MB</small>
            </span>
            <button
              :aria-label="f.name + ' 삭제'"
              @click="files = files.filter((item) => item.id !== f.id)"
            >
              삭제
            </button>
          </li>
        </ul>
        <p v-if="!filtered.length">파일이 없습니다.</p>
      </section>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.files {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  nav {
    display: grid;
    align-content: start;
    gap: 6px;
    button {
      text-align: left;
      border: 0;
      &[aria-pressed='true'] {
        background: var(--soft);
        color: var(--primary);
      }
    }
  }
  &__drop {
    display: grid;
    text-align: center;
    padding: 30px;
    border: 2px dashed var(--border);
    border-radius: 12px;
    color: var(--caption);
    &--active {
      border-color: var(--primary);
      background: var(--soft);
    }
  }
  small {
    color: var(--caption);
    font-size: 10px;
  }
  @include responsive(mobile) {
    grid-template-columns: 1fr;
  }
}
</style>
`},"1244-dff6b8c7-1a7aac01":{file:"src/views/apps/invoice.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useCart } from '@/composables/useCart';
export default {
  name: 'Invoice',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { lines, total } = useCart();
    return {
      lines,
      total
    };
  },
  data() {
    const date = new Intl.DateTimeFormat('ko-KR').format(new Date());
    return {
      date
    };
  },
  methods: {
    print() {
      window.print();
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <header class="demo__row">
      <h2>
        INVOICE
        <small>#VA-DEMO-001</small>
      </h2>
      <button @click="print">인쇄 / PDF 저장</button>
    </header>
    <p class="demo__muted">발행일 {{ date }} · 현재 장바구니 기준 데모 인보이스</p>
    <div class="demo__scroll">
      <table>
        <thead>
          <tr>
            <th>상품</th>
            <th>수량</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lines" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>₩{{ (item.price * item.quantity).toLocaleString() }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="2">합계 (배송비 포함)</th>
            <td>₩{{ total.toLocaleString() }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"4125-1ff9b72c-8a0542ce":{file:"src/views/apps/kanban.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Kanban',
  data() {
    const columns = [
      {
        id: 'todo',
        title: 'To do',
        color: '#94a3b8'
      },
      {
        id: 'progress',
        title: 'In progress',
        color: '#6366f1'
      },
      {
        id: 'done',
        title: 'Done',
        color: '#10b981'
      }
    ];
    const tasks = [
      {
        id: 1,
        title: '디자인 시스템 토큰 설계',
        status: 'todo',
        label: 'Design',
        assignee: 'EW'
      },
      {
        id: 2,
        title: '컴포넌트 라이브러리 구현',
        status: 'progress',
        label: 'Development',
        assignee: 'JP'
      },
      {
        id: 3,
        title: '사용자 인터뷰 정리',
        status: 'done',
        label: 'Research',
        assignee: 'AK'
      },
      {
        id: 4,
        title: '접근성 체크리스트 작성',
        status: 'todo',
        label: 'Planning',
        assignee: 'OC'
      }
    ];
    const title = '';
    const dragged = null;
    return {
      columns,
      tasks,
      title,
      dragged
    };
  },
  methods: {
    drop(status, e) {
      const id = Number(e.dataTransfer.getData('text/plain'));
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.status = status;
      this.dragged = null;
    },
    add() {
      if (!this.title.trim()) return;
      this.tasks.push({
        id: Date.now(),
        title: this.title.trim(),
        status: 'todo',
        label: 'New task',
        assignee: 'JP'
      });
      this.title = '';
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <form class="demo__row" @submit.prevent="add">
      <input
        v-model="title"
        aria-label="새 태스크 제목"
        placeholder="새 태스크..."
        required
      />
      <button class="demo__primary" type="submit">+ 태스크 추가</button>
    </form>
    <p class="demo__muted">
      카드를 드래그해서 이동하거나 각 카드의 상태 선택을 사용하세요.
    </p>
    <section class="kanban">
      <article
        v-for="column in columns"
        :key="column.id"
        class="kanban__column"
        @dragover.prevent
        @drop.prevent="drop(column.id, $event)"
      >
        <header>
          <h3>
            <i :style="{ background: column.color }" />
            {{ column.title }}
          </h3>
          <span>{{ tasks.filter((t) => t.status === column.id).length }}</span>
        </header>
        <article
          v-for="task in tasks.filter((t) => t.status === column.id)"
          :key="task.id"
          draggable="true"
          class="kanban__task"
          :class="{ 'kanban__task--dragging': dragged === task.id }"
          @dragstart="
            dragged = task.id;
            $event.dataTransfer.setData('text/plain', String(task.id));
          "
          @dragend="dragged = null"
        >
          <small>{{ task.label }}</small>
          <h4>{{ task.title }}</h4>
          <footer>
            <span>{{ task.assignee }}</span>
            <select v-model="task.status" :aria-label="task.title + ' 상태'">
              <option v-for="c in columns" :key="c.id" :value="c.id">{{ c.title }}</option>
            </select>
          </footer>
        </article>
      </article>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.kanban {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  &__column {
    background: var(--canvas);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    min-height: 330px;
    > header {
      @include flex-between;
      margin-bottom: 20px;
      h3 {
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
      }
      span {
        font-size: 11px;
        color: var(--caption);
      }
    }
  }
  &__task {
    @include card-surface;
    padding: 18px;
    margin-bottom: 12px;
    cursor: grab;
    small {
      font-size: 10px;
      background: var(--soft);
      color: var(--primary);
      padding: 3px 8px;
      border-radius: 5px;
    }
    h4 {
      margin: 14px 0;
      font-size: 13px;
    }
    footer {
      @include flex-between;
      span {
        font-size: 9px;
        background: #f0d7c5;
        border-radius: 50%;
        color: #845e4b;
        padding: 6px;
      }
      select {
        font-size: 10px;
        padding: 5px;
      }
    }
    &--dragging {
      opacity: 0.4;
    }
  }
  @include responsive(mobile) {
    grid-template-columns: 1fr;
  }
}
</style>
`},"1668-d96fe9d8-daa04c5e":{file:"src/views/apps/new-project.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useProjects } from '@/composables/useProjects';
import { useToast } from '@/composables/useToast';
export default {
  name: 'NewProject',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { projects } = useProjects();
    const { toast } = useToast();
    return {
      projects,
      toast
    };
  },
  data() {
    const name = '';
    const description = '';
    const status = 'Planning';
    const error = '';
    return {
      name,
      description,
      status,
      error
    };
  },
  methods: {
    create() {
      if (this.name.trim().length < 3) {
        this.error = '프로젝트 이름을 3자 이상 입력하세요.';
        return;
      }
      this.projects.push({
        id: Date.now(),
        name: this.name.trim(),
        description: this.description,
        status: this.status,
        progress: 0
      });
      this.toast('프로젝트를 생성했습니다.');
      this.$router.push('/apps/projects');
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <form class="demo" @submit.prevent="create">
      <label class="demo__field">
        프로젝트 이름
        <input
          v-model="name"
          required
          minlength="3"
          maxlength="80"
          placeholder="새로운 아이디어의 이름"
        />
      </label>
      <label class="demo__field">
        프로젝트 설명
        <textarea v-model="description" rows="4" />
      </label>
      <label class="demo__field">
        상태
        <select v-model="status">
          <option>Planning</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
      </label>
      <p v-if="error" role="alert" class="demo__error">{{ error }}</p>
      <button type="submit" class="demo__primary">프로젝트 생성</button>
    </form>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"2085-447f1d9e-5d9e40a":{file:"src/views/apps/product-detail.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { products, useCart } from '@/composables/useCart';
import { useToast } from '@/composables/useToast';
export default {
  name: 'ProductDetail',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { add } = useCart();
    const { toast } = useToast();
    return {
      add,
      toast
    };
  },
  data() {
    const tab = '설명';
    return {
      tab
    };
  },
  computed: {
    product() {
      return products.find((p) => p.id === Number(this.$route.query.id)) || products[0];
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <article class="product-detail">
      <figure :style="{ background: product.color }">{{ product.icon }}</figure>
      <section class="demo">
        <small>{{ product.category }} / IN STOCK</small>
        <h2>{{ product.name }}</h2>
        <p>
          매일의 워크스페이스를 위한 신중한 선택. 간결한 디자인과 편안한 사용 경험을
          만나보세요.
        </p>
        <strong>₩{{ product.price.toLocaleString() }}</strong>
        <div class="demo__row">
          <button
            class="demo__primary"
            @click="
              add(product.id);
              toast('장바구니에 추가했습니다.');
            "
          >
            장바구니에 담기
          </button>
          <RouterLink to="/apps/cart">장바구니 보기 →</RouterLink>
        </div>
        <nav aria-label="상품 정보">
          <button
            v-for="t in ['설명', '배송 안내']"
            :key="t"
            :aria-pressed="tab === t"
            @click="tab = t"
          >
            {{ t }}
          </button>
        </nav>
        <p>
          {{
            tab === '설명'
              ? '품질을 우선으로 설계한 워크스페이스 컬렉션입니다.'
              : '무료 배송 · 결제 후 영업일 기준 2~3일 (데모 상품)'
          }}
        </p>
      </section>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  figure {
    @include flex-center;
    margin: 0;
    border-radius: 16px;
    font-size: 120px;
    min-height: 320px;
    color: #65617a;
  }
  p {
    color: var(--muted);
  }
  @include responsive(mobile) {
    grid-template-columns: 1fr;
  }
}
</style>
`},"2158-c70637b4-abb67f14":{file:"src/views/apps/products.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { products, useCart } from '@/composables/useCart';
import { useToast } from '@/composables/useToast';
export default {
  name: 'Products',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { add } = useCart();
    const { toast } = useToast();
    return {
      add,
      toast
    };
  },
  data() {
    const query = '';
    const category = 'All';
    return {
      query,
      category,
      products
    };
  },
  computed: {
    filtered() {
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(this.query.toLowerCase()) &&
          (this.category === 'All' || p.category === this.category)
      );
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <input v-model="query" aria-label="상품 검색" placeholder="Search products..." />
      <label>
        카테고리
        <select v-model="category">
          <option>All</option>
          <option>Audio</option>
          <option>Workspace</option>
          <option>Lifestyle</option>
        </select>
      </label>
      <RouterLink to="/apps/cart">장바구니 →</RouterLink>
    </div>
    <section class="demo__grid">
      <article v-for="product in filtered" :key="product.id" class="demo__panel product">
        <RouterLink :to="{ path: '/apps/product-detail', query: { id: product.id } }">
          <figure :style="{ background: product.color }">{{ product.icon }}</figure>
          <small>{{ product.category }}</small>
          <h3>{{ product.name }}</h3>
        </RouterLink>
        <footer>
          <strong>₩{{ product.price.toLocaleString() }}</strong>
          <button
            @click="
              add(product.id);
              toast('장바구니에 추가했습니다.');
            "
          >
            + 담기
          </button>
        </footer>
      </article>
    </section>
    <p v-if="!filtered.length">상품이 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.product {
  figure {
    @include flex-center;
    height: 150px;
    border-radius: 12px;
    font-size: 65px;
    margin: 0 0 20px;
    color: #65617a;
  }
  small {
    color: var(--caption);
    font-size: 10px;
  }
  h3 {
    font-size: 14px;
    margin: 8px 0 18px;
  }
  footer {
    @include flex-between;
    font-size: 12px;
  }
}
</style>
`},"1666-808c7c6c-4ea47ace":{file:"src/views/apps/projects.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useProjects } from '@/composables/useProjects';
export default {
  name: 'Projects',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { projects } = useProjects();
    return {
      projects
    };
  },
  data() {
    const status = 'All';
    return {
      status
    };
  },
  computed: {
    filtered() {
      return this.projects.filter((p) => this.status === 'All' || p.status === this.status);
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <header class="demo__row">
      <label>
        상태
        <select v-model="status">
          <option>All</option>
          <option>In progress</option>
          <option>Completed</option>
          <option>Planning</option>
        </select>
      </label>
      <RouterLink to="/apps/new-project" class="demo__primary project__new">
        + 새 프로젝트
      </RouterLink>
    </header>
    <section class="demo__grid">
      <article
        v-for="project in filtered"
        :key="project.id"
        class="demo__panel project__card"
      >
        <small>{{ project.status }}</small>
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <label>
          진행률
          <input v-model.number="project.progress" type="range" min="0" max="100" />
        </label>
        <progress :value="project.progress" max="100" />
        <span>{{ project.progress }}%</span>
      </article>
    </section>
    <p v-if="!filtered.length">해당 상태의 프로젝트가 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.project__new {
  padding: 9px 15px;
  border-radius: 10px;
  font-size: 13px;
}
.project__card {
  display: grid;
  gap: 12px;
  small {
    color: var(--primary);
  }
  p {
    color: var(--caption);
    font-size: 12px;
  }
}
</style>
`},"287-3b0202d4-8b7fc356":{file:"src/views/apps/tasks.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import TaskList from '@/components/examples/TaskList.vue';
export default {
  name: 'Tasks',
  components: {
    TaskList
  }
};
<\/script>
<template>
  <section class="demo">
    <TaskList title="팀 태스크" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"289-252f94b0-7e74828a":{file:"src/views/apps/todo.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import TaskList from '@/components/examples/TaskList.vue';
export default {
  name: 'Todo',
  components: {
    TaskList
  }
};
<\/script>
<template>
  <section class="demo">
    <TaskList title="오늘의 할 일" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"307-5b3fc8ee-164efeea":{file:"src/views/apps/users.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PeopleDirectory from '@/components/examples/PeopleDirectory.vue';
export default {
  name: 'Users',
  components: {
    PeopleDirectory
  }
};
<\/script>
<template>
  <section class="demo">
    <PeopleDirectory mode="users" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"13186-48971b10-7f49a1de":JSON.parse(`{"file":"src/views/common-components/library.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport { markRaw, nextTick } from 'vue';\\nimport {\\n  Blocks,\\n  Search,\\n  ArrowDown,\\n  Code2,\\n  Layers,\\n  MousePointerClick\\n} from 'lucide-vue-next';\\nimport CodeExampleCard from '@/components/common/CodeExampleCard.vue';\\nimport { getExampleFiles } from '@/data/codeSnippets';\\nimport guide from '@/data/commonComponentGuide.json';\\nimport BadgeExample from '@/components/common-examples/BadgeExample.vue';\\nimport ButtonExample from '@/components/common-examples/ButtonExample.vue';\\nimport FieldExample from '@/components/common-examples/FieldExample.vue';\\nimport SelectExample from '@/components/common-examples/SelectExample.vue';\\nimport AlertExample from '@/components/common-examples/AlertExample.vue';\\nimport AvatarExample from '@/components/common-examples/AvatarExample.vue';\\nimport EmptyExample from '@/components/common-examples/EmptyExample.vue';\\nimport SkeletonExample from '@/components/common-examples/SkeletonExample.vue';\\nimport CardExample from '@/components/common-examples/CardExample.vue';\\nimport ModalExample from '@/components/common-examples/ModalExample.vue';\\nimport TabsExample from '@/components/common-examples/TabsExample.vue';\\nimport PaginationExample from '@/components/common-examples/PaginationExample.vue';\\nimport ToastExample from '@/components/common-examples/ToastExample.vue';\\nimport MemberManagementExample from '@/components/common-examples/MemberManagementExample.vue';\\nexport default {\\n  name: 'Library',\\n  components: {\\n    Blocks,\\n    Search,\\n    ArrowDown,\\n    Code2,\\n    Layers,\\n    MousePointerClick,\\n    CodeExampleCard\\n  },\\n  data() {\\n    const examples = markRaw({\\n      BadgeExample,\\n      ButtonExample,\\n      FieldExample,\\n      SelectExample,\\n      AlertExample,\\n      AvatarExample,\\n      EmptyExample,\\n      SkeletonExample,\\n      CardExample,\\n      ModalExample,\\n      TabsExample,\\n      PaginationExample,\\n      ToastExample,\\n      MemberManagementExample\\n    });\\n    const categories = ['전체', ...new Set(guide.map((item) => item.category))];\\n    const category = '전체';\\n    const keyword = '';\\n    const selected = 'badge';\\n    return {\\n      examples,\\n      categories,\\n      category,\\n      keyword,\\n      selected\\n    };\\n  },\\n  computed: {\\n    filtered() {\\n      return guide.filter(\\n        (item) =>\\n          (this.category === '전체' || item.category === this.category) &&\\n          \`\${item.title} \${item.summary} \${item.usage}\`\\n            .toLowerCase()\\n            .includes(this.keyword.trim().toLowerCase())\\n      );\\n    },\\n    active() {\\n      return guide.find((item) => item.id === this.selected);\\n    },\\n    files() {\\n      return this.active\\n        ? {\\n            ...getExampleFiles(\\n              '',\\n              \`/src/components/common-examples/\${this.active.file}.vue\`\\n            ),\\n            ...getExampleFiles('', '/src/assets/styles/main.scss')\\n          }\\n        : {};\\n    }\\n  },\\n  methods: {\\n    async openComposition() {\\n      this.category = '전체';\\n      this.keyword = '';\\n      this.selected = 'composition';\\n      await nextTick();\\n      this.$refs.detail?.scrollIntoView({\\n        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches\\n          ? 'auto'\\n          : 'smooth',\\n        block: 'start'\\n      });\\n    }\\n  },\\n  watch: {\\n    filtered: {\\n      handler(items) {\\n        if (!items.some((item) => item.id === this.selected))\\n          this.selected = items[0]?.id || '';\\n      }\\n    }\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"component-library\\">\\n    <header class=\\"component-library__hero\\">\\n      <div>\\n        <span class=\\"component-library__eyebrow\\">\\n          <Blocks :size=\\"15\\" />\\n          REUSABLE VUE COMPONENTS\\n        </span>\\n        <h1>\\n          공통 컴포넌트\\n          <span>13 COMPONENTS + 1 WORKFLOW</span>\\n        </h1>\\n        <p>\\n          한 번 만들고 여러 화면에서 사용하세요.\\n          <br />\\n          실제 동작 예제부터 부모·자식 연결 방식, 전체 Vue·SCSS 소스까지.\\n        </p>\\n      </div>\\n      <button @click=\\"openComposition\\">\\n        <Layers :size=\\"17\\" />\\n        직원 관리 조합 예제\\n        <ArrowDown :size=\\"15\\" />\\n      </button>\\n    </header>\\n    <div class=\\"component-library__principles\\">\\n      <article>\\n        <span>01</span>\\n        <strong>Props로 전달</strong>\\n        <p>부모가 업무 데이터를 갖고 컴포넌트에는 표시할 값을 전달합니다.</p>\\n      </article>\\n      <article>\\n        <span>02</span>\\n        <strong>Emit · v-model로 연결</strong>\\n        <p>값 변경과 사용자 동작을 부모에 전달해 화면 로직을 연결합니다.</p>\\n      </article>\\n      <article>\\n        <span>03</span>\\n        <strong>Slot · SCSS로 재사용</strong>\\n        <p>공통 구조와 스타일을 공유하고 화면별 콘텐츠는 slot으로 채웁니다.</p>\\n      </article>\\n    </div>\\n    <section class=\\"component-library__picker\\" aria-label=\\"공통 컴포넌트 선택\\">\\n      <div class=\\"component-library__toolbar\\">\\n        <div class=\\"component-library__categories\\" role=\\"group\\" aria-label=\\"컴포넌트 분류\\">\\n          <button\\n            v-for=\\"item in categories\\"\\n            :key=\\"item\\"\\n            :aria-pressed=\\"category === item\\"\\n            @click=\\"category = item\\"\\n          >\\n            {{ item }}\\n          </button>\\n        </div>\\n        <label class=\\"component-library__search\\">\\n          <Search :size=\\"15\\" />\\n          <input\\n            v-model=\\"keyword\\"\\n            type=\\"search\\"\\n            aria-label=\\"공통 컴포넌트 검색\\"\\n            placeholder=\\"이름·용도 검색\\"\\n          />\\n        </label>\\n      </div>\\n      <div class=\\"component-library__options\\">\\n        <button\\n          v-for=\\"item in filtered\\"\\n          :key=\\"item.id\\"\\n          :aria-pressed=\\"selected === item.id\\"\\n          @click=\\"selected = item.id\\"\\n        >\\n          <small>{{ item.category }}</small>\\n          <strong>{{ item.title }}</strong>\\n          <span>{{ item.summary }}</span>\\n        </button>\\n      </div>\\n      <p v-if=\\"!filtered.length\\" class=\\"component-library__no-results\\" role=\\"status\\">\\n        검색 결과가 없습니다. 검색어나 분류를 변경해 주세요.\\n      </p>\\n    </section>\\n    <section\\n      v-if=\\"active\\"\\n      :key=\\"active.id\\"\\n      ref=\\"detail\\"\\n      class=\\"component-library__detail\\"\\n      aria-label=\\"선택한 컴포넌트 가이드\\"\\n    >\\n      <header class=\\"component-library__detail-heading\\">\\n        <div>\\n          <span>{{ active.category }} / PRACTICAL GUIDE</span>\\n          <h2>{{ active.title }}</h2>\\n          <p>{{ active.usage }}</p>\\n        </div>\\n        <MousePointerClick :size=\\"25\\" />\\n      </header>\\n      <CodeExampleCard\\n        :title=\\"active.title + ' · 실제 사용 화면'\\"\\n        description=\\"상태를 바꿔 동작을 확인하세요. 코드 보기에는 사용 화면과 공통 컴포넌트·SCSS 원본이 함께 제공됩니다.\\"\\n        :files=\\"files\\"\\n      >\\n        <component :is=\\"examples[active.file]\\" />\\n      </CodeExampleCard>\\n      <div class=\\"component-library__explanations\\">\\n        <article>\\n          <h3>\\n            <Code2 :size=\\"17\\" />\\n            연결 흐름\\n          </h3>\\n          <ol>\\n            <li v-for=\\"step in active.flow\\" :key=\\"step\\">{{ step }}</li>\\n          </ol>\\n        </article>\\n        <article>\\n          <h3>실무 적용 팁</h3>\\n          <ul>\\n            <li v-for=\\"tip in active.tips\\" :key=\\"tip\\">{{ tip }}</li>\\n          </ul>\\n        </article>\\n      </div>\\n      <section class=\\"component-library__contract\\">\\n        <h3>Props · Events · Slots 계약</h3>\\n        <p>아래 인터페이스를 기준으로 화면과 공통 컴포넌트를 연결합니다.</p>\\n        <div class=\\"component-library__table-scroll\\">\\n          <table>\\n            <caption>\\n              {{\\n                active.title\\n              }}\\n              사용 인터페이스\\n            </caption>\\n            <thead>\\n              <tr>\\n                <th scope=\\"col\\">이름</th>\\n                <th scope=\\"col\\">타입</th>\\n                <th scope=\\"col\\">기본값</th>\\n                <th scope=\\"col\\">사용법</th>\\n              </tr>\\n            </thead>\\n            <tbody>\\n              <tr v-for=\\"row in active.api\\" :key=\\"row.name\\">\\n                <th scope=\\"row\\">\\n                  <code>{{ row.name }}</code>\\n                </th>\\n                <td>{{ row.type }}</td>\\n                <td>{{ row.default }}</td>\\n                <td>{{ row.description }}</td>\\n              </tr>\\n            </tbody>\\n          </table>\\n        </div>\\n      </section>\\n      <aside class=\\"component-library__source-note\\">\\n        <Code2 :size=\\"18\\" />\\n        <p>\\n          <strong>코드를 가져가는 순서</strong>\\n          — 「Vue 코드 보기」에서 첫 번째 파일은 부모 사용 예제입니다. 파일 선택에서\\n          Base*.vue 원본과 의존 SCSS를 확인하세요. 앱 진입점에서 main.scss를 한 번 불러오면\\n          테마 변수와 공통 스타일이 적용됩니다.\\n        </p>\\n      </aside>\\n    </section>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/mixins' as *;\\n.component-library {\\n  display: grid;\\n  gap: 24px;\\n  min-width: 0;\\n  &__hero {\\n    @include flex-between;\\n    flex-wrap: wrap;\\n    padding: 30px;\\n    border: 1px solid var(--border);\\n    border-radius: 16px;\\n    background: linear-gradient(120deg, var(--surface), var(--soft));\\n    h1 {\\n      font-size: clamp(24px, 3vw, 33px);\\n      letter-spacing: -1px;\\n      margin: 12px 0;\\n      span {\\n        display: block;\\n        margin-top: 12px;\\n        color: var(--primary);\\n        font-size: 10px;\\n        letter-spacing: 1.2px;\\n      }\\n    }\\n    p {\\n      font-size: 13px;\\n      color: var(--muted);\\n      line-height: 1.9;\\n      margin: 0;\\n    }\\n    > button {\\n      display: flex;\\n      align-items: center;\\n      gap: 9px;\\n      font-size: 12px;\\n      color: var(--primary);\\n    }\\n  }\\n  &__eyebrow {\\n    display: flex;\\n    align-items: center;\\n    gap: 7px;\\n    color: var(--primary);\\n    font-size: 10px;\\n    letter-spacing: 1.5px;\\n    font-weight: 700;\\n  }\\n  &__principles {\\n    display: grid;\\n    grid-template-columns: repeat(3, minmax(0, 1fr));\\n    gap: 14px;\\n    article {\\n      @include card-surface;\\n      padding: 20px;\\n      span {\\n        display: block;\\n        color: var(--primary);\\n        font-size: 11px;\\n        margin-bottom: 12px;\\n      }\\n      strong {\\n        font-size: 13px;\\n      }\\n      p {\\n        color: var(--muted);\\n        font-size: 11px;\\n        line-height: 1.8;\\n        margin: 8px 0 0;\\n      }\\n    }\\n  }\\n  &__picker {\\n    @include card-surface;\\n    padding: 20px;\\n    min-width: 0;\\n  }\\n  &__toolbar {\\n    @include flex-between;\\n    flex-wrap: wrap;\\n    margin-bottom: 18px;\\n  }\\n  &__categories {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 6px;\\n    button {\\n      padding: 7px 10px;\\n      font-size: 11px;\\n      border-color: transparent;\\n      background: var(--canvas);\\n      &[aria-pressed='true'] {\\n        color: #fff;\\n        background: var(--primary);\\n      }\\n    }\\n  }\\n  &__search {\\n    display: flex;\\n    color: var(--muted);\\n    gap: 6px;\\n    input {\\n      min-width: 0;\\n      width: 190px;\\n      font-size: 11px;\\n    }\\n  }\\n  &__options {\\n    display: grid;\\n    grid-template-columns: repeat(4, minmax(0, 1fr));\\n    gap: 10px;\\n    button {\\n      text-align: left;\\n      padding: 16px;\\n      min-width: 0;\\n      &[aria-pressed='true'] {\\n        background: var(--soft);\\n        border-color: var(--primary);\\n        box-shadow: 0 0 0 1px var(--primary);\\n      }\\n      small {\\n        display: block;\\n        font-size: 9px;\\n        color: var(--primary);\\n      }\\n      strong {\\n        display: block;\\n        font-size: 12px;\\n        margin: 7px 0;\\n      }\\n      span {\\n        display: block;\\n        color: var(--muted);\\n        font-size: 10px;\\n        line-height: 1.8;\\n      }\\n    }\\n  }\\n  &__no-results {\\n    text-align: center;\\n    font-size: 13px;\\n    color: var(--muted);\\n    padding: 20px;\\n  }\\n  &__detail {\\n    scroll-margin-top: 95px;\\n    display: grid;\\n    gap: 20px;\\n    min-width: 0;\\n  }\\n  &__detail-heading {\\n    @include flex-between;\\n    span {\\n      font-size: 9px;\\n      color: var(--primary);\\n      letter-spacing: 1px;\\n    }\\n    h2 {\\n      font-size: 23px;\\n      margin: 8px 0;\\n      letter-spacing: -0.5px;\\n    }\\n    p {\\n      font-size: 12px;\\n      color: var(--muted);\\n      line-height: 1.8;\\n      margin: 0;\\n    }\\n    > svg {\\n      color: var(--primary);\\n      flex-shrink: 0;\\n    }\\n  }\\n  &__explanations {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    gap: 16px;\\n    article {\\n      @include card-surface;\\n      padding: 22px;\\n      min-width: 0;\\n    }\\n    h3 {\\n      display: flex;\\n      align-items: center;\\n      gap: 8px;\\n      font-size: 13px;\\n      margin: 0 0 14px;\\n    }\\n    ol,\\n    ul {\\n      padding-left: 18px;\\n      margin: 0;\\n      font-size: 12px;\\n      color: var(--muted);\\n      line-height: 1.9;\\n    }\\n    ul {\\n      list-style: disc;\\n    }\\n    li + li {\\n      margin-top: 8px;\\n    }\\n  }\\n  &__contract {\\n    @include card-surface;\\n    min-width: 0;\\n    padding: 22px;\\n    h3 {\\n      font-size: 14px;\\n      margin: 0;\\n    }\\n    > p {\\n      color: var(--muted);\\n      font-size: 11px;\\n      margin: 7px 0 16px;\\n    }\\n    table {\\n      min-width: 620px;\\n      font-size: 11px;\\n      line-height: 1.8;\\n    }\\n    th,\\n    td {\\n      padding: 12px;\\n    }\\n    tbody th {\\n      background: transparent;\\n      color: var(--primary);\\n      font-weight: 500;\\n    }\\n    caption {\\n      text-align: left;\\n      color: var(--caption);\\n      font-size: 10px;\\n      margin-bottom: 10px;\\n    }\\n  }\\n  &__table-scroll {\\n    overflow-x: auto;\\n  }\\n  &__source-note {\\n    display: flex;\\n    align-items: flex-start;\\n    gap: 10px;\\n    padding: 16px;\\n    background: var(--soft);\\n    border-radius: 12px;\\n    > svg {\\n      color: var(--primary);\\n      flex-shrink: 0;\\n      margin-top: 3px;\\n    }\\n    p {\\n      font-size: 11px;\\n      line-height: 1.9;\\n      color: var(--muted);\\n      margin: 0;\\n    }\\n  }\\n  @include responsive(tablet) {\\n    &__options {\\n      grid-template-columns: repeat(3, minmax(0, 1fr));\\n    }\\n  }\\n  @include responsive(mobile) {\\n    &__hero {\\n      padding: 22px;\\n    }\\n    &__principles,\\n    &__explanations {\\n      grid-template-columns: minmax(0, 1fr);\\n    }\\n    &__options {\\n      grid-template-columns: repeat(2, minmax(0, 1fr));\\n      button {\\n        padding: 12px;\\n      }\\n    }\\n    &__picker,\\n    &__contract {\\n      padding: 14px;\\n    }\\n    &__search,\\n    &__search input {\\n      width: 100%;\\n    }\\n  }\\n}\\n</style>\\n"}`),"15465-cc15d9fb-9866bae1":JSON.parse(`{"file":"src/views/css3/patterns.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport { Copy, Check, Download, Palette } from 'lucide-vue-next';\\nimport patternConfigs from '@/data/css3Patterns.json';\\nimport tipConfigs from '@/data/css3Tips.json';\\nimport recipes from '@/data/scssRecipes.json';\\nimport themeVariables from '@/assets/styles/_variables.scss?raw';\\nimport SyntaxCode from '@/components/common/SyntaxCode.vue';\\nimport { useClipboard } from '@/composables/useClipboard';\\nimport { useTheme } from '@/composables/useTheme';\\nimport { createPracticePreview } from '@/composables/practicePreview';\\nimport {\\n  resolveCssPatterns,\\n  resolveCssTips,\\n  buildCssStyles,\\n  buildCssDocument,\\n  cssExampleBase\\n} from '@/composables/cssPatternOutput';\\nexport default {\\n  name: 'Patterns',\\n  components: {\\n    Copy,\\n    Check,\\n    Download,\\n    Palette,\\n    SyntaxCode\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const { theme } = useTheme();\\n    const { copied, copy } = useClipboard();\\n    return {\\n      theme,\\n      copied,\\n      copy\\n    };\\n  },\\n  data() {\\n    const patterns = resolveCssPatterns(patternConfigs, recipes);\\n    const tips = resolveCssTips(tipConfigs, patterns);\\n    const mode = 'patterns';\\n    const activeIds = {\\n      patterns: patterns[0].id,\\n      tips: tips[0].id\\n    };\\n    const category = '전체';\\n    const query = '';\\n    const codeTab = 'css';\\n    const previewOpen = false;\\n    const previewWidth = 720;\\n    const previewTheme = 'app';\\n    const baseCode = themeVariables.trim() + '\\\\n\\\\n' + cssExampleBase.trim();\\n    const tabs = [\\n      {\\n        id: 'css',\\n        label: 'CSS 패턴'\\n      },\\n      {\\n        id: 'html',\\n        label: 'HTML 구조'\\n      },\\n      {\\n        id: 'base',\\n        label: '공통 기본 CSS'\\n      },\\n      {\\n        id: 'document',\\n        label: '전체 HTML 문서'\\n      }\\n    ];\\n    return {\\n      patterns,\\n      tips,\\n      mode,\\n      activeIds,\\n      category,\\n      query,\\n      codeTab,\\n      previewOpen,\\n      previewWidth,\\n      previewTheme,\\n      baseCode,\\n      tabs,\\n      themeVariables,\\n      buildCssStyles\\n    };\\n  },\\n  computed: {\\n    items() {\\n      return this.mode === 'patterns' ? this.patterns : this.tips;\\n    },\\n    categories() {\\n      return [...new Set(this.items.map((item) => item.category))];\\n    },\\n    active() {\\n      return this.items.find((item) => item.id === this.activeIds[this.mode]);\\n    },\\n    groups() {\\n      return this.categories\\n        .map((name) => ({\\n          name,\\n          items: this.items.filter(\\n            (item) =>\\n              item.category === name &&\\n              (this.category === '전체' || item.category === this.category) &&\\n              \`\${item.id} \${item.title} \${item.properties.join(' ')} \${item.description}\`\\n                .toLowerCase()\\n                .includes(this.query.trim().toLowerCase())\\n          )\\n        }))\\n        .filter((group) => group.items.length);\\n    },\\n    dark() {\\n      return (\\n        this.previewTheme === 'dark' ||\\n        (this.previewTheme === 'app' && this.theme === 'dark')\\n      );\\n    },\\n    code() {\\n      return this.codeTab === 'document'\\n        ? buildCssDocument(this.active, themeVariables, this.dark)\\n        : this.codeTab === 'html'\\n          ? this.active.html\\n          : this.codeTab === 'base'\\n            ? this.baseCode\\n            : this.active.css;\\n    },\\n    preview() {\\n      return createPracticePreview(\\n        this.active.html,\\n        buildCssStyles(this.active, themeVariables),\\n        this.dark,\\n        true\\n      );\\n    }\\n  },\\n  methods: {\\n    select(id) {\\n      this.activeIds[this.mode] = id;\\n      this.codeTab = 'css';\\n      this.copied = false;\\n    },\\n    download(format) {\\n      const html = format === 'html';\\n      const text = html\\n        ? buildCssDocument(this.active, themeVariables, this.dark)\\n        : buildCssStyles(this.active, themeVariables);\\n      const url = URL.createObjectURL(\\n        new Blob([text], {\\n          type: html ? 'text/html;charset=utf-8' : 'text/css;charset=utf-8'\\n        })\\n      );\\n      const link = document.createElement('a');\\n      link.href = url;\\n      link.download = this.active.id + '.' + format;\\n      link.click();\\n      setTimeout(() => URL.revokeObjectURL(url), 1000);\\n    }\\n  },\\n  watch: {\\n    mode: {\\n      handler() {\\n        this.category = '전체';\\n        this.query = '';\\n        this.codeTab = 'css';\\n        this.copied = false;\\n      }\\n    }\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"css-guide\\">\\n    <header class=\\"css-guide__intro\\">\\n      <span class=\\"css-guide__eyebrow\\">CSS3 · MODERN CSS</span>\\n      <h1>\\n        CSS3 실무 가이드\\n        <small>{{ patterns.length }}개 패턴 · {{ tips.length }}개 팁</small>\\n      </h1>\\n      <p>\\n        필요한 버튼을 누르면 아래에 컬러 소스가 표시됩니다. 레이아웃부터 현대 CSS와 실무\\n        문제 해결까지, Sass 없이 쓸 수 있는 CSS와 HTML을 제공합니다.\\n      </p>\\n    </header>\\n    <nav class=\\"css-guide__modes\\" aria-label=\\"CSS3 가이드 종류\\">\\n      <button type=\\"button\\" :aria-pressed=\\"mode === 'patterns'\\" @click=\\"mode = 'patterns'\\">\\n        CSS3 패턴 · {{ patterns.length }}\\n      </button>\\n      <button type=\\"button\\" :aria-pressed=\\"mode === 'tips'\\" @click=\\"mode = 'tips'\\">\\n        실무 팁 · {{ tips.length }}\\n      </button>\\n    </nav>\\n    <section class=\\"css-guide__picker\\" aria-label=\\"CSS 패턴과 팁 선택\\">\\n      <div class=\\"css-guide__filters\\">\\n        <label>\\n          CSS 검색\\n          <input\\n            v-model=\\"query\\"\\n            type=\\"search\\"\\n            placeholder=\\"grid, overflow, 포커스, 우선순위…\\"\\n          />\\n        </label>\\n        <label>\\n          CSS 분야\\n          <select v-model=\\"category\\">\\n            <option>전체</option>\\n            <option v-for=\\"name in categories\\" :key=\\"name\\">{{ name }}</option>\\n          </select>\\n        </label>\\n      </div>\\n      <section v-for=\\"group in groups\\" :key=\\"group.name\\" class=\\"css-guide__group\\">\\n        <h2>\\n          {{ group.name }}\\n          <small>{{ group.items.length }}</small>\\n        </h2>\\n        <div class=\\"css-guide__buttons\\">\\n          <button\\n            v-for=\\"item in group.items\\"\\n            :key=\\"item.id\\"\\n            type=\\"button\\"\\n            :aria-pressed=\\"active.id === item.id\\"\\n            :title=\\"item.description\\"\\n            @click=\\"select(item.id)\\"\\n          >\\n            <strong>{{ item.title }}</strong>\\n            <span>{{ item.properties.slice(0, 3).join(' · ') }}</span>\\n          </button>\\n        </div>\\n      </section>\\n      <p v-if=\\"!groups.length\\" role=\\"status\\">\\n        검색 결과가 없습니다. 검색어나 분야를 바꿔 주세요.\\n      </p>\\n      <footer class=\\"css-guide__selection\\" role=\\"status\\">\\n        <span>\\n          선택한 {{ mode === 'patterns' ? '패턴' : '팁' }}:\\n          <strong>{{ active.title }}</strong>\\n        </span>\\n        <button\\n          type=\\"button\\"\\n          @click=\\"$refs.resultPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' })\\"\\n        >\\n          선택한 소스 보기 ↓\\n        </button>\\n      </footer>\\n    </section>\\n    <section ref=\\"resultPanel\\" class=\\"css-guide__result\\" aria-label=\\"선택한 CSS3 소스\\">\\n      <header class=\\"css-guide__heading\\">\\n        <div>\\n          <span class=\\"css-guide__eyebrow\\">{{ active.category }}</span>\\n          <h2>\\n            <Palette :size=\\"20\\" />\\n            {{ active.title }}\\n          </h2>\\n          <p>{{ active.description }}</p>\\n        </div>\\n        <div class=\\"css-guide__downloads\\">\\n          <button type=\\"button\\" @click=\\"download('css')\\">\\n            <Download :size=\\"15\\" />\\n            전체 CSS 다운로드\\n          </button>\\n          <button type=\\"button\\" @click=\\"download('html')\\">.html 예제 다운로드</button>\\n        </div>\\n      </header>\\n      <div class=\\"css-guide__tags\\">\\n        <code v-for=\\"property in active.properties\\" :key=\\"property\\">{{ property }}</code>\\n      </div>\\n      <section class=\\"css-guide__notes\\">\\n        <h3>{{ mode === 'tips' ? '원인과 해결 방법' : '핵심 설명' }}</h3>\\n        <ol>\\n          <li v-for=\\"step in active.steps\\" :key=\\"step\\">{{ step }}</li>\\n        </ol>\\n      </section>\\n      <aside class=\\"css-guide__pitfall\\">\\n        <strong>실무 체크 포인트</strong>\\n        <p>{{ active.pitfall }}</p>\\n      </aside>\\n      <section class=\\"css-guide__preview\\">\\n        <button\\n          type=\\"button\\"\\n          :aria-expanded=\\"previewOpen\\"\\n          aria-controls=\\"css3-preview\\"\\n          @click=\\"previewOpen = !previewOpen\\"\\n        >\\n          {{ previewOpen ? '화면 접기' : '화면보기' }}\\n        </button>\\n        <div v-if=\\"previewOpen\\" id=\\"css3-preview\\">\\n          <div class=\\"css-guide__filters\\">\\n            <label>\\n              미리보기 뷰포트 {{ previewWidth }}px\\n              <input\\n                v-model.number=\\"previewWidth\\"\\n                type=\\"range\\"\\n                min=\\"280\\"\\n                max=\\"1440\\"\\n                step=\\"20\\"\\n                aria-label=\\"CSS3 미리보기 너비\\"\\n              />\\n            </label>\\n            <label>\\n              미리보기 테마\\n              <select v-model=\\"previewTheme\\">\\n                <option value=\\"app\\">앱 테마</option>\\n                <option value=\\"light\\">밝게</option>\\n                <option value=\\"dark\\">어둡게</option>\\n              </select>\\n            </label>\\n          </div>\\n          <p class=\\"css-guide__muted\\">\\n            프레임은 실제 CSS를 렌더링합니다. 넓은 화면은 안쪽에서 가로 스크롤할 수\\n            있습니다. 서버 제출·앱 이벤트는 실행하지 않으며 인쇄·터치·모션 설정은 실제\\n            환경에서도 확인하세요.\\n          </p>\\n          <div class=\\"css-guide__frame-wrap\\">\\n            <iframe\\n              :key=\\"active.id\\"\\n              :srcdoc=\\"preview\\"\\n              sandbox=\\"\\"\\n              referrerpolicy=\\"no-referrer\\"\\n              :title=\\"active.title + ' CSS 화면보기'\\"\\n              :style=\\"{ width: previewWidth + 'px' }\\"\\n            />\\n          </div>\\n        </div>\\n      </section>\\n      <nav class=\\"css-guide__tabs\\" aria-label=\\"CSS3 소스 형식\\">\\n        <button\\n          v-for=\\"tab in tabs\\"\\n          :key=\\"tab.id\\"\\n          type=\\"button\\"\\n          :aria-pressed=\\"codeTab === tab.id\\"\\n          @click=\\"\\n            codeTab = tab.id;\\n            copied = false;\\n          \\"\\n        >\\n          {{ tab.label }}\\n        </button>\\n        <button\\n          class=\\"css-guide__copy\\"\\n          type=\\"button\\"\\n          aria-label=\\"CSS3 선택한 소스 복사\\"\\n          @click=\\"copy(code, codeTab === 'css' || codeTab === 'base' ? 'CSS' : 'HTML')\\"\\n        >\\n          <Check v-if=\\"copied\\" :size=\\"15\\" />\\n          <Copy v-else :size=\\"15\\" />\\n          {{ copied ? '복사됨' : '소스 복사' }}\\n        </button>\\n        <button\\n          type=\\"button\\"\\n          @click=\\"copy(buildCssStyles(active, themeVariables), '전체 CSS')\\"\\n        >\\n          전체 CSS 복사\\n        </button>\\n      </nav>\\n      <SyntaxCode\\n        :code=\\"code\\"\\n        :language=\\"codeTab === 'css' || codeTab === 'base' ? 'css' : 'html'\\"\\n        label=\\"CSS3 예제 소스\\"\\n        class=\\"css-guide__source\\"\\n      />\\n      <p class=\\"css-guide__muted\\">\\n        CSS 패턴에는 var(--primary) 같은 공통 변수가 포함될 수 있습니다. 이 프로젝트 밖에서\\n        쓸 때는 ‘전체 CSS 복사’나 ‘공통 기본 CSS’를 함께 사용하세요. 전체 HTML 문서는\\n        CSS까지 포함하며, HTML의 id와 클래스는 프로젝트에 맞게 바꿔 적용하세요.\\n      </p>\\n    </section>\\n    <footer class=\\"css-guide__references\\">\\n      <span>참고 문서:</span>\\n      <a\\n        href=\\"https://developer.mozilla.org/en-US/docs/Web/CSS/Reference\\"\\n        target=\\"_blank\\"\\n        rel=\\"noopener noreferrer\\"\\n      >\\n        MDN CSS 참고서\\n      </a>\\n      <a\\n        href=\\"https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction\\"\\n        target=\\"_blank\\"\\n        rel=\\"noopener noreferrer\\"\\n      >\\n        CSS 우선순위와 캐스케이드\\n      </a>\\n    </footer>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/mixins' as *;\\n.css-guide {\\n  display: grid;\\n  gap: 24px;\\n  min-width: 0;\\n  &__intro,\\n  &__picker,\\n  &__result {\\n    @include card-surface;\\n    padding: 24px;\\n    min-width: 0;\\n  }\\n  &__intro {\\n    h1 {\\n      font-size: 27px;\\n      margin: 8px 0 12px;\\n      small {\\n        font-size: 12px;\\n        color: var(--primary);\\n        margin-left: 8px;\\n      }\\n    }\\n    p {\\n      font-size: 13px;\\n      line-height: 1.9;\\n      margin-top: 8px;\\n    }\\n  }\\n  &__eyebrow {\\n    color: var(--primary);\\n    font-size: 10px;\\n    letter-spacing: 1px;\\n  }\\n  &__muted {\\n    color: var(--muted);\\n    font-size: 12px;\\n    line-height: 1.9;\\n  }\\n  &__modes {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 8px;\\n    button {\\n      padding: 12px 18px;\\n      font-size: 13px;\\n      font-weight: 600;\\n      &[aria-pressed='true'] {\\n        background: var(--primary);\\n        color: white;\\n      }\\n    }\\n  }\\n  &__downloads {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 8px;\\n  }\\n  &__pitfall {\\n    padding: 16px;\\n    border: 1px solid var(--border);\\n    border-radius: 10px;\\n    strong {\\n      font-size: 13px;\\n    }\\n    p {\\n      font-size: 12px;\\n      line-height: 1.9;\\n      margin-top: 8px;\\n      color: var(--muted);\\n    }\\n  }\\n  &__preview {\\n    display: grid;\\n    gap: 14px;\\n    > button {\\n      justify-self: start;\\n      font-size: 12px;\\n    }\\n  }\\n  &__frame-wrap {\\n    @include custom-scrollbar;\\n    overflow-x: auto;\\n    max-width: 100%;\\n    margin-top: 14px;\\n    border: 1px solid var(--border);\\n    border-radius: 10px;\\n    iframe {\\n      display: block;\\n      height: 440px;\\n      max-width: none;\\n      border: 0;\\n      background: var(--surface);\\n    }\\n  }\\n  &__picker {\\n    display: grid;\\n    gap: 24px;\\n  }\\n  &__filters {\\n    display: grid;\\n    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);\\n    gap: 14px;\\n    label {\\n      display: grid;\\n      gap: 8px;\\n      font-size: 12px;\\n    }\\n    input,\\n    select {\\n      width: 100%;\\n      min-width: 0;\\n    }\\n  }\\n  &__group h2 {\\n    font-size: 14px;\\n    margin-bottom: 12px;\\n    small {\\n      color: var(--muted);\\n      font-size: 11px;\\n      margin-left: 6px;\\n    }\\n  }\\n  &__buttons {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));\\n    gap: 9px;\\n    button {\\n      @include focus-ring;\\n      display: grid;\\n      gap: 7px;\\n      text-align: left;\\n      padding: 13px;\\n      min-width: 0;\\n      strong {\\n        font-size: 12px;\\n      }\\n      span {\\n        font-size: 10px;\\n        color: var(--muted);\\n        overflow-wrap: anywhere;\\n      }\\n      &[aria-pressed='true'] {\\n        background: var(--soft);\\n        color: var(--primary);\\n        border-color: var(--primary);\\n      }\\n    }\\n  }\\n  &__selection {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: center;\\n    justify-content: space-between;\\n    gap: 10px;\\n    padding-top: 16px;\\n    border-top: 1px solid var(--border);\\n    font-size: 12px;\\n    button {\\n      font-size: 12px;\\n    }\\n  }\\n  &__result {\\n    display: grid;\\n    gap: 18px;\\n    scroll-margin-top: 100px;\\n  }\\n  &__heading {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: start;\\n    justify-content: space-between;\\n    gap: 12px;\\n    h2 {\\n      display: flex;\\n      align-items: center;\\n      gap: 9px;\\n      font-size: 21px;\\n      margin: 8px 0;\\n    }\\n    p {\\n      font-size: 12px;\\n      color: var(--muted);\\n    }\\n    button {\\n      display: flex;\\n      align-items: center;\\n      gap: 6px;\\n      font-size: 12px;\\n    }\\n  }\\n  &__tags {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 8px;\\n    code {\\n      padding: 4px 8px;\\n      background: var(--soft);\\n      color: var(--primary);\\n      border-radius: 6px;\\n      font-size: 12px;\\n    }\\n  }\\n  &__notes {\\n    background: var(--canvas);\\n    padding: 16px;\\n    border-radius: 10px;\\n    h3 {\\n      font-size: 13px;\\n      margin-bottom: 8px;\\n    }\\n    ol {\\n      padding-left: 20px;\\n    }\\n    li {\\n      font-size: 12px;\\n      line-height: 1.9;\\n      margin-top: 6px;\\n    }\\n  }\\n  &__preview-heading {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: center;\\n    gap: 12px;\\n    button {\\n      font-size: 12px;\\n    }\\n    span {\\n      font-size: 11px;\\n      color: var(--muted);\\n    }\\n  }\\n  &__frame {\\n    width: 100%;\\n    height: 380px;\\n    border: 1px solid var(--border);\\n    border-radius: 10px;\\n    background: var(--surface);\\n  }\\n  &__tabs {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 7px;\\n    button {\\n      display: flex;\\n      align-items: center;\\n      gap: 7px;\\n      font-size: 12px;\\n      &[aria-pressed='true'] {\\n        background: var(--soft);\\n        color: var(--primary);\\n        border-color: var(--primary);\\n      }\\n    }\\n  }\\n  &__copy {\\n    margin-left: auto;\\n  }\\n  &__source {\\n    border-radius: 10px;\\n  }\\n  &__references {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 12px;\\n    font-size: 11px;\\n    color: var(--muted);\\n    a {\\n      color: var(--primary);\\n    }\\n  }\\n  @include responsive(mobile) {\\n    &__intro,\\n    &__picker,\\n    &__result {\\n      padding: 18px;\\n    }\\n    &__filters {\\n      grid-template-columns: minmax(0, 1fr);\\n    }\\n    &__copy {\\n      margin-left: 0;\\n    }\\n  }\\n}\\n</style>\\n"}`),"1542-c2130a9e-da3bb1ee":{file:"src/views/dashboard/analytics.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ActivityChart from '@/components/common/ActivityChart.vue';
export default {
  name: 'Analytics',
  components: {
    ActivityChart
  },
  data() {
    const period = 'week';
    const metrics = [
      ['방문자', '38,492'],
      ['페이지뷰', '128,940'],
      ['평균 체류', '3m 42s'],
      ['이탈률', '28.4%']
    ];
    return {
      period,
      metrics
    };
  },
  computed: {
    values() {
      return this.period === 'week'
        ? [22, 41, 35, 68, 52, 73, 65, 92]
        : [31, 25, 48, 44, 61, 70, 58, 88];
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <header class="demo__row">
      <h2>Audience overview</h2>
      <label>
        기간
        <select v-model="period">
          <option value="week">이번 주</option>
          <option value="month">이번 달</option>
        </select>
      </label>
    </header>
    <section class="demo__grid">
      <article v-for="(metric, i) in metrics" :key="metric[0]" class="demo__panel metric">
        <small>{{ metric[0] }}</small>
        <strong>
          {{ period === 'week' ? metric[1] : ['128,240', '486,392', '4m 12s', '24.8%'][i] }}
        </strong>
        <p>↗ {{ 8 + i * 3 }}.2% 지난 기간 대비</p>
      </article>
    </section>
    <article class="demo__panel">
      <h3>추이 분석</h3>
      <ActivityChart :values="values" />
    </article>
    <p class="demo__muted">기간별 샘플 데이터를 사용한 인터랙티브 대시보드입니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.metric {
  display: grid;
  gap: 10px;
  small {
    color: var(--muted);
  }
  strong {
    font-size: 28px;
  }
  p {
    color: var(--success);
    font-size: 11px;
  }
}
</style>
`},"768-58cb173-4f3e1743":{file:"src/views/dashboard/charts.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ActivityChart from '@/components/common/ActivityChart.vue';
export default {
  name: 'Charts',
  components: {
    ActivityChart
  },
  data() {
    const mode = 'conversations';
    return {
      mode
    };
  },
  computed: {
    values() {
      return this.mode === 'conversations'
        ? [25, 40, 35, 60, 55, 80, 65, 95]
        : [18, 25, 32, 40, 48, 65, 72, 85];
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <label>
      지표
      <select v-model="mode">
        <option value="conversations">대화 수</option>
        <option value="contacts">신규 연락처</option>
      </select>
    </label>
    <ActivityChart :values="values" />
    <p class="demo__muted">순수 SVG · 키보드로 각 데이터 포인트에 접근할 수 있습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"24335-1455300f-d5fdb115":JSON.parse(`{"file":"src/views/dashboard/default.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport {\\n  ArrowUpRight,\\n  ArrowDownRight,\\n  ArrowRight,\\n  ChevronDown,\\n  Plus,\\n  Bot,\\n  MessageSquare,\\n  Users,\\n  Zap,\\n  MoreHorizontal,\\n  Activity,\\n  Check,\\n  ExternalLink,\\n  Sparkles,\\n  Clock3\\n} from 'lucide-vue-next';\\nimport ActivityChart from '@/components/common/ActivityChart.vue';\\nimport BaseBadge from '@/components/common/BaseBadge.vue';\\nimport BaseModal from '@/components/common/BaseModal.vue';\\nexport default {\\n  name: 'Default',\\n  components: {\\n    ArrowUpRight,\\n    ArrowRight,\\n    Plus,\\n    Zap,\\n    Activity,\\n    Check,\\n    Sparkles,\\n    Clock3,\\n    ActivityChart,\\n    BaseBadge,\\n    BaseModal\\n  },\\n  data() {\\n    const period = 'week';\\n    const createOpen = false;\\n    const name = '';\\n    const agentList = [\\n      {\\n        id: 1,\\n        name: 'Customer Support',\\n        description: '고객 문의를 더 빠르고 정확하게',\\n        icon: '◈',\\n        color: '#6366f1',\\n        runs: '12,486',\\n        rate: '98.2%',\\n        status: true\\n      },\\n      {\\n        id: 2,\\n        name: 'Content Creator',\\n        description: '아이디어를 매력적인 콘텐츠로',\\n        icon: '✧',\\n        color: '#e78cba',\\n        runs: '8,392',\\n        rate: '96.8%',\\n        status: true\\n      },\\n      {\\n        id: 3,\\n        name: 'Sales Assistant',\\n        description: '새로운 비즈니스 기회를 발견',\\n        icon: '↗',\\n        color: '#e7a95b',\\n        runs: '6,241',\\n        rate: '97.4%',\\n        status: true\\n      }\\n    ];\\n    return {\\n      period,\\n      createOpen,\\n      name,\\n      agentList\\n    };\\n  },\\n  computed: {\\n    values() {\\n      return this.period === 'week'\\n        ? [28, 35, 31, 51, 46, 65, 53, 70, 65, 85, 76, 92]\\n        : [22, 40, 32, 56, 50, 42, 63, 58, 78, 67, 87, 98];\\n    },\\n    stats() {\\n      return [\\n        {\\n          label: 'Total conversations',\\n          value: this.period === 'week' ? '24,892' : '98,642',\\n          change: '+18.6%',\\n          icon: MessageSquare,\\n          color: 'violet',\\n          bars: [30, 45, 35, 58, 43, 70, 53, 78, 65, 88]\\n        },\\n        {\\n          label: 'Active AI agents',\\n          value: String(this.agentList.filter((a) => a.status).length + 9).padStart(2, '0'),\\n          change: '+2 agents',\\n          icon: Bot,\\n          color: 'blue',\\n          bars: [35, 35, 48, 48, 60, 60, 65, 65, 88, 88]\\n        },\\n        {\\n          label: 'Total contacts',\\n          value: '8,549',\\n          change: '+12.8%',\\n          icon: Users,\\n          color: 'orange',\\n          bars: [20, 34, 40, 31, 50, 65, 55, 70, 72, 90]\\n        },\\n        {\\n          label: 'Automation rate',\\n          value: '94.2%',\\n          change: '+5.2%',\\n          icon: Zap,\\n          color: 'green',\\n          bars: [36, 47, 32, 55, 50, 70, 55, 82, 75, 95]\\n        }\\n      ];\\n    }\\n  },\\n  methods: {\\n    create() {\\n      if (!this.name.trim()) return;\\n      this.agentList.push({\\n        id: Date.now(),\\n        name: this.name.trim(),\\n        description: '새로운 커스텀 에이전트',\\n        icon: '✦',\\n        color: '#6366f1',\\n        runs: '0',\\n        rate: '—',\\n        status: true\\n      });\\n      this.name = '';\\n      this.createOpen = false;\\n    }\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"dashboard\\">\\n    <header class=\\"dashboard__heading\\">\\n      <section>\\n        <div class=\\"dashboard__eyebrow\\">\\n          <span />\\n          YOUR WORKSPACE, AT A GLANCE\\n        </div>\\n        <h1>\\n          조금 더 스마트한 하루를 시작하세요\\n          <span>✦</span>\\n        </h1>\\n        <p>Welcome back, Jise! 오늘의 에이전트와 워크스페이스 현황을 확인하세요.</p>\\n      </section>\\n      <div class=\\"dashboard__controls\\">\\n        <label>\\n          <Clock3 :size=\\"14\\" />\\n          <select v-model=\\"period\\" aria-label=\\"통계 기간\\">\\n            <option value=\\"week\\">이번 주</option>\\n            <option value=\\"month\\">이번 달</option>\\n          </select>\\n        </label>\\n        <button class=\\"dashboard__primary\\" @click=\\"createOpen = true\\">\\n          <Plus :size=\\"15\\" />\\n          새 에이전트\\n        </button>\\n      </div>\\n    </header>\\n    <article class=\\"dashboard__welcome\\">\\n      <section>\\n        <span class=\\"dashboard__welcome-label\\">\\n          <Sparkles :size=\\"13\\" />\\n          YOUR NEXT CHAPTER STARTS HERE\\n        </span>\\n        <h2>\\n          아이디어에 집중하세요.\\n          <br />\\n          나머지는 Vue가 도와줄게요.\\n        </h2>\\n        <p>\\n          작게 시작하고, 더 크게 만들어 보세요.\\n          <br />\\n          실무에 바로 쓰는 Vue 3 패턴과 컴포넌트가 준비되어 있어요.\\n        </p>\\n        <RouterLink to=\\"/vue-syntax/conditional\\">\\n          레퍼런스 둘러보기\\n          <ArrowUpRight :size=\\"15\\" />\\n        </RouterLink>\\n      </section>\\n      <figure class=\\"dashboard__art\\" aria-label=\\"컴포넌트와 코드를 표현한 일러스트\\">\\n        <div class=\\"dashboard__orbit dashboard__orbit--one\\" />\\n        <div class=\\"dashboard__orbit dashboard__orbit--two\\" />\\n        <div class=\\"dashboard__floating dashboard__floating--code\\">\\n          <span>● ● ●</span>\\n          <code>\\n            &lt;script setup&gt;\\n            <br />\\n            &nbsp;const ideas = ref(∞)\\n            <br />\\n            &lt;/script&gt;\\n          </code>\\n        </div>\\n        <div class=\\"dashboard__floating dashboard__floating--vue\\">\\n          <svg viewBox=\\"0 0 100 85\\" role=\\"img\\" aria-label=\\"Vue 로고\\">\\n            <path d=\\"M0 0h20l30 50L80 0h20L50 85Z\\" fill=\\"#42b883\\" />\\n            <path d=\\"M20 0h17l13 22L63 0h17L50 50Z\\" fill=\\"#35495e\\" />\\n          </svg>\\n        </div>\\n        <div class=\\"dashboard__floating dashboard__floating--success\\">\\n          <span>✓</span>\\n          Ready to build\\n          <small>Vue 3 + Composition API</small>\\n        </div>\\n        <i class=\\"dashboard__spark dashboard__spark--one\\">✦</i>\\n        <i class=\\"dashboard__spark dashboard__spark--two\\">✧</i>\\n      </figure>\\n      <span class=\\"dashboard__welcome-tag\\">DESIGNED FOR DEVELOPERS ↗</span>\\n    </article>\\n    <section class=\\"dashboard__stats\\" aria-label=\\"주요 통계\\">\\n      <article v-for=\\"stat in stats\\" :key=\\"stat.label\\" class=\\"dashboard__stat\\">\\n        <header>\\n          <span>{{ stat.label }}</span>\\n          <span class=\\"dashboard__stat-icon\\" :class=\\"\`dashboard__stat-icon--\${stat.color}\`\\">\\n            <component :is=\\"stat.icon\\" :size=\\"17\\" />\\n          </span>\\n        </header>\\n        <strong>{{ stat.value }}</strong>\\n        <footer>\\n          <span>\\n            <ArrowUpRight :size=\\"12\\" />\\n            {{ stat.change }}\\n          </span>\\n          <small>vs. last period</small>\\n          <svg viewBox=\\"0 0 90 30\\" aria-hidden=\\"true\\">\\n            <rect\\n              v-for=\\"(bar, i) in stat.bars\\"\\n              :key=\\"i\\"\\n              :x=\\"i * 9\\"\\n              :y=\\"30 - bar * 0.3\\"\\n              width=\\"5\\"\\n              :height=\\"bar * 0.3\\"\\n              rx=\\"1.5\\"\\n              :fill=\\"i > 6 ? '#818cf8' : '#dce0fd'\\"\\n            />\\n          </svg>\\n        </footer>\\n      </article>\\n    </section>\\n    <section class=\\"dashboard__middle\\">\\n      <article class=\\"dashboard__panel dashboard__activity\\">\\n        <header class=\\"dashboard__panel-heading\\">\\n          <section>\\n            <h2>\\n              활동 개요\\n              <span class=\\"dashboard__tiny-dot\\" />\\n            </h2>\\n            <p>에이전트가 만들어내는 변화를 확인하세요</p>\\n          </section>\\n          <select v-model=\\"period\\" aria-label=\\"차트 기간\\">\\n            <option value=\\"week\\">이번 주</option>\\n            <option value=\\"month\\">이번 달</option>\\n          </select>\\n        </header>\\n        <div class=\\"dashboard__activity-stats\\">\\n          <strong>\\n            {{ period === 'week' ? '48,392' : '182,640' }}\\n            <small>total executions</small>\\n          </strong>\\n          <span>\\n            ↗ 24.8%\\n            <small>지난 기간 대비</small>\\n          </span>\\n          <div class=\\"dashboard__legend\\">\\n            <span>이번 기간</span>\\n            <span>이전 기간</span>\\n          </div>\\n        </div>\\n        <ActivityChart :values=\\"values\\" :height=\\"215\\" />\\n      </article>\\n      <article class=\\"dashboard__panel dashboard__performance\\">\\n        <header class=\\"dashboard__panel-heading\\">\\n          <section>\\n            <h2>워크스페이스 성과</h2>\\n            <p>작은 자동화가 만드는 큰 차이</p>\\n          </section>\\n          <Activity :size=\\"17\\" />\\n        </header>\\n        <figure class=\\"dashboard__donut\\">\\n          <svg viewBox=\\"0 0 160 160\\" role=\\"img\\" aria-label=\\"자동화 성공률 94.2퍼센트\\">\\n            <circle\\n              cx=\\"80\\"\\n              cy=\\"80\\"\\n              r=\\"65\\"\\n              fill=\\"none\\"\\n              stroke=\\"var(--soft)\\"\\n              stroke-width=\\"12\\"\\n            />\\n            <circle\\n              cx=\\"80\\"\\n              cy=\\"80\\"\\n              r=\\"65\\"\\n              fill=\\"none\\"\\n              stroke=\\"#818cf8\\"\\n              stroke-width=\\"12\\"\\n              stroke-linecap=\\"round\\"\\n              stroke-dasharray=\\"385 409\\"\\n              transform=\\"rotate(-90 80 80)\\"\\n            />\\n          </svg>\\n          <figcaption>\\n            <strong>\\n              94.2\\n              <small>%</small>\\n            </strong>\\n            <span>성공적으로 완료</span>\\n          </figcaption>\\n        </figure>\\n        <div class=\\"dashboard__performance-row\\">\\n          <span>\\n            <i />\\n            성공한 실행\\n          </span>\\n          <strong>45,585</strong>\\n        </div>\\n        <div class=\\"dashboard__performance-row\\">\\n          <span>\\n            <i />\\n            검토가 필요한 실행\\n          </span>\\n          <strong>2,807</strong>\\n        </div>\\n        <footer>\\n          <Check :size=\\"13\\" />\\n          지난주보다 5.2% 더 효율적이에요\\n        </footer>\\n      </article>\\n    </section>\\n    <section class=\\"dashboard__bottom\\">\\n      <article class=\\"dashboard__panel dashboard__agents\\">\\n        <header class=\\"dashboard__panel-heading\\">\\n          <section>\\n            <h2>\\n              나의 AI 에이전트\\n              <small>{{ agentList.length }}</small>\\n            </h2>\\n            <p>함께 일하는 가장 든든한 팀원들</p>\\n          </section>\\n          <button @click=\\"createOpen = true\\">\\n            에이전트 추가\\n            <Plus :size=\\"13\\" />\\n          </button>\\n        </header>\\n        <div class=\\"dashboard__table\\">\\n          <table>\\n            <thead>\\n              <tr>\\n                <th>에이전트</th>\\n                <th>상태</th>\\n                <th>실행 수</th>\\n                <th>성공률</th>\\n                <th><span class=\\"dashboard__sr\\">상세</span></th>\\n              </tr>\\n            </thead>\\n            <tbody>\\n              <tr v-for=\\"agent in agentList\\" :key=\\"agent.id\\">\\n                <td>\\n                  <div class=\\"dashboard__agent-name\\">\\n                    <span :style=\\"{ background: agent.color + '18', color: agent.color }\\">\\n                      {{ agent.icon }}\\n                    </span>\\n                    <section>\\n                      <strong>{{ agent.name }}</strong>\\n                      <p>{{ agent.description }}</p>\\n                    </section>\\n                  </div>\\n                </td>\\n                <td>\\n                  <button\\n                    class=\\"dashboard__status\\"\\n                    :aria-label=\\"agent.name + ' 활성 상태 전환'\\"\\n                    @click=\\"agent.status = !agent.status\\"\\n                  >\\n                    <BaseBadge :tone=\\"agent.status ? 'success' : 'warning'\\">\\n                      ● {{ agent.status ? 'Active' : 'Paused' }}\\n                    </BaseBadge>\\n                  </button>\\n                </td>\\n                <td>{{ agent.runs }}</td>\\n                <td>{{ agent.rate }}</td>\\n                <td>\\n                  <RouterLink to=\\"/apps/chat\\" :aria-label=\\"agent.name + ' 채팅 열기'\\">\\n                    <ArrowUpRight :size=\\"16\\" />\\n                  </RouterLink>\\n                </td>\\n              </tr>\\n            </tbody>\\n          </table>\\n        </div>\\n      </article>\\n      <article class=\\"dashboard__panel dashboard__quick\\">\\n        <header class=\\"dashboard__panel-heading\\">\\n          <section>\\n            <h2>빠르게 시작하기</h2>\\n            <p>오늘은 무엇을 만들어 볼까요?</p>\\n          </section>\\n          <Zap :size=\\"17\\" />\\n        </header>\\n        <RouterLink\\n          v-for=\\"(item, i) in [\\n            {\\n              title: 'Vue 기본 문법',\\n              text: '기초부터 탄탄하게, 6가지 핵심 문법',\\n              path: '/vue-syntax/conditional',\\n              icon: '⌘'\\n            },\\n            {\\n              title: '실무 패턴 모음',\\n              text: '반복되는 고민, 검증된 패턴으로',\\n              path: '/vue-patterns/async',\\n              icon: '◈'\\n            },\\n            {\\n              title: 'UI 컴포넌트',\\n              text: '바로 가져다 쓰는 아름다운 UI',\\n              path: '/ui-kits/buttons',\\n              icon: '▦'\\n            }\\n          ]\\"\\n          :key=\\"item.path\\"\\n          :to=\\"item.path\\"\\n          class=\\"dashboard__quick-link\\"\\n        >\\n          <span :class=\\"\`dashboard__quick-icon--\${i}\`\\">{{ item.icon }}</span>\\n          <section>\\n            <strong>{{ item.title }}</strong>\\n            <p>{{ item.text }}</p>\\n          </section>\\n          <ArrowRight :size=\\"15\\" />\\n        </RouterLink>\\n        <footer>\\n          <span>✧</span>\\n          모든 예제에 소스 코드가 포함되어 있어요.\\n        </footer>\\n      </article>\\n    </section>\\n    <BaseModal v-model=\\"createOpen\\" title=\\"새 AI 에이전트\\">\\n      <form class=\\"demo\\" @submit.prevent=\\"create\\">\\n        <label class=\\"demo__field\\">\\n          에이전트 이름\\n          <input\\n            v-model=\\"name\\"\\n            required\\n            maxlength=\\"60\\"\\n            placeholder=\\"예: Research Assistant\\"\\n          />\\n        </label>\\n        <p class=\\"demo__muted\\">이 데모의 에이전트는 현재 세션에서 관리됩니다.</p>\\n        <button class=\\"demo__primary\\" type=\\"submit\\" :disabled=\\"!name.trim()\\">\\n          에이전트 생성\\n        </button>\\n      </form>\\n    </BaseModal>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/mixins' as *;\\n.dashboard {\\n  display: grid;\\n  gap: 23px;\\n  &__heading {\\n    @include flex-between;\\n    align-items: flex-end;\\n    h1 {\\n      font-size: 23px;\\n      font-weight: 650;\\n      letter-spacing: -0.9px;\\n      line-height: 1.5;\\n      span {\\n        color: #b8a4e4;\\n        font-size: 24px;\\n      }\\n    }\\n    p {\\n      font-size: 11px;\\n      color: var(--caption);\\n      margin-top: 7px;\\n    }\\n  }\\n  &__eyebrow {\\n    font-size: 8px;\\n    letter-spacing: 1.5px;\\n    color: var(--muted);\\n    margin-bottom: 9px;\\n    display: flex;\\n    align-items: center;\\n    gap: 7px;\\n    span {\\n      width: 5px;\\n      height: 5px;\\n      background: var(--success);\\n      border-radius: 50%;\\n    }\\n  }\\n  &__controls {\\n    display: flex;\\n    gap: 9px;\\n    flex-shrink: 0;\\n    label {\\n      border: 1px solid var(--border);\\n      border-radius: 8px;\\n      padding: 0 10px;\\n      background: var(--surface);\\n      color: var(--muted);\\n    }\\n    select {\\n      border: 0;\\n      padding: 8px 2px;\\n      font-size: 10px;\\n    }\\n    button {\\n      font-size: 10px;\\n      display: flex;\\n      align-items: center;\\n      gap: 6px;\\n    }\\n  }\\n  &__primary {\\n    background: var(--primary);\\n    border-color: var(--primary);\\n    color: white;\\n    box-shadow: 0 4px 10px #6366f122;\\n  }\\n  &__welcome {\\n    position: relative;\\n    overflow: hidden;\\n    min-height: 230px;\\n    background: linear-gradient(110deg, #efedff, #f2effc 52%, #e9e8fb);\\n    border: 1px solid #e6e1fc;\\n    border-radius: 16px;\\n    padding: 28px 32px;\\n    color: #343151;\\n    display: flex;\\n    align-items: center;\\n    section {\\n      position: relative;\\n      z-index: 2;\\n    }\\n    h2 {\\n      font-size: 25px;\\n      letter-spacing: -0.8px;\\n      line-height: 1.45;\\n      margin: 10px 0;\\n    }\\n    p {\\n      font-size: 11px;\\n      color: #85809c;\\n      line-height: 1.8;\\n    }\\n    a {\\n      display: inline-flex;\\n      gap: 16px;\\n      align-items: center;\\n      background: white;\\n      border: 1px solid #e1dcf3;\\n      padding: 8px 13px;\\n      border-radius: 7px;\\n      font-size: 10px;\\n      font-weight: 650;\\n      margin-top: 15px;\\n    }\\n  }\\n  &__welcome-label {\\n    font-size: 8px;\\n    letter-spacing: 1.4px;\\n    display: flex;\\n    align-items: center;\\n    gap: 6px;\\n    color: #8c7fb3;\\n  }\\n  &__welcome-tag {\\n    position: absolute;\\n    right: 18px;\\n    bottom: 14px;\\n    font-size: 7px;\\n    letter-spacing: 1.3px;\\n    color: #a9a0c5;\\n  }\\n  &__art {\\n    position: absolute;\\n    right: 25px;\\n    top: 0;\\n    width: 440px;\\n    height: 100%;\\n    margin: 0;\\n    perspective: 800px;\\n  }\\n  &__orbit {\\n    position: absolute;\\n    width: 320px;\\n    height: 320px;\\n    border: 1px solid #d8d2ef99;\\n    border-radius: 50%;\\n    left: 80px;\\n    top: -10px;\\n    &--two {\\n      width: 420px;\\n      height: 420px;\\n      left: 30px;\\n      top: -60px;\\n    }\\n  }\\n  &__floating {\\n    position: absolute;\\n    border: 1px solid #fff;\\n    background: #ffffffda;\\n    box-shadow: 0 15px 35px #8b7bae20;\\n    backdrop-filter: blur(8px);\\n    &--code {\\n      left: 20px;\\n      top: 50px;\\n      transform: rotate(-7deg);\\n      width: 210px;\\n      border-radius: 11px;\\n      padding: 14px;\\n      span {\\n        display: block;\\n        font-size: 7px;\\n        color: #c4badc;\\n        margin-bottom: 10px;\\n      }\\n      code {\\n        font-size: 11px;\\n        color: #9383b5;\\n        line-height: 1.9;\\n      }\\n    }\\n    &--vue {\\n      right: 45px;\\n      top: 42px;\\n      width: 118px;\\n      height: 125px;\\n      transform: rotate(12deg);\\n      border-radius: 22px;\\n      display: grid;\\n      place-items: center;\\n      svg {\\n        width: 72px;\\n      }\\n    }\\n    &--success {\\n      right: 100px;\\n      bottom: 24px;\\n      transform: rotate(-5deg);\\n      padding: 10px 18px 10px 42px;\\n      border-radius: 10px;\\n      font-size: 11px;\\n      font-weight: 600;\\n      span {\\n        position: absolute;\\n        left: 12px;\\n        top: 14px;\\n        background: #d9f9ec;\\n        color: #10b981;\\n        border-radius: 50%;\\n        padding: 0 4px;\\n      }\\n      small {\\n        display: block;\\n        color: #b1a7c8;\\n        font-size: 8px;\\n        font-weight: 400;\\n      }\\n    }\\n  }\\n  &__spark {\\n    position: absolute;\\n    color: #a290cf;\\n    font-style: normal;\\n    &--one {\\n      left: 0;\\n      bottom: 32px;\\n      font-size: 26px;\\n    }\\n    &--two {\\n      right: 9px;\\n      top: 24px;\\n      font-size: 38px;\\n    }\\n  }\\n  &__stats {\\n    display: grid;\\n    grid-template-columns: repeat(4, 1fr);\\n    gap: 18px;\\n  }\\n  &__stat {\\n    @include card-surface;\\n    padding: 18px 20px;\\n    header {\\n      @include flex-between;\\n      font-size: 10px;\\n      color: var(--muted);\\n    }\\n    > strong {\\n      display: block;\\n      font-size: 27px;\\n      letter-spacing: -0.7px;\\n      font-weight: 650;\\n      margin-top: 8px;\\n    }\\n    footer {\\n      display: flex;\\n      align-items: flex-end;\\n      gap: 5px;\\n      margin-top: 7px;\\n      position: relative;\\n      span {\\n        display: flex;\\n        align-items: center;\\n        gap: 2px;\\n        color: #10b981;\\n        font-size: 9px;\\n      }\\n      small {\\n        font-size: 8px;\\n        color: var(--caption);\\n      }\\n      > svg:last-child {\\n        margin-left: auto;\\n        width: 60px;\\n        height: 25px;\\n      }\\n    }\\n  }\\n  &__stat-icon {\\n    padding: 6px;\\n    border-radius: 8px;\\n    display: flex;\\n    &--violet {\\n      color: #8170dc;\\n      background: #f2efff;\\n    }\\n    &--blue {\\n      color: #63a1de;\\n      background: #edf5ff;\\n    }\\n    &--orange {\\n      color: #df9e54;\\n      background: #fff5e9;\\n    }\\n    &--green {\\n      color: #51b89c;\\n      background: #eafaf3;\\n    }\\n  }\\n  &__middle {\\n    display: grid;\\n    grid-template-columns: minmax(0, 1.95fr) minmax(260px, 1fr);\\n    gap: 22px;\\n  }\\n  &__panel {\\n    @include card-surface;\\n    overflow: hidden;\\n    padding: 21px 24px;\\n  }\\n  &__panel-heading {\\n    @include flex-between;\\n    align-items: flex-start;\\n    h2 {\\n      font-size: 13px;\\n      font-weight: 650;\\n      display: flex;\\n      align-items: center;\\n      gap: 7px;\\n      small {\\n        font-size: 9px;\\n        background: var(--soft);\\n        color: var(--primary);\\n        padding: 1px 5px;\\n        border-radius: 4px;\\n      }\\n    }\\n    p {\\n      font-size: 9px;\\n      color: var(--caption);\\n      margin-top: 4px;\\n    }\\n    select,\\n    button {\\n      font-size: 9px;\\n      padding: 5px 9px;\\n      display: flex;\\n      align-items: center;\\n      gap: 5px;\\n    }\\n    > svg {\\n      color: var(--caption);\\n    }\\n  }\\n  &__tiny-dot {\\n    background: var(--success);\\n    border-radius: 50%;\\n    width: 5px;\\n    height: 5px;\\n  }\\n  &__activity-stats {\\n    display: flex;\\n    align-items: center;\\n    gap: 18px;\\n    margin: 19px 0 10px;\\n    strong {\\n      font-size: 23px;\\n      font-weight: 650;\\n      small {\\n        display: block;\\n        font-weight: 400;\\n        font-size: 9px;\\n        color: var(--caption);\\n      }\\n    }\\n    > span {\\n      font-size: 10px;\\n      color: var(--success);\\n      small {\\n        display: block;\\n        font-size: 8px;\\n        color: var(--caption);\\n      }\\n    }\\n  }\\n  &__legend {\\n    margin-left: auto;\\n    font-size: 8px;\\n    color: var(--muted);\\n    display: flex;\\n    gap: 12px;\\n    span::before {\\n      content: '';\\n      display: inline-block;\\n      width: 6px;\\n      height: 6px;\\n      border-radius: 50%;\\n      background: var(--primary);\\n      margin-right: 5px;\\n    }\\n    span:last-child::before {\\n      background: #c7b4e9;\\n    }\\n  }\\n  &__donut {\\n    position: relative;\\n    width: 168px;\\n    height: 168px;\\n    margin: 17px auto 12px;\\n    svg {\\n      width: 100%;\\n    }\\n    figcaption {\\n      position: absolute;\\n      inset: 0;\\n      @include flex-center;\\n      flex-direction: column;\\n      strong {\\n        font-size: 30px;\\n        font-weight: 650;\\n        small {\\n          font-size: 18px;\\n        }\\n      }\\n      span {\\n        font-size: 9px;\\n        color: var(--caption);\\n      }\\n    }\\n  }\\n  &__performance-row {\\n    @include flex-between;\\n    font-size: 10px;\\n    margin: 9px 0;\\n    span {\\n      color: var(--muted);\\n      display: flex;\\n      align-items: center;\\n      gap: 7px;\\n    }\\n    i {\\n      width: 6px;\\n      height: 6px;\\n      border-radius: 50%;\\n      background: #818cf8;\\n    }\\n    &:last-of-type i {\\n      background: #e8e6f5;\\n    }\\n    strong {\\n      font-size: 10px;\\n      font-weight: 600;\\n    }\\n  }\\n  &__performance footer {\\n    border-top: 1px solid var(--border);\\n    margin-top: 13px;\\n    padding-top: 10px;\\n    font-size: 9px;\\n    color: var(--success);\\n    display: flex;\\n    align-items: center;\\n    gap: 6px;\\n    justify-content: center;\\n  }\\n  &__bottom {\\n    display: grid;\\n    grid-template-columns: minmax(0, 1.95fr) minmax(260px, 1fr);\\n    gap: 22px;\\n  }\\n  &__agents {\\n    padding-bottom: 6px;\\n  }\\n  &__table {\\n    position: relative;\\n    overflow: auto;\\n    margin: 17px -24px 0;\\n    table {\\n      font-size: 10px;\\n      white-space: nowrap;\\n    }\\n    th {\\n      font-size: 8px;\\n      font-weight: 500;\\n      padding: 9px 20px;\\n    }\\n    td {\\n      padding: 13px 20px;\\n    }\\n    tbody tr:last-child td {\\n      border-bottom: 0;\\n    }\\n  }\\n  &__agent-name {\\n    display: flex;\\n    align-items: center;\\n    gap: 10px;\\n    > span {\\n      display: grid;\\n      place-items: center;\\n      width: 33px;\\n      height: 33px;\\n      border-radius: 9px;\\n      font-size: 20px;\\n    }\\n    strong {\\n      font-size: 10px;\\n      font-weight: 600;\\n    }\\n    p {\\n      font-size: 8px;\\n      color: var(--caption);\\n      margin-top: 3px;\\n    }\\n  }\\n  &__status {\\n    padding: 0;\\n    border: 0;\\n    background: none;\\n  }\\n  &__quick-link {\\n    display: flex;\\n    align-items: center;\\n    gap: 11px;\\n    padding: 15px 0;\\n    border-bottom: 1px solid var(--border);\\n    > span {\\n      display: grid;\\n      place-items: center;\\n      width: 33px;\\n      height: 33px;\\n      border-radius: 9px;\\n      background: var(--soft);\\n      color: #9b87cc;\\n      font-size: 19px;\\n    }\\n    strong {\\n      font-size: 10px;\\n      font-weight: 600;\\n    }\\n    p {\\n      font-size: 8px;\\n      color: var(--caption);\\n      margin-top: 3px;\\n    }\\n    svg {\\n      margin-left: auto;\\n      color: var(--caption);\\n    }\\n  }\\n  &__quick-icon--1 {\\n    background: #eef6ff !important;\\n    color: #7aa3cd !important;\\n  }\\n  &__quick-icon--2 {\\n    background: #fff5e9 !important;\\n    color: #d5a36b !important;\\n  }\\n  &__quick footer {\\n    font-size: 8px;\\n    color: var(--caption);\\n    display: flex;\\n    gap: 5px;\\n    align-items: center;\\n    padding-top: 13px;\\n    span {\\n      color: var(--primary);\\n      font-size: 15px;\\n    }\\n  }\\n  &__sr {\\n    left: 0;\\n    top: 0;\\n    position: absolute;\\n    width: 1px;\\n    height: 1px;\\n    overflow: hidden;\\n    clip: rect(0, 0, 0, 0);\\n  }\\n  @include responsive(tablet) {\\n    &__heading {\\n      align-items: flex-start;\\n      h1 {\\n        font-size: 19px;\\n      }\\n    }\\n    &__art {\\n      right: -50px;\\n      transform: scale(0.85);\\n    }\\n    &__stats {\\n      grid-template-columns: repeat(2, 1fr);\\n    }\\n    &__middle,\\n    &__bottom {\\n      grid-template-columns: 1fr 1fr;\\n    }\\n    &__legend {\\n      display: none;\\n    }\\n    &__panel {\\n      padding: 20px;\\n    }\\n  }\\n  @include responsive(mobile) {\\n    gap: 18px;\\n    &__heading {\\n      flex-direction: column;\\n      gap: 15px;\\n      h1 {\\n        font-size: 20px;\\n      }\\n    }\\n    &__welcome {\\n      padding: 24px;\\n      min-height: 250px;\\n      h2 {\\n        font-size: 24px;\\n      }\\n    }\\n    &__art {\\n      opacity: 0.25;\\n      right: -140px;\\n    }\\n    &__welcome-tag {\\n      display: none;\\n    }\\n    &__stats {\\n      gap: 10px;\\n    }\\n    &__stat {\\n      padding: 15px;\\n      footer {\\n        flex-wrap: wrap;\\n        > svg:last-child {\\n          display: none;\\n        }\\n      }\\n    }\\n    &__middle,\\n    &__bottom {\\n      grid-template-columns: 1fr;\\n    }\\n    &__controls {\\n      width: 100%;\\n      justify-content: space-between;\\n    }\\n    &__panel-heading h2 {\\n      font-size: 14px;\\n    }\\n  }\\n}\\n</style>\\n"}`),"1548-2cc585fe-b33574f4":{file:"src/views/dashboard/ecommerce.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ActivityChart from '@/components/common/ActivityChart.vue';
export default {
  name: 'Ecommerce',
  components: {
    ActivityChart
  },
  data() {
    const period = 'week';
    const metrics = [
      ['총 매출', '₩12,840,000'],
      ['신규 주문', '284'],
      ['평균 주문액', '₩45,211'],
      ['전환율', '4.8%']
    ];
    return {
      period,
      metrics
    };
  },
  computed: {
    values() {
      return this.period === 'week'
        ? [22, 41, 35, 68, 52, 73, 65, 92]
        : [31, 25, 48, 44, 61, 70, 58, 88];
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <header class="demo__row">
      <h2>Store performance</h2>
      <label>
        기간
        <select v-model="period">
          <option value="week">이번 주</option>
          <option value="month">이번 달</option>
        </select>
      </label>
    </header>
    <section class="demo__grid">
      <article v-for="(metric, i) in metrics" :key="metric[0]" class="demo__panel metric">
        <small>{{ metric[0] }}</small>
        <strong>
          {{
            period === 'week' ? metric[1] : ['₩48,920,000', '1,102', '₩44,392', '5.2%'][i]
          }}
        </strong>
        <p>↗ {{ 8 + i * 3 }}.2% 지난 기간 대비</p>
      </article>
    </section>
    <article class="demo__panel">
      <h3>추이 분석</h3>
      <ActivityChart :values="values" />
    </article>
    <p class="demo__muted">기간별 샘플 데이터를 사용한 인터랙티브 대시보드입니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.metric {
  display: grid;
  gap: 10px;
  small {
    color: var(--muted);
  }
  strong {
    font-size: 28px;
  }
  p {
    color: var(--success);
    font-size: 11px;
  }
}
</style>
`},"1502-6652c139-8ab9b00d":{file:"src/views/dashboard/widgets.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ActivityChart from '@/components/common/ActivityChart.vue';
export default {
  name: 'Widgets',
  components: {
    ActivityChart
  },
  data() {
    const period = 'week';
    const metrics = [
      ['완료한 작업', '128'],
      ['팀 멤버', '24'],
      ['활성 프로젝트', '12'],
      ['저장한 시간', '42h']
    ];
    return {
      period,
      metrics
    };
  },
  computed: {
    values() {
      return this.period === 'week'
        ? [22, 41, 35, 68, 52, 73, 65, 92]
        : [31, 25, 48, 44, 61, 70, 58, 88];
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <header class="demo__row">
      <h2>Workspace metrics</h2>
      <label>
        기간
        <select v-model="period">
          <option value="week">이번 주</option>
          <option value="month">이번 달</option>
        </select>
      </label>
    </header>
    <section class="demo__grid">
      <article v-for="(metric, i) in metrics" :key="metric[0]" class="demo__panel metric">
        <small>{{ metric[0] }}</small>
        <strong>{{
          period === 'week' ? metric[1] : ['482', '32', '18', '156h'][i]
        }}</strong>
        <p>↗ {{ 8 + i * 3 }}.2% 지난 기간 대비</p>
      </article>
    </section>
    <article class="demo__panel">
      <h3>추이 분석</h3>
      <ActivityChart :values="values" />
    </article>
    <p class="demo__muted">기간별 샘플 데이터를 사용한 인터랙티브 대시보드입니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.metric {
  display: grid;
  gap: 10px;
  small {
    color: var(--muted);
  }
  strong {
    font-size: 28px;
  }
  p {
    color: var(--success);
    font-size: 11px;
  }
}
</style>
`},"1054-9b47c218-a31b6dde":{file:"src/views/forms-tables/basic.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { people } from '@/data/people';
import BaseBadge from '@/components/common/BaseBadge.vue';
export default {
  name: 'Basic',
  components: {
    BaseBadge
  },
  data() {
    return {
      people
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <section class="demo__scroll">
      <table>
        <caption>
          팀 멤버 기본 테이블
        </caption>
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">이메일</th>
            <th scope="col">역할</th>
            <th scope="col">상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in people.slice(0, 6)" :key="person.id">
            <th scope="row">{{ person.name }}</th>
            <td>{{ person.email }}</td>
            <td>{{ person.role }}</td>
            <td>
              <BaseBadge :tone="person.status === 'Active' ? 'success' : 'warning'">
                {{ person.status }}
              </BaseBadge>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1633-62d5fb3f-33cd3aaf":{file:"src/views/forms-tables/controls.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Controls',
  data() {
    const form = {
      name: 'Jise',
      email: 'jise@example.com',
      role: 'Developer',
      newsletter: true,
      theme: 'light',
      level: 70,
      bio: ''
    };
    return {
      form
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <form class="demo" @submit.prevent>
      <div class="demo__grid">
        <label class="demo__field">
          이름
          <input v-model.trim="form.name" />
        </label>
        <label class="demo__field">
          이메일
          <input v-model="form.email" type="email" />
        </label>
        <label class="demo__field">
          역할
          <select v-model="form.role">
            <option>Developer</option>
            <option>Designer</option>
          </select>
        </label>
      </div>
      <label class="demo__field">
        자기소개
        <textarea v-model="form.bio" rows="3" />
      </label>
      <fieldset>
        <legend>테마</legend>
        <label>
          <input v-model="form.theme" type="radio" value="light" />
          Light
        </label>
        <label>
          <input v-model="form.theme" type="radio" value="dark" />
          Dark
        </label>
      </fieldset>
      <label>
        <input v-model="form.newsletter" type="checkbox" />
        뉴스레터 수신
      </label>
      <label>
        숙련도 {{ form.level }}%
        <input v-model.number="form.level" type="range" min="0" max="100" />
      </label>
    </form>
    <pre class="demo__output">{{ JSON.stringify(form, null, 2) }}</pre>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"457-c3804478-f3dfca26":{file:"src/views/forms-tables/data.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import DataTable from '@/components/common/DataTable.vue';
import { people } from '@/data/people';
export default {
  name: 'Data',
  components: {
    DataTable
  },
  data() {
    return {
      people
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <DataTable :initial-rows="people" />
    <p class="demo__muted">
      전체 선택은 현재 페이지에 적용됩니다. CSV는 검색 결과 전체를 내보내며 수식으로 해석될
      수 있는 문자열을 이스케이프합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"2232-cbbcab56-a64791c6":{file:"src/views/forms-tables/validation.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Validation',
  data() {
    const form = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      terms: false
    };
    const touched = false;
    const submitted = false;
    const fields = [
      {
        key: 'name',
        label: '이름',
        type: 'text'
      },
      {
        key: 'email',
        label: '이메일',
        type: 'email'
      },
      {
        key: 'password',
        label: '비밀번호',
        type: 'password'
      },
      {
        key: 'confirm',
        label: '비밀번호 확인',
        type: 'password'
      }
    ];
    return {
      form,
      touched,
      submitted,
      fields
    };
  },
  computed: {
    errors() {
      return {
        name: this.form.name.trim().length >= 2 ? '' : '이름을 2자 이상 입력하세요.',
        email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(this.form.email)
          ? ''
          : '올바른 이메일을 입력하세요.',
        password: this.form.password.length >= 8 ? '' : '비밀번호는 8자 이상이어야 합니다.',
        confirm:
          this.form.confirm === this.form.password && this.form.confirm
            ? ''
            : '비밀번호가 일치하지 않습니다.',
        terms: this.form.terms ? '' : '이용 약관에 동의하세요.'
      };
    },
    valid() {
      return Object.values(this.errors).every((e) => !e);
    }
  },
  methods: {
    submit() {
      this.touched = true;
      this.submitted = this.valid;
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <p class="demo__muted">
      입력 값은 외부로 전송되지 않습니다. 테스트용 비밀번호를 사용하세요.
    </p>
    <form class="demo" novalidate @submit.prevent="submit" @input="submitted = false">
      <div class="demo__grid">
        <label v-for="field in fields" :key="field.key" class="demo__field">
          {{ field.label }}
          <input
            v-model="form[field.key]"
            :type="field.type"
            :aria-invalid="touched && !!errors[field.key]"
            :aria-describedby="'error-' + field.key"
            @blur="touched = true"
          />
          <small v-if="touched" :id="'error-' + field.key" class="demo__error">
            {{ errors[field.key] }}
          </small>
        </label>
      </div>
      <label>
        <input
          v-model="form.terms"
          type="checkbox"
          :aria-invalid="touched && !!errors.terms"
        />
        이용 약관 동의
      </label>
      <small v-if="touched" class="demo__error">{{ errors.terms }}</small>
      <button type="submit" class="demo__primary">검증 후 등록</button>
      <p v-if="submitted" role="status" class="demo__output">✓ 모든 검증을 통과했습니다.</p>
    </form>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"3157-ef10a397-1e1e16f5":{file:"src/views/forms-tables/wizard.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Wizard',
  data() {
    const step = 0;
    const done = false;
    const form = {
      name: '',
      email: '',
      team: '',
      role: 'Developer'
    };
    const steps = ['기본 정보', '워크스페이스', '확인'];
    return {
      step,
      done,
      form,
      steps
    };
  },
  computed: {
    valid() {
      return this.step === 0
        ? this.form.name.trim().length >= 2 &&
            /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(this.form.email)
        : this.step === 1
          ? this.form.team.trim().length >= 2
          : true;
    }
  },
  methods: {
    next() {
      if (this.valid) {
        if (this.step < 2) this.step++;
        else this.done = true;
      }
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <ol class="wizard__steps">
      <li
        v-for="(title, i) in steps"
        :key="title"
        :aria-current="step === i ? 'step' : undefined"
      >
        <span>{{ i < step ? '✓' : i + 1 }}</span>
        {{ title }}
      </li>
    </ol>
    <form v-if="!done" class="demo" @submit.prevent="next">
      <fieldset v-if="step === 0">
        <legend>기본 정보</legend>
        <div class="demo__grid">
          <label class="demo__field">
            이름 (2자 이상)
            <input v-model.trim="form.name" required minlength="2" />
          </label>
          <label class="demo__field">
            이메일
            <input v-model="form.email" type="email" required />
          </label>
        </div>
      </fieldset>
      <fieldset v-else-if="step === 1">
        <legend>워크스페이스</legend>
        <div class="demo__grid">
          <label class="demo__field">
            팀 이름 (2자 이상)
            <input v-model.trim="form.team" minlength="2" required />
          </label>
          <label class="demo__field">
            역할
            <select v-model="form.role">
              <option>Developer</option>
              <option>Designer</option>
              <option>Manager</option>
            </select>
          </label>
        </div>
      </fieldset>
      <article v-else class="demo__output">
        <h3>설정 확인</h3>
        <dl>
          <dt>이름 / 이메일</dt>
          <dd>{{ form.name }} / {{ form.email }}</dd>
          <dt>팀 / 역할</dt>
          <dd>{{ form.team }} / {{ form.role }}</dd>
        </dl>
      </article>
      <footer class="demo__row">
        <button type="button" :disabled="step === 0" @click="step--">이전</button>
        <button type="submit" class="demo__primary" :disabled="!valid">
          {{ step === 2 ? '완료' : '다음' }}
        </button>
      </footer>
    </form>
    <article v-else class="demo__output">
      <h3>✓ 워크스페이스 설정이 완료되었습니다.</h3>
      <button
        @click="
          done = false;
          step = 0;
        "
      >
        다시 편집
      </button>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.wizard__steps {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
  li {
    display: flex;
    gap: 8px;
    align-items: center;
    color: var(--caption);
    font-size: 12px;
    &[aria-current='step'] {
      color: var(--primary);
    }
    span {
      @include flex-center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--soft);
    }
  }
}
</style>
`},"11499-27b88bd7-490c589f":JSON.parse(`{"file":"src/views/html5/semantic.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport { Copy, Check, Download, CodeXml } from 'lucide-vue-next';\\nimport patterns from '@/data/htmlSemanticPatterns.json';\\nimport SyntaxCode from '@/components/common/SyntaxCode.vue';\\nimport { useClipboard } from '@/composables/useClipboard';\\nimport { useTheme } from '@/composables/useTheme';\\nimport { createPracticePreview } from '@/composables/practicePreview';\\nimport { buildSemanticDocument, semanticPreviewCss } from '@/composables/htmlSemantic';\\nexport default {\\n  name: 'Semantic',\\n  components: {\\n    Copy,\\n    Check,\\n    Download,\\n    CodeXml,\\n    SyntaxCode\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const { theme } = useTheme();\\n    const { copied, copy } = useClipboard();\\n    return {\\n      theme,\\n      copied,\\n      copy\\n    };\\n  },\\n  data() {\\n    const selectedId = patterns[0].id;\\n    const category = '전체';\\n    const query = '';\\n    const codeTab = 'html';\\n    const previewOpen = false;\\n    const categories = [...new Set(patterns.map((item) => item.category))];\\n    const tabs = [\\n      {\\n        id: 'html',\\n        label: 'HTML 조각'\\n      },\\n      {\\n        id: 'document',\\n        label: '전체 HTML 문서'\\n      },\\n      {\\n        id: 'css',\\n        label: '미리보기 CSS'\\n      }\\n    ];\\n    return {\\n      selectedId,\\n      category,\\n      query,\\n      codeTab,\\n      previewOpen,\\n      categories,\\n      tabs,\\n      patterns\\n    };\\n  },\\n  computed: {\\n    active() {\\n      return patterns.find((item) => item.id === this.selectedId);\\n    },\\n    groups() {\\n      return this.categories\\n        .map((name) => ({\\n          name,\\n          items: patterns.filter(\\n            (item) =>\\n              item.category === name &&\\n              (this.category === '전체' || item.category === this.category) &&\\n              \`\${item.id} \${item.label} \${item.tags.join(' ')} \${item.description}\`\\n                .toLowerCase()\\n                .includes(this.query.trim().toLowerCase())\\n          )\\n        }))\\n        .filter((group) => group.items.length);\\n    },\\n    code() {\\n      return this.codeTab === 'document'\\n        ? buildSemanticDocument(this.active)\\n        : this.codeTab === 'css'\\n          ? semanticPreviewCss.trim()\\n          : this.active.html;\\n    },\\n    preview() {\\n      return createPracticePreview(\\n        this.active.html,\\n        semanticPreviewCss,\\n        this.theme === 'dark'\\n      );\\n    }\\n  },\\n  methods: {\\n    tagSummary(tags) {\\n      return tags\\n        .slice(0, 4)\\n        .map((tag) => '<' + tag + '>')\\n        .join(' ');\\n    },\\n    select(id) {\\n      this.selectedId = id;\\n      this.codeTab = 'html';\\n    },\\n    download() {\\n      const blob = new Blob([buildSemanticDocument(this.active)], {\\n        type: 'text/html;charset=utf-8'\\n      });\\n      const url = URL.createObjectURL(blob);\\n      const link = document.createElement('a');\\n      link.href = url;\\n      link.download = this.active.id + '.html';\\n      link.click();\\n      setTimeout(() => URL.revokeObjectURL(url), 1000);\\n    }\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"html-guide\\">\\n    <header class=\\"html-guide__intro\\">\\n      <span class=\\"html-guide__eyebrow\\">HTML5 · SEMANTIC MARKUP</span>\\n      <h1>\\n        실무 시멘틱 마크업\\n        <small>{{ patterns.length }}개 패턴</small>\\n      </h1>\\n      <p>\\n        필요한 패턴 버튼을 누르면 아래에 전체 HTML 소스가 표시됩니다. 태그의 의미와 사용법을\\n        확인하고 프로젝트에 맞게 복사하세요.\\n      </p>\\n      <p class=\\"html-guide__muted\\">\\n        BEM 클래스 이름을 함께 제공합니다. HTML 구조는 그대로 복사할 수 있고, 스타일과 앱\\n        이벤트는 프로젝트에 맞게 연결하면 됩니다.\\n      </p>\\n    </header>\\n    <section class=\\"html-guide__picker\\" aria-label=\\"시멘틱 패턴 선택\\">\\n      <div class=\\"html-guide__filters\\">\\n        <label>\\n          패턴 검색\\n          <input v-model=\\"query\\" type=\\"search\\" placeholder=\\"header, card, form, 테이블…\\" />\\n        </label>\\n        <label>\\n          패턴 분류\\n          <select v-model=\\"category\\">\\n            <option>전체</option>\\n            <option v-for=\\"name in categories\\" :key=\\"name\\">{{ name }}</option>\\n          </select>\\n        </label>\\n      </div>\\n      <section v-for=\\"group in groups\\" :key=\\"group.name\\" class=\\"html-guide__group\\">\\n        <h2>\\n          {{ group.name }}\\n          <small>{{ group.items.length }}</small>\\n        </h2>\\n        <div class=\\"html-guide__buttons\\">\\n          <button\\n            v-for=\\"item in group.items\\"\\n            :key=\\"item.id\\"\\n            type=\\"button\\"\\n            :aria-pressed=\\"selectedId === item.id\\"\\n            :title=\\"item.description\\"\\n            @click=\\"select(item.id)\\"\\n          >\\n            <strong>{{ item.label }}</strong>\\n            <span>\\n              {{ tagSummary(item.tags) }}\\n            </span>\\n          </button>\\n        </div>\\n      </section>\\n      <p v-if=\\"!groups.length\\" role=\\"status\\">\\n        검색 결과가 없습니다. 검색어나 분류를 바꿔 주세요.\\n      </p>\\n      <footer class=\\"html-guide__selection\\" role=\\"status\\">\\n        <span>\\n          선택한 패턴:\\n          <strong>{{ active.label }}</strong>\\n        </span>\\n        <button\\n          type=\\"button\\"\\n          @click=\\"$refs.resultPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' })\\"\\n        >\\n          선택한 소스 보기 ↓\\n        </button>\\n      </footer>\\n    </section>\\n    <section ref=\\"resultPanel\\" class=\\"html-guide__result\\" aria-label=\\"선택한 HTML 소스\\">\\n      <header class=\\"html-guide__heading\\">\\n        <div>\\n          <span class=\\"html-guide__eyebrow\\">{{ active.category }}</span>\\n          <h2>\\n            <CodeXml :size=\\"20\\" />\\n            {{ active.label }}\\n          </h2>\\n          <p>{{ active.description }}</p>\\n        </div>\\n        <button type=\\"button\\" @click=\\"download\\">\\n          <Download :size=\\"15\\" />\\n          .html 다운로드\\n        </button>\\n      </header>\\n      <div class=\\"html-guide__tags\\">\\n        <code v-for=\\"tag in active.tags\\" :key=\\"tag\\">&lt;{{ tag }}&gt;</code>\\n      </div>\\n      <aside class=\\"html-guide__notes\\">\\n        <h3>이렇게 사용하세요</h3>\\n        <ul>\\n          <li v-for=\\"note in active.notes\\" :key=\\"note\\">{{ note }}</li>\\n        </ul>\\n      </aside>\\n      <div class=\\"html-guide__preview-heading\\">\\n        <button\\n          type=\\"button\\"\\n          :aria-expanded=\\"previewOpen\\"\\n          aria-controls=\\"semantic-preview\\"\\n          @click=\\"previewOpen = !previewOpen\\"\\n        >\\n          {{ previewOpen ? '화면 접기' : '화면보기' }}\\n        </button>\\n        <span>이미지·링크·서버 주소는 프로젝트 경로로 바꿔 주세요.</span>\\n      </div>\\n      <iframe\\n        v-if=\\"previewOpen\\"\\n        id=\\"semantic-preview\\"\\n        :key=\\"active.id + theme\\"\\n        class=\\"html-guide__frame\\"\\n        :srcdoc=\\"preview\\"\\n        sandbox=\\"\\"\\n        referrerpolicy=\\"no-referrer\\"\\n        :title=\\"active.label + ' 화면보기'\\"\\n      />\\n      <nav class=\\"html-guide__tabs\\" aria-label=\\"HTML 소스 형식\\">\\n        <button\\n          v-for=\\"tab in tabs\\"\\n          :key=\\"tab.id\\"\\n          type=\\"button\\"\\n          :aria-pressed=\\"codeTab === tab.id\\"\\n          @click=\\"codeTab = tab.id\\"\\n        >\\n          {{ tab.label }}\\n        </button>\\n        <button\\n          class=\\"html-guide__copy\\"\\n          type=\\"button\\"\\n          aria-label=\\"선택한 소스 복사\\"\\n          @click=\\"copy(code, codeTab === 'css' ? 'CSS' : 'HTML')\\"\\n        >\\n          <Check v-if=\\"copied\\" :size=\\"15\\" />\\n          <Copy v-else :size=\\"15\\" />\\n          {{ copied ? '복사됨' : '소스 복사' }}\\n        </button>\\n      </nav>\\n      <SyntaxCode\\n        :code=\\"code\\"\\n        :language=\\"codeTab === 'css' ? 'css' : 'html'\\"\\n        label=\\"HTML5 예제 소스\\"\\n        class=\\"html-guide__source\\"\\n      />\\n      <p class=\\"html-guide__muted\\">\\n        HTML 조각을 합칠 때는 id가 중복되지 않도록 변경하고, label의\\n        for·aria-labelledby·aria-describedby도 같은 이름으로 맞추세요. 전체 문서 탭은\\n        스타일을 포함하지 않는 HTML 문서입니다.\\n      </p>\\n    </section>\\n    <footer class=\\"html-guide__references\\">\\n      <span>태그 의미 참고:</span>\\n      <a\\n        href=\\"https://html.spec.whatwg.org/multipage/sections.html\\"\\n        target=\\"_blank\\"\\n        rel=\\"noopener noreferrer\\"\\n      >\\n        HTML 표준\\n      </a>\\n      <a\\n        href=\\"https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements\\"\\n        target=\\"_blank\\"\\n        rel=\\"noopener noreferrer\\"\\n      >\\n        MDN HTML 요소\\n      </a>\\n    </footer>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/mixins' as *;\\n.html-guide {\\n  display: grid;\\n  gap: 24px;\\n  min-width: 0;\\n  &__intro,\\n  &__picker,\\n  &__result {\\n    @include card-surface;\\n    padding: 24px;\\n    min-width: 0;\\n  }\\n  &__intro {\\n    h1 {\\n      font-size: 27px;\\n      margin: 8px 0 12px;\\n      small {\\n        font-size: 12px;\\n        color: var(--primary);\\n        margin-left: 8px;\\n      }\\n    }\\n    p {\\n      font-size: 13px;\\n      line-height: 1.9;\\n      margin-top: 8px;\\n    }\\n  }\\n  &__eyebrow {\\n    color: var(--primary);\\n    font-size: 10px;\\n    letter-spacing: 1px;\\n  }\\n  &__muted {\\n    color: var(--muted);\\n    font-size: 12px;\\n    line-height: 1.9;\\n  }\\n  &__picker {\\n    display: grid;\\n    gap: 24px;\\n  }\\n  &__filters {\\n    display: grid;\\n    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);\\n    gap: 14px;\\n    label {\\n      display: grid;\\n      gap: 8px;\\n      font-size: 12px;\\n    }\\n    input,\\n    select {\\n      width: 100%;\\n      min-width: 0;\\n    }\\n  }\\n  &__group h2 {\\n    font-size: 14px;\\n    margin-bottom: 12px;\\n    small {\\n      color: var(--muted);\\n      font-size: 11px;\\n      margin-left: 6px;\\n    }\\n  }\\n  &__buttons {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));\\n    gap: 9px;\\n    button {\\n      @include focus-ring;\\n      display: grid;\\n      gap: 7px;\\n      text-align: left;\\n      padding: 13px;\\n      min-width: 0;\\n      strong {\\n        font-size: 12px;\\n      }\\n      span {\\n        font-size: 10px;\\n        color: var(--muted);\\n        overflow-wrap: anywhere;\\n      }\\n      &[aria-pressed='true'] {\\n        background: var(--soft);\\n        color: var(--primary);\\n        border-color: var(--primary);\\n      }\\n    }\\n  }\\n  &__selection {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: center;\\n    justify-content: space-between;\\n    gap: 10px;\\n    padding-top: 16px;\\n    border-top: 1px solid var(--border);\\n    font-size: 12px;\\n    button {\\n      font-size: 12px;\\n    }\\n  }\\n  &__result {\\n    display: grid;\\n    gap: 18px;\\n    scroll-margin-top: 100px;\\n  }\\n  &__heading {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: start;\\n    justify-content: space-between;\\n    gap: 12px;\\n    h2 {\\n      display: flex;\\n      align-items: center;\\n      gap: 9px;\\n      font-size: 21px;\\n      margin: 8px 0;\\n    }\\n    p {\\n      font-size: 12px;\\n      color: var(--muted);\\n    }\\n    button {\\n      display: flex;\\n      align-items: center;\\n      gap: 6px;\\n      font-size: 12px;\\n    }\\n  }\\n  &__tags {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 8px;\\n    code {\\n      padding: 4px 8px;\\n      background: var(--soft);\\n      color: var(--primary);\\n      border-radius: 6px;\\n      font-size: 12px;\\n    }\\n  }\\n  &__notes {\\n    background: var(--canvas);\\n    padding: 16px;\\n    border-radius: 10px;\\n    h3 {\\n      font-size: 13px;\\n      margin-bottom: 8px;\\n    }\\n    ul {\\n      padding-left: 20px;\\n    }\\n    li {\\n      font-size: 12px;\\n      line-height: 1.9;\\n      margin-top: 6px;\\n    }\\n  }\\n  &__preview-heading {\\n    display: flex;\\n    flex-wrap: wrap;\\n    align-items: center;\\n    gap: 12px;\\n    button {\\n      font-size: 12px;\\n    }\\n    span {\\n      font-size: 11px;\\n      color: var(--muted);\\n    }\\n  }\\n  &__frame {\\n    width: 100%;\\n    height: 380px;\\n    border: 1px solid var(--border);\\n    border-radius: 10px;\\n    background: var(--surface);\\n  }\\n  &__tabs {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 7px;\\n    button {\\n      display: flex;\\n      align-items: center;\\n      gap: 7px;\\n      font-size: 12px;\\n      &[aria-pressed='true'] {\\n        background: var(--soft);\\n        color: var(--primary);\\n        border-color: var(--primary);\\n      }\\n    }\\n  }\\n  &__copy {\\n    margin-left: auto;\\n  }\\n  &__source {\\n    border-radius: 10px;\\n  }\\n  &__references {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 12px;\\n    font-size: 11px;\\n    color: var(--muted);\\n    a {\\n      color: var(--primary);\\n    }\\n  }\\n  @include responsive(mobile) {\\n    &__intro,\\n    &__picker,\\n    &__result {\\n      padding: 18px;\\n    }\\n    &__filters {\\n      grid-template-columns: minmax(0, 1fr);\\n    }\\n    &__copy {\\n      margin-left: 0;\\n    }\\n  }\\n}\\n</style>\\n"}`),"2589-21cfae63-ad099123":{file:"src/views/scss/layout.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'Layout',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const min = '180';
    const gap = '4';
    const count = 4;
    return {
      min,
      gap,
      count
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="layout" />
    <aside class="demo__output">
      <strong>콘텐츠 수에 반응하는 레이아웃.</strong>
      <p>
        auto-fit + minmax로 열 수를 자동 결정하고, min(100%, 최소 너비)로 좁은 부모에서도
        넘침을 막습니다.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        카드 최소 너비
        <select v-model="min" aria-label="카드 최소 너비">
          <option value="140">140px</option>
          <option value="180">180px</option>
          <option value="260">260px</option>
        </select>
      </label>
      <label>
        간격
        <select v-model="gap" aria-label="그리드 간격">
          <option value="2">8px</option>
          <option value="4">16px</option>
          <option value="6">24px</option>
        </select>
      </label>
      <label>
        카드 수
        <input v-model.number="count" type="range" min="1" max="8" />
      </label>
    </div>
    <section
      class="layout-grid"
      :class="['layout-grid--min-' + min, 'layout-grid--gap-' + gap]"
      data-testid="layout-grid"
    >
      <article v-for="n in count" :key="n">
        <span>0{{ n }}</span>
        <h3>Workspace {{ n }}</h3>
        <p>내용이 길어져도 안전한 반응형 카드</p>
        <footer>
          <span>Vue · SCSS</span>
          <button :aria-label="'Workspace ' + n + ' 선택'">↗</button>
        </footer>
      </article>
    </section>
    <p class="demo__muted">
      사용처: 대시보드 KPI, 상품 카드, 갤러리. flex 아이템에는 min-width: 0, 가변 그리드
      열에는 minmax(0, 1fr)도 함께 검토하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.layout-grid {
  @include ui.auto-grid;
  @each $min in (140, 180, 260) {
    &--min-#{$min} {
      @include ui.auto-grid($min: $min * 1px);
    }
  }
  @each $step in (2, 4, 6) {
    &--gap-#{$step} {
      gap: ui.space($step);
    }
  }
  article {
    @include ui.surface;
    @include ui.stack(ui.space(3));
    min-width: 0;
    > span {
      font-size: ui.rem(24px);
      color: var(--primary);
    }
    h3 {
      font-size: ui.rem(15px);
    }
    p {
      font-size: ui.rem(12px);
      color: var(--muted);
    }
  }
  footer {
    @include ui.cluster(ui.space(2));
    margin-top: auto;
    font-size: ui.rem(11px);
    color: var(--caption);
    button {
      margin-left: auto;
    }
  }
}
</style>
`},"2955-2b817212-bf1bd976":{file:"src/views/scss/loops.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'Loops',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const tone = 'primary';
    const size = 'md';
    const spacing = 3;
    return {
      tone,
      size,
      spacing
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="loops" />
    <aside class="demo__output">
      <strong>@each와 Map으로 변형을 생성하세요.</strong>
      <p>
        상태별 색상과 사이즈는 Map으로 관리하고, 제한된 간격 스케일은 @for로 생성합니다.
        생성하는 클래스 수는 필요한 범위로 제한하세요.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        상태
        <select v-model="tone" aria-label="상태 색상">
          <option>primary</option>
          <option>success</option>
          <option>warning</option>
          <option>danger</option>
        </select>
      </label>
      <label>
        크기
        <select v-model="size" aria-label="뱃지 크기">
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </select>
      </label>
      <label>
        간격 단계 {{ spacing }}
        <input
          v-model.number="spacing"
          type="range"
          min="1"
          max="6"
          aria-label="간격 단계"
        />
      </label>
    </div>
    <section class="loop-demo" :class="'loop-demo--space-' + spacing">
      <span
        class="loop-badge"
        :class="['loop-badge--' + tone, 'loop-badge--' + size]"
        data-testid="generated-badge"
      >
        {{ tone }} · {{ size }}
      </span>
      <span class="loop-badge" :class="['loop-badge--' + tone, 'loop-badge--' + size]">
        자동 생성된 변형
      </span>
    </section>
    <div class="demo__row">
      <span
        v-for="t in ['primary', 'success', 'warning', 'danger']"
        :key="t"
        class="loop-badge loop-badge--md"
        :class="'loop-badge--' + t"
      >
        {{ t }}
      </span>
    </div>
    <p class="demo__muted">
      사용처: 상태 뱃지, 버튼 사이즈, 제한된 유틸리티. Sass Map과 Vue 옵션은 값이 서로
      일치하도록 관리하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
@use 'sass:color';
@use 'sass:list';
.demo {
  @include custom-scrollbar;
}
.loop-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  font-weight: 600;
  @each $name, $color in ui.$tones {
    &--#{$name} {
      color: color.adjust($color, $lightness: -18%);
      background: color.change($color, $alpha: 0.12);
      border: 1px solid color.change($color, $alpha: 0.3);
    }
  }
  $sizes: (
    sm: (
      4px,
      9px,
      11px
    ),
    md: (
      6px,
      12px,
      13px
    ),
    lg: (
      8px,
      16px,
      15px
    )
  );
  @each $name, $values in $sizes {
    &--#{$name} {
      padding: list.nth($values, 1) list.nth($values, 2);
      font-size: list.nth($values, 3);
    }
  }
}
.loop-demo {
  @include ui.surface;
  @include ui.cluster;
  @for $step from 1 through 6 {
    &--space-#{$step} {
      gap: ui.space($step);
      padding: ui.space($step);
    }
  }
}
</style>
`},"981-a4d4b50f-54bfb5a5":{file:"src/views/scss/mixins-source.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import MixinCatalog from '@/components/examples/MixinCatalog.vue';
export default {
  name: 'MixinsSource',
  components: {
    MixinCatalog
  },
  data() {
    const importCode = "@use '@/assets/styles/mixins' as mix;";
    return {
      importCode
    };
  }
};
<\/script>
<template>
  <section class="demo mixin-source">
    <header>
      <h3>@/assets/styles/mixins</h3>
      <p>실제 파일: src/assets/styles/_mixins.scss</p>
    </header>
    <code class="demo__output">{{ importCode }}</code>
    <p class="demo__muted">
      실제 공통 모듈을 40종으로 확장했습니다. 기존 호출을 유지하면서
      레이아웃·반응형·텍스트·접근성·컨트롤·스크롤 패턴을 추가했습니다. 각 정의에는 인자와
      기본값, 예시, 주의사항을 주석으로 적었습니다.
    </p>
    <MixinCatalog />
    <RouterLink to="/scss/mixins">실제 화면에서 믹스인 동작 확인하기 →</RouterLink>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.mixin-source {
  @include custom-scrollbar;
  min-width: 0;
  h3,
  code {
    overflow-wrap: anywhere;
  }
  header p {
    color: var(--caption);
    font-size: 12px;
    margin-top: 6px;
  }
  a {
    color: var(--primary);
    font-size: 12px;
  }
}
</style>
`},"7732-b8033213-e59f8cbf":{file:"src/views/scss/mixins.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import MixinCatalog from '@/components/examples/MixinCatalog.vue';
export default {
  name: 'Mixins',
  components: {
    MixinCatalog
  },
  data() {
    const density = 'comfortable';
    const panelWidth = 660;
    const lines = 2;
    const expanded = false;
    const sampleText =
      '긴 설명은 카드의 높이를 크게 만들 수 있습니다. line-clamp로 표시 줄 수를 제한하고, 중요한 정보에는 전체 내용을 펼쳐서 읽는 동작을 함께 제공합니다. 부모 너비가 달라져도 텍스트가 안전하게 줄바꿈되도록 설계하세요. 여러 문장이 이어져도 목록에서 균일한 높이를 유지할 수 있습니다.';
    const align = 'center';
    const elevated = true;
    return {
      density,
      panelWidth,
      lines,
      expanded,
      sampleText,
      align,
      elevated
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <MixinCatalog />
    <section class="mixin-live" aria-label="공통 믹스인 동작 예시">
      <h3>추가한 믹스인, 화면에서 확인하기</h3>
      <label>
        데모 부모 너비 {{ panelWidth }}px
        <input v-model.number="panelWidth" type="range" min="260" max="900" step="20" />
      </label>
      <div class="mixin-live__container" :style="{ width: panelWidth + 'px' }">
        <section class="mixin-live__grid">
          <article v-for="number in 4" :key="number">
            <strong>카드 {{ number }}</strong>
            <p>auto-grid · 최소 180px</p>
          </article>
        </section>
        <section class="mixin-live__query">
          <strong>container-query</strong>
          <p>부모가 480px 이상이면 이 영역은 2열입니다.</p>
        </section>
      </div>
      <section class="mixin-live__panel">
        <h4>line-clamp · 줄 수 제한</h4>
        <label>
          표시 줄 수
          <select v-model.number="lines" aria-label="말줄임 줄 수">
            <option :value="1">1줄</option>
            <option :value="2">2줄</option>
            <option :value="3">3줄</option>
          </select>
        </label>
        <p class="mixin-live__text" :class="expanded ? '' : 'mixin-live__text--' + lines">
          {{ sampleText }}
        </p>
        <button :aria-expanded="expanded" @click="expanded = !expanded">
          {{ expanded ? '접기' : '전체 설명 보기' }}
        </button>
      </section>
      <section class="mixin-live__panel">
        <h4>field-base · placeholder · focus-ring</h4>
        <label>
          프로젝트 이름
          <input
            class="mixin-live__input"
            placeholder="키보드 Tab으로 포커스를 확인하세요"
          />
        </label>
        <div class="mixin-live__actions">
          <button class="mixin-live__icon" type="button">
            <span aria-hidden="true">＋</span>
            <span class="mixin-live__sr">새 프로젝트 추가 예시</span>
          </button>
          <span>touch-target + visually-hidden · 아이콘 버튼에 접근 가능한 이름 제공</span>
          <button class="mixin-live__disabled" disabled>비활성 버튼</button>
        </div>
      </section>
      <section class="mixin-live__panel">
        <h4>horizontal-scroll · 카드 목록</h4>
        <div class="mixin-live__scroll" tabindex="0" aria-label="가로 스크롤 카드">
          <article v-for="number in 6" :key="number">카드 {{ number }}</article>
        </div>
      </section>
      <section class="mixin-live__panel" aria-label="스켈레톤 모양 예시">
        <h4>skeleton · 로딩 자리표시자</h4>
        <p>
          모양을 보여주는 상시 데모입니다. 운영체제의 움직임 줄이기 설정에서는 정지합니다.
        </p>
        <span class="mixin-live__skeleton" aria-hidden="true" />
      </section>
    </section>
    <aside class="demo__output">
      <strong>반복되는 선언 묶음을 @mixin으로 추출하세요.</strong>
      <p>
        기본값, 이름 있는 인자, @content를 조합하면 변형이 많은 카드와 툴바도 한 곳에서
        관리할 수 있습니다.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        간격
        <select v-model="density" aria-label="믹스인 간격">
          <option value="comfortable">Comfortable · 24px</option>
          <option value="compact">Compact · 12px</option>
        </select>
      </label>
      <label>
        정렬
        <select v-model="align" aria-label="믹스인 정렬">
          <option value="center">Center</option>
          <option value="start">Start</option>
        </select>
      </label>
      <label>
        <input v-model="elevated" type="checkbox" />
        그림자
      </label>
    </div>
    <article
      class="mixin-card"
      :class="['mixin-card--' + density, { 'mixin-card--flat': !elevated }]"
      data-testid="mixin-card"
    >
      <header
        class="mixin-card__toolbar"
        :class="{ 'mixin-card__toolbar--start': align === 'start' }"
      >
        <span class="mixin-card__icon">✦</span>
        <section>
          <h3>Reusable surface</h3>
          <p>surface($padding, $radius) + @content</p>
        </section>
        <button>작업 추가</button>
      </header>
      <p>
        같은 믹스인을 사용하면서 인자로 간격을 조정합니다. @content 블록에서는 카드마다
        필요한 테두리만 추가합니다.
      </p>
      <footer><code>@include ui.surface($padding: ui.space(6))</code></footer>
    </article>
    <p class="demo__muted">
      사용처: 카드, 버튼 변형, flex 툴바. 값 하나만 반환한다면 @function을 사용하고, 여러
      CSS 선언을 출력한다면 @mixin을 사용하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.mixin-card {
  @include ui.surface($padding: ui.space(6), $radius: 16px) {
    border-left: 3px solid var(--primary);
  }
  @include ui.stack(ui.space(5));
  &--compact {
    @include ui.surface($padding: ui.space(3));
    @include ui.stack(ui.space(3));
    border-left: 3px solid var(--primary);
  }
  &--flat {
    box-shadow: none;
  }
  &__toolbar {
    @include ui.cluster($gap: ui.space(3), $align: center);
    button {
      margin-left: auto;
    }
    &--start {
      align-items: flex-start;
    }
  }
  &__icon {
    @include flex-center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--soft);
    color: var(--primary);
    font-size: 24px;
  }
  h3 {
    font-size: ui.rem(16px);
  }
  p {
    font-size: ui.rem(13px);
    color: var(--muted);
  }
  footer {
    border-top: 1px solid var(--border);
    padding-top: ui.space(3);
    overflow-wrap: anywhere;
    color: var(--primary);
  }
}

.mixin-live {
  @include stack(20px);
  min-width: 0;
  padding-block: 24px;
  border-block: 1px solid var(--border);
  label {
    @include stack(8px);
    font-size: 12px;
  }
  h3 {
    font-size: 18px;
  }
  h4 {
    font-size: 14px;
    margin-bottom: 12px;
  }
  p {
    font-size: 12px;
    line-height: 1.8;
  }
  &__container {
    @include container-context(card);
    max-width: 100%;
  }
  &__grid {
    @include auto-grid(180px, 12px);
    article {
      @include card-surface;
      @include stack(8px);
      padding: 16px;
    }
  }
  &__query {
    @include stack(8px);
    padding: 16px;
    margin-top: 12px;
    background: var(--soft);
    border-radius: 8px;
    @include container-query(480px, card) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  &__panel {
    @include stack(12px);
    padding: 18px;
    border: 1px solid var(--border);
    border-radius: 10px;
    min-width: 0;
  }
  &__text {
    max-width: 360px;
    &--1 {
      @include line-clamp(1);
    }
    &--2 {
      @include line-clamp(2);
    }
    &--3 {
      @include line-clamp(3);
    }
  }
  &__input {
    @include field-base;
    @include placeholder(var(--muted));
    @include focus-ring;
  }
  &__actions {
    @include cluster(12px);
    span {
      font-size: 11px;
      color: var(--muted);
    }
  }
  &__icon {
    @include button-reset;
    @include touch-target;
    @include focus-ring;
    border: 1px solid var(--border);
    border-radius: 8px;
    @include hover-capable {
      background: var(--soft);
    }
  }
  &__sr {
    @include visually-hidden;
  }
  &__disabled {
    @include disabled-state;
  }
  &__scroll {
    @include horizontal-scroll(12px);
    padding: 5px;
    article {
      width: 180px;
      padding: 25px;
      border: 1px solid var(--border);
      border-radius: 8px;
    }
  }
  &__skeleton {
    @include skeleton;
    display: block;
    height: 64px;
    border-radius: 8px;
  }
}
</style>
`},"2456-b68a4482-56809ac0":{file:"src/views/scss/modules.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'Modules',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const compact = false;
    return {
      compact
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="modules" />
    <aside class="demo__output">
      <strong>@use / @forward로 스타일 모듈을 설계하세요.</strong>
      <p>
        @forward로 공개 API를 모으고 @use '.../practice' as ui로 가져옵니다. 전역 이름
        충돌을 줄이고 모듈당 한 번만 평가합니다.
      </p>
    </aside>
    <ol class="module-steps">
      <li>
        <code>_tokens.scss</code>
        <span>!default 설정값과 Map</span>
      </li>
      <li>
        <code>_functions.scss</code>
        <span>space(), rem() 값 계산</span>
      </li>
      <li>
        <code>_mixins.scss</code>
        <span>surface(), stack(), respond()</span>
      </li>
      <li>
        <code>_index.scss</code>
        <span>@forward로 공개 진입점 구성</span>
      </li>
    </ol>
    <label>
      <input v-model="compact" type="checkbox" />
      모듈을 재사용한 Compact 카드
    </label>
    <article
      class="module-card"
      :class="{ 'module-card--compact': compact }"
      data-testid="module-card"
    >
      <h3>작은 모듈에서 시작하는 디자인 시스템</h3>
      <p>이 페이지를 포함한 SCSS 예제들은 실제로 같은 Sass 모듈을 가져와 컴파일합니다.</p>
      <code>
        padding: ui.space(6);
        <br />
        font-size: ui.rem(16px);
      </code>
    </article>
    <p class="demo__muted">
      코드 보기 → 파일 선택에서 _index.scss와 하위 파일까지 확인·복사할 수 있습니다. @use는
      일반 스타일 규칙보다 먼저 선언해야 합니다. !default 값은 첫 로드 시 @use … with (…)로
      설정하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.module-steps {
  @include ui.auto-grid($min: 160px);
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: step;
  li {
    @include ui.surface(ui.space(4));
    @include ui.stack(ui.space(2));
    counter-increment: step;
    &::before {
      content: '0' counter(step);
      color: var(--primary);
      font-weight: 600;
    }
    code {
      overflow-wrap: anywhere;
    }
    span {
      font-size: ui.rem(12px);
      color: var(--muted);
    }
  }
}
.module-card {
  @include ui.surface(ui.space(6));
  @include ui.stack;
  h3 {
    font-size: ui.rem(18px);
  }
  p {
    font-size: ui.rem(14px);
    color: var(--muted);
  }
  code {
    color: var(--primary);
  }
  &--compact {
    padding: ui.space(3);
    gap: ui.space(2);
  }
}
</style>
`},"2539-2d74d7a9-4f69ac33":{file:"src/views/scss/practice-functions.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'PracticeFunctions',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const module = {
      name: 'functions',
      heading: '공통 계산 함수',
      summary: '계산 함수 16종 · 간격·단위·색상·타입·반경·그림자·레이어·모션',
      notes: [
        'space($step)는 기본 간격 단위에 배수를 곱해 길이를 반환합니다.',
        'rem($pixels, $base: 16px)는 픽셀 길이를 rem 단위로 변환합니다.',
        'sass:math, sass:map, sass:color, sass:meta와 tokens 모듈에 의존합니다. 파일 선택에서 tokens 원본도 확인할 수 있습니다.'
      ]
    };
    const forwardCode = "@forward 'functions';";
    const usage = "@use '@/assets/styles/practice' as ui;";
    return {
      module,
      forwardCode,
      usage
    };
  }
};
<\/script>
<template>
  <section class="demo forward-source">
    <ScssRecipeCatalog topic="practice-functions" />
    <header>
      <h3>{{ module.heading }}</h3>
      <p>src/assets/styles/practice/_{{ module.name }}.scss</p>
    </header>
    <section class="forward-source__entry">
      <p>_index.scss에서 공개하는 모듈</p>
      <code>{{ forwardCode }}</code>
    </section>
    <p class="forward-source__summary">{{ module.summary }}</p>
    <ul>
      <li v-for="note in module.notes" :key="note">{{ note }}</li>
    </ul>
    <section>
      <h4>프로젝트에서 가져오기</h4>
      <code class="forward-source__usage">{{ usage }}</code>
      <p class="demo__muted">
        @forward는 진입점에서 API를 공개하고, 사용처는 @use와 ui 네임스페이스로 접근합니다.
      </p>
    </section>
    <nav class="demo__row" aria-label="Practice 소스 탐색">
      <RouterLink to="/scss/practice-source">전체 진입점</RouterLink>
      <RouterLink
        v-for="name in ['tokens', 'functions', 'mixins'].filter(
          (name) => name !== module.name
        )"
        :key="name"
        :to="'/scss/practice-' + name"
      >
        {{ name }} 원본 →
      </RouterLink>
    </nav>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.forward-source {
  @include custom-scrollbar;
  min-width: 0;
  header p {
    font-size: 12px;
    color: var(--caption);
    margin-top: 6px;
    overflow-wrap: anywhere;
  }
  &__entry {
    @include card-surface;
    padding: 16px;
    background: var(--soft);
    p {
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 6px;
    }
    code {
      color: var(--primary);
    }
  }
  &__summary {
    font-size: 13px;
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  ul {
    margin: 0;
    padding-left: 20px;
    font-size: 13px;
    color: var(--muted);
    li + li {
      margin-top: 8px;
    }
  }
  &__usage {
    display: block;
    padding: 14px 0;
    overflow-wrap: anywhere;
  }
  nav a {
    font-size: 12px;
    color: var(--primary);
    @include focus-ring;
  }
}
</style>
`},"2521-6b19f29a-172c755e":{file:"src/views/scss/practice-mixins.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'PracticeMixins',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const module = {
      name: 'mixins',
      heading: '실무 스타일 믹스인',
      summary: '기존 8종 + 토큰 기반 button · badge · input · overlay 등 총 24종',
      notes: [
        '레이아웃·표면·반응형·말줄임·포커스 스타일을 재사용하는 믹스인 모듈입니다.',
        'surface, respond, container-up은 @content 블록을 받아 스타일을 확장합니다.',
        'tokens와 functions를 함께 사용합니다. 파일 선택에 필요한 의존 파일도 제공됩니다.'
      ]
    };
    const forwardCode = "@forward 'mixins';";
    const usage = "@use '@/assets/styles/practice' as ui;";
    return {
      module,
      forwardCode,
      usage
    };
  }
};
<\/script>
<template>
  <section class="demo forward-source">
    <ScssRecipeCatalog topic="practice-mixins" />
    <header>
      <h3>{{ module.heading }}</h3>
      <p>src/assets/styles/practice/_{{ module.name }}.scss</p>
    </header>
    <section class="forward-source__entry">
      <p>_index.scss에서 공개하는 모듈</p>
      <code>{{ forwardCode }}</code>
    </section>
    <p class="forward-source__summary">{{ module.summary }}</p>
    <ul>
      <li v-for="note in module.notes" :key="note">{{ note }}</li>
    </ul>
    <section>
      <h4>프로젝트에서 가져오기</h4>
      <code class="forward-source__usage">{{ usage }}</code>
      <p class="demo__muted">
        @forward는 진입점에서 API를 공개하고, 사용처는 @use와 ui 네임스페이스로 접근합니다.
      </p>
    </section>
    <nav class="demo__row" aria-label="Practice 소스 탐색">
      <RouterLink to="/scss/practice-source">전체 진입점</RouterLink>
      <RouterLink
        v-for="name in ['tokens', 'functions', 'mixins'].filter(
          (name) => name !== module.name
        )"
        :key="name"
        :to="'/scss/practice-' + name"
      >
        {{ name }} 원본 →
      </RouterLink>
    </nav>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.forward-source {
  @include custom-scrollbar;
  min-width: 0;
  header p {
    font-size: 12px;
    color: var(--caption);
    margin-top: 6px;
    overflow-wrap: anywhere;
  }
  &__entry {
    @include card-surface;
    padding: 16px;
    background: var(--soft);
    p {
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 6px;
    }
    code {
      color: var(--primary);
    }
  }
  &__summary {
    font-size: 13px;
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  ul {
    margin: 0;
    padding-left: 20px;
    font-size: 13px;
    color: var(--muted);
    li + li {
      margin-top: 8px;
    }
  }
  &__usage {
    display: block;
    padding: 14px 0;
    overflow-wrap: anywhere;
  }
  nav a {
    font-size: 12px;
    color: var(--primary);
    @include focus-ring;
  }
}
</style>
`},"2676-137041d1-3a34cc91":{file:"src/views/scss/practice-source.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'PracticeSource',
  components: {
    SyntaxCode,
    ScssRecipeCatalog
  },
  data() {
    const files = [
      {
        name: '_index.scss',
        path: '/scss/practice-source',
        description: '@forward로 토큰·함수·믹스인을 공개하는 진입점'
      },
      {
        name: '_tokens.scss',
        path: '/scss/practice-tokens',
        description: '기본값과 간격·반경·폰트·레이어·모션 등 토큰 15개 그룹'
      },
      {
        name: '_functions.scss',
        path: '/scss/practice-functions',
        description: '단위·토큰·색상·타입·모션 계산 함수 16종과 인자 검사'
      },
      {
        name: '_mixins.scss',
        path: '/scss/practice-mixins',
        description: '레이아웃·반응형과 토큰 기반 UI를 구성하는 믹스인 24종'
      }
    ];
    const usage =
      "@use '@/assets/styles/practice' as ui;\\n\\n.my-card {\\n  @include ui.surface($padding: ui.space(6));\\n  @include ui.stack(ui.space(4));\\n  font-size: ui.rem(16px);\\n}";
    return {
      files,
      usage
    };
  }
};
<\/script>
<template>
  <section class="demo practice-source">
    <ScssRecipeCatalog topic="practice-source" />
    <header>
      <h3>@/assets/styles/practice</h3>
      <p>실제 진입점: src/assets/styles/practice/_index.scss</p>
    </header>
    <p class="demo__muted">
      폴더 경로를 @use하면 _index.scss를 읽습니다. 아래 파일 선택에서 진입점과 @forward /
      @use 의존 파일과 추가 공통 의존성의 원본을 각각 확인·복사하세요.
    </p>
    <ul class="practice-source__files">
      <li v-for="file in files" :key="file.name">
        <RouterLink :to="file.path">
          <code>{{ file.name }} ↗</code>
        </RouterLink>
        <p>{{ file.description }}</p>
      </li>
    </ul>
    <section>
      <h4>컴포넌트에서 사용하기</h4>
      <SyntaxCode :code="usage" language="scss" label="Practice 모듈 사용 예시" />
    </section>
    <p class="demo__muted">
      surface·색상 등 런타임 테마는 전역 main.scss의 CSS 변수를 사용합니다. Sass 모듈은 빌드
      시 컴파일되며, ui 네임스페이스로 공통 Mixin과 이름이 충돌하지 않게 구성합니다.
    </p>
    <RouterLink to="/scss/modules">모듈·함수 설계 예제 보기 →</RouterLink>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.practice-source {
  @include custom-scrollbar;
  min-width: 0;
  h3 {
    overflow-wrap: anywhere;
  }
  header p {
    font-size: 12px;
    color: var(--caption);
    margin-top: 6px;
  }
  &__files {
    @include ui.auto-grid(200px);
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      @include ui.surface(ui.space(4));
      min-width: 0;
    }
    code {
      color: var(--primary);
    }
    p {
      font-size: 12px;
      color: var(--muted);
      margin-top: 8px;
      overflow-wrap: anywhere;
    }
  }
  pre {
    overflow: auto;
    @include custom-scrollbar;
    font-size: 12px;
    line-height: 1.8;
  }
  a {
    color: var(--primary);
    font-size: 12px;
  }
}
</style>
`},"2472-c7001c2d-b9315c8b":{file:"src/views/scss/practice-tokens.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'PracticeTokens',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const module = {
      name: 'tokens',
      heading: '디자인 토큰',
      summary: '기본 4종 + 간격·반경·글자·레이어·모션 등 토큰 15개 그룹',
      notes: [
        '빌드 시 사용하는 기본 간격·반경·브레이크포인트·상태 색상을 정의합니다.',
        '!default로 선언되어 첫 @use 시 with (…)로 설정할 수 있습니다.',
        '브라우저에서 바뀌는 테마 값은 Sass 변수 대신 CSS 변수를 사용하세요.'
      ]
    };
    const forwardCode = "@forward 'tokens';";
    const usage = "@use '@/assets/styles/practice' as ui;";
    return {
      module,
      forwardCode,
      usage
    };
  }
};
<\/script>
<template>
  <section class="demo forward-source">
    <ScssRecipeCatalog topic="practice-tokens" />
    <header>
      <h3>{{ module.heading }}</h3>
      <p>src/assets/styles/practice/_{{ module.name }}.scss</p>
    </header>
    <section class="forward-source__entry">
      <p>_index.scss에서 공개하는 모듈</p>
      <code>{{ forwardCode }}</code>
    </section>
    <p class="forward-source__summary">{{ module.summary }}</p>
    <ul>
      <li v-for="note in module.notes" :key="note">{{ note }}</li>
    </ul>
    <section>
      <h4>프로젝트에서 가져오기</h4>
      <code class="forward-source__usage">{{ usage }}</code>
      <p class="demo__muted">
        @forward는 진입점에서 API를 공개하고, 사용처는 @use와 ui 네임스페이스로 접근합니다.
      </p>
    </section>
    <nav class="demo__row" aria-label="Practice 소스 탐색">
      <RouterLink to="/scss/practice-source">전체 진입점</RouterLink>
      <RouterLink
        v-for="name in ['tokens', 'functions', 'mixins'].filter(
          (name) => name !== module.name
        )"
        :key="name"
        :to="'/scss/practice-' + name"
      >
        {{ name }} 원본 →
      </RouterLink>
    </nav>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.forward-source {
  @include custom-scrollbar;
  min-width: 0;
  header p {
    font-size: 12px;
    color: var(--caption);
    margin-top: 6px;
    overflow-wrap: anywhere;
  }
  &__entry {
    @include card-surface;
    padding: 16px;
    background: var(--soft);
    p {
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 6px;
    }
    code {
      color: var(--primary);
    }
  }
  &__summary {
    font-size: 13px;
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  ul {
    margin: 0;
    padding-left: 20px;
    font-size: 13px;
    color: var(--muted);
    li + li {
      margin-top: 8px;
    }
  }
  &__usage {
    display: block;
    padding: 14px 0;
    overflow-wrap: anywhere;
  }
  nav a {
    font-size: 12px;
    color: var(--primary);
    @include focus-ring;
  }
}
</style>
`},"2657-19cddc8a-b409fd46":{file:"src/views/scss/responsive.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'Responsive',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const width = 720;
    return {
      width
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="responsive" />
    <aside class="demo__output">
      <strong>페이지는 Media Query, 컴포넌트는 Container Query.</strong>
      <p>
        모바일을 기본으로 작성한 뒤 @content 믹스인으로 넓은 화면을 확장하세요. 아래 너비
        조절은 실제 컨테이너 쿼리를 실행합니다.
      </p>
    </aside>
    <label class="demo__field">
      미리보기 최대 너비 {{ width }}px
      <input
        v-model.number="width"
        type="range"
        min="260"
        max="900"
        aria-label="반응형 미리보기 너비"
      />
    </label>
    <section class="responsive-frame" :style="{ width: width + 'px' }">
      <section class="responsive-frame__grid" data-testid="responsive-grid">
        <article
          v-for="item in [
            { name: 'Design', icon: '✧' },
            { name: 'Develop', icon: '⌘' },
            { name: 'Deliver', icon: '↗' }
          ]"
          :key="item.name"
        >
          <span>{{ item.icon }}</span>
          <h3>{{ item.name }}</h3>
          <p>
            480px 이상: 2열
            <br />
            680px 이상: 3열
          </p>
        </article>
      </section>
    </section>
    <p class="responsive-note">
      뷰포트 768px 이상에서는 이 안내의 왼쪽 테두리가 강조됩니다. 실제 @media 믹스인
      예제입니다.
    </p>
    <p class="demo__muted">
      미리보기는 부모 너비를 초과하지 않습니다. 작은 화면에서는 슬라이더 값을 높여도 실제
      사용 가능한 너비로 제한됩니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.responsive-frame {
  container-type: inline-size;
  container-name: recipe;
  max-width: 100%;
  border: 1px dashed var(--primary);
  border-radius: ui.$radius;
  padding: ui.space(3);
  &__grid {
    display: grid;
    gap: ui.space(3);
    grid-template-columns: minmax(0, 1fr);
    @include ui.container-up(480px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @include ui.container-up(680px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    article {
      @include ui.surface(ui.space(4));
      min-width: 0;
    }
    span {
      color: var(--primary);
      font-size: 28px;
    }
    h3 {
      font-size: ui.rem(15px);
      margin: ui.space(2) 0;
    }
    p {
      font-size: ui.rem(12px);
      color: var(--muted);
    }
  }
}
.responsive-note {
  padding: ui.space(3);
  border-left: 3px solid var(--border);
  background: var(--canvas);
  font-size: ui.rem(12px);
  @include ui.respond(md) {
    border-color: var(--primary);
  }
}
</style>
`},"2792-b332fde4-92506f0e":{file:"src/views/scss/states.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'States',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const disabled = false;
    const busy = false;
    const count = 0;
    return {
      disabled,
      busy,
      count
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="states" />
    <aside class="demo__output">
      <strong>Hover뿐 아니라 Focus, Disabled, Reduced Motion까지.</strong>
      <p>
        BEM 변형과 의사 클래스로 상태를 구분하세요. Tab 키로 버튼에 이동하면 공통 포커스
        믹스인이 적용됩니다.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        <input v-model="disabled" type="checkbox" />
        비활성화
      </label>
      <label>
        <input v-model="busy" type="checkbox" />
        로딩 상태
      </label>
    </div>
    <div class="demo__row">
      <button
        v-for="variant in ['primary', 'outline', 'danger']"
        :key="variant"
        class="state-button"
        :class="['state-button--' + variant, { 'state-button--busy': busy }]"
        :disabled="disabled || busy"
        :aria-busy="busy"
        @click="count++"
      >
        <span v-if="busy" class="state-button__spinner" aria-hidden="true" />
        {{ busy ? '처리 중…' : variant }}
      </button>
    </div>
    <output class="demo__output" aria-live="polite">실행 횟수: {{ count }}</output>
    <p class="demo__muted">
      사용처: 저장·삭제 버튼. hover는 마우스 환경에서만 적용하고, 로딩 중에는 중복 클릭을
      차단하세요. 모션 감소 환경에서는 회전 애니메이션을 정지합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

@mixin action($color, $solid: true) {
  border: 1px solid $color;
  @if $solid {
    background: $color;
    color: #fff;
  } @else {
    background: transparent;
    color: $color;
  }
  @media (hover: hover) {
    &:hover:not(:disabled) {
      filter: brightness(0.92);
    }
  }
}
.state-button {
  @include ui.cluster(ui.space(2));
  @include ui.focus-visible;
  justify-content: center;
  min-height: 44px;
  font-weight: 600;
  transition:
    transform 0.18s,
    filter 0.18s;
  &--primary {
    @include action(#4f46e5);
  }
  &--outline {
    @include action(var(--primary), $solid: false);
  }
  &--danger {
    @include action(#dc2626);
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &--busy {
    cursor: progress;
  }
  &__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: recipe-spin 0.7s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &__spinner {
      animation: none;
    }
  }
}
@keyframes recipe-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
`},"2396-936a8244-471d21d0":{file:"src/views/scss/tokens.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'Tokens',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const accent = '#6366f1';
    const compact = false;
    const mode = 'light';
    return {
      accent,
      compact,
      mode
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="tokens" />
    <aside class="demo__output">
      <strong>색상·간격을 토큰으로 통일하세요.</strong>
      <p>
        Sass 변수는 빌드 시 고정됩니다. 사용자 테마처럼 실행 중 바뀌는 값은 CSS Custom
        Properties로 전달하세요.
      </p>
    </aside>
    <div class="demo__row">
      <label>
        브랜드 색상
        <input v-model="accent" type="color" />
      </label>
      <label>
        <input v-model="compact" type="checkbox" />
        Compact
      </label>
      <label>
        로컬 테마
        <select v-model="mode">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
    <article
      class="token-card"
      :class="{ 'token-card--compact': compact, 'token-card--dark': mode === 'dark' }"
      :style="{ '--recipe-accent': accent }"
    >
      <span class="token-card__badge">DESIGN TOKENS</span>
      <h3>한 번 정의하고, 일관되게 사용하기</h3>
      <p>
        간격은 ui.space(6), 반경은 ui.$radius를 사용합니다. 색상은 --recipe-accent를 통해
        실시간으로 변경됩니다.
      </p>
      <button>브랜드 액션</button>
    </article>
    <p class="demo__muted">
      사용처: 화이트라벨 서비스, 브랜드 테마, 밀도 설정. 전역 변수를 덮어쓰지 않고 컴포넌트
      범위에 CSS 변수를 선언하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.token-card {
  --recipe-accent: #6366f1;
  --recipe-bg: #fff;
  --recipe-text: #0f172a;
  @include ui.stack(ui.space(4));
  padding: ui.space(6);
  border: 1px solid var(--recipe-accent);
  border-radius: ui.$radius;
  background: var(--recipe-bg);
  color: var(--recipe-text);
  &--compact {
    padding: ui.space(3);
    gap: ui.space(2);
  }
  &--dark {
    --recipe-bg: #1a1e2e;
    --recipe-text: #f1f5f9;
  }
  &__badge {
    color: var(--recipe-accent);
    font-size: ui.rem(11px);
    letter-spacing: 0.12em;
  }
  h3 {
    font-size: ui.rem(20px);
  }
  p {
    max-width: 65ch;
    font-size: ui.rem(14px);
  }
  button {
    align-self: flex-start;
    border-color: var(--recipe-accent);
    color: var(--recipe-accent);
    background: transparent;
  }
}
</style>
`},"2435-af1ef1db-2f0d9c53":{file:"src/views/scss/typography.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ScssRecipeCatalog from '@/components/examples/ScssRecipeCatalog.vue';
export default {
  name: 'Typography',
  components: {
    ScssRecipeCatalog
  },
  data() {
    const lines = 2;
    const width = 440;
    const text =
      '실무에서 긴 제목과 설명을 안전하게 다루는 방법. SCSS 믹스인으로 한 줄 말줄임과 여러 줄 말줄임을 재사용하고, rem과 clamp()로 읽기 편한 타이포그래피를 구성합니다. 콘텐츠 길이가 달라져도 카드 레이아웃은 안정적으로 유지됩니다.';
    return {
      lines,
      width,
      text
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <ScssRecipeCatalog topic="typography" />
    <aside class="demo__output">
      <strong>긴 콘텐츠와 유연한 글자 크기에 대비하세요.</strong>
      <p>
        한 줄 말줄임에는 너비 제한이 필요합니다. 여러 줄 말줄임은 내용을 시각적으로만
        자르며, 원문은 아래에서 펼쳐 읽을 수 있습니다.
      </p>
    </aside>
    <label class="demo__field">
      예제 텍스트
      <textarea v-model="text" rows="3" />
    </label>
    <div class="demo__row">
      <label>
        표시 줄 수
        <select v-model.number="lines" aria-label="말줄임 줄 수">
          <option :value="1">1줄</option>
          <option :value="2">2줄</option>
          <option :value="3">3줄</option>
        </select>
      </label>
      <label>
        최대 너비 {{ width }}px
        <input v-model.number="width" type="range" min="220" max="720" />
      </label>
    </div>
    <article class="type-card" :style="{ width: width + 'px' }">
      <h3>Fluid typography</h3>
      <p
        class="type-card__text"
        :class="'type-card__text--' + lines"
        data-testid="truncated-text"
      >
        {{ text }}
      </p>
      <details>
        <summary>원문 전체 읽기</summary>
        <p>{{ text }}</p>
      </details>
    </article>
    <p class="demo__muted">
      사용처: 상품명, 뉴스 카드, 테이블 셀. clamp()는 최솟값과 최댓값을 모두 지정하고
      브라우저 확대를 고려해 rem을 섞어 사용하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/practice' as ui;
.demo {
  @include custom-scrollbar;
}

.type-card {
  @include ui.surface;
  @include ui.stack;
  max-width: 100%;
  container-type: inline-size;
  h3 {
    font-size: clamp(1.125rem, 1rem + 1.5cqi, 1.75rem);
    line-height: 1.35;
  }
  &__text {
    font-size: ui.rem(15px);
    line-height: 1.8;
    overflow-wrap: anywhere;
    &--1 {
      @include ui.truncate(1);
    }
    &--2 {
      @include ui.truncate(2);
    }
    &--3 {
      @include ui.truncate(3);
    }
  }
  details {
    font-size: ui.rem(12px);
    color: var(--muted);
    summary {
      cursor: pointer;
      color: var(--primary);
    }
    p {
      margin-top: ui.space(3);
      overflow-wrap: anywhere;
    }
  }
}
</style>
`},"10286-fa7042a7-816e1807":JSON.parse(`{"file":"src/views/sm/portal.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport {\\n  Menu,\\n  Sparkles,\\n  Lock,\\n  Shield,\\n  AlertTriangle,\\n  ArrowUpRight,\\n  CheckCircle2,\\n  Paperclip,\\n  ScanEye,\\n  Send,\\n  X,\\n  FileCheck2\\n} from 'lucide-vue-next';\\nimport SmSidebar from '@/components/sm/SmSidebar.vue';\\nimport SmMessage from '@/components/sm/SmMessage.vue';\\nimport { models, scenarioCards } from '@/data/smDemo';\\nimport { useSmChat } from '@/composables/useSmChat';\\nimport { useTheme } from '@/composables/useTheme';\\nexport default {\\n  name: 'Portal',\\n  components: {\\n    Menu,\\n    Sparkles,\\n    Lock,\\n    Shield,\\n    AlertTriangle,\\n    ArrowUpRight,\\n    CheckCircle2,\\n    Paperclip,\\n    ScanEye,\\n    Send,\\n    X,\\n    FileCheck2,\\n    SmSidebar,\\n    SmMessage\\n  },\\n  props: {\\n    standalone: {\\n      type: Boolean,\\n      default: false\\n    }\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const { theme, toggle } = useTheme();\\n    const {\\n      dept,\\n      modelId,\\n      activeAgent,\\n      draft,\\n      attachment,\\n      busy,\\n      notice,\\n      composer,\\n      chatBody,\\n      messages,\\n      history,\\n      sensitive,\\n      showNotice,\\n      reset,\\n      selectConversation,\\n      selectAgent,\\n      send,\\n      loadScenario,\\n      applyMasking,\\n      securityDemo,\\n      rateAnswer\\n    } = useSmChat();\\n    return {\\n      theme,\\n      toggle,\\n      dept,\\n      modelId,\\n      activeAgent,\\n      draft,\\n      attachment,\\n      busy,\\n      notice,\\n      composer,\\n      chatBody,\\n      messages,\\n      history,\\n      sensitive,\\n      showNotice,\\n      reset,\\n      selectConversation,\\n      selectAgent,\\n      send,\\n      loadScenario,\\n      applyMasking,\\n      securityDemo,\\n      rateAnswer\\n    };\\n  },\\n  data() {\\n    const sidebarOpen = false;\\n    const bannerVisible = true;\\n    return {\\n      sidebarOpen,\\n      bannerVisible,\\n      models,\\n      scenarioCards\\n    };\\n  },\\n  computed: {\\n    model() {\\n      return models.find((item) => item.id === this.modelId);\\n    }\\n  },\\n  methods: {\\n    closeSidebar() {\\n      this.sidebarOpen = false;\\n    },\\n    newChat() {\\n      this.reset();\\n      this.closeSidebar();\\n    },\\n    chooseAgent(agent) {\\n      this.selectAgent(agent);\\n      this.closeSidebar();\\n    },\\n    chooseScenario(id) {\\n      this.loadScenario(id, this.model.name);\\n      this.closeSidebar();\\n    },\\n    chooseConversation(id) {\\n      this.selectConversation(id);\\n      this.closeSidebar();\\n    },\\n    handleEnter(event) {\\n      if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {\\n        event.preventDefault();\\n        this.send(this.model.name);\\n      }\\n    },\\n    attachFile(event) {\\n      const file = event.target.files?.[0];\\n      if (file) {\\n        this.attachment = file.name;\\n        this.showNotice('파일명만 첨부했습니다. 내용은 읽거나 서버에 올리지 않습니다.');\\n      }\\n      event.target.value = '';\\n    }\\n  }\\n};\\n<\/script>\\n<template>\\n  <section\\n    class=\\"sm-portal\\"\\n    :class=\\"{\\n      'sm-portal--dark': theme === 'dark',\\n      'sm-portal--standalone': $props.standalone\\n    }\\"\\n    aria-label=\\"SM Samsung Gauss Enterprise 데모\\"\\n    @keydown.esc=\\"closeSidebar\\"\\n  >\\n    <div class=\\"sm-portal__demo\\">\\n      <span>SM · INTERACTIVE WIREFRAME</span>\\n      <RouterLink\\n        v-if=\\"$props.standalone\\"\\n        :to=\\"{ name: 'sm-portal' }\\"\\n        class=\\"sm-portal__guide-link\\"\\n      >\\n        SM 가이드 보기\\n        <ArrowUpRight :size=\\"13\\" />\\n      </RouterLink>\\n      <p>UI 데모 · 샘플 답변 / 인증·사내 문서·보안망 연동 없음</p>\\n    </div>\\n    <div class=\\"sm-portal__workspace\\">\\n      <button\\n        v-if=\\"sidebarOpen\\"\\n        class=\\"sm-portal__overlay\\"\\n        aria-label=\\"SM 메뉴 배경 닫기\\"\\n        @click=\\"closeSidebar\\"\\n      />\\n      <SmSidebar\\n        :open=\\"sidebarOpen\\"\\n        :dark=\\"theme === 'dark'\\"\\n        :dept=\\"dept\\"\\n        :active-agent=\\"activeAgent\\"\\n        :history=\\"history\\"\\n        @close=\\"closeSidebar\\"\\n        @reset=\\"newChat\\"\\n        @agent=\\"chooseAgent\\"\\n        @scenario=\\"chooseScenario\\"\\n        @conversation=\\"chooseConversation\\"\\n        @theme=\\"toggle\\"\\n      />\\n      <div class=\\"sm-portal__main\\">\\n        <header class=\\"sm-portal__header\\">\\n          <div class=\\"sm-portal__model\\">\\n            <button\\n              class=\\"sm-icon-button sm-portal__menu\\"\\n              aria-label=\\"SM 업무 메뉴 열기\\"\\n              :aria-expanded=\\"sidebarOpen\\"\\n              aria-controls=\\"sm-sidebar\\"\\n              @click=\\"sidebarOpen = !sidebarOpen\\"\\n            >\\n              <Menu :size=\\"20\\" />\\n            </button>\\n            <Sparkles :size=\\"18\\" />\\n            <div>\\n              <label for=\\"sm-model\\">업무 모델 선택</label>\\n              <select\\n                id=\\"sm-model\\"\\n                v-model=\\"modelId\\"\\n                @change=\\"showNotice('선택한 모델의 UI로 전환했습니다.')\\"\\n              >\\n                <option v-for=\\"item in models\\" :key=\\"item.id\\" :value=\\"item.id\\">\\n                  {{ item.name }}\\n                </option>\\n              </select>\\n            </div>\\n            <span class=\\"sm-portal__model-level\\">{{ model.level }}</span>\\n          </div>\\n          <div class=\\"sm-portal__permissions\\">\\n            <div class=\\"sm-portal__dept\\" role=\\"group\\" aria-label=\\"부문 권한 시뮬레이션\\">\\n              <button\\n                v-for=\\"item in ['DS', 'DX']\\"\\n                :key=\\"item\\"\\n                :aria-pressed=\\"dept === item\\"\\n                @click=\\"dept = item\\"\\n              >\\n                {{ item }}부문 권한\\n              </button>\\n            </div>\\n            <span class=\\"sm-portal__lock\\">\\n              <Lock :size=\\"13\\" />\\n              DLP 데모\\n            </span>\\n          </div>\\n        </header>\\n        <aside v-if=\\"bannerVisible\\" class=\\"sm-portal__banner\\">\\n          <AlertTriangle :size=\\"16\\" />\\n          <p>\\n            <strong>[사내 보안 규정 준수 안내 UI]</strong>\\n            외부 반출 금지 및 미인가 기밀 입력 주의 안내 영역입니다. 아래 예시는 실제 사내\\n            자료가 아닌 와이어프레임 샘플입니다.\\n          </p>\\n          <button @click=\\"bannerVisible = false\\">확인</button>\\n        </aside>\\n        <div\\n          ref=\\"chatBody\\"\\n          class=\\"sm-portal__chat\\"\\n          role=\\"region\\"\\n          aria-label=\\"SM 대화 내용\\"\\n          tabindex=\\"0\\"\\n        >\\n          <div class=\\"sm-portal__chat-inner\\">\\n            <section v-if=\\"!messages.length\\" class=\\"sm-welcome\\">\\n              <header>\\n                <span class=\\"sm-welcome__badge\\">\\n                  <Shield :size=\\"14\\" />\\n                  {{ dept }}부문 임직원 전용 보안 AI 환경 · 데모\\n                </span>\\n                <h1>\\n                  안녕하세요,\\n                  <em>김삼성 프로</em>\\n                  님.\\n                  <br />\\n                  오늘 어떤 업무를 도와드릴까요?\\n                </h1>\\n                <p>\\n                  사내 Confluence, Knox 메일, 기술 표준 문서를 활용하는\\n                  <br />\\n                  Samsung Gauss Enterprise의 업무 흐름을 체험해 보세요.\\n                </p>\\n              </header>\\n              <div class=\\"sm-welcome__cards\\">\\n                <button\\n                  v-for=\\"card in scenarioCards\\"\\n                  :key=\\"card.id\\"\\n                  :disabled=\\"busy\\"\\n                  @click=\\"chooseScenario(card.id)\\"\\n                >\\n                  <span>\\n                    {{ card.category }}\\n                    <ArrowUpRight :size=\\"16\\" />\\n                  </span>\\n                  <h2>{{ card.title }}</h2>\\n                  <p>{{ card.description }}</p>\\n                </button>\\n              </div>\\n              <div class=\\"sm-welcome__integrations\\">\\n                <span>\\n                  <CheckCircle2 :size=\\"14\\" />\\n                  Confluence 지식 검색 UI\\n                </span>\\n                <span>\\n                  <CheckCircle2 :size=\\"14\\" />\\n                  개인정보 마스킹 시연\\n                </span>\\n                <span>\\n                  <CheckCircle2 :size=\\"14\\" />\\n                  외부 API 호출 없음\\n                </span>\\n              </div>\\n            </section>\\n            <section v-else aria-label=\\"질문과 답변\\">\\n              <SmMessage\\n                v-for=\\"message in messages\\"\\n                :key=\\"message.id\\"\\n                :message=\\"message\\"\\n                @notice=\\"showNotice\\"\\n                @feedback=\\"rateAnswer\\"\\n              />\\n            </section>\\n            <div v-if=\\"busy\\" class=\\"sm-portal__loading\\" role=\\"status\\">\\n              <span class=\\"sm-avatar\\">G</span>\\n              <div>\\n                <span class=\\"sm-portal__dots\\">\\n                  <i />\\n                  <i />\\n                  <i />\\n                </span>\\n                샘플 답변을 준비하고 있습니다…\\n              </div>\\n            </div>\\n          </div>\\n        </div>\\n        <footer class=\\"sm-composer\\">\\n          <div class=\\"sm-composer__inner\\">\\n            <aside v-if=\\"sensitive\\" class=\\"sm-composer__alert\\" role=\\"alert\\">\\n              <div>\\n                <Shield :size=\\"17\\" />\\n                <p>\\n                  <strong>[보안 필터 감지 데모]</strong>\\n                  개인정보 또는 기밀 키워드가 감지되었습니다. 마스킹 후 전송해 주세요.\\n                </p>\\n              </div>\\n              <div>\\n                <button class=\\"sm-button sm-button--danger\\" @click=\\"applyMasking\\">\\n                  자동 마스킹 적용\\n                </button>\\n                <button class=\\"sm-button\\" @click=\\"draft = ''\\">입력 취소</button>\\n              </div>\\n            </aside>\\n            <div v-if=\\"attachment\\" class=\\"sm-composer__attachment\\">\\n              <FileCheck2 :size=\\"16\\" />\\n              <span>{{ attachment }}</span>\\n              <small>파일명 첨부 · 업로드 없음</small>\\n              <button\\n                class=\\"sm-icon-button\\"\\n                aria-label=\\"첨부 삭제\\"\\n                @click=\\"attachment = ''\\"\\n              >\\n                <X :size=\\"14\\" />\\n              </button>\\n            </div>\\n            <form class=\\"sm-composer__box\\" @submit.prevent=\\"send(model.name)\\">\\n              <label class=\\"sm-sr-only\\" for=\\"sm-prompt\\">Samsung Gauss 업무 질문</label>\\n              <textarea\\n                id=\\"sm-prompt\\"\\n                ref=\\"composer\\"\\n                v-model=\\"draft\\"\\n                maxlength=\\"8000\\"\\n                rows=\\"2\\"\\n                placeholder=\\"Samsung Gauss에게 업무 질문을 입력하세요… (Shift + Enter로 줄바꿈)\\"\\n                @keydown=\\"handleEnter\\"\\n              />\\n              <div class=\\"sm-composer__toolbar\\">\\n                <div>\\n                  <input\\n                    ref=\\"fileInput\\"\\n                    type=\\"file\\"\\n                    hidden\\n                    accept=\\".pdf,.doc,.docx,.xls,.xlsx,.txt,.md,.csv\\"\\n                    @change=\\"attachFile\\"\\n                  />\\n                  <button type=\\"button\\" class=\\"sm-button\\" @click=\\"$refs.fileInput.click()\\">\\n                    <Paperclip :size=\\"14\\" />\\n                    문서 첨부\\n                  </button>\\n                  <button\\n                    type=\\"button\\"\\n                    class=\\"sm-button sm-button--demo\\"\\n                    @click=\\"securityDemo\\"\\n                  >\\n                    <ScanEye :size=\\"14\\" />\\n                    보안 필터 감지 데모\\n                  </button>\\n                </div>\\n                <button\\n                  type=\\"submit\\"\\n                  class=\\"sm-button sm-button--primary\\"\\n                  :disabled=\\"busy || !draft.trim()\\"\\n                >\\n                  <span>{{ busy ? '응답 중' : '전송' }}</span>\\n                  <Send :size=\\"14\\" />\\n                </button>\\n              </div>\\n            </form>\\n            <p class=\\"sm-composer__note\\">\\n              {{ model.description }} · 입력·대화는 현재 페이지에서만 유지됩니다.\\n            </p>\\n          </div>\\n        </footer>\\n      </div>\\n    </div>\\n    <div v-if=\\"notice\\" class=\\"sm-portal__toast\\" role=\\"status\\">\\n      <CheckCircle2 :size=\\"16\\" />\\n      {{ notice }}\\n    </div>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/sm/portal';\\n</style>\\n"}`),"280-d3b7483a-ab47a9bc":{file:"src/views/tips/accessibility-forms.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PublishingTipsGuide from '@/components/tips/PublishingTipsGuide.vue';
export default {
  name: 'AccessibilityForms',
  components: {
    PublishingTipsGuide
  }
};
<\/script>
<template>
  <section class="tips-view"><PublishingTipsGuide category="accessibility" /></section>
</template>
<style scoped lang="scss">
.tips-view {
  min-width: 0;
}
</style>
`},"273-20ace6eb-f0285981":{file:"src/views/tips/assets-motion.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PublishingTipsGuide from '@/components/tips/PublishingTipsGuide.vue';
export default {
  name: 'AssetsMotion',
  components: {
    PublishingTipsGuide
  }
};
<\/script>
<template>
  <section class="tips-view"><PublishingTipsGuide category="assets" /></section>
</template>
<style scoped lang="scss">
.tips-view {
  min-width: 0;
}
</style>
`},"276-c2f2a276-db424812":{file:"src/views/tips/checklist.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PublishingTipsGuide from '@/components/tips/PublishingTipsGuide.vue';
export default {
  name: 'Checklist',
  components: {
    PublishingTipsGuide
  }
};
<\/script>
<template>
  <section class="tips-view"><PublishingTipsGuide category="checklist" /></section>
</template>
<style scoped lang="scss">
.tips-view {
  min-width: 0;
}
</style>
`},"271-ab12eab2-e08cdbc6":{file:"src/views/tips/data-performance.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PublishingTipsGuide from '@/components/tips/PublishingTipsGuide.vue';
export default {
  name: 'DataPerformance',
  components: {
    PublishingTipsGuide
  }
};
<\/script>
<template>
  <section class="tips-view"><PublishingTipsGuide category="data" /></section>
</template>
<style scoped lang="scss">
.tips-view {
  min-width: 0;
}
</style>
`},"273-67664b80-b0f65644":{file:"src/views/tips/layout-defense.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PublishingTipsGuide from '@/components/tips/PublishingTipsGuide.vue';
export default {
  name: 'LayoutDefense',
  components: {
    PublishingTipsGuide
  }
};
<\/script>
<template>
  <section class="tips-view"><PublishingTipsGuide category="layout" /></section>
</template>
<style scoped lang="scss">
.tips-view {
  min-width: 0;
}
</style>
`},"273-24df8616-a8c518e6":{file:"src/views/tips/markup-directives.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PublishingTipsGuide from '@/components/tips/PublishingTipsGuide.vue';
export default {
  name: 'MarkupDirectives',
  components: {
    PublishingTipsGuide
  }
};
<\/script>
<template>
  <section class="tips-view"><PublishingTipsGuide category="markup" /></section>
</template>
<style scoped lang="scss">
.tips-view {
  min-width: 0;
}
</style>
`},"273-8ea049a8-6d1eeb6e":{file:"src/views/tips/style-architecture.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PublishingTipsGuide from '@/components/tips/PublishingTipsGuide.vue';
export default {
  name: 'StyleArchitecture',
  components: {
    PublishingTipsGuide
  }
};
<\/script>
<template>
  <section class="tips-view"><PublishingTipsGuide category="styles" /></section>
</template>
<style scoped lang="scss">
.tips-view {
  min-width: 0;
}
</style>
`},"275-3bbab9d7-2331cf01":{file:"src/views/tips/workflow-release.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import PublishingTipsGuide from '@/components/tips/PublishingTipsGuide.vue';
export default {
  name: 'WorkflowRelease',
  components: {
    PublishingTipsGuide
  }
};
<\/script>
<template>
  <section class="tips-view"><PublishingTipsGuide category="workflow" /></section>
</template>
<style scoped lang="scss">
.tips-view {
  min-width: 0;
}
</style>
`},"16919-50b8f404-752c50f4":JSON.parse(`{"file":"src/views/tools/ai-assistant.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport SyntaxCode from '@/components/common/SyntaxCode.vue';\\nimport { staticDeployment, staticAiStatus } from '@/composables/aiDeployment';\\nimport { nextTick } from 'vue';\\nimport {\\n  Sparkles,\\n  Send,\\n  Copy,\\n  Check,\\n  Trash2,\\n  RefreshCw,\\n  Square,\\n  MessageCircle\\n} from 'lucide-vue-next';\\nimport { useClipboard } from '@/composables/useClipboard';\\nimport { buildConversation, answerBlocks } from '@/composables/assistantText';\\nexport default {\\n  name: 'AiAssistant',\\n  components: {\\n    SyntaxCode,\\n    Sparkles,\\n    Send,\\n    Copy,\\n    Check,\\n    Trash2,\\n    RefreshCw,\\n    Square,\\n    MessageCircle\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const { copy, copied } = useClipboard();\\n    return {\\n      copy,\\n      copied\\n    };\\n  },\\n  data() {\\n    const privateAiUrl = 'https://vue-guide-personal-ai.cheerytapioca1.chatgpt.site/';\\n    const hostedPrivate = import.meta.env.VITE_PRIVATE_AI === 'true';\\n    const provider = 'gemini';\\n    const names = {\\n      gemini: 'Gemini',\\n      openai: 'OpenAI'\\n    };\\n    const status = null;\\n    const statusError = '';\\n    const error = '';\\n    const messages = [];\\n    const question = '';\\n    const pending = '';\\n    const busy = false;\\n    const copiedId = null;\\n    let sequence = 0;\\n    let controller;\\n    let statusController;\\n    return {\\n      privateAiUrl,\\n      hostedPrivate,\\n      provider,\\n      names,\\n      status,\\n      statusError,\\n      error,\\n      messages,\\n      question,\\n      pending,\\n      busy,\\n      copiedId,\\n      sequence,\\n      controller,\\n      statusController,\\n      staticDeployment,\\n      answerBlocks\\n    };\\n  },\\n  computed: {\\n    active() {\\n      return this.status?.providers?.[this.provider];\\n    },\\n    ready() {\\n      return this.active?.configured === true;\\n    },\\n    valid() {\\n      return this.question.trim().length > 0 && this.question.length <= 4000;\\n    }\\n  },\\n  methods: {\\n    async checkStatus() {\\n      if (staticDeployment) {\\n        this.status = staticAiStatus();\\n        this.statusError = '';\\n        return;\\n      }\\n      this.statusController?.abort();\\n      this.statusController = new AbortController();\\n      this.status = null;\\n      this.statusError = '';\\n      try {\\n        const response = await fetch('/api/bem/status', {\\n          signal: this.statusController.signal\\n        });\\n        const data = await response.json();\\n        if (\\n          !response.ok ||\\n          typeof data.csrfToken !== 'string' ||\\n          !['gemini', 'openai'].every(\\n            (name) => typeof data.providers?.[name]?.configured === 'boolean'\\n          )\\n        )\\n          throw new Error();\\n        this.status = data;\\n      } catch (e) {\\n        if (e.name !== 'AbortError')\\n          this.statusError =\\n            '서버에 연결할 수 없습니다. 개발 서버를 확인한 후 다시 시도하세요.';\\n      }\\n    },\\n    async scroll() {\\n      await nextTick();\\n      this.$refs.feed?.scrollTo({\\n        top: this.$refs.feed.scrollHeight,\\n        behavior: 'smooth'\\n      });\\n    },\\n    async send() {\\n      if (!this.ready || !this.valid || this.busy) return;\\n      const text = this.question.trim(),\\n        selected = this.provider;\\n      const history = buildConversation(this.messages, text);\\n      this.busy = true;\\n      this.pending = text;\\n      this.error = '';\\n      this.controller = new AbortController();\\n      this.scroll();\\n      try {\\n        const response = await fetch('/api/assistant/chat', {\\n          method: 'POST',\\n          headers: {\\n            'Content-Type': 'application/json',\\n            'X-BEM-Token': this.status.csrfToken\\n          },\\n          body: JSON.stringify({\\n            provider: selected,\\n            messages: history\\n          }),\\n          signal: this.controller.signal\\n        });\\n        let data;\\n        try {\\n          data = await response.json();\\n        } catch {\\n          throw new Error('서버 응답을 읽지 못했습니다. 연결 상태를 확인하세요.');\\n        }\\n        if (!response.ok)\\n          throw new Error(data.error || '답변을 받지 못했습니다. 다시 시도하세요.');\\n        if (typeof data.answer !== 'string' || !data.answer.trim())\\n          throw new Error('답변이 비어 있습니다. 다시 질문해 주세요.');\\n        this.messages.push(\\n          {\\n            id: ++this.sequence,\\n            role: 'user',\\n            content: text\\n          },\\n          {\\n            id: ++this.sequence,\\n            role: 'assistant',\\n            content: data.answer,\\n            provider: data.provider || selected,\\n            model: data.model\\n          }\\n        );\\n        this.question = '';\\n      } catch (e) {\\n        this.error =\\n          e.name === 'AbortError'\\n            ? '답변 요청을 취소했습니다. 질문은 유지됩니다.'\\n            : e instanceof TypeError\\n              ? '서버에 연결하지 못했습니다. 네트워크를 확인하세요.'\\n              : e.message;\\n      } finally {\\n        this.pending = '';\\n        this.busy = false;\\n        await this.scroll();\\n        this.$refs.input?.focus();\\n      }\\n    },\\n    reset() {\\n      this.messages = [];\\n      this.error = '';\\n      this.question = '';\\n      this.copiedId = null;\\n      this.$refs.input?.focus();\\n    },\\n    sample() {\\n      this.messages = [\\n        {\\n          id: ++this.sequence,\\n          role: 'user',\\n          content: 'Vue의 computed와 watch는 언제 사용하나요?'\\n        },\\n        {\\n          id: ++this.sequence,\\n          role: 'assistant',\\n          provider: 'sample',\\n          model: '로컬 샘플',\\n          content:\\n            'computed는 상태에서 새로운 값을 계산할 때 사용합니다. watch는 상태 변경에 따라 API 호출 같은 부수 효과를 실행할 때 사용합니다.\\\\n\\\\n\`\`\`js\\\\nconst total = computed(() => price.value * quantity.value)\\\\nwatch(keyword, (value) => search(value))\\\\n\`\`\`\\\\n이 대화는 미리 작성한 로컬 샘플이며 API를 호출하지 않았습니다.'\\n        }\\n      ];\\n      this.scroll();\\n    },\\n    async copyAnswer(message) {\\n      await this.copy(message.content, '답변');\\n      if (this.copied) this.copiedId = message.id;\\n    },\\n    usePrompt(text) {\\n      this.question = text;\\n      this.$refs.input?.focus();\\n    }\\n  },\\n  mounted() {\\n    this.checkStatus();\\n  },\\n  unmounted() {\\n    this.controller?.abort();\\n    this.statusController?.abort();\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"demo ai-assistant\\">\\n    <header class=\\"ai-assistant__intro\\">\\n      <span class=\\"ai-assistant__symbol\\"><Sparkles :size=\\"26\\" /></span>\\n      <section>\\n        <h3>궁금한 것을 물어보세요.</h3>\\n        <p>개발 질문부터 개념 설명, 글 정리까지. 이어지는 질문도 함께 나눠요.</p>\\n      </section>\\n    </header>\\n    <section class=\\"ai-assistant__settings\\">\\n      <label>\\n        AI 공급자\\n        <select\\n          v-model=\\"provider\\"\\n          aria-label=\\"질문 AI 공급자\\"\\n          :disabled=\\"busy\\"\\n          @change=\\"error = ''\\"\\n        >\\n          <option value=\\"gemini\\">Gemini</option>\\n          <option value=\\"openai\\">OpenAI (GPT)</option>\\n        </select>\\n      </label>\\n      <section aria-live=\\"polite\\">\\n        <strong>\\n          {{\\n            staticDeployment\\n              ? '공개 샘플 · 개인 AI는 기기 등록 후 이용'\\n              : statusError\\n                ? '서버 확인 필요'\\n                : status === null\\n                  ? '설정 확인 중…'\\n                  : ready\\n                    ? names[provider] + ' API 키 설정됨'\\n                    : names[provider] + ' API 키 미설정'\\n          }}\\n        </strong>\\n        <p v-if=\\"active\\">\\n          {{\\n            staticDeployment\\n              ? '등록된 브라우저의 개인 AI 화면에서 질문할 수 있습니다.'\\n              : active.model\\n          }}\\n        </p>\\n      </section>\\n      <button :disabled=\\"busy\\" @click=\\"checkStatus\\">\\n        <RefreshCw :size=\\"14\\" />\\n        설정 확인\\n      </button>\\n    </section>\\n    <p v-if=\\"statusError\\" class=\\"demo__error\\" role=\\"alert\\">{{ statusError }}</p>\\n    <aside v-if=\\"staticDeployment\\" class=\\"ai-assistant__notice\\">\\n      공개 화면은 샘플 대화입니다. 실제 질문은 아래 ‘개인 AI 바로 사용하기’에서 본인 전용 AI\\n      화면을 열어 이용하세요. API 키는 전용 서버에 보관합니다.\\n    </aside>\\n    <aside v-else-if=\\"hostedPrivate && status && !ready\\" class=\\"ai-assistant__notice\\">\\n      선택한 공급자의 서버 API 키가 아직 설정되지 않았습니다. 설정된 공급자를 선택해 주세요.\\n    </aside>\\n    <aside v-else-if=\\"status && !ready\\" class=\\"ai-assistant__notice\\">\\n      기존 BEM 생성기와 같은 개인 API 키를 사용합니다.\\n      <RouterLink to=\\"/tools/bem-generator\\">API 연결 방법 보기 →</RouterLink>\\n    </aside>\\n    <header class=\\"ai-assistant__toolbar\\">\\n      <span>\\n        <MessageCircle :size=\\"15\\" />\\n        {{\\n          messages.length\\n            ? '대화 중 · ' + Math.floor(messages.length / 2) + '문답'\\n            : '새 대화'\\n        }}\\n      </span>\\n      <button :disabled=\\"busy || !messages.length\\" @click=\\"reset\\">\\n        <Trash2 :size=\\"14\\" />\\n        대화 초기화\\n      </button>\\n    </header>\\n    <section\\n      ref=\\"feed\\"\\n      class=\\"ai-assistant__feed\\"\\n      role=\\"log\\"\\n      aria-live=\\"polite\\"\\n      aria-label=\\"AI 질문과 답변\\"\\n      tabindex=\\"0\\"\\n    >\\n      <section v-if=\\"!messages.length && !busy\\" class=\\"ai-assistant__empty\\">\\n        <Sparkles :size=\\"32\\" />\\n        <h4>어떤 질문으로 시작할까요?</h4>\\n        <p>\\n          {{\\n            staticDeployment\\n              ? '샘플 대화를 확인하거나 기기를 등록한 개인 AI 화면에서 질문하세요.'\\n              : '질문 예시를 눌러 내용을 바꾼 뒤 전송하세요.'\\n          }}\\n        </p>\\n        <div class=\\"ai-assistant__prompts\\">\\n          <button\\n            v-for=\\"prompt in [\\n              'Vue의 computed와 watch 차이를 알려줘',\\n              'SCSS Mixin을 쉬운 예제로 설명해줘',\\n              '좋은 회의 안건을 작성하는 방법을 알려줘'\\n            ]\\"\\n            :key=\\"prompt\\"\\n            @click=\\"usePrompt(prompt)\\"\\n          >\\n            {{ prompt }} ↗\\n          </button>\\n        </div>\\n        <button class=\\"ai-assistant__sample\\" @click=\\"sample\\">\\n          샘플 대화 보기 · API 호출 없음\\n        </button>\\n      </section>\\n      <article\\n        v-for=\\"message in messages\\"\\n        :key=\\"message.id\\"\\n        class=\\"ai-assistant__message\\"\\n        :class=\\"{ 'ai-assistant__message--user': message.role === 'user' }\\"\\n      >\\n        <header>\\n          <span>\\n            {{\\n              message.role === 'user'\\n                ? '나'\\n                : message.provider === 'sample'\\n                  ? '로컬 샘플'\\n                  : names[message.provider] || 'AI'\\n            }}\\n          </span>\\n          <small v-if=\\"message.model\\">{{ message.model }}</small>\\n        </header>\\n        <section class=\\"ai-assistant__bubble\\">\\n          <template v-if=\\"message.role === 'assistant'\\">\\n            <template v-for=\\"(block, i) in answerBlocks(message.content)\\" :key=\\"i\\">\\n              <section v-if=\\"block.type === 'code'\\" class=\\"ai-assistant__code\\">\\n                <small>{{ block.language || 'code' }}</small>\\n                <SyntaxCode\\n                  :code=\\"block.text\\"\\n                  :language=\\"block.language\\"\\n                  label=\\"답변 코드\\"\\n                />\\n              </section>\\n              <p v-else>{{ block.text }}</p>\\n            </template>\\n          </template>\\n          <p v-else>{{ message.content }}</p>\\n        </section>\\n        <button\\n          v-if=\\"message.role === 'assistant'\\"\\n          class=\\"ai-assistant__copy\\"\\n          :aria-label=\\"'답변 ' + message.id + ' 복사'\\"\\n          @click=\\"copyAnswer(message)\\"\\n        >\\n          <Check v-if=\\"copied && copiedId === message.id\\" :size=\\"12\\" />\\n          <Copy v-else :size=\\"12\\" />\\n          {{ copied && copiedId === message.id ? '복사됨 ✓' : '답변 복사' }}\\n        </button>\\n      </article>\\n      <article v-if=\\"busy\\" class=\\"ai-assistant__message ai-assistant__message--user\\">\\n        <header>나</header>\\n        <p class=\\"ai-assistant__bubble\\">{{ pending }}</p>\\n      </article>\\n      <p v-if=\\"busy\\" class=\\"ai-assistant__thinking\\" role=\\"status\\">\\n        {{ names[provider] }}가 답변을 작성하고 있습니다…\\n      </p>\\n    </section>\\n    <form class=\\"ai-assistant__form\\" @submit.prevent=\\"send\\">\\n      <label class=\\"demo__field\\">\\n        질문\\n        <textarea\\n          ref=\\"input\\"\\n          v-model=\\"question\\"\\n          aria-label=\\"AI에게 질문\\"\\n          rows=\\"3\\"\\n          maxlength=\\"4000\\"\\n          :disabled=\\"busy\\"\\n          placeholder=\\"궁금한 것을 입력하세요. Shift+Enter로 줄바꿈, Enter로 전송\\"\\n          @keydown.enter.exact=\\"\\n            (event) => {\\n              if (!event.isComposing) {\\n                event.preventDefault();\\n                send();\\n              }\\n            }\\n          \\"\\n        />\\n      </label>\\n      <footer>\\n        <span>{{ question.length.toLocaleString() }} / 4,000</span>\\n        <button v-if=\\"busy\\" type=\\"button\\" @click=\\"controller?.abort()\\">\\n          <Square :size=\\"13\\" />\\n          취소\\n        </button>\\n        <a\\n          v-if=\\"staticDeployment\\"\\n          :href=\\"privateAiUrl\\"\\n          target=\\"_blank\\"\\n          rel=\\"noopener noreferrer\\"\\n          class=\\"ai-assistant__private-link\\"\\n        >\\n          개인 AI 바로 사용하기 ↗\\n        </a>\\n        <button\\n          v-else\\n          type=\\"submit\\"\\n          class=\\"demo__primary\\"\\n          :disabled=\\"busy || !ready || !valid\\"\\n        >\\n          <Send :size=\\"14\\" />\\n          질문 전송\\n        </button>\\n      </footer>\\n    </form>\\n    <p v-if=\\"error\\" role=\\"alert\\" class=\\"demo__error\\">{{ error }}</p>\\n    <aside v-if=\\"staticDeployment\\" class=\\"ai-assistant__privacy\\">\\n      샘플 대화는 미리 작성된 예시이며 외부 AI API를 호출하지 않습니다.\\n    </aside>\\n    <aside v-else class=\\"ai-assistant__privacy\\">\\n      <p>\\n        질문과 최근 대화가 선택한 API로 전송되며 계정의 사용 한도·과금 설정이 적용됩니다.\\n        공급자를 바꾸면 다음 질문의 최근 대화도 해당 공급자에게 전송됩니다.\\n      </p>\\n      <p>\\n        대화는 이 화면의 메모리에만 유지되며 새로고침하면 지워집니다. 긴 대화는 최근 일부만\\n        참조합니다. 실시간 인터넷 검색이나 프로젝트 파일 자동 열람은 지원하지 않습니다.\\n      </p>\\n    </aside>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/mixins' as *;\\n.ai-assistant {\\n  @include custom-scrollbar;\\n  min-width: 0;\\n  gap: 20px;\\n  &__private-link {\\n    display: inline-flex;\\n    align-items: center;\\n    padding: 10px 14px;\\n    border-radius: 10px;\\n    background: var(--primary);\\n    color: #fff;\\n    font-size: 12px;\\n    font-weight: 600;\\n    text-decoration: none;\\n    &:hover {\\n      background: var(--hover);\\n    }\\n  }\\n  &__intro {\\n    display: flex;\\n    align-items: center;\\n    gap: 15px;\\n    h3 {\\n      font-size: 21px;\\n      letter-spacing: -0.5px;\\n    }\\n    p {\\n      font-size: 12px;\\n      color: var(--muted);\\n      margin-top: 5px;\\n    }\\n  }\\n  &__symbol {\\n    @include flex-center;\\n    width: 54px;\\n    height: 54px;\\n    background: var(--soft);\\n    border-radius: 16px;\\n    color: var(--primary);\\n    flex-shrink: 0;\\n  }\\n  &__settings {\\n    @include card-surface;\\n    @include flex-between;\\n    flex-wrap: wrap;\\n    padding: 16px;\\n    label {\\n      font-size: 12px;\\n    }\\n    strong {\\n      font-size: 11px;\\n    }\\n    p {\\n      font-size: 10px;\\n      color: var(--caption);\\n    }\\n    section {\\n      margin-right: auto;\\n    }\\n    button {\\n      font-size: 11px;\\n      display: flex;\\n      gap: 6px;\\n      align-items: center;\\n    }\\n  }\\n  &__notice {\\n    background: var(--soft);\\n    padding: 14px;\\n    border-radius: 10px;\\n    font-size: 12px;\\n    a {\\n      color: var(--primary);\\n    }\\n  }\\n  &__toolbar {\\n    @include flex-between;\\n    font-size: 11px;\\n    color: var(--muted);\\n    span,\\n    button {\\n      display: flex;\\n      align-items: center;\\n      gap: 6px;\\n    }\\n    button {\\n      font-size: 11px;\\n    }\\n  }\\n  &__feed {\\n    @include custom-scrollbar;\\n    background: var(--canvas);\\n    border: 1px solid var(--border);\\n    border-radius: 14px;\\n    height: 520px;\\n    max-height: 70vh;\\n    min-height: 300px;\\n    padding: 24px;\\n    overflow: auto;\\n    display: flex;\\n    flex-direction: column;\\n    gap: 22px;\\n  }\\n  &__empty {\\n    display: grid;\\n    justify-items: center;\\n    align-content: center;\\n    gap: 12px;\\n    text-align: center;\\n    min-height: 100%;\\n    > svg {\\n      color: var(--primary);\\n    }\\n    h4 {\\n      font-size: 19px;\\n    }\\n    p {\\n      color: var(--caption);\\n      font-size: 12px;\\n    }\\n  }\\n  &__prompts {\\n    display: grid;\\n    gap: 8px;\\n    max-width: 100%;\\n    margin: 8px 0;\\n    button {\\n      text-align: left;\\n      font-size: 12px;\\n      padding: 12px 16px;\\n    }\\n  }\\n  &__sample {\\n    font-size: 10px;\\n    color: var(--muted);\\n    border: 0;\\n    background: none;\\n  }\\n  &__message {\\n    align-self: flex-start;\\n    max-width: 90%;\\n    min-width: 0;\\n    header {\\n      display: flex;\\n      align-items: center;\\n      gap: 8px;\\n      font-size: 11px;\\n      font-weight: 600;\\n      margin-bottom: 7px;\\n      color: var(--muted);\\n      small {\\n        font-size: 9px;\\n        font-weight: 400;\\n        color: var(--caption);\\n      }\\n    }\\n    &--user {\\n      align-self: flex-end;\\n      header {\\n        justify-content: flex-end;\\n      }\\n      .ai-assistant__bubble {\\n        background: var(--primary);\\n        color: white;\\n        border: 0;\\n        border-radius: 14px 0 14px 14px;\\n      }\\n    }\\n  }\\n  &__bubble {\\n    padding: 16px 20px;\\n    border: 1px solid var(--border);\\n    border-radius: 0 14px 14px 14px;\\n    background: var(--surface);\\n    font-size: 13px;\\n    line-height: 1.9;\\n    overflow-wrap: anywhere;\\n    p {\\n      white-space: pre-wrap;\\n    }\\n    p:empty {\\n      display: none;\\n    }\\n  }\\n  &__code {\\n    background: #1e1e1e;\\n    color: #d4d4d4;\\n    border-radius: 8px;\\n    margin: 12px 0;\\n    overflow: hidden;\\n    small {\\n      display: block;\\n      font-size: 9px;\\n      padding: 7px 14px;\\n      border-bottom: 1px solid #334155;\\n    }\\n    :deep(.syntax-code) {\\n      @include custom-scrollbar;\\n      overflow: auto;\\n      padding: 14px;\\n      margin: 0;\\n      font-size: 11px;\\n      line-height: 1.8;\\n      max-height: 350px;\\n    }\\n  }\\n  &__copy {\\n    display: flex;\\n    align-items: center;\\n    gap: 5px;\\n    font-size: 9px;\\n    border: 0;\\n    padding: 4px 0;\\n    background: none;\\n    color: var(--caption);\\n  }\\n  &__thinking {\\n    font-size: 12px;\\n    color: var(--primary);\\n    padding: 10px;\\n  }\\n  &__form {\\n    display: grid;\\n    gap: 10px;\\n    label {\\n      font-size: 12px;\\n    }\\n    textarea {\\n      resize: vertical;\\n      min-height: 90px;\\n      font-size: 13px;\\n    }\\n    footer {\\n      display: flex;\\n      align-items: center;\\n      justify-content: flex-end;\\n      gap: 10px;\\n      font-size: 10px;\\n      color: var(--caption);\\n      span {\\n        margin-right: auto;\\n      }\\n      button {\\n        display: inline-flex;\\n        align-items: center;\\n        gap: 7px;\\n        font-size: 12px;\\n      }\\n    }\\n  }\\n  &__privacy {\\n    border-top: 1px solid var(--border);\\n    padding-top: 15px;\\n    color: var(--caption);\\n    font-size: 10px;\\n    p + p {\\n      margin-top: 6px;\\n    }\\n  }\\n  @include responsive(mobile) {\\n    &__intro h3 {\\n      font-size: 18px;\\n    }\\n    &__settings {\\n      gap: 12px;\\n    }\\n    &__feed {\\n      padding: 16px;\\n      max-height: 60vh;\\n    }\\n    &__message {\\n      max-width: 96%;\\n    }\\n    &__bubble {\\n      padding: 13px 15px;\\n      font-size: 12px;\\n    }\\n    &__empty h4 {\\n      font-size: 16px;\\n    }\\n    &__prompts button {\\n      font-size: 11px;\\n    }\\n  }\\n}\\n</style>\\n"}`),"27906-ee7ed883-31765949":JSON.parse(`{"file":"src/views/tools/bem-generator.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport SyntaxCode from '@/components/common/SyntaxCode.vue';\\nimport { staticDeployment, staticAiStatus } from '@/composables/aiDeployment';\\nimport {\\n  Sparkles,\\n  ArrowRight,\\n  Copy,\\n  Check,\\n  ShieldCheck,\\n  RefreshCw,\\n  Code2,\\n  Square\\n} from 'lucide-vue-next';\\nimport { useClipboard } from '@/composables/useClipboard';\\nimport { buildBemScss, sampleMarkup, sampleResult } from '@/composables/bemOutput';\\nimport {\\n  bemPatterns,\\n  bemPatternCategories,\\n  createBemPattern\\n} from '@/composables/bemPatterns';\\nexport default {\\n  name: 'BemGenerator',\\n  components: {\\n    SyntaxCode,\\n    Sparkles,\\n    ArrowRight,\\n    Copy,\\n    Check,\\n    ShieldCheck,\\n    RefreshCw,\\n    Code2,\\n    Square\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const { copied, copy } = useClipboard();\\n    return {\\n      copied,\\n      copy\\n    };\\n  },\\n  data() {\\n    const mode = 'buttons';\\n    const modes = [\\n      {\\n        id: 'buttons',\\n        label: '버튼으로 생성',\\n        description: '54가지 패턴 · API 없이 사용'\\n      },\\n      {\\n        id: 'ai',\\n        label: 'AI로 생성',\\n        description: '원본 마크업 분석 · Gemini / OpenAI'\\n      }\\n    ];\\n    const modeOutputs = Object.fromEntries(\\n      modes.map(({ id }) => [\\n        id,\\n        {\\n          result: null,\\n          resultSource: '',\\n          generatedModel: '',\\n          tab: 'html',\\n          stale: false\\n        }\\n      ])\\n    );\\n    const patternQuery = '';\\n    const patternCategory = '전체';\\n    const patternBlock = '';\\n    const patternError = '';\\n    const selectedPattern = '';\\n    const provider = 'gemini';\\n    const providerInfo = {\\n      gemini: {\\n        label: 'Gemini',\\n        key: 'GEMINI_API_KEY',\\n        model: 'GEMINI_MODEL',\\n        url: 'https://aistudio.google.com/apikey',\\n        portal: 'Google AI Studio'\\n      },\\n      openai: {\\n        label: 'OpenAI',\\n        key: 'OPENAI_API_KEY',\\n        model: 'OPENAI_MODEL',\\n        url: 'https://platform.openai.com/api-keys',\\n        portal: 'OpenAI API Platform'\\n      }\\n    };\\n    const markup = '';\\n    const blockName = '';\\n    const context = '';\\n    const busy = false;\\n    const status = null;\\n    const statusError = '';\\n    const error = '';\\n    let controller;\\n    let statusController;\\n    const tabs = [\\n      {\\n        id: 'html',\\n        label: '변환 HTML'\\n      },\\n      {\\n        id: 'scss',\\n        label: 'SCSS 뼈대'\\n      },\\n      {\\n        id: 'classes',\\n        label: '클래스 목록'\\n      }\\n    ];\\n    return {\\n      mode,\\n      modes,\\n      modeOutputs,\\n      patternQuery,\\n      patternCategory,\\n      patternBlock,\\n      patternError,\\n      selectedPattern,\\n      provider,\\n      providerInfo,\\n      markup,\\n      blockName,\\n      context,\\n      busy,\\n      status,\\n      statusError,\\n      error,\\n      controller,\\n      statusController,\\n      tabs,\\n      staticDeployment,\\n      bemPatterns,\\n      bemPatternCategories\\n    };\\n  },\\n  computed: {\\n    patternGroups() {\\n      return bemPatternCategories\\n        .map((category) => ({\\n          category,\\n          items: bemPatterns.filter(\\n            (item) =>\\n              item.category === category &&\\n              (this.patternCategory === '전체' || item.category === this.patternCategory) &&\\n              \`\${item.id} \${item.label} \${item.description}\`\\n                .toLowerCase()\\n                .includes(this.patternQuery.toLowerCase())\\n          )\\n        }))\\n        .filter((group) => group.items.length);\\n    },\\n    selectedProvider() {\\n      return this.providerInfo[this.provider];\\n    },\\n    activeStatus() {\\n      return this.status?.providers?.[this.provider];\\n    },\\n    result: {\\n      get() {\\n        return this.modeOutputs[this.mode]['result'];\\n      },\\n      set(value) {\\n        this.modeOutputs[this.mode]['result'] = value;\\n      }\\n    },\\n    resultSource: {\\n      get() {\\n        return this.modeOutputs[this.mode]['resultSource'];\\n      },\\n      set(value) {\\n        this.modeOutputs[this.mode]['resultSource'] = value;\\n      }\\n    },\\n    generatedModel: {\\n      get() {\\n        return this.modeOutputs[this.mode]['generatedModel'];\\n      },\\n      set(value) {\\n        this.modeOutputs[this.mode]['generatedModel'] = value;\\n      }\\n    },\\n    tab: {\\n      get() {\\n        return this.modeOutputs[this.mode]['tab'];\\n      },\\n      set(value) {\\n        this.modeOutputs[this.mode]['tab'] = value;\\n      }\\n    },\\n    stale: {\\n      get() {\\n        return this.modeOutputs[this.mode]['stale'];\\n      },\\n      set(value) {\\n        this.modeOutputs[this.mode]['stale'] = value;\\n      }\\n    },\\n    output() {\\n      return !this.result\\n        ? ''\\n        : this.tab === 'html'\\n          ? this.result.markup\\n          : this.tab === 'scss'\\n            ? buildBemScss(this.result.classes)\\n            : this.result.classes.map((c) => c.name).join('\\\\n');\\n    },\\n    valid() {\\n      return (\\n        this.markup.trim().length >= 3 &&\\n        this.markup.length <= 12000 &&\\n        /<\\\\s*[a-zA-Z][^>]*>/.test(this.markup) &&\\n        (!this.blockName || /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(this.blockName))\\n      );\\n    },\\n    ready() {\\n      return this.activeStatus?.configured === true;\\n    }\\n  },\\n  methods: {\\n    onModeKey(event) {\\n      if (this.busy || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))\\n        return;\\n      event.preventDefault();\\n      const next =\\n        event.key === 'Home'\\n          ? 'buttons'\\n          : event.key === 'End'\\n            ? 'ai'\\n            : this.mode === 'buttons'\\n              ? 'ai'\\n              : 'buttons';\\n      this.mode = next;\\n      event.currentTarget.parentElement.querySelector('#bem-mode-' + next)?.focus();\\n    },\\n    usePattern(id) {\\n      if (this.busy) return;\\n      try {\\n        const generated = createBemPattern(id, this.patternBlock);\\n        this.result = generated;\\n        this.selectedPattern = id;\\n        this.resultSource = 'preset';\\n        this.generatedModel = '';\\n        this.tab = 'html';\\n        this.stale = false;\\n        this.error = '';\\n        this.patternError = '';\\n      } catch (e) {\\n        this.patternError = e.message;\\n      }\\n    },\\n    async checkStatus() {\\n      if (staticDeployment) {\\n        this.status = staticAiStatus();\\n        this.statusError = '';\\n        return;\\n      }\\n      this.statusController?.abort();\\n      this.statusController = new AbortController();\\n      this.statusError = '';\\n      this.status = null;\\n      try {\\n        const response = await fetch('/api/bem/status', {\\n          signal: this.statusController.signal\\n        });\\n        const data = await response.json();\\n        if (\\n          !response.ok ||\\n          typeof data.csrfToken !== 'string' ||\\n          data.csrfToken.length < 32 ||\\n          !['gemini', 'openai'].every(\\n            (name) => typeof data.providers?.[name]?.configured === 'boolean'\\n          )\\n        )\\n          throw new Error();\\n        this.status = data;\\n      } catch (e) {\\n        if (e.name !== 'AbortError')\\n          this.statusError =\\n            'BEM API에 연결할 수 없습니다. 개발 서버를 재시작한 후 다시 확인하세요.';\\n      }\\n    },\\n    edit() {\\n      if (this.result && this.resultSource !== 'preset') this.stale = true;\\n    },\\n    loadExample() {\\n      this.markup = sampleMarkup;\\n      this.blockName = 'product-card';\\n      this.context = '';\\n      this.edit();\\n    },\\n    showSample() {\\n      this.loadExample();\\n      this.result = structuredClone(sampleResult);\\n      this.resultSource = 'sample';\\n      this.generatedModel = '';\\n      this.tab = 'html';\\n      this.stale = false;\\n      this.error = '';\\n    },\\n    async generate() {\\n      if (!this.valid || !this.ready || this.busy) return;\\n      this.busy = true;\\n      this.error = '';\\n      this.controller = new AbortController();\\n      const snapshot = {\\n        input: this.markup,\\n        blockName: this.blockName,\\n        context: this.context,\\n        provider: this.provider\\n      };\\n      try {\\n        const response = await fetch('/api/bem/generate', {\\n          method: 'POST',\\n          headers: {\\n            'Content-Type': 'application/json',\\n            'X-BEM-Token': this.status.csrfToken\\n          },\\n          body: JSON.stringify(snapshot),\\n          signal: this.controller.signal\\n        });\\n        let data;\\n        try {\\n          data = await response.json();\\n        } catch {\\n          throw new Error('서버 응답을 읽지 못했습니다. 개발 서버 연결을 확인하세요.');\\n        }\\n        if (!response.ok)\\n          throw new Error(data.error || '생성에 실패했습니다. 다시 시도하세요.');\\n        if (!data.result?.classes?.length || typeof data.result.markup !== 'string')\\n          throw new Error('응답 형식을 확인할 수 없습니다. 다시 생성하세요.');\\n        this.result = data.result;\\n        this.resultSource = data.provider || snapshot.provider;\\n        this.generatedModel = data.model;\\n        this.stale = false;\\n        this.tab = 'html';\\n      } catch (e) {\\n        this.error =\\n          e.name === 'AbortError'\\n            ? '요청을 취소했습니다.'\\n            : e instanceof TypeError\\n              ? '서버에 연결하지 못했습니다. 네트워크를 확인하세요.'\\n              : e.message || '서버에 연결하지 못했습니다.';\\n      } finally {\\n        this.busy = false;\\n      }\\n    },\\n    download() {\\n      if (!this.result) return;\\n      const template = /^\\\\s*<template[\\\\s>]/.test(this.result.markup)\\n        ? this.result.markup\\n        : \`<template>\\\\n\${this.result.markup}\\\\n</template>\`;\\n      const text = \`<!-- BEM 제안: 적용 전 검토하세요. -->\\\\n\${template}\\\\n\\\\n<style lang=\\"scss\\" scoped>\\\\n\${buildBemScss(this.result.classes)}\\\\n</style>\\\\n\`;\\n      const url = URL.createObjectURL(\\n        new Blob([text], {\\n          type: 'text/plain;charset=utf-8'\\n        })\\n      );\\n      const link = document.createElement('a');\\n      link.href = url;\\n      link.download =\\n        (this.result.classes.find((item) => item.type === 'block')?.name || 'bem-output') +\\n        '.vue';\\n      link.click();\\n      setTimeout(() => URL.revokeObjectURL(url), 1000);\\n    }\\n  },\\n  mounted() {\\n    this.checkStatus();\\n  },\\n  unmounted() {\\n    this.controller?.abort();\\n    this.statusController?.abort();\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"demo bem-generator\\">\\n    <header class=\\"bem-generator__intro\\">\\n      <span class=\\"bem-generator__icon\\"><Sparkles :size=\\"23\\" /></span>\\n      <section>\\n        <h3>버튼으로 만들고, 마크업으로 확장하세요.</h3>\\n        <p>54가지 로컬 UI 패턴 · HTML / Vue 템플릿 AI 분석 · BEM + SCSS</p>\\n      </section>\\n    </header>\\n    <div class=\\"bem-generator__modes\\" role=\\"tablist\\" aria-label=\\"BEM 생성 방식\\">\\n      <button\\n        v-for=\\"item in modes\\"\\n        :id=\\"'bem-mode-' + item.id\\"\\n        :key=\\"item.id\\"\\n        type=\\"button\\"\\n        role=\\"tab\\"\\n        :aria-selected=\\"mode === item.id\\"\\n        :aria-controls=\\"'bem-panel-' + item.id\\"\\n        :tabindex=\\"mode === item.id ? 0 : -1\\"\\n        :disabled=\\"busy\\"\\n        @click=\\"mode = item.id\\"\\n        @keydown=\\"onModeKey\\"\\n      >\\n        <strong>{{ item.label }}</strong>\\n        <small>{{ item.description }}</small>\\n      </button>\\n    </div>\\n    <section\\n      id=\\"bem-panel-buttons\\"\\n      v-show=\\"mode === 'buttons'\\"\\n      role=\\"tabpanel\\"\\n      aria-labelledby=\\"bem-mode-buttons\\"\\n      tabindex=\\"0\\"\\n      class=\\"bem-generator__patterns\\"\\n    >\\n      <header class=\\"bem-generator__section-heading\\">\\n        <section>\\n          <h4>자주 쓰는 BEM 패턴 · {{ bemPatterns.length }}종</h4>\\n          <p>\\n            버튼을 누르면 HTML · SCSS 뼈대 · 클래스 목록을 즉시 생성합니다. API 키와 인터넷\\n            연결 없이 사용할 수 있습니다.\\n          </p>\\n        </section>\\n        <span class=\\"bem-generator__type\\">로컬 생성</span>\\n      </header>\\n      <p class=\\"demo__muted\\">\\n        card, feature 등은 HTML 태그 이름이 아닌 UI 블록 이름입니다. 원본 마크업 입력과\\n        관계없이 선택한 패턴의 새 코드를 만듭니다.\\n      </p>\\n      <div class=\\"bem-generator__options\\">\\n        <label class=\\"demo__field\\">\\n          패턴 검색\\n          <input\\n            v-model=\\"patternQuery\\"\\n            type=\\"search\\"\\n            placeholder=\\"card, feature, 폼, 메뉴…\\"\\n          />\\n        </label>\\n        <label class=\\"demo__field\\">\\n          패턴 블록 이름 (선택)\\n          <input\\n            v-model=\\"patternBlock\\"\\n            :disabled=\\"busy\\"\\n            maxlength=\\"50\\"\\n            placeholder=\\"예: service-card · 비우면 패턴 이름 사용\\"\\n          />\\n          <small>이름 입력 후 패턴 버튼을 누르면 적용됩니다.</small>\\n        </label>\\n      </div>\\n      <label class=\\"bem-generator__provider\\">\\n        패턴 분류\\n        <select v-model=\\"patternCategory\\">\\n          <option>전체</option>\\n          <option v-for=\\"category in bemPatternCategories\\" :key=\\"category\\">\\n            {{ category }}\\n          </option>\\n        </select>\\n      </label>\\n      <section\\n        v-for=\\"group in patternGroups\\"\\n        :key=\\"group.category\\"\\n        class=\\"bem-generator__pattern-group\\"\\n      >\\n        <h5>{{ group.category }} · {{ group.items.length }}</h5>\\n        <div class=\\"bem-generator__pattern-buttons\\">\\n          <button\\n            v-for=\\"item in group.items\\"\\n            :key=\\"item.id\\"\\n            type=\\"button\\"\\n            :disabled=\\"busy\\"\\n            :aria-pressed=\\"resultSource === 'preset' && selectedPattern === item.id\\"\\n            :title=\\"item.description\\"\\n            @click=\\"usePattern(item.id)\\"\\n          >\\n            <strong>{{ item.id }}</strong>\\n            <span>{{ item.label }}</span>\\n          </button>\\n        </div>\\n      </section>\\n      <p v-if=\\"!patternGroups.length\\" role=\\"status\\">\\n        일치하는 패턴이 없습니다. 검색어나 분류를 바꿔 주세요.\\n      </p>\\n      <p v-if=\\"patternError\\" role=\\"alert\\" class=\\"demo__error\\">{{ patternError }}</p>\\n      <p\\n        v-if=\\"resultSource === 'preset'\\"\\n        role=\\"status\\"\\n        class=\\"bem-generator__pattern-status\\"\\n      >\\n        {{ result.summary }}\\n        <a\\n          href=\\"#bem-result\\"\\n          @click.prevent=\\"\\n            $refs.resultPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' })\\n          \\"\\n        >\\n          생성된 코드 보기 ↓\\n        </a>\\n      </p>\\n      <details class=\\"bem-generator__setup\\">\\n        <summary>BEM 이름 작성법과 사용 순서</summary>\\n        <ol>\\n          <li>패턴 버튼을 선택합니다. 필요한 경우 먼저 블록 이름을 지정하세요.</li>\\n          <li>\\n            아래 생성 결과에서 HTML, SCSS, 클래스 목록을 선택해 복사하거나 .vue 초안을\\n            다운로드하세요.\\n          </li>\\n          <li>\\n            <code>card</code>\\n            는 독립 블록,\\n            <code>card__title</code>\\n            은 블록의 요소,\\n            <code>card__button--primary</code>\\n            는 버튼의 변형입니다.\\n          </li>\\n          <li>\\n            변형은\\n            <code>class=\\"card__button card__button--primary\\"</code>\\n            처럼 기본 클래스와 함께 사용합니다. 요소를 중첩해도\\n            <code>card__body__title</code>\\n            처럼 연결하지 않습니다.\\n          </li>\\n          <li>\\n            스타일, 이미지 경로, 링크, 버튼 이벤트는 프로젝트에 맞게 연결하세요. 아코디언은\\n            details/summary의 기본 동작을 사용합니다.\\n          </li>\\n        </ol>\\n      </details>\\n    </section>\\n    <section\\n      id=\\"bem-panel-ai\\"\\n      v-show=\\"mode === 'ai'\\"\\n      role=\\"tabpanel\\"\\n      aria-labelledby=\\"bem-mode-ai\\"\\n      tabindex=\\"0\\"\\n      class=\\"bem-generator__ai\\"\\n    >\\n      <label class=\\"bem-generator__provider\\">\\n        AI 공급자\\n        <select\\n          v-model=\\"provider\\"\\n          aria-label=\\"AI 공급자\\"\\n          :disabled=\\"busy\\"\\n          @change=\\"\\n            error = '';\\n            edit();\\n          \\"\\n        >\\n          <option value=\\"gemini\\">Gemini</option>\\n          <option value=\\"openai\\">OpenAI (GPT / ChatGPT API)</option>\\n        </select>\\n        <small>선택한 API 한 곳으로만 전송합니다.</small>\\n      </label>\\n      <aside class=\\"bem-generator__connection\\" aria-live=\\"polite\\">\\n        <section>\\n          <strong>\\n            <ShieldCheck :size=\\"15\\" />\\n            {{\\n              staticDeployment\\n                ? '공개 데모 · AI 서버 미연결'\\n                : statusError\\n                  ? '서버 확인 필요'\\n                  : status === null\\n                    ? '연결 확인 중…'\\n                    : ready\\n                      ? selectedProvider.label + ' API 키 설정됨'\\n                      : selectedProvider.label + ' API 키 미설정'\\n            }}\\n          </strong>\\n          <p v-if=\\"status\\">\\n            {{\\n              staticDeployment\\n                ? '패턴 버튼으로 BEM 코드를 바로 생성할 수 있습니다. AI를 이용한 원본 마크업 분석은 로컬 서버에서 이용하세요.'\\n                : ready\\n                  ? '서버 모델: ' +\\n                    activeStatus.model +\\n                    ' · 키는 브라우저에 전달되지 않습니다.'\\n                  : '.env.local에 ' +\\n                    selectedProvider.key +\\n                    '를 설정하면 실제 생성 버튼이 활성화됩니다.'\\n            }}\\n          </p>\\n          <p v-if=\\"statusError\\" class=\\"demo__error\\">{{ statusError }}</p>\\n        </section>\\n        <button :disabled=\\"busy\\" @click=\\"checkStatus\\">\\n          <RefreshCw :size=\\"14\\" />\\n          설정 확인\\n        </button>\\n      </aside>\\n      <details\\n        v-if=\\"!staticDeployment\\"\\n        class=\\"bem-generator__setup\\"\\n        :open=\\"status !== null && !ready\\"\\n      >\\n        <summary>개인 {{ selectedProvider.label }} API 연결 방법</summary>\\n        <ol>\\n          <li>\\n            <a :href=\\"selectedProvider.url\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">\\n              {{ selectedProvider.portal }}\\n            </a>\\n            에서 API 키를 발급합니다.\\n          </li>\\n          <li>\\n            프로젝트의\\n            <code>.env.example</code>\\n            을\\n            <code>.env.local</code>\\n            로 복사하고\\n            <code>{{ selectedProvider.key }}</code>\\n            에 키를 입력합니다.\\n          </li>\\n          <li>\\n            <code>{{ selectedProvider.model }}</code>\\n            에 계정에서 사용할 모델 ID를 지정합니다. 설정 후 개발 서버를 재시작하고 ‘설정\\n            확인’을 누르세요.\\n          </li>\\n        </ol>\\n        <p>\\n          키는 이 화면이나 채팅에 입력하지 않습니다. 개인용 API는 로컬 컴퓨터에서만 접근할\\n          수 있습니다.\\n        </p>\\n      </details>\\n      <form class=\\"bem-generator__form\\" @submit.prevent=\\"generate\\" @input=\\"edit\\">\\n        <header class=\\"bem-generator__section-heading\\">\\n          <h4>\\n            <Code2 :size=\\"16\\" />\\n            원본 마크업\\n          </h4>\\n          <button type=\\"button\\" :disabled=\\"busy\\" @click=\\"loadExample\\">\\n            예시 마크업 넣기\\n          </button>\\n        </header>\\n        <label class=\\"demo__field\\">\\n          HTML / Vue 템플릿\\n          <textarea\\n            v-model=\\"markup\\"\\n            aria-label=\\"원본 HTML 마크업\\"\\n            :disabled=\\"busy\\"\\n            rows=\\"13\\"\\n            maxlength=\\"12000\\"\\n            spellcheck=\\"false\\"\\n            placeholder='<article class=\\"card\\">…</article>'\\n            required\\n          />\\n        </label>\\n        <footer class=\\"bem-generator__input-caption\\">\\n          <span>태그·텍스트·이벤트를 유지하면서 클래스 이름을 제안합니다.</span>\\n          <span>{{ markup.length.toLocaleString() }} / 12,000</span>\\n        </footer>\\n        <div class=\\"bem-generator__options\\">\\n          <label class=\\"demo__field\\">\\n            블록 이름 (선택)\\n            <input\\n              v-model.trim=\\"blockName\\"\\n              aria-label=\\"블록 이름 (선택)\\"\\n              :disabled=\\"busy\\"\\n              maxlength=\\"50\\"\\n              pattern=\\"[a-z][a-z0-9]*(-[a-z0-9]+)*\\"\\n              placeholder=\\"예: product-card\\"\\n            />\\n            <small>비우면 마크업에 맞춰 제안합니다.</small>\\n          </label>\\n          <label class=\\"demo__field\\">\\n            추가 조건 (선택)\\n            <input\\n              v-model=\\"context\\"\\n              :disabled=\\"busy\\"\\n              maxlength=\\"2000\\"\\n              placeholder=\\"예: 기존 유틸리티 클래스는 유지해줘\\"\\n            />\\n          </label>\\n        </div>\\n        <p v-if=\\"staticDeployment\\" class=\\"bem-generator__notice\\">\\n          공개 사이트에서도 위 패턴 버튼으로 BEM 코드를 생성할 수 있습니다. 원본 마크업의 AI\\n          분석에는 로컬 API 서버가 필요합니다.\\n        </p>\\n        <p v-else class=\\"bem-generator__notice\\">\\n          ‘{{ selectedProvider.label }}로 생성’을 누르면 입력한 마크업과 조건이\\n          {{ selectedProvider.label }} API로 전송됩니다. 선택한 계정의 API 사용 한도·과금\\n          설정이 적용됩니다.\\n        </p>\\n        <div class=\\"demo__row\\">\\n          <button class=\\"demo__primary\\" type=\\"submit\\" :disabled=\\"!valid || !ready || busy\\">\\n            <Sparkles :size=\\"15\\" />\\n            {{ busy ? 'BEM 이름 생성 중…' : selectedProvider.label + '로 생성' }}\\n            <ArrowRight v-if=\\"!busy\\" :size=\\"15\\" />\\n          </button>\\n          <button v-if=\\"busy\\" type=\\"button\\" @click=\\"controller?.abort()\\">\\n            <Square :size=\\"13\\" />\\n            취소\\n          </button>\\n          <button type=\\"button\\" :disabled=\\"busy\\" @click=\\"showSample\\">\\n            샘플 결과 보기 · API 호출 없음\\n          </button>\\n        </div>\\n        <p v-if=\\"error\\" class=\\"demo__error\\" role=\\"alert\\">{{ error }}</p>\\n        <p v-if=\\"busy\\" role=\\"status\\" class=\\"demo__muted\\">\\n          입력 구조를 분석하고 있습니다. 최대 45초 정도 소요될 수 있습니다.\\n        </p>\\n      </form>\\n    </section>\\n    <section\\n      v-if=\\"result\\"\\n      id=\\"bem-result\\"\\n      ref=\\"resultPanel\\"\\n      class=\\"bem-generator__result\\"\\n      aria-label=\\"BEM 생성 결과\\"\\n    >\\n      <header class=\\"bem-generator__section-heading\\">\\n        <section>\\n          <span class=\\"bem-generator__result-label\\">\\n            {{\\n              resultSource === 'preset'\\n                ? 'LOCAL PATTERN · AI 없이 생성'\\n                : resultSource === 'sample'\\n                  ? 'LOCAL SAMPLE · 로컬 샘플'\\n                  : resultSource.toUpperCase() + ' RESULT · ' + generatedModel\\n            }}\\n          </span>\\n          <h4>{{ result.summary }}</h4>\\n        </section>\\n        <button @click=\\"download\\">.vue 초안 다운로드</button>\\n      </header>\\n      <p v-if=\\"stale\\" role=\\"status\\" class=\\"bem-generator__stale\\">\\n        입력이 변경되었습니다. 아래 결과는 이전 입력 기준입니다.\\n      </p>\\n      <nav class=\\"bem-generator__tabs\\" aria-label=\\"생성 결과 형식\\">\\n        <button\\n          v-for=\\"item in tabs\\"\\n          :key=\\"item.id\\"\\n          :aria-pressed=\\"tab === item.id\\"\\n          @click=\\"tab = item.id\\"\\n        >\\n          {{ item.label }}\\n        </button>\\n        <button\\n          class=\\"bem-generator__copy\\"\\n          aria-label=\\"BEM 결과 복사\\"\\n          @click=\\"copy(output, tab === 'scss' ? 'SCSS' : 'BEM')\\"\\n        >\\n          <Check v-if=\\"copied\\" :size=\\"14\\" />\\n          <Copy v-else :size=\\"14\\" />\\n          {{ copied ? '복사됨 ✓' : '복사' }}\\n        </button>\\n      </nav>\\n      <SyntaxCode\\n        class=\\"bem-generator__output\\"\\n        :code=\\"output\\"\\n        :language=\\"tab === 'html' ? 'html' : tab === 'scss' ? 'scss' : 'plaintext'\\"\\n        label=\\"생성된 코드\\"\\n      />\\n      <p class=\\"demo__muted\\">\\n        SCSS는 클래스 구조만 제공하는 뼈대입니다. 결과 코드는 실행하거나 프로젝트 파일에\\n        자동 적용하지 않습니다.\\n      </p>\\n      <section class=\\"demo__scroll\\">\\n        <table>\\n          <caption>\\n            클래스 대응표 ·\\n            {{\\n              result.classes.length\\n            }}개\\n          </caption>\\n          <thead>\\n            <tr>\\n              <th scope=\\"col\\">기존 클래스</th>\\n              <th scope=\\"col\\">제안 BEM 클래스</th>\\n              <th scope=\\"col\\">분류</th>\\n              <th scope=\\"col\\">역할</th>\\n            </tr>\\n          </thead>\\n          <tbody>\\n            <tr v-for=\\"item in result.classes\\" :key=\\"item.name\\">\\n              <td>\\n                <code>{{ item.original || '새 클래스' }}</code>\\n              </td>\\n              <td>\\n                <code>{{ item.name }}</code>\\n              </td>\\n              <td>\\n                <span class=\\"bem-generator__type\\">{{ item.type }}</span>\\n              </td>\\n              <td>{{ item.description }}</td>\\n            </tr>\\n          </tbody>\\n        </table>\\n      </section>\\n      <aside class=\\"bem-generator__review\\">\\n        <h4>적용 전 확인하세요</h4>\\n        <p>\\n          기존 CSS 선택자, JavaScript의 클래스 참조, 동적 :class 조건도 함께 검토하세요.\\n          로컬 패턴은 새 코드 초안이며, AI 제안은 원본과 구조 및 이벤트를 비교해 주세요.\\n        </p>\\n        <ul>\\n          <li v-for=\\"note in result.notes\\" :key=\\"note\\">{{ note }}</li>\\n        </ul>\\n      </aside>\\n    </section>\\n    <section v-else class=\\"bem-generator__empty\\">\\n      <Code2 :size=\\"26\\" />\\n      <h4>이름이 정리되면 구조가 보입니다.</h4>\\n      <p>\\n        {{\\n          mode === 'buttons'\\n            ? '위 패턴 버튼을 누르면 API 없이 BEM 코드가 생성됩니다.'\\n            : '원본 마크업을 입력해 AI로 분석하거나 샘플 결과를 확인하세요.'\\n        }}\\n      </p>\\n      <code>block → block__element → block__element--modifier</code>\\n    </section>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/mixins' as *;\\n.bem-generator {\\n  @include custom-scrollbar;\\n  gap: 24px;\\n  min-width: 0;\\n  &__modes {\\n    display: grid;\\n    grid-template-columns: repeat(2, minmax(0, 1fr));\\n    gap: 8px;\\n    padding: 6px;\\n    background: var(--canvas);\\n    border: 1px solid var(--border);\\n    border-radius: 12px;\\n    button {\\n      display: grid;\\n      gap: 6px;\\n      text-align: left;\\n      padding: 14px;\\n      border: 1px solid transparent;\\n      background: transparent;\\n      border-radius: 8px;\\n      @include focus-ring;\\n      strong {\\n        font-size: 13px;\\n      }\\n      small {\\n        font-size: 11px;\\n        color: var(--muted);\\n      }\\n      &[aria-selected='true'] {\\n        background: var(--surface);\\n        color: var(--primary);\\n        border-color: var(--primary);\\n      }\\n    }\\n  }\\n  &__ai {\\n    display: grid;\\n    gap: 24px;\\n    min-width: 0;\\n  }\\n  &__patterns {\\n    display: grid;\\n    gap: 18px;\\n    padding: 20px;\\n    border: 1px solid var(--border);\\n    border-radius: 12px;\\n    min-width: 0;\\n    p {\\n      font-size: 12px;\\n      color: var(--muted);\\n      margin-top: 8px;\\n    }\\n  }\\n  &__pattern-group h5 {\\n    font-size: 12px;\\n    margin-bottom: 10px;\\n  }\\n  &__pattern-buttons {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fit, minmax(min(145px, 100%), 1fr));\\n    gap: 8px;\\n    button {\\n      display: grid;\\n      text-align: left;\\n      gap: 4px;\\n      min-width: 0;\\n      padding: 10px 12px;\\n      strong {\\n        font-size: 12px;\\n        overflow-wrap: anywhere;\\n      }\\n      span {\\n        font-size: 11px;\\n        color: var(--muted);\\n      }\\n      &[aria-pressed='true'] {\\n        border-color: var(--primary);\\n        color: var(--primary);\\n        background: var(--soft);\\n      }\\n    }\\n  }\\n  &__pattern-status a {\\n    display: inline-block;\\n    margin-left: 8px;\\n    color: var(--primary);\\n    text-decoration: underline;\\n  }\\n  &__provider {\\n    display: flex;\\n    gap: 12px;\\n    align-items: center;\\n    flex-wrap: wrap;\\n    font-size: 12px;\\n    small {\\n      color: var(--muted);\\n      font-size: 11px;\\n    }\\n    select {\\n      max-width: 100%;\\n    }\\n  }\\n  &__intro {\\n    display: flex;\\n    gap: 14px;\\n    align-items: center;\\n    h3 {\\n      font-size: 18px;\\n      letter-spacing: -0.4px;\\n    }\\n    p {\\n      font-size: 12px;\\n      color: var(--muted);\\n      margin-top: 5px;\\n    }\\n  }\\n  &__icon {\\n    @include flex-center;\\n    width: 50px;\\n    height: 50px;\\n    background: var(--soft);\\n    color: var(--primary);\\n    border-radius: 14px;\\n    flex-shrink: 0;\\n  }\\n  &__connection {\\n    @include flex-between;\\n    @include card-surface;\\n    padding: 16px 18px;\\n    strong {\\n      display: flex;\\n      align-items: center;\\n      gap: 7px;\\n      font-size: 12px;\\n    }\\n    p {\\n      font-size: 11px;\\n      color: var(--muted);\\n      margin-top: 6px;\\n    }\\n    button {\\n      white-space: nowrap;\\n      font-size: 11px;\\n      display: flex;\\n      gap: 6px;\\n      align-items: center;\\n    }\\n  }\\n  &__setup {\\n    font-size: 12px;\\n    padding: 16px 18px;\\n    border-radius: 12px;\\n    background: var(--canvas);\\n    summary {\\n      cursor: pointer;\\n      font-weight: 600;\\n    }\\n    ol {\\n      padding-left: 20px;\\n      li {\\n        margin: 8px 0;\\n      }\\n    }\\n    a {\\n      color: var(--primary);\\n    }\\n    p {\\n      color: var(--muted);\\n    }\\n    code {\\n      overflow-wrap: anywhere;\\n    }\\n  }\\n  &__form {\\n    display: grid;\\n    gap: 15px;\\n    textarea {\\n      font-family: 'SFMono-Regular', Consolas, monospace;\\n      font-size: 12px;\\n      line-height: 1.8;\\n      resize: vertical;\\n    }\\n    button {\\n      display: inline-flex;\\n      gap: 7px;\\n      align-items: center;\\n    }\\n    label {\\n      font-size: 12px;\\n    }\\n  }\\n  &__section-heading {\\n    @include flex-between;\\n    align-items: flex-start;\\n    h4 {\\n      font-size: 14px;\\n      display: flex;\\n      gap: 8px;\\n      align-items: center;\\n    }\\n    button {\\n      font-size: 11px;\\n      white-space: nowrap;\\n    }\\n    section {\\n      min-width: 0;\\n    }\\n  }\\n  &__input-caption {\\n    @include flex-between;\\n    align-items: flex-start;\\n    color: var(--caption);\\n    font-size: 10px;\\n    span:last-child {\\n      white-space: nowrap;\\n    }\\n  }\\n  &__options {\\n    display: grid;\\n    grid-template-columns: 1fr 1.5fr;\\n    gap: 16px;\\n    small {\\n      color: var(--caption);\\n      font-size: 10px;\\n    }\\n  }\\n  &__notice {\\n    font-size: 11px;\\n    color: var(--muted);\\n    padding: 12px 15px;\\n    border-left: 3px solid var(--primary);\\n    background: var(--soft);\\n    border-radius: 0 8px 8px 0;\\n  }\\n  &__result {\\n    scroll-margin-top: 100px;\\n    display: grid;\\n    gap: 16px;\\n    border-top: 1px solid var(--border);\\n    padding-top: 25px;\\n    min-width: 0;\\n  }\\n  &__result-label {\\n    display: block;\\n    font-size: 9px;\\n    letter-spacing: 1px;\\n    color: var(--primary);\\n    margin-bottom: 8px;\\n  }\\n  &__tabs {\\n    display: flex;\\n    gap: 4px;\\n    flex-wrap: wrap;\\n    button {\\n      font-size: 11px;\\n      display: inline-flex;\\n      gap: 7px;\\n      align-items: center;\\n      border: 0;\\n      &[aria-pressed='true'] {\\n        color: var(--primary);\\n        background: var(--soft);\\n      }\\n    }\\n  }\\n  &__copy {\\n    margin-left: auto;\\n  }\\n  &__output {\\n    border-radius: 12px;\\n    max-height: 500px;\\n  }\\n  &__type {\\n    color: var(--primary);\\n    background: var(--soft);\\n    border-radius: 9999px;\\n    padding: 3px 9px;\\n    font-size: 10px;\\n  }\\n  table {\\n    font-size: 12px;\\n    caption {\\n      text-align: left;\\n      color: var(--muted);\\n      font-size: 11px;\\n      padding: 10px 0;\\n    }\\n    td {\\n      min-width: 130px;\\n    }\\n    td:nth-child(2) {\\n      min-width: 230px;\\n    }\\n  }\\n  &__review {\\n    padding: 18px;\\n    border: 1px solid var(--border);\\n    border-radius: 12px;\\n    h4 {\\n      font-size: 12px;\\n    }\\n    p,\\n    ul {\\n      font-size: 11px;\\n      color: var(--muted);\\n      margin-top: 8px;\\n    }\\n    ul {\\n      padding-left: 18px;\\n      li + li {\\n        margin-top: 6px;\\n      }\\n    }\\n  }\\n  &__stale {\\n    font-size: 12px;\\n    color: #a16207;\\n    background: #f59e0b14;\\n    border-radius: 8px;\\n    padding: 12px;\\n  }\\n  &__empty {\\n    display: grid;\\n    justify-items: center;\\n    gap: 10px;\\n    padding: 35px 15px;\\n    border: 1px dashed var(--border);\\n    border-radius: 12px;\\n    text-align: center;\\n    color: var(--caption);\\n    h4 {\\n      color: var(--muted);\\n      font-size: 14px;\\n    }\\n    p,\\n    code {\\n      font-size: 11px;\\n      overflow-wrap: anywhere;\\n      max-width: 100%;\\n    }\\n  }\\n  @include responsive(mobile) {\\n    &__intro h3 {\\n      font-size: 16px;\\n    }\\n    &__connection,\\n    &__section-heading {\\n      flex-wrap: wrap;\\n    }\\n    &__options {\\n      grid-template-columns: 1fr;\\n    }\\n    &__input-caption {\\n      flex-wrap: wrap;\\n    }\\n  }\\n}\\n</style>\\n"}`),"10968-d8d6bd27-c2f2653":JSON.parse(`{"file":"src/views/tools/code-qa.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport { shallowRef } from 'vue';\\nimport BaseButton from '@/components/common/BaseButton.vue';\\nimport BaseModal from '@/components/common/BaseModal.vue';\\nimport { useClipboard } from '@/composables/useClipboard';\\nimport { useToast } from '@/composables/useToast';\\nimport { codeQaAuth, deleteCodeAnswer, listCodeAnswers } from '@/lib/codeQa';\\nimport { renderCodeAnswer } from '@/lib/codeQaMarkdown';\\nexport default {\\n  name: 'CodeQa',\\n  components: {\\n    BaseButton,\\n    BaseModal\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const { copy } = useClipboard();\\n    const { toast } = useToast();\\n    return {\\n      copy,\\n      toast\\n    };\\n  },\\n  data() {\\n    const dateFormat = new Intl.DateTimeFormat('ko-KR', {\\n      dateStyle: 'medium',\\n      timeStyle: 'short'\\n    });\\n    const session = shallowRef(null);\\n    const items = [];\\n    const selectedId = '';\\n    const deleteOpen = false;\\n    const deleteTarget = shallowRef(null);\\n    const deleting = false;\\n    const deleteError = '';\\n    const ready = !codeQaAuth;\\n    const loading = false;\\n    const error =\\n      this.$route.query.login === 'failed'\\n        ? '로그인을 완료하지 못했습니다. 다시 시도해 주세요.'\\n        : '';\\n    let subscription;\\n    let request;\\n    let refreshTimer;\\n    return {\\n      dateFormat,\\n      session,\\n      items,\\n      selectedId,\\n      deleteOpen,\\n      deleteTarget,\\n      deleting,\\n      deleteError,\\n      ready,\\n      loading,\\n      error,\\n      subscription,\\n      request,\\n      refreshTimer,\\n      codeQaAuth\\n    };\\n  },\\n  computed: {\\n    selected() {\\n      return this.items.find((item) => item.id === this.selectedId);\\n    },\\n    answer() {\\n      return renderCodeAnswer(this.selected?.answerMarkdown || '');\\n    }\\n  },\\n  methods: {\\n    async refreshAnswers() {\\n      if (!this.session.value || this.deleting) return;\\n      this.request?.abort();\\n      const controller = new AbortController();\\n      this.request = controller;\\n      this.loading = true;\\n      this.error = '';\\n      try {\\n        const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]);\\n        const answers = await listCodeAnswers(this.session.value.access_token, signal);\\n        if (controller.signal.aborted) return;\\n        this.items = answers;\\n        if (!answers.some((item) => item.id === this.selectedId)) {\\n          this.selectedId = answers[0]?.id ?? '';\\n        }\\n      } catch (cause) {\\n        if (!controller.signal.aborted) {\\n          this.items = [];\\n          this.selectedId = '';\\n          this.error =\\n            cause instanceof Error && cause.name === 'Error'\\n              ? cause.message\\n              : '답변 서버에 연결할 수 없습니다. 다시 시도해 주세요.';\\n        }\\n      } finally {\\n        if (this.request === controller) this.loading = false;\\n      }\\n    },\\n    copyAnswerCode(event) {\\n      const button = event.target.closest('button[data-code-copy]');\\n      if (!button) return;\\n      const block = this.answer.codeBlocks[Number(button.dataset.codeCopy)];\\n      if (block) void this.copy(block.text, block.label);\\n    },\\n    confirmDelete() {\\n      this.deleteTarget.value = this.selected;\\n      this.deleteError = '';\\n      this.deleteOpen = true;\\n    },\\n    async removeAnswer() {\\n      const activeSession = this.session.value;\\n      const item = this.deleteTarget.value;\\n      if (!activeSession || !item || this.deleting) return;\\n      this.deleting = true;\\n      this.deleteError = '';\\n      this.request?.abort();\\n      try {\\n        await deleteCodeAnswer(activeSession.access_token, item.id);\\n        if (this.session.value?.user.id !== activeSession.user.id) return;\\n        const index = this.items.findIndex(({ id }) => id === item.id);\\n        this.items = this.items.filter(({ id }) => id !== item.id);\\n        if (this.selectedId === item.id) {\\n          this.selectedId = (this.items[index] || this.items.at(-1))?.id ?? '';\\n        }\\n        this.deleteOpen = false;\\n        this.toast('답변을 삭제했습니다.');\\n      } catch (cause) {\\n        this.deleteError =\\n          cause?.name === 'Error'\\n            ? cause.message\\n            : '답변을 삭제하지 못했습니다. 다시 시도해 주세요.';\\n      } finally {\\n        this.deleting = false;\\n      }\\n    },\\n    async signIn() {\\n      this.error = '';\\n      try {\\n        const redirectTo = new URL(import.meta.env.BASE_URL, location.origin).href;\\n        const { error: authError } = await codeQaAuth.auth.signInWithOAuth({\\n          provider: 'google',\\n          options: {\\n            redirectTo\\n          }\\n        });\\n        if (authError) throw authError;\\n      } catch {\\n        this.error = 'Google 로그인을 시작하지 못했습니다. 다시 시도해 주세요.';\\n      }\\n    },\\n    async signOut() {\\n      this.error = '';\\n      try {\\n        const { error: authError } = await codeQaAuth.auth.signOut({\\n          scope: 'local'\\n        });\\n        if (authError) throw authError;\\n      } catch {\\n        this.error = '로그아웃하지 못했습니다. 다시 시도해 주세요.';\\n      }\\n    }\\n  },\\n  mounted() {\\n    if (!codeQaAuth) return;\\n    const result = codeQaAuth.auth.onAuthStateChange((_event, nextSession) => {\\n      const previousUser = this.session.value?.user.id;\\n      const nextUser = nextSession?.user.id;\\n      this.session.value = nextSession;\\n      this.ready = true;\\n      if (previousUser !== nextUser) {\\n        this.request?.abort();\\n        this.items = [];\\n        this.selectedId = '';\\n        this.deleteOpen = false;\\n        this.deleteTarget.value = null;\\n        this.loading = false;\\n        this.error = '';\\n        if (nextUser) void this.refreshAnswers();\\n      }\\n    });\\n    this.subscription = result.data.subscription;\\n    this.refreshTimer = window.setInterval(() => {\\n      if (this.session.value && document.visibilityState === 'visible' && !this.loading) {\\n        void this.refreshAnswers();\\n      }\\n    }, 10000);\\n  },\\n  unmounted() {\\n    window.clearInterval(this.refreshTimer);\\n    this.subscription?.unsubscribe();\\n    this.request?.abort();\\n  }\\n};\\n<\/script>\\n\\n<template>\\n  <section class=\\"code-qa\\" aria-labelledby=\\"code-qa-heading\\">\\n    <header class=\\"code-qa__header\\">\\n      <div>\\n        <h1 id=\\"code-qa-heading\\">Code Q&A</h1>\\n        <p>\\n          MyCode의\\n          <strong>VUE → s</strong>\\n          에서 요청한 답변을 확인하세요.\\n        </p>\\n      </div>\\n      <div v-if=\\"session\\" class=\\"code-qa__actions\\">\\n        <button type=\\"button\\" :disabled=\\"loading\\" @click=\\"refreshAnswers\\">새로고침</button>\\n        <button type=\\"button\\" @click=\\"signOut\\">로그아웃</button>\\n      </div>\\n    </header>\\n\\n    <p v-if=\\"error\\" class=\\"code-qa__error\\" role=\\"alert\\">{{ error }}</p>\\n    <p v-if=\\"!codeQaAuth\\" class=\\"code-qa__panel\\">\\n      Code Q&A 서버와 로그인 설정이 필요합니다.\\n    </p>\\n    <p v-else-if=\\"!ready\\" class=\\"code-qa__panel\\" role=\\"status\\">로그인 상태 확인 중…</p>\\n    <div v-else-if=\\"!session\\" class=\\"code-qa__panel\\">\\n      <p>MyCode에서 사용한 Google 계정으로 로그인하세요.</p>\\n      <button type=\\"button\\" @click=\\"signIn\\">Google 로그인</button>\\n    </div>\\n    <p v-else-if=\\"loading && !items.length\\" class=\\"code-qa__panel\\" role=\\"status\\">\\n      답변 불러오는 중…\\n    </p>\\n    <p v-else-if=\\"!items.length && !error\\" class=\\"code-qa__panel\\">\\n      아직 도착한 답변이 없습니다.\\n    </p>\\n\\n    <div v-if=\\"items.length\\" class=\\"code-qa__results\\">\\n      <ul class=\\"code-qa__panel code-qa__list\\" aria-label=\\"답변 목록\\">\\n        <li v-for=\\"item in items\\" :key=\\"item.id\\">\\n          <button\\n            type=\\"button\\"\\n            :aria-pressed=\\"item.id === selectedId\\"\\n            @click=\\"selectedId = item.id\\"\\n          >\\n            <strong>{{ item.title }}</strong>\\n            <time :datetime=\\"item.createdAt\\">\\n              {{ dateFormat.format(new Date(item.createdAt)) }}\\n            </time>\\n            <span>{{ item.summary }}</span>\\n          </button>\\n        </li>\\n      </ul>\\n      <article\\n        v-if=\\"selected\\"\\n        class=\\"code-qa__panel code-qa__answer\\"\\n        :aria-label=\\"selected.title\\"\\n      >\\n        <div class=\\"code-qa__answer-actions\\">\\n          <button\\n            type=\\"button\\"\\n            class=\\"code-qa__delete\\"\\n            :disabled=\\"deleting\\"\\n            @click=\\"confirmDelete\\"\\n          >\\n            선택한 답변 삭제\\n          </button>\\n        </div>\\n        <!-- MarkdownIt escapes HTML, and remote images are disabled. -->\\n        <div class=\\"code-qa__markdown\\" @click=\\"copyAnswerCode\\" v-html=\\"answer.html\\" />\\n      </article>\\n    </div>\\n\\n    <BaseModal v-model=\\"deleteOpen\\" title=\\"선택한 답변을 삭제할까요?\\">\\n      <p>\\n        <strong>{{ deleteTarget?.title }}</strong>\\n        답변을 삭제하면 복구할 수 없습니다.\\n      </p>\\n      <p v-if=\\"deleteError\\" class=\\"code-qa__error\\" role=\\"alert\\">{{ deleteError }}</p>\\n      <div class=\\"code-qa__dialog-actions\\">\\n        <BaseButton variant=\\"outline\\" :disabled=\\"deleting\\" @click=\\"deleteOpen = false\\">\\n          취소\\n        </BaseButton>\\n        <BaseButton variant=\\"danger\\" :loading=\\"deleting\\" @click=\\"removeAnswer\\"\\n          >삭제</BaseButton\\n        >\\n      </div>\\n    </BaseModal>\\n  </section>\\n</template>\\n\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/code-palette' as *;\\n\\n.code-qa {\\n  display: grid;\\n  gap: 16px;\\n  color: var(--text);\\n\\n  h1 {\\n    font-size: 28px;\\n  }\\n  p {\\n    margin: 0;\\n  }\\n  button {\\n    border: 1px solid var(--border);\\n    border-radius: 8px;\\n    background: var(--surface);\\n    color: inherit;\\n    padding: 8px 12px;\\n    cursor: pointer;\\n  }\\n  button:disabled {\\n    cursor: default;\\n    opacity: 0.6;\\n  }\\n  button:focus-visible {\\n    outline: 2px solid var(--primary);\\n    outline-offset: 2px;\\n  }\\n\\n  &__header,\\n  &__actions {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 10px;\\n    align-items: center;\\n  }\\n  &__header {\\n    justify-content: space-between;\\n  }\\n  &__header p,\\n  time,\\n  &__list span {\\n    color: var(--muted);\\n  }\\n  &__panel {\\n    border: 1px solid var(--border);\\n    border-radius: 12px;\\n    background: var(--surface);\\n    padding: 16px;\\n  }\\n  &__panel > button {\\n    margin-top: 10px;\\n  }\\n  &__error {\\n    color: var(--danger, #b42318);\\n  }\\n  &__results {\\n    display: grid;\\n    grid-template-columns: minmax(200px, 290px) minmax(0, 1fr);\\n    gap: 16px;\\n    align-items: start;\\n  }\\n  &__list {\\n    margin: 0;\\n    list-style: none;\\n    display: grid;\\n    gap: 8px;\\n  }\\n  &__list button {\\n    display: grid;\\n    gap: 4px;\\n    width: 100%;\\n    text-align: left;\\n  }\\n  &__list button[aria-pressed='true'] {\\n    border-color: var(--primary);\\n    background: var(--soft);\\n  }\\n  &__list time,\\n  &__list span {\\n    font-size: 12px;\\n  }\\n  &__answer {\\n    overflow-wrap: anywhere;\\n  }\\n  &__answer-actions,\\n  &__dialog-actions {\\n    display: flex;\\n    justify-content: flex-end;\\n    gap: 8px;\\n  }\\n  &__answer-actions {\\n    margin-bottom: 12px;\\n  }\\n  button.code-qa__delete {\\n    color: var(--danger, #b42318);\\n  }\\n  &__markdown :deep(.code-qa__code-block) {\\n    margin: 12px 0 18px;\\n    border: 1px solid #454545;\\n    border-radius: 9px;\\n    overflow: hidden;\\n    background: #1e1e1e;\\n    color: #d4d4d4;\\n    @include vs-code-dark-tokens;\\n  }\\n  &__markdown :deep(.code-qa__code-toolbar) {\\n    display: flex;\\n    align-items: center;\\n    justify-content: space-between;\\n    gap: 12px;\\n    padding: 6px 10px 6px 14px;\\n    background: #252526;\\n    color: #e0e0e0;\\n    font-size: 12px;\\n  }\\n  &__markdown :deep(.code-qa__code-toolbar button) {\\n    flex: none;\\n    padding: 4px 10px;\\n    border: 1px solid #565656;\\n    border-radius: 5px;\\n    background: #333;\\n    color: #fff;\\n    cursor: pointer;\\n  }\\n  &__dialog-actions :deep(.base-button--danger) {\\n    color: #fff;\\n    background: var(--danger, #b42318);\\n    border-color: transparent;\\n  }\\n  &__markdown :deep(.code-qa__code-toolbar button:focus-visible),\\n  &__markdown :deep(.code-qa__code:focus-visible) {\\n    outline: 2px solid #569cd6;\\n    outline-offset: -2px;\\n  }\\n  &__markdown :deep(.code-qa__code) {\\n    overflow: auto;\\n    margin: 0;\\n    max-height: 600px;\\n    padding: 14px;\\n    color-scheme: dark;\\n    tab-size: 2;\\n    font:\\n      13px/1.7 Consolas,\\n      'SFMono-Regular',\\n      monospace;\\n  }\\n  &__markdown :deep(code) {\\n    font-family: monospace;\\n  }\\n  &__markdown :deep(a) {\\n    color: var(--primary);\\n    text-decoration: underline;\\n  }\\n\\n  @media (max-width: 760px) {\\n    &__results {\\n      grid-template-columns: minmax(0, 1fr);\\n    }\\n  }\\n}\\n</style>\\n"}`),"542-7401b436-e539003e":{file:"src/views/ui-kits/accordion.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseAccordion from '@/components/common/BaseAccordion.vue';
export default {
  name: 'Accordion',
  components: {
    BaseAccordion
  },
  data() {
    const items = [
      {
        title: '개요',
        content: 'Vue 3 표준 문법과 재사용 가능한 UI를 제공합니다.'
      },
      {
        title: '설치 방법',
        content: 'npm install 후 npm run dev로 개발 서버를 실행하세요.'
      },
      {
        title: '소스 코드',
        content: '하단 코드 보기에서 전체 Vue 파일과 의존 파일을 확인할 수 있습니다.'
      }
    ];
    return {
      items
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <BaseAccordion :items="items" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1410-c42acd9e-ea228752":{file:"src/views/ui-kits/alert.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Alert',
  data() {
    const alerts = [
      {
        id: 1,
        text: '변경사항을 저장했습니다.',
        tone: 'success'
      },
      {
        id: 2,
        text: '입력 내용을 다시 확인하세요.',
        tone: 'warning'
      },
      {
        id: 3,
        text: '연결에 실패했습니다.',
        tone: 'danger'
      }
    ];
    return {
      alerts
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <article
      v-for="alert in alerts"
      :key="alert.id"
      class="alert"
      :class="\`alert--\${alert.tone}\`"
      role="alert"
    >
      <span>{{ alert.text }}</span>
      <button
        :aria-label="alert.text + ' 알림 닫기'"
        @click="alerts = alerts.filter((a) => a.id !== alert.id)"
      >
        ×
      </button>
    </article>
    <button
      v-if="!alerts.length"
      @click="alerts = [{ id: Date.now(), text: '새 알림입니다.', tone: 'success' }]"
    >
      알림 다시 표시
    </button>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.alert {
  @include flex-between;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid;
  &--success {
    color: #059669;
    background: #10b98112;
    border-color: #10b98133;
  }
  &--warning {
    color: #b7790b;
    background: #f59e0b12;
    border-color: #f59e0b33;
  }
  &--danger {
    color: var(--danger);
    background: #ef444412;
    border-color: #ef444433;
  }
  button {
    padding: 0 6px;
    background: transparent;
    border: 0;
    color: inherit;
  }
}
</style>
`},"1204-f6d983a8-2f24178c":{file:"src/views/ui-kits/avatars.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Avatars',
  data() {
    const size = 48;
    const online = true;
    return {
      size,
      online
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        크기
        <input v-model.number="size" type="range" min="30" max="80" />
      </label>
      <label>
        <input v-model="online" type="checkbox" />
        온라인 표시
      </label>
    </div>
    <div class="demo__row">
      <span
        v-for="(name, i) in ['JP', 'EW', 'AK', 'OC']"
        :key="name"
        class="avatar"
        :style="{
          width: size + 'px',
          height: size + 'px',
          background: ['#eee9ff', '#fbe8ef', '#e3f4ed', '#fdf0de'][i]
        }"
      >
        {{ name }}
        <i v-if="online" />
      </span>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.avatar {
  @include flex-center;
  border-radius: 50%;
  position: relative;
  color: #756789;
  font-weight: 600;
  i {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    background: var(--success);
    border-radius: 50%;
    border: 2px solid var(--surface);
  }
}
</style>
`},"1175-8f13e5a5-918f1eef":{file:"src/views/ui-kits/breadcrumb.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Breadcrumb',
  data() {
    const depth = 3;
    const steps = ['Workspace', 'Projects', 'Vue Atelier', 'Components'];
    return {
      depth,
      steps
    };
  },
  computed: {
    visible() {
      return this.steps.slice(0, this.depth);
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <label>
      경로 깊이
      <input v-model.number="depth" type="range" min="1" max="4" />
    </label>
    <nav class="breadcrumb-demo" aria-label="예제 경로">
      <template v-for="(step, i) in visible" :key="step">
        <span v-if="i">/</span>
        <button v-if="i < visible.length - 1" @click="depth = i + 1">{{ step }}</button>
        <strong v-else aria-current="page">{{ step }}</strong>
      </template>
    </nav>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.breadcrumb-demo {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 18px;
  background: var(--canvas);
  border-radius: 10px;
  span {
    color: var(--caption);
  }
  button {
    border: 0;
    background: none;
    color: var(--muted);
    padding: 0;
  }
  strong {
    color: var(--primary);
    font-weight: 500;
  }
}
</style>
`},"756-b06a98ef-94d1eeeb":{file:"src/views/ui-kits/buttons.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseButton from '@/components/common/BaseButton.vue';
export default {
  name: 'Buttons',
  components: {
    BaseButton
  },
  data() {
    const count = 0;
    const disabled = false;
    return {
      count,
      disabled
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <label>
      <input v-model="disabled" type="checkbox" />
      비활성화
    </label>
    <div class="demo__row">
      <BaseButton
        v-for="variant in ['primary', 'secondary', 'danger']"
        :key="variant"
        :variant="variant"
        :disabled="disabled"
        @click="count++"
      >
        {{ variant }} ↗
      </BaseButton>
    </div>
    <output class="demo__output">{{ count }}회 클릭</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1813-7b9640ae-298d460e":{file:"src/views/ui-kits/carousel.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Carousel',
  data() {
    const index = 0;
    const slides = [
      {
        title: 'Create with curiosity.',
        text: '아이디어를 실험하는 공간',
        color: '#eeebff'
      },
      {
        title: 'Build with Vue.',
        text: '반응형 UI를 손쉽게',
        color: '#e5f4ef'
      },
      {
        title: 'Make it yours.',
        text: '작은 디테일로 완성하세요',
        color: '#fff0df'
      }
    ];
    return {
      index,
      slides
    };
  },
  computed: {
    slide() {
      return this.slides[this.index];
    }
  },
  methods: {
    move(n) {
      this.index = (this.index + n + this.slides.length) % this.slides.length;
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <section
      class="carousel"
      aria-roledescription="캐러셀"
      aria-label="프로젝트 소개"
      @keydown.left="move(-1)"
      @keydown.right="move(1)"
    >
      <article :style="{ background: slide.color }" aria-live="polite">
        <small>{{ index + 1 }} / {{ slides.length }}</small>
        <h2>{{ slide.title }}</h2>
        <p>{{ slide.text }}</p>
      </article>
      <footer>
        <button aria-label="이전 슬라이드" @click="move(-1)">←</button>
        <button
          v-for="(_, i) in slides"
          :key="i"
          :aria-label="i + 1 + '번 슬라이드'"
          :aria-pressed="index === i"
          @click="index = i"
        >
          {{ i + 1 }}
        </button>
        <button aria-label="다음 슬라이드" @click="move(1)">→</button>
      </footer>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.carousel {
  article {
    padding: 60px 30px;
    text-align: center;
    border-radius: 14px;
    color: #514b66;
    h2 {
      font-size: 30px;
      margin: 12px 0;
    }
    p {
      color: #8d849e;
    }
  }
  footer {
    @include flex-center;
    gap: 8px;
    margin-top: 18px;
    button[aria-pressed='true'] {
      background: var(--primary);
      color: white;
    }
  }
}
</style>
`},"721-c4e4432c-c12059d0":{file:"src/views/ui-kits/charts.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ActivityChart from '@/components/common/ActivityChart.vue';
export default {
  name: 'Charts',
  components: {
    ActivityChart
  },
  data() {
    const multiplier = 1;
    return {
      multiplier
    };
  },
  computed: {
    values() {
      return [22, 42, 35, 65, 48, 78, 62, 91].map((v) => Math.round(v * this.multiplier));
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <label>
      데이터 배율
      <input v-model.number="multiplier" type="range" min="0.3" max="1" step="0.1" />
    </label>
    <ActivityChart :values="values" />
    <p class="demo__muted">
      외부 차트 라이브러리 없이 SVG를 Vue 상태와 연결했습니다. 포인트에 마우스나 키보드
      포커스를 올려 값을 확인하세요.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1189-cdd2f661-d624f549":{file:"src/views/ui-kits/dropdown.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'Dropdown',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const id = useId();
    return {
      id
    };
  },
  data() {
    const open = false;
    const selected = '작업을 선택하세요';
    return {
      open,
      selected
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <section class="dropdown" @keydown.esc="open = false">
      <button :aria-expanded="open" :aria-controls="id" @click="open = !open">
        프로젝트 작업 ⌄
      </button>
      <ul v-if="open" :id="id" class="dropdown__menu" aria-label="프로젝트 작업">
        <li v-for="item in ['편집', '복제', '보관']" :key="item">
          <button
            @click="
              selected = item + ' 선택됨';
              open = false;
            "
          >
            {{ item }}
          </button>
        </li>
      </ul>
    </section>
    <output class="demo__output">{{ selected }}</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.dropdown {
  position: relative;
  min-height: 180px;
  &__menu {
    @include card-surface;
    position: absolute;
    top: 32px;
    padding: 6px;
    list-style: none;
    min-width: 160px;
    z-index: 2;
    button {
      width: 100%;
      text-align: left;
      border: 0;
    }
  }
}
</style>
`},"397-b15f9a22-94dd9d26":{file:"src/views/ui-kits/dropzone.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseDropzone from '@/components/common/BaseDropzone.vue';
export default {
  name: 'Dropzone',
  components: {
    BaseDropzone
  },
  data() {
    const files = [];
    return {
      files
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <BaseDropzone v-model="files" />
    <output>{{ files.length }}개 파일 선택됨</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"943-2c133713-4c89ddeb":{file:"src/views/ui-kits/grid.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Grid',
  data() {
    const columns = 3;
    const gap = 16;
    return {
      columns,
      gap
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        열 수
        <input v-model.number="columns" type="range" min="1" max="4" />
      </label>
      <label>
        간격
        <input v-model.number="gap" type="range" min="4" max="32" />
      </label>
    </div>
    <section
      class="grid-demo"
      :style="{ gridTemplateColumns: \`repeat(\${columns},minmax(0,1fr))\`, gap: gap + 'px' }"
    >
      <article v-for="n in 8" :key="n">Column {{ n }}</article>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.grid-demo {
  display: grid;
  article {
    @include flex-center;
    padding: 30px 8px;
    background: var(--soft);
    color: var(--primary);
    border-radius: 10px;
    font-size: 12px;
  }
}
</style>
`},"1089-7909eb35-49dd6ea5":{file:"src/views/ui-kits/helpers.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Helpers',
  data() {
    const compact = false;
    const align = 'left';
    return {
      compact,
      align
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        <input v-model="compact" type="checkbox" />
        Compact spacing
      </label>
      <label>
        정렬
        <select v-model="align">
          <option>left</option>
          <option>center</option>
          <option>right</option>
        </select>
      </label>
    </div>
    <article
      class="helpers__box"
      :class="{ 'helpers__box--compact': compact }"
      :style="{ textAlign: align }"
    >
      <h3>SCSS helper composition</h3>
      <p>컴포넌트 내부에서 card-surface, text-ellipsis, focus-ring 믹스인을 조합합니다.</p>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.helpers__box {
  @include card-surface;
  padding: 40px;
  transition: padding 0.2s;
  p {
    @include text-ellipsis;
    color: var(--caption);
    margin-top: 12px;
  }
  &--compact {
    padding: 16px;
  }
}
</style>
`},"1075-70d87e45-c0264b7":{file:"src/views/ui-kits/icons.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import {
  Heart,
  Star,
  Settings,
  Code2,
  Search,
  Bell,
  Calendar,
  Layers
} from 'lucide-vue-next';
export default {
  name: 'Icons',
  data() {
    const size = 24;
    const icons = {
      Heart,
      Star,
      Settings,
      Code2,
      Search,
      Bell,
      Calendar,
      Layers
    };
    return {
      size,
      icons
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <label>
      아이콘 크기 {{ size }}px
      <input v-model.number="size" type="range" min="16" max="40" />
    </label>
    <section class="icons-demo">
      <article v-for="(icon, name) in icons" :key="name">
        <component :is="icon" :size="size" />
        <code>{{ name }}</code>
      </article>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.icons-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  article {
    @include card-surface;
    @include flex-center;
    min-height: 100px;
    flex-direction: column;
    gap: 12px;
    color: var(--primary);
  }
  code {
    font-size: 10px;
    color: var(--caption);
  }
}
</style>
`},"1156-d6786a84-4b65671a":{file:"src/views/ui-kits/lists.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Lists',
  data() {
    const active = 1;
    const items = [
      {
        id: 1,
        name: 'Design system',
        count: 12
      },
      {
        id: 2,
        name: 'Components',
        count: 24
      },
      {
        id: 3,
        name: 'Patterns',
        count: 6
      }
    ];
    return {
      active,
      items
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <ul class="list-demo">
      <li v-for="item in items" :key="item.id">
        <button :aria-pressed="active === item.id" @click="active = item.id">
          <span>{{ item.name }}</span>
          <small>{{ item.count }}</small>
        </button>
      </li>
    </ul>
    <p class="demo__muted">선택한 목록: {{ items.find((i) => i.id === active)?.name }}</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.list-demo {
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  gap: 8px;
  button {
    @include flex-between;
    width: 100%;
    padding: 15px 18px;
    &[aria-pressed='true'] {
      background: var(--soft);
      color: var(--primary);
      border-color: var(--primary);
    }
  }
  small {
    background: var(--canvas);
    border-radius: 9999px;
    padding: 2px 9px;
  }
}
</style>
`},"981-1f4f62c5-55fb661d":{file:"src/views/ui-kits/modal.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseModal from '@/components/common/BaseModal.vue';
export default {
  name: 'Modal',
  components: {
    BaseModal
  },
  data() {
    const open = false;
    const result = '';
    return {
      open,
      result
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <button class="demo__primary" @click="open = true">접근성을 갖춘 모달</button>
    <p class="demo__muted">네이티브 dialog: 포커스 트랩, ESC 닫기, 이전 포커스 복원 지원</p>
    <output>{{ result }}</output>
    <BaseModal v-model="open" title="접근성을 갖춘 모달">
      <p>작업 내용을 확인한 후 선택하세요.</p>
      <div class="demo__row">
        <button
          @click="
            open = false;
            result = '취소했습니다.';
          "
        >
          취소
        </button>
        <button
          class="demo__primary"
          @click="
            open = false;
            result = '확인했습니다.';
          "
        >
          확인
        </button>
      </div>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"727-fa00466a-ef374380":{file:"src/views/ui-kits/pagination.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BasePagination from '@/components/common/BasePagination.vue';
export default {
  name: 'Pagination',
  components: {
    BasePagination
  },
  data() {
    const page = 1;
    const items = Array.from(
      {
        length: 28
      },
      (_, i) => 'Reference ' + (i + 1)
    );
    return {
      page,
      items
    };
  },
  computed: {
    visible() {
      return this.items.slice((this.page - 1) * 5, this.page * 5);
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <ul class="demo__list">
      <li v-for="item in visible" :key="item" class="demo__item">{{ item }}</li>
    </ul>
    <BasePagination v-model="page" :total="items.length" :page-size="5" />
    <output>현재 {{ page }} 페이지 / 총 28개 항목</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"984-48a7186d-cbb4dcf5":{file:"src/views/ui-kits/popover.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'Popover',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const id = useId();
    return {
      id
    };
  },
  data() {
    const open = false;
    return {
      open
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <section class="popover" @keydown.esc="open = false">
      <button :aria-expanded="open" :aria-controls="id" @click="open = !open">
        프로젝트 정보
      </button>
      <article v-if="open" :id="id" class="popover__content">
        <h3>Vue Atelier</h3>
        <p>Vue 3 + SCSS 기반의 개발자 워크스페이스</p>
        <button @click="open = false">닫기</button>
      </article>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.popover {
  position: relative;
  min-height: 190px;
  &__content {
    @include card-surface;
    position: absolute;
    top: 50px;
    left: 0;
    max-width: 300px;
    padding: 20px;
    z-index: 2;
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 12px;
      color: var(--muted);
      margin: 8px 0 14px;
    }
  }
}
</style>
`},"980-72589f68-d71b5b8":{file:"src/views/ui-kits/progress.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Progress',
  data() {
    const value = 64;
    return {
      value
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <label>
      진행률 {{ value }}%
      <input v-model.number="value" type="range" min="0" max="100" />
    </label>
    <label class="demo__field">
      프로젝트 진행
      <progress :value="value" max="100" :aria-label="'프로젝트 진행률 ' + value + '%'" />
    </label>
    <div
      class="progress-demo"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="사용량"
    >
      <span :style="{ width: value + '%' }" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.progress-demo {
  height: 14px;
  background: var(--soft);
  border-radius: 9999px;
  overflow: hidden;
  span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #b4a2f0);
    transition: width 0.2s;
  }
}
</style>
`},"438-112201d2-71569380":{file:"src/views/ui-kits/rating.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseRating from '@/components/common/BaseRating.vue';
export default {
  name: 'Rating',
  components: {
    BaseRating
  },
  data() {
    const rating = 4;
    return {
      rating
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <BaseRating v-model="rating" label="사용 경험" />
    <output class="demo__output"
      >{{ rating }}점 · 키보드 방향키로도 조작할 수 있습니다.</output
    >
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"884-4f983003-7e0665f3":{file:"src/views/ui-kits/ribbon.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Ribbon',
  data() {
    const label = 'NEW';
    return {
      label
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <label>
      리본 텍스트
      <input v-model="label" maxlength="15" />
    </label>
    <article class="ribbon">
      <span class="ribbon__label">{{ label }}</span>
      <h3>Thoughtfully designed.</h3>
      <p>재사용 가능한 카드에 작은 포인트를 더하세요.</p>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.ribbon {
  @include card-surface;
  position: relative;
  overflow: hidden;
  padding: 70px 30px 30px;
  h3 {
    margin-bottom: 12px;
  }
  p {
    color: var(--caption);
  }
  &__label {
    position: absolute;
    right: 0;
    top: 20px;
    background: var(--primary);
    color: white;
    padding: 5px 25px;
    font-size: 11px;
    border-radius: 5px 0 0 5px;
  }
}
</style>
`},"981-f3a1b56d-6316d0dd":{file:"src/views/ui-kits/sweetalert.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseModal from '@/components/common/BaseModal.vue';
export default {
  name: 'Sweetalert',
  components: {
    BaseModal
  },
  data() {
    const open = false;
    const result = '';
    return {
      open,
      result
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <button class="demo__primary" @click="open = true">작업을 삭제할까요?</button>
    <p class="demo__muted">네이티브 dialog: 포커스 트랩, ESC 닫기, 이전 포커스 복원 지원</p>
    <output>{{ result }}</output>
    <BaseModal v-model="open" title="작업을 삭제할까요?">
      <p>작업 내용을 확인한 후 선택하세요.</p>
      <div class="demo__row">
        <button
          @click="
            open = false;
            result = '취소했습니다.';
          "
        >
          취소
        </button>
        <button
          class="demo__primary"
          @click="
            open = false;
            result = '확인했습니다.';
          "
        >
          확인
        </button>
      </div>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"527-93997982-a2ffdf62":{file:"src/views/ui-kits/tabs.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseTabs from '@/components/common/BaseTabs.vue';
export default {
  name: 'Tabs',
  components: {
    BaseTabs
  },
  data() {
    const items = [
      {
        title: '개요',
        content: 'Vue 3 표준 문법과 재사용 가능한 UI를 제공합니다.'
      },
      {
        title: '설치 방법',
        content: 'npm install 후 npm run dev로 개발 서버를 실행하세요.'
      },
      {
        title: '소스 코드',
        content: '하단 코드 보기에서 전체 Vue 파일과 의존 파일을 확인할 수 있습니다.'
      }
    ];
    return {
      items
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <BaseTabs :items="items" />
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1397-7f83bb9d-1fe259d3":{file:"src/views/ui-kits/tags.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import BaseBadge from '@/components/common/BaseBadge.vue';
export default {
  name: 'Tags',
  components: {
    BaseBadge
  },
  data() {
    const tags = ['Vue 3', 'SCSS', 'Composition API'];
    const input = '';
    return {
      tags,
      input
    };
  },
  methods: {
    add() {
      if (this.input.trim() && !this.tags.includes(this.input.trim()))
        this.tags.push(this.input.trim());
      this.input = '';
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <BaseBadge
        v-for="tone in ['primary', 'success', 'warning', 'danger']"
        :key="tone"
        :tone="tone"
      >
        {{ tone }}
      </BaseBadge>
    </div>
    <form class="demo__row" @submit.prevent="add">
      <input v-model="input" aria-label="새 태그" placeholder="태그 입력" />
      <button type="submit">+ 추가</button>
    </form>
    <div class="demo__row">
      <span v-for="tag in tags" :key="tag" class="tag">
        {{ tag }}
        <button :aria-label="tag + ' 제거'" @click="tags = tags.filter((t) => t !== tag)">
          ×
        </button>
      </span>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--soft);
  color: var(--primary);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 12px;
  button {
    border: 0;
    padding: 0;
    background: none;
    color: inherit;
  }
}
</style>
`},"1041-97f7cbe-d6deee00":{file:"src/views/ui-kits/tooltip.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useId } from 'vue';
export default {
  name: 'Tooltip',
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const id = useId();
    return {
      id
    };
  },
  data() {
    const visible = false;
    return {
      visible
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <section class="tooltip">
      <button
        :aria-describedby="visible ? id : undefined"
        @mouseenter="visible = true"
        @mouseleave="visible = false"
        @focus="visible = true"
        @blur="visible = false"
        @keydown.esc="visible = false"
      >
        마우스를 올리거나 Tab으로 이동하세요
      </button>
      <span v-if="visible" :id="id" role="tooltip" class="tooltip__content">
        키보드 포커스에서도 정보를 제공합니다.
      </span>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.tooltip {
  position: relative;
  padding: 45px 0;
  &__content {
    position: absolute;
    bottom: 100%;
    left: 0;
    transform: translateY(40px);
    background: var(--code);
    color: #fff;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    max-width: 280px;
  }
}
</style>
`},"887-1dec0a36-dafa8200":{file:"src/views/ui-kits/tree.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import TreeNode from '@/components/common/TreeNode.vue';
export default {
  name: 'Tree',
  components: {
    TreeNode
  },
  data() {
    const tree = {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'components',
          label: 'components',
          children: [
            {
              id: 'common',
              label: 'common',
              children: [
                {
                  id: 'button',
                  label: 'BaseButton.vue'
                },
                {
                  id: 'modal',
                  label: 'BaseModal.vue'
                }
              ]
            }
          ]
        },
        {
          id: 'views',
          label: 'views',
          children: [
            {
              id: 'dashboard',
              label: 'dashboard.vue'
            }
          ]
        },
        {
          id: 'main',
          label: 'main.js'
        }
      ]
    };
    return {
      tree
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <ul class="tree-demo" aria-label="프로젝트 파일 트리">
      <TreeNode :node="tree" />
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.tree-demo {
  padding: 0;
  margin: 0;
}
</style>
`},"1168-c2656a37-eeb71381":{file:"src/views/ui-kits/typography.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Typography',
  data() {
    const scale = 1;
    return {
      scale
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <label>
      배율
      <input v-model.number="scale" type="range" min="0.8" max="1.4" step="0.1" />
    </label>
    <article class="typography" :style="{ fontSize: scale + 'rem' }">
      <h1>Design with intention.</h1>
      <h2>좋은 인터페이스의 시작</h2>
      <h3>일관된 타입 스케일</h3>
      <p>
        읽기 편한 문장은 분명한 계층에서 시작합니다.
        <strong>굵게 강조</strong>
        ,
        <em>기울임</em>
        ,
        <mark>중요한 정보</mark>
        를 적절하게 사용하세요.
      </p>
      <blockquote>작은 디테일이 좋은 경험을 만듭니다.</blockquote>
      <code>const idea = ref('hello')</code>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.typography {
  display: grid;
  gap: 18px;
  h1 {
    font-size: 2em;
    letter-spacing: -1px;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.2em;
  }
  p {
    font-size: 1em;
    color: var(--muted);
  }
  blockquote {
    border-left: 3px solid var(--primary);
    margin: 0;
    padding: 12px 20px;
    background: var(--soft);
  }
}
</style>
`},"2206-7c4aa84e-5c56f30e":{file:"src/views/vue-patterns/async.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import peopleUrl from '@/data/apiPeople.json?url';
export default {
  name: 'Async',
  data() {
    const loading = false;
    const error = '';
    const data = [];
    const fail = false;
    let controller;
    return {
      loading,
      error,
      data,
      fail,
      controller
    };
  },
  methods: {
    async load() {
      this.controller?.abort();
      const current = new AbortController();
      this.controller = current;
      this.loading = true;
      this.error = '';
      try {
        const response = await fetch(this.fail ? '/api/demo-failure' : peopleUrl, {
          signal: current.signal
        });
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        const result = await response.json();
        if (!Array.isArray(result)) throw new Error('올바르지 않은 API 응답입니다.');
        this.data = result;
      } catch (e) {
        if (e.name !== 'AbortError')
          this.error = '데이터를 불러오지 못했습니다. 다시 시도하세요.';
      } finally {
        if (this.controller === current) this.loading = false;
      }
    }
  },
  mounted() {
    this.load();
  },
  unmounted() {
    return this.controller?.abort();
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <button class="demo__primary" :disabled="loading" @click="load">
        {{ loading ? '불러오는 중...' : '새로고침 / 재시도' }}
      </button>
      <label>
        <input v-model="fail" type="checkbox" />
        실패 응답 테스트
      </label>
    </div>
    <p class="demo__muted">
      동일 출처 JSON API를 fetch합니다. 실패 테스트는 HTML 응답을 거부하고 오류 UI를
      표시합니다.
    </p>
    <div v-if="loading" class="demo__grid" aria-busy="true" aria-label="데이터 로딩">
      <span v-for="n in 3" :key="n" class="api-skeleton" />
    </div>
    <p v-else-if="error" role="alert" class="demo__error">{{ error }}</p>
    <ul v-else class="demo__list">
      <li v-for="person in data" :key="person.id" class="demo__item">
        <strong>{{ person.name }}</strong>
        <span>{{ person.role }}</span>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.api-skeleton {
  height: 72px;
  background: linear-gradient(90deg, var(--canvas), var(--border), var(--canvas));
  background-size: 200%;
  border-radius: 10px;
  animation: shimmer 1.3s infinite;
}
@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}
</style>
`},"1392-5f814a8d-e2446779":{file:"src/views/vue-patterns/composables.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import { useModal } from '@/composables/useModal';
import { useToast } from '@/composables/useToast';
import { useConfirm } from '@/composables/useConfirm';
import BaseModal from '@/components/common/BaseModal.vue';
export default {
  name: 'Composables',
  components: {
    BaseModal
  },
  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.
  setup() {
    const { isOpen, open } = useModal();
    const { toast } = useToast();
    const confirmation = useConfirm();
    return {
      isOpen,
      open,
      toast,
      confirmation
    };
  },
  data() {
    const result = '확인 대기';
    return {
      result,
      useModal,
      useToast,
      useConfirm
    };
  },
  methods: {
    async remove() {
      this.result = (await this.confirmation.confirm('프로젝트를 삭제할까요?'))
        ? '삭제를 승인했습니다.'
        : '삭제를 취소했습니다.';
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <button @click="open">useModal 열기</button>
      <button @click="toast('재사용 가능한 토스트입니다.')">useToast 실행</button>
      <button @click="remove">useConfirm 실행</button>
    </div>
    <output class="demo__output">{{ result }}</output>
    <BaseModal v-model="isOpen" title="Composable 모달">
      <p>UI 상태와 비즈니스 로직을 독립적인 함수로 분리합니다.</p>
    </BaseModal>
    <BaseModal v-model="confirmation.isOpen.value" title="삭제 확인">
      <p>{{ confirmation.message.value }}</p>
      <div class="demo__row">
        <button @click="confirmation.cancel">취소</button>
        <button class="demo__primary" @click="confirmation.accept">확인</button>
      </div>
    </BaseModal>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1674-80239d87-b7b2b6bf":{file:"src/views/vue-patterns/debounce.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Debounce',
  data() {
    const input = '';
    const query = '';
    const category = 'all';
    const pending = false;
    const items = [
      {
        id: 1,
        name: 'Vue 3 Guide',
        category: '문서'
      },
      {
        id: 2,
        name: 'Vite Build',
        category: '도구'
      },
      {
        id: 3,
        name: 'Vue Router',
        category: '도구'
      },
      {
        id: 4,
        name: 'SCSS Design System',
        category: '문서'
      }
    ];
    return {
      input,
      query,
      category,
      pending,
      items
    };
  },
  computed: {
    results() {
      return this.items.filter(
        (i) =>
          i.name.toLowerCase().includes(this.query.toLowerCase()) &&
          (this.category === 'all' || i.category === this.category)
      );
    }
  },
  watch: {
    input: {
      handler(value, old, onCleanup) {
        this.pending = true;
        const timer = setTimeout(() => {
          this.query = value.trim();
          this.pending = false;
        }, 350);
        onCleanup(() => clearTimeout(timer));
      }
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        검색
        <input v-model="input" placeholder="Vue를 검색해 보세요" />
      </label>
      <label>
        분류
        <select v-model="category" aria-label="분류">
          <option value="all">전체</option>
          <option>문서</option>
          <option>도구</option>
        </select>
      </label>
      <span role="status">
        {{ pending ? '입력 대기 중 (350ms)…' : results.length + '개 결과' }}
      </span>
    </div>
    <ul class="demo__list">
      <li v-for="item in results" :key="item.id" class="demo__item">
        {{ item.name }}
        <small>{{ item.category }}</small>
      </li>
    </ul>
    <p v-if="!results.length">검색 결과가 없습니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"2011-3d98ce07-9bfecab3":{file:"src/views/vue-patterns/dynamic-form.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'DynamicForm',
  data() {
    let nextId = 2;
    const rows = [
      {
        id: 1,
        name: '',
        email: ''
      }
    ];
    const submitted = false;
    return {
      nextId,
      rows,
      submitted
    };
  },
  computed: {
    errors() {
      return this.rows.map((r) => ({
        name: r.name.trim() ? '' : '이름을 입력하세요.',
        email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(r.email)
          ? ''
          : '올바른 이메일을 입력하세요.'
      }));
    },
    valid() {
      return this.rows.length > 0 && this.errors.every((e) => !e.name && !e.email);
    }
  },
  methods: {
    submit() {
      this.submitted = true;
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <form class="demo" @submit.prevent="submit">
      <fieldset v-for="(row, i) in rows" :key="row.id">
        <legend>팀원 {{ i + 1 }}</legend>
        <div class="demo__row">
          <label class="demo__field">
            이름
            <input v-model="row.name" :aria-invalid="!!errors[i].name" required />
            <small class="demo__error">{{ errors[i].name }}</small>
          </label>
          <label class="demo__field">
            이메일
            <input
              v-model="row.email"
              type="email"
              :aria-invalid="!!errors[i].email"
              required
            />
            <small class="demo__error">{{ errors[i].email }}</small>
          </label>
          <button
            type="button"
            :disabled="rows.length === 1"
            @click="rows = rows.filter((r) => r.id !== row.id)"
          >
            행 삭제
          </button>
        </div>
      </fieldset>
      <div class="demo__row">
        <button
          type="button"
          @click="
            rows.push({ id: nextId++, name: '', email: '' });
            submitted = false;
          "
        >
          + 팀원 추가
        </button>
        <button class="demo__primary" :disabled="!valid" type="submit">팀 저장</button>
      </div>
    </form>
    <output v-if="submitted && valid" class="demo__output">
      {{ rows.length }}명의 팀원을 저장했습니다.
    </output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1915-28ff7393-2aaa08a1":{file:"src/views/vue-patterns/infinite.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Infinite',
  data() {
    const items = [];
    const loading = false;
    const finished = false;
    let observer;
    let timer;
    return {
      items,
      loading,
      finished,
      observer,
      timer
    };
  },
  methods: {
    load() {
      if (this.loading || this.finished) return;
      this.loading = true;
      this.timer = setTimeout(() => {
        const start = this.items.length;
        this.items.push(
          ...Array.from(
            {
              length: 8
            },
            (_, i) => ({
              id: start + i + 1,
              title: \`Reference article \${start + i + 1}\`
            })
          )
        );
        this.finished = this.items.length >= 40;
        this.loading = false;
      }, 400);
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) this.load();
      },
      {
        root: this.$refs.sentinel.parentElement,
        rootMargin: '100px'
      }
    );
    this.observer.observe(this.$refs.sentinel);
  },
  unmounted() {
    this.observer?.disconnect();
    clearTimeout(this.timer);
  }
};
<\/script>
<template>
  <section class="demo">
    <p class="demo__muted">
      아래 목록 내부를 스크롤하면 8개씩 추가됩니다. 최대 40개 · observer와 타이머는
      해제됩니다.
    </p>
    <section class="infinite-feed" aria-label="무한 스크롤 목록" tabindex="0">
      <article v-for="item in items" :key="item.id" class="demo__item">
        <span>✦ {{ item.title }}</span>
        <small>Vue 3</small>
      </article>
      <footer ref="sentinel" class="infinite-feed__sentinel" role="status">
        {{
          finished
            ? '모든 항목을 불러왔습니다.'
            : loading
              ? '불러오는 중…'
              : '아래로 스크롤하세요.'
        }}
      </footer>
    </section>
    <button :disabled="loading || finished" @click="load">더 보기 (키보드 지원)</button>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.infinite-feed {
  height: 350px;
  overflow: auto;
  @include custom-scrollbar;
  display: grid;
  gap: 8px;
  &__sentinel {
    text-align: center;
    padding: 20px;
    color: var(--caption);
  }
}
</style>
`},"1437-4b4c206a-c3522e8e":{file:"src/views/vue-patterns/selection.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Selection',
  data() {
    const rows = [
      {
        id: 1,
        name: '컴포넌트 설계'
      },
      {
        id: 2,
        name: '접근성 검사'
      },
      {
        id: 3,
        name: '프로덕션 빌드'
      },
      {
        id: 4,
        name: '코드 리뷰'
      }
    ];
    const selected = [];
    return {
      rows,
      selected
    };
  },
  computed: {
    all: {
      get() {
        return this.rows.length > 0 && this.rows.every((r) => this.selected.includes(r.id));
      },
      set(value) {
        this.selected = value ? this.rows.map((r) => r.id) : [];
      }
    },
    partial() {
      return this.selected.length > 0 && !this.all;
    }
  },
  methods: {
    remove() {
      this.rows = this.rows.filter((r) => !this.selected.includes(r.id));
      this.selected = [];
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <label>
        <input v-model="all" type="checkbox" :indeterminate="partial" />
        전체 선택
      </label>
      <span>{{ selected.length }}개 선택</span>
      <button :disabled="!selected.length" class="demo__danger" @click="remove">
        선택 삭제
      </button>
    </div>
    <ul class="demo__list">
      <li v-for="row in rows" :key="row.id" class="demo__item">
        <label>
          <input v-model="selected" type="checkbox" :value="row.id" />
          {{ row.name }}
        </label>
        <code>#{{ row.id }}</code>
      </li>
    </ul>
    <p v-if="!rows.length">모든 항목이 삭제되었습니다. 페이지를 다시 열면 초기화됩니다.</p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"16343-9f27c8f0-3521efc0":JSON.parse(`{"file":"src/views/vue-practice/exercises.vue","code":"<script>\\n// Options API: data · computed · methods · watch · lifecycle\\nimport { defineAsyncComponent, markRaw } from 'vue';\\nimport { vueExercises, exerciseCategories } from '@/composables/vueExercises';\\nimport { createPracticePreview } from '@/composables/practicePreview';\\nimport { useTheme } from '@/composables/useTheme';\\nimport SyntaxCode from '@/components/common/SyntaxCode.vue';\\nimport CodeExampleCard from '@/components/common/CodeExampleCard.vue';\\nexport default {\\n  name: 'Exercises',\\n  components: {\\n    SyntaxCode,\\n    CodeExampleCard\\n  },\\n  // 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.\\n  setup() {\\n    const { theme } = useTheme();\\n    return {\\n      theme\\n    };\\n  },\\n  data() {\\n    const selected = vueExercises[0].id;\\n    const category = '전체';\\n    const level = '전체';\\n    const query = '';\\n    const answerOpen = false;\\n    const previewOpen = true;\\n    const previewMode = 'html';\\n    const rawSources = import.meta.glob('/src/components/practice/*.vue', {\\n      query: '?raw',\\n      import: 'default',\\n      eager: true\\n    });\\n    const loaders = import.meta.glob('/src/components/practice/*.vue');\\n    const examples = Object.fromEntries(\\n      vueExercises.map((item) => [\\n        item.id,\\n        markRaw(defineAsyncComponent(loaders[item.sourceFile]))\\n      ])\\n    );\\n    return {\\n      selected,\\n      category,\\n      level,\\n      query,\\n      answerOpen,\\n      previewOpen,\\n      previewMode,\\n      rawSources,\\n      loaders,\\n      examples,\\n      vueExercises,\\n      exerciseCategories\\n    };\\n  },\\n  computed: {\\n    active() {\\n      return vueExercises.find((item) => item.id === this.selected);\\n    },\\n    previewDocument() {\\n      return createPracticePreview(\\n        this.active.html,\\n        this.active.css,\\n        this.theme === 'dark'\\n      );\\n    },\\n    filtered() {\\n      return vueExercises.filter(\\n        (item) =>\\n          (this.category === '전체' || item.category === this.category) &&\\n          (this.level === '전체' || item.level === this.level) &&\\n          \`\${item.title} \${item.question} \${item.category}\`\\n            .toLowerCase()\\n            .includes(this.query.trim().toLowerCase())\\n      );\\n    },\\n    answerFiles() {\\n      return {\\n        ['practice/' + this.active.id + '.vue']: this.rawSources[this.active.sourceFile]\\n      };\\n    },\\n    position() {\\n      return this.filtered.findIndex((item) => item.id === this.selected);\\n    }\\n  },\\n  methods: {\\n    move(delta) {\\n      const item = this.filtered[this.position + delta];\\n      if (item) this.selected = item.id;\\n    }\\n  },\\n  watch: {\\n    filtered: {\\n      handler(items) {\\n        if (items.length && !items.some((item) => item.id === this.selected))\\n          this.selected = items[0].id;\\n      }\\n    },\\n    selected: {\\n      handler() {\\n        this.answerOpen = false;\\n        this.previewOpen = true;\\n        this.previewMode = 'html';\\n      }\\n    }\\n  }\\n};\\n<\/script>\\n<template>\\n  <section class=\\"practice\\">\\n    <header class=\\"practice__intro\\">\\n      <span class=\\"practice__eyebrow\\">QUESTION & ANSWER · VUE 3</span>\\n      <h1>\\n        Vue 실무예제\\n        <small>문제 → 정답 → 상세 해설</small>\\n      </h1>\\n      <p>\\n        화면보기에서 HTML·CSS 문제 화면과 완성된 Vue 동작을 비교해 보세요. 정답을 열면 전체\\n        Vue 코드와 단계별 설명을 확인할 수 있습니다.\\n      </p>\\n      <div class=\\"practice__categories\\" aria-label=\\"문제 분야 요약\\">\\n        <span v-for=\\"name in exerciseCategories\\" :key=\\"name\\">\\n          {{ name }}\\n          <strong>{{\\n            vueExercises.filter((item) => item.category === name).length\\n          }}</strong>\\n        </span>\\n      </div>\\n      <p class=\\"practice__total\\">\\n        총 {{ vueExercises.length }}문제 · 조건문부터 실제 UI 상태 관리까지\\n      </p>\\n    </header>\\n    <div class=\\"practice__layout\\">\\n      <aside class=\\"practice__catalog\\" aria-label=\\"실무 문제 목록\\">\\n        <label>\\n          문제 검색\\n          <input v-model=\\"query\\" type=\\"search\\" placeholder=\\"if, for, 모달, 검색…\\" />\\n        </label>\\n        <label>\\n          분야\\n          <select v-model=\\"category\\">\\n            <option>전체</option>\\n            <option v-for=\\"name in exerciseCategories\\" :key=\\"name\\">{{ name }}</option>\\n          </select>\\n        </label>\\n        <label>\\n          난이도\\n          <select v-model=\\"level\\">\\n            <option>전체</option>\\n            <option>입문</option>\\n            <option>기본</option>\\n            <option>실무</option>\\n          </select>\\n        </label>\\n        <p class=\\"practice__muted\\">{{ filtered.length }}개 문제</p>\\n        <nav aria-label=\\"문제 선택\\">\\n          <button\\n            v-for=\\"item in filtered\\"\\n            :key=\\"item.id\\"\\n            type=\\"button\\"\\n            :aria-current=\\"selected === item.id ? 'true' : undefined\\"\\n            @click=\\"selected = item.id\\"\\n          >\\n            <small>{{ item.category }} · {{ item.level }}</small>\\n            <strong>{{ vueExercises.indexOf(item) + 1 }}. {{ item.title }}</strong>\\n          </button>\\n        </nav>\\n      </aside>\\n      <article v-if=\\"filtered.length\\" class=\\"practice__problem\\" :aria-label=\\"active.title\\">\\n        <header class=\\"practice__heading\\">\\n          <span>\\n            문제 {{ vueExercises.indexOf(active) + 1 }} · {{ active.category }} ·\\n            {{ active.level }}\\n          </span>\\n          <h2>{{ active.title }}</h2>\\n        </header>\\n        <section class=\\"practice__question\\">\\n          <h3>문제</h3>\\n          <p>{{ active.question }}</p>\\n          <h4>만들어야 할 동작</h4>\\n          <ul>\\n            <li v-for=\\"check in active.checks\\" :key=\\"check\\">{{ check }}</li>\\n          </ul>\\n        </section>\\n        <section class=\\"practice__preview\\" aria-label=\\"화면보기\\">\\n          <header class=\\"practice__preview-heading\\">\\n            <h3>화면보기</h3>\\n            <button\\n              type=\\"button\\"\\n              :aria-expanded=\\"previewOpen\\"\\n              aria-controls=\\"practice-preview\\"\\n              @click=\\"previewOpen = !previewOpen\\"\\n            >\\n              {{ previewOpen ? '화면 접기' : '화면보기' }}\\n            </button>\\n          </header>\\n          <div v-if=\\"previewOpen\\" id=\\"practice-preview\\">\\n            <nav class=\\"practice__preview-tabs\\" aria-label=\\"미리보기 화면 선택\\">\\n              <button\\n                type=\\"button\\"\\n                :aria-pressed=\\"previewMode === 'html'\\"\\n                @click=\\"previewMode = 'html'\\"\\n              >\\n                문제 화면 · HTML/CSS\\n              </button>\\n              <button\\n                type=\\"button\\"\\n                :aria-pressed=\\"previewMode === 'complete'\\"\\n                @click=\\"previewMode = 'complete'\\"\\n              >\\n                완성 화면 · Vue 동작\\n              </button>\\n            </nav>\\n            <template v-if=\\"previewMode === 'html'\\">\\n              <p class=\\"practice__muted\\">\\n                주어진 HTML·CSS를 그대로 표시한 화면입니다. Vue 이벤트는 아직 연결되지\\n                않았습니다.\\n              </p>\\n              <iframe\\n                :key=\\"active.id + theme\\"\\n                class=\\"practice__frame\\"\\n                title=\\"문제 화면 미리보기\\"\\n                :srcdoc=\\"previewDocument\\"\\n                sandbox=\\"\\"\\n                referrerpolicy=\\"no-referrer\\"\\n              />\\n            </template>\\n            <template v-else>\\n              <p class=\\"practice__muted\\">\\n                목표로 하는 완성 화면입니다. 버튼과 입력창을 직접 조작해 동작을 확인하세요.\\n                정답 코드는 아래에서 따로 열 수 있습니다.\\n              </p>\\n              <div class=\\"practice__live\\" aria-label=\\"완성 화면 미리보기\\">\\n                <component :is=\\"examples[active.id]\\" :key=\\"active.id\\" />\\n              </div>\\n            </template>\\n          </div>\\n        </section>\\n        <section class=\\"practice__starter\\" aria-label=\\"문제 HTML과 CSS\\">\\n          <h3>주어진 HTML</h3>\\n          <p class=\\"practice__muted\\">\\n            아직 Vue 동작이 없는 정적 마크업입니다. 필요한 상태, 이벤트, 화면 조건을 먼저\\n            생각해 보세요.\\n          </p>\\n          <SyntaxCode\\n            :code=\\"active.html\\"\\n            language=\\"html\\"\\n            label=\\"문제 HTML\\"\\n            class=\\"practice__code\\"\\n          />\\n          <h3>주어진 CSS</h3>\\n          <SyntaxCode\\n            :code=\\"active.css\\"\\n            language=\\"css\\"\\n            label=\\"문제 CSS\\"\\n            class=\\"practice__code\\"\\n          />\\n        </section>\\n        <button\\n          class=\\"practice__answer-toggle\\"\\n          type=\\"button\\"\\n          :aria-expanded=\\"answerOpen\\"\\n          aria-controls=\\"practice-answer\\"\\n          @click=\\"answerOpen = !answerOpen\\"\\n        >\\n          {{ answerOpen ? '정답과 해설 닫기 ↑' : '정답과 해설 보기 ↓' }}\\n        </button>\\n        <section\\n          v-if=\\"answerOpen\\"\\n          id=\\"practice-answer\\"\\n          class=\\"practice__solution\\"\\n          aria-label=\\"정답과 상세 해설\\"\\n        >\\n          <header>\\n            <span class=\\"practice__eyebrow\\">ANSWER & EXPLANATION</span>\\n            <h3>정답을 이해하는 순서</h3>\\n            <p>\\n              코드를 그대로 외우기보다 상태가 어떻게 바뀌고 화면이 무엇을 읽는지 따라가\\n              보세요.\\n            </p>\\n          </header>\\n          <ol class=\\"practice__steps\\">\\n            <li v-for=\\"(step, index) in active.steps\\" :key=\\"step\\">\\n              <strong>단계 {{ index + 1 }}</strong>\\n              <p>{{ step }}</p>\\n            </li>\\n          </ol>\\n          <aside class=\\"practice__note\\">\\n            <h4>자주 헷갈리는 점</h4>\\n            <p>{{ active.pitfall }}</p>\\n          </aside>\\n          <details class=\\"practice__note practice__glossary\\">\\n            <summary>처음 보는 Vue 문법, 간단히 이해하기</summary>\\n            <dl>\\n              <dt>ref · .value</dt>\\n              <dd>\\n                화면과 연결할 값을 담습니다. script 안에서는 .value로 읽고 바꾸고,\\n                template에서는 이름만 사용합니다.\\n              </dd>\\n              <dt>computed</dt>\\n              <dd>\\n                기존 값에서 계산하는 결과입니다. 수량이 바뀌면 합계도 다시 계산되는 식으로,\\n                원본 상태와 결과를 따로 맞출 필요가 없습니다.\\n              </dd>\\n              <dt>watch</dt>\\n              <dd>\\n                어떤 값이 바뀌었을 때 실행할 일을 정합니다. 지역이 바뀌면 하위 선택을 비우는\\n                것처럼 상태 변경에 따른 작업을 처리합니다.\\n              </dd>\\n              <dt>v-if · v-show</dt>\\n              <dd>\\n                v-if는 조건에 따라 HTML 요소를 만들거나 제거합니다. v-show는 요소를 남긴 채\\n                보이기만 전환합니다.\\n              </dd>\\n              <dt>v-for · :key</dt>\\n              <dd>\\n                배열의 각 항목으로 같은 구조를 반복합니다. key는 순서가 바뀌어도 같은 항목을\\n                알아볼 수 있게 하는 이름표입니다.\\n              </dd>\\n              <dt>v-model</dt>\\n              <dd>\\n                입력창의 값과 Vue 상태를 연결합니다. 사용자가 입력하면 상태가 바뀌고,\\n                코드에서 상태를 바꾸면 입력창도 갱신됩니다.\\n              </dd>\\n              <dt>@click · :disabled · :class</dt>\\n              <dd>\\n                @는 이벤트가 발생했을 때 실행할 일입니다. :는 속성 값을 고정된 글자가 아니라\\n                현재 Vue 상태로 계산하겠다는 뜻입니다.\\n              </dd>\\n              <dt>onUnmounted</dt>\\n              <dd>\\n                컴포넌트가 화면에서 제거될 때 실행합니다. 타이머나 전역 이벤트처럼 자동으로\\n                사라지지 않는 작업을 정리합니다.\\n              </dd>\\n            </dl>\\n          </details>\\n          <CodeExampleCard\\n            :key=\\"active.id\\"\\n            title=\\"정답 · 전체 Vue 코드\\"\\n            description=\\"script setup · template · scoped SCSS가 포함된 완성 파일입니다.\\"\\n            :files=\\"answerFiles\\"\\n            :initially-expanded=\\"true\\"\\n          >\\n            <p class=\\"practice__muted\\">\\n              문제 위의 ‘화면보기 → 완성 화면 · Vue 동작’에서 실행 결과를 확인하세요.\\n            </p>\\n          </CodeExampleCard>\\n          <aside class=\\"practice__note\\">\\n            <h4>이렇게 확인해 보세요</h4>\\n            <ol>\\n              <li v-for=\\"check in active.checks\\" :key=\\"check\\">{{ check }}</li>\\n            </ol>\\n            <p>\\n              위 화면보기에서 결과를 확인한 뒤 전체 코드를 복사해 내 프로젝트에서 바꿔\\n              보세요.\\n            </p>\\n          </aside>\\n        </section>\\n        <footer class=\\"practice__actions\\">\\n          <button type=\\"button\\" :disabled=\\"position <= 0\\" @click=\\"move(-1)\\">\\n            ← 이전 문제\\n          </button>\\n          <span>{{ position + 1 }} / {{ filtered.length }}</span>\\n          <button\\n            type=\\"button\\"\\n            :disabled=\\"position >= filtered.length - 1\\"\\n            @click=\\"move(1)\\"\\n          >\\n            다음 문제 →\\n          </button>\\n        </footer>\\n      </article>\\n      <section v-else class=\\"practice__empty\\" role=\\"status\\">\\n        <h2>검색 결과가 없습니다.</h2>\\n        <p>검색어·분야·난이도를 바꿔 주세요.</p>\\n        <button\\n          @click=\\"\\n            query = '';\\n            category = '전체';\\n            level = '전체';\\n          \\"\\n        >\\n          전체 문제 보기\\n        </button>\\n      </section>\\n    </div>\\n  </section>\\n</template>\\n<style lang=\\"scss\\" scoped>\\n@use '@/assets/styles/mixins' as *;\\n.practice {\\n  display: grid;\\n  gap: 24px;\\n  min-width: 0;\\n  &__intro {\\n    @include card-surface;\\n    padding: 26px;\\n    h1 {\\n      font-size: 27px;\\n      margin: 8px 0 12px;\\n      small {\\n        font-size: 12px;\\n        font-weight: 400;\\n        color: var(--muted);\\n      }\\n    }\\n    p {\\n      font-size: 13px;\\n      line-height: 1.9;\\n      color: var(--muted);\\n    }\\n  }\\n  &__eyebrow {\\n    color: var(--primary);\\n    font-size: 10px;\\n    letter-spacing: 1px;\\n  }\\n  &__categories {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 8px;\\n    margin: 20px 0 12px;\\n    span {\\n      font-size: 11px;\\n      background: var(--soft);\\n      padding: 7px 10px;\\n      border-radius: 7px;\\n    }\\n    strong {\\n      color: var(--primary);\\n      margin-left: 5px;\\n    }\\n  }\\n  &__total {\\n    font-weight: 600;\\n  }\\n  &__layout {\\n    display: grid;\\n    grid-template-columns: 255px minmax(0, 1fr);\\n    gap: 22px;\\n    align-items: start;\\n  }\\n  &__catalog {\\n    @include card-surface;\\n    position: sticky;\\n    top: 96px;\\n    padding: 16px;\\n    display: grid;\\n    gap: 14px;\\n    label {\\n      display: grid;\\n      gap: 6px;\\n      font-size: 12px;\\n    }\\n    input,\\n    select {\\n      width: 100%;\\n      min-width: 0;\\n    }\\n    nav {\\n      @include custom-scrollbar;\\n      display: grid;\\n      gap: 6px;\\n      max-height: 55vh;\\n      overflow: auto;\\n    }\\n    button {\\n      display: grid;\\n      gap: 6px;\\n      text-align: left;\\n      padding: 12px;\\n      border: 1px solid transparent;\\n      background: none;\\n      small {\\n        color: var(--muted);\\n        font-size: 10px;\\n      }\\n      strong {\\n        font-size: 12px;\\n        line-height: 1.6;\\n      }\\n      &[aria-current='true'] {\\n        background: var(--soft);\\n        border-color: var(--primary);\\n        color: var(--primary);\\n      }\\n    }\\n  }\\n  &__problem,\\n  &__empty {\\n    @include card-surface;\\n    padding: 24px;\\n    display: grid;\\n    gap: 24px;\\n    min-width: 0;\\n    h2 {\\n      font-size: 21px;\\n      margin-top: 8px;\\n    }\\n    h3 {\\n      font-size: 17px;\\n      margin-bottom: 12px;\\n    }\\n    h4 {\\n      font-size: 14px;\\n      margin: 16px 0 8px;\\n    }\\n    p,\\n    li {\\n      font-size: 13px;\\n      line-height: 2;\\n    }\\n    ul,\\n    ol {\\n      padding-left: 22px;\\n    }\\n  }\\n  &__heading span {\\n    font-size: 11px;\\n    color: var(--primary);\\n  }\\n  &__question {\\n    padding: 20px;\\n    background: var(--soft);\\n    border-radius: 10px;\\n  }\\n  &__preview {\\n    border: 1px solid var(--border);\\n    border-radius: 12px;\\n    padding: 18px;\\n    min-width: 0;\\n  }\\n  &__preview-heading {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    gap: 12px;\\n    h3 {\\n      margin: 0;\\n    }\\n    button {\\n      font-size: 12px;\\n    }\\n  }\\n  &__preview-tabs {\\n    display: flex;\\n    flex-wrap: wrap;\\n    gap: 8px;\\n    margin: 16px 0 12px;\\n    button {\\n      font-size: 12px;\\n      &[aria-pressed='true'] {\\n        color: var(--primary);\\n        background: var(--soft);\\n        border-color: var(--primary);\\n      }\\n    }\\n  }\\n  &__frame {\\n    display: block;\\n    width: 100%;\\n    height: 340px;\\n    margin-top: 12px;\\n    border: 1px solid var(--border);\\n    border-radius: 10px;\\n    background: var(--surface);\\n  }\\n  &__live {\\n    margin-top: 12px;\\n    min-width: 0;\\n  }\\n  &__starter {\\n    display: grid;\\n    gap: 12px;\\n    min-width: 0;\\n    h3 {\\n      margin: 0;\\n    }\\n  }\\n  &__code {\\n    border-radius: 10px;\\n    max-height: 320px;\\n  }\\n  &__answer-toggle {\\n    @include focus-ring;\\n    padding: 15px;\\n    background: var(--primary);\\n    color: #fff;\\n    border-radius: 10px;\\n    font-size: 14px;\\n    font-weight: 650;\\n  }\\n  &__solution {\\n    display: grid;\\n    gap: 22px;\\n    min-width: 0;\\n  }\\n  &__steps {\\n    list-style: none;\\n    padding: 0 !important;\\n    display: grid;\\n    gap: 14px;\\n    li {\\n      padding: 18px;\\n      background: var(--canvas);\\n      border: 1px solid var(--border);\\n      border-radius: 10px;\\n    }\\n    strong {\\n      color: var(--primary);\\n      font-size: 12px;\\n      display: block;\\n      margin-bottom: 6px;\\n    }\\n  }\\n  &__note {\\n    padding: 18px;\\n    border: 1px solid var(--border);\\n    border-radius: 10px;\\n    h4 {\\n      margin-top: 0;\\n    }\\n  }\\n  &__glossary {\\n    summary {\\n      cursor: pointer;\\n      font-size: 13px;\\n      font-weight: 600;\\n    }\\n    dl {\\n      margin: 14px 0 0;\\n    }\\n    dt {\\n      color: var(--primary);\\n      font-weight: 600;\\n      font-size: 12px;\\n      margin-top: 12px;\\n    }\\n    dd {\\n      font-size: 13px;\\n      line-height: 1.9;\\n      margin: 4px 0 0;\\n    }\\n  }\\n  &__actions {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    flex-wrap: wrap;\\n    gap: 8px;\\n    button,\\n    span {\\n      font-size: 12px;\\n    }\\n    span {\\n      color: var(--muted);\\n    }\\n  }\\n  &__muted {\\n    color: var(--muted);\\n    font-size: 12px;\\n  }\\n  @include responsive(mobile) {\\n    &__layout {\\n      grid-template-columns: minmax(0, 1fr);\\n    }\\n    &__catalog {\\n      position: static;\\n    }\\n    &__catalog nav {\\n      max-height: 230px;\\n    }\\n    &__problem,\\n    &__intro {\\n      padding: 18px;\\n    }\\n    &__intro h1 small {\\n      display: block;\\n      margin-top: 8px;\\n    }\\n  }\\n}\\n</style>\\n"}`),"1733-9fdacae0-496b9102":{file:"src/views/vue-syntax/binding.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Binding',
  data() {
    const name = 'Vue developer';
    const age = 26;
    const bio = '변경 후 포커스를 이동하세요';
    const active = true;
    const color = '#6366f1';
    const size = 18;
    return {
      name,
      age,
      bio,
      active,
      color,
      size
    };
  },
  computed: {
    valid() {
      return this.name.length > 0 && Number.isFinite(this.age) && this.age >= 0;
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__grid">
      <label class="demo__field">
        v-model.trim · 이름
        <input v-model.trim="name" />
      </label>
      <label class="demo__field">
        v-model.number · 나이
        <input v-model.number="age" type="number" min="0" />
      </label>
      <label class="demo__field">
        v-model.lazy · 소개
        <input v-model.lazy="bio" />
      </label>
    </div>
    <div class="demo__row">
      <label>
        <input v-model="active" type="checkbox" />
        강조 클래스
      </label>
      <label>
        색상
        <input v-model="color" type="color" />
      </label>
      <label>
        크기
        <input v-model.number="size" type="range" min="14" max="30" />
      </label>
    </div>
    <article
      class="binding-preview"
      :class="{ 'binding-preview--active': active }"
      :style="{ color, fontSize: size + 'px' }"
    >
      {{ name }} · {{ age }}세
      <p>{{ bio }}</p>
    </article>
    <p>
      폼 유효성: {{ valid ? '통과' : '이름과 나이를 확인하세요' }} · typeof age:
      {{ typeof age }}
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
.binding-preview {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 10px;
  &--active {
    background: var(--soft);
    border-color: var(--primary);
  }
}
</style>
`},"870-1a4faf13-c4f66f63":{file:"src/views/vue-syntax/communication.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
import ProfileEditor from '@/components/examples/ProfileEditor.vue';
export default {
  name: 'Communication',
  components: {
    ProfileEditor
  },
  data() {
    const name = 'Jise Park';
    const saved = '아직 저장하지 않았습니다.';
    return {
      name,
      saved
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <p class="demo__muted">
      Props는 단방향, Emits는 부모 알림, defineModel은 양방향 바인딩에 사용합니다.
    </p>
    <ProfileEditor
      v-model="name"
      label="사용자 이름"
      @save="(value) => (saved = value + ' 저장 완료')"
    >
      <template #header><h3>Named slot · 내 프로필</h3></template>
      <template #default="{ name: childName, length }">
        <p>Scoped slot: {{ childName }} ({{ length }}자)</p>
      </template>
    </ProfileEditor>
    <output class="demo__output">부모 상태: {{ name }} · {{ saved }}</output>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1321-c65ce11a-e4853392":{file:"src/views/vue-syntax/conditional.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Conditional',
  data() {
    const status = 'active';
    const visible = true;
    return {
      status,
      visible
    };
  }
};
<\/script>
<template>
  <section class="demo">
    <p class="demo__muted">
      v-if는 DOM을 생성·제거합니다. v-show는 DOM을 유지하며 display를 전환합니다. 자주
      토글하는 요소는 v-show를 사용하세요.
    </p>
    <div class="demo__row">
      <label>
        회원 상태
        <select v-model="status">
          <option value="active">활성</option>
          <option value="pending">대기</option>
          <option value="guest">방문자</option>
        </select>
      </label>
      <button @click="visible = !visible">표시 전환</button>
    </div>
    <div class="demo__grid">
      <article class="demo__panel">
        <h3>v-if / v-else-if / v-else</h3>
        <p v-if="status === 'active'">✓ 활성 회원입니다.</p>
        <p v-else-if="status === 'pending'">승인 대기 중입니다.</p>
        <p v-else>로그인이 필요합니다.</p>
        <p v-if="visible" data-testid="if-content">이 요소는 DOM에서 제거됩니다.</p>
      </article>
      <article class="demo__panel">
        <h3>v-show</h3>
        <p v-show="visible" data-testid="show-content">이 요소는 DOM에 남아 있습니다.</p>
        <p class="demo__muted">개발자 도구에서 display: none을 확인해 보세요.</p>
      </article>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1198-48330af3-80215ad":{file:"src/views/vue-syntax/events.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Events',
  data() {
    const logs = [];
    const input = '';
    return {
      logs,
      input
    };
  },
  methods: {
    log(message) {
      this.logs = [message, ...this.logs].slice(0, 6);
    },
    submit() {
      if (this.input.trim()) {
        this.log('제출: ' + this.input);
        this.input = '';
      }
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__row">
      <a href="#prevented" @click.prevent="log('기본 링크 이동을 차단했습니다.')">
        @click.prevent 링크
      </a>
      <article class="demo__panel" @click="log('부모 클릭')">
        <button @click.stop="log('자식 클릭: 버블링 차단')">@click.stop</button>
      </article>
      <button @click="log('파라미터: Vue 3')">파라미터 전달</button>
    </div>
    <label>
      Enter로 기록
      <input v-model="input" @keyup.enter="submit" placeholder="메시지 입력 후 Enter" />
    </label>
    <form @submit.prevent="log('폼 새로고침 차단')">
      <button type="submit">@submit.prevent</button>
    </form>
    <ol class="demo__output">
      <li v-for="(message, i) in logs" :key="i">{{ message }}</li>
      <li v-if="!logs.length">이벤트를 실행해 보세요.</li>
    </ol>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1331-346e8b83-3b4d2375":{file:"src/views/vue-syntax/lists.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Lists',
  data() {
    const query = '';
    const tasks = [
      {
        id: 1,
        name: '컴포넌트 설계',
        done: true
      },
      {
        id: 2,
        name: 'API 연결',
        done: false
      },
      {
        id: 3,
        name: '접근성 검토',
        done: false
      }
    ];
    const profile = {
      name: 'Jise',
      role: 'Frontend',
      framework: 'Vue 3'
    };
    return {
      query,
      tasks,
      profile
    };
  },
  computed: {
    filtered() {
      return this.tasks.filter((t) => t.name.includes(this.query));
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <label>
      할 일 검색
      <input v-model="query" placeholder="API" />
    </label>
    <ul class="demo__list">
      <template v-for="(task, index) in filtered" :key="task.id">
        <li class="demo__item">
          <label>
            <input v-model="task.done" type="checkbox" />
            {{ index + 1 }}. {{ task.name }}
          </label>
          <code>:key="{{ task.id }}"</code>
        </li>
      </template>
    </ul>
    <p v-if="!filtered.length">검색 결과가 없습니다.</p>
    <dl class="demo__output">
      <template v-for="(value, key, index) in profile" :key="key">
        <dt>{{ index + 1 }} · {{ key }}</dt>
        <dd>{{ value }}</dd>
      </template>
    </dl>
    <p class="demo__muted">
      필터링은 computed에서 처리하고 안정적인 고유 ID를 key로 사용합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`},"1573-826fd6cc-85b707da":{file:"src/views/vue-syntax/reactivity.vue",code:`<script>
// Options API: data · computed · methods · watch · lifecycle
export default {
  name: 'Reactivity',
  data() {
    const quantity = 2;
    const product = {
      price: 15000,
      options: {
        shipping: 3000
      }
    };
    const history = [];
    return {
      quantity,
      product,
      history
    };
  },
  computed: {
    total() {
      return this.quantity * this.product.price + this.product.options.shipping;
    },
    summary() {
      return \`현재 주문 금액: \${this.total.toLocaleString()}원\`;
    }
  },
  watch: {
    quantity: {
      handler(value, old) {
        this.history.unshift(\`수량 \${old ?? '초기'} → \${value}\`);
      },
      immediate: true
    },
    product: {
      handler() {
        this.history.unshift('상품 설정 변경 감지 (deep)');
      },
      deep: true
    }
  }
};
<\/script>
<template>
  <section class="demo">
    <div class="demo__grid">
      <label class="demo__field">
        수량 (ref)
        <input v-model.number="quantity" type="number" min="1" />
      </label>
      <label class="demo__field">
        가격 (reactive)
        <input v-model.number="product.price" type="number" min="0" />
      </label>
      <label class="demo__field">
        중첩 속성: 배송비
        <input v-model.number="product.options.shipping" type="number" min="0" />
      </label>
    </div>
    <output class="demo__output">{{ summary }}</output>
    <p class="demo__muted">
      computed는 의존성이 바뀔 때만 재계산합니다. watch는 특정 상태의 이전/새 값을 관찰하고,
      watchEffect는 읽은 의존성을 자동 추적합니다.
    </p>
    <ul>
      <li v-for="(entry, i) in history.slice(0, 5)" :key="i">{{ entry }}</li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.demo {
  @include custom-scrollbar;
}
</style>
`}};export{n as default};
