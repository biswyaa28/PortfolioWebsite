import Swal, { type SweetAlertOptions } from "sweetalert2";

type SwalOpts = SweetAlertOptions;

const RETRO_THEME: SwalOpts = {
  background: "#121212",
  color: "#E5E7EB",
  customClass: {
    popup: "retro-alert-popup",
    title: "retro-alert-title",
    htmlContainer: "retro-alert-body",
    confirmButton: "retro-alert-btn retro-alert-btn--confirm",
    cancelButton: "retro-alert-btn retro-alert-btn--cancel",
    denyButton: "retro-alert-btn retro-alert-btn--deny",
    actions: "retro-alert-actions",
    closeButton: "retro-alert-close",
  },
  buttonsStyling: false,
  showClass: {
    popup: "retro-alert-open",
  },
  hideClass: {
    popup: "retro-alert-close-anim",
  },
};

export function retroAlert(options: SwalOpts) {
  return Swal.fire({
    ...RETRO_THEME,
    ...options,
  } as SweetAlertOptions);
}

export function retroSuccess(title: string, text?: string) {
  return retroAlert({
    icon: "success",
    title,
    text,
    confirmButtonText: "OK",
  });
}

export function retroError(title: string, text?: string) {
  return retroAlert({
    icon: "error",
    title,
    text,
    confirmButtonText: "RETRY",
  });
}

export function retroConfirm(title: string, text?: string) {
  return retroAlert({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "CONFIRM",
    cancelButtonText: "CANCEL",
  });
}

export function notifyUser(title: string, text?: string) {
  return Swal.fire({
    background: "#121212",
    color: "#3B82F6",
    title,
    text,
    confirmButtonText: "OK",
    buttonsStyling: false,
    customClass: {
      popup: "notify-popup",
      title: "notify-title",
      htmlContainer: "notify-body",
      confirmButton: "notify-btn",
      actions: "notify-actions",
      closeButton: "notify-close",
    },
    showClass: {
      popup: "retro-alert-open",
    },
    hideClass: {
      popup: "retro-alert-close-anim",
    },
    iconHtml: `<div class="notify-checkmark">
      <svg width="40" height="40" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="4" height="4" fill="#3B82F6"/>
        <rect x="8" y="8" width="4" height="4" fill="#3B82F6"/>
        <rect x="10" y="6" width="4" height="4" fill="#3B82F6"/>
        <rect x="4" y="12" width="4" height="2" fill="#3B82F6"/>
        <rect x="2" y="10" width="4" height="2" fill="#3B82F6"/>
      </svg>
    </div>`,
    iconColor: "transparent",
  });
}

export function transmitSuccess() {
  return Swal.fire({
    background: "#121212",
    color: "#3B82F6",
    title: "DATA PACKET SENT",
    html: `
      <div class="transmit-success-body">
        <p style="color: #a0a0a0; font-size: 12px; margin-bottom: 16px;">
          Transmission complete. Packet delivered to uplink node.
        </p>
        <div class="transmit-progress-bar">
          <div class="transmit-progress-fill"></div>
        </div>
        <p style="color: #404040; font-size: 10px; margin-top: 8px;">
          UPLINK: ESTABLISHED | ENCRYPTION: AES-256 | STATUS: ACK
        </p>
      </div>
    `,
    confirmButtonText: "ACK",
    buttonsStyling: false,
    customClass: {
      popup: "transmit-popup",
      title: "transmit-title",
      htmlContainer: "transmit-body",
      confirmButton: "transmit-btn",
      actions: "transmit-actions",
    },
    showClass: {
      popup: "retro-alert-open",
    },
    hideClass: {
      popup: "retro-alert-close-anim",
    },
    didOpen: () => {
      const fill = document.querySelector(".transmit-progress-fill") as HTMLElement;
      if (fill) {
        fill.style.transition = "width 1.2s steps(20)";
        requestAnimationFrame(() => {
          fill.style.width = "100%";
        });
      }
    },
  });
}

export function transmitError() {
  return Swal.fire({
    background: "#121212",
    color: "#FF4141",
    title: "UPLINK ERROR",
    html: `
      <div class="transmit-error-body">
        <p style="color: #FF4141; font-size: 12px; margin-bottom: 12px;">
          Connection terminated. Data packet lost.
        </p>
        <div class="crt-flicker-block">
          <pre style="color: #FF4141; font-size: 10px; text-align: left; background: #121212; border: 1px solid #FF4141; padding: 8px; margin: 0;">
ERR 0x4F2A: CONNECTION_REFUSED
ERR 0x7B1C: PACKET_TIMEOUT
ERR 0x3E9D: UPLINK_UNREACHABLE
          </pre>
        </div>
        <p style="color: #404040; font-size: 10px; margin-top: 12px;">
          RETRY_COUNT: 0 | BACKOFF: EXPONENTIAL
        </p>
      </div>
    `,
    confirmButtonText: "RETRY",
    buttonsStyling: false,
    customClass: {
      popup: "transmit-popup transmit-popup--error",
      title: "transmit-title transmit-title--error",
      htmlContainer: "transmit-body",
      confirmButton: "transmit-btn transmit-btn--error",
      actions: "transmit-actions",
    },
    showClass: {
      popup: "retro-alert-open",
    },
    hideClass: {
      popup: "retro-alert-close-anim",
    },
  });
}
