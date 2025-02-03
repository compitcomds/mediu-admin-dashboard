<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="relative w-full max-w-full justify-between overflow-x-clip text-ellipsis"
      >
        {{
          roles.length > 0 ? roles.join(", ").slice(0, 44) : "Select role..."
        }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent align="start" class="max-w-[82vw] p-0 lg:w-[500px]">
      <Command v-model="roles" multiple v-model:search-term="searchTerm">
        <CommandInput placeholder="Search role..." />
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="role in availableRoles"
              :key="role.$id"
              :value="role.$id"
              @select="open = false"
            >
              <Check
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    roles.includes(role.$id) ? 'opacity-100' : 'opacity-0',
                  )
                "
              />

              {{ role.role }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
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
import getRoles from "~/appwrite/customer/role/get-roles";
import { ref } from "vue";
import { cn } from "~/lib/utils";

const availableRoles = ref<any[]>([]);

const roles = defineModel<string[]>({ default: [] });

const open = ref(false);
const searchTerm = ref("");

onMounted(async () => {
  const { documents } = await getRoles();
  availableRoles.value = documents;
});
</script>
