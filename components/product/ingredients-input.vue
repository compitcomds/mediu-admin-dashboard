<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between uppercase"
        :disabled="!!disabledForm"
      >
        {{
          ingredientTags.length > 0
            ? ingredientTags.join(", ").slice(0, 43)
            : "Select ingredients"
        }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" class="max-w-[82vw] p-0 lg:w-[500px]">
      <Command
        v-model="tags"
        v-on:update:model-value="emitUpdatedTags"
        multiple
      >
        <CommandInput placeholder="Search ingredients..." />
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="tag in allIngredients"
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
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup>
import { Check, ChevronsUpDown } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";
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
  disabledForm: {
    type: Boolean,
    default: false,
  },
});

const allIngredients = [
  { label: "Minoxidil", value: "minoxidil" },
  { label: "Redensyl", value: "redensyl" },
  { label: "Capixyl", value: "capixyl" },
  { label: "Peptide", value: "peptide" },
  { label: "Carnitine", value: "carnitine" },
  { label: "Vitamin C", value: "vitaminc" },
  { label: "BHA / Salicylic Acid", value: "bha-salicylic-acid" },
  { label: "Retinoid / Retinol", value: "retinol" },
  { label: "UV Filters", value: "uv-filters" },
  { label: "Ceramide", value: "ceramide" },
  { label: "Hyaluronic Acid", value: "hyaluronic-acid" },
];

const allProductIngredientsFlatList = [
  ...allIngredients.map((ing) => ing.value),
];

const open = ref(false);
const emit = defineEmits(["update:modelValue"]);

const tags = ref(props.modelValue.map((value) => value.toLowerCase().trim()));
const ingredientTags = computed(() =>
  tags.value.filter((tag) =>
    allProductIngredientsFlatList.includes(tag.toLowerCase()),
  ),
);

watch(
  () => props.modelValue,
  (newVal) => {
    tags.value = [...newVal];
  },
);

const emitUpdatedTags = () => {
  emit("update:modelValue", tags.value);
};
</script>

<style scoped></style>
