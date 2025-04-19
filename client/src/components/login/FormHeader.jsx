// import React from 'react'
// import logoImage from '../../assets/logo.png'

// import { Image, Text } from '@chakra-ui/react'

// const FormHeader = () => {
//   return (
//     <>
//       <Image
//         width={{
//           base: '4rem',
//           md: '5rem',
//           lg: '6rem',
//         // }}
//         height={{
//           base: '4rem',
//           md: '5rem',
//           lg: '6rem',
//         }}
//         display={{
//           base: 'none',
//           md: 'block',
//         }}
//         marginInline={'auto'}
//         src={logoImage}
//         alt='NITJ Logo'
//         mb={4}
//         userSelect={'none'}
//         draggable={false}
//       />

//       <Text
//         fontSize={{
//           base: '2xl',
//           md: '3xl',
//           lg: '4xl',
//         }}
//         textAlign={'center'}
//         fontWeight='bold'
//         mb={2}>
//         Welcome to TiD
//       </Text>
//       <Text
//         fontSize='md'
//         mb={{
//           base: '2rem',
//           md: '4rem',
//         }}
//         textAlign={'center'}
//         color={'gray.500'}>
//         Empowering T1D management through digital innovation
//       </Text>
//     </>
//   )
// }

// export default FormHeader
import React from 'react'
import logoImage1 from '../../assets/logo.png'
import logoImage2 from '../../assets/pgilogo.jpeg' // Add path to your second logo

import { Flex, Image, Text } from '@chakra-ui/react'

const FormHeader = () => {
  return (
    <>
      <Flex 
        justifyContent="center" 
        alignItems="center" 
        gap={{ base: '2', md: '4', lg: '6' }}
        mb={4}
        display={{ base: 'none', md: 'flex' }}
      >
        <Image
          width={{ base: '3rem', md: '4rem', lg: '5rem' }}
          height={{ base: '3rem', md: '4rem', lg: '5rem' }}
          src={logoImage1}
          alt='NITJ Logo'
          userSelect={'none'}
          draggable={false}
        />
        <Image
          width={{ base: '3rem', md: '4rem', lg: '5rem' }}
          height={{ base: '3rem', md: '4rem', lg: '5rem' }}
          src={logoImage2}
          alt='Second Logo'
          userSelect={'none'}
          draggable={false}
        />
      </Flex>

      <Text
        fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
        textAlign={'center'}
        fontWeight='bold'
        mb={2}
      >
        Welcome to TiD
      </Text>
      <Text
        fontSize='md'
        mb={{ base: '2rem', md: '4rem' }}
        textAlign={'center'}
        color={'gray.500'}
      >
        Empowering T1D management through digital innovation
      </Text>
    </>
  )
}

export default FormHeader
