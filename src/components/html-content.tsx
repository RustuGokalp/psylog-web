import DOMPurify from "isomorphic-dompurify";
import { cn } from "@/lib/utils";

interface HtmlContentProps {
  html: string;
  className?: string;
}

const richTextStyles = [
  "[&_h1]:mb-2 [&_h1]:mt-6 [&_h1]:text-2xl [&_h1]:font-bold",
  "[&_h2]:mb-2 [&_h2]:mt-5 [&_h2]:text-xl [&_h2]:font-semibold",
  "[&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold",
  "[&_p]:my-2 [&_p]:leading-relaxed",
  "[&_strong]:font-semibold",
  "[&_em]:italic",
  "[&_u]:underline",
  "[&_s]:line-through",
  "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5",
  "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  "[&_li]:my-0.5",
  "[&_blockquote]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:border-violet-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500",
  "[&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm",
  "[&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_hr]:my-4 [&_hr]:border-gray-200",
  "[&_a]:text-violet-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-violet-800",
  "[&_img]:my-3 [&_img]:max-w-full [&_img]:rounded-lg",
].join(" ");

export default function HtmlContent({ html, className }: HtmlContentProps) {
  return (
    <div
      className={cn(richTextStyles, className)}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}
