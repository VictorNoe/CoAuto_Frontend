import Swal from 'sweetalert2';

const Toast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  Toast.fire({
    icon: icon,
    title: title
  });
};

const loading = async (show) => {
  if (show) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  } else {
    Swal.close();
  }
};

export default {
  Toast,
  loading
};
