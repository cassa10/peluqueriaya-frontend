import React from 'react';
import cx from "clsx";
import {makeStyles} from '@material-ui/core/styles';
import {getCollapseBtn} from  '@mui-treasury/layout';
import styled from "styled-components";

const CollapseBtn = getCollapseBtn(styled);

const useStyles = makeStyles(() => ({
    collapseBtn: {
        color: '#fff',
        minWidth: 0,
        width: 40,
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0.24)',
        margin: '0 auto 16px',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.38)'
        }
    }
}));

const CollapseBtnStyled = props => {
    const styles = useStyles();

    return <CollapseBtn className={cx(styles.collapseBtn)} {...props}/>;
};

export default CollapseBtnStyled;