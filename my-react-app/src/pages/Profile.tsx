import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

interface UserInfo {
  email: string;
  first_name: string;
  last_name: string;
  picture: string | null;
}

const Profile: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:4097/auth/login/", {
        email,
        password,
      });
      console.log("Login success:", res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      console.log(credentialResponse);
      const res = await axios.post("http://127.0.0.1:4097/auth/google/", {
        id_token: credentialResponse.credential,
      });
      console.log("Google login success:", res.data);

      setUserInfo({
        email: res.data.email,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        picture: res.data.picture || null,
      });
    } catch (err) {
      console.error(err);
    }
  };
return (
    <GoogleOAuthProvider clientId="966883543315-3jo8hii89h8pqco9qf99gl5obbd12rff.apps.googleusercontent.com">
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg text-center">
        {!userInfo ? (
          <>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Вхід у профіль</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Увійти
              </button>
            </form>

            <div className="my-6 border-t border-gray-200"></div>

            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Google Login Failed");
              }}
              useOneTap
            />
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={userInfo.picture || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
            <h1 className="text-4xl font-bold text-gray-900">
              {userInfo.first_name} {userInfo.last_name}
            </h1>
            <p className="text-lg text-gray-700">{userInfo.email}</p>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};


export default Profile;
