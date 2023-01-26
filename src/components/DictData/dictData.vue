<template>
  <div class="my-dict">
    <slot v-bind:dict="dict">
      <a-select
        ref="select"
        :size="size"
        :value="value"
        :style="width"
        :options="options"
        :disabled="disabled"
        show-search
        :filter-option="filterOption"
        @select="handleChange"
        @focus="focus"
      >
        <a-select-option
          v-for="(item, index) in dict.items"
          :key="index"
          :value="item.dictValue"
        >
          {{ item.dictLabel }}
        </a-select-option>
      </a-select>
    </slot>
  </div>
</template>

<script lang='ts' setup>
import {
  defineComponent,
  defineEmits,
  defineProps,
  computed,
  reactive,
  watch,
  onMounted,
  onBeforeMount,
  nextTick,
  ref,
} from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  dictkey: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "100",
  },
  value: {
    type: [Number, String, Array],
    default: undefined,
  },
  options: {
    type: Array,
    default: null,
  },
  size: {
    type: String,
    default: "default",
  },
  mode: {
    type: String,
    default: "form",
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});
const dickKey = computed(() => {
  return props.dictkey;
});

const width = computed(() => {
  return `width: ${props.width}%`;
});

const disabled = computed(() => {
  return props.disabled;
});

const value = computed(() => {
  return props.value;
});

const size = computed(() => {
  return props.size || "default";
});
const dict = computed(() => {
  return store.getters.dictMap[dickKey.value] || {}
});

const emit = defineEmits(["handleChange"]);
const handleChange = (value: string,options:object) => {
  emit("handleChange", dict.value.items[options.key]);
};

const focus = () => {
  // dict.value = store.getters.dictMap[dickKey.value] || {};
};
watch(dickKey, (newValue, oldValue) => {
  store.dispatch("getByDictkey", {
    dictKey: newValue,
  });
});

// watch(value, (newValue, oldValue) => {
//   console.log("值发生了改变：", newValue, oldValue);
// });
onMounted(() => {
  store.dispatch("getByDictkey", {
    dictKey: dickKey.value,
  });
});
const filterOption = (input: string, option: any) => {
  return dict.value.items[option.key].dictLabel.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>

<style scoped>
</style>