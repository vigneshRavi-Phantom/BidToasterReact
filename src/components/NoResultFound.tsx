import { Row } from "reactstrap";
import { useLocalization } from "contexts/LocalizationContextProvider";

const NoResultFound = () => {
  const { strings }: any = useLocalization();
  return (
    <Row
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {strings["no_data_found"]}
    </Row>
  );
};

export default NoResultFound;
