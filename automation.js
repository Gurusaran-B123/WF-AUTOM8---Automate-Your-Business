// Page Loading
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c🚀 WF AUTOM8 - Automation Made Easy', 'color: #ff0033; font-size: 16px; font-weight: bold;');
    console.log('%cSaving hours daily with n8n, AI & Webhooks', 'color: #b0b0b0; font-size: 12px;');
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.style.opacity = navLinks.classList.contains('active') ? '0.7' : '1';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.style.opacity = '1';
    });
});

// Form Submission and Validation
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form - Check if all fields are filled
    if (!name || !email || !message) {
        showFormStatus('Please fill in all fields', 'error');
        return;
    }

    // Validate name - Minimum 2 characters
    if (name.trim().length < 2) {
        showFormStatus('Name must be at least 2 characters long', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormStatus('Please enter a valid email address', 'error');
        return;
    }

    // Validate message - Minimum 10 characters
    if (message.trim().length < 10) {
        showFormStatus('Message must be at least 10 characters long', 'error');
        return;
    }

    try {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual backend endpoint)
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, message })
        // });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        showFormStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Clear success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);

    } catch (error) {
        showFormStatus('Error sending message. Please try again.', 'error');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (!form) {
        console.error("contactForm not found");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            source: "WF AUTOM8 Website"
        };

        try {
            const response = await fetch("https://n8n-y3r8.onrender.com/webhook/lead-capture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                formStatus.innerText = "✅ Request sent successfully!";
                formStatus.className = "form-status success";
                form.reset();
            } else {
                formStatus.innerText = "❌ Webhook error. Check n8n.";
                formStatus.className = "form-status error";
            }
        } catch (error) {
            console.error(error);
            formStatus.innerText = "❌ Connection error. Check webhook URL / CORS.";
            formStatus.className = "form-status error";
        }
    });
});
