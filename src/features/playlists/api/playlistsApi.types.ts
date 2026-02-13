import * as z from 'zod'

import {
  createPlaylistSchema,
  playlistAttributesSchema,
  playlistDataSchema,
  playlistMetaSchema,
  playlistsResponseSchema,
} from '@/features/playlists/model/playlists.schemas.ts'

export type PlaylistMeta = z.infer<typeof playlistMetaSchema>
export type PlaylistAttributes = z.infer<typeof playlistAttributesSchema>
export type PlaylistData = z.infer<typeof playlistDataSchema>
export type PlaylistsResponse = z.infer<typeof playlistsResponseSchema>

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: 'addedAt' | 'likesCount'
  sortDirection?: 'asc' | 'desc'
  tagsIds?: string[]
  userId?: string
  trackId?: string
}

// Это для формы (плоский объект)
export type CreatePlaylistFormFields = z.infer<typeof createPlaylistSchema>

// Это для API (вложенный объект согласно JSON:API)
export type CreatePlaylistArgs = {
  data: {
    type: 'playlists'
    attributes: CreatePlaylistFormFields
  }
}

export type UpdatePlaylistFormFields = {
  title: string
  description: string | null
  tagIds: string[]
}

export type UpdatePlaylistArgs = {
  data: {
    type: 'playlists'
    attributes: UpdatePlaylistFormFields
  }
}

// WebSocket Events
export type PlaylistCreatedEvent = {
  type: 'tracks.playlist-created'
  payload: {
    data: PlaylistData
  }
}

export type PlaylistUpdatedEvent = {
  type: 'tracks.playlist-updated'
  payload: {
    data: PlaylistData
  }
}
