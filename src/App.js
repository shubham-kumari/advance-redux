import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react'
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.uiState.cartIsVisible)
  const cart = useSelector((state) => state.cartState)
  const notification = useSelector((state) => state.uiState.notification)
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart Data!'
      }))
      const response = await fetch('https://react-http-692f5-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart)
        })
      if (!response.ok) {
        // throw new Error('Sending cart data failed');
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: 'Sending cart Data failed!'
        }))
      }
      // const resData = await response.json();

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success...',
        message: 'Sent cart data successfully!'
      }))
    }

    if(isInitial){
      isInitial = false;
      return;
    }
    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error...',
        message: 'Sending cart Data failed!'
      }))
    })
  }, [cart, dispatch])
  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>

  );
}

export default App;
