import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import ImageZoom from './directory';

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  });
  const onClose = useCallback(() => {
    setShowImageZoom(false);
  });
  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={`http://localhost:4000/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}></img>
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  } else if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          style={{ width: '50%', display: 'inline-block' }}
          src={`http://localhost:4000/${images[0].src}`}
          alt={`http://localhost:4000/${images[0].src}`}
          onClick={onZoom}></img>
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
        <img
          role="presentation"
          style={{ width: '50%', display: 'inline-block' }}
          src={`http://localhost:4000/${images[1].src}`}
          alt={`http://localhost:4000/${images[1].src}`}
          onClick={onZoom}></img>
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <img
        role="presentation"
        style={{ width: '50%', display: 'inline-block' }}
        src={`http://localhost:4000/${images[0].src}`}
        alt={`http://localhost:4000/${images[0].src}`}
        onClick={onZoom}></img>
      {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      <div
        role="presentation"
        style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}>
        <PlusOutlined />
        <br />
        {images.length - 1}개의 사진 더보기
      </div>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
