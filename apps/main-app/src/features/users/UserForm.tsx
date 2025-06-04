import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from '@tanstack/react-form'
import z from "zod/v4"
import type { AnyFieldApi } from '@tanstack/react-form'
import { fetchUsers } from './userService'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store'

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <Typography variant='caption' color='error'>
          {field.state.meta.errors.map(e => e.message).join(",")}
        </Typography>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

const userSchema = z.object({
  name: z.string().min(1, { message: 'Name is required!' }),
  email: z
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
})

export type UserFormValue = z.infer<typeof userSchema>;

type Props = {

  onClose: () => void;
}

export default function UterForm({ onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm({
    defaultValues: {
      name: '',
      email: ''
    },
    onSubmit: async ({ value }) => {
      console.log(JSON.stringify(value))
      try {
        await fetch('http://localhost:3000/users', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify(value)
        })
        fetchUsers(dispatch, { name: "" }).subscribe()
        onClose()
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message)
        }
        console.log(error)
      }
    },
    validators: {
      onChange: userSchema,
    },
  })

  return (
    <Box sx={{ mt: 1 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          <form.Field
            name="name"
            validators={{
              onChangeAsyncDebounceMs: 500,
            }}
            children={(field) => {
              return (
                <Box sx={{ mb: 2 }} >
                  <TextField
                    fullWidth
                    label="Name"
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldInfo field={field} />
                </Box>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="email"
            validators={{
              onChangeAsyncDebounceMs: 500,
            }}
            children={(field) => (
              <Box sx={{ mb: 2 }} >
                <TextField
                  fullWidth
                  label="Email"
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type='email'
                />
                <FieldInfo field={field} />
              </Box>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button type="submit" disabled={!canSubmit} variant='contained' size="large">
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            </Box>
          )}
        />
      </form>
    </Box>
  )
}
