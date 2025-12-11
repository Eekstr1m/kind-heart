import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Paper from "@mui/material/Paper";
import { Grow } from "@mui/material";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GiClothes } from "react-icons/gi";
import { FaWallet } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoHandRight, IoCloseOutline } from "react-icons/io5";
import type { IconType } from "react-icons";
import { useTheme } from "@mui/material/styles";
import { validationSchema } from "./validationSchema";

const helpTypes = [
  { id: "do", label: "Зробити", icon: IoHandRight },
  { id: "financial", label: "Фінансова допомога", icon: FaWallet },
  { id: "material", label: "Матеріальна допомога", icon: GiClothes },
  { id: "volunteer", label: "Волонтерство", icon: FaHeart },
];

const paymentMethods = [
  { id: "visa", label: "VISA", hint: "Visa/MasterCard" },
  { id: "privat24", label: "Приват24", hint: "Приват24" },
  { id: "terminal", label: "Термінали України", hint: "Термінали України" },
  { id: "webmoney", label: "WebMoney", hint: "WebMoney" },
  { id: "paypal", label: "PayPal", hint: "PayPal" },
];

interface HelpTypeButtonProps {
  label: string;
  icon: IconType;
  active: boolean;
  onClick: () => void;
}

function HelpTypeButton({ label, icon, active, onClick }: HelpTypeButtonProps) {
  const Icon = icon;
  const theme = useTheme();
  const words = label.split(/\s+/).filter(Boolean);

  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,

          borderRadius: "12px",
          border: `3px solid ${
            active ? theme.palette.primary.light : theme.palette.grey[100]
          }`,
          backgroundColor: active ? theme.palette.primary.light : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: active ? "#fff" : theme.palette.grey[100],
          transition: "all 0.3s ease",
        }}
      >
        <Icon size={32} />
      </Box>
      <Typography
        variant="h6"
        fontWeight={active ? "800" : "600"}
        sx={(theme) => ({
          color: active
            ? theme.palette.secondary.dark
            : theme.palette.grey[100],
          lineHeight: 1.1,
        })}
      >
        {words.map((w, i) => (
          <span key={i}>
            {w}
            {i < words.length - 1 && <br />}
          </span>
        ))}
      </Typography>
    </Box>
  );
}

export default function HelpDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const theme = useTheme();

  return (
    <>
      {/* <Button onClick={handleClickOpen} variant="contained">
        Відкрити форму
      </Button> */}
      <Dialog
        open={open}
        scroll="body"
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        slots={{ transition: Grow }}
        transitionDuration={{
          enter: 400,
          exit: 300,
        }}
        slotProps={{
          backdrop: {
            sx: {
              animation: "fadeIn 0.3s ease-in-out",
            },
          },
        }}
        // Animation
        sx={{
          borderRadius: "16px",
          maxHeight: "100vh",
          overflow: "auto",
          animation: "bounceInUp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          "@keyframes bounceInUp": {
            "0%": {
              opacity: 0,
              transform: "translateY(100px)",
            },
            "50%": {
              opacity: 1,
              transform: "translateY(-10px)",
            },
            "70%": {
              transform: "translateY(5px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
          "@keyframes fadeIn": {
            from: {
              opacity: 0,
            },
            to: {
              opacity: 1,
            },
          },
        }}
      >
        <DialogContent
          sx={{
            p: 4,
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: theme.palette.grey[100],
            }}
          >
            <IoCloseOutline size={24} />
          </IconButton>
          <Form />
        </DialogContent>
      </Dialog>
    </>
  );
}

