function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.classList.add("toast", type);

  const icon = document.createElement("span");
  icon.classList.add("icon");

  // Nastavi ikono glede na vrsto toasta
  switch (type) {
    case "success":
      icon.innerHTML = '<i class="fa fa-check-circle"></i>';
      break;
    case "error":
      icon.innerHTML = '<i class="fa fa-times-circle"></i>';
      break;
    case "warning":
      icon.innerHTML = '<i class="fa fa-exclamation-triangle"></i>';
      break;
    default:
      icon.innerHTML = '<i class="fa fa-info-circle"></i>';
  }

  // Ikono in sporočilo dodamo toastu
  toast.appendChild(icon);
  toast.appendChild(document.createTextNode(message));

  // Dodaj toast v div z id-jem "toast-container"
  toastContainer.appendChild(toast);

  // Odstrani toast po 4 sekundah
  setTimeout(() => {
    toast.remove();
  }, 4000);
}
