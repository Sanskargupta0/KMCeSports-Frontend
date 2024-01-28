import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    if (response.status !== 200) {
      navigate("/login");
      localStorage.removeItem("Token");
      toast.error(`You are Trying Access Proteced Route`, {
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error(`You are Trying Access Proteced Route`, {
        position: "top-center",
      });
    } else {
      verifyToken();
    }
  }, []);
  return <Component />;
};

export default Protected;
