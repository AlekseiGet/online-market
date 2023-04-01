import React from 'react';
import classes from './Loader.module.css';
const MyLoader = () => {
    return (
        <div>
            <div className={classes.loader}>
                <div className={classes.loader_text}>load</div>
            </div>
        </div>
    );
};

export default MyLoader;