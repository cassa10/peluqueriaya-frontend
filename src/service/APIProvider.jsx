import React, {useState} from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import ErrorHandler from "./ErrorHandler";
import AlertTitle from "@material-ui/lab/AlertTitle";


const APIContext = React.createContext();
export const useAPI = () => React.useContext(APIContext);

const server = process.env.REACT_APP_APIBACKEND || 'http://localhost:8080';

const initialAlert = {
    title: undefined,
    messages: []
}

const APIProvider = ({children}) => {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(initialAlert);

    const request = (type) => (path, body, then, final) =>
        type(`${server}${path}`, body)
            .then(({data}) => data)
            .catch((error) => {
                setAlert(ErrorHandler.buildAlert(error));
                setOpen(true);
            })
            .finally(final)

    const get = (path, body, then, final) => request(axios.get)(path, {params: body}, then, final);

    const put = request(axios.put);

    const post = request(axios.post);

    const del = request(axios.delete);

    const handleClose = (event, reason) => {
        if (reason !== 'clickaway') {
            setOpen(false);
            setAlert(initialAlert);
        }
    };

    return (
        <APIContext.Provider value={{get, put, post, del}}>
            {children}
            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                <Alert onClose={handleClose} elevation={6} variant="filled" severity="error">
                    <AlertTitle>{alert.title}</AlertTitle>
                    {alert.messages.map((message) => <Typography>{` • ${message}`}</Typography>)}
                </Alert>
            </Snackbar>
        </APIContext.Provider>
    )
}

export default APIProvider;