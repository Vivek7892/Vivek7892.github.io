/* ============================================
   EMAILJS - Contact Form + Auto-Reply
   ============================================ */

const EMAILJS_CONFIG = {
  publicKey: 'WtbuTsmLOXl0kTugm',
  serviceId: 'service_t4fz59q',
  templateId: 'template_c3jtcll',
  autoReplyTemplateId: 'template_vgrkmx9'
};

document.addEventListener('DOMContentLoaded', function () {
  if (!window.emailjs) {
    console.error('EmailJS library failed to load.');
  } else {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }

  function setStatus(status, message) {
    if (status) status.textContent = message;
  }

  function setSubmitState(button, isSending) {
    if (!button.dataset.defaultHtml) {
      button.dataset.defaultHtml = button.innerHTML;
    }

    button.disabled = isSending;
    button.innerHTML = isSending ? 'Sending...' : button.dataset.defaultHtml;
  }

  function wireForm(formId, submitBtnId, statusId, onSuccess) {
    const form = document.getElementById(formId);
    const submitBtn = document.getElementById(submitBtnId);
    const status = document.getElementById(statusId);
    if (!form || !submitBtn || !status) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = (form.from_name.value || '').trim();
      const email = (form.from_email.value || '').trim();
      const message = (form.message.value || '').trim();

      if (!name || !email || !message) {
        setStatus(status, 'Please fill in all fields.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus(status, 'Please enter a valid email.');
        return;
      }

      if (!window.emailjs) {
        setStatus(status, 'Email service unavailable. Email: vivekvvivekv70@gmail.com');
        return;
      }

      setSubmitState(submitBtn, true);
      setStatus(status, '');

      const templateParams = {
        from_name: name,
        from_email: email,
        reply_to: email,
        to_name: 'Vivek V',
        to_email: 'vivekvvivekv70@gmail.com',
        message,
        page_url: window.location.href,
        sent_at: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        })
      };

      const autoReplyParams = {
        ...templateParams,
        to_name: name,
        to_email: email,
        owner_name: 'Vivek V',
        owner_email: 'vivekvvivekv70@gmail.com'
      };

      emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(() => emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.autoReplyTemplateId,
          autoReplyParams
        ).catch(err => {
          console.warn('EmailJS auto-reply failed:', err);
        }))
        .then(() => {
          setStatus(status, 'Sent!');
          form.reset();
          setSubmitState(submitBtn, false);
          if (onSuccess) onSuccess();
          setTimeout(() => setStatus(status, ''), 3000);
        })
        .catch(err => {
          console.error('EmailJS error:', err);
          setStatus(status, 'Failed. Email: vivekvvivekv70@gmail.com');
          setSubmitState(submitBtn, false);
        });
    });

    form.from_email.addEventListener('blur', function () {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
      this.style.borderColor = this.value && !valid ? '#888' : '';
    });
  }

  wireForm('contactForm', 'submitBtn', 'formStatus', () => {
    setTimeout(() => {
      if (typeof window.closeContactOverlay === 'function') window.closeContactOverlay();
    }, 1500);
  });

  wireForm('inlineContactForm', 'inlineSubmitBtn', 'inlineFormStatus', null);
});
