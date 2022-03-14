import { useCallback } from "react";
import { isSuccess } from "utils/ServiceAPIUtil";
import {
  GET_ORG_ITEMS_QUERY,
  CREATE_ORG_ITEM_MUTATION,
  UPDATE_ORG_ITEM_MUTATION,
  DELETE_ORG_ITEM_MUTATION
} from "graphql/orgItems";
import { useMutation, useApolloClient } from "@apollo/client";

const OrgItemService = () => {
  const apolloClient = useApolloClient();
  const [createOrgItem] = useMutation(CREATE_ORG_ITEM_MUTATION);
  const [updateOrgItem] = useMutation(UPDATE_ORG_ITEM_MUTATION);
  const [deleteOrgItem] = useMutation(DELETE_ORG_ITEM_MUTATION);

  const GetOrgItems = useCallback(async (searchCond: any) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_ORG_ITEMS_QUERY,
        variables: { input: searchCond },
        fetchPolicy: "no-cache",
      });
      if (isSuccess("getOrgItems", data)) {
        return data.getOrgItems;
      }
    } catch (error) {
      return null;
    }
    // eslint-disable-next-line
  }, []);

  const CreateOrgItem = useCallback(async (values) => {
    try {
      const { data } = await createOrgItem({
        variables: { input: values },
      });

      if (isSuccess("createOrgItem", data)) {
        return data.createOrgItem.data;
      }
    } catch (error) {
      console.log("[Error] - Create Item Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const UpdateOrgItem = useCallback(async (values) => {
    try {
      const { data } = await updateOrgItem({
        variables: { input: values },
      });

      if (isSuccess("updateOrgItem", data)) {
        return data.updateOrgItem.data;
      }
    } catch (error) {
      console.log("[Error] - Update Item Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const DeleteOrgItem = useCallback(async (values) => {
    try {
      const { data } = await deleteOrgItem({
        variables: { input: values },
      });

      if (isSuccess("deleteOrgItem", data)) {
        return data.deleteOrgItem.data;
      }
    } catch (error) {
      console.log("[Error] - Delete Item Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  return {
    GetOrgItems,
    CreateOrgItem,
    UpdateOrgItem,
    DeleteOrgItem
  };
};

export default OrgItemService;
