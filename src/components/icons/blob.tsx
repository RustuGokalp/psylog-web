interface BlobProps {
  className?: string;
}

export default function Blob({ className }: BlobProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45,-60C57,-50,64,-33,68,-16C72,1,73,18,66,32C59,46,44,57,28,63C12,69,-5,70,-22,65C-39,60,-56,49,-65,34C-74,19,-75,0,-69,-17C-63,-34,-50,-49,-35,-58C-20,-67,-3,-70,14,-65C31,-60,33,-70,45,-60Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
