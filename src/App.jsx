import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Products";
import Home from "./Home";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import EditProduct from "./EditProduct";
import Users from "./Users";
import Authorization from "./Authorization";
import CreateProduct from "./CreateProduct";
import Categoria from "./Categoria";
import EditCategorias from "./EditCategorias";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<EditProduct />} />
                    <Route path="/products/create" element={<CreateProduct />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:id" element={<OrderDetails />} />
                    <Route path="/categories" element={<Categoria />} />
                    <Route path="/categories/:id" element={<EditCategorias />} />

                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;