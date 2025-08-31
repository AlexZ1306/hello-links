async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

const urlEl = document.getElementById('url');
const copyBtn = document.getElementById('copy');

(async () => {
  try {
    const tab = await getActiveTab();
    const url = tab?.url || '';
    urlEl.textContent = url || 'Нет URL';
    urlEl.title = url;

    copyBtn.addEventListener('click', async () => {
      if (!url) return;
      try {
        // Предпочтительный способ
        await navigator.clipboard.writeText(url);
        copyBtn.textContent = 'Скопировано ✓';
        setTimeout(() => (copyBtn.textContent = 'Скопировать'), 1200);
      } catch {
        // Фолбэк через временное поле
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        copyBtn.textContent = 'Скопировано ✓';
        setTimeout(() => (copyBtn.textContent = 'Скопировать'), 1200);
      }
    });
  } catch (e) {
    urlEl.textContent = 'Ошибка получения URL';
    console.error(e);
  }
})();


