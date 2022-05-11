import TextField from "../atom/textfield";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { IForm } from "@types";
import { Formik, Form as FormikForm, Field, FormikProps } from "formik";
import { EForm } from "@constants";
import { Grid } from "@mui/material";
import { useMemo } from "react";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import AutoComplete from "components/atom/autocomplete";

const INITIAL_VALUES = {
  [EForm.Name]: "",
  [EForm.CPF]: "",
  [EForm.Message]: "",
  [EForm.Email]: "",
};

const Form: FC = () => {
  const [address, setAddress] = useState<string>("");

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => console.log(values)}
      >
        {(formikProps: FormikProps<Omit<IForm, "address">>) => (
          <FormikForm>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Field
                  label="Name"
                  name="name"
                  component={TextField}
                  placeholder="Name"
                />
              </Grid>
              <Grid item>
                <Field
                  label="CPF"
                  name="cpf"
                  component={TextField}
                  placeholder="CPF"
                />
              </Grid>
              <Grid item>
                <Field
                  label="Email"
                  name="email"
                  component={TextField}
                  placeholder="Email"
                />
              </Grid>
              <Grid item>
                <AutoComplete />
              </Grid>
              <Grid item>
                <Field
                  label="Message"
                  name="message"
                  component={TextField}
                  placeholder="Message"
                  multiline
                  rows={6}
                />
              </Grid>
            </Grid>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default Form;
