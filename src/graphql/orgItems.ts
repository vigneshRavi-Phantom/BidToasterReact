import gql from "graphql-tag";

export const GET_ORG_ITEMS_QUERY = gql`
  query ($input: OrgItemsCond) {
    getOrgItems(input: $input) {
      responseCode
      data
      dataCount
    }
  }
`;


// Mutation
export const CREATE_ORG_ITEM_MUTATION = gql`
  mutation ($input: OrgItemFormRequest) {
    createOrgItem(input: $input) {
      responseCode
      data
    }
  }
`;

export const UPDATE_ORG_ITEM_MUTATION = gql`
  mutation ($input: OrgItemFormRequest) {
    updateOrgItem(input: $input) {
      responseCode
      data
    }
  }
`;

export const DELETE_ORG_ITEM_MUTATION = gql`
  mutation ($input: OrgItemDeleteRequest) {
    deleteOrgItem(input: $input) {
      responseCode
      data
    }
  }
`;
