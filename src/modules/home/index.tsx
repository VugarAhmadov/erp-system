import React from "react";
import { Form } from "react-final-form";
import { TextField } from "components/shared";
import { useValidators } from "hooks";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { required, maxLength } = useValidators();
  const { t } = useTranslation("translations", { keyPrefix: "common" });

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <Form
        onSubmit={(data: any) => console.log(data)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField name="name" id="name" validate={[required, maxLength(5)]} />
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </div>
  );
};
