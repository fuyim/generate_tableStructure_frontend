<template>
  <div class="my-dict">
    <slot v-bind:dict="dict">
      <a-select
        ref="select"
        :size="size"
        :value="value"
        :style="width"
        @change="handleChange"
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
  computed,
  reactive,
  watch,
  onMounted,
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
    type: [String, Number],
    default: "vue",
  },
  size: {
    type: String,
    default: "default",
  },
  mode: {
    type: String,
    default: "form",
  },
});
const dickKey = computed(() => {
  return props.dictkey;
});

const width = computed(() => {
    return `width: ${props.width}px`
})

const dict = ref("");

const value = computed(() => {
  return props.value;
});

const size = computed(() => {
  return props.size || "default";
});

const handleChange = (value: string) => {
  console.log("value:", value);
};

const focus = () => {
  dict.value = store.getters.dictMap[dickKey.value] || {};
};
watch(dickKey, (newValue, oldValue) => {
  store.dispatch("getByDictkey", {
    dictKey: newValue,
  });
});

onMounted(() => {
  store.dispatch("getByDictkey", {
    dictKey: dickKey.value,
  });
});
</script>

<style scoped>
</style>