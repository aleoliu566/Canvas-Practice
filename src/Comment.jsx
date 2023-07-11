import React, { useState, useEffect, useRef } from 'react'
import { InputBox, CommentIcon, CommentLine, StyledCommentBox, StyledComment, DateStyle, CommnetPart } from './styled';

const Comment = props => {
    const [value, setValue] = useState("");
    const [conversation, setConversation] = useState([]);
    const [showCommet, setShowComment] = useState(true);

    const {onImg, image, clientX, clientY, ratioX, ratioY} = props.comment.mousePositionStatus;
    const [left, setLeft] = useState(clientX);
    const [top, setTop] = useState(clientY);

    useEffect(()=>{
        if(onImg){
            setLeft(props.offset.x + image.width * props.scale * ratioX);
            setTop(props.offset.y + image.height * props.scale * ratioY);    
        }
    },[props.offset, props.scale])

    const onClickInputBox = () => {
        if(value){
            const user = props.userName ? props.userName : 'Guest';
            const time = <DateStyle key={new Date().toLocaleString()}>{new Date().toLocaleString()}</DateStyle>;
            console.log(time);
            setConversation(conversation => [...conversation,  <>{user}: {value} <br/>{time}</>])
            setValue('');    
        }
    }
    const onClickCommentIcon = () => {
        setShowComment(!showCommet);
    }

    const onClickResolve = () => {
        props.resolveComments(props.idx);
    }

    return <StyledComment top={top} left={left}>
        <CommentIcon onClick={onClickCommentIcon}/>
        <CommnetPart showCommet={showCommet}>
            <CommentLine />
            <StyledCommentBox>
                <DateStyle>{new Date().toLocaleString()}</DateStyle>
                <InputBox>                    
                    <input value={value} onChange={e => setValue(e.target.value)} />
                    <button value='submit' onClick={onClickInputBox}>submit</button>
                    {
                        conversation.length > 0 &&
                        <button value='submit' onClick={onClickResolve}>resolve</button>
                    }
                </InputBox>
                <ul>
                    {conversation.map((e,idx)=>{
                        return <li><span key={idx}>{e}</span></li>
                    })}
                </ul>
            </StyledCommentBox>
        </CommnetPart>
    </StyledComment>
}

export default Comment