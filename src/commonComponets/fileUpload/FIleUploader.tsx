'use client'

import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FileUploader({
  max = 5,
  onChange,
}: {
  max?: number
  onChange?: (files: File[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const filesLimit = files.length >= max

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files
    if (!selected) return

    const newFiles = Array.from(selected)
    const updated = [...files, ...newFiles].slice(0, max)

    setFiles(updated)
    onChange?.(updated)
  }

  function removeFile(index: number) {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
    onChange?.(updated)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">
          Add delivery menu images
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          These will be used to create your menu for online ordering
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          onClick={() => inputRef.current?.click()}
          className={`flex  flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted ${filesLimit ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'   } bg-muted/30 p-8 text-center transition hover:bg-muted/50`}
          
        >
          <Upload className="h-8 w-8 text-muted-foreground" />

          <p className="mt-2 font-medium ">Add more images</p>
          <p className="text-xs text-muted-foreground">
            jpg, png or jpeg formats only • Max {max} files
          </p>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={handleSelect}
            disabled={filesLimit}

          />
        </div>

        {/* Preview */}
        {files.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="menu"
                  className="h-28 w-full object-cover"
                />

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute right-1 top-1 hidden rounded-full bg-background/80 p-1 text-muted-foreground shadow group-hover:block"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Counter */}
        <p className="text-xs text-muted-foreground text-right">
          {files.length}/{max} images uploaded
        </p>
      </CardContent>
    </Card>
  )
}
