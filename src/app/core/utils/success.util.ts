import Swal, { SweetAlertResult } from 'sweetalert2'

export function emitToast(
    title: string = "Success!", 
    text: string = "Operation executed successfully",
    confirmBtn: string,
    denyBtn: string,
    ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title,
      text: text,
      icon: "success",
      confirmButtonText: confirmBtn,
      denyButtonText: denyBtn,
      showConfirmButton: true,
      showDenyButton: true,
    })
}

export function emitErrorToast(
    title: string = "Success!", 
    text: string = "Operation executed successfully",
    confirmBtn: string,
): Promise<SweetAlertResult> {
    return Swal.fire({
        title: title,
        text: text,
        icon: "error",
        confirmButtonText: confirmBtn,
        showConfirmButton: true,
      })
}