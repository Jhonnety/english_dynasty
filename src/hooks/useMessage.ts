import Swal from 'sweetalert2'
import icon_success from '../assets/icons/icon_success.png'
import icon_error from '../assets/icons/icon_error.png'
import { MessageModel } from '../models'

export const useMessage = () => {

  const createMessage = (message: MessageModel) => {
    if (message.kind == 'success')
      Swal.fire({
        title: message.title,
        text: message.paragraph,
        imageUrl: icon_success,
        imageWidth: 90,
        imageHeight: 90,
        imageAlt: 'Custom image',
        timer: 10000,
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
        footer: message.error,
        customClass: {
          confirmButton: 'ButtonMessage',
          title: 'errorMessageTitle',
          timerProgressBar: 'timerProgressBarError',
        },
      })
  }

  const messageSuccessLogin = () => {
    createMessage({
      kind: 'success',
      title: 'Login successful',
      paragraph: 'Welcome back! You have been successfully logged in.',
    });
  }

  const messageUserOrPasswordError = () => {
    createMessage({
      kind: 'error',
      title: 'Login failed',
      paragraph: 'User not found or the password is wrong.',
    });
  }
  const savedChanges = () => {
    createMessage({
      kind: 'success',
      title: 'Saved changes successfully!',
      paragraph: 'Your changes have been successfully saved. Thank you for updating your information!',
    });
  }
  const sendVerificationEmail = (email: string) => {

    Swal.fire({
      title: 'Verification Email Sent!',
      text: `Thank you for signing up with English Dynasty! We've sent a verification email to ${email}. To continue, please check your email and click on the verification link. This is an important step to ensure the security of your account.`,
      imageUrl: icon_success,
      imageWidth: 90,
      imageHeight: 90,
      imageAlt: 'Custom image',
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


  }
  return {
    savedChanges,
    createMessage,
    messageSuccessLogin,
    messageUserOrPasswordError,
    sendVerificationEmail
  }
}
