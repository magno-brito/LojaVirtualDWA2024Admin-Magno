import { useEffect, useState } from "react";
import axios from "axios";
import TableOrders from "./TableOrders";
import NoOrders from "./NoOrders";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderState, setOrderState] = useState("pendente");

    const loadOrders = (state) => {
        const ordersApi = `http://127.0.0.1:8000/admin/obter_pedidos_por_estado/${state}`;
        axios.get(ordersApi)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleStateChange = (event) => {
        setOrderState(event.target.value);
    };

    useEffect(() => {
        loadOrders(orderState);
    }, [orderState]);

    return (
        <>
            <div className="form-floating my-3">
                <select id="orderState" value={orderState} onChange={handleStateChange} className="form-control">
                    <option value="carrinho">Carrinho</option>
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago</option>
                    <option value="faturado">Faturado</option>
                    <option value="separado">Separado</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregue">Entregue</option>
                    <option value="cancelado">Cancelado</option>
                </select>
                <label htmlFor="orderState" className="form-label">Estado do Pedido:</label>
            </div>
            {orders.length > 0 ?
                <TableOrders items={orders} /> :
                <NoOrders state={orderState} />}
        </>
    );
}

export default Orders;