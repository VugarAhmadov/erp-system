import React, { useState } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Autocomplete } from "components/shared";
import { AppState } from "store";
import { Checkbox, createFilterOptions, InputAdornment } from "@mui/material";
// import { AutocompleteData } from "components/shared/form/autocomplete";
import { StyledForm } from "./all-view-form.styled";

export const AllViewForm = () => {
  const { t } = useTranslation("common");
  const views = useSelector((state: AppState) => state.views?.views);
  const loading = useSelector((state: AppState) => state.views.loading.getAll);

  // const filter = createFilterOptions();
  const [selectedDatas, setSelectedDatas] = useState<any[]>([]);

  return (
    <Form
      onSubmit={(data) => console.log(data)}
      // initialValues={initialValues}
      render={({ handleSubmit, values }) => (
        <StyledForm onSubmit={handleSubmit}>
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
            className="views"
            loading={loading}
            required
          />
          <Autocomplete
            label="Choose at least one planet"
            name="planet"
            multiple={true}
            required
            options={views
              ?.filter((view) => view.name === values.view)[0]
              ?.columns?.map((column) => ({
                label: column.name,
                value: column.name,
                inputValue: false,
              }))}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            disableCloseOnSelect={true}
            renderOption={(props, option, { selected }) =>
              option.inputValue ? (
                option.label
              ) : (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )
            }
            // helperText={helperText}
            freeSolo={true}
            onChange={(_event, newValue, reason, details) => {
              if (newValue && reason === "selectOption" && details?.option.inputValue) {
                // Create a new value from the user input
                console.log(details);
                setSelectedDatas([
                  ...selectedDatas,
                  {
                    value: details?.option.inputValue,
                    label: details?.option.inputValue,
                  },
                ]);
              }
            }}
            // filterOptions={(options, params) => {
            // const filtered = filter(options, params);
            // // Suggest the creation of a new value
            // if (params.inputValue !== "") {
            //   filtered.push({
            //     inputValue: params.inputValue,
            //     label: `Add "${params.inputValue}"`,
            //     value: params.inputValue,
            //   });
            // }
            // return filtered;
            // }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
          />
        </StyledForm>
      )}
    />
  );
};
