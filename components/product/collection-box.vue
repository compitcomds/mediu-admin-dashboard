<template>
  <div>
    <h3 class="mb-2 text-sm font-medium text-gray-700">
      Collections <span class="text-red-500">*</span>
    </h3>
    <TagsInput
      class="w-full gap-0 px-0"
      :model-value="modelValue"
      :disabled="!!disabledForm"
    >
      <div class="flex flex-wrap items-center gap-2 px-3">
        <template v-for="item in modelValue" :key="item">
          <TagsInputItem
            v-if="!brandCollectionHandles.includes(item)"
            :value="item"
          >
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
        </template>
      </div>

      <ComboboxRoot
        v-model="modelValue"
        v-model:open="open"
        v-model:search-term="searchTerm"
        class="w-full"
      >
        <ComboboxAnchor as-child>
          <ComboboxInput
            placeholder="Collection..."
            :disabled="!!disabledForm"
            class="disabled:cursor-not-allowed"
            as-child
          >
            <TagsInputInput
              class="w-full px-3"
              :class="modelValue.length > 0 ? 'mt-2' : ''"
              @keydown.enter.prevent
              :onfocus="() => (open = true)"
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
                  v-for="(framework, index) in filteredCollections"
                  :key="framework.id"
                  :value="framework.handle"
                  @select.prevent="
                    (ev) => {
                      if (typeof ev.detail.value === 'string') {
                        searchTerm = '';
                        modelValue.push(ev.detail.value);
                      }

                      if (filteredCollections.length === 0) {
                        open = false;
                      }
                    }
                  "
                >
                  {{ framework.title }}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </ComboboxContent>
        </ComboboxPortal>
      </ComboboxRoot>
    </TagsInput>
  </div>
</template>

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

const { fetchedCollections, disabledForm } = defineProps<{
  fetchedCollections: any[];
  disabledForm?: boolean;
}>();

const modelValue = defineModel<string[]>("modelValue", {
  required: true,
  default: () => [],
});

const open = ref(false);
const searchTerm = ref("");

const filteredCollections = computed(() =>
  fetchedCollections.filter(
    (i) => !modelValue.value.includes(i.handle) && !i.isBrandCollection,
  ),
);

const brandCollectionHandles = fetchedCollections
  .filter((collection) => collection.isBrandCollection)
  .map((collection) => collection.handle);
</script>
