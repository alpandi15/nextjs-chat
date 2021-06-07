import styled from 'styled-components'
import {
  faTimes
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from 'react'
import { device } from 'styles/LayoutStyle'

type ModalProps = {
  title: string,
  open: boolean,
  onClose: () => void,
  children?: ReactNode
}

const Modal = ({
  title,
  open,
  onClose,
  children
}: ModalProps) => {
  return (
    // <Content open={open} className="inline-block z-50 absolute w-full bg-black h-screen top-0 left-0 bg-opacity-50 duration-200 modal">
    //   <div className="w-full pt-32 flex justify-center area-modal">
    //     <div className="bg-white inline-block">
    //       <div className="flex justify-end">
    //         <div className="mr-1 mt-1" onClick={onClose}>
    //           <FontAwesomeIcon icon={faTimes} />
    //         </div>
    //       </div>
    //       <div className="px-2 py-2">
    //         {children}
    //       </div>
    //     </div>
    //   </div>
    // </Content>
    <Content open={open}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="title">{title}</div>
            <div className="button-close" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>

          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </Content>
  )
}


interface ContentType {
  open?: boolean
};

const Content = styled.div<ContentType>`
  opacity: ${props => props.open ? '1' : '0'};
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  z-index: 100;
  display: flex;
  background: #15151561;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  outline: 0;
  transition: opacity .15s linear;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;

  .modal-dialog {
    transform: translate(0,0);
    width: 500px;
    max-width: 500px;
    @media only screen and ${device?.mobileS} {
      width: 90%;
    }

    .modal-content {
      background-color: white;
      width: 100%;
      position: relative;

      .modal-header {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
        .title {
          font-size: 14px;
          font-weight: 600;
        }
        .button-close {
          width: 24px;
          height: 24px;
          text-align: center;
          cursor: pointer;
        }
      }

      .modal-body {
        padding: 1rem;
      }
    }
  }
`
// const Content = styled.div<ContentType>`
//   opacity: ${props => props.open ? '1' : '0'};
//   visibility: ${props => props.open ? 'visible' : 'hidden'};
//   z-index: 100;
// `
export default Modal