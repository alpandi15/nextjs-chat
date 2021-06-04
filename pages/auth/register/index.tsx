import React from 'react'
import Router from 'next/router'
import { TOKEN } from '../../../constants'
import styled from 'styled-components'
import {
  useForm
} from 'react-hook-form'
import { setCookie } from 'nookies'
import Layout from '../../../components/Layout'
import {
  FormControl,
  Input,
  Label,
  ErrorInputMessage
} from '../../../styles/FormStyle'
import Button from '../../../components/Form/Button'
import {
  device
} from '../../../styles/LayoutStyle'
import { loggedChecked } from '../../../components/Security/auth'
import { apiRegister } from '../../../services/auth'

type FormInputProps = {
  username: string,
  // name: string,
  // email: string,
  // phone: string,
  password: string,
  confirm_password: string,
}

export default loggedChecked(function Register () {
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormInputProps>({
    mode: "onBlur"
  })

  const onSubmit = async (data: FormInputProps) => {
    const login = await apiRegister(data)
    if (login?.success) {
      setCookie(null, TOKEN, login?.data?.access_token , {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      })

      Router.push('/home')
    }
    console.log(data, login)
  }

  return (
    <Layout title="Register">
      <Content>
        <FormContent>
          <h3>Register</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input
                type="text"
                id="username"
                className={errors?.username ? 'invalid' : ''}
                {...register('username',
                  {
                    required: 'Username Required*'
                  })
                }
              />
              <Label
                htmlFor="username"
                className={`active ${errors?.username ? 'invalid' : 'valid'}`}
              >Username</Label>
              {
                errors?.username && (
                  <ErrorInputMessage>
                    {errors?.username?.message}
                  </ErrorInputMessage>
                )
              }
            </FormControl>
            <FormControl>
              <Input
                type="password"
                id="password"
                className={errors?.password ? 'invalid' : ''}
                {...register('password', {
                  required: 'Password Required*',
                  minLength: {
                    value: 6,
                    message: 'Minimal 6 character'
                  }
                })}
              />
              <Label
                htmlFor="password"
                className={`active ${errors?.password ? 'invalid' : 'valid'}`}
              >Kata Sandi</Label>
              {
                errors?.password && (
                  <ErrorInputMessage>{errors?.password?.message}</ErrorInputMessage>
                )
              }
            </FormControl>
            <FormControl>
              <Input
                type="password"
                id="confirm_password"
                className={errors?.confirm_password ? 'invalid' : ''}
                {...register('confirm_password', {
                  required: 'Confirm Password Required*',
                  minLength: {
                    value: 6,
                    message: 'Minimal 6 character'
                  },
                  validate: value => {
                    const check = value === watch('password')
                    if (check) return true
                    return 'The passwords do not match'
                  }
                })}
              />
              <Label
                htmlFor="confirm_password"
                className={`active ${errors?.confirm_password ? 'invalid' : 'valid'}`}
              >Ulangi Kata Sandi</Label>
              {
                errors?.confirm_password && (
                  <ErrorInputMessage>{errors?.confirm_password?.message}</ErrorInputMessage>
                )
              }
            </FormControl>
            <div style={{ marginTop: '2rem' }}>
              <Button
                title="Daftar"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </FormContent>
      </Content>
    </Layout>
  )
})

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`
const FormContent = styled.div`
  width: 400px;
  padding: 1.5rem;
  background-color: #FFFFFF;
  border-radius: 20px;
  max-height: 80%;
  overflow: hidden;
  overflow-y: auto;

  @media only screen and ${device?.mobileS} {
    width: 88%;
    padding: 1rem;
  }
`
