/* ==========================================================================
   Main JS — burger menu, phone mask, form submission
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initPhoneMask();
  initLeadForm();
});

/* ----- Burger menu ----- */
function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // close menu on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/* ----- Phone mask ----- */
function initPhoneMask() {
  const inputs = document.querySelectorAll('input[type="tel"]');
  inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
      let formatted = '';
      if (digits.length === 0) {
        formatted = '';
      } else {
        // normalize: if starts with 8, keep as +7
        let normalized = digits;
        if (normalized.startsWith('8')) normalized = '7' + normalized.slice(1);
        if (!normalized.startsWith('7')) normalized = '7' + normalized;
        normalized = normalized.slice(0, 11);

        formatted = '+7';
        if (normalized.length > 1) formatted += ' (' + normalized.slice(1, 4);
        if (normalized.length >= 5) formatted += ') ' + normalized.slice(4, 7);
        if (normalized.length >= 8) formatted += '-' + normalized.slice(7, 9);
        if (normalized.length >= 10) formatted += '-' + normalized.slice(9, 11);
      }
      e.target.value = formatted;
    });
  });
}

/* ----- Lead form ----- */
function initLeadForm() {
  const form = document.querySelector('form[data-form="lead"]');
  if (!form) return;

  const feedback = form.querySelector('.lead-form__feedback');
  const startTime = Date.now();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // anti-spam: honeypot
    if (form.website && form.website.value) {
      // silently pretend success
      showSuccess();
      return;
    }

    // anti-spam: minimum fill time (2 seconds)
    if (Date.now() - startTime < 2000) {
      showError('Пожалуйста, проверьте заполнение формы.');
      return;
    }

    // HTML5 validity check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // TODO: отправка на /api/lead (Cloudflare Worker → Telegram bot)
    // Пока — заглушка: имитация успеха.
    try {
      // const res = await fetch('/api/lead', { method: 'POST', body: formData });
      // if (!res.ok) throw new Error('network');

      console.log('[lead-form] submit (stub):', data);
      await new Promise((r) => setTimeout(r, 500));
      showSuccess();
      form.reset();
    } catch (err) {
      showError('Не удалось отправить заявку. Позвоните по указанному телефону.');
    }
  });

  function showSuccess() {
    feedback.className = 'lead-form__feedback lead-form__feedback--ok';
    feedback.textContent = 'Заявка принята. Свяжусь с вами в течение рабочего дня.';
  }

  function showError(msg) {
    feedback.className = 'lead-form__feedback lead-form__feedback--err';
    feedback.textContent = msg;
  }
}
