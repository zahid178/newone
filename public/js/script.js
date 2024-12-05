(() => {
    'use strict';
    // Select all forms with the 'needs-validation' class
    const forms = document.querySelectorAll('.needs-validation');
    
    // Loop through each form and add the event listener
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            // Check the form's validity
            if (!form.checkValidity()) {
                // Prevent form submission if invalid
                event.preventDefault();
                event.stopPropagation();
            }
            // Add the 'was-validated' class for styling
            form.classList.add('was-validated');
        }, false);
    });
})();

