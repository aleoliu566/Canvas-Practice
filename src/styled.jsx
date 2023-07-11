import styled from 'styled-components';

const InputBox = styled.div`
    display: flex;
`;

const CommentIcon = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    display: inline-block;
    background: #EAC100;
    border-radius: 100%;
    cursor: pointer;
`;

const CommentLine = styled.span`
    position: absolute;
    top: 12px;
    left: 25px;
    width: 40px;
    height: 3px;
    display: inline-block;
    background: #EAC100;
`;


const StyledCommentBox = styled.div`
    position: absolute;
    left: 65px;
    padding: 5px 10px;
    background-color: lightgrey;
    border: 1px solid grey;
    display: block;

    ul {
        margin: 0;
    }
`;

const StyledComment = styled.div`
    position: absolute;
    top: ${props => parseInt(props.top) + 'px'};
    left: ${props => parseInt(props.left) + 'px'};

    &:focus-within {
        z-index: 10;
    }
`;


const DateStyle = styled.div`
    color: grey;
    font-size: 12px;
    padding-bottom: 4px;
`;

const CommnetPart = styled.span`
    display: ${props => props.showCommet ? 'inline' : 'none'}
`

export { InputBox, CommentIcon, CommentLine, StyledCommentBox, StyledComment, DateStyle, CommnetPart};