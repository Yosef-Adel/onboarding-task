import { Box, Button, DialogActions, TextField, Typography } from '@mui/material'
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
    <Box sx={{ mt: 1, }}>
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
          validators={{
            onChangeAsyncDebounceMs: 500,
            onMount: userSchema.shape.name
          }}
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
          validators={{
            onChangeAsyncDebounceMs: 500,
            onMount: userSchema.shape.email
          }}
        >
          {(field) => (
            <Box >
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

        <DialogActions>
          {/* Submit Button */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => {
              console.log('canSubmit:', canSubmit);
              return (
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    variant='outlined'
                    size="large"
                  >
                    {isSubmitting ? '...' : edit ? "Update" : 'Create'}
                  </Button>
                </Box>
              );
            }}
          </form.Subscribe>
        </DialogActions>
      </form>
    </Box >
  );
}
