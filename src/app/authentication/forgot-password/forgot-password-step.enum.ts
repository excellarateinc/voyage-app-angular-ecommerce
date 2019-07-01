export enum ForgotPasswordStep {
  VerifyUser = 0,
  VerifySecurityCode = 1,
  // skipping 2 because security answers aren't built.
  ResetPassword = 3
}
