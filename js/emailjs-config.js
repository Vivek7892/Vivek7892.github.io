/* ============================================
   EMAILJS — Contact Form + Auto-Reply
   ============================================ */

const EMAILJS_CONFIG = {
  publicKey:           'WtbuTsmLOXl0kTugm',
  serviceId:           'service_t4fz59q',
  templateId:          'template_c3jtcll',
  autoReplyTemplateId: 'template_vgrkmx9'
};

document.addEventListener('DOMContentLoaded', function () {

  function wireForm(formId, submitBtnId, statusId, onSuccess) {
    const form      = document.getElementById(formId);
    const submitBtn = document.getElementById(submitBtnId);
    const status    = document.getElementById(statusId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = (form.from_name.value  || '').trim();
      const email   = (form.from_email.value || '').trim();
      const message = (form.message.value    || '').trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        return;
      }

      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending…';
      status.textContent    = '';

      emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, { from_name: name, from_email: email, message })
        .then(() => emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.autoReplyTemplateId, { to_name: name, to_email: email, message }))
        .then(() => {
          status.textContent    = '\u2713 Sent!';
          form.reset();
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Send →';
          if (onSuccess) onSuccess();
          setTimeout(() => { status.textContent = ''; }, 3000);
        })
        .catch(err => {
          console.error('EmailJS error:', err);
          status.textContent    = 'Failed. Email: vivekvvivekv70@gmail.com';
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Send →';
        });
    });

    // email validation
    const emailInput = form.from_email;
    if (emailInput) {
      emailInput.addEventListener('blur', function () {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
        this.style.borderColor = this.value && !valid ? '#888' : '';
      });
    }
  }

  // Overlay form
  wireForm('contactForm', 'submitBtn', 'formStatus', () => {
    setTimeout(() => {
      if (typeof window.closeContactOverlay === 'function') window.closeContactOverlay();
    }, 1500);
  });

  // Inline contact form (beside contact links)
  wireForm('inlineContactForm', 'inlineSubmitBtn', 'inlineFormStatus', null);

});
