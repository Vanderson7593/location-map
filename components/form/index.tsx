import TextField from "../atom/textfield";
import { FC, useState } from "react";
import { IAddress, IForm } from "@types";
import { Formik, Form as FormikForm, Field, FormikProps } from "formik";
import { EForm } from "@constants";
import { Button, Grid } from "@mui/material";
import AutoComplete from "components/atom/autocomplete";
import { createLocation } from "services/map";
import { useAppSelector } from "redux/hooks";
import { appSelector } from "redux/app/app.selectors";
import * as yup from "yup";

const INITIAL_VALUES = {
  [EForm.Name]: "",
  [EForm.CPF]: "",
  [EForm.Message]: "",
  [EForm.Email]: "",
};

const Form: FC = () => {
  const { address, shapes } = useAppSelector(appSelector);

  const handleSubmit = (values: Omit<IForm, "address">) => {
    alert("Open console to see the form data!");
    console.log({
      ...values,
      address,
      shapes: shapes?.map((x) => x.coordinates),
    });
    /* SEND DATA TO API
    try {
      const res = createLocation({
        ...values,
        address: address as IAddress,
      });
    } catch (error: any) {
      alert(error.message);
    }
    */
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Obrigatório"),
    cpf: yup
      .string()
      .required("Obrigatório")
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido"),
    email: yup
      .string()
      .email("E-mail inválido.")
      .required("O campo é obrigatório."),
    message: yup.string().required("Obrigatório"),
  });

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
      >
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
                placeholder="Ex.: [xxx.xxx.xxx-xx]"
                inputProps={{ maxLength: 14 }}
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
              <Field name="address" component={AutoComplete} />
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
      </Formik>
    </>
  );
};

export default Form;
