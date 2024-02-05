import type { APIRoute } from 'astro'

import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dadkfmv25',
    api_key: '435389461713179',
    api_secret: import.meta.env.CLOUDINARY_SECRET
});

const uploadStream = async (buffer: Uint8Array, options: {
    folder?: string,
    ocr?: string
}): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary
            .uploader
            .upload_stream(options, (error, result) => {
                if (result) return resolve(result)
                reject(error)
            }).end(buffer)
    })
}

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (file == null) {
        return new Response('No file uploaded', { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const unit8Array = new Uint8Array(arrayBuffer)

    const result = await uploadStream(unit8Array, {
        folder: 'pdf',
        ocr: 'adv_ocr'
    })

    const {
        asset_id: id,
        secure_url: url,
        pages,
        info
    } = result

    console.log(result)

    return new Response(JSON.stringify({
        id,
        url,
        pages
    }))
}