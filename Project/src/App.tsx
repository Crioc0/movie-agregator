import { QueryClientProvider } from "@tanstack/react-query";

import { Layout } from "./ui/Layout/Layout";
import { querieMovies } from "./api/querieMovies";

import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={querieMovies}>
        <Layout />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
