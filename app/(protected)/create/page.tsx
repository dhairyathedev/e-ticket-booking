import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

export default function CreatePage() {
  return (
    <div className="w-full max-w-4xl mt-20">
        <div className="flex gap-x-10">
            <div>
                <Image src="/img/demo.avif" width={300} height={300} alt="IMAGE" className="rounded-md" />
            </div>
            <div>
                <Input placeholder="Event Name"/>
            </div>
        </div>
    </div>
  )
}
