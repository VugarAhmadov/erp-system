import i18n from "translation";

export const useValidators = () => {
  const required = (value: any) => (value?.toString().trim().length ? undefined : i18n.t("forms:required"));

  const maxLength = (length: number) => (value: any) =>
    value && value?.toString().length > length ? i18n.t("forms:maxLength", { length }) : undefined;

  // const validUrl = (value: any) => (value && value.split("/").map((v: any) => v[0] ? undefined : i18n.t("forms:validUrl"));

  return {
    required,
    maxLength,
    // validUrl,
  };
};
