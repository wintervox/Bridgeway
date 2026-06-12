 // Course fee mapping (in Kenyan Shillings)
const courseFees = {
  'Web Development Certificate': 75000,
  'Microsoft Office Diploma': 75000,
  'Graphic Design Certificate': 75000,
  'Computer Networking Certificate': 75000
};

// Courses array
const coursesArray = [
  {
    id: 'web-dev',
    name: 'Certificate in Web Development',
    duration: '12 weeks',
    fee: 'KSh 75,000',
    icon: '💻',
    description: 'Learn HTML, CSS, JavaScript and modern frameworks to build responsive websites and web apps.'
  },
  {
    id: 'ms-office',
    name: 'Diploma in Microsoft Office',
    duration: '8 weeks',
    fee: 'KSh 75,000',
    icon: '📊',
    description: 'Gain practical skills in Excel, Word, PowerPoint and Access for professional productivity.'
  },
  {
    id: 'graphic-design',
    name: 'Certificate in Graphic Design',
    duration: '10 weeks',
    fee: 'KSh 75,000',
    icon: '🎨',
    description: 'Master layout, typography and visual design using industry tools to create stunning graphics.'
  },
  {
    id: 'networking',
    name: 'Certificate in Computer Networking',
    duration: '14 weeks',
    fee: 'KSh 75,000',
    icon: '🌐',
    description: 'Understand network fundamentals, routing, switching and basic security for real-world systems.'
  }
];

// Display courses in results area
function displayCourses(courses) {
  const searchResults = document.getElementById('searchResults');
  
  if (courses.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No courses found</div>';
    return;
  }
  
  searchResults.innerHTML = courses.map(course => `
    <div class="search-result-card">
      <div class="course-icon">${course.icon}</div>
      <h3>${course.name}</h3>
      <p><strong>Duration:</strong> ${course.duration}</p>
      <p><strong>Fee:</strong> ${course.fee}</p>
      <p>${course.description}</p>
    </div>
  `).join('');
}

// Filter courses based on search input
function filterCourses(searchTerm) {
  const filtered = coursesArray.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayCourses(filtered);
}

// Update course fee when course is selected
function updateCourseFee() {
  const courseSelect = document.getElementById('course');
  const selectedCourse = courseSelect.value;
  const fee = courseFees[selectedCourse] || 0;
  
  document.getElementById('courseFee').textContent = 'KSh ' + fee.toLocaleString();
  document.getElementById('totalAmount').textContent = 'KSh ' + fee.toLocaleString();
}

