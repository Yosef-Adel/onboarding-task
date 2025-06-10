import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from '@tanstack/react-form'
import z from "zod/v4"
import type { AnyFieldApi } from '@tanstack/react-form'
import type { IUser } from './types'

/**
 * Schema for validating the form using Zod
 */
const userSchema = z.object({
  name: z.string().min(1, { message: 'Name is required!' }),
  email: z
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
})

type Props = {
  user?: IUser;
  onSubmit: (user: Omit<IUser, "id">) => void;
  edit?: boolean;
}

/**
 * Component to show field-level info like errors or validating status
 */
function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid && (
        <Typography variant='caption' color='error'>
          {field.state.meta.errors.map(e => e.message).join(", ")}
        </Typography>
      )}
      {field.state.meta.isValidating && 'Validating...'}
    </>
  );
}

export default function UserForm({ user, onSubmit, edit }: Props) {
  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || '',
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    validators: {
      onChange: userSchema,
    },
  });

  return (
    <Box sx={{ mt: 1 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Name Field */}
        <form.Field
          name="name"
          validators={{ onChangeAsyncDebounceMs: 500 }}
        >
          {(field) => (
            <Box sx={{ mb: 2 }}>
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
          )}
        </form.Field>

        {/* Email Field */}
        <form.Field
          name="email"
          validators={{ onChangeAsyncDebounceMs: 500 }}
        >
          {(field) => (
            <Box sx={{ mb: 2 }}>
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
        </form.Field>

        {/* Submit Button */}
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                type="submit"
                disabled={!canSubmit}
                variant='contained'
                size="large"
              >
                {isSubmitting ? '...' : edit ? "Update" : 'Create'}
              </Button>
            </Box>
          )}
        </form.Subscribe>
      </form>
    </Box>
  );
}
