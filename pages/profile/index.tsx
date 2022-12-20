import type { NextPage } from 'next'
import Head from 'next/head'
import { BaseLayout } from 'components/ui/Layout/BaseLayout'
import { ComponentWithLayout } from '../_app'
import { useFormik } from 'formik'
import axios from 'axios'
import { useUserContext } from 'core/state/user.state'
import { useState } from 'react'
import { Button, Loading } from '@nextui-org/react'
import { toast } from 'react-toastify'

const Profile: NextPage = () => {
  const { user } = useUserContext()
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...user,
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        await axios.put(`/api/users/${user?._id}`, values)
        toast.success('Data saved successfully')
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-blueGray-100 rounded-b-10xl">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-xl rounded-xl bg-white py-14 px-8 md:px-20 md:pt-16 md:pb-20">
                <h3 className="font-heading mb-12 text-4xl font-medium">
                  Profile Details
                </h3>
                <input
                  className="placeholder-darkBlueGray-400 mb-5 w-full rounded-xl border px-12 py-5 text-xl focus:bottom-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                <div className="text-right">
                  <Button
                    clickable={!loading}
                    color="primary"
                    className="inline-block w-full  text-center text-xl font-medium tracking-tighter md:w-auto"
                    onClick={formik.submitForm}
                    size="lg"
                    icon={
                      loading && (
                        <Loading type="spinner" color="white" size="md" />
                      )
                    }
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
;(Profile as ComponentWithLayout).Layout = BaseLayout
