import React, {useState} from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";


const APIContext = React.createContext();
export const useAPI = () => React.useContext(APIContext);

const server = process.env.REACT_APP_APIBACKEND || 'http://localhost:8080';

const APIProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    const request = (type) => (path, body, final) =>
        type(`${server}${path}`, body)
            .then(({data}) => data)
            .catch((error) => console.log(error))
            .finally(final)

    const get = (path, body, final) => request(axios.get)(path, {params: body}, final);

    const put = request(axios.put);

    const post = request(axios.post);

    const del = request(axios.delete);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'clickaway') {
            setOpen(false);
        }
    };

    return (
        <APIContext.Provider value={{ handleOpen, get, put, post, del }}>
            {children}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    This is an error message!
                </Alert>
            </Snackbar>
        </APIContext.Provider>
    )
}

export default APIProvider;