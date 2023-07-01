document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    const options = {
      rootMargin: "0px",
      threshold: 0.1
    };
    
    const lazyLoad = (entry, observer) => {
      entry.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (!src) return;
          img.src = src;
          img.removeAttribute("data-src");
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    };
    
    const observer = new IntersectionObserver(lazyLoad, options);
    
    lazyImages.forEach((img) => {
      observer.observe(img);
    });
  });
  