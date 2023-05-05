import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { accountApi } from "../../API/accountApi";
const theme = createTheme();
export default function Register() {
  const { t } = useTranslation(["register"]);
  const navigate = useNavigate();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const schema = yup
    .object({
      name: yup.string().required(t("fullname")),
      email: yup
        .string()
        .required(t("validateEmail"))
        .matches(emailRegex, t("@gmail")),
      password: yup
        .string()
        .required(t("validatePassword"))
        .min(6, t("validatePasswordMin")),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    const arr = { ...data, role: "user", avata: "" };
    SignUp(arr);
  };
  const SignUp = async (account) => {
    try {
      let res = await accountApi.register(account);
      navigate("/login");
    } catch (error) {}
  };
  console.log(errors);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("sign up")}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label={t("name")}
                  name="name"
                  {...register("name", {
                    required: true,
                  })}
                  autoComplete="name"
                  error={!!errors?.name?.type}
                  helperText={errors?.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t("email")}
                  {...register("email", {
                    required: true,
                  })}
                  name="email"
                  autoComplete="email"
                  error={!!errors?.email?.type}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t("password")}
                  {...register("password", {
                    required: true,
                  })}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors?.password?.type}
                  helperText={errors?.password?.message}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("sign up")}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login">{t("link")}</NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
