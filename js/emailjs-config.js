/* ============================================
   EMAILJS INTEGRATION
   Contact Form with Auto-Reply
   ============================================ */

// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'WtbuTsmLOXl0kTugm',
    serviceId: 'service_t4fz59q',
    templateId: 'template_c3jtcll',
    autoReplyTemplateId: 'template_vgrkmx9'
};

// EmailJS is already initialized in index.html, no need to initialize again

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formStatus.textContent = '';
            formStatus.style.color = '';

            // Get form data - simplified for debugging
            const templateParams = {
                from_name: contactForm.from_name.value,
                from_email: contactForm.from_email.value,
                message: contactForm.message.value
            };

            console.log('Sending email with params:', templateParams);
            console.log('Service ID:', EMAILJS_CONFIG.serviceId);
            console.log('Template ID:', EMAILJS_CONFIG.templateId);

            // Send main email to you
            emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            )
            .then(function(response) {
                console.log('Main email sent successfully:', response);
                
                // Send auto-reply to client
                const autoReplyParams = {
                    to_name: contactForm.from_name.value,
                    to_email: contactForm.from_email.value,
                    message: contactForm.message.value
                };
                
                console.log('Sending auto-reply with params:', autoReplyParams);
                
                return emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.autoReplyTemplateId,
                    autoReplyParams
                );
            })
            .then(function(response) {
                console.log('Auto-reply sent successfully:', response);
                
                // Show success message
                formStatus.textContent = 'Message sent successfully! Check your email for confirmation.';
                formStatus.style.color = 'var(--text-primary)';
                
                // Reset form
                contactForm.reset();
                
                // Re-enable button after 3 seconds
                setTimeout(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    formStatus.textContent = '';
                }, 3000);
            })
            .catch(function(error) {
                console.error('Error sending email:', error);
                console.error('Error details:', JSON.stringify(error));
                
                // Show detailed error message
                let errorMsg = 'Failed to send message. ';
                if (error.text) {
                    errorMsg += error.text;
                } else if (error.status) {
                    errorMsg += 'Status: ' + error.status;
                } else {
                    errorMsg += 'Please check console for details.';
                }
                
                formStatus.textContent = errorMsg;
                formStatus.style.color = '#dc2626';
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        });
    }
});

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Real-time validation (optional)
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.querySelector('input[name="from_email"]');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc2626';
            } else {
                this.style.borderColor = '';
            }
        });
    }
});
