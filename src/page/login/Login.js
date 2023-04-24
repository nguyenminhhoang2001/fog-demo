import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import "/Users/Admin/Desktop/workspace/vti/react vti/e-commerce-app/src/page/login/login.scss";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { accountApi } from "../../API/accountApi";

export default function Login() {
  const { t, i18n } = useTranslation(["login"]);

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const schema = yup
    .object({
      email: yup
        .string()
        .required(t("validateEmail"))
        .matches(emailRegex, t("validateEmail")),

      password: yup
        .string()
        .required(t("validatePassword"))
        .min(6, t("validatePasswordMin")),
    })
    .required();

  const theme = createTheme();
  const [language, setLanguage] = React.useState("vi");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const handleChange = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };
  const onSubmit = (data) => {
    // login(data);
    console.log(data);
  };
  const login = async (account) => {
    let res = await accountApi.Login(account);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: 10,
              }}
            >
              <Box sx={{ width: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t("language")}
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label={t("language")}
                    onChange={handleChange}
                  >
                    <MenuItem value={"vi"}>vi</MenuItem>
                    <MenuItem value={"en"}>en</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t("Sign in")}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label={t("email")}
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                  })}
                  helperText={errors.email?.message}
                  error={!!errors.email?.type}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t("password")}
                  {...register("password", { required: true })}
                  helperText={errors.password?.message}
                  error={!!errors.password?.type}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t("Sign in")}
                </Button>

                <Grid container className="link">
                  <Grid item>
                    <NavLink to="/register">{t("register")}</NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
