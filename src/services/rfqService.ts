import { useCallback } from "react";
import { isSuccess } from "utils/ServiceAPIUtil";
import {
  GET_RFQ_QUERY,
  GET_RFQ_DETAILS_QUERY,
  CREATE_RFQ_MUTATION,
  CREATE_RFQ_BIDDING_DETAILS_MUTATION,
  UPDATE_RFQ_MUTATION,
  DELETE_RFQ_MUTATION,
  COMPARE_RFQ_MUTATION,
  ADD_VENDOR_TO_RFQ_MUTATION
} from "graphql/rfq";
import { useMutation, useApolloClient } from "@apollo/client";

const RfqService = () => {
  const apolloClient = useApolloClient();
  const [createRfq] = useMutation(CREATE_RFQ_MUTATION);
  const [createRfqBiddingDetails] = useMutation(CREATE_RFQ_BIDDING_DETAILS_MUTATION);
  const [updateRfq] = useMutation(UPDATE_RFQ_MUTATION);
  const [deleteRfq] = useMutation(DELETE_RFQ_MUTATION);
  const [compareRfq] = useMutation(COMPARE_RFQ_MUTATION);
  const [addVendorToRfq] = useMutation(ADD_VENDOR_TO_RFQ_MUTATION);

  const GetRfq = useCallback(async (searchCond: any) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_RFQ_QUERY,
        variables: { input: searchCond },
        fetchPolicy: "no-cache",
      });
      if (isSuccess("getRfq", data)) {
        return data.getRfq;
      }
    } catch (error) {
      return null;
    }
    // eslint-disable-next-line
  }, []);

  const GetRfqDetails = useCallback(async ({ id, orgId, vendorId, buyerId }: { id: number, orgId: number | null, vendorId: number | null, buyerId: number | null }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_RFQ_DETAILS_QUERY,
        variables: { input: { id, orgId, vendorId, buyerId } },
        fetchPolicy: "no-cache",
      });
      if (isSuccess("getRfqDetails", data)) {
        return data.getRfqDetails;
      }
    } catch (error) {
      return null;
    }
    // eslint-disable-next-line
  }, []);

  const CreateRfq = useCallback(async (values) => {
    try {
      const { data } = await createRfq({
        variables: { input: values },
      });

      if (isSuccess("createRfq", data)) {
        return data.createRfq.data;
      }
    } catch (error) {
      console.log("[Error] - Create RFQ Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const CreateRfqBiddingDetails = useCallback(async (values) => {
    try {
      const { data } = await createRfqBiddingDetails({
        variables: { input: values },
      });

      if (isSuccess("createRfqBiddingDetails", data)) {
        return data.createRfqBiddingDetails.data;
      }
    } catch (error) {
      console.log("[Error] - Create RFQ Bidding Details Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const UpdateRfq = useCallback(async (values) => {
    try {
      const { data } = await updateRfq({
        variables: { input: values },
      });

      if (isSuccess("updateRfq", data)) {
        return data.updateRfq.data;
      }
    } catch (error) {
      console.log("[Error] - Update RFQ Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const CompareRfq = useCallback(async (values) => {
    try {
      const { data } = await compareRfq({
        variables: { input: values },
      });

      if (isSuccess("compareRfq", data)) {
        return data.compareRfq.data;
      }
    } catch (error) {
      console.log("[Error] - Compare RFQ Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const DeleteRfq = useCallback(async (values) => {
    try {
      const { data } = await deleteRfq({
        variables: { input: values },
      });

      if (isSuccess("deleteRfq", data)) {
        return data.deleteRfq.data;
      }
    } catch (error) {
      console.log("[Error] - Delete RFQ Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  const AddVendorToRFQ = useCallback(async (values) => {
    try {
      const { data } = await addVendorToRfq({
        variables: { input: values },
      });

      if (isSuccess("addVendorToRfq", data)) {
        return data.addVendorToRfq.data;
      }
    } catch (error) {
      console.log("[Error] - Adding Vendor to RFQ Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  return {
    GetRfq,
    CreateRfq,
    CreateRfqBiddingDetails,
    UpdateRfq,
    DeleteRfq,
    GetRfqDetails,
    CompareRfq,
    AddVendorToRFQ
  };
};

export default RfqService;
