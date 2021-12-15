export const a11yProps = (index: number | string) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
});
