/* scripts.js - Dynamic features for GM University BCA Blogging Platform */
(function () {
  function setWelcomeMessage() {
    var welcomeEl = document.getElementById('welcome');
    if (!welcomeEl) { return; }
    var now = new Date();
    var hours = now.getHours();
    var greeting = 'Welcome';
    if (hours < 12) { greeting = 'Good morning'; }
    else if (hours < 18) { greeting = 'Good afternoon'; }
    else { greeting = 'Good evening'; }
    welcomeEl.firstChild && (welcomeEl.firstChild.nodeValue = greeting + '! It\'s ' + now.toLocaleTimeString() );
  }

  function updateFooterDates() {
    var y = document.getElementById('currentYear');
    if (y) { y.textContent = new Date().getFullYear(); }
    var lm = document.getElementById('lastModified');
    if (lm) { lm.textContent = document.lastModified || 'N/A'; }
  }

  function filterFeatures() {
    var input = document.getElementById('filterInput');
    var table = document.getElementById('featuresTable');
    if (!input || !table) { return; }
    input.addEventListener('input', function () {
      var val = input.value.toLowerCase();
      var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
      for (var i = 0; i < rows.length; i++) {
        var rowText = rows[i].textContent.toLowerCase();
        rows[i].style.display = rowText.indexOf(val) > -1 ? '' : 'none';
      }
    });
  }

  /* Real-time form validation */
  function initFormValidation() {
    var form = document.getElementById('contactForm');
    if (!form) { return; }

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    var subject = document.getElementById('subject');
    var message = document.getElementById('message');

    function setFeedback(el, ok, msg) {
      var f = document.getElementById(el.id + 'Feedback');
      if (!f) { return; }
      f.textContent = msg || (ok ? 'Looks good.' : 'Please correct this field.');
      f.className = 'feedback ' + (ok ? 'valid' : 'invalid');
    }

    function validateName() {
      var ok = name.value.trim().length >= 2;
      setFeedback(name, ok, ok ? 'Name OK' : 'Please enter at least 2 characters');
      return ok;
    }

    function validateEmail() {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var ok = re.test(email.value.trim());
      setFeedback(email, ok, ok ? 'Email looks valid' : 'Enter a valid email address');
      return ok;
    }

    function validatePhone() {
      var p = phone.value.trim();
      var re = /^[0-9\-\s()+]{7,20}$/;
      var ok = p === '' || re.test(p);
      setFeedback(phone, ok, ok ? 'Phone OK' : 'Enter a valid phone (digits, spaces, +, - allowed)');
      return ok;
    }

    function validateSubject() {
      var ok = subject.value.trim().length >= 4;
      setFeedback(subject, ok, ok ? 'Subject OK' : 'Subject must be at least 4 characters');
      return ok;
    }

    function validateMessage() {
      var ok = message.value.trim().length >= 10;
      setFeedback(message, ok, ok ? 'Message OK' : 'Message must be at least 10 characters');
      return ok;
    }

    name.addEventListener('input', validateName);
    email.addEventListener('input', validateEmail);
    phone.addEventListener('input', validatePhone);
    subject.addEventListener('input', validateSubject);
    message.addEventListener('input', validateMessage);

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = validateName() & validateEmail() & validatePhone() & validateSubject() & validateMessage();
      if (!ok) {
        alert('Please correct errors in the form before submitting.');
        return false;
      }
      alert('Thank you, ' + name.value.trim() + '! Your message was received.');
      form.reset();
      // Clear feedback
      var fbs = form.querySelectorAll('.feedback');
      for (var i = 0; i < fbs.length; i++) { fbs[i].textContent = ''; fbs[i].className = 'feedback'; }
      return true;
    });
  }

  /* Initialize on DOM ready */
  document.addEventListener('DOMContentLoaded', function () {
    setWelcomeMessage();
    updateFooterDates();
    filterFeatures();
    initFormValidation();
  });

})();
