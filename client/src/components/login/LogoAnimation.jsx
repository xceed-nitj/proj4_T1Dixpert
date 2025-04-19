import { Flex } from '@chakra-ui/react'
import posterVideo from '../../assets/login.mp4' // Import your video file

export const LogoAnimation = (props) => {
  return (
    <Flex
      position={'relative'}
      alignItems={'center'}
      justifyContent={'center'}
      minH={{
        base: '50vh',
        md: '100vh',
      }}
      width={'100%'}
      flexBasis={{
        base: '50%',
        lg: '70%',
      }}
      bgGradient="radial-gradient(circle at 0% 0%, #4874b0, #053371)"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          ...props.style
        }}
      >
        <source src={posterVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Flex>
  )
}