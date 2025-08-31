// Функция для получения активной вкладки (остаётся без изменений)
async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  }
  
  // Находим все нужные нам элементы на странице
  const urlEl = document.getElementById('url');
  const titleEl = document.getElementById('title'); // <-- НАХОДИМ ЭЛЕМЕНТ ДЛЯ ЗАГОЛОВКА
  const copyBtn = document.getElementById('copy');
  
  // Основная логика, которая запускается сразу
  (async () => {
    try {
      const tab = await getActiveTab();
      const url = tab?.url || '';
      const title = tab?.title || ''; // <-- ПОЛУЧАЕМ ЗАГОЛОВОК ИЗ ВКЛАДКИ
  
      // Заполняем текстовые поля на странице
      urlEl.textContent = url || 'Нет URL';
      urlEl.title = url;
      titleEl.textContent = title || 'Нет заголовка'; // <-- ВСТАВЛЯЕМ ЗАГОЛОВОК НА СТРАНИЦУ
  
      // Обработчик клика по кнопке (остаётся из первого, лучшего варианта)
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