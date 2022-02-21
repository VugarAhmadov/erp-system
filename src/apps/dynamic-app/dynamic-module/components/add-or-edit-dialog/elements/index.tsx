import React, { FC } from "react";

import {
  InputElement,
  SelectElement,
  DatepickerElement,
  ButtonElement,
  LabelElement,
  CheckboxElement,
  TableElement,
  RadioElement,
  TabElement,
  ImageElement,
  FileUploadElement,
  ProfileImageElement,
} from "apps/security/configuration/configurations/components/html-form-dialog/components/elements-with-dnd/components";

interface IElements {
  element: any;
}

export const Elements: FC<IElements> = ({ element }) => {
  return (
    <>
      {element.type === "input" && (
        <InputElement
          params={element.params}
          id={element.id}
          // dependedFieldData={
          //   element.params.dependedComponent === "select" && element.params.dependedModelName
          //     ? selectData.find((d) => d.model === element.params.dependedModelName)?.data
          //     : null
          // }
        />
      )}
      {element.type === "select" && (
        <SelectElement
          params={element.params}
          id={element.id}
          // onSelectChange={(data: any) => {
          //   setSelectData((prev) => {
          //     if (prev.find((p) => p.model === element.params.model)) {
          //       return prev.map((n) => (n.model === element.params.model ? { ...n, data } : n));
          //     } else {
          //       return [...prev, { model: element.params.model, data }];
          //     }
          //   });
          // }}
        />
      )}
      {element.type === "datepicker" && <DatepickerElement params={element.params} id={element.id} />}
      {element.type === "button" && <ButtonElement params={element.params} id={element.id} />}
      {element.type === "label" && <LabelElement params={element.params} id={element.id} />}
      {element.type === "checkbox" && <CheckboxElement params={element.params} id={element.id} />}
      {element.type === "table" && <TableElement params={element.params} id={element.id} />}
      {element.type === "radio" && <RadioElement params={element.params} id={element.id} />}
      {element.type === "tab" && <TabElement params={element.params} id={element.id} />}
      {element.type === "image" && (
        <ImageElement
          params={element.params}
          id={element.id}
          // dependedFieldData={
          //   element.params.dependedComponent === "select" && element.params.dependedModelName
          //     ? selectData.find((d) => d.model === element.params.dependedModelName)?.data
          //     : null
          // }
        />
      )}
      {element.type === "fileUpload" && <FileUploadElement params={element.params} id={element.id} />}
      {element.type === "profileImage" && <ProfileImageElement params={element.params} id={element.id} />}
    </>
  );
};
