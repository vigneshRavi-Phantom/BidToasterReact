import gql from "graphql-tag";

export const GET_RFQ_QUERY = gql`
  query ($input: RfqCond) {
    getRfq(input: $input) {
      responseCode
      data
      dataCount
    }
  }
`;

export const GET_RFQ_DETAILS_QUERY = gql`
  query ($input: RfqDetailsCond) {
    getRfqDetails(input: $input) {
      responseCode
      data
    }
  }
`;

// Mutation
export const CREATE_RFQ_MUTATION = gql`
  mutation ($input: RfqFormRequest) {
    createRfq(input: $input) {
      responseCode
      data
    }
  }
`;

export const CREATE_RFQ_BIDDING_DETAILS_MUTATION = gql`
  mutation ($input: RfqFormBiddingDetailsRequest) {
    createRfqBiddingDetails(input: $input) {
      responseCode
      data
    }
  }
`;

export const UPDATE_RFQ_MUTATION = gql`
  mutation ($input: RfqFormRequest) {
    updateRfq(input: $input) {
      responseCode
      data
    }
  }
`;


export const DELETE_RFQ_MUTATION = gql`
  mutation ($input: RfqDeleteRequest) {
    deleteRfq(input: $input) {
      responseCode
      data
    }
  }
`;

export const COMPARE_RFQ_MUTATION = gql`
  mutation ($input: CompareRfqFormRequest) {
    compareRfq(input: $input) {
      responseCode
      data
    }
  }
`;


export const ADD_VENDOR_TO_RFQ_MUTATION = gql`
  mutation ($input: AddVendorToRfqFormRequest) {
    addVendorToRfq(input: $input) {
      responseCode
      data
    }
  }
`;