<template>
  <div
    v-if="editor"
    class="flex flex-wrap items-center gap-1 border-b border-gray-200 p-2"
  >
    <button
      @click="editor.chain().focus().setParagraph().run()"
      :class="[
        'rounded px-2 py-1 transition-colors hover:bg-gray-300',
        { 'bg-gray-200': editor.isActive('paragraph') },
      ]"
      title="Paragraph"
    >
      P
    </button>

    <div class="mr-1 flex border-r border-gray-200 pr-1">
      <button
        v-for="level in headingLevels"
        :key="`heading-${level}`"
        @click="editor.chain().focus().toggleHeading({ level }).run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('heading', { level }) },
        ]"
        :title="`Heading ${level}`"
      >
        H{{ level }}
      </button>
    </div>

    <!-- Text formatting -->
    <div class="mr-1 flex border-r border-gray-200 pr-1">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('bold') },
        ]"
        title="Bold"
      >
        <span class="font-bold">B</span>
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('italic') },
        ]"
        title="Italic"
      >
        <span class="italic">I</span>
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('strike') },
        ]"
        title="Strike"
      >
        <span class="line-through">S</span>
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('code') },
        ]"
        title="Code"
      >
        <span class="font-mono">{}</span>
      </button>
    </div>

    <!-- Lists -->
    <div class="mr-1 flex border-r border-gray-200 pr-1">
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('bulletList') },
        ]"
        title="Bullet List"
      >
        <List :stroke-width="1" :size="24" />
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('orderedList') },
        ]"
        title="Ordered List"
      >
        <ListOrdered :stroke-width="1" :size="24" />
      </button>
    </div>

    <!-- Alignment -->
    <div class="mr-1 flex border-r border-gray-200 pr-1">
      <button
        @click="editor.chain().focus().setTextAlign('left').run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive({ textAlign: 'left' }) },
        ]"
        title="Align Left"
      >
        <AlignLeft :stroke-width="1" :size="18" />
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive({ textAlign: 'center' }) },
        ]"
        title="Align Center"
      >
        <AlignCenter :stroke-width="1" :size="18" />
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive({ textAlign: 'right' }) },
        ]"
        title="Align Right"
      >
        <AlignRight :stroke-width="1" :size="18" />
      </button>
    </div>

    <!-- Block elements -->
    <div class="mr-1 flex border-r border-gray-200 pr-1">
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('blockquote') },
        ]"
        title="Blockquote"
      >
        <Quote :size="18" :stroke-width="1" />
      </button>
      <button
        @click="editor.chain().focus().setHorizontalRule().run()"
        class="rounded px-2 py-1 transition-colors hover:bg-gray-300"
        title="Horizontal Rule"
      >
        —
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('codeBlock') },
        ]"
        title="Code Block"
      >
        <span class="font-mono">&lt;&gt;</span>
      </button>
    </div>

    <!-- Links -->
    <div class="flex">
      <button
        @click="setLink"
        :class="[
          'rounded px-2 py-1 transition-colors hover:bg-gray-300',
          { 'bg-gray-200': editor.isActive('link') },
        ]"
        title="Link"
      >
        🔗
      </button>
      <button
        @click="editor.chain().focus().undo().run()"
        class="rounded px-2 py-1 transition-colors hover:bg-gray-300"
        title="Undo"
        :disabled="!editor.can().undo()"
      >
        ↩
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        class="rounded px-2 py-1 transition-colors hover:bg-gray-300"
        title="Redo"
        :disabled="!editor.can().redo()"
      >
        ↪
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Editor } from "@tiptap/vue-3";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Quote,
  List,
  ListOrdered,
} from "lucide-vue-next";

// Props
const props = defineProps<{
  editor: Editor;
}>();

const headingLevels: Array<1 | 2 | 3 | 4 | 5 | 6> = [1, 2, 3, 4];

// Methods
const setLink = () => {
  const previousUrl = props.editor.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);
  if (url === null) {
    return;
  }
  if (url === "") {
    props.editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  props.editor
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
};
</script>
