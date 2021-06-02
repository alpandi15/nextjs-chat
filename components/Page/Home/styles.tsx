import styled from 'styled-components'

export const ContentLayout = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`
export const Content = styled.div`
background-color: #FFF;
width: 100%;
max-width: 100%;
min-width: 380px;
display: flex;
height: 100%;
overflow: hidden;
`
export const LeftSide = styled.div`
width: 30%;
`
export const RightSide = styled.div`
width: 70%;
border-left: 1px solid #cecece;
position: relative;
`
export const Header = styled.div`
background: #dedede;
height: 55px;
width: 100%;
display: flex;
align-items: center;
padding: 15px;
justify-content: space-between;
`
export const ProfileImg = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;

img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 12px;
  margin-left: 10px;
  font-weight: 500;
}

.status {
  font-size: 11px;
  margin-left: 10px;
}

.current-message {
  margin-left: 10px;
  font-size: 10px !important;
  display: flex;
  align-items: center;
  padding: 0 !important;
}
`
export const ActionContent = styled.div`
display: flex;
align-items: center;
`
export const ButtonIcon = styled.div`
padding: 5px 10px;
font-size: 16px;
cursor: pointer;
`
export const FormSearch = styled.div`
padding: 5px 10px;
background-color: #ededed;
width: 100%;
display: flex;
align-items: center;
position: relative;

.left-icon, .right-icon {
  padding: 10px;
}

.left-icon {
  position: absolute;
  top: 2px;
  left: 13px;
}
`
export const SearchBar = styled.input`
width: 100%;
height: 2.2rem;
border-radius: 30px;
padding: 0 15px;
outline: none;
font-size: 12px;
padding-left: 40px;
`
export const ContentListChat = styled.div`
height: 536px;
max-height: 536px;
overflow: hidden;
overflow-y: scroll;
`
export const UserContact = styled.div`
padding: 15px;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid #ececec;
cursor: pointer;
`
export const InputMessage = styled.textarea`
width: 100%;
height: 3rem;
border-radius: 5px;
padding: 7px 10px;
outline: none;
font-size: 12px;
`
export const ScrollMessage = styled.div`
height: calc(100vh - 122px);
.wrapper {
  .content {
    padding: 5px;
    .date {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        font-size: 12px;
        padding: 2px 5px;
        border-radius: 8px;
      }
    }

    .message {
      .times {
        span {
          font-size: 9px;
        }
      }
    }
  }
}
`
export const FormSendMessage = styled.div`
// padding: 10px;
background-color: #ececec;
// position: absolute;
// width: 100%;
// bottom: 0;
// display: flex;
// align-items: center;

button {
  :focus {
    outline: none;
  }
}
.right-icon, .right-icon {
  padding: 10px;
}
`