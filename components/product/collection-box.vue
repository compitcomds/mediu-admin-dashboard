<template>
  <div>
    <h3 class="text-sm font-medium text-gray-700 mb-2">
      Collections <span class="text-red-500">*</span>
    </h3>
    <TagsInput class="px-0 gap-0 w-full" :model-value="modelValue">
      <div class="flex gap-2 flex-wrap items-center px-3">
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
          <ComboboxInput placeholder="Collection..." as-child>
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
              class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
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

const { fetchedCollections } = defineProps<{
  fetchedCollections: any[];
}>();

const modelValue = defineModel<string[]>("modelValue", {
  required: true,
  default: () => [],
});

const open = ref(false);
const searchTerm = ref("");

const filteredCollections = computed(() =>
  fetchedCollections.filter(
    (i) => !modelValue.value.includes(i.handle) && !i.isBrandCollection
  )
);

const brandCollectionHandles = fetchedCollections
  .filter((collection) => collection.isBrandCollection)
  .map((collection) => collection.handle);
</script>
