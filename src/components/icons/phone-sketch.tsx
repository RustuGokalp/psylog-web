import { Phone } from "lucide-react";

interface PhoneSketchProps {
  className?: string;
}

export default function PhoneSketch({ className }: PhoneSketchProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full p-3 ${className ?? ""}`}
    >
      <Phone
        className="h-8 w-8 text-green-700"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </div>
  );
}
