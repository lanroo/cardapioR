import { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Pizza Margherita", price: 25.0, quantity: 2 },
    { id: 2, name: "Hambúrguer Clássico", price: 18.0, quantity: 1 },
  ]);

  const handleIncreaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>

      {cartItems.length > 0 ? (
        <div>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-4">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)} cada</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-gray-300 px-2 py-1 rounded"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-2 py-1 rounded"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <p className="text-sm font-semibold">
                    Total: R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="text-red-500 underline"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">
              Total Geral: R$ {calculateTotal().toFixed(2)}
            </h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Finalizar Compra
            </button>
          </div>
        </div>
      ) : (
        <p>Seu carrinho está vazio!</p>
      )}
    </div>
  );
};

export default CartPage;
