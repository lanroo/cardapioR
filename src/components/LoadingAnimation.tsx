import { Zap } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="animate-shake">
        <Zap className="h-12 w-12 text-red-600" />
      </div>
    </div>
  );
}
