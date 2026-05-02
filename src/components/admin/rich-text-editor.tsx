"use client";

import { useEffect, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapImage from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Minus,
  Undo2,
  Redo2,
  ImageIcon,
} from "lucide-react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  hasError?: boolean;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  onBlur,
  placeholder,
  hasError,
  minHeight = "200px",
}: RichTextEditorProps) {
  const lastEmitted = useRef(value);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder ?? "" }),
      TiptapImage.configure({ inline: false }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      const html = editor.isEmpty ? "" : editor.getHTML();
      lastEmitted.current = html;
      onChange(html);
    },
    onBlur() {
      onBlur?.();
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value === lastEmitted.current) return;
    // emitUpdate exists in v3 runtime but is missing from TS types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editor.commands.setContent(value || "", { emitUpdate: false } as any);
    lastEmitted.current = value;
  }, [value, editor]);

  const handleImageFile = useCallback(
    async (file: File) => {
      if (!editor || !file.type.startsWith("image/")) return;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData },
        );
        if (!res.ok) return;
        const data = await res.json();
        const src = (data.secure_url as string).replace(
          "/upload/",
          "/upload/f_auto/",
        );
        editor.chain().focus().setImage({ src }).run();
      } catch {
        // silent — editor stays unchanged
      }
    },
    [editor],
  );

  function handleSetLink() {
    const prev = editor?.getAttributes("link").href ?? "";
    const url = window.prompt("Bağlantı URL'si:", prev);
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }

  return (
    <div
      className={cn(
        "rounded-md border bg-background",
        hasError ? "border-destructive" : "border-input",
      )}
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5">
        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() => editor?.chain().focus().undo().run()}
          active={false}
          aria-label="Geri al"
        >
          <Undo2 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().redo().run()}
          active={false}
          aria-label="Yinele"
        >
          <Redo2 className="h-3.5 w-3.5" />
        </ToolbarButton>

        <Divider />

        {/* Inline formatting */}
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          active={editor?.isActive("bold")}
          aria-label="Kalın"
        >
          <Bold className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          active={editor?.isActive("italic")}
          aria-label="İtalik"
        >
          <Italic className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          active={editor?.isActive("underline")}
          aria-label="Altı çizili"
        >
          <UnderlineIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          active={editor?.isActive("strike")}
          aria-label="Üstü çizili"
        >
          <Strikethrough className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleCode().run()}
          active={editor?.isActive("code")}
          aria-label="Satır içi kod"
        >
          <Code className="h-3.5 w-3.5" />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor?.isActive("heading", { level: 1 })}
          aria-label="Başlık 1"
        >
          <Heading1 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor?.isActive("heading", { level: 2 })}
          aria-label="Başlık 2"
        >
          <Heading2 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor?.isActive("heading", { level: 3 })}
          aria-label="Başlık 3"
        >
          <Heading3 className="h-3.5 w-3.5" />
        </ToolbarButton>

        <Divider />

        {/* Lists & blocks */}
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          active={editor?.isActive("bulletList")}
          aria-label="Madde listesi"
        >
          <List className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          active={editor?.isActive("orderedList")}
          aria-label="Numaralı liste"
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          active={editor?.isActive("blockquote")}
          aria-label="Alıntı"
        >
          <Quote className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          active={editor?.isActive("codeBlock")}
          aria-label="Kod bloğu"
        >
          <span className="text-[10px] font-mono font-bold leading-none">
            {"</>"}
          </span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          active={false}
          aria-label="Yatay çizgi"
        >
          <Minus className="h-3.5 w-3.5" />
        </ToolbarButton>

        <Divider />

        {/* Link */}
        <ToolbarButton
          onClick={handleSetLink}
          active={editor?.isActive("link")}
          aria-label="Bağlantı"
        >
          <LinkIcon className="h-3.5 w-3.5" />
        </ToolbarButton>

        {/* Image */}
        <ToolbarButton
          onClick={() => imageInputRef.current?.click()}
          active={false}
          aria-label="Resim ekle"
        >
          <ImageIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageFile(file);
            e.target.value = "";
          }}
        />
      </div>

      <EditorContent
        editor={editor}
        style={{ minHeight }}
        className={cn(
          "px-3 py-2 text-sm",
          "[&_.ProseMirror]:min-h-[inherit] [&_.ProseMirror]:outline-none",
          "[&_.ProseMirror_h1]:mb-1 [&_.ProseMirror_h1]:mt-4 [&_.ProseMirror_h1]:text-lg [&_.ProseMirror_h1]:font-bold",
          "[&_.ProseMirror_h2]:mb-1 [&_.ProseMirror_h2]:mt-3 [&_.ProseMirror_h2]:text-base [&_.ProseMirror_h2]:font-semibold",
          "[&_.ProseMirror_h3]:mb-1 [&_.ProseMirror_h3]:mt-2 [&_.ProseMirror_h3]:text-sm [&_.ProseMirror_h3]:font-semibold",
          "[&_.ProseMirror_p]:my-1",
          "[&_.ProseMirror_ul]:my-1 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5",
          "[&_.ProseMirror_ol]:my-1 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5",
          "[&_.ProseMirror_blockquote]:my-1 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:pl-3 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-muted-foreground",
          "[&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:text-xs",
          "[&_.ProseMirror_pre]:my-2 [&_.ProseMirror_pre]:rounded-md [&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:font-mono [&_.ProseMirror_pre]:text-xs",
          "[&_.ProseMirror_pre_code]:bg-transparent [&_.ProseMirror_pre_code]:p-0",
          "[&_.ProseMirror_hr]:my-3 [&_.ProseMirror_hr]:border-border",
          "[&_.ProseMirror_a]:text-violet-600 [&_.ProseMirror_a]:underline",
          "[&_.ProseMirror_strong]:font-semibold",
          "[&_.ProseMirror_em]:italic",
          "[&_.ProseMirror_s]:line-through",
          "[&_.ProseMirror_img]:my-2 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-md",
          "[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
        )}
      />
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  children,
  "aria-label": ariaLabel,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  "aria-label": string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn("h-7 w-7 p-0", active && "bg-muted text-foreground")}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
}

function Divider() {
  return <div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />;
}
