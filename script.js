const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('PlayReveal');
    }
    });
});
  observer.observe(document.querySelector('.linkImg'));
  