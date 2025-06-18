import axios from 'axios';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from '../redux/user-slice';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.png';
import io from 'socket.io-client';

export function Home(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('user', user);
  const fetchUserDetails = async () => {
    try {
      const URL = `${
        import.meta.env.VITE_REACT_APP_BACKEND_URL
      }/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate('/email');
      }
      console.log('current user Details', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  /***socket connection */
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socketConnection.on('onlineUser', (data) => {
      console.log(data);
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const basePath = location.pathname === '/';
  return (
    <div className="flex h-screen max-h-screen">
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
        <Sidebar />
      </section>

      {/**message component**/}
      <section className={`flex-1 ${basePath && 'hidden'}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col flex-1 gap-2 hidden ${
          !basePath ? 'hidden' : 'lg:flex'
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
}
