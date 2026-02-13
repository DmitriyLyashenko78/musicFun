import type { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

import { useUpdatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'
import type { UpdatePlaylistArgs, UpdatePlaylistFormFields } from '@/features/playlists/api/playlistsApi.types.ts'



type Props = {
  playlistId: string
  setPlaylistId: (playlistId: null) => void
  editPlaylist: (playlist: null) => void
  register: UseFormRegister<UpdatePlaylistFormFields>
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistFormFields>
}

export const EditPlaylistForm = ({ playlistId, setPlaylistId, editPlaylist, handleSubmit, register }: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const onSubmit: SubmitHandler<UpdatePlaylistFormFields> = (formData) => {
    if (!playlistId) return

    const payload: UpdatePlaylistArgs = {
      data: {
        type: 'playlists',
        attributes: {
          title: formData.title,
          description: formData.description,
          tagIds: formData.tagIds || [],
        },
      },
    }

    updatePlaylist({ playlistId, body: payload })
      .unwrap()
      .then(() => {
        setPlaylistId(null)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button type={'submit'}>save</button>
      <button type={'button'} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  )
}
