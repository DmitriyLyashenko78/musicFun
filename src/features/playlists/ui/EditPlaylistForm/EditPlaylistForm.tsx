import type { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

import { useUpdatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'
import type { UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'

type UpdatePlaylistFields = {
  title: string
  description: string
  tagIds: string[]
}

type Props = {
  playlistId: string
  setPlaylistId: (playlistId: null) => void
  editPlaylist: (playlist: null) => void
  register: UseFormRegister<UpdatePlaylistFields>
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistFields>
}

export const EditPlaylistForm = ({ playlistId, setPlaylistId, editPlaylist, handleSubmit, register }: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const onSubmit: SubmitHandler<UpdatePlaylistFields> = (formData) => {
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
