<script setup lang="ts">
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/components/ui/tags-input";
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from "radix-vue";

const tags = [
  { value: "skin", label: "Skin" },
  { value: "body", label: "Body" },
  { value: "hair", label: "Hair" },
];

const props = defineProps<{
  disabledForm?: boolean;
}>();

const modelValue = defineModel({
  default: [],
  type: Array as PropType<string[]>,
});

const open = ref(false);
const searchTerm = ref("");

const filteredTags = computed(() =>
  tags.filter((t) => !modelValue.value?.includes(t.value)),
);
</script>

<template>
  <TagsInput
    :disabled="!!props.disabledForm"
    class="w-80 gap-0 px-0"
    :model-value="modelValue"
  >
    <div class="flex flex-wrap items-center gap-2 px-3">
      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete v-if="!props.disabledForm" />
      </TagsInputItem>
    </div>

    <ComboboxRoot
      v-model="modelValue"
      v-model:open="open"
      v-model:search-term="searchTerm"
      class="w-full"
    >
      <ComboboxAnchor as-child>
        <ComboboxInput placeholder="Tags..." as-child>
          <TagsInputInput
            class="w-full px-3 disabled:cursor-not-allowed"
            :class="modelValue?.length > 0 ? 'mt-2' : ''"
            @keydown.enter.prevent
            :onfocus="() => (open = true)"
            :disabled="!!props.disabledForm"
          />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <ComboboxContent>
          <CommandList
            position="popper"
            class="mt-2 w-[--radix-popper-anchor-width] rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            <CommandEmpty />
            <CommandGroup>
              <CommandItem
                v-for="tag in filteredTags"
                :key="tag.value"
                :value="tag.value"
                @select.prevent="
                  (ev) => {
                    if (typeof ev.detail.value === 'string') {
                      searchTerm = '';
                      modelValue.push(ev.detail.value);
                    }

                    if (filteredTags.length === 0) {
                      open = false;
                    }
                  }
                "
              >
                {{ tag.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>
