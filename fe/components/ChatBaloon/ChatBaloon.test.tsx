import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ChatBaloon from './page'
import { ChatBaloonProps } from '../../types/openAI'

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string | { src: string }; alt: string; style?: React.CSSProperties }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={typeof props.src === 'object' ? props.src.src : props.src} alt={props.alt} style={props.style} />
  },
}))

// Mock the image import
jest.mock('@/public/isaacAvatar.png', () => ({
  src: '/mock-image-path.jpg',
  height: 50,
  width: 50,
}))

describe('ChatBaloon', () => {
  it('renders messages', () => {
    const chatContent: ChatBaloonProps[] = [{
      message: "Hello",
      role: 'bot'
    }]

    render(<ChatBaloon chatBaloonContent={chatContent} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
}) 