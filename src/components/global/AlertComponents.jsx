import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// src/apps/genres/components/AlertGenre.jsx
export const AlertComponents = ({
  title,
  icon,
  desc,
  openAlert,
  setOpenAlert,
  onConfirm,
  onCancel,
  actionLabel = "Lanjut",
  cancelLabel = "Batal",
  variant = "confirm",
  isLoading = false,
}) => {
  const actionClassName =
    variant === "destructive" || variant === "error"
      ? "bg-destructive text-white hover:bg-destructive/50"
      : undefined;

  return (
    <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className={!icon ? "hidden" : "flex justify-center mt-5 mb-3"}>{icon}</div>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* Cancel opsional: tampilkan hanya jika ada label cancel */}
          {cancelLabel && (
            <AlertDialogCancel
              disabled={isLoading}
              onClick={onCancel ?? (() => setOpenAlert(false))}
            >
              {cancelLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            className={actionClassName}
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? "Memproses..." : actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
