export function getPageWindow(pageIndex, pageCount, windowSize = 5) {
  if (pageCount <= 0) return [];
  const half = Math.floor(windowSize / 2);

  // kandidat start: geser agar current di tengah
  let start = pageIndex - half;
  let end = pageIndex + half;

  // koreksi jika mepet awal
  if (start < 0) {
    end += -start;
    start = 0;
  }

  // koreksi jika mepet akhir
  if (end > pageCount - 1) {
    const diff = end - (pageCount - 1);
    start -= diff;
    end = pageCount - 1;
    if (start < 0) start = 0; // jaga-jaga
  }

  // jika total halaman < windowSize, pakai semua
  const size = Math.min(windowSize, pageCount);
  // jaga ukuran window
  if (end - start + 1 > size) end = start + size - 1;

  // return array index 0-based
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}