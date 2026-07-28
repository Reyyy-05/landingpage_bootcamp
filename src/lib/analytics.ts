import { sendGAEvent } from "@next/third-parties/google";
import { logger } from "@/lib/logger";

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

export const analytics = {
  trackPageView(path: string): void {
    logger.info(`Page View: ${path}`, "Analytics");
    try {
      sendGAEvent({ event: "page_view", value: { page_path: path } });
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "PageView");
      }
    } catch (err) {
      logger.warn("Failed to log PageView event", "Analytics", err);
    }
  },

  trackCTA(ctaName: string, location: string): void {
    logger.info(`CTA Clicked: ${ctaName} @ ${location}`, "Analytics");
    try {
      sendGAEvent({
        event: "cta_click",
        value: { cta_name: ctaName, cta_location: location },
      });
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("trackCustom", "CTAClick", { ctaName, location });
      }
    } catch (err) {
      logger.warn("Failed to log CTA click event", "Analytics", err);
    }
  },

  trackFormStart(programId?: string): void {
    logger.info(`Registration Form Interaction Started`, "Analytics", { programId });
    try {
      sendGAEvent({
        event: "form_start",
        value: { form_name: "student_registration", program_id: programId },
      });
    } catch (err) {
      logger.warn("Failed to log FormStart event", "Analytics", err);
    }
  },

  trackFormSubmit(programId: string): void {
    logger.info(`Registration Form Submitted for ${programId}`, "Analytics");
    try {
      sendGAEvent({
        event: "form_submit",
        value: { form_name: "student_registration", program_id: programId },
      });
    } catch (err) {
      logger.warn("Failed to log FormSubmit event", "Analytics", err);
    }
  },

  trackSuccess(programName: string, price = 750000): void {
    logger.info(`Registration Completed for ${programName}`, "Analytics", { price });
    try {
      sendGAEvent({
        event: "bootcamp_registration_success",
        value: {
          program: programName,
          price,
          currency: "IDR",
        },
      });
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: programName,
          value: price,
          currency: "IDR",
        });
      }
    } catch (err) {
      logger.warn("Failed to log RegistrationSuccess event", "Analytics", err);
    }
  },

  trackVoucherCheck(code: string, isValid: boolean, discountLabel?: string): void {
    logger.info(`Voucher Validation Attempt: ${code} (Valid: ${isValid})`, "Analytics");
    try {
      sendGAEvent({
        event: "voucher_validation",
        value: { voucher_code: code, is_valid: isValid, discount: discountLabel ?? "N/A" },
      });
    } catch (err) {
      logger.warn("Failed to log VoucherCheck event", "Analytics", err);
    }
  },

  trackWhatsAppRedirect(registrationId: string): void {
    logger.info(`WhatsApp Confirmation Initiated for ${registrationId}`, "Analytics");
    try {
      sendGAEvent({
        event: "whatsapp_redirect_click",
        value: { registration_id: registrationId },
      });
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("trackCustom", "WhatsAppRedirect", { registrationId });
      }
    } catch (err) {
      logger.warn("Failed to log WhatsAppRedirect event", "Analytics", err);
    }
  },

  trackFAQToggle(question: string, isOpen: boolean): void {
    logger.info(`FAQ Toggled: "${question}" (Open: ${isOpen})`, "Analytics");
    try {
      sendGAEvent({
        event: "faq_toggle",
        value: { question, is_open: isOpen },
      });
    } catch (err) {
      logger.warn("Failed to log FAQToggle event", "Analytics", err);
    }
  },

  trackValidationError(fieldName: string, errorMessage: string): void {
    logger.info(`Form Validation Failure on [${fieldName}]: ${errorMessage}`, "Analytics");
    try {
      sendGAEvent({
        event: "form_validation_error",
        value: { field: fieldName, error: errorMessage },
      });
    } catch (err) {
      logger.warn("Failed to log ValidationError event", "Analytics", err);
    }
  },

  trackApiError(endpoint: string, statusCode: number, errorMessage: string): void {
    logger.error(`API Failure on [${endpoint}] (HTTP ${statusCode}): ${errorMessage}`, "Analytics");
    try {
      sendGAEvent({
        event: "api_error",
        value: { endpoint, status_code: statusCode, error: errorMessage },
      });
    } catch (err) {
      logger.warn("Failed to log ApiError event", "Analytics", err);
    }
  },
};
