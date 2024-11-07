export const getAccessTokenFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined" ? localStorage.getItem("saman-user") : null;
  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;
  return response?.token;
};

export const logout = () => {
  typeof window !== "undefined" && localStorage.removeItem("book-my-hub");
  window.location.replace("/");
};

export const getUserIdFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined" ? localStorage.getItem("saman-user") : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response?.id;
};

export const setRegisterResponseToLocalStorage = (data: any) =>
  localStorage.setItem("registerresponse", JSON.stringify(data));

export const getRegisterResponseFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("registerresponse")
      : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;
  return response;
};

export const removeRegisterResponseFromLocalStorage = () =>
  localStorage.removeItem("registerresponse");

export const setUserCredentialsToLocalStorage = (data: any) => {
  localStorage.setItem("userCredentials", JSON.stringify(data));
};

export const getUserCredentialsFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("userCredentials")
      : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response;
};

export const removeUserCredentialFromLocalStorage = () =>
  localStorage.removeItem("userCredentials");

export const setUserDataToLocalStorage = (data: any) => {
  localStorage.setItem("book-my-hub-user", JSON.stringify(data));
};

export const getUserDataFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("book-my-hub-user")
      : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response;
};

export const setResetPasswordLocalStorage = (data: any) => {
  localStorage.setItem("resetPassword-token", JSON.stringify(data));
};

export const getResetPasswordFromLocalStorage = () => {
  const response =
    typeof window !== "undefined"
      ? localStorage.getItem("resetPassword-token")
      : null;
  return response;
};

export const setemailLocalStorage = (data: any) => {
  localStorage.setItem("email", JSON.stringify(data));
};

export const getemailFromLocalStorage = () => {
  const response =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;
  return response;
};
export const removeemailFromLocalStorage = () =>
  localStorage.removeItem("email");

export const removeResetPasswordLocalStorage = (data: any) => {
  localStorage.removeItem("resetPassword-token");
};
export const removeUserDataFromLocalStorage = () =>
  localStorage.removeItem("book-my-hub-user");

export const setForgotPasswordResponseToLocalStorage = (data: any) =>
  localStorage.setItem("forgotpasswordresponse", JSON.stringify(data));

export const getForgotPasswordResponseFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("forgotpasswordresponse")
      : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response;
};

export const removeForgotPasswordResponseFromLocalStorage = () =>
  localStorage.removeItem("forgotpasswordresponse");

export const setPhoneToLocalStorage = (data: any) =>
  localStorage.setItem("phone", JSON.stringify(data));

export const getPhoneFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined" ? localStorage.getItem("phone") : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response;
};

export const removePhoneFromLocalStorage = () =>
  localStorage.removeItem("phone");

export const setForgotPasswordOtpResponseToLocalStorage = (data: any) =>
  localStorage.setItem("forgotpasswordotpresponse", JSON.stringify(data));

export const getForgotPasswordOtpResponseFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("forgotpasswordotpresponse")
      : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response;
};

export const removeForgotPasswordOtpResponseFromLocalStorage = () =>
  localStorage.removeItem("forgotpasswordotpresponse");

export const sethotelInfoToLocalStorage = (data: any) => {
  localStorage.setItem("hotelInfo", JSON.stringify(data));
};

export const gethotelInfoFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined" ? localStorage.getItem("hotelInfo") : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response;
};
export const removehotelInfoFromLocalStorage = () =>
  localStorage.removeItem("hotelInfo");

export const setAuthTokenToLocalStorage = (data: any) => {
  localStorage.setItem("book-my-hub-authToken", JSON.stringify(data));
};

export const getAuthTokenFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("book-my-hub-authToken")
      : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response;
};

export const removeAuthTokenFromLocalStorage = () => {
  localStorage.removeItem("book-my-hub-authToken");
};
export const setrefreshTokenToLocalStorage = (data: any) => {
  localStorage.setItem("book-my-hub-refreshToken", JSON.stringify(data));
};

export const getrefreshTokenFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("book-my-hub-refreshToken")
      : null;

  const response =
    typeof storedItem === "string" ? JSON.parse(storedItem) : null;

  return response;
};

export const removerefreshTokenFromLocalStorage = () => {
  localStorage.removeItem("book-my-hub-refreshToken");
};

export const setotpforgotpasswordlLocalStorage = (data: any) => {
  typeof window !== "undefined" &&
    localStorage.setItem("otp-forgotpassword", JSON.stringify(data));
};

export const getotpforgotpasswordFromLocalStorage = () => {
  const response =
    typeof window !== "undefined"
      ? localStorage.getItem("otp-forgotpassword")
      : null;
  return response;
};
export const removeotpforgotpasswordFromLocalStorage = () =>
  localStorage.removeItem("otp-forgotpassword");

export const setCategoryDataTOLocalStorage = (data: any) => {
  localStorage.setItem("categoryData", JSON.stringify(data));
};

export const getCategoryDataFromLocalStorage = () => {
  const storedItem =
    typeof window !== "undefined"
      ? localStorage.getItem("categoryData")
      : null;
  const response =
    typeof storedItem =="string" ? JSON.parse(storedItem) : null;

  return response;
};
export const removeCategoryDataFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("categoryData");
  }
};
