import {useState} from 'react';

export function Register(props) {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    passwordPic: '',
  });
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4">
        <h3>Welcome to Chat app!</h3>

        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={data.name}
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
