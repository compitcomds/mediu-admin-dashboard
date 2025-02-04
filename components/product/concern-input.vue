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
          concernedTags.length > 0
            ? concernedTags.join(", ").slice(0, 43)
            : "Select concerns"
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
        <CommandInput placeholder="Search concerns..." />
        <CommandList>
          <CommandGroup>
            <h3 class="mt-2 px-2 font-bold">Skin Concerns</h3>

            <CommandItem
              v-for="tag in allProductConcerns.skin"
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

            <h3 class="mt-2 px-2 font-bold">Hair Concerns</h3>
            <CommandItem
              v-for="tag in allProductConcerns.hair"
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

const allProductConcerns = {
  skin: [
    { label: "Acne & Acne Scar", value: "acne-and-ance-scar" },
    { label: "Aging", value: "aging" },
    { label: "Dehydration", value: "dehydration" },
    { label: "Damaged & Sensitive Skin", value: "damaged-and-sensitive-skin" },
    { label: "Under Eye Darkness", value: "under-eye-darkness" },
    { label: "Under Arm Darkness", value: "under-arm-darkness" },
    { label: "Stretch Marks", value: "stretch-marks" },
    { label: "Pigmentation", value: "pigmentation" },
    { label: "Oiliness", value: "oiliness" },
    { label: "Lip (Cracked/Darkness)", value: "lip-cracked-or-darkness" },
  ],
  hair: [
    { label: "Dandruff", value: "dandruff" },
    { label: "Hairfall", value: "hairfall" },
    { label: "Hair Thinning", value: "hair-thinning" },
    { label: "Damaged & Fizzy Hair", value: "damaged-and-fizzy-hair" },
    { label: "Bald Patches", value: "bald-patches" },
    { label: "Dull Hair", value: "dull-hair" },
    { label: "Oily Scalp", value: "oily-scalp" },
  ],
};

const allProductConcernsFlatList = [
  ...allProductConcerns.skin.map((s) => s.value),
  allProductConcerns.hair.map((h) => h.value),
];

const open = ref(false);
const emit = defineEmits(["update:modelValue"]);

const tags = ref(props.modelValue.map((value) => value.toLowerCase().trim()));
const concernedTags = computed(() =>
  tags.value.filter((tag) =>
    allProductConcernsFlatList.includes(tag.toLowerCase()),
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

<style scoped>
/* Add any custom styles here if necessary */
</style>
