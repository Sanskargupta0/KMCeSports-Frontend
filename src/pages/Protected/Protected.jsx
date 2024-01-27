import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
const Protected = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  let token = localStorage.getItem("Token");
  const verifyToken = async () => {
    const response = await fetch(`${config.backendUrl + "/tokenValidation"}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await response.json();
    console.log(response);
    if (response.status !== 200) {
      navigate("/login");
      localStorage.removeItem("Token");
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      verifyToken();
    }
  }, []);
  return <Component />;
};

export default Protected;
