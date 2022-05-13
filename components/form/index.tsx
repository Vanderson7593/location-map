import TextField from "../atom/textfield";
import { FC, useState } from "react";
import { IForm } from "@types";
import { Formik, Form as FormikForm, Field, FormikProps } from "formik";
import { EForm } from "@constants";
import { Button, Grid } from "@mui/material";
import AutoComplete from "components/atom/autocomplete";

const INITIAL_VALUES = {
  [EForm.Name]: "",
  [EForm.CPF]: "",
  [EForm.Message]: "",
  [EForm.Email]: "",
};

const Form: FC = () => {
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (values: Partial<IForm>) => {
    console.log(values);
  };

  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        {(formikProps: FormikProps<Partial<IForm>>) => (
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
              <Grid item>
                <Button type="submit" variant="contained" size="large">
                  Submit Form
                </Button>
              </Grid>
            </Grid>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default Form;
