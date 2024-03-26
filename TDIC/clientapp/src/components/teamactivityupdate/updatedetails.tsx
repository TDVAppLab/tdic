import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box, Button, TextField } from '@mui/material'
import type { MultiobjectiveText } from '@prisma/client'
import { TRPCClientError } from '@trpc/client'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { trpc } from '@/utils/trpc'

interface Props {
  multiobjectiveText: MultiobjectiveText
}

const updateCreateSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  titleEn: z.string(),
  titleJp: z.string(),
  scriptEn: z.string(),
  scriptJp: z.string(),
  status: z.string(),
  displayDate: z.string(),
})

//UPDATESを作成・更新・削除するためのコンポーネント(管理画面用)
export default function UpdatedDetails({ multiobjectiveText }: Props) {
  const router = useRouter()

  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false)

  const create = trpc.multiobjectiveTextRouter.create.useMutation()
  const update = trpc.multiobjectiveTextRouter.update.useMutation()
  const updateDelete = trpc.multiobjectiveTextRouter.delete.useMutation()

  const { register, handleSubmit, control, formState, reset, setError } =
    useForm({
      defaultValues: multiobjectiveText,
      resolver: zodResolver(updateCreateSchema),
      mode: 'onTouched',
    })

  useEffect(() => {
    if (multiobjectiveText) {
      reset(multiobjectiveText)
    }
  }, [multiobjectiveText, reset])

  return (
    <Box component="div">
      <form
        onSubmit={handleSubmit(async (value) => {
          if (multiobjectiveText.id === '') {
            try {
              const res = await create.mutateAsync(value)
              enqueueSnackbar('Create Success', { variant: 'success' })
              reset(res)
              await router.push(`/adminupdate/${res?.id}`)
            } catch (error) {
              enqueueSnackbar('Create error:', { variant: 'error' })

              if (error instanceof TRPCClientError) {
                setError('root', {
                  type: 'manual',
                  message: error.message,
                })
              }
            }
          } else {
            try {
              console.log(value)
              const res = await update.mutateAsync(value)
              enqueueSnackbar('Updated Success', { variant: 'success' })
              reset(value)
            } catch (error) {
              enqueueSnackbar('Updated error:', { variant: 'error' })

              if (error instanceof TRPCClientError) {
                setError('root', {
                  type: 'manual',
                  message: error.message,
                })
              }
            }
          }
        })}
      >
        <TextField
          {...register('titleJp')}
          fullWidth
          margin={'normal'}
          label="タイトル(JP)"
          type="text"
          error={
            formState.touchedFields.titleJp && Boolean(formState.errors.titleJp)
          }
          helperText={
            formState.touchedFields.titleJp &&
            formState.errors?.titleJp?.message
          }
        />

        <TextField
          {...register('scriptJp')}
          fullWidth
          margin={'normal'}
          multiline
          rows={3}
          label="本文(JP)"
          type="text"
          error={
            formState.touchedFields.scriptJp &&
            Boolean(formState.errors.scriptJp)
          }
          helperText={
            formState.touchedFields.scriptJp &&
            formState.errors?.scriptJp?.message
          }
        />
        <TextField
          {...register('titleEn')}
          fullWidth
          margin={'normal'}
          label="Title(EN)"
          type="text"
          error={
            formState.touchedFields.titleEn && Boolean(formState.errors.titleEn)
          }
          helperText={
            formState.touchedFields.titleEn &&
            formState.errors?.titleEn?.message
          }
        />

        <TextField
          {...register('scriptEn')}
          fullWidth
          margin={'normal'}
          multiline
          rows={3}
          label="Detail Script(En)"
          type="text"
          error={
            formState.touchedFields.scriptEn &&
            Boolean(formState.errors.scriptEn)
          }
          helperText={
            formState.touchedFields.scriptEn &&
            formState.errors?.scriptEn?.message
          }
        />

        <TextField
          {...register('displayDate')}
          fullWidth
          margin={'normal'}
          label="displayDate"
          type="text"
          error={
            formState.touchedFields.displayDate &&
            Boolean(formState.errors.displayDate)
          }
          helperText={
            formState.touchedFields.displayDate &&
            formState.errors?.displayDate?.message
          }
        />

        <TextField
          {...register('status')}
          fullWidth
          margin={'normal'}
          label="status"
          type="text"
          error={
            formState.touchedFields.status && Boolean(formState.errors.status)
          }
          helperText={
            formState.touchedFields.status && formState.errors?.status?.message
          }
        />

        <TextField
          disabled={true}
          {...register('type')}
          fullWidth
          margin={'normal'}
          label="type"
          type="text"
          error={
            formState.touchedFields.status && Boolean(formState.errors.type)
          }
          helperText={
            formState.touchedFields.status && formState.errors?.type?.message
          }
        />
        <Button
          type="submit"
          variant="contained"
          disabled={
            !formState.isValid || !formState.isDirty || formState.isSubmitting
          }
        >
          {multiobjectiveText.id === '' ? 'Create' : 'Update'}
        </Button>
        {formState.isSubmitted && !formState.isSubmitSuccessful && (
          <Alert severity="error">{formState.errors.root?.message}</Alert>
        )}
      </form>

      <br />

      <Button
        disabled={isSubmittingDelete || multiobjectiveText.id === ''}
        type="submit"
        variant="contained"
        color="warning"
        onClick={async () => {
          setIsSubmittingDelete(true)

          if (multiobjectiveText.id !== '') {
            try {
              const res = await updateDelete.mutateAsync({
                id: multiobjectiveText.id,
              })
              enqueueSnackbar('Task Deleted', { variant: 'success' })
              await router.push(`/adminupdate`)
            } catch (error) {
              enqueueSnackbar('Updated error:', { variant: 'error' })
            }
          }
        }}
      >
        Delete
      </Button>
    </Box>
  )
}
