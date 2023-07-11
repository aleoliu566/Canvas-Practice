import React, { useRef, useEffect, useState } from 'react';
import Comment from './Comment'
import cat from './cat.jpeg';

function CanvasPart2() {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [comments, setComments] = useState([]);
  const [removeIdx, setRemoveIdx] = useState(-1);
  const [userName, setUserName] = useState('');
  const [userNameInput, setUserNameInput] = useState('');

  const onClickUserInput = () => {
    if (userNameInput) {
      setUserName(userNameInput)
      setUserNameInput('');
    }
  }

  useEffect(() => {
    if (removeIdx !== -1) {
      let newComments = comments;
      newComments[removeIdx] = null;
      setComments([...newComments]);
    }
  }, [removeIdx]);

  const resolveComments = (idx) => {
    setRemoveIdx(idx);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = cat;

    image.onload = () => {
      drawImage(ctx, image);
    };

    function drawImage(context, img) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        offset.x,
        offset.y,
        img.width * scale,
        img.height * scale
      );
    }

    const handleWheel = (event) => {

      if (event.deltaY < 0) {
        setScale((prevScale) => prevScale * 1.1);
      } else {
        setScale((prevScale) => prevScale / 1.1);
      }

      setScale((prevScale) => Math.min(Math.max(0.1, prevScale), 1.5));

      drawImage(ctx, image);

      event.preventDefault();
    };

    const handleMouseDown = (event) => {
      setIsDragging(true);
      setLastPosition({ x: event.clientX, y: event.clientY });
      setIsMoving(false);
    };

    const handleMouseMove = (e) => {
      setIsMoving(true);
      if (!isDragging) return;


      if (!(e.clientX > offset.x && e.clientX < offset.x + image.width * scale && e.clientY > offset.y && e.clientY < offset.y + image.height * scale)) {
        return;
      }
      const deltaX = e.clientX - lastPosition.x;
      const deltaY = e.clientY - lastPosition.y;

      setOffset((prevOffset) => ({
        x: prevOffset.x + deltaX,
        y: prevOffset.y + deltaY,
      }));

      setLastPosition({ x: e.clientX, y: e.clientY });
      drawImage(ctx, image);
    };


    const handleMouseUp = (e) => {
      if (!isMoving) {
        console.log('append comment');
        let mousePositionStatus = {
          onImg: false,
          image: image,
          offset: offset,
          clientX: e.clientX,
          clientY: e.clientY,
          ratioX: (e.clientX - offset.x) / (image.width * scale),
          ratioY: (e.clientY - offset.y) / (image.height * scale),
        }

        // click on image
        if (e.clientX > offset.x && e.clientX < offset.x + image.width * scale && e.clientY > offset.y && e.clientY < offset.y + image.height * scale) {
          mousePositionStatus.onImg = true;
        }

        const newComment = {
          mousePositionStatus: mousePositionStatus,
          image: image,
          idx: comments.length,
          resolveComments: resolveComments,
        }

        setComments(prevComments => [...prevComments, newComment]);

      }

      setIsDragging(false);
    };

    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [scale, offset, isDragging]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        style={{ border: '1px solid black' }}
      ></canvas>

      {comments.map((comment, idx) => {
        if (!comment) return null;

        return <Comment
          key={comment.id}
          idx={idx}
          comment={comment}
          offset={offset}
          scale={scale}
          userName={userName}
          resolveComments={resolveComments}
        />;
      })}
      <br />
      <input value={userNameInput} onChange={e => setUserNameInput(e.target.value)} />
      <button value='submit' onClick={onClickUserInput}>submit</button> (please enter your user name)
      <br /><br />
      { userName ? `Current user is ${userName}` : 'You did not enter your user name yet' }
      
    </>
  );
}

export default CanvasPart2;
