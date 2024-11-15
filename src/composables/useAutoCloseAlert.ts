import { ref, computed } from "vue";

export function useAutoCloseAlert(duration = 3000) {
  const showAlert = ref(false);
  const alertMessage = ref("");
  const alertType = ref("info"); // Possible values: "info", "success", "warning", "error"

  const triggerAlert = (message: string, type: string = "info") => {
    alertMessage.value = message;
    alertType.value = type;
    showAlert.value = true;

    setTimeout(() => {
      showAlert.value = false;
    }, duration);
  };

  const isAlertVisible = computed(() => showAlert.value);

  return {
    isAlertVisible,
    alertMessage,
    alertType,
    triggerAlert,
  };
}
