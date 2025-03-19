//your JS code here. If required.
const codeInputs = document.querySelectorAll('.code');

        // Focus on first input when page loads
        window.addEventListener('load', () => {
            codeInputs[0].focus();
        });

        // Handle input
        codeInputs.forEach((input, index) => {
            input.addEventListener('keydown', (e) => {
                // Check if the key pressed is a digit (0-9)
                if (e.key >= '0' && e.key <= '9') {
                    // Clear the input first to replace the content
                    input.value = '';
                    
                    // Move to next input field after a short delay
                    setTimeout(() => {
                        if (index < codeInputs.length - 1) {
                            codeInputs[index + 1].focus();
                        }
                    }, 10);
                } 
                // Handle backspace
                else if (e.key === 'Backspace') {
                    // If the current field is empty, move to the previous field
                    if (input.value === '') {
                        if (index > 0) {
                            codeInputs[index - 1].focus();
                            codeInputs[index - 1].value = '';
                            e.preventDefault();
                        }
                    }
                }
            });

            // Handle paste event
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').split('');
                
                // Fill as many inputs as we can with the pasted data
                for (let i = 0; i < pastedData.length && i + index < codeInputs.length; i++) {
                    if (/^\d$/.test(pastedData[i])) {
                        codeInputs[i + index].value = pastedData[i];
                        
                        // Focus on the next empty field
                        if (i + index + 1 < codeInputs.length) {
                            codeInputs[i + index + 1].focus();
                        }
                    }
                }
            });
        });