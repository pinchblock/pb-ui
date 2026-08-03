"use client"

import { useCallback, useRef, useState } from "react"
import type * as React from "react"

/**
 * Drag-and-drop + browse file selection. UI-only: filters picks against
 * `accept` and hands `File[]` to the caller; uploading stays app-side.
 */
export interface UseFileDropOptions {
  /** Native input accept syntax: ".mp4,video/*,image/png". */
  accept?: string
  multiple?: boolean
  disabled?: boolean
  /** Receives accepted files after a drop or a browse pick. */
  onFiles: (files: File[]) => void
}

export interface UseFileDropResult {
  /** True while a files drag hovers the zone. Mirror as data-drag-over. */
  isDragOver: boolean
  /** Spread onto the drop zone element. */
  rootProps: {
    onDragEnter: React.DragEventHandler<HTMLElement>
    onDragOver: React.DragEventHandler<HTMLElement>
    onDragLeave: React.DragEventHandler<HTMLElement>
    onDrop: React.DragEventHandler<HTMLElement>
  }
  /** Spread onto a visually hidden <input type="file">. */
  inputProps: {
    ref: React.RefObject<HTMLInputElement | null>
    type: "file"
    accept: string | undefined
    multiple: boolean
    disabled: boolean
    tabIndex: -1
    onChange: React.ChangeEventHandler<HTMLInputElement>
  }
  /** Opens the native file picker. */
  browse: () => void
}

function matchesAccept(file: File, accept: string | undefined): boolean {
  if (!accept) return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) => {
      if (rule.startsWith(".")) return name.endsWith(rule)
      if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1))
      return type === rule
    })
}

function hasFiles(event: React.DragEvent): boolean {
  return Array.from(event.dataTransfer.types).includes("Files")
}

export function useFileDrop({
  accept,
  multiple = false,
  disabled = false,
  onFiles,
}: UseFileDropOptions): UseFileDropResult {
  const [isDragOver, setIsDragOver] = useState(false)
  /* Counter, not boolean: drag-enter/leave fire on every child node. */
  const dragDepth = useRef(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const emit = useCallback(
    (list: FileList | null) => {
      if (!list) return
      let files = Array.from(list).filter((file) => matchesAccept(file, accept))
      if (!multiple) files = files.slice(0, 1)
      if (files.length > 0) onFiles(files)
    },
    [accept, multiple, onFiles],
  )

  const onDragEnter = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (disabled || !hasFiles(event)) return
      event.preventDefault()
      dragDepth.current += 1
      setIsDragOver(true)
    },
    [disabled],
  )

  const onDragOver = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (disabled || !hasFiles(event)) return
      event.preventDefault()
      event.dataTransfer.dropEffect = "copy"
    },
    [disabled],
  )

  const onDragLeave = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (disabled || !hasFiles(event)) return
      dragDepth.current = Math.max(0, dragDepth.current - 1)
      if (dragDepth.current === 0) setIsDragOver(false)
    },
    [disabled],
  )

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (disabled || !hasFiles(event)) return
      event.preventDefault()
      dragDepth.current = 0
      setIsDragOver(false)
      emit(event.dataTransfer.files)
    },
    [disabled, emit],
  )

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      emit(event.target.files)
      /* Reset so picking the same file twice still fires onChange. */
      event.target.value = ""
    },
    [emit],
  )

  const browse = useCallback(() => {
    if (!disabled) inputRef.current?.click()
  }, [disabled])

  return {
    isDragOver,
    rootProps: { onDragEnter, onDragOver, onDragLeave, onDrop },
    inputProps: {
      ref: inputRef,
      type: "file",
      accept,
      multiple,
      disabled,
      tabIndex: -1,
      onChange,
    },
    browse,
  }
}
