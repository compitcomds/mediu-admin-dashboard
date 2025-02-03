<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="relative w-full max-w-full justify-between overflow-x-clip text-ellipsis uppercase"
      >
        {{ tags.length > 0 ? tags.join(", ").slice(0, 44) : "Select tag..." }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" class="max-w-[82vw] p-0 lg:w-[500px]">
      <Command
        v-model="tags"
        v-on:update:model-value="emitUpdatedTags"
        multiple
        v-model:search-term="searchTerm"
      >
        <CommandInput placeholder="Search tag..." @keyup.enter="createNewTag" />
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
                    tags.includes(tag.value) ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
              {{ tag.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <Button
          v-if="!!searchTerm"
          @click="createNewTag"
          class="mx-auto my-2 w-[95%] bg-gray-100 text-black shadow-none hover:bg-gray-300"
          >Create New Tag: {{ searchTerm }}</Button
        >
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup>
import axios from "axios";
import Button from "~/components/ui/button/Button.vue";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import {
  Command,
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
const searchTerm = ref("");

watch(
  () => props.modelValue,
  (newVal) => {
    tags.value = [...newVal];
  },
);

const emitUpdatedTags = () => {
  emit("update:modelValue", tags.value);
};

const createNewTag = () => {
  if (searchTerm.value.length === 0) return;
  if (
    allProductTags.value.find(
      (tag) => tag.value === searchTerm.value.toLowerCase(),
    )
  ) {
    alert("Tag already exists.");
    return;
  }
  allProductTags.value.push({
    label: searchTerm.value.toUpperCase(),
    value: searchTerm.value.toLowerCase(),
  });
  tags.value.push(searchTerm.value.toLowerCase());
  emitUpdatedTags();
  searchTerm.value = "";
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
