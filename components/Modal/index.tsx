import styled from 'styled-components'
import {
  faTimes
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from 'react'

type ModalProps = {
  open: boolean,
  onClose: () => void,
  children?: ReactNode
}

const Modal = ({
  open,
  onClose,
  children
}: ModalProps) => {
  return (
    <Content open={open} className="inline-block z-50 absolute w-full bg-black h-screen top-0 left-0 bg-opacity-50 duration-200 modal">
      <div className="w-full pt-32 flex justify-center area-modal">
        <div className="bg-white rounded-lg inline-block">
          <div className="flex justify-end">
            <div className="mr-1 mt-1" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="px-6 py-6">
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
`
export default Modal