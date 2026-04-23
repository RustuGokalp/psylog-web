"use client";

import { useEffect, useRef } from "react";
import createDOMPurify from "dompurify";

interface Props {
  content: string;
}

export default function PostContent({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const DOMPurify = createDOMPurify(window);
      ref.current.innerHTML = DOMPurify.sanitize(content);
    }
  }, [content]);

  return <div ref={ref} className="post-content" />;
}
