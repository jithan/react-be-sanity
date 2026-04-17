export const resolveField = (field, lang = "en") => {
  if (!field) return "";

  // Array (translations)
  if (Array.isArray(field)) {
    return field.find((f) => f.language === lang)?.value || "";
  }

  // Object
  if (typeof field === "object") {
    if (field.value) return field.value;
  }

  return field;
};