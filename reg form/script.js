// Competitive Exam Registration Form - Validation Logic
document.addEventListener('DOMContentLoaded', function() {
  
  const form = document.getElementById('examForm');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const feedbackDiv = document.getElementById('formFeedback');
  
  // Helper function to show feedback
  function showFeedback(message, isError = false) {
    feedbackDiv.textContent = message;
    feedbackDiv.className = 'feedback-area';
    if (isError) {
      feedbackDiv.classList.add('error');
    } else {
      feedbackDiv.classList.add('success');
    }
    
    // Auto hide after 5 seconds for success messages
    if (!isError) {
      setTimeout(() => {
        if (feedbackDiv.classList.contains('success')) {
          feedbackDiv.style.display = 'none';
          setTimeout(() => {
            feedbackDiv.style.display = '';
            feedbackDiv.className = 'feedback-area';
          }, 300);
        }
      }, 5000);
    }
  }
  
  // Helper to mark field as error
  function markError(field, isError) {
    if (field) {
      if (isError) {
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    }
  }
  
  // Clear all error marks
  function clearAllErrors() {
    const allInputs = form.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
      input.classList.remove('error');
    });
  }
  
  // Main validation function
  function validateForm() {
    clearAllErrors();
    let isValid = true;
    let errorMessages = [];
    
    // 1. Full Name (at least 3 characters, only letters and spaces)
    const fullname = document.getElementById('fullname').value.trim();
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    if (!fullname || !nameRegex.test(fullname)) {
      markError(document.getElementById('fullname'), true);
      errorMessages.push('• Full Name must be 3-50 characters (letters and spaces only)');
      isValid = false;
    }
    
    // 2. Date of Birth (age between 18-26 years as per exam criteria)
    const dob = document.getElementById('dob').value;
    if (!dob) {
      markError(document.getElementById('dob'), true);
      errorMessages.push('• Date of Birth is required');
      isValid = false;
    } else {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18 || age > 26) {
        markError(document.getElementById('dob'), true);
        errorMessages.push('• Age must be between 18 and 26 years');
        isValid = false;
      }
    }
    
    // 3. Father & Mother Name
    const fathername = document.getElementById('fathername').value.trim();
    if (!fathername || fathername.length < 3) {
      markError(document.getElementById('fathername'), true);
      errorMessages.push('• Father\'s Name is required (minimum 3 characters)');
      isValid = false;
    }
    
    const mothername = document.getElementById('mothername').value.trim();
    if (!mothername || mothername.length < 3) {
      markError(document.getElementById('mothername'), true);
      errorMessages.push('• Mother\'s Name is required (minimum 3 characters)');
      isValid = false;
    }
    
    // 4. Gender
    const gender = document.getElementById('gender').value;
    if (!gender) {
      markError(document.getElementById('gender'), true);
      errorMessages.push('• Please select Gender');
      isValid = false;
    }
    
    // 5. Category
    const category = document.getElementById('category').value;
    if (!category) {
      markError(document.getElementById('category'), true);
      errorMessages.push('• Please select Category');
      isValid = false;
    }
    
    // 6. Email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      markError(document.getElementById('email'), true);
      errorMessages.push('• Valid Email Address is required');
      isValid = false;
    }
    
    // 7. Mobile Number (10 digits)
    const mobile = document.getElementById('mobile').value.trim();
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
      markError(document.getElementById('mobile'), true);
      errorMessages.push('• Mobile Number must be 10 digits starting with 6-9');
      isValid = false;
    }
    
    // 8. Address
    const address = document.getElementById('address').value.trim();
    if (!address || address.length < 10) {
      markError(document.getElementById('address'), true);
      errorMessages.push('• Complete Address is required (minimum 10 characters)');
      isValid = false;
    }
    
    // 9. Academic Details
    const board10 = document.getElementById('board10').value.trim();
    if (!board10 || board10.length < 3) {
      markError(document.getElementById('board10'), true);
      errorMessages.push('• Class 10th Board name is required');
      isValid = false;
    }
    
    const year10 = document.getElementById('year10').value;
    if (!year10 || year10 < 2018 || year10 > 2026) {
      markError(document.getElementById('year10'), true);
      errorMessages.push('• Valid Class 10th passing year is required (2018-2026)');
      isValid = false;
    }
    
    const board12 = document.getElementById('board12').value.trim();
    if (!board12 || board12.length < 3) {
      markError(document.getElementById('board12'), true);
      errorMessages.push('• Class 12th Board name is required');
      isValid = false;
    }
    
    const year12 = document.getElementById('year12').value;
    if (!year12 || year12 < 2024 || year12 > 2026) {
      markError(document.getElementById('year12'), true);
      errorMessages.push('• Valid Class 12th year is required (2024-2026)');
      isValid = false;
    }
    
    // 10. Subjects (at least Physics, Chemistry, Mathematics for engineering exam)
    const subjects = document.querySelectorAll('input[name="subject"]:checked');
    const subjectValues = Array.from(subjects).map(cb => cb.value);
    const requiredSubjects = ['physics', 'chemistry', 'mathematics'];
    const hasRequiredSubjects = requiredSubjects.every(subj => subjectValues.includes(subj));
    if (!hasRequiredSubjects) {
      errorMessages.push('• Physics, Chemistry, and Mathematics are mandatory subjects');
      isValid = false;
    }
    
    // 11. Exam Preferences
    const zone = document.getElementById('zone').value;
    if (!zone) {
      markError(document.getElementById('zone'), true);
      errorMessages.push('• Please select preferred exam zone');
      isValid = false;
    }
    
    const medium = document.getElementById('medium').value;
    if (!medium) {
      markError(document.getElementById('medium'), true);
      errorMessages.push('• Please select exam medium');
      isValid = false;
    }
    
    // 12. Declaration
    const declaration = document.getElementById('declaration').checked;
    if (!declaration) {
      errorMessages.push('• You must accept the declaration to proceed');
      isValid = false;
    }
    
    // Show feedback
    if (!isValid) {
      showFeedback('Please correct the following errors:\n' + errorMessages.join('\n'), true);
    } else {
      // Generate Registration Number
      const regNumber = 'JEE' + new Date().getFullYear() + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      showFeedback(`✓ Registration Successful! Your Registration Number is: ${regNumber}\nPlease save this number for future reference.`, false);
      
      // Scroll to feedback
      feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Optionally, you can submit to server here
      // form.submit();
    }
    
    return isValid;
  }
  
  // Reset Form Function
  function resetForm() {
    form.reset();
    clearAllErrors();
    showFeedback('Form has been reset. You can start fresh.', false);
    
    // Clear any checked subjects (reset only clears checkboxes but let's ensure)
    const checkboxes = document.querySelectorAll('input[name="subject"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    setTimeout(() => {
      if (feedbackDiv.classList.contains('success')) {
        feedbackDiv.style.display = 'none';
        setTimeout(() => {
          feedbackDiv.style.display = '';
          feedbackDiv.className = 'feedback-area';
        }, 300);
      }
    }, 3000);
  }
  
  // Live field validation - clear error on typing
  function setupLiveValidation() {
    const fields = ['fullname', 'fathername', 'mothername', 'email', 'mobile', 'board10', 'board12', 'address'];
    fields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', function() {
          this.classList.remove('error');
        });
      }
    });
    
    // For selects and date
    const selectFields = ['gender', 'category', 'zone', 'medium'];
    selectFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('change', function() {
          this.classList.remove('error');
        });
      }
    });
    
    const dobField = document.getElementById('dob');
    if (dobField) {
      dobField.addEventListener('change', function() {
        this.classList.remove('error');
      });
    }
  }
  
  // Submit handler
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      validateForm();
    });
  }
  
  // Reset button handler
  if (resetBtn) {
    resetBtn.addEventListener('click', function(e) {
      e.preventDefault();
      resetForm();
    });
  }
  
  // Setup live validation
  setupLiveValidation();
  
  // Set minimum and maximum dates for DOB
  const dobInput = document.getElementById('dob');
  if (dobInput) {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 26, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    
    dobInput.max = maxDate.toISOString().split('T')[0];
    dobInput.min = minDate.toISOString().split('T')[0];
  }
  
  // Restrict mobile number input to digits only
  const mobileInputs = ['mobile', 'altmobile'];
  mobileInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
      });
    }
  });
  
  // Year inputs validation
  const yearInputs = ['year10', 'year12'];
  yearInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', function(e) {
        let val = this.value.replace(/[^0-9]/g, '');
        if (val.length > 4) val = val.slice(0, 4);
        this.value = val;
      });
    }
  });
  
  console.log('JEE Advanced Registration Form Loaded - Official Use Only');
});