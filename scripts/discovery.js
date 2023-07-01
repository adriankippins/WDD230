const lazyLoadImages = () => {
    const images = document.querySelectorAll("[data-src]");

    const loadImage = (image) => {
        image.setAttribute("src", image.getAttribute("data-src"));
        image.removeAttribute("data-src");
    };

    const imageOptions = {
        threshold: 0,
        rootMargin: "0px 0px -50px 0px"
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, imageOptions);

    images.forEach((image) => {
        imageObserver.observe(image);
    });
};

document.addEventListener("DOMContentLoaded", lazyLoadImages);