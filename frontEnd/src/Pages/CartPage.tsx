import Cart from "../Components/Cart/Cart";
import EmptyCart from "../Components/EmptyCart/EmptyCart";

const CartPage = () => {
    return (
        <div className="mb-10 min-h-screen">
            {/* <Cart /> */}
            <EmptyCart />
        </div>
    );
}

export default CartPage;