document.addEventListener('DOMContentLoaded', function() {
    // Enhanced file input with preview
    const fileInput = document.querySelector('#id_sub_images');
    const previewContainer = document.getElementById('imagePreview');
    
    if (fileInput && previewContainer) {
        fileInput.addEventListener('change', function() {
            previewContainer.innerHTML = '';
            const files = this.files;
            const uploadLabel = this.parentElement;
            const uploadText = uploadLabel.querySelector('.upload-text');
            const fileInfo = uploadLabel.querySelector('.file-info');
            
            if (files.length > 0) {
                uploadText.textContent = `${files.length} ${files.length === 1 ? 'file' : 'files'} selected`;
                fileInfo.textContent = Array.from(files).map(file => file.name).join(', ');
                
                // Create preview for each image
                Array.from(files).forEach(file => {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const preview = document.createElement('img');
                            preview.src = e.target.result;
                            preview.className = 'preview-image';
                            preview.title = file.name;
                            previewContainer.appendChild(preview);
                        }
                        reader.readAsDataURL(file);
                    }
                });
            } else {
                uploadText.textContent = 'Click to upload images';
                fileInfo.textContent = 'or drag and drop files here';
            }
        });
        
        // Drag and drop functionality
        const uploadLabel = fileInput.parentElement;
        
        uploadLabel.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadLabel.style.borderColor = '#4361ee';
            uploadLabel.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
        });
        
        uploadLabel.addEventListener('dragleave', () => {
            uploadLabel.style.borderColor = '#e0e0e0';
            uploadLabel.style.backgroundColor = '#fff';
        });
        
        uploadLabel.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadLabel.style.borderColor = '#e0e0e0';
            uploadLabel.style.backgroundColor = '#fff';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                const event = new Event('change');
                fileInput.dispatchEvent(event);
            }
        });
    }
    
    // Form validation with improved UX
    const form = document.querySelector('.item-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            // Clear previous errors
            this.querySelectorAll('.errorlist').forEach(el => el.remove());
            this.querySelectorAll('input, textarea, select').forEach(field => {
                field.style.borderColor = '';
            });
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--error-color)';
                    isValid = false;
                    
                    const error = document.createElement('ul');
                    error.className = 'errorlist';
                    error.innerHTML = '<li>This field is required</li>';
                    
                    // Insert error message in the appropriate location
                    if (field.type === 'file') {
                        field.parentNode.insertBefore(error, field.nextSibling);
                    } else {
                        field.parentNode.appendChild(error);
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const firstError = this.querySelector('.errorlist');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }
    
    // Real-time validation
    const inputs = document.querySelectorAll('.item-form input, .item-form textarea, .item-form select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '';
                const error = this.parentNode.querySelector('.errorlist');
                if (error) {
                    error.remove();
                }
            }
        });
        
        // Add focus styles
        input.addEventListener('focus', function() {
            this.parentNode.style.borderLeftColor = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.borderLeftColor = '';
        });
    });
    
    // Character counter for textarea
    const textarea = document.querySelector('.item-form textarea');
    if (textarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.fontSize = '0.8rem';
        counter.style.color = 'var(--light-text)';
        counter.style.textAlign = 'right';
        counter.style.marginTop = '5px';
        textarea.parentNode.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            counter.textContent = `${this.value.length} characters`;
        });
    }
});