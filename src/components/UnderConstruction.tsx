import React from "react";
import Link from "next/link";
import { Construction } from "lucide-react";

interface UnderConstructionProps {
  pageName: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ pageName }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-on-surface px-4">
      <Construction
        size={48}
        color="#C2185B"
        style={{ marginBottom: "20px" }}
      />
      <h1 className="text-2xl font-bold mb-4">{pageName} is coming soon</h1>
      <p className="text-center mb-6">
        Page under development.. Come back later!
      </p>
      <Link href="/" className="text-primary hover:underline">
        Go Back Home
      </Link>
    </div>
  );
};

export default UnderConstruction;