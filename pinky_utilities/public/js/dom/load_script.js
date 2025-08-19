function load_script(src, { onload, onerror } = {}) {
  const script = document.createElement('script');
  script.src = src;
  if (onload) script.onload = onload;
  if (onerror) script.onerror = onerror;
  document.head.appendChild(script);
}