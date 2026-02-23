const RAZORPAY_KEY_ID = 'rzp_test_SJekY08naJfl5d';
const RAZORPAY_DISPLAY_NAME = 'Balaji Kirana Store';

const SERVICES = [
    {
        id: 'portfolio-website',
        title: 'Portfolio Website Setup',
        level: 'Popular',
        description: 'Custom personal portfolio page with responsive layout, project section, and contact form integration.',
        delivery: '2-3 days',
        points: ['Responsive design', 'SEO basics', 'Deploy ready'],
        priceInr: 1499
    },
    {
        id: 'resume-fix',
        title: 'Resume + LinkedIn Optimization',
        level: 'Career',
        description: 'One-to-one improvement for resume and LinkedIn profile to make it cleaner, ATS-friendly, and role-focused.',
        delivery: '24 hours',
        points: ['Resume rewrite', 'Keyword optimization', 'LinkedIn headline fix'],
        priceInr: 499
    },
    {
        id: 'mini-chatbot',
        title: 'Mini Chatbot Integration',
        level: 'Tech',
        description: 'Simple chatbot integration for your website with FAQ-based responses and custom branding.',
        delivery: '2 days',
        points: ['Website embed', 'Custom welcome message', 'Basic FAQ training'],
        priceInr: 999
    },
    {
        id: 'quick-consult-20',
        title: 'Quick Tech Consultation',
        level: 'Starter',
        description: 'Fast 15-minute call to review your project idea, roadmap, or bug issue with direct next steps.',
        delivery: 'Same day',
        points: ['15-minute call', 'Action checklist', 'Beginner friendly'],
        priceInr: 20
    }
];

function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    coursesGrid.innerHTML = SERVICES.map(service => `
        <article class="course-card">
            <span class="course-level">${service.level}</span>
            <h3>${service.title}</h3>
            <p class="course-description">${service.description}</p>
            <ul class="service-points">
                ${service.points.map(point => `<li>${point}</li>`).join('')}
            </ul>
            <p class="course-description"><strong>Delivery:</strong> ${service.delivery}</p>
            <div class="course-meta">
                <span class="course-price">INR ${service.priceInr}</span>
                <button class="btn-course-buy" type="button" data-service-id="${service.id}">
                    Pay & Book
                </button>
            </div>
        </article>
    `).join('');
}

function openRazorpayCheckout(service) {
    if (typeof Razorpay === 'undefined') {
        alert('Razorpay SDK did not load. Please refresh and try again.');
        return;
    }

    if (!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === 'rzp_test_your_key_here') {
        alert('Please set your Razorpay key in js/courses.js first.');
        return;
    }

    const options = {
        key: RAZORPAY_KEY_ID,
        amount: service.priceInr * 100,
        currency: 'INR',
        name: RAZORPAY_DISPLAY_NAME,
        description: `${service.title} (${service.delivery})`,
        image: 'images/logo.svg',
        handler: function (response) {
            alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
        },
        notes: {
            service_id: service.id,
            service_title: service.title
        },
        theme: {
            color: '#667eea'
        }
    };

    const razorpay = new Razorpay(options);
    razorpay.on('payment.failed', function () {
        alert('Payment failed. Please try again.');
    });
    razorpay.open();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();

    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    coursesGrid.addEventListener('click', (event) => {
        const buyButton = event.target.closest('.btn-course-buy');
        if (!buyButton) return;

        const serviceId = buyButton.getAttribute('data-service-id');
        const selectedService = SERVICES.find(service => service.id === serviceId);
        if (!selectedService) return;

        openRazorpayCheckout(selectedService);
    });
});
