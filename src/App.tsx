import { BrowserRouter } from "react-router-dom";
import Routes from "routes/routes";
import { AuthContextProvider } from "contexts/AuthContextProvider";
import { LocalizationContextProvider } from "contexts/LocalizationContextProvider";
import { ModalContextProvider } from "contexts/ModalContextProvider";
import { ApolloProvider, client } from "utils/ApolloUtils";
import unspscDataList from "assets/json/unspsc.json";
import { CookiesProvider } from 'react-cookie';
import SessionTimeout from "helpers/session";

const App = () => {
//   window.addEventListener("beforeunload", (ev) => {
//     ev.preventDefault();
//     console.log('close tab', localStorage.getItem('bt.token'));
//     // localStorage.clear();
//     // return ev.returnValue = '';
//     if (window.performance) {
//       console.info("window.performance work's fine on this browser");
//     }
//       if (performance.navigation.type == 1) {
//         console.info( "This page is reloaded" );
//       } else {
//         localStorage.removeItem('bt.token');
//         console.info( "This page is not reloaded");
//       }
// });
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
          <CookiesProvider>
          <LocalizationContextProvider>
            <AuthContextProvider>
              <ModalContextProvider>
                <Routes />
                <SessionTimeout />
              </ModalContextProvider>
            </AuthContextProvider>
          </LocalizationContextProvider>
        </CookiesProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
