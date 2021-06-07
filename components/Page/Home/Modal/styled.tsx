
import styled from 'styled-components'

export const Scroll = styled.div`
  height: 300px;
  overflow: hidden;
  overflow-y: scroll;

  .user-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    .user {
      display: flex;
      align-items: center;
      img {
        &.image {
          width: 50px;
          height: 50px;
          margin-right: 5px;
          border-radius: 50%;
        }
      }
      .user-name {
        font-size: 12px;
        font-weight: 500;
      }
    }
  }

  .action {
    display: flex;
    align-items: center;
    font-size: 12px;

    .status-process {
      color: #b58149;
    }
    .status-friend {
      color: #1b6912;
    }
    .status-reject {
      font-size: 12px;
    }
  }
`

export const Button = styled.button`
  text-decoration: none;
  color: #fff;
  background-color: #26a69a;
  text-align: center;
  font-size: 12px;
  outline: 0;
  border: none;
  border-radius: 2px;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  position: relative;
  cursor: pointer;

  &.accept {
    margin-right: 10px;
  }

  &.reject {
    background-color: #a62626 !important;
  }
`