import {
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import router from "./router";

const App = () => {
  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  )
}

export default App