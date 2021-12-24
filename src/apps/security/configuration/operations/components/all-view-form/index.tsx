import React from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Autocomplete } from "components/shared";
import { AppState } from "store";
import { Checkbox } from "@mui/material";

export const AllViewForm = () => {
  const { t } = useTranslation("common");
  const views = useSelector((state: AppState) => state.views.views);

  return (
    <Form
      onSubmit={(data) => console.log(data)}
      // initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form className="form" onSubmit={handleSubmit}>
          <Autocomplete
            name="view"
            id="view"
            label={t("views")}
            options={views.map((view) => ({
              label: view.name,
              value: view.name,
            }))}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            // loading={loading.getCities}
            // onChange={(e, selectedOption: any) => {
            //   if (selectedOption) {
            //     dispatch(getDistricts(selectedOption.value));
            //   }
            // }}
          />
          {/* <Autocomplete
            // key={key++}
            label="Choose at least one planet"
            name="planet"
            multiple={true}
            // required={required.planet}
            options={views.map((view) => ({
              label: view.name,
              value: view.name,
            }))}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            disableCloseOnSelect={true}
            renderOption={(props, option, { selected }) => (
              // option.inputValue ? (
              //   option.label
              // ) :
              <li {...props}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.label}
              </li>
            )}
            // helperText={helperText}
            freeSolo={true}
            onChange={(_event, newValue, reason, details) => {
              // if (newValue && reason === "selectOption" && details?.option.inputValue) {
              //   // Create a new value from the user input
              //   autocompleteData.push({
              //     value: details?.option.inputValue,
              //     label: details?.option.inputValue,
              //   });
              // }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              // Suggest the creation of a new value
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  label: `Add "${params.inputValue}"`,
                  value: params.inputValue,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            textFieldProps={{
              InputProps: {
                startAdornment: <InputAdornment position="start">🪐</InputAdornment>,
                endAdornment: <InputAdornment position="end">🪐</InputAdornment>,
              },
            }}
          /> */}
        </form>
      )}
    />
  );
};
