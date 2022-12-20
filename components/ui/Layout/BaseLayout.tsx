import { Container } from '@nextui-org/react'
import { NextComponentType } from 'next'
import { Navbar } from '../Navbar/Navbar'

export const BaseLayout = ({ children }: { children: NextComponentType }) => {
  return (
    <>
      <Container>
        <Navbar />
        {children}
      </Container>
    </>
  )
}
