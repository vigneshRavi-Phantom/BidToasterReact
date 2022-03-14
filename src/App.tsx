import { BrowserRouter } from "react-router-dom";
import Routes from "routes/routes";
import { AuthContextProvider } from "contexts/AuthContextProvider";
import { LocalizationContextProvider } from "contexts/LocalizationContextProvider";
import { ModalContextProvider } from "contexts/ModalContextProvider";
import { ApolloProvider, client } from "utils/ApolloUtils";
import unspscDataList from "assets/json/unspsc.json";

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
          <LocalizationContextProvider>
            <AuthContextProvider>
              <ModalContextProvider>
                <Routes />
              </ModalContextProvider>
            </AuthContextProvider>
          </LocalizationContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
