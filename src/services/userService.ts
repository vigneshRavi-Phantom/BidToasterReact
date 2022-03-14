import { useCallback } from "react";
import { isSuccess } from "utils/ServiceAPIUtil";
import {
  GET_DASHBOARD_OVERVIEW_QUERY,
  GET_DASHBOARD_CHART_OVERVIEW_QUERY,
  GET_USERS_QUERY,
  GET_ORG_VENDORS_QUERY,
  CREATE_USER_MUTATION,
  CREATE_ORG_VENDOR_MUTATION,
  UPDATE_USER_MUTATION,
  UPDATE_USER_PROFILE_MUTATION,
  DELETE_USER_MUTATION,
  GET_VENDOR_PROFILE_QUERY,
  UPDATE_VENDOR_PROFILE_MUTATION,
  DELETE_ORG_VENDOR_MUTATION
} from "graphql/users";
import { useMutation, useApolloClient } from "@apollo/client";

const UserService = () => {
  const apolloClient = useApolloClient();
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [createOrgVendor] = useMutation(CREATE_ORG_VENDOR_MUTATION);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE_MUTATION);
  const [updateVendorProfile] = useMutation(UPDATE_VENDOR_PROFILE_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [deleteOrgVendor] = useMutation(DELETE_ORG_VENDOR_MUTATION);

  const GetUsers = useCallback(async (searchCond: any) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_USERS_QUERY,
        variables: { input: searchCond },
        fetchPolicy: "no-cache",
      });
      if (isSuccess("getUsers", data)) {
        return data.getUsers;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
    // eslint-disable-next-line
  }, []);

  const GetOrgVendors = useCallback(async (searchCond: any) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_ORG_VENDORS_QUERY,
        variables: { input: searchCond },
        fetchPolicy: "no-cache",
      });
      if (isSuccess("getOrgVendors", data)) {
        return data.getOrgVendors;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
    // eslint-disable-next-line
  }, []);

  const CreateUser = useCallback(async (values) => {
    try {
      const { data } = await createUser({
        variables: { input: values },
      });

      if (isSuccess("createUser", data)) {
        return data.createUser.data;
      }
    } catch (error) {
      console.log("[Error] - Create User Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const CreateOrgVendor = useCallback(async (values) => {
    try {
      const { data } = await createOrgVendor({
        variables: { input: values },
      });

      if (isSuccess("createOrgVendor", data)) {
        return data.createOrgVendor.data;
      }
    } catch (error) {
      console.log("[Error] - Create Org Vendor Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const UpdateUser = useCallback(async (values) => {
    try {
      const { data } = await updateUser({
        variables: { input: values },
      });

      if (isSuccess("updateUser", data)) {
        return data.updateUser.data;
      }
    } catch (error) {
      console.log("[Error] - Update User Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const UpdateProfile = useCallback(async (values) => {
    try {
      const { data } = await updateProfile({
        variables: { input: values },
      });

      if (isSuccess("updateProfile", data)) {
        return data.updateProfile.data;
      }
    } catch (error) {
      console.log("[Error] - Update Profile Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const UpdateVendorProfile = useCallback(async (values) => {
    try {
      const { data } = await updateVendorProfile({
        variables: { input: values },
      });

      if (isSuccess("updateVendorProfile", data)) {
        return data.updateVendorProfile.data;
      }
    } catch (error) {
      console.log("[Error] - Update Vendor Profile Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const DeleteUser = useCallback(async (values) => {
    try {
      const { data } = await deleteUser({
        variables: { input: values },
      });

      if (isSuccess("deleteUser", data)) {
        return data.deleteUser.data;
      }
    } catch (error) {
      console.log("[Error] - Delete User Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const DeleteOrgVendor = useCallback(async (values) => {
    try {
      const { data } = await deleteOrgVendor({
        variables: { input: values },
      });

      if (isSuccess("deleteOrgVendor", data)) {
        return data.deleteOrgVendor.data;
      }
    } catch (error) {
      console.log("[Error] - Delete Org Vendor Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const GetVendorProfile = useCallback(async (searchCond: any) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_VENDOR_PROFILE_QUERY,
        variables: { input: searchCond },
        fetchPolicy: "no-cache",
      });
      if (isSuccess("getVendorProfile", data)) {
        return data.getVendorProfile.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
    // eslint-disable-next-line
  }, []);

  const GetDashboardOverview = useCallback(async (searchCond: any) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_DASHBOARD_OVERVIEW_QUERY,
        variables: { input: searchCond },
      });
      if (isSuccess("getDashboardOverview", data)) {
        return data.getDashboardOverview.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
    // eslint-disable-next-line
  }, []);

  const GetDashboardChartOverview = useCallback(async (searchCond: any) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_DASHBOARD_CHART_OVERVIEW_QUERY,
        variables: { input: searchCond },
      });
      if (isSuccess("getDashboardChartOverview", data)) {
        return data.getDashboardChartOverview.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
    // eslint-disable-next-line
  }, []);

  return {
    GetUsers,
    GetOrgVendors,
    CreateUser,
    UpdateUser,
    UpdateProfile,
    UpdateVendorProfile,
    DeleteUser,
    DeleteOrgVendor,
    GetVendorProfile,
    CreateOrgVendor,
    GetDashboardOverview,
    GetDashboardChartOverview
  };
};

export default UserService;
