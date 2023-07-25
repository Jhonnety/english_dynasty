import Swal from 'sweetalert2'
import icon_success from '../assets/icons/icon_success.png'
import icon_error from '../assets/icons/icon_error.png'
import { MessageModel } from '../models'

export const useMessage = () => {

  const message = (message: MessageModel) => {
    if (message.kind == 'success')
      Swal.fire({
        title: message.title,
        text: message.paragraph,
        imageUrl: icon_success,
        imageWidth: 90,
        imageHeight: 90,
        imageAlt: 'Custom image',
        timer: 8000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: 'Exit',
        color: "#141106",
        customClass: {
          confirmButton: 'ButtonMessage',
          title: 'successMessageTitle',
          timerProgressBar: 'timerProgressBarSuccess',
        },
      })
    else if (message.kind == 'error')
      Swal.fire({
        title: message.title,
        text: message.paragraph,
        imageUrl: icon_error,
        imageWidth: 90,
        imageHeight: 90,
        imageAlt: 'Custom image',
        timer: 15000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: 'Exit',
        color: "#141106",
        footer:message.error,
        customClass: {
          confirmButton: 'ButtonMessage',
          title: 'errorMessageTitle',
          timerProgressBar: 'timerProgressBarError',
        },
      })
  }

  return {
    message
  }
}
