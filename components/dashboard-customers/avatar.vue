<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserAvatar } from "~/appwrite/login-admin";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const { avatar, name, email } = await getUserAvatar();
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger class="flex items-center justify-center"
        ><Avatar>
          <AvatarImage :src="avatar" alt="avatar" />
          <AvatarFallback>{{ name }}</AvatarFallback>
        </Avatar></TooltipTrigger
      >
      <TooltipContent>
        <p>Hey! {{ email }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
