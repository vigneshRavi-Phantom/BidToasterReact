import gql from "graphql-tag";

export const ACCOUNT_PROFILE_QUERY = gql`
  query ($input: AccountProfileRequest) {
    getAccountProfile(input: $input) {
      responseCode
      data
    }
  }
`;

export const GET_VENDOR_PROFILE_QUERY = gql`
  query ($input: VendorSearchCond) {
    getVendorProfile(input: $input) {
      responseCode
      data
    }
  }
`;

export const SIGNUP_QUERY = gql`
  mutation ($input: SignupRequest) {
    signup(input: $input) {
      responseCode
      data
    }
  }
`;

export const VENDOR_SIGNUP_QUERY = gql`
  mutation ($input: VendorSignupRequest) {
    vendorSignup(input: $input) {
      responseCode
      data
    }
  }
`;

export const UPDATE_ACCOUNT_PROFILE_QUERY = gql`
mutation ($input: UpdateAccountProfileRequest) {
    updateAccountProfile(input: $input) {
      responseCode
      data
    }
  }
`;

export const GET_DASHBOARD_OVERVIEW_QUERY = gql`
  query ($input: DashboardOverviewCond) {
    getDashboardOverview(input: $input) {
      responseCode
      data
    }
  }
`;

export const GET_DASHBOARD_CHART_OVERVIEW_QUERY = gql`
  query ($input: DashboardChartOverviewCond) {
    getDashboardChartOverview(input: $input) {
      responseCode
      data
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query ($input: UsersCond) {
    getUsers(input: $input) {
      responseCode
      data
      dataCount
    }
  }
`;

export const GET_ORG_VENDORS_QUERY = gql`
  query ($input: OrgVendorsCond) {
    getOrgVendors(input: $input) {
      responseCode
      data
      dataCount
    }
  }
`;


// Mutation
export const CREATE_USER_MUTATION = gql`
  mutation ($input: UserFormRequest) {
    createUser(input: $input) {
      responseCode
      data
    }
  }
`;

export const CREATE_ORG_VENDOR_MUTATION = gql`
  mutation ($input: OrgVendorFormRequest) {
    createOrgVendor(input: $input) {
      responseCode
      data
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation ($input: UserFormRequest) {
    updateUser(input: $input) {
      responseCode
      data
    }
  }
`;

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation ($input: UserProfileFormRequest) {
    updateProfile(input: $input) {
      responseCode
      data
    }
  }
`;

export const UPDATE_VENDOR_PROFILE_MUTATION = gql`
  mutation ($input: VendorProfileFormRequest) {
    updateVendorProfile(input: $input) {
      responseCode
      data
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation ($input: UserDeleteRequest) {
    deleteUser(input: $input) {
      responseCode
      data
    }
  }
`;

export const DELETE_ORG_VENDOR_MUTATION = gql`
  mutation ($input: OrgVendorDeleteRequest) {
    deleteOrgVendor(input: $input) {
      responseCode
      data
    }
  }
`;
