document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggleButton = document.getElementById('theme-toggle');
    
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            status.textContent = '';
            status.className = 'form-status';

            const data = new FormData(event.target);

            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.textContent = "Thanks! Your message has been sent successfully.";
                    status.classList.add('success');
                    form.reset();
                } else {
                    const dataResponse = await response.json();
                    if (Object.hasOwn(dataResponse, 'errors')) {
                        status.textContent = dataResponse.errors.map(error => error.message).join(", ");
                    } else {
                        status.textContent = "Oops! There was a problem submitting your form.";
                    }
                    status.classList.add('error');
                }
            } catch (error) {
                status.textContent = "Oops! Network error. Please try again later.";
                status.classList.add('error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
});