import React from "react";
import PropTypes from "prop-types";

const IconSvg = ({ width, height, style, idSvg }) => {
  return (
    <svg width={width} height={height} style={style}>
      <use xlinkHref={`/icons/icons.svg#${idSvg}`} />
    </svg>
  );
};

IconSvg.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  idSvg: PropTypes.string,
};

export default IconSvg;
