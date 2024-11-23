<template>
  <div>
    <h3 class="text-sm font-medium text-gray-700 mb-2">Brands</h3>

    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[200px] justify-between"
        >
          {{ value || "Select Brand" }}

          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command v-model="value">
          <CommandInput placeholder="Search brand..." />
          <CommandEmpty>No brand found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <template
                v-for="collection in fetchedCollections"
                :key="`brand-${collection.handle}`"
              >
                <CommandItem
                  v-if="collection.isBrandCollection"
                  :value="collection.handle"
                  @select.prevent="
                    (ev) => {
                      if (typeof ev.detail.value === 'string') {
                        updateValue(ev.detail.value);
                      }
                      open = false;
                    }
                  "
                >
                  <Check
                    :class="
                      cn(
                        'mr-2 h-4 w-4',
                        value === collection.handle
                          ? 'opacity-100'
                          : 'opacity-0'
                      )
                    "
                  />
                  {{ collection.title }}
                </CommandItem>
              </template>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-vue-next";

const { fetchedCollections } = defineProps<{
  fetchedCollections: any[];
}>();

const modelValue = defineModel<string[]>("modelValue", {
  required: true,
  default: () => [],
});

const brandCollectionHandles = fetchedCollections
  .filter((collection) => collection.isBrandCollection)
  .map((collection) => collection.handle);

const open = ref(false);
const value = ref(
  modelValue.value.find((handle) => brandCollectionHandles.includes(handle)) ||
    ""
);

const updateValue = (newValue: string) => {
  const index = modelValue.value.indexOf(value.value);

  if (value.value === newValue && index != -1) {
    value.value = "";
    modelValue.value.splice(index, 1);
    return;
  }

  if (index !== -1) modelValue.value.splice(index, 1);
  value.value = newValue;
  modelValue.value.push(newValue);
};
</script>
