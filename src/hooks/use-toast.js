import { toast as sonnerToast } from "@/components/ui/sonner";

// Compatibility wrapper for the former shadcn/ui use-toast API.
// This project is JavaScript-only and we avoid React hook state here to prevent
// invalid-hook-call issues caused by duplicated React instances in the bundler.

function toast({ title, description, variant, ..._rest } = {}) {
  const message = title ?? "";
  const options = description ? { description } : undefined;

  if (variant === "destructive") {
    return { id: sonnerToast.error(message, options) };
  }

  if (variant === "success") {
    return { id: sonnerToast.success(message, options) };
  }

  return { id: sonnerToast(message, options) };
}

function useToast() {
  // Keep the same shape as shadcn's hook, but without internal React state.
  return {
    toasts: [],
    toast,
    dismiss: (toastId) => sonnerToast.dismiss(toastId),
  };
}

export { useToast, toast };
