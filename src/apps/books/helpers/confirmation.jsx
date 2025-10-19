export const Confirmation = ({setAlertConfig, setOpenAlert}) => {
  const openConfirm = (config) => {
    // default
    const defaults = {
      title: "Konfirmasi",
      desc: "Apakah Anda yakin?",
      actionLabel: "Lanjut",
      cancelLabel: "Batal",
      variant: "confirm",
      onConfirm: null,
    };
    setAlertConfig({ ...defaults, ...config });
    setOpenAlert(true);
  };

  const openError = (message) => {
    setAlertConfig({
      title: "Terjadi kesalahan",
      desc: message ?? "Gagal memproses permintaan.",
      actionLabel: "OK",
      cancelLabel: null, // tidak tampilkan tombol cancel
      variant: "error",
      onConfirm: () => setOpenAlert(false),
    });
    setOpenAlert(true);
  };

  return {
    openConfirm,
    openError,
  };
};
