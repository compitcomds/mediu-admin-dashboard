<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full uppercase justify-between"
      >
        {{ tags.length > 0 ? tags.join(", ") : "Select tag..." }}

        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" class="lg:w-[500px] max-w-[82vw] p-0">
      <Command
        v-model="tags"
        v-on:update:model-value="emitUpdatedTags"
        multiple
      >
        <CommandInput placeholder="Search tag..." />
        <CommandEmpty>No tag found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="tag in allProductTags"
              :key="tag.value"
              :value="tag.value"
              @select="open = false"
            >
              <Check
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    tags.includes(tag.value) ? 'opacity-100' : 'opacity-0'
                  )
                "
              />
              {{ tag.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup>
import axios from "axios";
import { X, Check, ChevronsUpDown } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const allProductTags = ref([]);
const open = ref(false);
const emit = defineEmits(["update:modelValue"]);

const tags = ref(props.modelValue.map((value) => value.toLowerCase()));
const inputValue = ref("");

watch(
  () => props.modelValue,
  (newVal) => {
    tags.value = [...newVal];
  }
);

const emitUpdatedTags = () => {
  emit("update:modelValue", tags.value);
};

const addTag = () => {
  const trimmedValue = inputValue.value.trim();
  if (trimmedValue && !tags.value.includes(trimmedValue)) {
    tags.value.push(trimmedValue);
    emit("update:modelValue", tags.value);
    inputValue.value = "";
  }
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
  emit("update:modelValue", tags.value);
};

const removeLastTag = (event) => {
  if (event.key === "Backspace" && inputValue.value === "") {
    tags.value.pop();
    emit("update:modelValue", tags.value);
  }
};

onMounted(async () => {
  const { data } = await axios.get("/api/product/tags");
  allProductTags.value = data.edges.map((edge) => ({
    value: edge.node.toLowerCase(),
    label: edge.node.toUpperCase(),
  }));
});
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>
