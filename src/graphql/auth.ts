import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
    query($input: LoginRequest) {
      login(input: $input) {
          responseCode
          data
      }
    }
`;

export const FORGOT_PASSWORD_QUERY = gql`
    query($input: ForgotPasswordRequest) {
      forgotPassword(input: $input) {
          responseCode
          data
      }
    }
`;

export const RESET_PASSWORD_QUERY = gql`
    query($input: ResetPasswordRequest) {
      resetPassword(input: $input) {
          responseCode
          data
      }
    }
`;

export const PASSWORD_RESET_TOKEN_VALID_QUERY = gql`
    query($input: PasswordResetTokenValidRequest) {
      passwordResetTokenValid(input: $input) {
          responseCode
          data
      }
    }
`;

export const REFRESH_TOKEN_QUERY = gql`
    query($input: RefreshTokenRequest) {
      refreshToken(input: $input) {
          responseCode
          data
      }
    }
`;