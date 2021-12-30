export default {
  inserted: (el: Element) => {
    function loadImage() {
      const imageElement = Array.from(el.children).find(
        (el) => el.nodeName === 'IMG'
      ) as HTMLImageElement
      if (imageElement) {
        imageElement.src = imageElement.dataset.url
          ? imageElement.dataset.url
          : ''
      }
    }

    function handleIntersect(
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    function createObserver() {
      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        threshold: 0,
      })
      observer.observe(el)
    }
    if (window.IntersectionObserver) {
      createObserver()
    } else {
      loadImage()
    }
  },
}
