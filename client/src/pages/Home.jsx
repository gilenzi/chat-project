import {Outlet} from 'react-router-dom';

export function Home(props) {
  return (
    <div>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
