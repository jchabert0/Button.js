const tab = (() => {
    document.querySelectorAll('[data-btn="tab"]').forEach((tab) => {
      tab.addEventListener(('click'), () => {
        document.querySelectorAll('[data-content="tab"]').forEach((content) => { content.classList.remove('open') })
        tab.parentNode.children[1].classList.add('open')
      })
    })
  })()