function Form() {
  const theme = useTheme();
  console.log("render form");

  interface FormValues {
    personType: string;
    firstName: string;
    lastName: string;
    organization: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    state: string;
    address: string;
    postalCode: string;
    helpType: string;
    paymentMethod: string;
    cardNumber1: string;
    cardNumber2: string;
    cardNumber3: string;
    cardNumber4: string;
    expiryDate: string;
    cvv: string | undefined;
  }

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema) as any,
    mode: "onSubmit",
    defaultValues: {
      personType: "individual",
      firstName: "",
      lastName: "",
      organization: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      state: "",
      address: "",
      postalCode: "",
      helpType: "financial",
      paymentMethod: "privat24",
      cardNumber1: "",
      cardNumber2: "",
      cardNumber3: "",
      cardNumber4: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const helpTypeValue = watch("helpType");
  const isFinancialHelp = helpTypeValue === "financial";

  const formatExpiryDate = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.slice(0, 4);
    if (formattedValue.length > 2) {
      return formattedValue.slice(0, 2) + " / " + formattedValue.slice(2);
    }
    return formattedValue;
  };

  const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
    console.log("Form submitted:", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight={800}
        textAlign="center"
        sx={{
          mb: 3,
          color: theme.palette.secondary.dark,
        }}
      >
        Заповніть форму
      </Typography>

      {/* Person Type Toggle */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Controller
          name="personType"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              value={field.value}
              exclusive
              onChange={(_, newValue) => {
                if (newValue) {
                  field.onChange(newValue);
                }
              }}
              sx={{
                "& .MuiToggleButton-root": {
                  px: 3,
                  py: 1,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  borderColor: theme.palette.grey[100],
                  color: theme.palette.secondary.dark,
                  backgroundColor: "#fff",
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.secondary.dark,
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.dark,
                    },
                  },
                },
              }}
            >
              <ToggleButton value="individual">Фіз. особа</ToggleButton>
              <ToggleButton value="organization">Юр. особа</ToggleButton>
            </ToggleButtonGroup>
          )}
        />
      </Box>

      {/* Form Fields - Two Columns */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Left Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <Box>
              <InputLabel
                htmlFor="firstName"
                sx={{
                  mb: 0.5,
                  fontWeight: 600,
                  color: theme.palette.secondary.dark,
                }}
              >
                Ім'я
              </InputLabel>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="firstName"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.palette.grey[100],
                        "& fieldset": {
                          borderColor: theme.palette.grey[100],
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
            <Box>
              <InputLabel
                htmlFor="lastName"
                sx={{
                  mb: 0.5,
                  fontWeight: 600,
                  color: theme.palette.secondary.dark,
                }}
              >
                Прізвище
              </InputLabel>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="lastName"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.palette.grey[100],
                        "& fieldset": {
                          borderColor: theme.palette.grey[100],
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box>
            <InputLabel
              htmlFor="organization"
              sx={{
                mb: 0.5,
                fontWeight: 600,
                color: theme.palette.secondary.dark,
              }}
            >
              Назва компанії, організації
            </InputLabel>
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
              <Controller
                name="organization"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="organization"
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.palette.grey[100],
                        "& fieldset": {
                          borderColor: theme.palette.grey[100],
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box>
            <InputLabel
              htmlFor="email"
              sx={{
                mb: 0.5,
                fontWeight: 600,
                color: theme.palette.secondary.dark,
              }}
            >
              Email-адрес
            </InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  size="small"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.palette.grey[100],
                      "& fieldset": {
                        borderColor: theme.palette.grey[100],
                      },
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box>
            <InputLabel
              htmlFor="phone"
              sx={{
                mb: 0.5,
                fontWeight: 600,
                color: theme.palette.secondary.dark,
              }}
            >
              Номер телефону
            </InputLabel>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  size="small"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.palette.grey[100],
                      "& fieldset": {
                        borderColor: theme.palette.grey[100],
                      },
                    },
                  }}
                />
              )}
            />
          </Box>
        </Box>

        {/* Right Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <InputLabel
              htmlFor="country"
              sx={{
                mb: 0.5,
                fontWeight: 600,
                color: theme.palette.secondary.dark,
              }}
            >
              Країна
            </InputLabel>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="country"
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  size="small"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.palette.grey[100],
                      "& fieldset": {
                        borderColor: theme.palette.grey[100],
                      },
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <Box>
              <InputLabel
                htmlFor="city"
                sx={{
                  mb: 0.5,
                  fontWeight: 600,
                  color: theme.palette.secondary.dark,
                }}
              >
                Місто
              </InputLabel>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="city"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.palette.grey[100],
                        "& fieldset": {
                          borderColor: theme.palette.grey[100],
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
            <Box>
              <InputLabel
                htmlFor="state"
                sx={{
                  mb: 0.5,
                  fontWeight: 600,
                  color: theme.palette.secondary.dark,
                }}
              >
                Штат, район
              </InputLabel>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="state"
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.palette.grey[100],
                        "& fieldset": {
                          borderColor: theme.palette.grey[100],
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box>
            <InputLabel
              htmlFor="address"
              sx={{
                mb: 0.5,
                fontWeight: 600,
                color: theme.palette.secondary.dark,
              }}
            >
              Адреса
            </InputLabel>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="address"
                  size="small"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.palette.grey[100],
                      "& fieldset": {
                        borderColor: theme.palette.grey[100],
                      },
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box>
            <InputLabel
              htmlFor="postalCode"
              sx={{
                mb: 0.5,
                fontWeight: 600,
                color: theme.palette.secondary.dark,
              }}
            >
              Поштовий індекс
            </InputLabel>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="postalCode"
                  size="small"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme.palette.grey[100],
                      "& fieldset": {
                        borderColor: theme.palette.grey[100],
                      },
                    },
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </Box>

      {/* Types of Help Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight={800}
          textAlign="center"
          sx={{
            mb: 1,
            color: theme.palette.secondary.dark,
          }}
        >
          Види допомоги
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            mb: 3,
            color: theme.palette.grey[100],
          }}
        >
          Ви можете змінити вид допомоги
        </Typography>
        <Box
          sx={(theme) => ({
            display: "grid",
            justifyContent: "center",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 3,
            flexWrap: "wrap",
            [theme.breakpoints.down("lg")]: {
              gridTemplateColumns: "1fr 1fr",
            },
            [theme.breakpoints.down("sm")]: {
              gridTemplateColumns: "1fr",
            },
          })}
        >
          {helpTypes.map((type) => (
            <Controller
              key={type.id}
              name="helpType"
              control={control}
              render={({ field }) => (
                <HelpTypeButton
                  label={type.label}
                  icon={type.icon}
                  active={field.value === type.id}
                  onClick={() => field.onChange(type.id)}
                />
              )}
            />
          ))}
        </Box>
      </Box>

      {/* Payment Section - Only shown when Financial Help is selected */}
      {isFinancialHelp && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Payment Methods */}
          <Box>
            <InputLabel
              sx={{
                mb: 2,
                fontWeight: 600,
                color: theme.palette.secondary.dark,
              }}
            >
              Спосіб оплати
            </InputLabel>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                },
                gap: 2,
              }}
            >
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <>
                    {paymentMethods.map((method) => (
                      <Paper
                        key={method.id}
                        onClick={() => field.onChange(method.id)}
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          textAlign: "center",
                          cursor: "pointer",
                          border: `2px solid ${
                            field.value === method.id
                              ? theme.palette.primary.light
                              : theme.palette.grey[100]
                          }`,
                          backgroundColor:
                            field.value === method.id
                              ? theme.palette.primary.light
                              : theme.palette.grey[100],
                          color: "#fff",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: theme.palette.primary.light,
                            boxShadow: 2,
                          },
                        }}
                      >
                        <Typography variant="body2" fontWeight={700}>
                          {method.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mt: 0.5 }}
                        >
                          {method.hint}
                        </Typography>
                      </Paper>
                    ))}
                  </>
                )}
              />
            </Box>
            {errors.paymentMethod && (
              <Typography
                variant="caption"
                sx={{ color: "error.main", display: "block", mt: 1 }}
              >
                {errors.paymentMethod.message}
              </Typography>
            )}
          </Box>

          {/* Card Details */}
          <Box>
            <InputLabel
              sx={{
                mb: 2,
                fontWeight: 600,
                color: theme.palette.secondary.dark,
              }}
            >
              Введіть наступні данні
            </InputLabel>
            <Box
              sx={{
                backgroundColor: theme.palette.grey[100],
                borderRadius: "12px",
                p: 3,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <InputLabel
                  htmlFor="cardNumber"
                  sx={{ mb: 1, color: "#fff", fontWeight: 600 }}
                >
                  Номер карти
                </InputLabel>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 1,
                  }}
                >
                  {[1, 2, 3, 4].map((num) => (
                    <Controller
                      key={num}
                      name={`cardNumber${num}` as keyof FormValues}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id={`cardNumber${num}`}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);
                            field.onChange(value);
                          }}
                          error={
                            !!errors[`cardNumber${num}` as keyof FormValues]
                          }
                          size="small"
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "#fff",
                              "& fieldset": {
                                borderColor: "#fff",
                              },
                            },
                          }}
                          slotProps={{
                            htmlInput: {
                              maxLength: 4,
                              inputMode: "numeric",
                            },
                          }}
                        />
                      )}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel
                    htmlFor="expiryDate"
                    sx={{ mb: 1, color: "#fff", fontWeight: 600 }}
                  >
                    Термін дії
                  </InputLabel>
                  <Controller
                    name="expiryDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="expiryDate"
                        onChange={(e) => {
                          field.onChange(formatExpiryDate(e.target.value));
                        }}
                        error={!!errors.expiryDate}
                        helperText={errors.expiryDate?.message}
                        size="small"
                        variant="outlined"
                        placeholder="MM / YY"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#fff",
                            "& fieldset": {
                              borderColor: "#fff",
                            },
                          },
                        }}
                        slotProps={{
                          htmlInput: {
                            maxLength: 7,
                          },
                        }}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel
                    htmlFor="cvv"
                    sx={{ mb: 1, color: "#fff", fontWeight: 600 }}
                  >
                    CVC/CVV
                  </InputLabel>
                  <Controller
                    name="cvv"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="cvv"
                        error={!!errors.cvv}
                        helperText={errors.cvv?.message}
                        size="small"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#fff",
                            "& fieldset": {
                              borderColor: "#fff",
                            },
                          },
                        }}
                        slotProps={{
                          htmlInput: {
                            maxLength: 3,
                            inputMode: "numeric",
                          },
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 700,
            borderRadius: "12px",
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            color: "#fff",
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              scale: 1.1,
            },
          }}
        >
          Допомогти
        </Button>
      </Box>
    </form>
  );
}
