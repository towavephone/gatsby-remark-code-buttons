require('./styles.css');

exports.onClientEntry = () => {
  window.copyToClipboard = (str, toasterId) => {
    const el = document.createElement('textarea');
    el.className = 'gatsby-code-button-buffer';
    el.innerHTML = str;
    document.body.appendChild(el);

    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (toasterId) {
      window.showClipboardToaster(toasterId);
    }
  }

  window.showClipboardToaster = toasterId => {
    const textElem = document.querySelector(`[data-toaster-id="${toasterId}"]`);

    if (!textElem) {
      return;
    }

    const el = document.createElement('div');
    el.className = textElem.dataset.toasterClass;
    el.innerHTML = `
      <div class="${textElem.dataset.toasterTextClass}">
        ${textElem.dataset.toasterText}
      </div>
    `.trim();

    document.body.appendChild(el);

    setTimeout(() => {
      document.body.removeChild(el);
    }, textElem.dataset.toasterDuration);
  }
}
