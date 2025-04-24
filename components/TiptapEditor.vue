<template>
  <div class="min-w-full border-2 p-4">
    <TiptapButtons :editor="editor" :disabled="disabled" />
    <editor-content
      class="prose min-w-full prose-h1:mt-4 prose-h2:mt-3 prose-h3:mt-2 prose-h4:mt-2 prose-a:text-sky-600 [&>div]:h-[500px] [&>div]:overflow-auto"
      :editor="editor"
    />
  </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";

defineProps<{
  disabled?: boolean;
}>();

const editor = ref<any>(null);

const model = defineModel();

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start typing here...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
      }),
      Image,
      Youtube.configure({
        nocookie: true,
      }),
    ],
    onUpdate: () => {
      model.value = editor.value.getHTML();
    },
    content: model.value || "",
  });
});

onBeforeUnmount(() => {
  editor.value.destroy();
});
</script>

<style>
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.ProseMirror-focused {
  border: none;
  outline: none;
}
</style>
