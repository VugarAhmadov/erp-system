export const a11yProps = (index: number | string) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
});

export const isNotNull = (obj?: {}) => {
  if (obj) {
    return Object.keys(obj).length > 0;
  } else {
    return false;
  }
};
