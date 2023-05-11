function submitForm() {
    
    const form = document.getElementById("job_info");
    const formData = new FormData(form);
    const bodySection = document.getElementById("body").value;

    if (!form.checkValidity()) {
        // Display a custom error message
        form.reportValidity();
        return;
    }

    if (bodySection.split(" ").length < 100) {
        alert("At least 100 words is required for the body paragraph.");
        return;
    }

    const queryString = new URLSearchParams(formData).toString() + "&body=" + encodeURIComponent(bodySection);
    
    const newWindow = window.open("template.html?" + queryString, "_blank");
    newWindow.focus();
}