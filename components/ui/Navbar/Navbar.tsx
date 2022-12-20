import { Avatar, Button } from '@nextui-org/react'
import axios from 'axios'
import { useUserContext } from 'core/state/user.state'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import UserIcon from '@heroicons/react/solid/UserIcon'

export const Navbar = () => {
  const { setUser, handleSignOut, user } = useUserContext()
  useEffect(() => {
    const handler = async () => {
      try {
        const json = await axios('/api/me')
        const user = json.data.user
        setUser(user)
      } catch {
        handleSignOut()
      }
    }
    ;(async () => await handler())()
  }, [])

  return (
    <section className="bg-white py-8 px-4 lg:px-10">
      <nav className="relative flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900">
          <Link href="/">SIWE</Link>
        </div>

        {user && (
          <div className="flex items-center">
            <Button
              flat
              color="error"
              auto
              onClick={handleSignOut}
              className="mr-4"
            >
              Logout
            </Button>

            <Link href={'/profile'}>
              <div>
                <Avatar
                  squared
                  text="Profile"
                  color={'default'}
                  icon={<UserIcon height={'20'} />}
                />
              </div>
            </Link>
          </div>
        )}
      </nav>
    </section>
  )
}
