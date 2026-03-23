import DOMPurify from "isomorphic-dompurify";

interface HtmlContentProps {
  html: string;
  className?: string;
}

export default function HtmlContent({ html, className }: HtmlContentProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}
