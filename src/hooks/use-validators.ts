import i18n from "translation";

export const useValidators = () => {
  const required = (value: any) => (value?.toString().trim().length ? undefined : i18n.t("forms:required"));

  const maxLength = (length: number) => (value: any) =>
    value && value?.toString().length > length ? i18n.t("forms:maxLength", { length }) : undefined;

  return {
    required,
    maxLength,
  };
};
