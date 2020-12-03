(function (dropdownIsOpen) {

  // Get the next element that matches a selector
  function next(element, selector) {
    var next = element.nextElementSibling;
    return next.matches(selector) ? next : false;
  }

  // Find selector
  function find(element, selector) {
    return Element.prototype.querySelector.call(element, selector);
  }

  // Toggle class active to show the dropdown menu
  function toggle(toggler, dropdown, status) {
    status = status ? 'add' : 'remove';
    dropdown.classList[status]('active');
    toggler.classList[status]('active');
    dropdownIsOpen = status;
  }

  // Usually we only have one per the page so you can remove the foreach if you want.
  document.querySelectorAll('.navbar .navbar-items').forEach(function (container) {
    container.addEventListener("click", function (event) {
      event.preventDefault();

      var toggler = event.target.closest('.dropdown\\:clickable');

      if (toggler) {
        var dropdown = find(toggler, '.dropdown-menu');

        if (dropdown && dropdown.classList.contains('active')) {
          toggle(toggler, dropdown, false);
        } else {
          toggle(
            toggler, dropdown, true
          );
        }
      }
    });
  });

  // Navbar toggler opens the navbar items in small screens
  document.querySelectorAll('.navbar-toggler').forEach(function (toggler) {
    toggler.addEventListener('click', function () {
      var navbarCollapse = next(toggler, '.navbar-collapse');

      if (navbarCollapse) {
        navbarCollapse.classList.toggle('active');
      }
    });
  });

  // Close dropdown when the dropdown is opened and it's not the target
  window.addEventListener('mouseup', function (event) {
    if (!dropdownIsOpen) {
      return ;
    }

    if (event.target.parentElement.closest('.dropdown.active')) {
      return ;
    }

    [].slice.call(document.querySelectorAll('.dropdown-menu'))
      .filter(function (dropdown) {
        return dropdown.classList.contains('active');
      })
      .forEach(function (dropdown) {
        dropdown.parentElement.classList.remove('active');
        dropdown.classList.remove('active');
      });
  });

}(false));
