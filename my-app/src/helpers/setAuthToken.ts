import http_common from "../http_common";

const setAuthToken = (token: string) => {
    if (token) {
        http_common.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.token = token;
    } else {
        delete http_common.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
    }
}

export default  setAuthToken;