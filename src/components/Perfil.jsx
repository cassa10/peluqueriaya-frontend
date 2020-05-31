import React, {Fragment} from 'react';
import {useUser} from "../contexts/UserProvider";

const Perfil = () => {
    const { loading, user } = useUser();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <img src={user.picture} alt="Profile" />

            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <code>{JSON.stringify(user, null, 2)}</code>
        </Fragment>
    );
};


export default Perfil;