// Scroll to specific course section
function scrollToCourse(courseId) {
  const element = document.getElementById(courseId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Toggle FAQ accordion
function toggleFAQ(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector('.faq-icon');
  
  // Close all other FAQs
  document.querySelectorAll('.faq-answer').forEach(item => {
    if (item !== answer) {
      item.style.display = 'none';
      item.previousElementSibling.querySelector('.faq-icon').textContent = '+';
    }
  });
  
  // Toggle current FAQ
  if (answer.style.display === 'block') {
    answer.style.display = 'none';
    icon.textContent = '+';
  } else {
    answer.style.display = 'block';
    icon.textContent = '-';
  }
}

// Auto-populate course field if coming from team page (runs immediately, not waiting for DOMContentLoaded)
function autoPopulateCourse() {
  const selectedCourse = sessionStorage.getItem('selectedCourse');
  const courseSelect = document.getElementById('course');
  if (courseSelect && selectedCourse) {
    courseSelect.value = selectedCourse;
    sessionStorage.removeItem('selectedCourse');
  }
}

// Run when DOM is ready and also on load
document.addEventListener('DOMContentLoaded', autoPopulateCourse);
window.addEventListener('load', autoPopulateCourse);

// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
  // Display all courses on page load
  const searchResults = document.getElementById('searchResults');
  if (searchResults) {
    displayCourses(coursesArray);
    
    // Add search functionality
    const courseSearch = document.getElementById('courseSearch');
    if (courseSearch) {
      courseSearch.addEventListener('input', function(e) {
        filterCourses(e.target.value);
      });
    }
  }

  // Auto-populate course field if coming from team page
  autoPopulateCourse();

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Simulate form submission
      const statusDiv = document.getElementById('formStatus');
      statusDiv.textContent = 'Sending message...';
      statusDiv.className = 'form-status loading';
      
      setTimeout(() => {
        statusDiv.textContent = '✓ Message sent successfully! We will get back to you soon.';
        statusDiv.className = 'form-status success';
        contactForm.reset();
      }, 1500);
    });
  }

  // Handle enrollment form submission
  const enrollmentForm = document.getElementById('enrollmentForm');
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        course: document.getElementById('course').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('enrollEmail').value,
        phone: document.getElementById('phone').value
      };
      
      if (!formData.course) {
        alert('Please select a course');
        return;
      }
      
      const statusDiv = document.getElementById('enrollmentStatus');
      statusDiv.textContent = 'Processing your enrollment...';
      statusDiv.className = 'form-status loading';
      
      setTimeout(() => {
        statusDiv.innerHTML = `
          ✓ <strong>Enrollment Successful!</strong><br>
          Confirmation email has been sent to ${formData.email}<br>
          You will receive course access details shortly.
        `;
        statusDiv.className = 'form-status success';
        enrollmentForm.reset();
        updateCourseFee();
      }, 2000);
    });
  }

  // Initialize course fee on page load
  if (document.getElementById('course')) {
    updateCourseFee();
  }

  // Enrollment counter setup
  const enrollBtn = document.getElementById('enrollBtn');
  const enrolledCountP = document.getElementById('enrolledCount');
  // use a variable to store count
  let enrolledCount = 0;

  if (enrollBtn && enrolledCountP) {
    enrollBtn.addEventListener('click', function() {
      enrolledCount += 1;
      enrolledCountP.innerHTML = 'students enrolled today ' + enrolledCount;
    });
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add active class to current page in navigation
document.addEventListener('DOMContentLoaded', function() {
  const currentLocation = location.pathname.split('/').pop() || 'index.html';
  const menuItems = document.querySelectorAll('nav a');
  
  menuItems.forEach(item => {
    if (item.getAttribute('href') === currentLocation || 
        (currentLocation === '' && item.getAttribute('href') === 'index.html')) {
      item.classList.add('active');
    }
  });
});

// Team Members Array
const teamMembers = [
  {
    name: 'Rt.Rev.Dr Rayan Ateta',
    role: 'Director & Founder',
    fact: 'Has trained over 5,000 professionals in the last decade.',
    image: 'RAyoh.jpg',
    course: 'Web Development Certificate'
  },
  {
    name: ' Dr. Allan Mwangi',
    role: 'Lead Instructor - Web Development',
    fact: 'Built websites for 50+ Fortune 500 companies.',
    image: 'alan.jpg',
    course: 'Web Development Certificate'
  },
  {
    name: 'Prof.Owen Wachira',
    role: 'Graphic Design Instructor',
    fact: 'Won 15 international design awards for her creative work.',
    image: 'Owen.jpg',
    course: 'Graphic Design Certificate'
  },
  {
    name: ' Prof. Njoro',
    role: 'Network Systems Expert',
    fact: 'Certified in 7 different cybersecurity frameworks.',
    image: 'njoro.jpg',
    course: 'Computer Networking Certificate'
  },
  {
    name: 'Dr. Bishop Muriuki',
    role: 'MS Office & Productivity Coach',
    fact: 'Taught Excel to over 2,000 corporate professionals.',
    image: 'juffy white.jpg',
    course: 'Microsoft Office Diploma'
  }
];

// Function to render team cards
function renderTeam(team) {
  const teamContainer = document.getElementById('teamContainer');
  if (!teamContainer) return;
  
  teamContainer.innerHTML = team.map((member, index) => `
    <div class="team-card fade-in" style="animation-delay: ${index * 0.1}s;">
      <img src="${member.image}" alt="${member.name}" class="team-image">
      <h3>${member.name}</h3>
      <p class="role">${member.role}</p>
      <p class="fun-fact">💡 ${member.fact}</p>
    </div>
  `).join('');
}

// Function to apply for a course and navigate
function applyCourse(courseName, memberIndex) {
  // Store the selected course in sessionStorage
  sessionStorage.setItem('selectedCourse', courseName);
  // Navigate to contact page
  window.location.href = 'contact.html#contactForm';
}

// Function to shuffle array randomly
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Initialize team on page load
document.addEventListener('DOMContentLoaded', function() {
  const shuffleBtn = document.getElementById('shuffleBtn');
  
  // Render team on page load
  renderTeam(teamMembers);
  
  // Add shuffle button event listener
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', function() {
      // Add spin animation to button
      shuffleBtn.classList.add('spin-animation');
      
      // Add fade-out animation
      const teamContainer = document.getElementById('teamContainer');
      if (teamContainer) {
        teamContainer.classList.add('fade-out');
      }
      
      // Shuffle and re-render after animation
      setTimeout(() => {
        if (teamContainer) {
          teamContainer.classList.remove('fade-out');
        }
        const shuffledTeam = shuffleArray(teamMembers);
        renderTeam(shuffledTeam);
      }, 300);
      
      // Remove spin animation class after it completes
      setTimeout(() => {
        shuffleBtn.classList.remove('spin-animation');
      }, 600);
    });
  }
}, false);

