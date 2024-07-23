'use client'

import type { Links } from '@prisma/client'
import { DownloadIcon } from 'lucide-react'
import QRCode from 'react-qr-code'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { env } from '@/lib/env.mjs'

interface CopyQRProps {
  linkInfo: Links
}

// const CopyQR = ({ linkInfo }: CopyQRProps) => {
export function CopyQR({ linkInfo }: CopyQRProps) {
  const handleDownloadQRImage = (type: 'png' | 'svg') => {
    const svg = document.getElementById('qr-code')
    const svgData = new XMLSerializer().serializeToString(svg!)
    if (type === 'svg') {
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' })
      const downloadLink = document.createElement('a')
      downloadLink.download = `${linkInfo.slug}_zeus_app.svg`
      downloadLink.href = window.URL.createObjectURL(svgBlob)
      downloadLink.click()
    } else if (type === 'png') {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx!.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = `${linkInfo.slug}_zeus_app.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Copy QR Code</DialogTitle>
        <DialogDescription>{linkInfo.description}</DialogDescription>
      </DialogHeader>
      <div className="my-3 flex flex-col items-center justify-center space-y-3 overflow-hidden">
        <div className="rounded-lg border p-2 shadow-md">
          <QRCode
            id="qr-code"
            className="size-32"
            style={{ height: 'auto' }}
            value={`${env.NEXT_PUBLIC_VERCEL_URL}/${linkInfo.slug}`}
            viewBox={`0 0 128 128`}
          />
        </div>
        <p className="block w-full truncate font-mono font-medium">{`/${linkInfo.slug}`}</p>
      </div>
      <DialogFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <DownloadIcon className="size-4" />
              <span>Download QR</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleDownloadQRImage('png')}>
              Download as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadQRImage('svg')}>
              Download as SVG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
