import { Loader2 } from "lucide-react";

export const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center gap-3 bg-white backdrop-blur-sm z-50">
    <p>Loading... </p><Loader2 className="animate-spin w-10 h-10 text-primary" />
  </div>
);