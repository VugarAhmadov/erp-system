import i18n from "translation";

export const useValidators = () => {
  const required = (value: any) => (value?.toString().trim().length ? undefined : i18n.t("translations:form.required"));

  const maxLength = (length: number) => (value: any) =>
    value && value?.toString().length > length ? i18n.t("translations:form.maxLength", { length }) : undefined;

  return {
    required,
    maxLength,
  };
};
